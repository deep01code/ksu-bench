import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher,MatPaginator, MatTableDataSource} from '@angular/material';
import * as moment from 'moment';
import {ReleaseManagementService} from '../release-management.service';
import swal from 'sweetalert2';
import {AlertService} from '../../services/alert/alert.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
@Component({
  selector: 'app-release-form',
  templateUrl: './release-form.component.html',
  styleUrls: ['./release-form.component.scss']
})

export class ReleaseFormComponent implements OnInit {

    isLoading:boolean = false;
    releases=[];
    releasesDataSource=new MatTableDataSource(this.releases);
    releasesColumns= ['Release No.','HLD Approval Date','Dev Weeks','Test Weeks'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    isNew:boolean=true;
    selectedRowReleaseNumber;

    releaseForm = new FormGroup({
        releaseNumber:new FormControl('',[Validators.required]),
        hldApprovalDate: new FormControl('',[Validators.required]),
        developmentStartDate:new FormControl({value:'', disabled: true},[Validators.required]),
        developmentEndDate:new FormControl({value:'', disabled: true},[Validators.required]),
        externalSystemReadinessDate:new FormControl({value:'', disabled: true},[Validators.required]),
        testingStartDate:new FormControl({value:'', disabled: true},[Validators.required]),
        testingEndDate:new FormControl({value:'', disabled: true},[Validators.required]),
        productionDeploymentDate:new FormControl({value:'', disabled: true},[Validators.required]),
        developmentWeeks:new FormControl('',[Validators.required]),
        testWeeks:new FormControl('',[Validators.required])
    });
    devStartDate;
    devEndDate;
    externalReadiness;
    testingStartDate;
    testingEndDate;
    productionDate;
    hldApproval;


    matcher = new MyErrorStateMatcher();


    constructor(private api:ReleaseManagementService,private alert:AlertService,private cd:ChangeDetectorRef) { }

  ngOnInit() {
      this.getReleases();
      this.cd.detectChanges();
  }

  addRelease(release){
      this.calculateFields();
      const requestObject = this.buildReleaseRequestObject(release);
      if (!this.isNew){
          this.calculateFields();
          this.updateRelease(this.buildReleaseRequestObject(release));
          return;
      }
          this.alert.log("Create a new Release","You are about to create a new release, are you sure ?", "Yes","Release Created","release has been created successfully",()=>{
          this.isLoading = true;
          this.api.addRelease(requestObject).subscribe((result)=>{
              this.getReleases();
              this.isLoading = false;

          },(err)=>{
              this.isLoading = false;
              swal('Error','','error');
          })
      },()=>{

      })
  }

  calculateFields(){
        const values = this.releaseForm.value;
        let relNo = values.releaseNumber;
        if (!this.isNew){
            relNo = this.selectedRowReleaseNumber;
        }
        if (relNo &&
            values.hldApprovalDate &&
            values.developmentWeeks &&
            values.testWeeks){
            this.devStartDate = moment(values.hldApprovalDate).add(3,'days').format('l');
            this.devEndDate = moment(this.devStartDate).add(values.developmentWeeks*7,'days').format('l');
            this.externalReadiness = moment(this.devEndDate).add(2,'days').format('l');
            this.testingStartDate = this.externalReadiness;
            this.testingEndDate = moment(this.testingStartDate).add(values.testWeeks*7,'days').format('l');
            this.productionDate = moment(this.testingEndDate).add(7,'days').format('l');
        }

  }

  checkOtherRequiredFieldsAreValid():boolean{
        if (!this.releaseForm.valid){
            return false;
        }

        if (this.devStartDate &&
            this.devEndDate &&
            this.externalReadiness &&
            this.testingStartDate &&
            this.testingEndDate &&
            this.productionDate ){
                  return true
            }

        return false;
  }

  getReleases(){
      this.isLoading = true;
      this.api.getReleases().subscribe((result)=>{
                this.releases = result;
                this.releasesDataSource = new MatTableDataSource(this.releases);
                setTimeout(() => this.releasesDataSource.paginator = this.paginator);
                this.cd.detectChanges();
                this.isLoading = false;
          },
            (err) =>{
                var message = 'error';
                swal( 'Error', '','error');
                this.isLoading = false;
            })
  }

  updateRelease(requestObject){
      this.alert.log("Update Release","You are about to update this release, are you sure ?", "Yes","Release updated","release has been updated successfully",()=>{
          this.isLoading = true;
          this.api.updateRelease(requestObject).subscribe((result)=>{
              this.isNew = true;
              this.selectedRowReleaseNumber = '';
              this.releaseForm.reset();
              this.isLoading = false;

          },(err)=>{
              this.isLoading = false;
              swal('Error','','error');
          })
      },()=>{

      })
  }


  fillFormToUpdate(row){
        if(this.isNew){
            return;
        }
      this.selectedRowReleaseNumber = row.releaseNumber;
      this.releaseForm.get('releaseNumber').setValue(row.releaseNumber);
      this.releaseForm.get('hldApprovalDate').setValue(moment(row.hldApprovalDate));
      this.hldApproval = moment(row.hldApprovalDate);
      this.releaseForm.get('developmentWeeks').setValue(row.developmentWeeks);
      this.releaseForm.get('testWeeks').setValue(row.testWeeks);
      this.devStartDate=row.developmentStartDate;
      this.devEndDate=row.developmentEndDate;
      this.externalReadiness=row.externalSystemReadinessDate;
      this.testingStartDate=row.testingStartDate;
      this.testingEndDate=row.testingEndDate;
      this.productionDate=row.productionDeploymentDate;
      this.cd.detectChanges();
  }

    toggleChange(){
        this.isNew = (!this.isNew);
        this.releaseForm.reset();
        if(!this.isNew){
            this.releaseForm.get('releaseNumber').disable();
        }else {
            this.releaseForm.get('releaseNumber').enable();
            this.selectedRowReleaseNumber = '';
        }
    }

    buildReleaseRequestObject(release):any{
        let relNo = release.releaseNumber;
        if(!this.isNew){
            relNo = this.selectedRowReleaseNumber;
        }

        return {
            releaseNumber:relNo,
                hldApprovalDate:moment(release.hldApprovalDate).format('l'),
            developmentWeeks:release.developmentWeeks,
            testWeeks:release.testWeeks,
            developmentStartDate:this.devStartDate,
            developmentEndDate:this.devEndDate,
            externalSystemReadinessDate:this.externalReadiness,
            testingStartDate:this.testingStartDate,
            testingEndDate:this.testingEndDate,
            productionDeploymentDate:this.productionDate
        }
    }

}
