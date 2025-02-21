import { Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ScRequest} from '../../commonClasses/sc-request';
import {GetDataTableService} from '../../sharedServices/get-data-table.service';
import {DataTableConfigService} from '../../../common-services/data-table-config/data-table-config.service';
import {WizardService} from '../../wizard/wizard.service';
import {ScDetails} from '../../commonClasses/sc-details';

@Component({
  selector: 'app-gam304',
  templateUrl: './gam304.component.html',
  styleUrls: ['./gam304.component.scss']
})
export class Gam304Component implements OnInit {
  public isLoading: boolean = false;
  public selectedRow : number;
  public listOfOperators: any[] = [];
  public editList: any[] = [];
  public formGroups: FormGroup[] = [];
  public formDetailsArr: any[] = [];
  private scRequest: ScRequest = {
       TABLENAME: "ECH_ROAMING_RATES",
       START: "0",
       FILTER: "",
       COUNT:"1000"
  };
  public scDetails: ScDetails = {
        listName: 'updateOperatorsRateList',
        data: this.editList,
        isValid: function(){
            alert("Please add Operator(s) to be added/updated");
            return false;
        },
        fileName: 'Update_Operators_Rate',
        isCompleted: false
  };
  constructor(private api: GetDataTableService,
              private config: DataTableConfigService,
              private wizService:WizardService) {
      this.wizService.updateSCDetailsMethod(this.scDetails)
      //this.wizService.updateOperatorRatesMethod(this.editList);
  }

  ngOnInit() {
      this.configuration.paginationEnabled = true;
      this.configuration.rows = 4;
      this.isLoading = true;
      this.api.getScenarioList(this.scRequest)
          .subscribe((data)=>{
            this.isLoading = false;
            this.listOfOperators = data.data;
        },
        (err)=>{
            this.isLoading = false;
        });
  }

/*  public formGroup: FormGroup = new FormGroup({
      'ID': new FormControl(null),
      'COUNTRY': new FormControl(null),
      'OPERATOR': new FormControl(null),
      'PREPAID_AVAIL': new FormControl(null),
      'POSTPAID_AVAIL': new FormControl(null),
      'ROAMING_CALLS': new FormControl(null),
      'ROAMING_INTERNET': new FormControl(null),
      'RECEIVING_CALLS_PACKAGE': new FormControl(null),
      'CREDIT_RECHARGE': new FormControl(null),
      'LOCAL_CALLS': new FormControl(null),
      'CALLS_TO_KSA': new FormControl(null),
      'RECEIVER_CALLS': new FormControl(null),
      'SENT_SMS': new FormControl(null),
      'INTERNATIONAL_CALLS': new FormControl(null),
      'JAWALNET_AND_SMS': new FormControl(null),
      'VOLUME_PKG1': new FormControl(null),
      'VALIDITY_PKG1': new FormControl(null),
      'PRICE_PKG1': new FormControl(null),
      'VOLUME_PKG2': new FormControl(null),
      'VALIDITY_PKG2': new FormControl(null),
      'PRICE_PKG2': new FormControl(null),
      'VOLUME_PKG3': new FormControl(null),
      'VALIDITY_PKG3': new FormControl(null),
      'PRICE_PKG3': new FormControl(null),
      'additionalInfo': new FormControl(null)
  });*/


/*
  public formDetails: any = {
      'prepaidAvailable': '',
      'postpaidAvailable': '',
      'roamingCall': '',
      'roamingInternet': '',
      'receivingCallPackage': '',
      'creditRecharge': '',
      'localCalls': '',
      'callsToKSA': '',
      'receiverCalls': '',
      'sentSMS': '',
      'internationalCalls': '',
      'javalnetAndSMS': '',
      'package1': {
          'volume': '',
          'validity': '',
          'price': ''
      },
      'package2': {
          'volume': '',
          'validity': '',
          'price': ''
      },
      'package3': {
          'volume': '',
          'validity': '',
          'price': ''
      },
      'additionalInfo': ''
  }
  public formDetails2: any = {
      'prepaidAvailable': true,
      'postpaidAvailable': '',
      'roamingCall': '',
      'roamingInternet': '',
      'receivingCallPackage': '',
      'creditRecharge': '',
      'localCalls': '',
      'callsToKSA': '',
      'receiverCalls': '',
      'sentSMS': '',
      'internationalCalls': '',
      'javalnetAndSMS': '',
      'package1': {
          'volume': '',
          'validity': '',
          'price': ''
      },
      'package2': {
          'volume': '',
          'validity': '',
          'price': ''
      },
      'package3': {
          'volume': '',
          'validity': '',
          'price': ''
      },
      'additionalInfo': ''
  }
*/

