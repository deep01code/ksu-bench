import { Component, OnInit } from '@angular/core';
import {StructureService} from "../../services/structureServices/structure.service";

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.scss']
})
export class ListErrorsComponent implements OnInit {

  errorMessages=[] as any;
  isLoading:boolean=false;

  constructor(public structureService:StructureService) {

    this.structureService.getAllErrorMsg().subscribe(
        (data)=>{
          this.errorMessages=data as any;
        }
    )
  }

  ngOnInit() {
  }

}
