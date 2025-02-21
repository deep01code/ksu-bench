import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.scss']
})
export class ProgramDetailsComponent implements OnInit {

    budgets=[];
    budgetsDataSource = new MatTableDataSource(this.budgets);
    budgetColumns = ['Original','Current','start date','end date'];

    departments=[];
    departmentsDataSource = new MatTableDataSource(this.departments);
    departmentColumns = ['Name'];

    constructor() { }

  ngOnInit() {
  }

}
