import {Domain, JobLevel, JobName, System} from './system-domain';
import { Vendor } from './vendor';
import {Project} from "./project";
import {Department, GeneralDepartment, Section} from "./GeneralDepartment";
import {FinancialUnit, ManagerialUnit} from "../../UserService/classes/managerialUnit";
export class Employee {

    id: String;
    employeeEnglishName: String;
    employeeArabicName: String;
    employeeNumber: String;
    employeeId: String;
    nationality: String;
    gender: String;
    maritalStatus: boolean;
    stcEmployee:boolean;
    ps:boolean;
    numberofSponsors: number;
    numberofChild: number;
    startDate: Date;
    endDate: Date;
    stcEmail: String;
    personalEmail: String;
    building: String;
    floor: String;
    desk: String;
    workingType: String;
    skills: String;
    certificates: String[]; // files attachment start
    cvs: String[];
    letters: String[];// files attachment end
    basic: number;/// salary information start
    housing: number;
    transportation: number;
    employeeGOSI: number;
    companyGOSI: number;
    employeeSalary: number;
    totalSalary: number;
    medical: number;
    endOfService: number;
    iqamaRenewal: number;
    governmentFees: number;
    ajeerFees: number;
    dailyRate: number;
    benefits:Benefit[]; // salary information end
    attendanceExceptions:AttendanceException[];
    employeeManagerialUnit:ManagerialUnit;
    employeeFinancialUnit:FinancialUnit;
    domain:Domain ;
    system:System ;
    jobName:JobName ;
    jobLevel:JobLevel ;
    phoneNumber:string;
    dob:string;
}

export class Benefit{
     id: string;
     amount: number;
     benefitType:string;
     benefitDate:Date;

}

export class AttendanceException{
    id: string;
    startDate: Date;
    endDate: Date;
}


/*
var array=   ["employeeEnglishName",
    "employeeArabicName",
    "employeeNumber",
    "employeeId",
    "nationality",
    "vendor",
    "gender",
    "maritalStatus",
    "numberofSponsors",
    "numberofChild",
    "startDate",
    "endDate",
    "stcEmail",
    "personalEmail",
    "generalDepartment",
    "department",
    "section",
    "building",
    "floor",
    "desk",
    "jobName",
    "jobCategory",
    "workingType",
    "systemDomains",
    "domain",
    "level",
    "ps",
    "skills"]


var code="start";

array.forEach(function(obj) {

    code=code.concat("<!-- ====> "+obj+" -->")
    code=code.concat("\n")
    code=code.concat('<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="'+obj+'"  #'+obj+'="ngModel"   placeholder="'+obj.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })+'" required /> </mat-form-field> </div>')
    code=code.concat("\n")
    code=code.concat("\n")

});


    code=code.concat("end")
    console.log(code)

    */