  public columns: any[] = [
      { key: "ID", title: "ID" },
      { key: "Country Name", title: "COUNTRY" },
      { key: "Operator Name", title: "OPERATOR" },
      { title: "", key: "edit"}
  ];

  public data: any[] = [];
  public configuration = this.config.getConfig();
  public eventEmitted($event){

  }

  public addToEdit(row){
      if(this.hasOperator(this.editList, row)){
          alert("You cannot add same Operator towice");
          return;
      }
      row.PREPAID_AVAIL = row.PREPAID_AVAIL==="1"?true:false;
      row.POSTPAID_AVAIL = row.POSTPAID_AVAIL==="1"?true:false;
      row.ROAMING_CALLS = row.ROAMING_CALLS==="1"?true:false;
      row.ROAMING_INTERNET = row.ROAMING_INTERNET==="1"?true:false;
      row.RECEIVING_CALLS_PACKAGE = row.RECEIVING_CALLS_PACKAGE==="1"?true:false;
      row.CREDIT_RECHARGE = row.CREDIT_RECHARGE==="1"?true:false;
      row['action'] = "UPDATE";
      this.editList.push(row);
      if(!this.selectedRow && this.selectedRow!==0)
          this.selectedRow = 0;
      else this.selectedRow = this.editList.length-1;
      this.validate();
  };

  public removeFromEdit(index){
      this.editList.splice(index, 1)
      this.selectedRow=this.selectedRow?this.selectedRow-1:this.selectedRow;
      this.validate();
  }

  public trClicked(i){
          this.selectedRow = i;
  }

  public addNewOperator(operator: NgForm){
      if(this.hasOperator(this.editList, {COUNTRY: operator.value.COUNTRY, OPERATOR: operator.value.OPERATOR})){
          alert("You cannot add same Operator towice");
          return;
      }
      this.editList.push({
          COUNTRY: operator.value.COUNTRY,
          OPERATOR: operator.value.OPERATOR,
          'PREPAID_AVAIL': false,
          'POSTPAID_AVAIL': false,
          'ROAMING_CALLS': false,
          'ROAMING_INTERNET': false,
          'RECEIVING_CALLS_PACKAGE': false,
          'CREDIT_RECHARGE': false,
          'LOCAL_CALLS': '',
          'CALLS_TO_KSA': '',
          'RECEIVER_CALLS': '',
          'SENT_SMS': '',
          'INTERNATIONAL_CALLS': '',
          'JAWALNET_AND_SMS': '',
          'VOLUME_PKG1': '',
          'VALIDITY_PKG1': '',
          'PRICE_PKG1': '',
          'VOLUME_PKG2': '',
          'VALIDITY_PKG2': '',
          'PRICE_PKG2': '',
          'VOLUME_PKG3': '',
          'VALIDITY_PKG3': '',
          'PRICE_PKG3': '',
          'additionalInfo': '',
          'action': 'NEW'
      });
      if(!this.selectedRow && this.selectedRow!==0)
          this.selectedRow = 0;
      else this.selectedRow = this.editList.length-1;
      this.validate();
  }

  hasOperator(list: any[], operator): boolean{
      for(let i = 0; i < list.length; i++){
          if(list[i].COUNTRY.toUpperCase() === operator.COUNTRY.toUpperCase()
              && list[i].OPERATOR.toUpperCase()  === operator.OPERATOR.toUpperCase() ){
              return true;
          }
      }
      return false;
  }

  validate(){
      if(this.editList.length) {
          this.scDetails.isCompleted = true;
          this.scDetails.isValid = function () {
              return true;
          }
      }else{
          this.scDetails.isCompleted = false;
          this.scDetails.isValid = function () {
              alert("Please add Operator(s) to be added/updated");
              return false;
          }
      }
  }
}
