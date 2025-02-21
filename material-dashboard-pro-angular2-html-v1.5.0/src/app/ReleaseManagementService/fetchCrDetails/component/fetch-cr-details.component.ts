import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {IssueService} from '../issue.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Element} from '../../../plm/view-devices/view-devices.component';


/*const ELEMENT_DATA: Issue[] = [{BU: undefined, ApprovedDate: undefined, CR: undefined, DeliveryEstimates: undefined, DesignEfforts: undefined
, DevEfforts: undefined, Issue: undefined, Rel: undefined, Status: undefined, Summary: undefined, SYS: undefined, TestEfforts: undefined}]*/
@Component({
  selector: 'app-fetch-cr-details',
  templateUrl: './fetch-cr-details.component.html',
  styleUrls: ['./fetch-cr-details.component.scss'],
  providers: [IssueService]
})
export class FetchCrDetailsComponent implements OnInit {
    displayedColumns: string[] = ['BU', 'CR', 'SYS', 'Summary', 'Rel', 'Issue', 'Status', 'ApprovedDate','DesignEfforts',
                                'DevEfforts', 'TestEfforts', 'DeliveryEstimates'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public isLoading = false;
    @ViewChild("form") form: NgForm;
    constructor(private api: IssueService) { }

  ngOnInit() {
      this.dataSource = new MatTableDataSource();
  }

  submit(){
      this.dataSource = new MatTableDataSource();
      this.api.getIssue(this.form.value.issueId).subscribe((data)=>{
          let bu = "", cr = "", ApprovedDate;
          let rows = [];
          console.log(data)
          for(let i = 0; i<data.length; i++){
              let obj = {};
              if(data[i]["key"].substr(0,3)===("CBU")
                  || data[i]["key"].substr(0,2)===("CC")
                  || data[i]["key"].substr(0,3)===("FO-")
                  || data[i]["key"].substr(0,3)===("EBU")){
                  bu= data[i]["key"];
                  continue
              }
              if(data[i]["key"].substr(0,3)!==("CRM") && data[i]["key"].substr(0,2)===("CR")){
                  cr = data[i].key
                  console.log(data[i].designApprovedDate)
                  ApprovedDate = data[i].designApprovedDate?new Date(data[i].designApprovedDate):undefined
                  ApprovedDate = ApprovedDate?(ApprovedDate.getDate()+1)+"/"+ApprovedDate.getMonth()+"/"+ApprovedDate.getFullYear():"";
                  continue
              }
              obj["BU"] = bu;
              obj["CR"] = cr;
              obj["ApprovedDate"] = ApprovedDate
              obj["SYS"] = data[i].key;
              obj["Summary"] = data[i].summary;
              obj["Rel"] = data[i].fixVersions;
              obj["Issue"] = data[i].issueType
              obj["Status"] = data[i].status
              obj["ApprovedDate"] = obj["ApprovedDate"]?obj["ApprovedDate"]:data[i].designApprovedDate
              obj["DesignEfforts"] = data[i].designEfforts
              obj["DevEfforts"] = data[i].devEfforts
              obj["TestEfforts"] = data[i].testEfforts
              obj["DeliveryEstimates"] = data[i].deliveryEstimates
              rows.push(obj);
          }
          this.dataSource = new MatTableDataSource(rows);
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
      })
      console.log(this.form.value);
  }



    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
}


export interface Issue {
    BU: any
    CR: any,
    SYS: any,
    Summary: any,
    Rel: any,
    Issue: any,
    Status: any,
    ApprovedDate: any,
    DesignEfforts: any,
    DevEfforts: any,
    TestEfforts: any,
    DeliveryEstimates: any
}