import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {GlobalType, PO} from "../../classes/managerialUnit";
import {Domain} from "../../../PST/classes/system-domain";
import {StructureService} from "../../services/structureServices/structure.service";
import {Router} from "@angular/router";
import {GammaLoginService} from "../../../services/gamma-login/gamma-login.service";
import {MatDialog} from "@angular/material";
import swal from "sweetalert2";

@Component({
  selector: 'app-list-domains',
  templateUrl: './list-domains.component.html',
  styleUrls: ['./list-domains.component.scss']
})
export class ListDomainsComponent implements OnInit {

  public SERVER_URL: string = environment.serverUrl;
  domains:Domain[]=[];
  pageSizeArray=[10,20,50,100];
  selectedPageSize=this.pageSizeArray[0];
  isLoading:boolean=false;
  search:string;
  fileToUpload: File | null = null;

  constructor(public structureService:StructureService,
              private route: Router,
              public dialog: MatDialog,
              public auth:GammaLoginService,) { }

  ngOnInit() {
    this.loadPaginationTables();

  }


  public loadPaginationTables(){
    let financialSelector='#pagination-container'
    let financialPaginationUrl='/get-all-domain-units'
    let financialLocator='domains'
    let financialPayload={
      type: GlobalType.DOMAIN,
      search:this.search
    }

    this.loadGenericPaginationTable(financialSelector,financialPaginationUrl,financialLocator,financialPayload,GlobalType.DOMAIN)



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
        self.domains=data

      }


    })
  }

  editDomain(id) {
    this.route.navigate(["/userService/upsertDomain/" + id]);
  }

  downloadDomainUploadTemplate(){
    this.structureService.downloadDomainUploadTemplate().subscribe(()=>{},()=>{},()=>{});
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.isLoading=true;
    this.structureService.postBulkDomainFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      this.isLoading=false;
      window.location.reload();
    }, error => {
      this.isLoading=false;
      swal({
        title: 'Error!',
        text: 'Some Vendor records was not updated, please check log page',
        type: 'error',
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false
      });
      console.log(error);
    });
  }


}
