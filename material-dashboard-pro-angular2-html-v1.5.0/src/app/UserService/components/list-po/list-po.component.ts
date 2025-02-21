import { Component, OnInit } from '@angular/core';
import {StructureService} from "../../services/structureServices/structure.service";
import {Router} from "@angular/router";
import {GammaLoginService} from "../../../services/gamma-login/gamma-login.service";
import {environment} from "../../../../environments/environment";
import {FinancialNumber, GlobalType, FinancialUnit, ManagerialUnit, PO} from "../../classes/managerialUnit";
import {MatDialog} from "@angular/material";
import {AddSectorComponent} from "../structure/entry-components/add-sector/add-sector.component";
import {AddPartialPoComponent} from "../structure/entry-components/add-partial-po/add-partial-po.component";

@Component({
  selector: 'app-list-po',
  templateUrl: './list-po.component.html',
  styleUrls: ['./list-po.component.scss']
})
export class ListPoComponent implements OnInit {

  public SERVER_URL: string = environment.serverUrl;
  pos:PO[]=[];
  pageSizeArray=[10,20,50,100];
  selectedPageSize=this.pageSizeArray[0];
  isLoading:boolean=false;
  search:string;
  constructor(public structureService:StructureService,
              private route: Router,
              public dialog: MatDialog,
              public auth:GammaLoginService,) { }

  ngOnInit() {

    this.loadPaginationTables();
  }


  public loadPaginationTables(){
    let financialSelector='#pagination-container'
    let financialPaginationUrl='/get-all-financial-units'
    let financialLocator='pos'
    let financialPayload={
      type: GlobalType.PO,
      search:this.search
    }

    this.loadGenericPaginationTable(financialSelector,financialPaginationUrl,financialLocator,financialPayload,GlobalType.FINANCIALNUMBER)



  }

  public loadGenericPaginationTable(selector,url,locator,payload,type:GlobalType) {
    let self = this;

    $(selector).pagination({
      dataSource: this.SERVER_URL + url,
      pageSize: self.selectedPageSize,
      showPrevious: false,
      showNext: false,
      locator: locator,

      totalNumberLocator: function (response) {

        //  totalNumber = response.size;
        //  console.log("size ===> "+totalNumber)
        return response.size;
      },
      alias: {
        pageNumber: 'page',
        pageSize: 'size',

      },

      ajax: {
        beforeSend: function (request) {
          self.isLoading = true;
          request.setRequestHeader("Authorization", "bearer " + self.auth.getToken());

        },
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(payload),
      },
      formatAjaxError: function(jqXHR, textStatus, errorThrown) { self.isLoading=false;},
      callback: function (data, pagination) {
        self.isLoading = false;
        self.pos=data

       }


    })
  }


  editPO(id) {
    this.route.navigate(["/userService/upsertPO/" + id]);
  }



}
