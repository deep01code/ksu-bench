import { Component, OnInit} from '@angular/core';
import { TableData } from '../../../md/md-table/md-table.component';
import {ReleaseService} from '../../services/release/release.service';
import {Release} from '../../classes/release';

declare var $: any;
declare interface Task {
  title: string;
  checked: boolean;
}

@Component({
  selector: 'app-testlinktabs',
  templateUrl: './CRsRelatedReleases.component.html',
  styleUrls: ['./CRsRelatedReleases.component.scss']
})
export class CRsRelatedReleasesComponent implements OnInit {
    
  private isLoading: boolean = false;
  public releases: Release[];
  public type="release";
  public selectedRelease;
  public gamId;
  constructor(private releaseApi: ReleaseService) { }

  ngOnInit() {
        this.isLoading = true;
        this.releaseApi.getReleases(this.type)
            .subscribe(
                (data)=>{
                            this.releases=data;
                            this.selectedRelease = data[0].id;
                            },
                    (error) => {
                        this.isLoading = false;
                    });
  };

  select(id){
    this.selectedRelease=id;
  }


    public activeTab: string = "gam1";
    tabIsClicked(test){
        this.activeTab = test;
    }
    

    isActiveTab(gam): boolean{
        return gam===this.activeTab;
    }

}
