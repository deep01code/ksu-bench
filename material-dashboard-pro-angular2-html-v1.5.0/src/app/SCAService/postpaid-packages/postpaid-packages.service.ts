import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class PostpaidPackagesService {

    constructor(private http: HttpClient) {
    }


    getApps(): Observable<Array<any>> {

        return Observable.create(function (observer) {
            observer.next([{
                ProdName:'prod1',
                ARABIC: 'عربي1', ENGLISH: 'english1',VALIDITY:'valid1',
                PRICE: 'price1', Sid: 'Sid1', SClass: 'SClass1'
            },{
                ProdName:'prod2',
                ARABIC: 'عربي2', ENGLISH: 'english2',VALIDITY:'valid2',
                PRICE: 'price2', Sid: 'Sid2', SClass: 'SClass2'
            }]);
        });
    }

}
