
export enum LovType{
    DOMAIN="DOMAIN",
    LEVEL="LEVEL",
    JOBCATEGORY="JOBCATEGORY",
    JOBNAME="JOBNAME",
    NATIONALITY="NATIONALITY",
}


export class LovDTO{
    value;
    id;
    lovType:LovType;
}

