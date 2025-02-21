import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { LdapRequest } from '../classes/ldap-request';
import { LdapResponse } from '../classes/ldap-response';
import {Gam205Service} from '../gam205.service';
import {DropDownLists} from '../classes/drop-down-lists';
import {TableRequest} from '../classes/table-request';
import {DropDownList} from '../classes/drop-down-list';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { ScBasicInfo} from '../../wizard/classes/scbasic-info';
import {WizardService} from '../../wizard/wizard.service';


@Component({
  selector: 'app-gam205',
  templateUrl: './gam205.component.html',
  styleUrls: ['./gam205.component.scss']
})
export class Gam205Component implements OnInit {

    isSubmitted:boolean=false;

    info = new ScBasicInfo();

    // //service concept
    // serviceConceptTitle:string;
    // isUrgent:boolean = false;
    // serviceConceptOverview:string;
    // businessObjectives:string;
    //
    //
    // //contact info
    //
    // requesterEmail:string;
    // requesterName:string=' ';
    // requesterDepartment:string= ' ';
    // requesterBusinessUnit:string= ' ';
    // requesterMobilePhone:string= ' ';
    //
    // approverEmail:string;
    // approverName:string= ' ';
    // approverDepartment:string= ' ';
    // approverTitle:string= ' ';
    // approverBusinessUnit:string= ' ';
    // approverMobilePhone:string= ' ';
    //
    // //business Prioritizationi
    //
    // riskAssessmentRegularity:string;
    // riskAssessmentOperational:string;
    //
    // businessImpactOnrevenues:string;
    // businessImpactOnCustomerExp:string;
    //
    // targetedSegments:string[];
    //
    // eligibilityCriterias:string[];
    //
    // //chanel Requirements
    // chanelRequirements:string[];
    //
    // //additional Info
    // additionalInfo:string;

    //DropDowns

    dropDownLists:DropDownLists;


    constructor(private api: Gam205Service, private cd: ChangeDetectorRef,private wizService:WizardService) {
        this.wizService.scBasicInfoMethod(this.info);
    }

  ngOnInit() {
        this.getDropDownLists();
      this.wizService.formIsSubmitted$.subscribe(data=>{
          this.isSubmitted = data;
      })
  }

  getDropDownLists():void{
        this.dropDownLists = new DropDownLists();

        this.dropDownLists.OP_RISK= this.getDropDownList('OP_RISK');
        this.dropDownLists.TARGET_SYS = this.getDropDownList('TARGET_SYS');
        this.dropDownLists.IMP_REV = this.getDropDownList('IMP_REV');
        this.dropDownLists.IMP_CUST = this.getDropDownList('IMP_CUST');
        this.dropDownLists.ELIGIBILITY = this.getDropDownList('ELIGIBILITY');
        this.dropDownLists.CHANNEL = this.getDropDownList('CHANNEL');
        this.dropDownLists.REG_RISK = this.getDropDownList('REG_RISK');



  }

  getLdap():void{
  }

  getDropDownList(name:string):DropDownList{
        let dropDown = new DropDownList();
        let req = new TableRequest();
        req.TABLENAME = 'SC_LOVS';
        req.START = '0';
        req.COUNT = '100';
        req.FILTER = 'LOV_TYPE=\'' + name + '\'';

        this.api.getDropDownList(req)
            .subscribe(data =>{
                dropDown.errorCode=data.errorCode;
                dropDown.errorMessage=data.errorMessage;
                dropDown.data=data.data;

            } );
        return dropDown;
  }


    getRequesterInfo():void {
        if (!this.isEmail(this.info.requesterEmail) && this.info.requesterEmail){
            this.info.requesterEmail+="@stc.com.sa";
        }
        this.cd.detectChanges();
        if (this.info.requesterEmail) {
            let req = new LdapRequest();
            req.LDAPEMAIL = this.info.requesterEmail;
            this.api.getLdapInfo(req)
                .subscribe(data => {
                    if (data.errorCode=='2'){
                        this.sweetAlert(data.errorMessage,'requester');
                        return
                    }
                    this.info.requesterName = data.data.name;
                    this.info.requesterDepartment = data.data.department;
                    this.info.requesterBusinessUnit = data.data.section;
                    this.info.requesterMobilePhone = data.data.mobile;
                    this.cd.detectChanges();

                });
        }
  }

    getApproverInfo():void {
        if (!this.isEmail(this.info.approverEmail) && this.info.approverEmail){
            this.info.approverEmail += "@stc.com.sa";
        }
        if (this.info.approverEmail) {
            let req = new LdapRequest();
            req.LDAPEMAIL = this.info.approverEmail;

            this.api.getLdapInfo(req)
                .subscribe(data => {
                    if (data.errorCode=='2'){
                        this.sweetAlert(data.errorMessage,'approver');
                        return;
                    }
                    this.info.approverName = data.data.name;
                    this.info.approverDepartment = data.data.department;
                    this.info.approverTitle = data.data.title;
                    this.info.approverBusinessUnit = data.data.section;
                    this.info.approverMobilePhone = data.data.mobile;
                });
        }
    }

