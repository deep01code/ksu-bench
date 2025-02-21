import {ChangeDetectorRef,Component, OnInit, ViewChild} from '@angular/core';
import { Gam92Service } from '../../services/gam92/gam92.service';
import { PlannedExecs } from '../../classes/gam92/planned-execs';
import {ReleaseComponent} from '../release/release.component';
import { Release } from '../../classes/release';
import {ReleaseService} from '../../services/release/release.service';

@Component({
  selector: 'app-gam92',
  templateUrl: './gam92.component.html',
  styleUrls: ['./gam92.component.scss']
})
export class Gam92Component implements OnInit {

    result:Array<Array<any>>;
    mlabels:Array<string>;
    mActual:Array<number>;
    mPlanned:Array<number>;

    plannedExecs:PlannedExecs[];
    actualExecs:PlannedExecs[];
    public datasets:Array<any>=new Array<any>();
    public labels:string[];
    public chartType:string ='line';
    public chartLegend:boolean = true;
    public toggleStatus:boolean=false;
    public releases: Release[];
    public isLoading: boolean = true;

    checkRegressionTime:boolean=false;




    public type: string = 'release';

    @ViewChild(ReleaseComponent) rel:ReleaseComponent;

    constructor(private service:Gam92Service,private releaseApi:ReleaseService,private cd: ChangeDetectorRef) { }

    ngOnInit() {
        //this.getActualExecs("");
        //this.getResult()
        this.setReleases();
    }

    getResult(id:number,type:string):void{
        this.isLoading = true;

        if (type === 'func'){
            this.service.getFunctionalPlannedAndActual(id)
                .subscribe(result=>{

                    this.result = result
                    console.log(this.result);
                    this.cd.detectChanges();
                    this.setmDataSets(result);
                    this.cd.detectChanges();
                    this.isLoading = false;
                },
                    (error)=>{
                        this.isLoading = false;
                    });
        }else {
            this.service.getRegressionPlannedAndActual(id)
                .subscribe(
                    result=>{
                        this.result = result
                        console.log(result);
                        this.cd.detectChanges();
                        this.setmDataSets(result);
                        this.isLoading = false;

                    },
                    (error)=>{
                        this.isLoading = false;
                    });
            this.cd.detectChanges();
        }
    }

    setmDataSets(result):void{
        this.labels = new Array();
        this.labels.length = 0;
        this.labels = result[0];

        this.datasets = new Array<any>();
        this.datasets.length=0;
        this.cd.detectChanges();

        let plannedData = {
            data:result[1],
            label:'Planned',fill:false};

        let actData = {
            data:result[2],
            label:'Actual',fill:false};
        this.datasets.push(plannedData) //= plannedData;
        this.datasets.push(actData)// = actData;
        this.cd.detectChanges();

        let date = new Date(this.labels[this.labels.length-1]);
        if (!this.checkRegressionTime) {
            this.checkRegressionTime = true;
            if (date < new Date()) {

                this.getResult(this.selectedId,"reg")
            }
        }

    }

    getPlannedExecs(type:string): void {
        this.isLoading = true;

        this.plannedExecs = new Array();
      if (this.plannedExecs){
        this.plannedExecs.length = 0;
      }
      this.service.getPlannedTCsExecs(1,type)
          .subscribe(plannedExecs => {
                this.setPlannedExecs(plannedExecs);
                this.isLoading = false;
          },
              (error)=>{
                  this.isLoading = false;
              });
    }

    getActualExecs(type:string):void{
        this.actualExecs = new Array();
        this.isLoading = true;

        if (this.actualExecs){
        this.actualExecs.length = 0;
      }
      this.service.getActualTCsExecs(1, "")
          .subscribe(actualExecs => {
                this.setActualExecs(actualExecs);
                this.getPlannedExecs(type);
                this.isLoading = false;

          },
              (error)=>{
                  this.isLoading = false;

              });
    }

    setPlannedExecs(plannedExecs:PlannedExecs[]): void{
        //this.labels.length = 0;
        //this.labels = new Array<any>();
      this.plannedExecs = new Array<PlannedExecs>();
      this.plannedExecs.length = 0;
      this.datasets = new Array();
      this.datasets.length = 0;
      for (var i=0;i<plannedExecs.length;i++){
        this.plannedExecs.push(plannedExecs[i]);
      }
      if (this.actualExecs){
          this.setLabels(this.actualExecs, this.plannedExecs);
      }

    }
    setActualExecs(actualExec:PlannedExecs[]): void{
      //this.labels.length = 0;
      //this.labels = new Array<any>();

        this.actualExecs = new Array<PlannedExecs>();
        this.actualExecs.length = 0;
        for (var i=0;i<actualExec.length;i++){
            this.actualExecs.push(actualExec[i]);
        }

        if (this.plannedExecs) {
            this.setLabels(this.actualExecs, this.plannedExecs);
        }
    }

    setLabels(actual:PlannedExecs[],planned:PlannedExecs[]): void {
      this.labels = new Array<any>();
      let labels = new Array();
      if (actual.length<planned.length) {
          for (var i = 0; i < planned.length; i++) {
              labels.push(this.plannedExecs[i].name);
              this.labels.push(this.plannedExecs[i].name);
          }
      }else {
          for (var i = 0; i < actual.length; i++) {
              labels.push(this.actualExecs[i].name);
              this.labels.push(this.actualExecs[i].name);
          }
      }
      this.labels = labels;
        //console.log("labels are : "+ this.labels);
      this.setDataSets(this.actualExecs,this.plannedExecs);
    }

    setDataSets(act:PlannedExecs[],planned:PlannedExecs[]):void{
      this.datasets.length = 0;
      let arr = new Array();
      let plannedData = {
            data:this.getcountsOfPlannedExecs(planned),
                label:'Planned'};
      let actData = {
          data:this.getCountOfActualExecs(act),
          label:'Actual'};

        //console.log(this.datasets);
        this.datasets.length = 0;
        arr.push(plannedData);
        arr.push(actData);
        this.datasets = arr;
        this.datasets[0] = plannedData;
        this.datasets[1] = actData;
    }

    getcountsOfPlannedExecs(planned:PlannedExecs[]):Array<number>{
      var arr = new Array<number>();
      for (var i=0;i<planned.length;i++){
        arr.push(planned[i].count);
      }
      return arr;
    }

    getCountOfActualExecs(act:PlannedExecs[]):Array<number>{
        var arr = new Array<number>();
        for (var i=0;i<act.length;i++){
            arr.push(act[i].count);
        }
        return arr;
    }

    public toggleChange(e: any): void{
        this.toggleStatus=e;
        if(e) {
            this.getResult(this.selectedId,"reg");
        }else
            this.getResult(this.selectedId,"func");
    }

    selectedId:number;
    public select(e): void{
        if (this.toggleStatus) {
            this.selectedId = e;
            this.getResult(e, "reg" );
        }else{
            this.selectedId = e;
            this.getResult(e, "func" );
        }
    }

    public setReleases(): void{
        this.isLoading = true;
        this.releaseApi.getReleases(this.type)
            .subscribe(
                data => {
                    this.releases = data;
                    this.selectedId = data[0].id;
                    this.getResult(this.selectedId, "func");
                    this.isLoading = false;
                },
                (error)=>{
                    this.isLoading = false;
                }
            );
    }


}
