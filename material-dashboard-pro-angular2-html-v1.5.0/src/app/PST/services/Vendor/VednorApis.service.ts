import { Vendor } from '../../classes/vendor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ReportFilterDataDTO} from "../../classes/ReportFilterDataDTO";
import {map} from "rxjs/operators";
import {GlobalDTO} from "../../../UserService/classes/managerialUnit";
@Injectable()
export class VednorApisService {
    public SERVER_URL: string = environment.serverUrl;
    public baseURL = this.SERVER_URL+"/";
    public vendorURL = this.baseURL + "vendors/"
    public reportFilterDataDTOURL=this.baseURL+"report-filter-data"
    public vendorByType = this.vendorURL + "type/"
    public upsertVendorUrl= this.SERVER_URL+"/upsert-vendor"
    public upsertContactUrl= this.SERVER_URL+"/upsert-contact";
    public upsertAgreementUrl =this.SERVER_URL+"/upsert-agreement";
    public upsertAgreementItemUrl= this.SERVER_URL+"/upsert-agreement-item";
    public bulkUpsertVendor=this.SERVER_URL+"/bulk-upsert-vendor";
    private vendor = null;

    constructor(private http: HttpClient) { }

    public getAllVendors() {

        return this.http.get<Vendor[]>(this.vendorURL);
    }

    public getMainVendors(){
        return this.http.get<Vendor[]>(this.vendorByType+"main");
    }
    public getSubVendors(){
        return this.http.get<Vendor[]>(this.vendorByType+"sub");
    }

    public setVendor(vendor) {
        this.vendor = vendor;
    }

    public getVendor() {
        return this.vendor;
    }

    public getVendorById(id) {
        return this.http.get<Vendor>(this.vendorURL + id);
    }

    public updateVendor(vendor: Vendor) {
        return this.http.put<Vendor>(this.vendorURL + vendor.id, vendor);
    }

    public deleteVendor(vendor: Vendor) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: vendor,
        };
        return this.http.delete(this.vendorURL + vendor.id, options);
    }

    public createVendor(vendor: Vendor) {
        return this.http.post<Vendor>(this.vendorURL, vendor);
    }

    public getReport(reportFilterDataDTO){
        let headerOptions = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/octet-stream',
            //   'Accept': 'application/octet-stream', // for excel file
        });
        let requestOptions = { headers: headerOptions, responseType: 'blob' as 'blob' };

       return this.http.post(this.baseURL+"generateReport",reportFilterDataDTO, requestOptions).pipe(map((data: any) => {
            let blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // must match the Accept type
                // type: 'application/octet-stream' // for excel
            });
            var link = document.createElement('a');

            link.href = window.URL.createObjectURL(blob);
            link.download = new Date().toString()+".xls";
           // link.name='test'
            link.target = '_blank';
            link.click();
            window.URL.revokeObjectURL(link.href);

        }));


        //window.open(this.baseURL+"generateReport?id=" + id);
    }



    public downloadVendorUploadTemplate(){
        let headerOptions = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/octet-stream',
            //   'Accept': 'application/octet-stream', // for excel file
        });
        let requestOptions = { headers: headerOptions, responseType: 'blob' as 'blob' };

        return this.http.get(this.baseURL+"download-vendor-upload-template", requestOptions).pipe(map((data: any) => {
            let blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // must match the Accept type
                // type: 'application/octet-stream' // for excel
            });
            var link = document.createElement('a');

            link.href = window.URL.createObjectURL(blob);
            link.download = "vendors.xls";
            // link.name='test'
            link.target = '_blank';
            link.click();
            window.URL.revokeObjectURL(link.href);

        }));


        //window.open(this.baseURL+"generateReport?id=" + id);
    }


    public getReportFilterDataDTO(){
        return this.http.get<ReportFilterDataDTO>(this.reportFilterDataDTOURL );
    }

    public upsertVendor(globalDTO:GlobalDTO){ return this.http.post(this.upsertVendorUrl,globalDTO);}
    public upsertContact(globalDTO:GlobalDTO){ return this.http.post(this.upsertContactUrl,globalDTO);}
    public upsertAgreement(globalDTO:GlobalDTO){ return this.http.post(this.upsertAgreementUrl,globalDTO);}
    public upsertAgreementItem(globalDTO:GlobalDTO){ return this.http.post(this.upsertAgreementItemUrl,globalDTO);}


    public postFile(fileToUpload: File){
        const formData = new FormData();
        formData.append('file', fileToUpload);
       return this.http.post(this.bulkUpsertVendor,formData)
    }
}
