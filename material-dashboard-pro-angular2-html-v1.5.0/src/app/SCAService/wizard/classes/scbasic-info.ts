export class ScBasicInfo {

    isSubmitted:boolean = false;

    serviceConceptTitle:string;
    isUrgent:boolean = false;
    serviceConceptOverview:string;
    businessObjectives:string;


    //contact info

    requesterEmail:string;
    requesterName:string=' ';
    requesterDepartment:string= ' ';
    requesterBusinessUnit:string= ' ';
    requesterMobilePhone:string= ' ';

    approverEmail:string;
    approverName:string= ' ';
    approverDepartment:string= ' ';
    approverTitle:string= ' ';
    approverBusinessUnit:string= ' ';
    approverMobilePhone:string= ' ';

    //business Prioritizationi

    riskAssessmentRegularity:string;
    riskAssessmentOperational:string;

    businessImpactOnrevenues:string;
    businessImpactOnCustomerExp:string;

    targetedSegments:string[];

    eligibilityCriterias:string[];

    //chanel Requirements
    chanelRequirements:string[];

    //additional Info
    additionalInfo:string;


    formIsValid():boolean{
        this.isSubmitted = true;
        if (this.serviceConceptTitle && this.serviceConceptOverview && this.businessObjectives
            && this.requesterEmail && this.isEmail(this.requesterEmail) && this.requesterName
            && this.requesterDepartment && this.requesterDepartment && this.requesterBusinessUnit
            && this.requesterMobilePhone
            && this.approverEmail && this.isEmail(this.approverEmail) && this.approverName
            && this.approverName && this.approverDepartment && this.approverTitle
            && this.approverBusinessUnit && this.approverMobilePhone
            && this.riskAssessmentRegularity && this.riskAssessmentOperational
            && this.businessImpactOnrevenues && this.businessImpactOnCustomerExp
            && this.targetedSegments && this.targetedSegments.length!=0
            && this.eligibilityCriterias && this.eligibilityCriterias.length!=0
            && this.chanelRequirements && this.chanelRequirements.length!=0){
            return true;
        }
        return false;
    }

    isEmail(email:string):boolean{
        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        return regexp.test(email);
    }


}
