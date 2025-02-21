import { GeneralDepartment } from './GeneralDepartment';
import { Vendor } from './vendor';
import { VendorContact } from 'app/PST/classes/vendor-contact';
import { System } from 'app/PST/classes/system-domain';
export class Project {
    id: number;
    projectName: String;
    projectNumber: number;
    projectType: String;
    yearOfProject: number;
    finNumber: number;
    projectValue: number;
    proejctDescription: String;
    multiYearAgreement: boolean;
    startDate: Date;
    endDate: Date;
    sectorOwner: String;
    expenseType: String;
    ps: boolean;
    requestingGD: GeneralDepartment;
    contracts: Contract[];
    systemDomains: System[];

}


export class Contract {
    poNumber: String;
    poIssueDate: Date;
    poEndDate: Date;
    poValue: number;
    marginPercent: number;
    marginCap: number;
    subProjectDescription: String;
    contacts: VendorContact[];
    vendor: Vendor;
    subcontracts: Subcontract[];
    editable: any;
    contract: any;
    projectType: any;
    vendors: any;

}

export class Subcontract {
    poNumber: String;
    subContractStartDate: Date;
    subContractEndDate: Date;
    comment: String;
    projectSystemDomains: System[];
    mainVendor: Vendor;
    subVendor: Vendor;
    contacts: VendorContact[];
    editable: any;
    subcontract: any;
    systemDomains: any;
    subVendors: any;

}
