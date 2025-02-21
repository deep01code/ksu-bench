import { Component, OnInit} from '@angular/core';
import { TableData } from '../../../md/md-table/md-table.component';
import {ReleaseService} from '../../services/release/release.service';
import {Release} from '../../classes/release';


@Component({
  selector: 'app-defect-tabs',
  templateUrl: './defect-tabs.component.html',
  styleUrls: ['./defect-tabs.component.scss']
})
export class DefectTabsComponent implements OnInit {
            
  private isLoading: boolean = false;
  public releases: Release[];
  public type: string = "defect";
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


    public activeTab: string = "gam86";
    tabIsClicked(test){
        this.activeTab = test;
    }
    

    isActiveTab(gam): boolean{
        return gam===this.activeTab;
    }

}
