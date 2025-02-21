import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ScBasicInfo} from './classes/scbasic-info';
import {ScenarioGivenArea} from '../gam220/classes/scenarioGivenArea';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Document} from './classes/document';
import {HttpClient} from '@angular/common/http';
import {DocumentResponse} from './classes/document-response';
import {Branch} from '../gam259/component/gam259.component';
import {AppUpdate} from '../gam266/classes/app-update';
import {environment} from '../../../environments/environment';


@Injectable()
export class WizardService {
    public SERVER_URL: string = environment.serverUrl;
    baseUrl = this.SERVER_URL+'/scaservice/';
    documentGenerationUrl = 'document/generate';

    SCMethod$:Observable<any>;
    private SCSubject = new ReplaySubject<any>();


    formIsSubmitted$:EventEmitter<boolean>;
    private formIsSubmittedSubject = new EventEmitter<boolean>();

    modifiedScenarioAreaListMethod$:Observable<any>;
    private modifiedScenarioAreaLisSubject = new ReplaySubject<any>();


    scBasicInfoMethod$:Observable<ScBasicInfo>;
    private scBasicInfoSubject = new ReplaySubject<ScBasicInfo>();

    constructor(private http:HttpClient) {
        this.SCMethod$ = this.SCSubject.asObservable();
        this.formIsSubmitted$ = this.formIsSubmittedSubject;
        this.modifiedScenarioAreaListMethod$ = this.modifiedScenarioAreaLisSubject.asObservable();
        this.scBasicInfoMethod$ = this.scBasicInfoSubject.asObservable();

    }
    updateSCDetailsMethod(data){
        this.SCSubject.next(data);
    }

    modifiedScenarioAreaListMethod(data){
        this.modifiedScenarioAreaLisSubject.next(data);
    }

    scBasicInfoMethod(data){
        this.scBasicInfoSubject.next(data);
    }
    formIsSubmitted(data){
        this.formIsSubmittedSubject.next(data);
    }

    generateDocument(doc:Document):Observable<DocumentResponse>{
        return this.http.post<DocumentResponse>(this.baseUrl+this.documentGenerationUrl,doc);
    }
}
