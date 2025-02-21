import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ScRequest} from '../commonClasses/sc-request';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class Gam340Service {

    constructor(private http: HttpClient) { }

    getScenarioList(entry: ScRequest): Observable<any> {
        return Observable.create(function (observer) {
            observer.next({
                errorCode: '0',
                errorMessage:'SUCCESS',
                data:[{
                    ID:'1',
                    CODE:'code 1',
                    SID:'SID 1',
                    PRICE:'1SR',
                    CONDITION:'condition1'
                },{
                    ID:'2',
                    CODE:'code 2',
                    SID:'SID 2',
                    PRICE:'2SR',
                    CONDITION:'condition2'
                },{
                    ID:'3',
                    CODE:'code 3',
                    SID:'SID 3',
                    PRICE:'3SR',
                    CONDITION:'condition3'
                }]
            })
        });
    }

}
