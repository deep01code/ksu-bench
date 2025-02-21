import {AttendanceException, Employee} from "../../PST/classes/employee";
import {Vendor} from "../../PST/classes/vendor";
import {VendorContact} from "../../PST/classes/vendor-contact";
import {Domain, DomainBasicUnit, JobLevel, JobName, System} from "../../PST/classes/system-domain";

export class ManagerialUnit {

id;
unitArabicName;
unitEnglishName;
unitNumber;
managerialUnits:ManagerialUnit[];
unitParent:ManagerialUnit;
employees:Employee[];
type:UnityType
financialUnits:FinancialUnit[];
domains:any;
users:any;
}


export class FinancialUnit {

    id;
    financialName;
    financialNumber;
    startDate;
    endDate;
    value;
    financialParent:FinancialUnit ;
    financialUnits:FinancialUnit[];
    managerialUnit:ManagerialUnit ;
    type:GlobalType;
}
export class FinancialNumber extends FinancialUnit{}
export class PO extends FinancialUnit{
    poType:POType;
    expenseType:ExpenseType;
    marginPercent;
    marginCap;
    description;
    multiYearAgreement:boolean;
    projectionPlus:boolean;
    open:boolean;
    employees:Employee[]
    vendor:Vendor;
    agreement:Agreement;
}
export class PartialPO extends PO{}




export class ManagerialUnitDTO {

     childManagerialUnit:ManagerialUnit;
     parentManagerialUnit:ManagerialUnit;
}


export class GlobalDTO {
    managerialUnit:ManagerialUnit ;
    financialUnit:FinancialUnit;
    financialParent:FinancialUnit;
    agreement:Agreement;
    agreementItem:AgreementItem;
    contact:VendorContact;
    vendor:Vendor;
    domain:Domain;
    system:System;
    jobName:JobName;
    jobLevel:JobLevel;
    employee:Employee;
    domainBasicUnit:DomainBasicUnit;
    financialUnits:FinancialUnit[];
    financialNumbers:FinancialNumber[];
    pos:PO[];
    partialPOS:PartialPO[];
    agreements:Agreement[] ;
    agreementItems:AgreementItem[];
    contacts:VendorContact[];
    domains:Domain[];
    systems:System[];
    jobNames:JobName[];
    jobLevels:JobLevel[];
    domainBasicUnits:DomainBasicUnit[];
    size;
    type:GlobalType;
    attendanceException:AttendanceException;
}


export class AgreementItem{
    id;
    domain:Domain;
    jobName:JobName;
    system:System;
    jobLevel:JobLevel;
    onsiteRate;
    offshoreRate;
    agreement:Agreement;
}

export class Agreement{
    id;
    name;
    agreementType:AgreementType ;
    agreementItems:AgreementItem[];
    pos:PO[];
    vendor:Vendor
}

export class SearchFinancialDTO {

    search:string ;
    type:GlobalType;

}

export class UserRolesDTO {

    username:string ;
    managerialUnitList:ManagerialUnit[];
}


export enum UnityType{
    SECTOR="SECTOR",
    GENERAL_DEPARTMENT="GENERAL_DEPARTMENT",
    DEPARTMENT="DEPARTMENT",
    SECTION="SECTION",
}

export enum POType {
    PROJECTION="PROJECTION",
    MS="MS",
    TM="TM",
    SCOPE="SCOPE"
}

export enum ExpenseType {
    OPEX="OPEX", CAPEX="CAPEX"
}

export enum AgreementType {
    ONE_YEAR="ONE_YEAR",MULTI_YEAR_3="MULTI_YEAR_3",MPA_3="MPA_3"
}

export enum GlobalType{
    FINANCIALNUMBER="FINANCIALNUMBER",
    PO="PO",
    PARTIALPO="PARTIALPO",
    DOMAIN="DOMAIN",
    SYSTEM="SYSTEM",
    JOBNAME="JOBNAME",
    JOBLEVEL="JOBLEVEL",
    EMPLOYEE="EMPLOYEE",
}
