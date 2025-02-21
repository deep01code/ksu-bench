import { Injectable } from '@angular/core';
import {Scenario} from '../gam202/classes/scenario';
import {ScRequest} from '../commonClasses/sc-request';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class Gam338Gam339Service {

  constructor(private http: HttpClient) { }

    getScenarioList(entry: ScRequest): Observable<any> {
        return Observable.create(function (observer) {
            observer.next({
                errorCode: '0',
                errorMessage:'SUCCESS',
                data:[{
                    ID: '1',
                    ENGLISHNAME:'Package 1 - 100 mins local, 1 GB data',
                    ARABICNAME:'Ar 1',
                    ENGLISHDESCRIPTION:'Prepaid MBB offer 1',
                    ARABICDESCRIPTION:'Ar 11',
                    OFFERSTARTTIME:new Date('7/9/2018'),
                    OFFERENDTIME:new Date('7/12/2018'),
                    MONTHLYPRICE:'SAR 10',
                    DATAPACKAGE:'1 GB',
                    WIFIPACKAGE:'1 GB',
                    FREESMS:'100 SMS',
                    COMPATIBLEPRODUCTS:'Sawa 1',
                    FREEMINUTES:'100 mins',
                    SERVICEID:'service 1'
                },
                    {
                        ID: '2',
                        ENGLISHNAME:'Package 2 - 50 mins local, 50 mins roaming, 2 GB data',
                        ARABICNAME:'Ar 2  sdfsdf dfsdf ',
                        ENGLISHDESCRIPTION:'Prepaid MBB offer 2',
                        ARABICDESCRIPTION:'Ar 12',
                        OFFERSTARTTIME: new Date('7/9/2018'),
                        OFFERENDTIME:new Date('7/12/2018'),
                        MONTHLYPRICE:'Sar 20',
                        DATAPACKAGE:'2GB',
                        WIFIPACKAGE:'2GB',
                        FREESMS:'200 SMS',
                        COMPATIBLEPRODUCTS:'Sawa 2',
                        FREEMINUTES:'200 mins',
                        SERVICEID:'service 2'
                    },{
                        ID: '3',
                        ENGLISHNAME:'Package 3 - 200 mins local, 150 mins roaming, 3 GB data',
                        ARABICNAME:'Ar 3',
                        ENGLISHDESCRIPTION:'Prepaid MBB offer 3',
                        ARABICDESCRIPTION:'Ar 13',
                        OFFERSTARTTIME:new Date('7/9/2018'),
                        OFFERENDTIME:new Date('7/12/2018'),
                        MONTHLYPRICE:'SAR 200',
                        DATAPACKAGE:'3GB',
                        WIFIPACKAGE:'3GB',
                        FREESMS:'300 SMS',
                        COMPATIBLEPRODUCTS:'Sawa 3',
                        FREEMINUTES:'300 mins',
                        SERVICEID:'service 3'
                    },{
                        ID: '4',
                        ENGLISHNAME:'Package 4 - 250 mins local, 200 mins roaming, 4 GB data',
                        ARABICNAME:'Ar 4',
                        ENGLISHDESCRIPTION:'Prepaid MBB offer 4',
                        ARABICDESCRIPTION:'Ar 14',
                        OFFERSTARTTIME:new Date('7/9/2018'),
                        OFFERENDTIME:new Date('7/12/2018'),
                        MONTHLYPRICE:'SAR 400',
                        DATAPACKAGE:'4GB',
                        WIFIPACKAGE:'4GB',
                        FREESMS:'400 SMS',
                        COMPATIBLEPRODUCTS:'Sawa 4',
                        FREEMINUTES:'400 mins',
                        SERVICEID:'service 4'
                    },{
                        ID: '5',
                        ENGLISHNAME:'Package 5 - 450 mins local, 300 mins roaming, 10 GB data',
                        ARABICNAME:'Ar 5',
                        ENGLISHDESCRIPTION:'Prepaid MBB offer 2',
                        ARABICDESCRIPTION:'Ar 15',
                        OFFERSTARTTIME:new Date('7/9/2018'),
                        OFFERENDTIME:('7/12/2018'),
                        MONTHLYPRICE:'SAR 600',
                        DATAPACKAGE:'10GB',
                        WIFIPACKAGE:'10GB',
                        FREESMS:'1000 SMS',
                        COMPATIBLEPRODUCTS:'Sawa 5',
                        FREEMINUTES:'500 mins',
                        SERVICEID:'service 5'
                    }]
            })
        });
    }


}
