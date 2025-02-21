import {AfterViewInit, Component, OnInit, Input, OnChanges} from '@angular/core';
import { Release } from '../../classes/release';
import { NameCount } from '../../classes/name-count';
import { Gam27Service } from '../../services/gam27/gam27.service';
import {ReleaseService} from '../../services/release/release.service';
import {Angular2Csv} from 'angular2-csv';
import * as moment from "moment";
import {DataTableConfigService} from '../../../common-services/data-table-config/data-table-config.service';

@Component({
  selector: 'app-gam27',
  templateUrl: './gam27.component.html',
  styleUrls: ['./gam27.component.scss']
})
export class Gam27Component implements OnInit {
    listReleases: Release[];
    crsAndDefects: NameCount[];
    public type: string="defect";
    public isLoading: boolean = false;
    @Input() selectedRelease: number;
    
  constructor(private gam27Service: Gam27Service,
              private defectApi: ReleaseService,
              private config: DataTableConfigService) { }

  ngOnInit() {
  }
    getCrsWithDefectsInRelease(id): void {
        this.isLoading = true;
        this.configuration.isLoading = true;
        this.gam27Service.getCRsWithDefectsInRelease(id)
            .subscribe(
                crsAndDefects => {

                                            this.crsAndDefects = crsAndDefects;
                                            this.isLoading = false;
                                            this.configuration.isLoading = false;
                                        },
                (error) => {
                    this.isLoading = false
                    this.configuration.isLoading = false
                });
    }
    getListReleases(): void {
        this.isLoading = true;
        this.defectApi.getReleases(this.type)
            .subscribe(
                listReleases => {
                                        this.listReleases = listReleases;
                                        this.getCrsWithDefectsInRelease(this.selectedRelease);
                                        this.isLoading = false;
                                    },
                (error) => {
                    this.isLoading = false
                }
                );
    }
    select(id): void {
        this.crsAndDefects = [new NameCount()];
        this.getCrsWithDefectsInRelease(id);
    }

    getCsv() {

        var data=[];
        var temp=this.crsAndDefects;
        /*        <td>{{row.name}}</td>
                  <td>{{row.count}}</td>
        */
        data.push({name:"name",count:"count"})

        temp.forEach(function (item) {

            if(item.name==undefined){item.name=""}
            if(item.count==undefined){item.count=0}


            data.push({name:item.name,count:item.count})
        })
        new Angular2Csv(data,"Defects per CR with out rejected Report "+moment().format('LLL'));

    }



    configuration = this.config.getConfig();
    columns = [
        {title: "CR Name", key: "name"},
        {title: "Defects", key: "count"}
    ];
    data=[];

    eventEmitted($event){
    }
    
    
    ngOnChanges(){
        if(this.selectedRelease){          
            this.getListReleases();
        }
    }
    
}
