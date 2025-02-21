import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {PostpaidPackagesService} from '../postpaid-packages.service';
import {DataTableConfigService} from '../../../common-services/data-table-config/data-table-config.service';
import {AppUpdate} from '../../gam266/classes/app-update';
import {WizardService} from '../../wizard/wizard.service';
import {Package} from '../classes/package';
import {ScDetails} from '../../commonClasses/sc-details';

@Component({
  selector: 'app-postpaid-packages',
  templateUrl: './postpaid-packages.component.html',
  styleUrls: ['./postpaid-packages.component.scss']
})
export class PostpaidPackagesComponent implements OnInit {

    formGroup:FormGroup;

    public isLoading: boolean = false;
    public editList: Array<Package> = [];
    public modifiedList: Array<Package> = [];

    apps:Array<Package>;
    public scDetails: ScDetails = {
        listName: 'updatedPostpaidPackagesList',
        data: this.modifiedList,
        isValid: function(){
            alert("Please add package(s) to be updated");
            return false;
        },
        fileName: 'Updated Postpaid Packages',
        isCompleted: false
    };
    constructor(private _formBuilder: FormBuilder,
                private api:PostpaidPackagesService,
                private config:DataTableConfigService,
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

    configuration = this.config.getConfig();
    configuration2 = this.config.getConfig();

  ngOnInit() {
      // this.formGroup = this._formBuilder.group({
      //     arabicNameControl: ['', Validators.required],
      //     englishNameControl: ['', Validators.required],
      //     priceControl: ['', Validators.required],
      //     serviceIdControl: ['', Validators.required],
      //     serviceClassControl: ['', Validators.required],
      //
      // });
      this.isLoading = true;
      this.api.getApps()
          .subscribe((data)=>{
                  this.isLoading = false;
                  this.apps = data;
              },
              (err)=>{
                  this.isLoading = false;
              });
  }

    data = [];
    columns = [
        {title:"Product Name",key:"ProdName"},
        { title: "English Name", key: "ENGLISH"},
        { title: "Arabic Name", key: "ARABIC"},
        { title: "Validity", key: "VALIDITY"},
        { title: "Price",key:"PRICE"},
        { title: "Service ID", key:"Sid"},
        { title:"Service Class",key:"SClass"},
        { title: "", key: "edit"}
    ];

    addToEdit(row){
        this.editList.push(row);
        this.editList = [ ...this.editList];
    }

    removeFromEdit(row){
        let index = this.editList.indexOf(row);
        this.editList.splice(index, 1);
        this.editList = [...this.editList];
        this.removeFromEditedList(row.ProdName);
        this.validate();
    }

    removeFromEditedList(id){
        for (let i = 0; i < this.modifiedList.length; i++) {
            if (this.modifiedList[i].ProdName === id)
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
        }else if(lang === 'V' && content !== obj.VALIDITY){
            obj.VALIDITY = content;
            changed = true;
        }else if(lang === 'P' && content !== obj.PRICE){
            obj.PRICE = content;
            changed = true;
        }else if(lang === 'Sid' && content !== obj.Sid){
            obj.Sid = content;
            changed = true;
        }else if(lang === 'SClass' && content !== obj.SClass){
            obj.SClass = content;
            changed = true;
        }

        if( alreadyUpdated === -1 && changed) {
            this.modifiedList.push(obj)
        }else if(changed){
            this.modifiedList[this.containsObject(obj, this.modifiedList)] = obj;
        }

        if (this.isOriginalValue(obj, this.editList)) {
            this.removeFromEditedList(obj.ProdName)
        }
        this.validate()

    }

    containsObject(obj, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].ProdName === obj.ProdName) {
                return i;
            }
        }
        return -1;
    }

    isOriginalValue(obj, list: Array<any>): boolean{

        for(let i = 0; i < list.length; i++){
            if(list[i].ProdName === obj.ProdName){
                if(list[i].ENGLISH === obj.ENGLISH && list[i].ARABIC === obj.ARABIC
                    && list[i].VALIDITY === obj.VALIDITY && list[i].PRICE === obj.PRICE
                    && list[i].Sid === obj.Sid && list[i].SClass === obj.SClass){
                    return true
                }
                return false;
            }
        }
        return false
    }

    isNotChanged(obj){
        this.validate()
        for(let i = 0; i < this.modifiedList.length; i++) {
            if (obj.ProdName === this.modifiedList[i].ProdName) {
                return false;
            }
        }
        return true;
    }

    public validate(){
        if( !this.editList.length){
            this.scDetails.isCompleted = false;
            this.scDetails.isValid = function () {
                alert("Please add package(s) to be updated");
                return false;
            }
        }else if( !this.modifiedList.length  || this.modifiedList.length < this.editList.length){
            this.scDetails.isCompleted = false;
            this.scDetails.isValid = function () {
                alert("Please Update All package(s)");
                return false;
            }
        }else{
            this.scDetails.isCompleted = true;
            this.scDetails.isValid = function () {
                return true;
            }
        }
    }


    // onSubmit(form: NgForm) {
    //     console.log(form.form.getRawValue().arabicNameControl);
    //     console.log(form.status);
    //
    // }

    eventEmitted(e){
    }
}
