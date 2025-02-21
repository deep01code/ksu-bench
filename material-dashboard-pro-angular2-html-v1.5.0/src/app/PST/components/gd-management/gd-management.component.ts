import { GeneralDepartment } from './../../classes/GeneralDepartment';
import { forEach } from '@angular/router/src/utils/collection';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { trim } from 'jquery';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-gd-management',
  templateUrl: './gd-management.component.html',
  styleUrls: ['./gd-management.component.scss']
})
export class GdManagementComponent implements OnInit {
  public SERVER_URL: string = environment.serverUrl;
  generalDepartments: GeneralDepartment[];
  selectedGd: { gd: GeneralDepartment, index: number } = null;
  newGd: GeneralDepartment = null;
  listOfNewSections: any[][];
  isLoading: boolean = false;
  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.http.get<GeneralDepartment[]>(this.SERVER_URL+"/hierarchies").subscribe((res) => {
      this.generalDepartments = res;
    })
  }

  ngOnInit() {
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
      confirmButtonText: 'Add Employee!',
      buttonsStyling: false
    }).then(function () {
      self.isLoading = true;
      self.http.post<GeneralDepartment[]>(this.SERVER_URL+"/hierarchies", self.generalDepartments).subscribe((res) => {
        self.generalDepartments = res;
        self.isLoading = false;
        self.selectedGd = null;
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
        if(err.status==409){
          errorMessage = "Error! Please make sure you have entered unique values";
        }

        swal({
          title: 'Error!',
          text: errorMessage,
          type: 'error',
          confirmButtonClass: 'btn btn-success',
          buttonsStyling: false
        });
      });

    }).catch(swal.noop);
  }

  updateGd(gd) {
    this.generalDepartments[gd.index] = gd.gd;
  }

  addGeneralDepartment() {
    if (!this.newGd) {
      this.newGd = new GeneralDepartment();
      this.newGd.departments = [];
    }else{
      this.newGd = null;
    }

  }

  addNewGeneralDepartment() {
    if (this.validGd(this.newGd)) {
      this.generalDepartments.push(this.newGd);
      this.newGd = null;
    }
  }

  validGd(newGd) {
    for (let gd of this.generalDepartments) {
      if (!newGd.gdEnName || newGd.gdEnName.replaceAll(" ", "") === gd.gdEnName.replace(/\s/g, "")
        || newGd.gdEnName.replaceAll(" ", "") === "") {
        return false;
      }
    }
    return true;
  }


  selectGd(index) {
    this.selectedGd = { gd: this.generalDepartments[index], index: index };
  }
  deselectGd() {
    this.selectedGd = null;
  }


  enableEdit(i, j) {
    if (!this.generalDepartments[i]["editable"]) {
      this.generalDepartments[i]["editable"] = true;
    } else {
      this.generalDepartments[i]["editable"] = false;
    }
  }


  openDialog(i): void {
    let dialogRef = this.dialog.open(EditGeneralDepartment, {
      width: '60%',
      data: this.generalDepartments[i]
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}



@Component({
  selector: 'edit-gd-dialog',
  templateUrl: 'edit-gd-dialog.html',
})
export class EditGeneralDepartment {
  selectedDep = null;
  constructor(
    public dialogRef: MatDialogRef<EditGeneralDepartment>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  setSelectedDep(j) {
    this.selectedDep = j
  }
}