/*
<!-- ====> employeeEnglishName -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="employeeEnglishName"  #employeeEnglishName="ngModel"   placeholder="Employee English Name" required /> </mat-form-field> </div>

<!-- ====> employeeArabicName -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="employeeArabicName"  #employeeArabicName="ngModel"   placeholder="Employee Arabic Name" required /> </mat-form-field> </div>

<!-- ====> employeeNumber -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="employeeNumber"  #employeeNumber="ngModel"   placeholder="Employee Number" required /> </mat-form-field> </div>

<!-- ====> employeeId -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="employeeId"  #employeeId="ngModel"   placeholder="Employee Id" required /> </mat-form-field> </div>

<!-- ====> nationality -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="nationality"  #nationality="ngModel"   placeholder="Nationality" required /> </mat-form-field> </div>

<!-- ====> vendor -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="vendor"  #vendor="ngModel"   placeholder="Vendor" required /> </mat-form-field> </div>

<!-- ====> gender -->
<!-- <div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="gender"  #gender="ngModel"   placeholder="Gender" required /> </mat-form-field> </div>-->

<!-- ====> maritalStatus -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="maritalStatus"  #maritalStatus="ngModel"   placeholder="Marital Status" required /> </mat-form-field> </div>

<!-- ====> numberofSponsors -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="numberofSponsors"  #numberofSponsors="ngModel"   placeholder="Numberof Sponsors" required /> </mat-form-field> </div>

<!-- ====> numberofChild -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="numberofChild"  #numberofChild="ngModel"   placeholder="Numberof Child" required /> </mat-form-field> </div>

<!-- ====> startDate -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="startDate"  #startDate="ngModel"   placeholder="Start Date" required /> </mat-form-field> </div>

<!-- ====> endDate -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="endDate"  #endDate="ngModel"   placeholder="End Date" required /> </mat-form-field> </div>

<!-- ====> stcEmail -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="stcEmail"  #stcEmail="ngModel"   placeholder="Stc Email" required /> </mat-form-field> </div>

<!-- ====> personalEmail -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="personalEmail"  #personalEmail="ngModel"   placeholder="Personal Email" required /> </mat-form-field> </div>

<!-- ====> generalDepartment -->
<!-- <div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="generalDepartment"  #generalDepartment="ngModel"   placeholder="General Department" required /> </mat-form-field> </div> -->

<!-- ====> department -->
<!-- <div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="department"  #department="ngModel"   placeholder="Department" required /> </mat-form-field> </div> -->

<!-- ====> section -->
<!-- <div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="section"  #section="ngModel"   placeholder="Section" required /> </mat-form-field> </div> -->

<!-- ====> building -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="building"  #building="ngModel"   placeholder="Building" required /> </mat-form-field> </div>

<!-- ====> floor -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="floor"  #floor="ngModel"   placeholder="Floor" required /> </mat-form-field> </div>

<!-- ====> desk -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="desk"  #desk="ngModel"   placeholder="Desk" required /> </mat-form-field> </div>

<!-- ====> jobName -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="jobName"  #jobName="ngModel"   placeholder="Job Name" required /> </mat-form-field> </div>

<!-- ====> jobCategory -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="jobCategory"  #jobCategory="ngModel"   placeholder="Job Category" required /> </mat-form-field> </div>

<!-- ====> workingType -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="workingType"  #workingType="ngModel"   placeholder="Working Type" required /> </mat-form-field> </div>

<!-- ====> systemDomains -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="systemDomains"  #systemDomains="ngModel"   placeholder="System Domains" required /> </mat-form-field> </div>

<!-- ====> domain -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="domain"  #domain="ngModel"   placeholder="Domain" required /> </mat-form-field> </div>

<!-- ====> level -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="level"  #level="ngModel"   placeholder="Level" required /> </mat-form-field> </div>

<!-- ====> ps -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="ps"  #ps="ngModel"   placeholder="Ps" required /> </mat-form-field> </div>

<!-- ====> skills -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="skills"  #skills="ngModel"   placeholder="Skills" required /> </mat-form-field> </div>
*/



/*
* <div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="basic"  #basic="ngModel"   placeholder="Basic" required /> </mat-form-field> </div>

<!-- ====> housing -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="housing"  #housing="ngModel"   placeholder="Housing" required /> </mat-form-field> </div>

<!-- ====> transportation -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="transportation"  #transportation="ngModel"   placeholder="Transportation" required /> </mat-form-field> </div>

<!-- ====> employeeGOSI -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="employeeGOSI"  #employeeGOSI="ngModel"   placeholder="Employee G O S I" required /> </mat-form-field> </div>

<!-- ====> companyGOSI -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="companyGOSI"  #companyGOSI="ngModel"   placeholder="Company G O S I" required /> </mat-form-field> </div>

<!-- ====> employeeSalary -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="employeeSalary"  #employeeSalary="ngModel"   placeholder="Employee Salary" required /> </mat-form-field> </div>

<!-- ====> totalSalary -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="totalSalary"  #totalSalary="ngModel"   placeholder="Total Salary" required /> </mat-form-field> </div>

<!-- ====> medical -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="medical"  #medical="ngModel"   placeholder="Medical" required /> </mat-form-field> </div>

<!-- ====> endOfService -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="endOfService"  #endOfService="ngModel"   placeholder="End Of Service" required /> </mat-form-field> </div>

<!-- ====> iqamaRenewal -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="iqamaRenewal"  #iqamaRenewal="ngModel"   placeholder="Iqama Renewal" required /> </mat-form-field> </div>

<!-- ====> governmentFees -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="governmentFees"  #governmentFees="ngModel"   placeholder="Government Fees" required /> </mat-form-field> </div>

<!-- ====> ajeerFees -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="ajeerFees"  #ajeerFees="ngModel"   placeholder="Ajeer Fees" required /> </mat-form-field> </div>

<!-- ====> dailyRate -->
<div class="col-md-4">  <mat-form-field style="width: 90%">    <input  matInput   ngModel   name="dailyRate"  #dailyRate="ngModel"   placeholder="Daily Rate" required /> </mat-form-field> </div>

* */



