import {GenericDocument} from './generic-document';

export class AddBranchDocument extends GenericDocument{

    branchUpdateList:{
        name:string;
        address:string;
        phone:number;
        open:string;
        close:string;
    }[];
    branchNewList:{
        name:string;
        address:string;
        phone:number;
        open:string;
        close:string;
    }



}
