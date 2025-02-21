import {GenericDocument} from './generic-document';

export class StopVoucherDocument extends GenericDocument{
    stopVoucherDocumentList:{
        id:string;
        name:string;
    }[];
}
