import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Gam394Service} from '../gam394.service';
import {JiraSharedService} from '../../sharedService/jira-shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gam394',
  templateUrl: './gam394.component.html',
  styleUrls: ['./gam394.component.scss'],
  providers: [Gam394Service]
})
export class Gam394Component implements OnInit {

  constructor(private api: Gam394Service,
              private shared: JiraSharedService,
              private router: Router) { }
  public crForm = new FormGroup({
      "systemName": new FormControl( "TAWASOL"),
      "crName": new FormControl(null, Validators.required),
      "crDescription": new FormControl(null, Validators.required),
      "crBenefits": new FormControl(null, Validators.required),
      "crStream": new FormControl(null, Validators.required),
      "crType": new FormControl("NORMAL"),
      "priority": new FormControl(null),
      "businessImpact": new FormControl(null),
      "customerImpact": new FormControl(null),
      "securityImpact": new FormControl(null),
      "businessCritical": new FormControl(null),
      "businessUnit": new FormControl(null, Validators.required),
      "businessSubUnit": new FormControl(null),
      "jiraBuNo": new FormControl(null),
      "jiraCrNo": new FormControl(null),
      "jiraTaskNo": new FormControl(null),
      "req": new FormControl(null, Validators.required),
      "reqEmail": new FormControl(null, Validators.required),
      "reqPhoneNo": new FormControl(null, Validators.required),
      "own": new FormControl(null),
      "ownEmail": new FormControl(null),
      "ownPhoneNo": new FormControl(null),
      "secOwn": new FormControl(null),
      "secOwnEmail": new FormControl(null),
      "secOwnPhoneNo": new FormControl(null)
  });
  public isLoading = false;
  public jiraBuNo='';
  public jiraCrNo='';
  public jiraTaskNo=[];
  public businessUnit='';
  public selectedCR  = null;
  hasJiraNumber(form: FormGroup):{[key: string]: boolean} {
      if(!form.get("JIRA_BU_NO").value && !form.get("JIRA_BU_NO").value && !form.get("JIRA_BU_NO").value){
          return {'noJiraNumber': true};
      }
      return null;
  }

  ngOnInit() {
      this.selectedCR = this.shared.getSelectedCR();
      if(this.selectedCR) {
          this.jiraBuNo = this.selectedCR.bu?this.selectedCR.bu:null
          this.jiraCrNo = this.selectedCR.cr?this.selectedCR.cr:null
          this.jiraTaskNo = this.selectedCR.tawasol?this.selectedCR.tawasol:null
          this.crForm.controls['jiraTaskNo'].setValue(this.jiraTaskNo);
      }
  }

  public submit(){
      if(this.crForm.valid) {
          let obj = Object.assign({}, this.crForm.value);
          let taskNombers = [];
          for (let taskNo of obj.jiraTaskNo) {
              taskNombers.push(taskNo.value.toUpperCase())
          }
          obj.jiraTaskNo = taskNombers;
          this.isLoading = true;
          this.api.postChangeRequest(obj)
              .subscribe((res)=>{
                      this.isLoading = false;
                      console.log("Success")
                      console.log(res)
              },
                  (err)=>{
                      this.isLoading = false;
                      console.log("Error")
                      console.log(err)
                  })
      }
      this.router.navigate(["jiraService/crs"]);
  }

  public prefix = ["RBM-", "CRMG-", "BEAI-", "OM-", "NSM-", "ULA-"];
  public add(e){
      let str = e.value.toUpperCase().match(".*[-]");
      str = str?str[0]:0;

      for(let pre of this.prefix){
          if( e.value.toUpperCase().includes(pre.toUpperCase()) && !this.hasSameSystem(str) ){
              console.log("HALA")
              return;
          }
      }
      if(this.hasSameSystem(str)){
          alert("Cannot add two Jira Task ID with the same prefix");
      }else {
          alert("Jira Task should be prefixed with: \n" + this.prefix.join())
      }
      this.jiraTaskNo.splice(this.jiraTaskNo.length-1, 1)
  }

  hasSameSystem(str){
      for(let system of this.jiraTaskNo){
          if(str !== 0 && system.value.toUpperCase().includes(str.toUpperCase()) && this.jiraTaskNo.indexOf(system) !== this.jiraTaskNo.length-1 ){
              return true;
          }
      }
  }
}
