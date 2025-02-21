import { Router, ActivatedRoute } from '@angular/router';
import { GeneralDepartment, Section, Department } from './../../../classes/GeneralDepartment';
import { LoVService } from './../../../services/LoV/LoVService';
import { FormGroup, NgForm } from '@angular/forms';
import { SystemDomainService } from './../../../services/system-domain/system-domain.service';
import { System } from 'app/PST/classes/system-domain';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-system-domain-details',
  templateUrl: './system-domain-details.component.html',
  styleUrls: ['./system-domain-details.component.scss'],
  providers: [LoVService]
})
export class SystemDomainDetailsComponent implements OnInit, OnDestroy {
  systemDomain: System;
  //editable: boolean = true;
  //createNew: boolean = false;
  gdList: GeneralDepartment[];
  isLoading: boolean = false;
  selectedGd: GeneralDepartment;
  selectedDepartment: Department;
  selectedSection: Section;
  id: any;

  viewConfig: any ={
    editable: true,
    createNew: false
  }

  constructor(private api: SystemDomainService, private lov: LoVService,
    private router: Router, private route: ActivatedRoute) {
    this.systemDomain = this.api.getSystemDomain();
    this.id = this.route.snapshot.paramMap.get('id');
    this.lov.getGeneralDepartments().subscribe((res) => {
      this.gdList = res;
      //if this.systemDomain is exist, set the form valuse based on the object values
      if (this.systemDomain.id != 0 && this.id == this.systemDomain.id || this.id == "new") {
        if (this.systemDomain.id != 0) { this.viewConfig.editable = false; }//since we already have system, use should ask for update
        this.setSectionValue();
      } else { // if this.systemDomain is null and we are not at /new URI, then fetch the System detils using the id in the URI
        this.api.getSystemDomainFromBackEnd(this.id).subscribe((res) => {
          this.systemDomain = res;
          this.setSectionValue();
          this.viewConfig.editable = false;  // since we fetched the system from backend, use should ask for update
        }, (err) => { // in case of error, we'll redirect the usr to the system view page
          this.router.navigate(["/pst/system-domains"])
          swal({
            title: 'Error!',
            text: 'Not able to find any system domain with id: ' + this.id,
            type: 'error',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
        });
      }
    }, (err) => {

    });
  }

  @ViewChild("form") form: NgForm;

  ngOnInit() {
  }


  //FIXME
  public submitForm() {
    let self = this;
   // this.systemDomain.section = this.selectedSection;
    let message = "Are you sure you want to " + (this.id == "new" ? "create new" : "update") + " System Domain?";
    swal({
      title: 'Confirmation',
      text: message,
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Add Employee!',
      buttonsStyling: false
    }).then(function () {

      self.isLoading = true;
      if (self.id == "new") {
        self.api.createSystem(self.systemDomain).subscribe((res) => {
          self.isLoading = false;
          swal({
            title: 'Done!',
            text: 'System Domain has been created successfully',
            type: 'success',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
          self.router.navigate(["pst/system-domains"])
        }, (err) => {
          self.isLoading = false;
          let message;
          if (err.error && err.error.status == 409) {
            message = 'Unable to create system domain, another system with the same number is already exist'
          } else if (true) {
            message = 'Not able to create system, please contact admin team.'
          }
          swal({
            title: 'Error!',
            text: message,
            type: 'error',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
        });
      } else {
        self.api.updateSystemDomain(self.systemDomain).subscribe((res) => {
          self.isLoading = false;
          swal({
            title: 'Done!',
            text: 'System Domain has been updated successfully',
            type: 'success',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
          //self.api.setSystemDomain(null);
          self.router.navigate(["pst/system-domains"])
        }, (err) => {
          self.isLoading = false;
          swal({
            title: 'Error!',
            text: 'Unable to update system domain, another system with the same number is already exist',
            type: 'error',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
        });
      }
    }).catch(swal.noop);
  }

  gdChanged() {
    if (this.form.controls.section) this.form.controls.section.reset();// = undefined;
    if (this.form.controls.department) this.form.controls.department.reset();// = undefined;
  }
  departmentChanged() {
    if (this.form.controls.section) this.form.controls.section.reset();// = undefined;

  }


  //FIXME
  setSectionValue() {
  /*  let id = this.systemDomain.sectionId
    this.gdList.forEach(gd => {
      gd.departments.forEach(dep => {
        dep.sections.forEach(sec => {
          if (sec.id == id) {
            this.selectedGd = gd;
            this.selectedDepartment = dep;
            this.selectedSection = sec;
          }
        })
      })
    })*/
  }

  enableEdit() {
    this.viewConfig.editable = !this.viewConfig.editable;
  }

  ngOnDestroy() {
    this.api.setSystemDomain(null);
  }
}
