import {AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit} from '@angular/core';
import { Report } from '../classes/report';
import {Gam133Service} from '../gam133.service';
import { Angular2Csv } from 'angular2-csv';
import * as moment from "moment";
import {DataTableConfigService} from '../../../common-services/data-table-config/data-table-config.service';

@Component({
  selector: 'app-gam133',
  templateUrl: './gam133.component.html',
  styleUrls: ['./gam133.component.scss']
})
export class Gam133Component implements OnInit {

  public isLoading: boolean = false;

    
  listReport: Report[];

  constructor(private api: Gam133Service,
              private config: DataTableConfigService) { }

  ngOnInit() {
    this.getReport();
  }

    public getReport(): void{
      this.isLoading = true;
      this.configuration.isLoading = true;
      this.listReport = [new Report()];
        this.api.getJiraReport()
                .subscribe(data => {
                        this.listReport = data;
                        this.isLoading = false;
                        this.configuration.isLoading = false;
                },
                    (error) =>{
                        this.isLoading = false;
                        this.configuration.isLoading = false;
                })
    }
    
/*
    afterViewInit will be fired to initiate the table anf enable the sort functionality
 */
        getCsv() {

        var data=[];
        var temp=this.listReport;

        data.push({cbuNumber:"cbuNumber",crNumber:"crNumber",tawasolNumber:"tawasolNumber",summary:"summary",
                    relNumber:"relNumber",issueType:"issueType",status:"status",designApprovedDate:"designApprovedDate",
                    designEfforts:"designEfforts",devEfforts:"devEfforts",testEfforts:"testEfforts",deliveryEstimates:"deliveryEstimates"})

       temp.forEach(function (item) {
           var tempCbuNumber
           var tempCrNumber
           var tempTawasolNumber
           var tempSummary
           var tempRelNumber
           var tempIssueType
           var tempStatus
           var tempDesignApprovedDate
           var tempDesignEfforts
           var tempDevEfforts
           var tempTestEfforts
           var tempDeliveryEstimates;


           if(item["cbuNumber"] != undefined){  tempCbuNumber=(item["cbuNumber"]);}
           if(item["crNumber"] != undefined){   tempCrNumber=(item["crNumber"]);}
           if(item["tawasolNumber"] != undefined){   tempTawasolNumber= (item["tawasolNumber"]);}
           if(item["summary"] != undefined){   tempSummary= (item["summary"]);}
           if(item["relNumber"] != undefined){   tempRelNumber= (item["relNumber"]);}
           if(item["issueType"] != undefined){  tempIssueType= (item["issueType"]);}
           if(item["status"] != undefined){  tempStatus=(item["status"]);}
           if(item["designApprovedDate"] != undefined){   tempDesignApprovedDate=(item["designApprovedDate"]);}
           if(item["designEfforts"] != undefined){   tempDesignEfforts= (item["designEfforts"]);}
           if(item["devEfforts"] != undefined){   tempDevEfforts= (item["devEfforts"]);}
           if(item["testEfforts"] != undefined){   tempTestEfforts= (item["testEfforts"]);}
           if(item["deliveryEstimates"] != undefined){  tempDeliveryEstimates= (item["deliveryEstimates"]);}


           if(item["cbuNumber"] == undefined){ tempCbuNumber="";}
           if(item["crNumber"] ==undefined){ tempCrNumber="";}
           if(item["tawasolNumber"] ==undefined){ tempTawasolNumber="";}
           if(item["summary"] ==undefined){ tempSummary= "";}
           if(item["relNumber"] ==undefined){ tempRelNumber= "";}
           if(item["issueType"] ==undefined){tempIssueType= "";}
           if(item["status"] == undefined){ tempStatus="";}
           if(item["designApprovedDate"] ==undefined){ tempDesignApprovedDate="";}
           if(item["designEfforts"] ==undefined){ tempDesignEfforts="";}
           if(item["devEfforts"] ==undefined){ tempDevEfforts= "";}
           if(item["testEfforts"] ==undefined){ tempTestEfforts= "";}
           if(item["deliveryEstimates"] ==undefined){tempDeliveryEstimates= "";}

           var temprow={cbuNumber:tempCbuNumber,crNumber:tempCrNumber,tawasolNumber:tempTawasolNumber,summary:tempSummary,
           relNumber:tempRelNumber,issueType:tempIssueType,status:tempStatus,designApprovedDate:tempDesignApprovedDate,designEfforts:tempDesignEfforts
           ,devEfforts:tempDevEfforts,testEfforts:tempTestEfforts,deliveryEstimates:tempDeliveryEstimates}
           data.push(temprow)

           
            if(item.cbuNumber==undefined){item.cbuNumber=""}
            if(item.crNumber==undefined){item.crNumber=""}
            if(item.tawasolNumber==undefined){item.tawasolNumber=""}
            if(item.summary==undefined){item.summary=""}
            if(item.relNumber==undefined){item.relNumber=""}
            if(item.issueType==undefined){item.issueType=""}
            if(item.status==undefined){item.status=""}
            if(item.designApprovedDate==undefined){item.designApprovedDate=""}
            if(item.designEfforts==undefined){item.designEfforts=""}
            if(item.devEfforts==undefined){item.devEfforts=""}
            if(item.testEfforts==undefined){item.testEfforts=""}
            if(item.deliveryEstimates==undefined){item.deliveryEstimates=""}
            

       })

        new Angular2Csv(data,"CR Status Report "+moment().format('LLL'));

    }


    configuration = this.config.getConfig();
    columns = [
        {title: "CBU#", key: "cbuNumber"},
        {title: "CR#", key: "crNumber"},
        {title: "SYS #", key: "tawasolNumber",},
        {title: "Summary", key: "summary",},
        {title: "Rel #", key: "relNumber",},
        {title: "Issue Type", key: "issueType",},
        {title: "Status", key: "status"},
        {title: "Approved Date", key: "designApprovedDate"},
        {title: "Design Efforts", key: "designEfforts"},
        {title: "DevE fforts", key: "devEfforts"},
        {title: "Test Efforts", key: "testEfforts"},
        {title: "Delivery Estimates", key: "deliveryEstimates"}
    ];
    data=[];

    eventEmitted($event){
    }
}