    isEmail(email:string):boolean{
        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regexp.test(email);
    }

    isInputValid(str):boolean {
        if(!this.isSubmitted){
            return false;
        }
        if (str === 'title' ) {
            if (!this.info.serviceConceptTitle) {
                return true;
            }
        }
        else if (str === 'overview' ) {
            if (!this.info.serviceConceptOverview) {
                return true;
            }
        }
        else if (str === 'businessObjectives' ) {
            if (!this.info.businessObjectives) {
                return true;
            }
        }
        else if (str === 'requesterEmail' ) {
            if (!this.info.requesterEmail) {
                return true;
            }
        }
        else if (str === 'requesterName' ) {
            if (this.info.requesterName.length<2) {
                return true;
            }
        }
        else if (str === 'requesterDepartment' ) {
            if (this.info.requesterDepartment.length<2) {
                return true;
            }
        }
        else if (str === 'requesterBusinessUnit' ) {
            if (this.info.requesterBusinessUnit.length<2) {
                return true;
            }
        }
        else if (str === 'requesterMobilePhone' ) {
            if (this.info.requesterMobilePhone.length<2) {
                return true;
            }
        }
        else if (str === 'approverEmail') {
            if (!this.info.approverEmail) {
                return true;
            }
        }
        else if (str === 'approverName' ) {
            if (this.info.approverName.length<2) {
                return true;
            }
        }
        else if (str === 'approverDepartment' ) {
            if (this.info.approverDepartment.length<2) {
                return true;
            }
        }
        else if (str === 'approverTitle' ) {
            if (this.info.approverTitle.length<2) {
                return true;
            }
        }
        else if (str === 'approverBusinessUnit' ) {
            if (this.info.approverBusinessUnit.length<2) {
                return true;
            }
        }
        else if (str === 'approverMobilePhone' ) {
            if (this.info.approverMobilePhone.length<2) {
                return true;
            }
        }
        else if (str === 'reqRisk' ) {
            if (!this.info.riskAssessmentRegularity) {
                return true;
            }
        }
        else if (str === 'opRisk' ) {
            if (!this.info.riskAssessmentOperational) {
                return true;
            }
        }
        else if (str === 'impOnRev' ) {
            if (!this.info.businessImpactOnrevenues) {
                return true;
            }
        }
        else if (str === 'impOnCustExp' ) {
            if (!this.info.businessImpactOnCustomerExp) {
                return true;
            }

        }
        else if (str === 'targetedSegs' ) {
            if (!this.info.targetedSegments || this.info.targetedSegments.length==0) {
                    return true;
            }
        }
        else if (str === 'eligCriteria' ) {
            if (!this.info.eligibilityCriterias || this.info.eligibilityCriterias.length==0) {
                return true;
            }
        }
        else if (str === 'channelReqs' ) {
            if (!this.info.chanelRequirements || this.info.chanelRequirements.length==0) {
                return true;
            }
        }
        else
            return false;
    }

    formIsValid():boolean{
        this.isSubmitted = true;
        if (this.info.serviceConceptTitle && this.info.serviceConceptOverview && this.info.businessObjectives
            && this.info.requesterEmail && this.isEmail(this.info.requesterEmail) && this.info.requesterName
            && this.info.requesterDepartment && this.info.requesterDepartment && this.info.requesterBusinessUnit
            && this.info.requesterMobilePhone
            && this.info.approverEmail && this.isEmail(this.info.approverEmail) && this.info.approverName
            && this.info.approverName && this.info.approverDepartment && this.info.approverTitle
            && this.info.approverBusinessUnit && this.info.approverMobilePhone
            && this.info.riskAssessmentRegularity && this.info.riskAssessmentOperational
            && this.info.businessImpactOnrevenues && this.info.businessImpactOnCustomerExp
            && this.info.targetedSegments && this.info.targetedSegments.length!=0
            && this.info.eligibilityCriterias && this.info.eligibilityCriterias.length!=0
            && this.info.chanelRequirements && this.info.chanelRequirements.length!=0){
                return true;
        }
        return false;
    }


    //person is either requester or approver
    sweetAlert(message:string,person:string) {

            swal({
                title: 'error',
                html: '<div>' +
                '<h6>'+message+'</h6>' +
                    '<p>if you are sure that the provided email is valid, please provide the remaining fields of the '+person+ ' information ' +
                '</div>',
                showCancelButton: false,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false
            }).then(function (result) {

            }).catch(swal.noop);
        }




}
