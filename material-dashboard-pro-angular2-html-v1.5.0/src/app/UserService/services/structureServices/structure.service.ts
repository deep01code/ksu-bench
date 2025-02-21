import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ManagerialUnitDTO, ManagerialUnit, GlobalDTO, SearchFinancialDTO} from "../../classes/managerialUnit";
import {Employee} from "../../../PST/classes/employee";
import {map} from "rxjs/operators";

@Injectable()
export class StructureService {
  public SERVER_URL: string = environment.serverUrl;

  private base = this.SERVER_URL
  private managerialUnitsUrl = this.base + "/managerial-units";
  private addManagerialUnit= this.base + "/add-managerial-units";
  private upsertFinancialUnitUrl= this.base +  "/upsert-financial-unit";
  private addPOUrl= this.base +"/add-po";
  private addPartialPOUrl= this.base +"/add-partial-po";
  private getUnitFinancialNumbersUrl= this.base +"/get-financial-units-per-managerial-unit";
  private getUnitPOsUrl= this.base +"/get-pos";
  private getUnitPartialPOsUrl= this.base +"/get-partial-pos";
  private getAllFinancialUnitsUrl=this.base+"/get-all-financial-units";
  private getAllDomainUnitsUrl=this.base+"/get-all-domain-units"
  private getFinancialUnitUrl=this.base+"/get-financial-unit";
  private getDomainUnitUrl=this.base+"/get-domain-unit";
  private getAgreementUrl=this.base+"/get-agreement";
  private getFinancialNumbersOfManagerialUnitParentsUrl=this.base +"/get-financial-numbers-of-managerial-unit-parents"
  private getPosOfManagerialUnitParentsUrl=this.base+"/get-pos-of-managerial-unit-parents";
  private getDomainsOfManagerialUnitParentsUrl=this.base+"/get-domains-of-managerial-unit-parents";
  private getPosOfManagerialUnitParentsAndDomainsOfManagerialUnitParentsUrl=this.base+"/get-pos-of-managerial-unit-parents-and-domains-of-managerial-unit-parents"
  private domainsUrl=this.base+"/domains"
  private systemDomainsUrl=this.base+"/systemDomains"
  private upsertDomainUnitUrl=this.base+"/upsert-domain-unit"
  private addSystemDomainToManagerialUnitUrl=this.base+"/add-system-domain-to-managerial-unit"
  private getUserUnitsTreeUrl=this.base+"/UserManagement/user-units-tree"
  private reportByDepartment=this.base+"/report-by-department"
  private reportByGender=this.base+"/report-by-gender"
  private reportByType=this.base+"/report-by-type"
  private reportByVendor=this.base+"/report-by-vendor"
  private reportByDepartmentAndSite=this.base+"/report-by-department-and-site"
  private reportByNationality=this.base+"/report-by-nationality";
  private reportByDepartmentAndGender=this.base+"/report-by-department-and-gender"
  private reportBySaudiRatio=this.base+"/report-by-saudi-ratio"
  private reportByJobRatio=this.base+"/report-by-job-ratio"
  private downloadDomainsUploadTemplate=this.base+"/download-domains-upload-template";
  private downloadCardRateUploadTemplateUrl=this.base+"/download-cardrate-upload-template";
  private downloadFinUploadTemplateUrl=this.base+"/download-fin-upload-template";
  private bulkUpsertDomain=this.base+"/bulk-upsert-domain";
  private bulkUpsertCardRate=this.base+"/bulk-upsert-card-rate";
  private bulkUpsertFin=this.base+"/bulk-upsert-fin";
//    private errorMsgUrl=this.base+"/error-msg?sort=creationDate&creationDate.dir=desc";
    private errorMsgUrl=this.base+"/error-msg?size=1000&sort=id,desc";

 constructor(private http: HttpClient) { }

  public getAllManagerialUnits() {return this.http.get(this.managerialUnitsUrl);}
  public getAllErrorMsg() {return this.http.get(this.errorMsgUrl);}

  public getUserUnitsTree(){ return this.http.get(this.getUserUnitsTreeUrl);}

  public getReportByDepartment(){ return this.http.get(this.reportByDepartment);}
  public getReportByDepartmentAndSite(){ return this.http.get(this.reportByDepartmentAndSite);}

  public getReportByGender(){ return this.http.get(this.reportByGender);}
  public getReportByType(){ return this.http.get(this.reportByType);}
  public getReportByVendor(){ return this.http.get(this.reportByVendor);}
  public getReportByNationality(){ return this.http.get(this.reportByNationality);}
  public getReportByDepartmentAndGender(){ return this.http.get(this.reportByDepartmentAndGender);}
  public getReportBySaudiRatio(){ return this.http.get(this.reportBySaudiRatio);}
  public getReportByJobRatio(){ return this.http.get(this.reportByJobRatio);}

  public createManagerialUnit(managerialUnitDTO:ManagerialUnitDTO){return this.http.post(this.addManagerialUnit,managerialUnitDTO);}

  public upsertFinancialUnit(globalDTO:GlobalDTO){return this.http.post(this.upsertFinancialUnitUrl,globalDTO);}

  public getFinancialNumbersOfManagerialUnitParents(managerialUnitDTO:ManagerialUnitDTO){return this.http.post(this.getFinancialNumbersOfManagerialUnitParentsUrl,managerialUnitDTO)}

  public getPosOfManagerialUnitParents(managerialUnitDTO:ManagerialUnitDTO){return this.http.post(this.getPosOfManagerialUnitParentsUrl,managerialUnitDTO)}

