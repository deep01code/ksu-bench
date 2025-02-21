export class DocumentData {

    title:string;
    offerType:string;
    detailedImpact:string;
    sc_date:string;
    sc_description:string;
    requestor:{
        name:string;
        department:string;
        email:string;
        mobile:string;
        businessUnit:string;
    };
    approver:{
        name:string;
        department:string;
        email:string;
        mobile:string;
        businessUnit:string;
    };
    overview:string;
    objectives:string;
    regulatoryRisk:string;
    optionalRisk:string;
    revenueImpact:string;
    customerExpImpact:string;
    urgencyFlag:string;
    impactedChannels:string[];
    targetSegments:string[];
    eligibilityCriteria:string[];

}
