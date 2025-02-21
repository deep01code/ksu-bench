import { EmployeeService } from '../../../services/Employee/employee.service';
import { LoVService } from '../../../services/LoV/LoVService';
import { DataTableConfigService } from '../../../../common-services/data-table-config/data-table-config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-CreateEmployee',
  templateUrl: './CreateEmployee.component.html',
  styleUrls: ['./CreateEmployee.component.scss'],
  providers: [LoVService, EmployeeService]
})
export class CreateEmployeeComponent implements OnInit {
  isLoading: boolean = false;
  generalDepartments = [];
  companies = [];

  // selectedGd;
  // selectedDepartment;
  // selectedSection;
  // selectedCompany;


  constructor(private config: DataTableConfigService,
    private route: Router,
    private LovApi: LoVService,
    private empApi: EmployeeService) {
    //get all GDs
    this.LovApi.getGeneralDepartments().subscribe((res) => {
      this.generalDepartments = res;
      //this.selectedGd = res && res[0] ? res[0] : null;
    })
    //get all companies
    this.LovApi.getCompanies().subscribe((res) => {
      this.companies = res;
      console.log(res)
    })
  }



  ngOnInit() {
  }

  gdChanged() {
    if (this.form.controls.section) this.form.controls.section.reset();// = undefined;
    if (this.form.controls.department) this.form.controls.department.reset();// = undefined;
  }
  departmentChanged() {
    if (this.form.controls.section) this.form.controls.section.reset();// = undefined;

  }
  @ViewChild("form") form: NgForm
  public submitForm() {
    let self = this;
    swal({
      title: 'Confirmation',
      text: 'Are you sure you want to create this employee?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Add Employee!',
      buttonsStyling: false
    }).then(function () {

      self.isLoading = true;
      let employee = self.form.value;
      employee.project = {
        projectName: employee.projectName,
        projectNumber: employee.projectNumber
      }
      self.empApi.createEmployee(employee).subscribe(res => {
        self.isLoading = false;
        swal({
          title: 'Done!',
          text: 'An employee has been added successfully',
          type: 'success',
          confirmButtonClass: 'btn btn-success',
          buttonsStyling: false
        });
        self.route.navigate(["pst/viewEmployee"])
      }, (err) => {
        self.isLoading = false;
        swal({
          title: 'Error!',
          text: 'Error! not able to add employee',
          type: 'error',
          confirmButtonClass: 'btn btn-success',
          buttonsStyling: false
        });
      });

    }).catch(swal.noop);
  }

  nationalityies = [
    "Saudi",
    "Algerian",
    "American",
    "Bahraini",
    "Bangladesh",
    "British",
    "Canadian",
    "China",
    "Egyptian",
    "Eritrea",
    "French",
    "German",
    "Greece",
    "Holand",
    "Indian",
    "Indonesia",
    "Italian",
    "Jordanian",
    "Kenyan",
    "Lebanese",
    "Malaysia",
    "Morocco",
    "New Zealand",
    "Nigeria",
    "Pakistani",
    "Palestinian",
    "Peru",
    "Philippines",
    "Portugal",
    "South African",
    "SriLanka",
    "Sudanese",
    "sweden",
    "Syrian",
    "Tunisian",
    "Turkish",
    "Yemeni",
    "Others"
  ]
  levels = [
    "VP secretary",
    "GM secretary",
    "L1 VP",
    "L2 GM",
    "L3 Director",
    "L4 Section Manager",
    "L6 Staff",
    "L7 Smart Office",
  ]
}
