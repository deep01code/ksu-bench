import { SystemDomainService } from './../../../services/system-domain/system-domain.service';
import { System } from './../../../classes/system-domain';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VendorContact } from './../../../classes/vendor-contact';
import { Subcontract, Contract } from './../../../classes/project';
import { Project } from '../../../classes/project';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../../../services/project/project-api.service';
import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import swal from 'sweetalert2';
import { Vendor } from 'app/PST/classes/vendor';
import { VednorApisService } from 'app/PST/services/Vendor/VednorApis.service';

@Component({
  selector: 'app-sub-contract',
  templateUrl: './sub-contract.component.html',
  styleUrls: ['./sub-contract.component.css']
})
export class SubContractComponent implements OnInit {
  project: Project = null;
  contractIndex: number;
  subcontract: Subcontract[];
  contract: Contract;
  formEditable: boolean = false;
  isLoading: boolean = false;
  subVendors: Vendor[];
  systemDomains: System[];
  newSubcontract: Subcontract = new Subcontract();
  isNew: boolean = false;
  id: any;


  proejctTypes = ["Projection", "MS", "TM", "Scope"];

  constructor(private api: ProjectApiService, private route: Router,
    private router: ActivatedRoute, public dialog: MatDialog, private vendorApi: VednorApisService,
    private systemApi: SystemDomainService) {
    this.project = this.api.getProject();

    if (!this.project) {
      this.route.navigate(["/pst/projects"]).catch(e => {
      });
    } else {
      this.id = this.router.snapshot.paramMap.get('id')
      if (this.id == "new") {
        this.isNew = true;
        this.formEditable = true;
      }
      this.contractIndex = this.api.getContractIndex();
      this.contract = this.project.contracts[this.contractIndex];

      this.vendorApi.getSubVendors().subscribe((res) => {
        this.subVendors = res;
      }, (err) => {

      });
    }


    this.systemApi.getSystemDomains().subscribe((res) => {
      this.systemDomains = res
    }, (err) => {

    })

  }

  ngOnInit() {
  }

  compareWithId(o1, o2) {
    return o1.id == o2.id
  }

  enableEdit() {
    this.formEditable = !this.formEditable;
  }

  saveChanges() {
    let self = this;

    swal({
      title: 'Confirmation',
      text: 'Are you sure you want save changes?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Create Project!',
      buttonsStyling: false
    }).then(function () {
      self.isLoading = true;
      if (!self.isNew) {
        self.api.updateProject(self.id, self.project).subscribe((res) => {
          self.project = res;
          self.isLoading = false;
          swal({
            title: 'Done!',
            text: 'Changes has been saved successfully',
            type: 'success',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
          self.project = res;
          self.api.setProject(res)
          self.route.navigate(["/pst/projects"]);
        }, (err) => {
          self.isLoading = false;
          var errorMessage = "Error! not able to save your changes, please contact admin team";
          if (err.status == 409) {
            errorMessage = "Error! Please make sure you have entered unique values";
          } else if (err.status == 401) {
            errorMessage = err.error.developerMessage;
          } else if (err.status = 400) {
            errorMessage = "";
            Object.keys(err.error).forEach(function (key) {
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
          self.route.navigate(["/pst/projects"]);
        });
      } else {
        {
          self.api.createProject(self.project).subscribe((res) => {
            self.project = res;
            self.isLoading = false;
            swal({
              title: 'Done!',
              text: 'Project has been created successfully',
              type: 'success',
              confirmButtonClass: 'btn btn-success',
              buttonsStyling: false
            });
            self.project = res;
            self.api.setProject(res)
            self.route.navigate(["/pst/projects"]);
          }, (err) => {
            self.isLoading = false;
            var errorMessage = "Error! not able to create the project, please contact admin team";
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
            self.isNew = false;
            self.route.navigate(["/pst/projects"]);
          });
        }
      }
    }).catch(swal.noop);
  }


  addSubcontractDialog(subcontract: Subcontract): void {
    if (!subcontract.contacts) {
      subcontract.contacts = new Array<VendorContact>();
    }
    let dialogRef = this.dialog.open(SubContractDetails, {
      width: '65%',
      data: { subcontract: subcontract, subVendors: this.subVendors, editable: true, systemDomains: this.systemDomains }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      console.log(this.project)

      if (!result || !result.contacts) return

      if (!this.contract.subcontracts) this.contract.subcontracts = new Array<Subcontract>();
      this.contract.subcontracts.push(result.subcontract)
      console.log(result.subcontract);
      this.newSubcontract = new Subcontract();
    });
  }

  viewSubcontractDetails(subcontract: Subcontract): void {
    console.log(this.isNew)
    if (!subcontract.contacts) {
      subcontract.contacts = new Array<VendorContact>();
    }
    let dialogRef = this.dialog.open(SubContractDetails, {
      width: '65%',
      data: {
        subcontract: subcontract, subVendors: this.subVendors, editable: this.formEditable,
        systemDomains: this.systemDomains
      },

    });


    dialogRef.afterClosed().subscribe(result => {

      if (!result) return

    });
  }

}



@Component({
  selector: 'sub-contract-details',
  templateUrl: 'add-sub-contract.html',
})
export class SubContractDetails {
  newContact: VendorContact = new VendorContact();
  constructor(
    public dialogRef: MatDialogRef<SubContractDetails>,
    @Inject(MAT_DIALOG_DATA) public data: Subcontract) {
    if (!data.contacts) data.contacts = new Array<VendorContact>();
  }

  @ViewChild("form") form: NgForm;

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewContact() {
    this.data.contacts.push(this.newContact);
    this.newContact = new VendorContact();
  }

  compareWithId(o1: Vendor, o2: Vendor) {
    return o1.id == o2.id;
  }
}
