import { Component, OnInit } from '@angular/core';
import {WizardService} from "../../wizard/wizard.service";
import {Gam202Service} from "../../gam202/gam202.service";
import {DataTableConfigService} from "../../../common-services/data-table-config/data-table-config.service";
import {Scenario} from "../../gam202/classes/scenario";
import {ScRequest} from "../../commonClasses/sc-request";
import {ScDetails} from '../../commonClasses/sc-details';
import {GetDataTableService} from '../../sharedServices/get-data-table.service';

@Component({
  selector: 'app-gam267',
  templateUrl: './gam267.component.html',
  styleUrls: ['./gam267.component.scss']
})
export class Gam267Component implements OnInit {

    public editList: Array<any> = [];
    public modifiedList: Array<any> = [];
    public isModified: boolean = true;
    public isLoading: boolean = false;
    public scDetails: ScDetails = {
        listName: 'ussdList',
        data: this.modifiedList,
        isValid: function(){
            alert("Please add USSD(s) to be updated");
            return false;
        },
        fileName: 'USSD_Update',
        isCompleted: false
    };

    constructor(private api: GetDataTableService,
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
        this.wizService.updateSCDetailsMethod(this.scDetails)
        //this.wizService.USSDInfoMethod(this.modifiedList);
    };

    public scenario: Scenario = new Scenario();
    private scRequest: ScRequest = {
        TABLENAME: "SC_SMS_TEXT",
        START: "0",
        FILTER: "",
        COUNT:"1000"
    };

    ngOnInit() {
        //this.isLoading = true;
        /*this.api.getScenarioList(this.scRequest)
            .subscribe((data)=>{
                    this.isLoading = false;
                    this.scenario = data;
                },
                (err)=>{
                    this.isLoading = false;
                });*/
    }

    data = [{
    ID:1,CODE:'*166#',ENGLISH:"Your balance is 3000000 SAR",ARABIC:'رصيدك هو 99999999'
    }];
    columns = [
        { title: "ID", key: "ID"},
        { title: "USSD CODE", key: "CODE"},
        { title: "English text", key: "ENGLISH"},
        { title: "Arabic text", key: "ARABIC"},
        { title: "", key: "edit"}
    ];

    configuration = this.config.getConfig();
    configuration2 = this.config.getConfig();

    eventEmitted(e){

    }


    addToEdit(row){
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

        if(lang === 'E' && content !== obj.ENGLISH){
            obj.ENGLISH = content;
            changed = true;
        }else if(lang === 'A' && content !== obj.ARABIC){
            obj.ARABIC = content;
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

    isOriginalValue(obj, list: Array<any>): boolean{

        for(let i = 0; i < list.length; i++){
            if(list[i].ID === obj.ID){
                if(list[i].ENGLISH === obj.ENGLISH && list[i].ARABIC === obj.ARABIC){
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

    public validate(){
        if( !this.editList.length){
            this.scDetails.isCompleted = false;
            this.scDetails.isValid = function () {
                alert("Please add USSD(s) to be updated");
                return false;
            }
        }else if( !this.modifiedList.length  || this.modifiedList.length < this.editList.length){
            this.scDetails.isCompleted = false;
            this.scDetails.isValid = function () {
                alert("Please Update All USSD(s)");
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