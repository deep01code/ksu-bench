import { VednorApisService } from './../../../services/Vendor/VednorApis.service';
import {Contact, Vendor} from './../../../classes/vendor';
import { Router, ActivatedRoute } from '@angular/router';
import {Component, Inject, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import { VendorContact } from 'app/PST/classes/vendor-contact';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import {GlobalDTO} from "../../../../UserService/classes/managerialUnit";
import {AddSectorComponent} from "../../../../UserService/components/structure/entry-components/add-sector/add-sector.component";
import {AddAgreementComponent} from "../../../../UserService/components/structure/entry-components/add-agreement/add-agreement.component";
import {AddContactComponent} from "../../../../UserService/components/structure/entry-components/add-contact/add-contact.component";
declare var $: any;

@Component({
  selector: 'app-VendorDetails',
  templateUrl: './VendorDetails.component.html',
  styleUrls: ['./VendorDetails.component.css'],
})
export class VendorDetailsComponent implements OnInit {
   vendor: Vendor = new Vendor();

   isLoading: boolean = false;

   id;
  constructor(public vednorApisService: VednorApisService,
              public router: Router,
              public route: ActivatedRoute,
              public dialog: MatDialog,


  ) {

    this.loadVendorData();
  }

  public loadVendorData() {
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id != "new") {
      this.vednorApisService.getVendorById(this.id).subscribe(
          (res) => {
            this.vendor = res;
          },
          (err) => {
          },
          () => {
            this.isLoading = false
          }
      );
    }
  }

  ngOnInit() {
  }




  saveChanges() {
    /*let self = this;
    swal({
      title: 'Confirmation',
      text: 'Are you sure you want save changes?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Add Employee!',
      buttonsStyling: false
    }).then(function () {
      self.isLoading = true;
      if (!self.isNew) {
        self.api.updateVendor(self.vendor).subscribe((res) => {
          self.vendor = res;
          self.isLoading = false;
          swal({
            title: 'Done!',
            text: 'Changes has been saved successfully',
            type: 'success',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
        }, (err) => {
          self.isLoading = false;
          var errorMessage = "Error! not able to save your changes, please contact admin team";
          if (err.status == 409) {
            errorMessage = "Error! Please make sure you have entered unique values";
          } else if (err.status == 401) {
            errorMessage = err.error.developerMessage;
          } else if(err.status = 400){
            errorMessage = "";
            Object.keys(err.error).forEach(function(key) {
              errorMessage = errorMessage + key + ": " + err.error[key] + "<hr>";
            })
          }
          swal({
            title: 'Error!',
            html: errorMessage,
            type: 'error',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
        });
      } else {
        {
          self.api.createVendor(self.vendor).subscribe((res) => {
            self.vendor = res;
            self.isLoading = false;
            swal({
              title: 'Done!',
              text: 'Vendor has been created successfully',
              type: 'success',
              confirmButtonClass: 'btn btn-success',
              buttonsStyling: false
            });
          }, (err) => {
            self.isLoading = false;
            var errorMessage = "Error! not able to create the vendor, please contact admin team";
            if (err.status == 401) {
              errorMessage = err.error.developerMessage;
            }
            swal({
              title: 'Error!',
              text: errorMessage,
              type: 'error',
              confirmButtonClass: 'btn btn-success',
              buttonsStyling: false
            });
          });
        }
      }

    }).catch(swal.noop);*/
  }


  openTapClick(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  openAddAgreementDialog(vendor:Vendor){
    let dialogRef = this.dialog.open(AddAgreementComponent, {
      width: '60%',
      data: {ref:this,vendor:vendor}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openContactDialog(vendor:Vendor,contact:Contact){
    let dialogRef = this.dialog.open(AddContactComponent, {
      width: '60%',
      data: {ref:this,vendor:vendor,contact:contact}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  editAgreement(id){
    this.router.navigate(["/userService/upsertAgreement/" + id]);

  }



  editContact(id){}

  upsertVendor(){
    this.isLoading=true;
    let globalDTO:GlobalDTO=new GlobalDTO();
    globalDTO.vendor=this.vendor;
    this.vednorApisService.upsertVendor(globalDTO).subscribe(
        data=>{
          this.loadVendorData();
          swal({
            title: 'Done!',
            text: 'Changes has been saved successfully',
            type: 'success',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
          this.isLoading=false;
          this.router.navigate(["/userService/listVendor/"]);

        },
        err=>{

          this.isLoading=false;
          this.loadVendorData();
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

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }


}
