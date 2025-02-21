import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild,Input} from '@angular/core';
import {ReleaseComponent} from '../release/release.component';
import {ReleaseService} from '../../services/release/release.service';
import { Release } from '../../classes/release';
import {Gam85Service} from '../../services/gam85/gam85.service';
import {Defect} from '../../classes/gam85/defect';
import * as moment from "moment";
import {Angular2Csv} from 'angular2-csv';
import {DataTableConfigService} from '../../../common-services/data-table-config/data-table-config.service';


@Component({
  selector: 'app-gam85',
  templateUrl: './gam85.component.html',
  styleUrls: ['./gam85.component.scss']
})
export class Gam85Component implements OnInit {

    @ViewChild(ReleaseComponent) rel:ReleaseComponent;
    @Input() selectedRelease: number;
    public selectedId:number;
    defects:Defect[];
    testerDefects:Defect[];
    public type:string='defect';
    releases:Release[];
    isLoading: boolean = false;

    
  constructor(private api: Gam85Service,
              private releaseApi:ReleaseService,
              private dc: ChangeDetectorRef,
              private config: DataTableConfigService) { }

  ngOnInit() {
  }

    getCsv() {

        var data=[];
        var temp=this.defects;
        data.push({id:"id",Summary:"Summary",Status:"Status",CreationTime:"CreationTime",Age:"Age",Priority:"Priority",
            Severity:"Severity",Developer:"Developer",Tester:"Tester"})

        temp.forEach(function (item) {

            if(item.BG_BUG_ID==undefined){item.BG_BUG_ID=-1}
            if(item.BG_SUMMARY==undefined){item.BG_SUMMARY=""}
            if(item.BG_STATUS==undefined){item.BG_STATUS=""}
            if(item.AU_TIME==undefined){item.AU_TIME=new Date(0)}
            if(item.age==undefined){item.age=""}
            if(item.BG_PRIORITY==undefined){item.BG_PRIORITY=""}
            if(item.BG_SEVERITY==undefined){item.BG_SEVERITY=""}
            if(item.BG_RESPONSIBLE==undefined){item.BG_RESPONSIBLE=""}
            if(item.BG_DETECTED_BY==undefined){item.BG_DETECTED_BY=""}

            data.push({Id:item.BG_BUG_ID,Summary:item.BG_SUMMARY,Status:item.BG_STATUS,CreationTime:item.AU_TIME,Age:item.age,Priority:item.BG_PRIORITY,
            Severity:item.BG_SEVERITY,Developer:item.BG_RESPONSIBLE,Tester:item.BG_DETECTED_BY});
        })
        new Angular2Csv(data,"Developer SLAs "+moment().format('LLL'));

    }

    getTesterCsv() {

        var data=[];
        var temp=this.testerDefects;

        data.push({id:"id",Summary:"Summary",Status:"Status",CreationTime:"CreationTime",Age:"Age",Priority:"Priority",
            Severity:"Severity",Developer:"Developer",Tester:"Tester"})

        temp.forEach(function (item) {

            if(item.BG_BUG_ID==undefined){item.BG_BUG_ID=-1}
            if(item.BG_SUMMARY==undefined){item.BG_SUMMARY=""}
            if(item.BG_STATUS==undefined){item.BG_STATUS=""}
            if(item.AU_TIME==undefined){item.AU_TIME=new Date(0)}
            if(item.age==undefined){item.age=""}
            if(item.BG_PRIORITY==undefined){item.BG_PRIORITY=""}
            if(item.BG_SEVERITY==undefined){item.BG_SEVERITY=""}
            if(item.BG_RESPONSIBLE==undefined){item.BG_RESPONSIBLE=""}
            if(item.BG_DETECTED_BY==undefined){item.BG_DETECTED_BY=""}

            data.push({Id:item.BG_BUG_ID,Summary:item.BG_SUMMARY,Status:item.BG_STATUS,CreationTime:item.AU_TIME,Age:item.age,Priority:item.BG_PRIORITY,
            Severity:item.BG_SEVERITY,Developer:item.BG_RESPONSIBLE,Tester:item.BG_DETECTED_BY});
        })
        new Angular2Csv(data,"Developer SLAs "+moment().format('LLL'));

    }

  getDeveloperSLAs(id:number){
      this.isLoading = true;
      this.dConfiguration.isLoading = true;
      this.api.getDeveloperSLAs(id)
          .subscribe(data =>{
              this.defects=data;
              this.isLoading = false;
              this.dConfiguration.isLoading = false;
          },
              (error) =>{
                    this.isLoading = false;
                    this.dConfiguration.isLoading = false;
              });
  }

  getTestSLAs(id:number){
      this.isLoading = true;
      this.configuration.isLoading = true;
      this.api.getTesterSLAs(id)
          .subscribe(
              (data) =>{
                      this.testerDefects=data;
                      this.isLoading = false;
                      this.configuration.isLoading = false;
          },
              (error) =>{
                    this.isLoading = false;
                    this.configuration.isLoading = false;
              });
  }
    
  public setReleases(): void {
      this.isLoading = true;
      this.releaseApi.getReleases(this.type)
          .subscribe(
              data => {
                  this.releases=data;
                  this.selectedId = this.selectedRelease;
                  this.getDeveloperSLAs(this.selectedId);
                  this.getTestSLAs(this.selectedId);
                  this.isLoading = false;
                },
              (error) =>{
                  this.isLoading = false;
              }
            );
  }

  public select(e): void{
      this.defects = [new Defect()];
      this.testerDefects = [new Defect()];
      this.dc.detectChanges();
      this.selectedId = e;
      this.getDeveloperSLAs(this.selectedId);
      this.getTestSLAs(this.selectedId);
  }



    configuration = this.config.getConfig();
    dConfiguration = this.config.getConfig();

    columns = [
        {title: "roleId", key: "BG_BUG_ID"},
        {title: "Summary", key: "BG_SUMMARY"},
        {title: "Status", key: "BG_STATUS"},
        {title: "Last Update", key: "AU_TIME"},
        {title: "Age", key: "age"},
        {title: "Priority", key: "BG_PRIORITY"},
        {title: "Severity", key: "BG_SEVERITY"},
        {title: "Developer", key: "BG_RESPONSIBLE"},
        {title: "Tester", key: "BG_DETECTED_BY"}
    ];
    data=[];

    eventEmitted($event){
    }
    
        
    ngOnChanges(){
        if(this.selectedRelease){              
            this.setReleases();
        }
    }
}
