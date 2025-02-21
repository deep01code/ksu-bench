import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class DeviceService {
    public SERVER_URL: string = environment.serverUrl;
  public baseUrl = this.SERVER_URL+"/javaplm/";
  public devicesEndPoint = this.baseUrl+"devices";
  public soapEndPoint = this.baseUrl+"soap/device";
  constructor(private http: HttpClient) { }

  getDevices(): Observable<any>{
      return this.http.get<any>(this.devicesEndPoint)
  }

  updateDevices(devices: any[]){
      return this.http.post<any>(this.soapEndPoint, devices);
  }
}
