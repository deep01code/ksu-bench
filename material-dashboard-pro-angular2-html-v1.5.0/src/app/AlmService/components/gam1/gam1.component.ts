import {AfterViewInit, Component, OnInit, Input, OnChanges} from '@angular/core';
import { CRStatus } from '../../classes/gam1/CRStatus';
import { SingleCRStatus } from '../../classes/gam1/singleCRStatus';
import { Gam1Service } from '../../services/gam1/gam1.service';
import {Release} from '../../classes/release';
import {ReleaseService} from '../../services/release/release.service';
import { Angular2Csv } from 'angular2-csv';
import * as moment from "moment";
import {Status} from '../../classes/gam1/Status';

import swal from 'sweetalert2';
import {DataTableConfigService} from '../../../common-services/data-table-config/data-table-config.service';
import {FinalCrsStatus} from '../../classes/gam1/finalStatusClasses/FinalCrsStatus';
import {AvailableStatus} from '../../classes/gam1/finalStatusClasses/AvailableStatus';




@Component({
  selector: 'app-gam1',
  templateUrl: './gam1.component.html',
  styleUrls: ['./gam1.component.scss']
})
export class Gam1Component implements OnInit, OnChanges {

constructor(private api: Gam1Service,
                private releaseApi: ReleaseService,
                private config: DataTableConfigService) { }
    releases:Release[];
    crs:CRStatus[];
    singleCrStatus:SingleCRStatus[];
    public crName:string;
    crStatus:AvailableStatus[];
    public releaseId:number;
    public type: string = "release";
    public isLoading: boolean = false;
    public isError: boolean = false;
    @Input() selectedRelease: number;

    ngOnInit() {
        this.getAvailableStatus();
    }


    getResult(): void{
        this.isLoading = true;
        this.releaseApi.getReleases(this.type)
            .subscribe(
                (data)=>{
                    this.releaseId = this.selectedRelease;
                            this.releases=data;
                            this.getCrs(this.selectedRelease);
                            this.isLoading = false;
                            this.isError = false;
                            },
                    (error) => {
                    this.isLoading = false;
                    //this.isError = true;
                    });
    }

    getCrs(id): void{
        this.isLoading = true;
        this.configuration.isLoading = true;
        this.api.getCrs(id)
            .subscribe(
                (data)=>{
                            this.getCrLevelStatus(data)
                            this.isError = false;
                            this.isLoading = false
                            this.configuration.isLoading = false
                },
                (error) => {
                    this.isLoading = false
                    this.configuration.isLoading = false;
                    //this.isError = true;

                });
    }

    getSingleCrs(id): void{
        this.isLoading = true;
        this.api.getSingleCrs(id)
            .subscribe(
                (data)=>{
                    this.singleCrStatus=data;
                    this.selectCurrentRow(data);
                    this.isLoading = false;
                    },
                (error) => {
                    this.isLoading = false;
                    //this.isError = true;
                }
            );
    }
    getAvailableStatus(): void {
        this.isLoading = true;
        this.api.getAvailableStatus().subscribe((data) =>{
            this.crStatus = data;
            this.isLoading = false;
        },(err) =>{
            this.isLoading = false;
        })
    }

    getCrLevelStatus(crId): void {


        this.configuration.isLoading = true;
        let arr = [];
        this.crs=crId;
        for( let i = 0; i<this.crs.length; i++){
            arr.push({
                name: crId[i].name,
                status:{
                    passed: crId[i].status.passed,
                    na: crId[i].status.na,
                    noRun: crId[i].status.noRun,
                    notCompleted: crId[i].status.notCompleted,
                    failed: crId[i].status.failed,
                    blocked: crId[i].status.blocked
                },
                percentage: crId[i].percentage,
                id:crId[i].id,
            })
            this.isLoading = true;
            this.dataCrLevel = arr
            this.api.getCrLevelStatus(crId[i].id).subscribe(
                (data) => {
                    this.isLoading = false;
                    this.isError = false;
                    if (data == null) {
                        this.AddInProgress(this.dataCrLevel[i]);
                    } else {
                        this.dataCrLevel[i]["crStatus"]= data.crStatus;
                    }
                },(err) => {
                    this.isLoading = false;
                }
            )
        }
        //this.isLoading = false
        this.data = arr
        this.configuration.isLoading = false
    }

    select(id):void{
        this.getCrs(id)
        this.data = [""];
        //this.dataCrLevel = [""];
    }
    
    selectSingleCr(id,crName):void{
        this.getSingleCrs(id);
        this.crName = crName;
    }

