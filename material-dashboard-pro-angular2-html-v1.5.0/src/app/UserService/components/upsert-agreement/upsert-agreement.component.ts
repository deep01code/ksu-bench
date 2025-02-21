import { Component, OnInit } from '@angular/core';
import {VednorApisService} from "../../../PST/services/Vendor/VednorApis.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import {Agreement, AgreementItem, AgreementType, GlobalDTO} from "../../classes/managerialUnit";
import {StructureService} from "../../services/structureServices/structure.service";
import swal from "sweetalert2";
import {AddAgreementComponent} from "../structure/entry-components/add-agreement/add-agreement.component";
import {AddAgreementItemComponent} from "../structure/entry-components/add-agreement-item/add-agreement-item.component";

@Component({
  selector: 'app-upsert-agreement',
  templateUrl: './upsert-agreement.component.html',
  styleUrls: ['./upsert-agreement.component.scss']
})
export class UpsertAgreementComponent implements OnInit {

  tempAgreement:Agreement=new Agreement();
  isLoading: boolean = false;

  id;
  agreementTypes=Object.values(AgreementType);
  fileToUpload: File | null = null;

  constructor(public vednorApisService: VednorApisService,
              public router: Router,
              public route: ActivatedRoute,
              public dialog: MatDialog,
              public structureServer:StructureService,) {

    this.loadAgreementData();
  }

  ngOnInit() {

  }

  public loadAgreementData() {
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id != "new") {
      let globalDTO:GlobalDTO=new GlobalDTO();
      globalDTO.agreement=new Agreement();
      globalDTO.agreement.id=this.id;
      this.structureServer.getAgreement(globalDTO).subscribe(
          (res) => {
       //     this.vendor = res;
              this.tempAgreement= res as Agreement;
          },
          (err) => {
          },
          () => {
            this.isLoading = false
          }
      );
    }
  }

  upsertAgreement(){

    this.isLoading=true;
    let globalDTO:GlobalDTO=new GlobalDTO();
    globalDTO.agreement=this.tempAgreement;
    globalDTO.vendor=this.tempAgreement.vendor;
    this.vednorApisService.upsertAgreement(globalDTO).subscribe(
        data=>{
          this.loadAgreementData();
          swal({
            title: 'Done!',
            text: 'Changes has been saved successfully',
            type: 'success',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
          this.isLoading=false;
         // this.router.navigate(["/userService/listVendor/"]);

        },
        err=>{

          this.isLoading=false;
          this.loadAgreementData();
          swal({
            title: 'Error!',
            text: 'Duplicate Information or Server Error',
            type: 'error',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
        },
        ()=>{this.isLoading=false;}
    )


  }


  openAddAgreementItemDialog(agreement:Agreement){
    let dialogRef = this.dialog.open(AddAgreementItemComponent, {
      width: '60%',
      data: {ref:this,agreement:agreement}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openEditAgreementItemDialog(agreement:Agreement,agreementItem:AgreementItem){
    let dialogRef = this.dialog.open(AddAgreementItemComponent, {
      width: '60%',
      data: {ref:this,agreement:agreement,agreementItem:agreementItem}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


  downloadCardRateUploadTemplate(){
    this.structureServer.downloadCardRateUploadTemplate().subscribe(()=>{},()=>{},()=>{});
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.isLoading=true;
    this.structureServer.postBulkCardRateFile(this.fileToUpload,this.id).subscribe(data => {
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
