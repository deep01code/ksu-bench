import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from "moment";
import {Gam883Service} from '../gam883.service';
import {AlertService} from '../../../services/alert/alert.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.scss']
})
export class BudgetFormComponent implements OnInit {


    @Input('inputBudget')inputBudget:{id:string,original?:number,current:number,startDate:Date,endDate:Date};
    @Output('outputBudget')outputBudget = new EventEmitter<any>();

    response;

    budgetForm = new FormGroup({
        id:new FormControl(''),
        original:new FormControl('',[Validators.required]),
        current:new FormControl('',[Validators.required]),
        startDate:new FormControl('',[Validators.required]),
        endDate:new FormControl('',[Validators.required])
    });
  constructor(private api:Gam883Service,private alert:AlertService) { }

  ngOnInit() {
      if (this.inputBudget == null) {
          this.inputBudget = {id: null, original: null, current: null, startDate: null, endDate: null};
      }
  }

  submitBudget(budget){
        budget.id = this.inputBudget.id;
        if (budget.id!=null){
            this.updateBudget(budget);
        }else {
            this.addBudget(budget);
        }

      if (this.response!=null){
          this.outputBudget.emit(this.response);
          this.response=null;
          return;
      }
  }

  updateBudget(budget){
      let title='Update Budget';
      let text = 'You are about to update this budget, are you sure ?';
      let confirmTitle='Budget Updated';
      let confirmMessage='budget has been updated successfully!';
      this.alert.log(title,text, "Yes",confirmTitle,confirmMessage,()=> {
          this.api.updateBudget(budget).subscribe((res) => {
              console.log(res)
              this.response=res;
          }, (err) => {
              console.log(err);
              this.response=null;
              swal('Error','request failed','error');
          })
      },()=>{})
  }

  addBudget(budget){
      let title='Create Budget';
      let text = 'You are about to create a new budget, are you sure ?';
      let confirmTitle='Budget Created';
      let confirmMessage='budget has been created successfully! (you have to submit the project to link this budget)';
      this.alert.log(title,text, "Yes",confirmTitle,confirmMessage,()=> {
          this.api.updateBudget(budget).subscribe((res) => {
              console.log(res)
              this.response = res;
          }, (err) => {
              console.log(err);
              this.response=null;
              swal('Error','request failed','error');
          })
      },()=>{})
  }

}
