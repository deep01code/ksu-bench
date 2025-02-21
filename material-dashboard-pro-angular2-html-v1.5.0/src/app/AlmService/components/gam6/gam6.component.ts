import {AfterViewInit, Component, OnInit,Input, OnChanges} from '@angular/core';
import { NameCount } from '../../classes/name-count';
import { Release } from '../../classes/release';
import { Gam6Service } from '../../services/gam6/gam6.service';
import {ReleaseService} from '../../services/release/release.service';
import { Angular2Csv } from 'angular2-csv';
import * as moment from "moment";
import {DataTableConfigService} from '../../../common-services/data-table-config/data-table-config.service';

declare const $: any;
@Component({
  selector: 'app-gam6',
  templateUrl: './gam6.component.html',
  styleUrls: ['./gam6.component.scss']
})
export class Gam6Component implements OnInit {
    runs: NameCount[];
    releases: Release[];
    public type: string = "release";
    public isLoading: boolean = false;
    constructor(private gam6Service: Gam6Service,
                private defectApi: ReleaseService,
                private config: DataTableConfigService) { }

    @Input() selectedRelease: number;
    
    
  ngOnInit() {
      //this.getLabReleases();
  }
    
    getRuns(id): void {
            this.isLoading = true;
            this.configuration.isLoading = true;
            this.gam6Service.getRuns(id)
            .subscribe(runs => {
                        this.runs = runs
                        this.isLoading = false;
                        this.configuration.isLoading = false;

            }, (error) => {
                this.isLoading = false
                this.configuration.isLoading = false;
            });
    }

    getLabReleases(): void {
        this.isLoading = true;
        this.defectApi.getReleases(this.type)
            .subscribe(releases =>
                        { this.releases = releases;
                        console.log('gam6 is fired');
                        this.getRuns(this.selectedRelease);
                        this.isLoading = false
                        },
                (error) => {
                        this.isLoading = false
                });
    }

    select(id): void {
        this.runs = [new NameCount()];
        this.getRuns(id);
    }

    getCsv() {

        var data=[];
        var temp=this.runs;
        /*        <td>{{row.name}}</td>
                  <td>{{row.count}}</td>
        */
        data.push({name:"name",count:"count"})

        temp.forEach(function (item) {

            if(item.name==undefined){item.name=""}
            if(item.count==undefined){item.count=0}


            data.push({name:item.name,count:item.count})
        })
        new Angular2Csv(data,"Tester TCs Executions Report "+moment().format('LLL'));

    }




    configuration = this.config.getConfig();
    columns = [
        {title: "Tester Name", key: "name"},
        {title: "Number of Executed TCs", key: "count"}
    ];
    data=[];

    eventEmitted($event){
    }
    
    ngOnChanges(){
        if(this.selectedRelease){
                this.getLabReleases();
        }
    }
}