    getCsv() {

        var data=[];
        var temp=this.crs;

        data.push({name:"name",passed:"passed",na:"na",noRun:"noRun",notCompleted:"notCompleted",failed:"failed",blocked:"blocked",percentage:"percentage"})

       temp.forEach(function (item) {
            var tempPassed
           var tempNa
           var tempNoRun
           var tempNotCompleted
           var tempFailed
           var tempBlocked;


           if(item.status["passed"] != undefined){  tempPassed=(item.status["passed"]).toString();}
           if(item.status["na"] != undefined){   tempNa=(item.status["na"]).toString();}
           if(item.status["noRun"] != undefined){   tempNoRun= (item.status["noRun"]).toString();}
           if(item.status["notCompleted"] != undefined){   tempNotCompleted= (item.status["notCompleted"]).toString();}
           if(item.status["failed"] != undefined){   tempFailed= (item.status["failed"]).toString();}
           if(item.status["Blocked"] != undefined){  tempBlocked= (item.status["Blocked"]).toString();}


           if(item.status["passed"] == undefined){ tempPassed="";}
           if(item.status["na"] ==undefined){ tempNa="";}
           if(item.status["noRun"] ==undefined){ tempNoRun="";}
           if(item.status["notCompleted"] ==undefined){ tempNotCompleted= "";}
           if(item.status["failed"] ==undefined){ tempFailed= "";}
           if(item.status["Blocked"] ==undefined){tempBlocked= "";}


           var temprow={name:item.name,passed:tempPassed,na:tempNa,noRun:tempNoRun,notCompleted:tempNotCompleted,failed:tempFailed,blocked:tempBlocked,percentage:item.percentage}
           data.push(temprow)

            if(item.status.passed==undefined){item.status.passed=0}
            if(item.status.na==undefined){item.status.na=0}
            if(item.status.noRun==undefined){item.status.noRun=0}
            if(item.status.notCompleted==undefined){item.status.notCompleted=0}
            if(item.status.failed==undefined){item.status.failed=0}
            if(item.status.blocked==undefined){item.status.blocked=0}

       })

        new Angular2Csv(data,"CR Status Report "+moment().format('LLL'));

    }


        /***Start Click row on table***/
    getTBBody(data:SingleCRStatus[]):string{
        let tags = "";
        if (data.length === 0){
            tags += "<tr style=\"font-size: 15px\;  color: black\">";
                tags+="<td>No Tester execute this CR</td>";
                tags+="<td>0</td>";
                tags+="<td>0</td>";
                tags+="<td>0</td>";
                tags+="<td>0</td>";
                tags+="<td>0</td>";
                tags+="<td>0</td>";

                tags+= "</tr>"
        } else {
            for (var i=0;i<data.length;i++){
                tags += "<tr style=\"font-size: 15px\;  color: black\">";
                tags+="<td>"+data[i].testerName+"</td>";
                tags+="<td>"+data[i].pass+"</td>";
                tags+="<td>"+data[i].na+"</td>";
                tags+="<td>"+data[i].notCompleted+"</td>";
                tags+="<td>"+data[i].failed+"</td>";
                tags+="<td>"+data[i].blocked+"</td>";
                tags+="<td>"+data[i].total+"</td>";
                tags+= "</tr>"
            }
        }
        return tags;
    }

    public selectCurrentRow(data){
        swal({
            title: '<p>' + this.crName + '</a>',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success',
            html:`
        <div class="card-content table-responsive">
            
            <table class="table table-hover">
                <thead class="text-primary">
                
                    <tr>
                        <th>Tester Name</th>
                        <th>Passed</th>
                        <th>NA</th>
                        <th>Not Completed</th>
                        <th>Failed</th>
                        <th>Blocked</th>
                        <th>Total</th>
                    </tr>
                        `+ this.getTBBody(data) +`
                </thead>
                <tbody>
                               
                </tbody>
            </table>
        </div>`,
            width: '60%'
        //});
    }).catch(swal.noop);
    //}
    }


    configuration = this.config.getConfig();
    columns = [
        {title: "Change Request Name", key: "name", width: '35%'},
        {title: "Passed", key: "passed"},
        {title: "N/A", key: "na",},
        {title: "No Run", key: "noRun",},
        {title: "Not Completed", key: "notCompleted",},
        {title: "Failed", key: "failed",},
        {title: "Blocked", key: "blocked"},
        {title: "Completion", key: "percentage"},
        {title: "Status", key: "crStatus"}
    ];
    data=[];
    dataCrLevel=[];


    eventEmitted($event){
    /*     if($event.value.row){
             this.selectSingleCr($event.value.row.id, $event.value.row.name)
         }*/
    }

    eventEmitted1($event){
        if($event){
            this.selectSingleCr($event.id, $event.name)
        }
    }

    finalStatus: FinalCrsStatus;
    onChange($event,row){
        this.finalStatus = new FinalCrsStatus();
        this.finalStatus.releaseId =this.releaseId;
        this.finalStatus.crId= row.id;
        this.finalStatus.crName = row.name;
        this.finalStatus.crStatus = $event.value.statusName;
        this.finalStatus.statusId = $event.value.statusId;
        this.api.postCrLevelStatus(this.finalStatus).subscribe(data => {
            this.isLoading = false;
        },(err) =>{
            this.isLoading = false;
        });
    }

    AddInProgress(row){
        this.isLoading = true;
        this.finalStatus = new FinalCrsStatus();
        this.finalStatus.releaseId =this.releaseId;
        this.finalStatus.crId= row.id;
        this.finalStatus.crName = row.name;
        this.finalStatus.crStatus = "BAT In Progress";
        this.finalStatus.statusId = 3;
        this.api.postCrLevelStatus(this.finalStatus).subscribe(data => {
            this.isLoading = false;
            this.isError = false;
        },(err) =>{
            this.isLoading = false;
        });
    }


    updateConfig(){
        this.configuration = { ...this.configuration };
    }
    
    
    ngOnChanges(){
        if(this.selectedRelease){
                this.getResult();
        }
    }
}
