import {Component, OnInit, ViewChild} from '@angular/core';

import {forEach} from '@angular/router/src/utils/collection';
import {current} from 'codelyzer/util/syntaxKind';
import {split} from 'ts-node/dist';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';
import {MatSort, MatTableDataSource} from '@angular/material';
import {ServiceService} from '../service.service';
import {JiraSharedService} from '../../sharedService/jira-shared.service';

@Component({
  selector: 'app-gam453',
  templateUrl: './gam453.component.html',
  styleUrls: ['./gam453.component.scss']
})
export class Gam453Component implements OnInit {

    isLoading: boolean = false;

    //dataSource = new CRsDataSource(this.api);

    dataSource;

    @ViewChild(MatSort) sort: MatSort;


    constructor(private api:ServiceService, private shared: JiraSharedService) {

    }

  ngOnInit() {
        this.getCrs();
  }

  getCrs():void{
        this.isLoading=true;
        this.api.getCRs()
            .subscribe(data=>{
                this.dataSource = new MatTableDataSource(data);
                this.isLoading=false;
                this.dataSource.sort = this.sort;

            });
  }

  getSystem(type:string,arr:string[]):string{
        if(!arr){return null;}
        return arr.find(res=>res.split('-')[0]==type);
  }

  displayedColumns: string[] = ['BU', 'CR', 'RBM', 'CRMG','BEAI','OM','NSM','ULA','RadianceId','add'];


    addToRadiance(param){
        this.shared.setSelectedCR(param);
        console.log(param);
    }

    updateRadiance(){
        this.api.updateRadiance().subscribe(res=>{
            console.log(res)
        });
    }

}
