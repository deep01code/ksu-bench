import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {FinancialNumber, GlobalType, GlobalDTO, SearchFinancialDTO} from "../../classes/managerialUnit";
import {StructureService} from "../../services/structureServices/structure.service";
import {GammaLoginService} from "../../../services/gamma-login/gamma-login.service";
import {Router} from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: 'app-list-fin',
  templateUrl: './list-fin.component.html',
  styleUrls: ['./list-fin.component.scss']
})
export class ListFinComponent implements OnInit {

  public SERVER_URL: string = environment.serverUrl;
  financialNumbers:FinancialNumber[]=[];
  pageSizeArray=[10,20,50,100];
  selectedPageSize=this.pageSizeArray[0];
  isLoading:boolean=false;
  search:string;
  fileToUpload: File | null = null;
  constructor(public structureService:StructureService,
              private route: Router,
              public auth:GammaLoginService,) { }

  ngOnInit() {


    this.loadPaginationTables();
  }

  public loadPaginationTables(){
    let financialSelector='#pagination-container'
    let financialPaginationUrl='/get-all-financial-units'
    let financialLocator='financialNumbers'
    let financialPayload={
      type: GlobalType.FINANCIALNUMBER,
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
        self.financialNumbers=data

       /* switch (type){
          case FinancialType.FINANCIALNUMBER:{self.financialNumbers=data;break;}
          case FinancialType.PO:{self.pos=data;break;}
          case FinancialType.PARTIALPO:{self.partialPos=data; break;}
        }*/
      }


    })
  }


  addFinancialNumber() {
    this.route.navigate(["/userService/upsertFin/new"]);
  }

  editFinancialNumber(id) {
    this.route.navigate(["/userService/upsertFin/" + id]);
  }


  downloadFinUploadTemplate(){
    this.structureService.downloadFinUploadTemplate().subscribe(()=>{},()=>{},()=>{});
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.isLoading=true;
    this.structureService.postBulkFinFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      this.isLoading=false;
      window.location.reload();
    }, error => {
      this.isLoading=false;
      swal({
        title: 'Error!',
        text: 'Some Fin records was not updated, please check log page',
        type: 'error',
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false
      });
      console.log(error);
    });
  }
}
