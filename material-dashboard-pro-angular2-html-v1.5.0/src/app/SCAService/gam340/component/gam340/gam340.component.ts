import { Component, OnInit } from '@angular/core';
import {ScDetails} from '../../../commonClasses/sc-details';
import {Gam340Service} from '../../gam340.service';
import {DataTableConfigService} from '../../../../common-services/data-table-config/data-table-config.service';
import {WizardService} from '../../../wizard/wizard.service';
import {ScRequest} from '../../../commonClasses/sc-request';

@Component({
  selector: 'app-gam340',
  templateUrl: './gam340.component.html',
  styleUrls: ['./gam340.component.scss']
})
export class Gam340Component implements OnInit {
    public multiMediaServiceList: Array<any> = [];
    public editList: Array<any> = [];
    public modifiedList: Array<any> = [];
    public isLoading: boolean = false;
    public scDetails: ScDetails = {
        listName: 'multiMediaUpdateList',
        data: this.modifiedList,
        isValid: function(){
            alert("Please add Service(s) to be updated");
            return false;
        },
        fileName: 'Multimedia_Service_Update',
        isCompleted: false
    };

  constructor(private api:Gam340Service,
              private config: DataTableConfigService,
              private wizService:WizardService) {
      this.configuration.orderEnabled = false;
      this.configuration.clickEvent = false;
      this.configuration.paginationEnabled = true;
      this.configuration.rows = 10;

      this.configuration2.orderEnabled = false;
      this.configuration2.clickEvent = false;
      this.configuration2.globalSearchEnabled = false;
      this.wizService.updateSCDetailsMethod(this.scDetails);
  }

    private scRequest: ScRequest = {
        TABLENAME: "SC_MULTIMEDIA_SERVICE",
        START: "0",
        FILTER: "",
        COUNT:"1000"
    };

  ngOnInit() {
      this.isLoading = true;
      this.api.getScenarioList(this.scRequest)
          .subscribe((data)=>{
                  this.isLoading = false;
                  this.multiMediaServiceList = data.data;
              },
              (err)=>{
                  this.isLoading = false;
              });
  }

    data = [];
    columns = [
        { title: "ID", key: "ID"},
        { title: "Code", key: "CODE"},
        { title: "SID", key: "SID"},
        { title: "Price", key: "PRICE"},
        { title: "Condition", key: "CONDITION"},
        { title: "", key: "edit"}
    ];

    configuration = this.config.getConfig();
    configuration2 = this.config.getConfig();

    eventEmitted(e){

    }

    addToEdit(row){
        this.scDetails.isValid = function () {
            alert("Please Update All Service(s)");
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

        if(lang === 'CODE' && content !== obj.CODE){
            obj.CODE = content;
            changed = true;
        }else if(lang === 'SID' && content !== obj.SID){
            obj.SID = content;
            changed = true;
        }else if(lang === 'PRICE' && content !== obj.PRICE){
            obj.PRICE = content;
            changed = true;
        }else if(lang === 'CONDITION' && content !== obj.CONDITION){
            obj.CONDITION = content;
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
                if(list[i].CODE === obj.CODE && list[i].SID === obj.SID
                    && list[i].PRICE === obj.PRICE && list[i].CONDITION === obj.CONDITION){
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
    }

    public validate(){
        if( !this.editList.length){
            this.scDetails.isCompleted = false;
            this.scDetails.isValid = function () {
                alert("Please add Service(s) to be updated");
                return false;
            }
        }else if( !this.modifiedList.length  || this.modifiedList.length < this.editList.length){
            this.scDetails.isCompleted = false;
            this.scDetails.isValid = function () {
                alert("Please Update All Service(s)");
                return false;
            }
        }else{
            this.scDetails.isCompleted = true;
            console.log(this.modifiedList)
            this.scDetails.isValid = function () {
                return true;
            }
        }
    }


}
