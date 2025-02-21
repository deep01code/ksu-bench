import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {WizardService} from '../wizard.service';
import {ScBasicInfo} from '../classes/scbasic-info';
import {Document} from '../classes/document';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {HttpParameterCodec} from '@angular/common/http';
import {RoleAttendanceEntriesDto} from '../../../AttendanceService/classes/gam50/role-attendance-entries-dto';
import {MatStepper} from '@angular/material';
import {AppUpdate} from '../../gam266/classes/app-update';
import {AddBranchDocument} from '../classes/add-branch-document';
import {Branch} from '../../gam259/component/gam259.component';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {StopVoucherDocument} from '../classes/stopVoucherDocument'
import {Package} from '../../postpaid-packages/classes/package';
import {ScDetails} from '../../commonClasses/sc-details';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

    @ViewChild('matHorizontalStepper') stepper: MatStepper;
    offerType: string;
    scBasicInfo: ScBasicInfo;
    modifiedScenarioAreaList: Array<any>;
    firstStepCompleted: boolean = false;
    SCDetails: ScDetails = {
        fileName: '',
        data: '',
        isCompleted: false,
        isValid: new Function,
        listName: ''
    };
    constructor(private wizService: WizardService) {
        this.wizService.scBasicInfoMethod$.subscribe((data) => {
            this.scBasicInfo = data;
        });

        this.wizService.modifiedScenarioAreaListMethod$.subscribe((data) => {
            this.modifiedScenarioAreaList = data;
        });

        this.wizService.SCMethod$.subscribe((data=>{
            this.SCDetails = data;
        }))
    }

    getScBasicInfo(): void {
        this.wizService.scBasicInfoMethod$.subscribe(data => {
            this.scBasicInfo = data;
            this.submitDocument();
        });
    }




    goNext(stepper: MatStepper) {
        if (stepper.selectedIndex == 0) {
            this.firstStepCompleted = true;
            stepper.selected.completed = true;
            stepper.next();
        } else if (stepper.selectedIndex == 1 && this.SCDetails.isValid()) {
            stepper.next();
        } else if (stepper.selectedIndex == 2 && this.modifiedScenarioAreaListIsValid()) {
            stepper.next();
        }
    }

    modifiedScenarioAreaListIsValid(): boolean {
        if (this.modifiedScenarioAreaList && this.modifiedScenarioAreaList.length > 0) {
            return true;
        } else {
            alert("please choose at least one Scenario");
            return false
        }
    }

