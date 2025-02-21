import {ViewChild, AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit} from '@angular/core';
import {DataTableConfigService} from '../../../common-services/data-table-config/data-table-config.service';
import { Gam220Service } from '../gam220.service';
import {ScenarioArea} from '../classes/scenarioarea';
import { ScenarioAreaRequest } from '../classes/scenarioarearequest';
import { ScenarioAreaData } from '../classes/scenarioareaData';
import {ScenarioGivenArea} from '../classes/scenarioGivenArea';
import { ScenarioGivenAreaRequest } from '../classes/ScenarioGivenAreaRequest';
import { ScenarioGivenAreaData } from '../classes/ScenarioGivenAreaData';
import {WizardService} from '../../wizard/wizard.service';


@Component({
  selector: 'app-gam220',
  templateUrl: './gam220.component.html',
  styleUrls: ['./gam220.component.scss']
})
export class Gam220Component implements OnInit {

  constructor(private api: Gam220Service,
              private config: DataTableConfigService,
              private wizService:WizardService) {
        this.configuration.orderEnabled = false;      
        this.configuration2.orderEnabled = false;
        this.configuration.globalSearchEnabled = false;      
        this.configuration2.globalSearchEnabled = false;
        this.wizService.modifiedScenarioAreaListMethod(this.modifiedList);
        //this.wizService.modifiedScenarioAreaListMethod(this.editList);
  }
    
  public sr: ScenarioAreaRequest = { TABLENAME : "SC_TEST_AREA" }

  public modifiedList: Array<any> = [];
  public isModified: boolean = true;

  AreaName: string;
  
  scenariosArea:ScenarioArea;
  scenarioGivenArea:ScenarioGivenArea = new ScenarioGivenArea();
  
  scenariosAreaArr:ScenarioAreaData[];


  ngOnInit() {
    this.getTestCases();
  }

    getTestCases(): void{
        this.api.getScenarioArea(this.sr)
        .subscribe( (result) => {
            this.scenariosArea = result;
            let arr = [];
            for( let i = 0; i<this.scenariosArea.data.length; i++){
                arr.push({
                    ID: result.data[i].ID,
                    AREA: result.data[i].AREA,
                    CREATED: result.data[i].CREATED,
                    LAST_UPD: result.data[i].LAST_UPD,
                    LAST_UPD_BY: result.data[i].LAST_UPD_BY,
                })
            }
            this.scenariosAreaArr = arr;
        });
    }

    private srGivenArea: ScenarioGivenAreaRequest = { TABLENAME : "SC_TEST_SCENARIO", START: "0", COUNT: "10", FILTER:"AREA_ID=1"}
    
    select(id,Area){
        this.AreaName = Area;
        this.srGivenArea.FILTER = "AREA_ID="+ id;
        this.getTestCasesForGivenArea();
    }
    
    getTestCasesForGivenArea(): void{
        this.api.getScenarioForGivenArea(this.srGivenArea)
        .subscribe( (result) => {
                this.scenarioGivenArea = result;
        });
    }

  public editList: Array<any> = [];
    

  addToEdit(row,event: any){
    row["AreaName"] = this.AreaName;
    this.editList.push(row);
    let obj = Object.assign({}, row);
    this.modifiedList.push(obj);
    this.editList = [ ...this.editList];
  }

    
  removeFromEdit(row){
      let index = this.editList.indexOf(row);
      this.editList.splice(index, 1);
      this.editList = [...this.editList];
      this.removeFromEditedList(row.ID)
        
  }


    configuration = this.config.getConfig();
    
    configuration2 = this.config.getConfig();

    
    columns = [
        {title: "Area", key: "Area"},
        {title: "Scenario", key: "Scenario"},
        {title: "Expected Result ", key: "ExpectedResult"},
        {title: '', key:''}
    ];

    updateConfig(){
        this.configuration = { ...this.configuration };
        this.configuration2 = { ...this.configuration };
    }

    eventEmitted($event){
        
    }

  removeFromEditedList(id){
      for (let i = 0; i < this.modifiedList.length; i++) {
          if (this.modifiedList[i].ID === id)
              this.modifiedList.splice(i, 1)
      }
  }




  textChanged(row, content, value){
      let obj = Object.assign({}, row);
      let alreadyUpdated = this.containsObject(obj, this.modifiedList);
      let index = this.editList.indexOf(row);
      let changed = true;
      if(alreadyUpdated !==  -1) {
          obj = this.modifiedList[alreadyUpdated]
      }

      if(value === 'A' && content !== obj.AreaName){
          obj.AreaName = content;
          changed = true;
      }else if(value === 'B' && content !== obj.SCENARIO){
          obj.SCENARIO = content;
          changed = true;
      }else if(value === 'C' && content !== obj.EXPECTED_RESULT){
          obj.EXPECTED_RESULT = content;
          changed = true;
      }
      if( alreadyUpdated === -1) {
          this.modifiedList.push(obj)
      }else if(changed){
          this.modifiedList[this.containsObject(obj, this.modifiedList)] = obj;
      }
  }

    containsObject(obj, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].ID === obj.ID) {
                return i;
            }
        }
        return -1;
    }

    isDisabled(row): boolean{
        for(let i = 0; i < this.editList.length; i++){
            if(this.editList[i].SCENARIO === row.SCENARIO)
            return true;
        }
        return false;
    }

}
