import {VendorDTO} from "./vendorDTO";
import {ManagerialUnit} from "../../UserService/classes/managerialUnit";


export class ReportFilterDataDTO{

     managerialUnitList: ManagerialUnit[];
     vendorList: VendorDTO[];
     genderList: String[];
     jobCategoryList: String[];
     jobNameList: String[];
     nationalityList: String[];
     workingTypeList: String[];
     buildingList: String[];
     reportFieldsList: String[];
}
