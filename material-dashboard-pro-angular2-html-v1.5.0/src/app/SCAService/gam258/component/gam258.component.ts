import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DataTableConfigService} from '../../../common-services/data-table-config/data-table-config.service';
import {WizardService} from '../../wizard/wizard.service';
import {Gam258Service} from '../gam258.service';
import { Branchrequest } from '../classes/branchrequest';
import { Branchrespoend } from '../classes/branchrespoend';
import {ScDetails} from '../../commonClasses/sc-details';

@Component({
  selector: 'app-gam258',
  templateUrl: './gam258.component.html',
  styleUrls: ['./gam258.component.scss']
})
export class Gam258Component implements OnInit {

  constructor(private api: Gam258Service,
              private config: DataTableConfigService,
              private wizService:WizardService
              ) {
 // table config modification
      this.configuration.orderEnabled = false;
      this.configuration.clickEvent = false;
      this.configuration.paginationEnabled = true;
      this.configuration.rows = 5;

      this.configuration2.orderEnabled = false;
      this.configuration2.clickEvent = false;
      this.configuration2.globalSearchEnabled = false;
      this.wizService.updateSCDetailsMethod(this.scDetails);
}

  public editList: Array<any> = [];
  public modifiedList: Array<any> = [];
  public isModified: boolean = true;
  public isLoading: boolean = false;
  public scDetails: ScDetails = {
    listName: 'branchUpdateList',
    data: this.modifiedList,
    isValid: function(){
       alert("Please add branch(s) to be updated");
       return false;
    },
    fileName: 'Update Branch',
      isCompleted: false
  };
  public branch: Branchrespoend = new Branchrespoend();
  private branchRequest: Branchrequest = {
                                    TABLENAME: "SC_BRANCHES",
                                    START: "0",
                                    COUNT:"1000"
                                };

  ngOnInit() {
      this.isLoading = true;
      this.api.getBranch(this.branchRequest)
          .subscribe((data)=>{
              this.isLoading = false;
              this.branch = data;
              //console.log(data);
          },
              (err)=>{
                    this.isLoading = false;
          });
  }

  data = [];
  columns = [
      { title: "ID", key: "ID"},
      { title: "Branch Name", key: "NAME"},
      { title: "Branch Address", key: "ADDRESS"},
      { title: "Open Hours", key: "HRS_OPEN"},
      { title: "Close Hours", key: "HRS_CLOSE"},
      { title: "Phone", key: "PHONE"},
      { title: "", key: "edit"}
  ];

  update_columns = [
      { title: "ID", key: "ID"},
      { title: "New Branch Name", key: "NAME"},
      { title: "New Branch Address", key: "ADDRESS"},
      { title: "New Open Hours", key: "HRS_OPEN"},
      { title: "New Close Hours", key: "HRS_CLOSE"},
      { title: "New Phone", key: "PHONE"},
      { title: "", key: "edit"}
  ];
  configuration = this.config.getConfig();
  configuration2 = this.config.getConfig();

  eventEmitted(e){

  }


    addToEdit(row){
      this.scDetails.isValid = function () {
        alert("Please Update All Branch(s)");
        return false;
      }
      this.scDetails.isCompleted = false;
      this.editList.push(row);
      this.editList = [ ...this.editList];
  }

  removeFromEdit(row){
      let index = this.editList.indexOf(row);
      this.editList.splice(index, 1);
      this.editList = [...this.editList];
      this.removeFromEditedList(row.ID);
      this.validate();
  }

  removeFromEditedList(id){
      for (let i = 0; i < this.modifiedList.length; i++) {
          if (this.modifiedList[i].ID === id)
              this.modifiedList.splice(i, 1)
      }
  }




  textChanged(row, content, lang){
      let obj = Object.assign({}, row);
      let alreadyUpdated = this.containsObject(obj, this.modifiedList);
      let index = this.editList.indexOf(row);
      let changed = false;

      if(alreadyUpdated !==  -1) {
          obj = this.modifiedList[alreadyUpdated]
      }

      if(lang === 'A' && content !== obj.NAME){
          obj.NAME = content;
          changed = true;
      }else if(lang === 'B' && content !== obj.ADDRESS){
          obj.ADDRESS = content;
          changed = true;
      }else if(lang === 'C' && content !== obj.HRS_OPEN){
          obj.HRS_OPEN = content;
          changed = true;
      }else if(lang === 'D' && content !== obj.HRS_CLOSE){
          obj.HRS_CLOSE = content;
          changed = true;
      }else if(lang === 'E' && content !== obj.PHONE){
          obj.PHONE = content;
          changed = true;
      }

      if( alreadyUpdated === -1 && changed) {
          this.modifiedList.push(obj)
      }else if(changed){
          this.modifiedList[this.containsObject(obj, this.modifiedList)] = obj;
      }
      if (this.isOriginalValue(obj, this.editList)) {
          this.removeFromEditedList(obj.ID)
      }
      this.validate()
  }



