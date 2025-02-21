import { Component, OnInit,Input, OnChanges} from '@angular/core';
import {Gam86Service} from '../../services/gam86/gam86.service';
import {ReleaseService} from '../../services/release/release.service';
import {Gam86} from '../../classes/gam86/gam86';
import {Priority} from '../../classes/gam86/priority';
import {Severity} from '../../classes/gam86/severity';
import {Release} from '../../classes/release';


@Component({
    selector: 'app-gam86',
    templateUrl: './gam86.component.html',
    styleUrls: ['./gam86.component.scss']
})
export class Gam86Component implements OnInit {
    public data: Gam86[];
    public releases: Release[];
    public statusList: string[];
    public priorityList: string[];
    public severityList: string[];
    priorityCount: Priority[];
    severityCount: Severity[];


    public selectedPriority: string="all";
    public selectedSeverity: string="all";

    public statusTotal: number[];
    public total: number = 0;
    public selectedId: number;
    public type: string = "defect"
    public isLoading: boolean = true;
    @Input() selectedRelease: number;

    constructor(private gam86: Gam86Service, private api: ReleaseService) { }

    public setReleases(): void{
        this.isLoading = true;
        this.api.getReleases(this.type)
            .subscribe(
                res => {
                    this.releases = res
                    this.selectedId = this.selectedRelease;
                    this.setData(this.selectedRelease)
                    this.getSelectedPriorityDefectStatistics(this.selectedRelease);
                    this.getSelectedSeverityDefectStatistics(this.selectedRelease);
                    this.isLoading = false;
                },
                (error) => {
                    this.isLoading = false;
                }
            );
    }

    ngOnInit() {
    }

    public setData(id: number): void{
        this.isLoading = true;
        this.gam86.getDefectStatistics(id)
            .subscribe(res => {
                this.data = res;
                this.setUIdata(this.data, this.selectedPriority, this.selectedSeverity);
                console.log( res )
                this.isLoading = false;
            },
                (error) =>{
                    this.isLoading = false;
                })
    }


    public select(e): void{
        this.selectedId = e;
        this.setData(e);
        this.getSelectedPriorityDefectStatistics(e);
        this.getSelectedSeverityDefectStatistics(e);
    }

    public setUIdata(data: Gam86[], priority, severity ): void{
        this.getRetrivedStatus(data);
        this.statusTotal = [];
        this.total = 0;
        for(let i = 0; i < this.statusList.length; i++){
            let total = this.countStatusTotal(data, this.statusList[i], priority, severity);
            this.total+= total;
            this.statusTotal.push(total)
        }
    }

    public countStatusTotal(data: Gam86[], status: string, priority: string, severity: string): number{
        let total = 0;
        for(let i = 0; i < data.length; i++){
            if(data[i].status === status
                && (priority === "all" || data[i].priority === priority)
                && (severity === "all" || data[i].severity === severity)) {
                total += data[i].count
            }
        }
        return total;
    }

    public getRetrivedStatus(data: Gam86[]): void{
        this.statusList = new Array<string>();
        this.priorityList = new Array<string>();
        this.severityList = new Array<string>();
        for(let i = 0; i < data.length; i++){
            if(!this.statusList.includes(data[i].status))
                this.statusList.push(data[i].status);

            if(!this.priorityList.includes(data[i].priority))
                this.priorityList.push(data[i].priority)

            if(!this.severityList.includes(data[i].severity))
                this.severityList.push(data[i].severity)
        }
    }

    public setPriority(value): void{
        this.selectedPriority = value;
        this.setUIdata(this.data, this.selectedPriority, this.selectedSeverity)
    }

    public setSeverity(value): void{
        this.selectedSeverity = value;
        this.setUIdata(this.data, this.selectedPriority, this.selectedSeverity)
    }



    getSelectedPriorityDefectStatistics(id): void{
        this.isLoading = true;
        this.gam86.getPriorityDefectStatistics(id)
            .subscribe(
                data => {
                    this.priorityCount=data;
                    this.isLoading = false;
                },
                (error)=>{
                    this.isLoading = false;
                });
    }

    getSelectedSeverityDefectStatistics(id): void{
        this.isLoading = true;
        this.gam86.getSeverityDefectStatistics(id)
            .subscribe(
                data => {
                    this.severityCount=data;
                    this.isLoading = false;
                },
                (error) =>{
                    this.isLoading = false;
                });
    }
    
     
    ngOnChanges(){
        if(this.selectedRelease){          
            this.setReleases();
        }
    }

}
