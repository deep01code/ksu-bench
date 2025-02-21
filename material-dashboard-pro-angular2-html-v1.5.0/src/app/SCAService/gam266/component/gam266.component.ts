import {Component, OnChanges, OnInit} from '@angular/core';
import {AppUpdate} from '../classes/app-update';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {WizardService} from '../../wizard/wizard.service';
import {ScDetails} from '../../commonClasses/sc-details';


@Component({
  selector: 'app-gam266',
  templateUrl: './gam266.component.html',
  styleUrls: ['./gam266.component.scss']
})
export class Gam266Component implements OnInit {

    formGroup:FormGroup;
    appUpdate = new AppUpdate();
    public scDetails: ScDetails = {
        listName: 'appUpdate',
        data: this.appUpdate,
        isValid: function(){
            alert("Please fill all required fields2222");
            return false;
        },
        fileName: 'App Update',
        isCompleted: false
    };

    // arabics = [{value:''}];
    // englishes = [{value:''}];

  constructor(private _formBuilder: FormBuilder,private wizService:WizardService) {
      this.wizService.updateSCDetailsMethod(this.scDetails);
  }

  ngOnInit() {
      this.formGroup = this._formBuilder.group({
          typeControl: ['', Validators.required],
          idControl: ['', Validators.required],
          arabicControl: ['', Validators.required],
          englishControl: ['', Validators.required],

      });
  }


  validate(form){
      if(form.invalid){
          this.scDetails.isCompleted = false;
          this.scDetails.isValid = function () {
              alert("Please fill all required fields");
              return false;
          }
      }else {
          this.scDetails.isCompleted = true;
          this.scDetails.isValid = function () {
              return true;
          }
      }
  }
    onSubmit(form: NgForm) {
    }


    // addArabic(){
  //     this.arabics.push({value:''});
  // }
  //
  // addEnglish(){
  //     this.englishes.push({value:''});
  // }
  //
  // deleteArabic(index:number){
  //     this.arabics.splice(index,1);
  // }
  //
  //   deleteEnglish(index:number){
  //       this.englishes.splice(index,1);
  //   }

}
