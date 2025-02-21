import {Component, Inject, OnInit} from '@angular/core';
import {LoVService} from "../../../PST/services/LoV/LoVService";
import {LovDTO, LovType} from "../../../PST/classes/lovDTO";
import swal from 'sweetalert2';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {Benefit, Employee} from "../../../PST/classes/employee";
import {EmployeeService} from "../../../PST/services/Employee/employee.service";
@Component({
  selector: 'app-lov',
  templateUrl: './lov.component.html',
  styleUrls: ['./lov.component.scss']
})
export class LovComponent implements OnInit {

//  lovTypesList:LovType[]=[LovType.LEVEL,LovType.DOMAIN,LovType.JOBNAME,LovType.JOBCATEGORY,LovType.NATIONALITY];
  lovTypesList:LovType[]=[LovType.NATIONALITY];
  selectedLovType:LovType=LovType.NATIONALITY;

  /*jobNames=[];
  levels=[];
  jobCategories=[];
  domains=[];
  nationalityies=[];
*/
  values=[];
  public isLoading: boolean = false;
  constructor( public dialog: MatDialog,
              public LovApi: LoVService,
              ) {



    this.onSelectLoVType(this.selectedLovType);



  }

  ngOnInit() {
  }

  onSelectLoVType(value:LovType){
    this.isLoading=true;
    switch (value){
      case LovType.LEVEL:{this.LovApi.getLevels().subscribe((res)=>{this.values=res;},()=>{},()=>{this.isLoading=false;})} break;
      case LovType.DOMAIN:{this.LovApi.getDomains().subscribe((res)=>{ this.values=res;    } ,()=>{},()=>{this.isLoading=false;})}  break;
      case LovType.JOBNAME:{this.LovApi.getJobNames().subscribe((res)=>{ this.values=res} ,()=>{},()=>{this.isLoading=false;})} break;
      case LovType.JOBCATEGORY:{this.LovApi.getJobCategories().subscribe((res)=>{this.values=res;} ,()=>{},()=>{this.isLoading=false;})} break;
      case LovType.NATIONALITY:{this.LovApi.getNationalities().subscribe( (res)=>{this.values=res;} ,()=>{},()=>{this.isLoading=false;})} break;

    }
  }

  deleteValue(value: any,type:LovType) {
    let self=this;
    swal({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this value ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Delete Value !',
      buttonsStyling: false
    }).then(function () {

      try{
        let dto=new LovDTO();
        dto.value=value;
        dto.lovType=type;
        self.LovApi.removeLovFunction(dto).subscribe(
            (res)=>{
              console.log('success '+JSON.stringify(res))
              swal({
              title: 'Success ',
              text: 'Value Deleted Successfully',
              type: 'success',
              confirmButtonClass: 'btn btn-success',
              buttonsStyling: false
            });},
            (res)=>{
              console.log('error '+JSON.stringify(res))
              swal({
              title: 'Error!',
              text: 'Error! not able to Delete Value',
              type: 'error',
              confirmButtonClass: 'btn btn-success',
              buttonsStyling: false
            });},
            ()=>{
              self.onSelectLoVType(self.selectedLovType);
            }
        )

      }catch (err){
        console.log(err)
      }

    }).catch(swal.noop);
  }

  addType(value:any,type:LovType){}

  openAddBenefitDialog() {
    let dto=new LovDTO();

    dto.lovType=this.selectedLovType;
    let dialogRef = this.dialog.open(AddValue, {
      width: '60%',
      data: {dto:dto, ref:this}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }



}


@Component({
  selector: 'add-value',
  templateUrl: 'add-value.html',
})

export class AddValue{

  dto:LovDTO=new LovDTO();
  tempValue:string;
  constructor(public dialogRef: MatDialogRef<AddValue>,
              public lovApi:LoVService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dto=this.data.dto;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addValue(){
    let lovDTO:LovDTO=new LovDTO();
    lovDTO.lovType=this.dto.lovType;
    lovDTO.value=this.tempValue;

    this.lovApi.addLovFunction(lovDTO).subscribe(
        (res)=>{
          this.data.ref.onSelectLoVType(this.data.ref.selectedLovType);
          swal({
            title: 'Success ',
            text: 'Value Added Successfully',
            type: 'success',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
        },
        (res)=>{
          swal({
            title: 'Error!',
            text: 'Error! not able to Add Value',
            type: 'error',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
        },
        ()=>{},
    )

  }



}
