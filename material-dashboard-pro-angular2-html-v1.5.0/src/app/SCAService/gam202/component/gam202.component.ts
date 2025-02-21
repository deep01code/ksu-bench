import {Component, OnInit} from '@angular/core';
import {Gam202Service} from '../gam202.service';
import {Scenario} from '../classes/scenario';
import {DataTableConfigService} from '../../../common-services/data-table-config/data-table-config.service';
import {ScRequest} from '../../commonClasses/sc-request';
import {WizardService} from '../../wizard/wizard.service';
import {ScDetails} from '../../commonClasses/sc-details';

@Component({
  selector: 'app-gam202',
  templateUrl: './gam202.component.html',
  styleUrls: ['./gam202.component.scss'],
  providers:[Gam202Service]
})
export class Gam202Component implements OnInit {
  public editList: Array<any> = [];
  public modifiedList: Array<any> = [];
  public isModified: boolean = true;
  public isLoading: boolean = false;
  public isValid: boolean;
  public scDetails: ScDetails = {
      listName: 'smsUpdateList',
      data: this.modifiedList,
      isValid: function(){
          alert("Please add SMS(s) to be updated");
          return false;
      },
      fileName: 'SMS_Update',
      isCompleted: false
  };


  constructor(private api: Gam202Service,
              private config: DataTableConfigService,
              private wizService:WizardService) {
      // table config modification
      this.configuration.orderEnabled = false;
      this.configuration.clickEvent = false;
      this.configuration.paginationEnabled = true;
      this.configuration.rows = 10;

      this.configuration2.orderEnabled = false;
      this.configuration2.clickEvent = false;
      this.configuration2.globalSearchEnabled = false;
      this.wizService.updateSCDetailsMethod(this.scDetails);
  };

  public scenario: Scenario = new Scenario();
  private scRequest: ScRequest = {
                                    TABLENAME: "SC_SMS_TEXT",
                                    START: "0",
                                    FILTER: "",
                                    COUNT:"1000"
                                };

  ngOnInit() {
      this.isLoading = true;
      this.api.getScenarioList(this.scRequest)
          .subscribe((data)=>{
              this.isLoading = false;
              this.scenario = data;
          },
              (err)=>{
                    this.isLoading = false;
          });

  }

  data = [];
  columns = [
      { title: "ID", key: "ID"},
      { title: "English text", key: "ENGLISH"},
      { title: "Arabic text", key: "ARABIC"},
      { title: "Features and Limitations", key:"FEATURES_AND_LIMITATIONS"},
      { title: "", key: "edit"}
  ];

  configuration = this.config.getConfig();
  configuration2 = this.config.getConfig();

  eventEmitted(e){

  }


  addToEdit(row){
      this.scDetails.isValid = function () {
          alert("Please Update All SMS(s)");
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
      this.removeFromModifiedList(row.ID)
      this.validate();
  }

  removeFromModifiedList(id){
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

      if(lang === 'E' && content !== obj.ENGLISH){
          obj.ENGLISH = content;
          changed = true;
      }else if(lang === 'A' && content !== obj.ARABIC){
          obj.ARABIC = content;
          changed = true;
      }else if(lang === 'FL' && content !== obj.FEATURES_AND_LIMITATIONS){
          obj.FEATURES_AND_LIMITATIONS = content;
          changed = true;
      }
      if( alreadyUpdated === -1 && changed) {
          this.modifiedList.push(obj)
      }else if(changed){
          this.modifiedList[this.containsObject(obj, this.modifiedList)] = obj;
      }

      if (this.isOriginalValue(obj)) {
          this.removeFromModifiedList(obj.ID)
      }
      this.validate();
  }



    containsObject(obj, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].ID === obj.ID) {
                return i;
            }
        }
        return -1;
    }

    isOriginalValue(obj){
      let list = this.editList;
      for(let i = 0; i < list.length; i++){
          if(+list[i].ID === +obj.ID){
              if(list[i].ENGLISH === obj.ENGLISH
                  &&
                  list[i].ARABIC === obj.ARABIC
                  &&
                  list[i].FEATURES_AND_LIMITATIONS === obj.FEATURES_AND_LIMITATIONS)
              {
                  return true;
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
    };

  public validate(){
      if( !this.editList.length){
          this.scDetails.isCompleted = false;
          this.scDetails.isValid = function () {
              alert("Please add SMS(s) to be updated");
              return false;
          }
      }else if( !this.modifiedList.length  || this.modifiedList.length < this.editList.length){
          this.scDetails.isCompleted = false;
          this.scDetails.isValid = function () {
              alert("Please Update All SMS(s)");
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