/*
 projects

[{"id":1,"projectName":"Projection projection","projectNumber":1,"projectType":"Projection","yearOfProject":"1","finNumber":"1","projectValue":1,"proejctDescription":"12","startDate":"2021-02-01","endDate":"2021-02-16","sectorOwner":"1","expenseType":"CAPEX","ps":true,"requestingGD":{"id":1,"generalDepartmentNumber":215,"gdEnName":"Consumer Enablement","gdArName":"تمكين المستهلك","departments":[{"id":1,"departmentNumber":114,"departmentEnglishName":"Core Processing Applications","departmentArabicName":"تطبيقات المعالجة الأساسية","sections":[{"id":1,"sectionNumber":11,"sectionEnglishName":"Consumer Mediation and Billing","sectionArabicName":"قسم الفوترة","domains":[{"id":1,"systemDomainNumber":"123","systemDomainEngName":"CRM","systemDescription":"Test Desc","companyName":"Oracle","companyCountry":"USA","createdDate":"2021-02-15T15:38:31.933+00:00","lastModifiedDate":"2021-02-15T15:38:31.933+00:00","sectionName":"Consumer Mediation and Billing","departmentName":"Core Processing Applications","gdName":"Consumer Enablement","sectionId":1}]},{"id":2,"sectionNumber":12,"sectionEnglishName":"Charging and Rating Systems","sectionArabicName":"قسم التكاليف والحسابات","domains":[]}]},{"id":2,"departmentNumber":113,"departmentEnglishName":"Consumer Solutions","departmentArabicName":"حلول المستهلك","sections":[{"id":3,"sectionNumber":13,"sectionEnglishName":"Release Management","sectionArabicName":"قسم إدارة الإصدارات","domains":[]},{"id":4,"sectionNumber":14,"sectionEnglishName":"CEX,CVM and Sales Solutions","sectionArabicName":"قسم حلول البيع وتجربة العميل","domains":[]}]}]},"contracts":[{"id":1,"poNumber":"1","poIssueDate":"2021-02-01","poEndDate":"2021-02-10","poValue":12.0,"marginPercent":12,"marginCap":12,"subProjectDescription":"12","vendor":{"id":1,"name":"TCS","number":"34","type":"Main Contractor","commercialRegistration":566721565,"vatNumber":254867,"website":"www.tcs.com","contact":[{"id":1,"name":"Suresh Kumar","jobTitle":"Account Manager","mobileNumber":5544668877,"emailAddress":"sukumar@tcs.com"},{"id":2,"name":"Vinay Juri","jobTitle":"Project Manager","mobileNumber":5654668877,"emailAddress":"vinay@tcs.com"}],"endDate":null},"contacts":[],"subcontracts":[]}],"systemDomains":[{"id":1,"systemDomainNumber":"123","systemDomainEngName":"CRM","systemDescription":"Test Desc","companyName":"Oracle","companyCountry":"USA","createdDate":"2021-02-15T15:38:31.933+00:00","lastModifiedDate":"2021-02-15T15:38:31.933+00:00","sectionName":"Consumer Mediation and Billing","departmentName":"Core Processing Applications","gdName":"Consumer Enablement","sectionId":1}],"multiYearAgreement":true},{"id":2,"projectName":"MS project","projectNumber":2,"projectType":"MS","yearOfProject":"2","finNumber":"2","projectValue":2,"proejctDescription":"2323","startDate":"2021-02-25","endDate":"2021-02-24","sectorOwner":"2","expenseType":"OPEX","ps":true,"requestingGD":{"id":1,"generalDepartmentNumber":215,"gdEnName":"Consumer Enablement","gdArName":"تمكين المستهلك","departments":[{"id":1,"departmentNumber":114,"departmentEnglishName":"Core Processing Applications","departmentArabicName":"تطبيقات المعالجة الأساسية","sections":[{"id":1,"sectionNumber":11,"sectionEnglishName":"Consumer Mediation and Billing","sectionArabicName":"قسم الفوترة","domains":[{"id":1,"systemDomainNumber":"123","systemDomainEngName":"CRM","systemDescription":"Test Desc","companyName":"Oracle","companyCountry":"USA","createdDate":"2021-02-15T15:38:31.933+00:00","lastModifiedDate":"2021-02-15T15:38:31.933+00:00","sectionName":"Consumer Mediation and Billing","departmentName":"Core Processing Applications","gdName":"Consumer Enablement","sectionId":1}]},{"id":2,"sectionNumber":12,"sectionEnglishName":"Charging and Rating Systems","sectionArabicName":"قسم التكاليف والحسابات","domains":[]}]},{"id":2,"departmentNumber":113,"departmentEnglishName":"Consumer Solutions","departmentArabicName":"حلول المستهلك","sections":[{"id":3,"sectionNumber":13,"sectionEnglishName":"Release Management","sectionArabicName":"قسم إدارة الإصدارات","domains":[]},{"id":4,"sectionNumber":14,"sectionEnglishName":"CEX,CVM and Sales Solutions","sectionArabicName":"قسم حلول البيع وتجربة العميل","domains":[]}]}]},"contracts":[{"id":2,"poNumber":"4","poIssueDate":"2021-02-09","poEndDate":"2021-02-09","poValue":23.0,"marginPercent":0,"marginCap":0,"subProjectDescription":"23","vendor":1,"contacts":[],"subcontracts":[]}],"systemDomains":[{"id":1,"systemDomainNumber":"123","systemDomainEngName":"CRM","systemDescription":"Test Desc","companyName":"Oracle","companyCountry":"USA","createdDate":"2021-02-15T15:38:31.933+00:00","lastModifiedDate":"2021-02-15T15:38:31.933+00:00","sectionName":"Consumer Mediation and Billing","departmentName":"Core Processing Applications","gdName":"Consumer Enablement","sectionId":1}],"multiYearAgreement":true},{"id":3,"projectName":"TM","projectNumber":3,"projectType":"TM","yearOfProject":"3","finNumber":"3","projectValue":3,"proejctDescription":"23","startDate":"2021-02-23","endDate":"2021-02-24","sectorOwner":"32","expenseType":"CAPEX","ps":true,"requestingGD":{"id":1,"generalDepartmentNumber":215,"gdEnName":"Consumer Enablement","gdArName":"تمكين المستهلك","departments":[{"id":1,"departmentNumber":114,"departmentEnglishName":"Core Processing Applications","departmentArabicName":"تطبيقات المعالجة الأساسية","sections":[{"id":1,"sectionNumber":11,"sectionEnglishName":"Consumer Mediation and Billing","sectionArabicName":"قسم الفوترة","domains":[{"id":1,"systemDomainNumber":"123","systemDomainEngName":"CRM","systemDescription":"Test Desc","companyName":"Oracle","companyCountry":"USA","createdDate":"2021-02-15T15:38:31.933+00:00","lastModifiedDate":"2021-02-15T15:38:31.933+00:00","sectionName":"Consumer Mediation and Billing","departmentName":"Core Processing Applications","gdName":"Consumer Enablement","sectionId":1}]},{"id":2,"sectionNumber":12,"sectionEnglishName":"Charging and Rating Systems","sectionArabicName":"قسم التكاليف والحسابات","domains":[]}]},{"id":2,"departmentNumber":113,"departmentEnglishName":"Consumer Solutions","departmentArabicName":"حلول المستهلك","sections":[{"id":3,"sectionNumber":13,"sectionEnglishName":"Release Management","sectionArabicName":"قسم إدارة الإصدارات","domains":[]},{"id":4,"sectionNumber":14,"sectionEnglishName":"CEX,CVM and Sales Solutions","sectionArabicName":"قسم حلول البيع وتجربة العميل","domains":[]}]}]},"contracts":[{"id":3,"poNumber":"3","poIssueDate":"2021-02-01","poEndDate":"2021-01-13","poValue":3.0,"marginPercent":0,"marginCap":0,"subProjectDescription":"3","vendor":{"id":2,"name":"STCs","number":"12","type":"Both","commercialRegistration":233564565,"vatNumber":4135867,"website":"www.stcs.com.sa","contact":[{"id":3,"name":"Waleed Alsanad","jobTitle":"Account Manager","mobileNumber":558877909,"emailAddress":"walsanad@stcs.com.sa"}],"endDate":null},"contacts":[],"subcontracts":[]}],"systemDomains":[{"id":2,"systemDomainNumber":"66","systemDomainEngName":"RBM","systemDescription":"","companyName":"GINIVA","companyCountry":"Canada","createdDate":"2021-02-15T15:38:31.988+00:00","lastModifiedDate":"2021-02-15T15:38:31.988+00:00","sectionName":"Applications Financial Planning","departmentName":"Financial Planning And Control","gdName":"Applications Planning & Control","sectionId":5}],"multiYearAgreement":true},{"id":4,"projectName":"scope project","projectNumber":4,"projectType":"Scope","yearOfProject":"44","finNumber":"4","projectValue":4,"proejctDescription":"4","startDate":"2021-02-23","endDate":"2021-02-18","sectorOwner":"4","expenseType":"CAPEX","ps":true,"requestingGD":{"id":1,"generalDepartmentNumber":215,"gdEnName":"Consumer Enablement","gdArName":"تمكين المستهلك","departments":[{"id":1,"departmentNumber":114,"departmentEnglishName":"Core Processing Applications","departmentArabicName":"تطبيقات المعالجة الأساسية","sections":[{"id":1,"sectionNumber":11,"sectionEnglishName":"Consumer Mediation and Billing","sectionArabicName":"قسم الفوترة","domains":[{"id":1,"systemDomainNumber":"123","systemDomainEngName":"CRM","systemDescription":"Test Desc","companyName":"Oracle","companyCountry":"USA","createdDate":"2021-02-15T15:38:31.933+00:00","lastModifiedDate":"2021-02-15T15:38:31.933+00:00","sectionName":"Consumer Mediation and Billing","departmentName":"Core Processing Applications","gdName":"Consumer Enablement","sectionId":1}]},{"id":2,"sectionNumber":12,"sectionEnglishName":"Charging and Rating Systems","sectionArabicName":"قسم التكاليف والحسابات","domains":[]}]},{"id":2,"departmentNumber":113,"departmentEnglishName":"Consumer Solutions","departmentArabicName":"حلول المستهلك","sections":[{"id":3,"sectionNumber":13,"sectionEnglishName":"Release Management","sectionArabicName":"قسم إدارة الإصدارات","domains":[]},{"id":4,"sectionNumber":14,"sectionEnglishName":"CEX,CVM and Sales Solutions","sectionArabicName":"قسم حلول البيع وتجربة العميل","domains":[]}]}]},"contracts":[{"id":4,"poNumber":"4","poIssueDate":"2021-02-01","poEndDate":"2021-01-13","poValue":23.0,"marginPercent":0,"marginCap":0,"subProjectDescription":"asdf","vendor":2,"contacts":[],"subcontracts":[]}],"systemDomains":[{"id":1,"systemDomainNumber":"123","systemDomainEngName":"CRM","systemDescription":"Test Desc","companyName":"Oracle","companyCountry":"USA","createdDate":"2021-02-15T15:38:31.933+00:00","lastModifiedDate":"2021-02-15T15:38:31.933+00:00","sectionName":"Consumer Mediation and Billing","departmentName":"Core Processing Applications","gdName":"Consumer Enablement","sectionId":1}],"multiYearAgreement":true}]
* */