/*
    modifiedUSSDListIsValid(): boolean {
        this.getModifiedUSSDList();
        if (this.USSDModifiedList && this.USSDModifiedList.length > 0) {
            return true;
        } else {
            alert("please choose at least one Scenario");
            return false
        }
    }*/


    ngOnInit() {
    }




 /*   updatePostpaidPackagesIsValid():boolean {
        this.getUpdatedPostpaidPackages();
        if (this.updatedPostpaidPackages && this.updatedPostpaidPackages.length > 0) {
            return true;
        }
        alert("please choose at least one package and edit it");
        return false;
    }

    stopVouchersListIsValid(): boolean {
        this.getStopVouchersList();
        if (this.stopVouchersList && this.stopVouchersList.length > 0 ){
            return true;
        }
        alert("please choose at least one Voucher to stop");
        return false;
    }


    branchModifiedListIsValid(): boolean {
        this.getBranchModifiedList();
        if (this.branchModifiedList && this.branchModifiedList.length > 0) {
            return true;
        }
        alert("please choose at least one Branch and edit it");
        return false;
    }

    prepaidVoucherListIsValid(): boolean {
        this.getPrepaidVoucherList();
        if(this.prepaidVoucherList && this.prepaidVoucherList.length > 0){
            return true;
        }
        alert("please choose at least on Voucher to update");
        return false;
    }

    updateOperatorRatesisValid(): boolean {
        this.getUpdateOperatorRates();
        if (this.updateOperatorRates && this.updateOperatorRates.length > 0) {
            return true;
        }
        alert("Please select operators to be updated");
        return false;
    }*/
    submitDocument(): void {
        this.wizService.formIsSubmitted(true);

        if (!this.scBasicInfo.formIsValid()){
            return;
        }

        if(!this.offerType){
            alert("Please goto step #1 and select a scinario")
            return;
        }

        if(!this.SCDetails.isValid()){
            return;
        }

        if(!this.modifiedScenarioAreaList || !this.modifiedScenarioAreaList.length){
            alert("Please goto step #3 and select test scinario(s) ")
            return;
        }




        let doc = this.getDocument()



        this.wizService.generateDocument(doc).subscribe(data => {


            let blob = this.b64toBlob([data.data], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', null);

            let fileName: string = doc.data.title + '.docx';

            var blobUrl = window.URL.createObjectURL(blob);

            let a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

            a.href = blobUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);

            // window.open(blobUrl);

        });

    }

    b64toBlob(b64Data, contentType, sliceSize): any {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    convertSMSListToDocumentListFormat(array: Array<any>): Array<any> {
        let newArr = new Array<any>()
        for (var i = 0; i < array.length; i++) {
            newArr.push({id: array[i].ID, english: array[i].ENGLISH, arabic: array[i].ARABIC});
        }
        return newArr;
    }

    converScenarioListToDocumentListFormat(arr: Array<any>): Array<any> {
        let newArr = new Array<any>()
        for (var i = 0; i < arr.length; i++) {
            newArr.push({scenario: arr[i].SCENARIO, result: arr[i].EXPECTED_RESULT});
        }
        return newArr;
    }

    converStopVouchersListToDocumentListFormat(arr: Array<any>): Array<any> {
        let newArr = new Array<any>()
        for (var i = 0; i < arr.length; i++) {
            newArr.push({id: arr[i].VOUCHER_ID, name: arr[i].VOUCHER_NAME});
        }
        return newArr;
    }

    convertPrePaidListToDocumentListFormat(array: Array<any>): Array<any> {
        let newArr = new Array<any>();
        for (var i =0; i < array.length; i++){
            newArr.push({id: array[i].VOUCHER_ID,name: array[i].VOUCHER_NAME,
                arabicName: array[i].AR_NAME,engilshName: array[i].EN_NAME,price: array[i].PRICE,validity: array[i].VALIDITY});
        }
        return newArr;
    }

    getDocument(): any {
        let doc;
            doc = {
                templateFile:'/templates/'+this.SCDetails.fileName+'.docx',
            data : {
                title: this.scBasicInfo.serviceConceptTitle,
                offerType: this.offerType,
                detailedImpact: this.scBasicInfo.additionalInfo,
                sc_date: new Date().toDateString(),
                sc_description: this.scBasicInfo.serviceConceptTitle,
                requestor: {
                    name: this.scBasicInfo.requesterName, department: this.scBasicInfo.requesterDepartment,
                    email: this.scBasicInfo.requesterEmail, mobile: this.scBasicInfo.requesterMobilePhone,
                    businessUnit: this.scBasicInfo.requesterBusinessUnit
                },
                approver: {
                    name: this.scBasicInfo.approverName, department: this.scBasicInfo.approverDepartment,
                    email: this.scBasicInfo.approverEmail, mobile: this.scBasicInfo.approverMobilePhone,
                    businessUnit: this.scBasicInfo.approverBusinessUnit
                },
                overview: this.scBasicInfo.serviceConceptOverview,
                objectives: this.scBasicInfo.businessObjectives,
                regulatoryRisk: this.scBasicInfo.riskAssessmentRegularity,
                optionalRisk: this.scBasicInfo.riskAssessmentOperational,
                revenueImpact: this.scBasicInfo.businessImpactOnrevenues,
                customerExpImpact: this.scBasicInfo.businessImpactOnCustomerExp,
                urgencyFlag: this.scBasicInfo.isUrgent ? '*Urgent*' : '*Not urgent*',
                impactedChannels: this.scBasicInfo.chanelRequirements,
                targetSegments: this.scBasicInfo.targetedSegments,
                eligibilityCriteria: this.scBasicInfo.eligibilityCriterias,
                testScenarioList: this.converScenarioListToDocumentListFormat(this.modifiedScenarioAreaList)
            }};
            doc.data[this.SCDetails.listName] = this.SCDetails.data;

        return doc;
    }

/*
    validate():void{

        if (!this.modifiedScenarioAreaList || this.modifiedScenarioAreaList.length < 1) {
            alert("please choose at least one Scenario (in the third step)");
            return;
        }

        if (!this.scBasicInfo.formIsValid()) {
            alert("please fill the required fields");
            return;
        }

        if(this.offerType ==='Update SMS Text')
            if (!this.smsModifiedList || this.smsModifiedList.length < 1) {
                alert("please choose at least one sms message and edit it (in the second step)");
                return;
            } else if (!this.branchModifiedList || this.branchModifiedList.length < 1) {
                alert("please choose at least one branch and edit it (in the second step)");
                return;
            }
            else {
                this.newBranchInfo.isValid();
            }

    }
*/

    public SClist: any[] = [
        {
            link: "gam202",
            value: "Update SMS Text",
            isHidden: false,
            children:null
        },{
            link: "gam259",
            value: "Add new branch",
            isHidden: false,
            children:null
        },{
            link: "gam266",
            value: "App update",
            isHidden: false,
            children:null
        },{
            link: "gam258",
            value: "Update branch",
            isHidden: false,
            children:null
        },{
            link: "gamvouchers",
            value: "Stop Vouchers",
            isHidden: false,
            children:null
        },{
            link: "gamPrepaidVouchers",
            value: "Prepaid Vouchers",
            isHidden: false,
            children:null
        },{
            link: "postpaid",
            value: "Update Postpaid packages",
            isHidden: false,
            children:null
        },{
            link: "gam267",
            value: "USSD Update",
            isHidden: false,
            children:null
        },{
            link: "gam304",
            value: "Update Operator Rates",
            isHidden: false,
            children:null
        },{
        link:"",
        value:"Offers Details",
        isHidden:false,
        children:[{
                    link: "gam338",
                    value: "Update Offers Details",
                    isHidden: false,
                    children:null
                 },{
                    link: "gam340",
                    value: "Multimedia Service Update",
                    isHidden: false,
                    children:null
                }]
        },
    ]
}