    containsObject(obj, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].ID === obj.ID) {
                return i;
            }
        }
        return -1;
    }

    isOriginalValue(obj, list: Array<any>): boolean{

      for(let i = 0; i < list.length; i++){
          if(list[i].ID === obj.ID){
              if(list[i].NAME === obj.NAME && list[i].ADDRESS === obj.ADDRESS && list[i].HRS_OPEN === obj.HRS_OPEN
                 && list[i].HRS_CLOSE === obj.HRS_CLOSE && list[i].PHONE === obj.PHONE){
                  return true
              }
              return false;
          }
      }
      return false
    }


    isNotChanged(obj){
      this.validate();
        for(let i = 0; i < this.modifiedList.length; i++) {
            if (obj.ID === this.modifiedList[i].ID) {
                return false;
            }
        }
        return true;
    }

    opens = [
      {value: '00:00', viewValue: '00:00'},
      {value: '00:30', viewValue: '00:30'},
      {value: '01:00', viewValue: '01:00'},
      {value: '01:30', viewValue: '01:30'},
      {value: '02:00', viewValue: '02:00'},
      {value: '02:30', viewValue: '02:30'},
      {value: '03:00', viewValue: '03:00'},
      {value: '03:30', viewValue: '03:30'},
      {value: '04:00', viewValue: '04:00'},
      {value: '04:30', viewValue: '04:30'},
      {value: '05:00', viewValue: '05:00'},
      {value: '05:30', viewValue: '05:30'},
      {value: '06:00', viewValue: '06:00'},
      {value: '06:30', viewValue: '06:30'},
      {value: '07:00', viewValue: '07:00'},
      {value: '07:30', viewValue: '07:30'},
      {value: '08:00', viewValue: '08:00'},
      {value: '08:30', viewValue: '08:30'},
      {value: '09:00', viewValue: '09:00'},
      {value: '09:30', viewValue: '09:30'},
      {value: '10:00', viewValue: '10:00'},
      {value: '10:30', viewValue: '10:30'},
      {value: '11:00', viewValue: '11:00'},
      {value: '11:30', viewValue: '11:30'},
      {value: '12:00', viewValue: '12:00'},
      {value: '12:30', viewValue: '12:30'},
      {value: '13:00', viewValue: '13:00'},
      {value: '13:30', viewValue: '13:30'},
      {value: '14:00', viewValue: '14:00'},
      {value: '14:30', viewValue: '14:30'},
      {value: '15:00', viewValue: '15:00'},
      {value: '15:30', viewValue: '15:30'},
      {value: '16:00', viewValue: '16:00'},
      {value: '16:30', viewValue: '16:30'},
      {value: '17:00', viewValue: '17:00'},
      {value: '17:30', viewValue: '17:30'},
      {value: '18:00', viewValue: '18:00'},
      {value: '18:30', viewValue: '18:30'},
      {value: '19:00', viewValue: '19:00'},
      {value: '19:30', viewValue: '19:30'},
      {value: '20:00', viewValue: '20:00'},
      {value: '20:30', viewValue: '20:30'},
      {value: '21:00', viewValue: '21:00'},
      {value: '21:30', viewValue: '21:30'},
      {value: '22:00', viewValue: '22:00'},
      {value: '22:30', viewValue: '22:30'},
      {value: '23:00', viewValue: '23:00'},
      {value: '23:30', viewValue: '23:30'},
    ];
    closes = [
      {value: '00:00', viewValue: '00:00'},
      {value: '00:30', viewValue: '00:30'},
      {value: '01:00', viewValue: '01:00'},
      {value: '01:30', viewValue: '01:30'},
      {value: '02:00', viewValue: '02:00'},
      {value: '02:30', viewValue: '02:30'},
      {value: '03:00', viewValue: '03:00'},
      {value: '03:30', viewValue: '03:30'},
      {value: '04:00', viewValue: '04:00'},
      {value: '04:30', viewValue: '04:30'},
      {value: '05:00', viewValue: '05:00'},
      {value: '05:30', viewValue: '05:30'},
      {value: '06:00', viewValue: '06:00'},
      {value: '06:30', viewValue: '06:30'},
      {value: '07:00', viewValue: '07:00'},
      {value: '07:30', viewValue: '07:30'},
      {value: '08:00', viewValue: '08:00'},
      {value: '08:30', viewValue: '08:30'},
      {value: '09:00', viewValue: '09:00'},
      {value: '09:30', viewValue: '09:30'},
      {value: '10:00', viewValue: '10:00'},
      {value: '10:30', viewValue: '10:30'},
      {value: '11:00', viewValue: '11:00'},
      {value: '11:30', viewValue: '11:30'},
      {value: '12:00', viewValue: '12:00'},
      {value: '12:30', viewValue: '12:30'},
      {value: '13:00', viewValue: '13:00'},
      {value: '13:30', viewValue: '13:30'},
      {value: '14:00', viewValue: '14:00'},
      {value: '14:30', viewValue: '14:30'},
      {value: '15:00', viewValue: '15:00'},
      {value: '15:30', viewValue: '15:30'},
      {value: '16:00', viewValue: '16:00'},
      {value: '16:30', viewValue: '16:30'},
      {value: '17:00', viewValue: '17:00'},
      {value: '17:30', viewValue: '17:30'},
      {value: '18:00', viewValue: '18:00'},
      {value: '18:30', viewValue: '18:30'},
      {value: '19:00', viewValue: '19:00'},
      {value: '19:30', viewValue: '19:30'},
      {value: '20:00', viewValue: '20:00'},
      {value: '20:30', viewValue: '20:30'},
      {value: '21:00', viewValue: '21:00'},
      {value: '21:30', viewValue: '21:30'},
      {value: '22:00', viewValue: '22:00'},
      {value: '22:30', viewValue: '22:30'},
      {value: '23:00', viewValue: '23:00'},
      {value: '23:30', viewValue: '23:30'},
    ]
    public validate(){
        if( !this.editList.length){
            this.scDetails.isCompleted = false;
            this.scDetails.isValid = function () {
                alert("Please add branch(s) to be updated");
                return false;
            }
        }else if( !this.modifiedList.length  || this.modifiedList.length < this.editList.length){
            this.scDetails.isCompleted = false;
            this.scDetails.isValid = function () {
                alert("Please Update All branch(s)");
                return false;
            }
        }else{
            this.scDetails.isCompleted = true;
            this.scDetails.isValid = function () {
                return true;
            }
        }
    }


}