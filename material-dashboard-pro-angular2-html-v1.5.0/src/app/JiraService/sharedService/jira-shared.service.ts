import { Injectable } from '@angular/core';

@Injectable()
export class JiraSharedService {

  constructor() { }
  public selectedCR = null;

  public setSelectedCR(crDetails){
      this.selectedCR = crDetails;
  }
  public getSelectedCR(){
      return this.selectedCR
  }


}
