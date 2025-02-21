import { Section } from './GeneralDepartment'
import {ManagerialUnit} from "../../UserService/classes/managerialUnit";


export class DomainBasicUnit{

    id;
    domainUnitArabicName;
    domainUnitEnglishName;
    description;
    companyName;
    companyCountry;
    domainUnitNumber;
    managerialUnit:ManagerialUnit;
    domainParent:DomainBasicUnit
    domainBasicUnits:DomainBasicUnit[]
    type:string;
}

export class Domain extends DomainBasicUnit{

}

export class System extends  DomainBasicUnit{

}

export class JobName extends DomainBasicUnit{

}

export class JobLevel extends DomainBasicUnit{

}