  public getDomainsOfManagerialUnitParents(managerialUnitDTO:ManagerialUnitDTO){return this.http.post(this.getDomainsOfManagerialUnitParentsUrl,managerialUnitDTO)}

  public getPosOfManagerialUnitParentsAndDomainsOfManagerialUnitParents(managerialUnitDTO:ManagerialUnitDTO){return this.http.post(this.getPosOfManagerialUnitParentsAndDomainsOfManagerialUnitParentsUrl,managerialUnitDTO)}



  public getFinancialUnit(globalDTO:GlobalDTO){return this.http.post(this.getFinancialUnitUrl,globalDTO);}
  public getDomainUnit(globalDTO:GlobalDTO){return this.http.post(this.getDomainUnitUrl,globalDTO);}

  public getAgreement(globalDTO:GlobalDTO){return this.http.post(this.getAgreementUrl,globalDTO);}


  public getDomains(){return this.http.get(this.domainsUrl);}
  public getSystemDomains(){return this.http.get(this.systemDomainsUrl);}
  public upsertDomainUnit(globalDTO:GlobalDTO){return this.http.post(this.upsertDomainUnitUrl,globalDTO);}
  public addSystemDomainToManagerialUnit(globalDTO:GlobalDTO){return this.http.post(this.addSystemDomainToManagerialUnitUrl,globalDTO);}




  public addPO(globalDTO:GlobalDTO){return this.http.post(this.addPOUrl,globalDTO);}

  public addPartialPO(globalDTO:GlobalDTO){return this.http.post(this.addPartialPOUrl,globalDTO);}

  public getFinancialNumbers(managerialUnitDTO:ManagerialUnitDTO,page,size){
    return this.http.get<GlobalDTO>(this.getUnitFinancialNumbersUrl+'?page='+page+'&size='+size);
    }

  public getPOs(managerialUnitDTO:ManagerialUnitDTO){return this.http.get(this.getUnitPOsUrl);}

  public getPartialPOs(managerialUnitDTO:ManagerialUnitDTO){return this.http.get(this.getUnitPartialPOsUrl);}


  /*comment to get all Financial types {FinancialNumber,PO,PartialPO}*/
  public getAllFinancialUnits(searchFinancialDTO:SearchFinancialDTO){ return this.http.post(this.getAllFinancialUnitsUrl,searchFinancialDTO) }
  public getAllDomainUnits(searchFinancialDTO:SearchFinancialDTO){ return this.http.post(this.getAllDomainUnitsUrl,searchFinancialDTO) }



    public downloadDomainUploadTemplate(){
        let headerOptions = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/octet-stream',
            //   'Accept': 'application/octet-stream', // for excel file
        });
        let requestOptions = { headers: headerOptions, responseType: 'blob' as 'blob' };

        return this.http.get(this.downloadDomainsUploadTemplate, requestOptions).pipe(map((data: any) => {
            let blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // must match the Accept type
                // type: 'application/octet-stream' // for excel
            });
            var link = document.createElement('a');

            link.href = window.URL.createObjectURL(blob);
            link.download = "domains.xls";
            // link.name='test'
            link.target = '_blank';
            link.click();
            window.URL.revokeObjectURL(link.href);

        }));


        //window.open(this.baseURL+"generateReport?id=" + id);
    }
    public postBulkDomainFile(fileToUpload: File){
        const formData = new FormData();
        formData.append('file', fileToUpload);
        return this.http.post(this.bulkUpsertDomain,formData)
    }


    public downloadCardRateUploadTemplate(){
        let headerOptions = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/octet-stream',
            //   'Accept': 'application/octet-stream', // for excel file
        });
        let requestOptions = { headers: headerOptions, responseType: 'blob' as 'blob' };

        return this.http.get(this.downloadCardRateUploadTemplateUrl, requestOptions).pipe(map((data: any) => {
            let blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // must match the Accept type
                // type: 'application/octet-stream' // for excel
            });
            var link = document.createElement('a');

            link.href = window.URL.createObjectURL(blob);
            link.download = "cardrate.xls";
            // link.name='test'
            link.target = '_blank';
            link.click();
            window.URL.revokeObjectURL(link.href);

        }));


        //window.open(this.baseURL+"generateReport?id=" + id);
    }
    public postBulkCardRateFile(fileToUpload: File,id: string){
        const formData = new FormData();
        formData.append('file', fileToUpload);
        formData.append('id', id);
        return this.http.post(this.bulkUpsertCardRate,formData)
    }


    public downloadFinUploadTemplate(){
        let headerOptions = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/octet-stream',
            //   'Accept': 'application/octet-stream', // for excel file
        });
        let requestOptions = { headers: headerOptions, responseType: 'blob' as 'blob' };

        return this.http.get(this.downloadFinUploadTemplateUrl, requestOptions).pipe(map((data: any) => {
            let blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // must match the Accept type
                // type: 'application/octet-stream' // for excel
            });
            var link = document.createElement('a');

            link.href = window.URL.createObjectURL(blob);
            link.download = "fin.xls";
            // link.name='test'
            link.target = '_blank';
            link.click();
            window.URL.revokeObjectURL(link.href);

        }));


        //window.open(this.baseURL+"generateReport?id=" + id);
    }
    public postBulkFinFile(fileToUpload: File){
        const formData = new FormData();
        formData.append('file', fileToUpload);
        return this.http.post(this.bulkUpsertFin,formData)
    }
}
