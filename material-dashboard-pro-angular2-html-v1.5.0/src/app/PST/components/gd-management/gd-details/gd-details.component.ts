import { log } from 'util';
import { GeneralDepartment, Section } from './../../../classes/GeneralDepartment';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import swal from 'sweetalert2';
import { concat } from 'rxjs/observable/concat';

@Component({
  selector: 'app-gd-details',
  templateUrl: './gd-details.component.html',
  styleUrls: ['./gd-details.component.scss']
})
export class GdDetailsComponent implements OnInit {
  @Input()
  generalDepartment: { gd: GeneralDepartment, index: number };
  @Output() gdUpdated = new EventEmitter();
  newSection: Section = null;
  newDepartment: {id: number, departmentNumber: number, departmentEnglishName: String, departmentArabicName: String, sections: any[] } = null;
  isLoading: boolean = false;
  selectedDep = 0; 

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
  }


  addNewSection(j) {
    if (this.validSection(this.generalDepartment.gd.departments[j], this.newSection)) {
      this.generalDepartment.gd.departments[j].sections.push(this.newSection)
      this.gdUpdated.emit(this.generalDepartment);
    }
    else {
      alert("section name is already exist or empty")
    }
    this.newSection = null;
  }

  addSection(j) {
    if(this.newSection == null){
      this.newSection = new Section();
    } else{
      this.newSection = null;
    }
  }

  validSection(department, value) {
    for (let section of department.sections) {
      if (section.sectionEnglishName.replaceAll(" ", "") === value.sectionEnglishName.replaceAll(" ", "")
        || value.sectionEnglishName.replaceAll(" ", "") === "") {
        return false;
      }
    }
    return true;
  }




  addDepartment() {
    if(this.newDepartment == null){
          this.newDepartment = {id: null, departmentNumber: null, departmentEnglishName: "", departmentArabicName: "",  sections: [] };
    } else{
      this.newDepartment = null;
    }
  }

  addNewDepartment() {
    if (this.validDepartment(this.newDepartment)) {
      this.generalDepartment.gd.departments.push(this.newDepartment);
      this.newDepartment = null;
    }
  }

  validDepartment(newDep) {
    for (let department of this.generalDepartment.gd.departments) {
      if (!newDep.departmentEnglishName || newDep.departmentEnglishName.replaceAll(" ", "") === department.departmentEnglishName.replace(/\s/g, "")
        || newDep.departmentEnglishName.replaceAll(" ", "") === "") {
        return false;
      }
    }
    return true;
  }

  setSelectedDep(j){
    this.selectedDep = j
  }

  enableEdit(i, j){
    if(!this.generalDepartment.gd.departments[i].sections[j]["editable"]){
    this.generalDepartment.gd.departments[i].sections[j]["editable"] = true;
    }else{
      this.generalDepartment.gd.departments[i].sections[j]["editable"] = false;
    }
  }


  enableDepartmentEdit(i){
    
    if(!this.generalDepartment.gd.departments[i]["editable"]){
      this.generalDepartment.gd.departments[i]["editable"] = true;
      }else{
        this.generalDepartment.gd.departments[i]["editable"] = false;
      }
  }
}
