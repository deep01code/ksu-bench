import {ViewChild, AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit,Input} from '@angular/core';
import {Gam28Service} from '../../services/gam28/gam28.service';
import { Release } from '../../classes/release';
import {NameCount} from '../../classes/name-count';
import {HttpClient} from '@angular/common/http';
import swal from 'sweetalert2';
import {ReleaseService} from '../../services/release/release.service';
import * as moment from "moment";
import {Angular2Csv} from 'angular2-csv';
import {ReleaseComponent} from '../release/release.component';
import {DataTableConfigService} from '../../../common-services/data-table-config/data-table-config.service';

@Component({
  selector: 'app-gam28',
  templateUrl: './gam28.component.html',
  styleUrls: ['./gam28.component.scss']
})
export class Gam28Component implements OnInit {

  public releases: Release[];
  public defectsPerDev: NameCount[];
  public type: string = "defect";
  public isLoading: boolean = false;

  public cRsDefects: NameCount[];

  public developerName:string;


  @Input() selectedRelease: number;
  @ViewChild(ReleaseComponent) public release: ReleaseComponent

  constructor(private gam28Service: Gam28Service,
              private defectApi: ReleaseService,
              private dc: ChangeDetectorRef,
              private config: DataTableConfigService) {}    
    
    public getRelease(): void{
        this.isLoading = true;
        this.defectApi.getReleases(this.type)
            .subscribe( (data) => {
                                    this.releases = data;
                                    this.setData(this.selectedRelease);
                                    this.isLoading = false
                                },
                        (error) => {
                                    this.isLoading = false
                        });
    }

    public setData(id: number): void{
        this.isLoading = true;
        this.configuration.isLoading = true;
        this.gam28Service.getDefectsPerDev(id)
            .subscribe(data => {
                            this.defectsPerDev = (data);
                            this.isLoading = false;
                            this.configuration.isLoading = false;
                        },
                (error) => {
                            this.isLoading = false;
                            this.configuration.isLoading = false;
                        });
    }

  ngOnInit() {
  }



  public select(id): void{
    this.defectsPerDev = [new NameCount()];
    this.setData(id);
  }

    getCsv() {

        var data=[];
        var temp=this.defectsPerDev;
        /*        <td>{{row.name}}</td>
                  <td>{{row.count}}</td>
        */
        data.push({name:"name",count:"count"})

        temp.forEach(function (item) {

            if(item.name==undefined){item.name=""}
            if(item.count==undefined){item.count=0}
            data.push({name:item.name,count:item.count})
        })
        new Angular2Csv(data,"Defects per developer Excluding Rejected defects Report "+moment().format('LLL'));

    }

    configuration = this.config.getConfig();
    columns = [
        {title: "Developer Name", key: "name"},
        {title: "Number of Defects", key: "count"}
    ];
    data=[];

    eventEmitted($event){
        if($event.value.row){
            this.tableClicked($event.value.row.name);
        }
    }

    // getDeveloperDefectsPerCRInRelease(releaseId:number,developerName:string):void{
    //     this.isLoading = true;
    //     this.gam28Service.getDeveloperDefectsPerCRInRelease(releaseId,developerName)
    //         .subscribe(data=>{
    //                 this.cRsDefects=data
    //                 this.mAlert(data);
    //                 this.isLoading = false;
    //             },
    //             (error) => {
    //                 this.isLoading = false;
    //             })
    // }

     
    ngOnChanges(){
        if(this.selectedRelease){          
            this.getRelease()
        }
    }

    tableClicked(developerName:string){
        this.developerName = developerName;
        this.getDeveloperDefectsPerCRInRelease(this.selectedRelease,developerName);

    }

    getDeveloperDefectsPerCRInRelease(releaseId:number,developerName:string):void{
        this.isLoading = true;
        this.gam28Service.getDeveloperDefectsPerCRInRelease(releaseId,developerName)
            .subscribe(data=>{
                    this.cRsDefects=data;
                    this.mAlert(data);
                    this.isLoading = false;
                },
                (error) => {
                    this.isLoading = false;
                })
    }

    public mAlert(data:NameCount[]):void {
        swal({
            title: '<p>' + 'CRs' + '</a>',
            buttonsStyling: false,
            //timer: 4000, // to hide the modal after 4 sec
            confirmButtonClass: 'btn btn-success',
            html:`<div class="card-content table-responsive">
            <table class="table table-hover">
                <thead class="text-primary">
                    <tr style="font-size: 15px">
                        <th>CR Name</th>
                        <th>Count</th>
                    </tr>
                    `+ this.getTableBody(data) +`
                
                </thead>
                <tbody>
                    
                </tbody>
                </table>
                </div>`,
            width: '50%'
        }).then(
            function () {},
            // handling the promise rejection
            function (dismiss) {
                if (dismiss === 'timer') {
                    console.log('I was closed by the timer')
                }
            }).catch(swal.noop);
    }

    getTableBody(data:NameCount[]):string{
        let tags = "";
        for (var i=0;i<data.length;i++){
            tags += "<tr style=\"font-size: 15px\;  color: black\">";
            tags+="<td>"+data[i].name+"</td>";
            tags+="<td>"+data[i].count+"</td>";
            tags+= "</tr>"
        }

        return tags;
    }


}
