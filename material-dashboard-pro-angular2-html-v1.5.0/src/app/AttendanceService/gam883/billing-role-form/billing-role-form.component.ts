import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-billing-role-form',
  templateUrl: './billing-role-form.component.html',
  styleUrls: ['./billing-role-form.component.scss']
})
export class BillingRoleFormComponent implements OnInit {

    @Input('inputRole') inputRole:any;
    @Output('outputRole') outputRole = new EventEmitter<any>();

    billingRoleForm = new FormGroup({
        roleName:new FormControl('',[Validators.required]),
        rate:new FormControl('',[Validators.required]),
        priority:new FormControl('',[Validators.required])
    });
  constructor() { }

  ngOnInit() {
      if (this.inputRole==null){
          this.inputRole = {roleName:null,rate:null,priority:null}
      }
  }

  submitBillingRole(billingRole){
        console.log(billingRole);
        this.outputRole.emit(billingRole);
  }

}