/*
    TICKETS,
    BUSINESS_TRIP,
    OVERTIME,
    VACATION,
    IQAMA_EXIT_RE_ENTRY,
    TRANSFER_IQAMA,
    OLD_END_OF_SERVICE,
    OTHER_BENEFITS_1,
    OTHER_BENEFITS_2

    */

/*function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
var employees= [];

var temp= {

            "employeeEnglishName": "Yasser",
            "employeeArabicName": "ياسر",
            "employeeNumber": 123456,
            "employeeId": 499485,
            "nationality": "Saudi",
            "vendor": {
                "id": 1,
                "name": "TCS",
                "number": "34",
                "type": "Main Contractor",
                "commercialRegistration": 566721565,
                "vatNumber": 254867,
                "website": "www.tcs.com"
            },
            "gender": "MALE",
            "maritalStatus": "true",
            "numberofSponsors": 1,
            "numberofChild": 1,
            "startDate": "2021-01-11",
            "endDate": null,
            "stcEmail": "yassiry@stc.com.sa",
            "personalEmail": "y.assiry@gmail.com",
            "section": {
                "id": 1,
                "sectionNumber": 11,
                "sectionEnglishName": "Consumer Mediation and Billing",
                "sectionArabicName": "قسم الفوترة",
                "department": {
                    "id": 1,
                    "departmentNumber": 114,
                    "departmentEnglishName": "Core Processing Applications",
                    "departmentArabicName": "تطبيقات المعالجة الأساسية",
                    "generalDepartment": {
                        "id": 1,
                        "generalDepartmentNumber": 215,
                        "gdEnName": "Consumer Enablement",
                        "gdArName": "تمكين المستهلك"
                    }
                }
            },
            "building": "5",
            "floor": "2",
            "desk": "162",
            "jobName": "ADMINISTRATION",
            "jobCategory": "TECHNICAL",
            "workingType": "ONSITE",
            "systemDomains": [
                {
                    "id": 1,
                    "systemDomainNumber": "123",
                    "systemDomainEngName": "CRM",
                    "systemDescription": "Test Desc",
                    "companyName": "Oracle",
                    "companyCountry": "USA",
                    "createdDate": "2021-03-07T23:41:01.560+00:00",
                    "lastModifiedDate": "2021-03-07T23:41:01.560+00:00",
                    "sectionId": 1,
                    "sectionName": "Consumer Mediation and Billing",
                    "departmentName": "Core Processing Applications",
                    "gdName": "Consumer Enablement"
                },
                {
                    "id": 2,
                    "systemDomainNumber": "66",
                    "systemDomainEngName": "RBM",
                    "systemDescription": "",
                    "companyName": "GINIVA",
                    "companyCountry": "Canada",
                    "createdDate": "2021-03-07T23:41:01.606+00:00",
                    "lastModifiedDate": "2021-03-07T23:41:01.606+00:00",
                    "sectionId": 5,
                    "sectionName": "Applications Financial Planning",
                    "departmentName": "Financial Planning And Control",
                    "gdName": "Applications Planning & Control"
                }
            ],
            "domain": "GENERAL",
            "level": "L2-JUNIOR",
            "ps": false,
            "skills": "Software Engineering",
            "certificates": [],
            "cvs": [],
            "letters": [],
            "basic": 10000.0,
            "housing": 2500.0,
            "transportation": 1000.0,
            "employeeGOSI": 1250.0,
            "companyGOSI": 1500.0,
            "employeeSalary": 12250.0,
            "totalSalary": 16250.0,
            "medical": 1000.0,
            "endOfService": 1000.0,
            "iqamaRenewal": 0.0,
            "governmentFees": 50.0,
            "ajeerFees": 100.0,
            "dailyRate": 0.0,
            "project": {
                "id": 1,
                "projectName": "MSAS",
                "projectNumber": 22134,
                "projectType": "Projection",
                "yearOfProject": "2021",
                "finNumber": "5458",
                "projectValue": 5000000,
                "proejctDescription": "D",
                "startDate": "2019-10-01",
                "endDate": "2022-01-31",
                "sectorOwner": "CBU",
                "expenseType": "CAPEX",
                "ps": true,
                "multiYearAgreement": true
            },
            "generalDepartment": {
                "id": 1,
                "generalDepartmentNumber": 215,
                "gdEnName": "Consumer Enablement",
                "gdArName": "تمكين المستهلك"
            },
            "department": {
                "id": 1,
                "departmentNumber": 114,
                "departmentEnglishName": "Core Processing Applications",
                "departmentArabicName": "تطبيقات المعالجة الأساسية",
                "generalDepartment": {
                    "id": 1,
                    "generalDepartmentNumber": 215,
                    "gdEnName": "Consumer Enablement",
                    "gdArName": "تمكين المستهلك"
                }
            }
        }

var names=[
    { arabicName:"احمد",englishName:"Ahmad",gender:"MALE"},
    { arabicName:"علي",englishName:"Ali",gender:"MALE"},
    { arabicName:"محمد",englishName:"Mohammad",gender:"MALE"},
    { arabicName:"عثمان",englishName:"Othman",gender:"MALE"},
    { arabicName:"خالد",englishName:"Khalid",gender:"MALE"},
    { arabicName:"عمر",englishName:"Omar",gender:"MALE"},
    { arabicName:"لطيفة",englishName:"Latifa",gender:"FEMALE"},
    { arabicName:"نوره",englishName:"Norah",gender:"FEMALE"},
    { arabicName:"امل",englishName:"Amal",gender:"FEMALE"},
    { arabicName:"وجدان",englishName:"Wigdan",gender:"FEMALE"},
    { arabicName:"صالح",englishName:"Saleh",gender:"FEMALE"},
    { arabicName:"فهد",englishName:"Fahad",gender:"MALE"},
    { arabicName:"ابراهيم",englishName:"Ibrahim",gender:"MALE"},
    ];


var vendors=[{
                "id": 2,
                "name": "STCs",
                "number": "12",
                "type": "Both",
                "commercialRegistration": 233564565,
                "vatNumber": 4135867,
                "website": "www.stcs.com.sa"
            },
            {
                "id": 3,
                "name": "Ijada",
                "number": "14",
                "type": "Subcontractor",
                "commercialRegistration": 988215564565,
                "vatNumber": 565867,
                "website": "www.stcs.com.sa"
            },
            {
                "id": 1,
                "name": "TCS",
                "number": "34",
                "type": "Main Contractor",
                "commercialRegistration": 566721565,
                "vatNumber": 254867,
                "website": "www.tcs.com"
            }
            ]
  var i;

var systemDomainsArray=[{
                    "id": 2,
                    "systemDomainNumber": "66",
                    "systemDomainEngName": "RBM",
                    "systemDescription": "",
                    "companyName": "GINIVA",
                    "companyCountry": "Canada",
                    "createdDate": "2021-03-13T21:52:12.420+00:00",
                    "lastModifiedDate": "2021-03-13T21:52:12.420+00:00",
                    "sectionId": 5,
                    "sectionName": "Applications Financial Planning",
                    "departmentName": "Financial Planning And Control",
                    "gdName": "Applications Planning & Control"
                },
                {
                    "id": 1,
                    "systemDomainNumber": "123",
                    "systemDomainEngName": "CRM",
                    "systemDescription": "Test Desc",
                    "companyName": "Oracle",
                    "companyCountry": "USA",
                    "createdDate": "2021-03-13T21:52:12.373+00:00",
                    "lastModifiedDate": "2021-03-13T21:52:12.373+00:00",
                    "sectionId": 1,
                    "sectionName": "Consumer Mediation and Billing",
                    "departmentName": "Core Processing Applications",
                    "gdName": "Consumer Enablement"
                }
                ];

var optionsGM=[

    {
        "section": {
                "id": 8,
                "sectionNumber": 18,
                "sectionEnglishName": "Applications Business Planning",
                "sectionArabicName": "قسم تخطيط الأعمال للتطبيقات",
                "department": {
                    "id": 4,
                    "departmentNumber": 111,
                    "departmentEnglishName": "Business Excellence",
                    "departmentArabicName": "تميّز الأعمال",
                    "generalDepartment": {
                        "id": 2,
                        "generalDepartmentNumber": 214,
                        "gdEnName": "Applications Planning & Control",
                        "gdArName": "الإدارة العامة لتخطيط ورقابة التطبيقات"
                    }
                }
            },
            "generalDepartment": {
                "id": 2,
                "generalDepartmentNumber": 214,
                "gdEnName": "Applications Planning & Control",
                "gdArName": "الإدارة العامة لتخطيط ورقابة التطبيقات"
            },
            "department": {
                "id": 4,
                "departmentNumber": 111,
                "departmentEnglishName": "Business Excellence",
                "departmentArabicName": "تميّز الأعمال",
                "generalDepartment": {
                    "id": 2,
                    "generalDepartmentNumber": 214,
                    "gdEnName": "Applications Planning & Control",
                    "gdArName": "الإدارة العامة لتخطيط ورقابة التطبيقات"
                }
            }
    },
    {
     "section": {
                "id": 4,
                "sectionNumber": 14,
                "sectionEnglishName": "CEX,CVM and Sales Solutions",
                "sectionArabicName": "قسم حلول البيع وتجربة العميل",
                "department": {
                    "id": 2,
                    "departmentNumber": 113,
                    "departmentEnglishName": "Consumer Solutions",
                    "departmentArabicName": "حلول المستهلك",
                    "generalDepartment": {
                        "id": 1,
                        "generalDepartmentNumber": 215,
                        "gdEnName": "Consumer Enablement",
                        "gdArName": "تمكين المستهلك"
                    }
                }
            },
            "generalDepartment": {
                "id": 1,
                "generalDepartmentNumber": 215,
                "gdEnName": "Consumer Enablement",
                "gdArName": "تمكين المستهلك"
            },
            "department": {
                "id": 2,
                "departmentNumber": 113,
                "departmentEnglishName": "Consumer Solutions",
                "departmentArabicName": "حلول المستهلك",
                "generalDepartment": {
                    "id": 1,
                    "generalDepartmentNumber": 215,
                    "gdEnName": "Consumer Enablement",
                    "gdArName": "تمكين المستهلك"
                }
            }
    },
    {
        "section": {
                "id": 2,
                "sectionNumber": 12,
                "sectionEnglishName": "Charging and Rating Systems",
                "sectionArabicName": "قسم التكاليف والحسابات",
                "department": {
                    "id": 1,
                    "departmentNumber": 114,
                    "departmentEnglishName": "Core Processing Applications",
                    "departmentArabicName": "تطبيقات المعالجة الأساسية",
                    "generalDepartment": {
                        "id": 1,
                        "generalDepartmentNumber": 215,
                        "gdEnName": "Consumer Enablement",
                        "gdArName": "تمكين المستهلك"
                    }
                }
            },
            "generalDepartment": {
                "id": 1,
                "generalDepartmentNumber": 215,
                "gdEnName": "Consumer Enablement",
                "gdArName": "تمكين المستهلك"
            },
            "department": {
                "id": 1,
                "departmentNumber": 114,
                "departmentEnglishName": "Core Processing Applications",
                "departmentArabicName": "تطبيقات المعالجة الأساسية",
                "generalDepartment": {
                    "id": 1,
                    "generalDepartmentNumber": 215,
                    "gdEnName": "Consumer Enablement",
                    "gdArName": "تمكين المستهلك"
                }
            }
    }


    ];

var skillsArray=["Active listening",
"Communication",
"Computer Programming",
"Customer service",
"Interpersonal",
"Leadership",
"Management",
"Problem-solving",
"Time management",
"Transferable" ]


var maritalStatusArray=["false","true"];

var buildingArray=["5","12","11","3","Qurtubah","HQ"];

var floorArray=["1","2","3","4","5"];
var levelArray=["L5-EXPERT1","L4-SENIOR","L3-INTERMEDIATE","L1-FRESH","L2-JUNIOR","L6-EXPERT2","L7-SENIOR EXPERT"];
var jobNameArray=["ADMINISTRATION","AGILECOACHSCRUMMASTER","APPLICATIONSPECIALISTBA","DESIGNERSA","DEVELOPER","DIGITALCONSULTANT","INFRASTRUCTURESPECIALIST","PM","TECHNICALANALYST","TECHNICALPM","TECHNICALSUPPORT","TESTERQA"];
var jobCategoryArray=["PROJECTMANAGEMENT","TECHNICAL","BUSINESS"]
var workingTypeArray=["ONSITE","OFFSHORE"]
var domainArray=["GENERAL","TELECOMDIGITALTRANSFORMATION","DIGITALTRANSFORMATION","BUSS1","BUSS2","BUSS3"];
 for (i = 0; i < 964; i++) {
    var el=names[Math.floor(Math.random() * names.length)];
    var x=JSON.parse(JSON.stringify(temp));
    x.employeeEnglishName=el.englishName;
    x.employeeArabicName=el.arabicName;
    x.gender=el.gender;
    x.startDate=randomDate(new Date(2012, 0, 1), new Date());
    x.stcEmail=makeid(5)+"@stc.com.sa";
    x.personalEmail=makeid(5)+"@gmail.com";
    x.vendor=vendors[Math.floor(Math.random() * vendors.length)];
    x.systemDomains=[];
    x.systemDomains.push(systemDomainsArray[Math.floor(Math.random() * systemDomainsArray.length)]);
    var randomAccess=Math.floor(Math.random() * optionsGM.length);
    x.section=optionsGM[randomAccess].section
    x.generalDepartment=optionsGM[randomAccess].generalDepartment;
    x.department=optionsGM[randomAccess].department;
    x.level=levelArray[Math.floor(Math.random() * levelArray.length)];
    x.maritalStatus=maritalStatusArray[Math.floor(Math.random() * maritalStatusArray.length)];
    x.building=buildingArray[Math.floor(Math.random() * buildingArray.length)];
    x.floor=floorArray[Math.floor(Math.random() * floorArray.length)];
    x.desk=" "+Math.floor(Math.random() * 300);
    x.jobName=jobNameArray[Math.floor(Math.random() * jobNameArray.length)];
    x.jobCategory=jobCategoryArray[Math.floor(Math.random() * jobCategoryArray.length)];
    x.workingTypey=workingTypeArray[Math.floor(Math.random() * workingTypeArray.length)];
    x.domain=domainArray[Math.floor(Math.random() * domainArray.length)];
    x.skills=skillsArray[Math.floor(Math.random() * skillsArray.length)];
    x.employeeNumber=Math.floor(Math.random() * 7984)+1000;
    x.employeeId=Math.floor(Math.random() * 7984)+1000;
    x.numberofSponsors=1;
    x.numberofChild=Math.floor(Math.random() * 5);
    x.basic=Math.floor(Math.random() * 20000)+7000;
    x.housing=Math.floor(x.basic*0.25);
    x.transportation=Math.floor(x.basic*0.1);
    x.employeeGOSI=Math.floor((x.basic+x.housing)+0.1);
    x.companyGOSI=Math.floor((x.basic+x.housing)+0.15);
    x.totalSalary=Math.floor(x.companyGOSI+x.employeeGOSI+x.transportation+x.housing+x.basic);
    employees.push(x)
}

console.log(employees)*/



/**/
