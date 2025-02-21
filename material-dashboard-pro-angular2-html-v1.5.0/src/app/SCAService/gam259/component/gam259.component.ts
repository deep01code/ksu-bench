import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {WizardService} from '../../wizard/wizard.service';
import {ScDetails} from '../../commonClasses/sc-details';

@Component({
  selector: 'app-gam259',
  templateUrl: './gam259.component.html',
  styleUrls: ['./gam259.component.scss']
})



export class Gam259Component implements OnInit {
    @ViewChild("form") form: NgForm;
    constructor(private wizService:WizardService) {
      this.wizService.updateSCDetailsMethod(this.scDetails);
      //this.wizService.newBranchMethod(this.newBranch);
  }

  isSubmitted:boolean=false;
  info = new ScBasicInfo();
  newBranch = new Branch();
  public scDetails: ScDetails = {
        listName: 'newBranch',
        data: this.newBranch,
        isValid: function(){
            alert("Please fill all required fields");
            return false;
        },
        fileName: 'Add_Branch',
      isCompleted: false
  };
    isInputValid(str):boolean {
        if(!this.isSubmitted){
            return false;
        }
        if (str === 'BranchName' ) {
            if (!this.info.BranchName) {
                return true;
            }
        }
        else if (str === 'BranchAddress' ) {
            if (!this.info.BranchAddress) {
                return true;
            } 
        }
        /*
        else if (str === 'requesterName' ) {
            if (this.info.requesterName.length<2) {
                return true;
            }
        }
        else if (str === 'targetedSegs' ) {
            if (!this.info.targetedSegments || this.info.targetedSegments.length==0) {
                    return true;
            }
        }
        */
        else
            return false;
    }


  ngOnInit() {
        //this.scDetails.isValid = this.isValid();
  }
  public validate(){
      if (this.form.invalid){
          this.scDetails.isCompleted = false;
          this.scDetails.isValid = function() {
              alert("Please fill all required fields");
              return false;
          }
      }else {
          this.scDetails.isCompleted = true;
          this.scDetails.isValid = function(){return true;}
      }
  }

    opens = [
      {value: '00:00', viewValue: '00:00'},
      {value: '00:30', viewValue: '00:30'},
      {value: '01:00', viewValue: '01:00'},
      {value: '01:30', viewValue: '01:30'},
      {value: '02:00', viewValue: '02:00'},
      {value: '02:30', viewValue: '02:30'},
      {value: '03:00', viewValue: '03:00'},
      {value: '03:30', viewValue: '03:30'},
      {value: '04:00', viewValue: '04:00'},
      {value: '04:30', viewValue: '04:30'},
      {value: '05:00', viewValue: '05:00'},
      {value: '05:30', viewValue: '05:30'},
      {value: '06:00', viewValue: '06:00'},
      {value: '06:30', viewValue: '06:30'},
      {value: '07:00', viewValue: '07:00'},
      {value: '07:30', viewValue: '07:30'},
      {value: '08:00', viewValue: '08:00'},
      {value: '08:30', viewValue: '08:30'},
      {value: '09:00', viewValue: '09:00'},
      {value: '09:30', viewValue: '09:30'},
      {value: '10:00', viewValue: '10:00'},
      {value: '10:30', viewValue: '10:30'},
      {value: '11:00', viewValue: '11:00'},
      {value: '11:30', viewValue: '11:30'},
      {value: '12:00', viewValue: '12:00'},
      {value: '12:30', viewValue: '12:30'},
      {value: '13:00', viewValue: '13:00'},
      {value: '13:30', viewValue: '13:30'},
      {value: '14:00', viewValue: '14:00'},
      {value: '14:30', viewValue: '14:30'},
      {value: '15:00', viewValue: '15:00'},
      {value: '15:30', viewValue: '15:30'},
      {value: '16:00', viewValue: '16:00'},
      {value: '16:30', viewValue: '16:30'},
      {value: '17:00', viewValue: '17:00'},
      {value: '17:30', viewValue: '17:30'},
      {value: '18:00', viewValue: '18:00'},
      {value: '18:30', viewValue: '18:30'},
      {value: '19:00', viewValue: '19:00'},
      {value: '19:30', viewValue: '19:30'},
      {value: '20:00', viewValue: '20:00'},
      {value: '20:30', viewValue: '20:30'},
      {value: '21:00', viewValue: '21:00'},
      {value: '21:30', viewValue: '21:30'},
      {value: '22:00', viewValue: '22:00'},
      {value: '22:30', viewValue: '22:30'},
      {value: '23:00', viewValue: '23:00'},
      {value: '23:30', viewValue: '23:30'},
    ];

    closes = [
      {value: '00:00', viewValue: '00:00'},
      {value: '00:30', viewValue: '00:30'},
      {value: '01:00', viewValue: '01:00'},
      {value: '01:30', viewValue: '01:30'},
      {value: '02:00', viewValue: '02:00'},
      {value: '02:30', viewValue: '02:30'},
      {value: '03:00', viewValue: '03:00'},
      {value: '03:30', viewValue: '03:30'},
      {value: '04:00', viewValue: '04:00'},
      {value: '04:30', viewValue: '04:30'},
      {value: '05:00', viewValue: '05:00'},
      {value: '05:30', viewValue: '05:30'},
      {value: '06:00', viewValue: '06:00'},
      {value: '06:30', viewValue: '06:30'},
      {value: '07:00', viewValue: '07:00'},
      {value: '07:30', viewValue: '07:30'},
      {value: '08:00', viewValue: '08:00'},
      {value: '08:30', viewValue: '08:30'},
      {value: '09:00', viewValue: '09:00'},
      {value: '09:30', viewValue: '09:30'},
      {value: '10:00', viewValue: '10:00'},
      {value: '10:30', viewValue: '10:30'},
      {value: '11:00', viewValue: '11:00'},
      {value: '11:30', viewValue: '11:30'},
      {value: '12:00', viewValue: '12:00'},
      {value: '12:30', viewValue: '12:30'},
      {value: '13:00', viewValue: '13:00'},
      {value: '13:30', viewValue: '13:30'},
      {value: '14:00', viewValue: '14:00'},
      {value: '14:30', viewValue: '14:30'},
      {value: '15:00', viewValue: '15:00'},
      {value: '15:30', viewValue: '15:30'},
      {value: '16:00', viewValue: '16:00'},
      {value: '16:30', viewValue: '16:30'},
      {value: '17:00', viewValue: '17:00'},
      {value: '17:30', viewValue: '17:30'},
      {value: '18:00', viewValue: '18:00'},
      {value: '18:30', viewValue: '18:30'},
      {value: '19:00', viewValue: '19:00'},
      {value: '19:30', viewValue: '19:30'},
      {value: '20:00', viewValue: '20:00'},
      {value: '20:30', viewValue: '20:30'},
      {value: '21:00', viewValue: '21:00'},
      {value: '21:30', viewValue: '21:30'},
      {value: '22:00', viewValue: '22:00'},
      {value: '22:30', viewValue: '22:30'},
      {value: '23:00', viewValue: '23:00'},
      {value: '23:30', viewValue: '23:30'},
    ];

    submit(){
    }
}

export class Branch{
    name:string;
    address:string;
    phone:string;
    open:string;
    close:string;

    isValid(){

    }

    isPhoneValid(phone:string):boolean{
        let regexp = new RegExp('[0-9]{9}');
        return regexp.test(phone);
    }
}

export class ScBasicInfo  {
      BranchName:string;
      BranchAddress:string;
      targetedSegments:string= ' ';
  }

