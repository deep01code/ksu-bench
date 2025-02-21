import { VendorContact } from "./vendor-contact";
import {Agreement, PO} from "../../UserService/classes/managerialUnit";

export class Vendor {
    id: number;
    number: number;
    name: String;
    type: String;
    commercialRegistration: number;
    vatNumber: number;
    website: String;
    endDate: Date;
    contacts: Contact[];
    pos:PO[];
    agreements:Agreement[]
}

export class Contact{
     id;
     name;
     jobTitle;
     mobileNumber;
     emailAddress;
     vendor:Vendor ;
}
