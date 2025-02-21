import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import {EmployeeService} from "../../services/Employee/employee.service";

@Component({
  selector: 'app-site-update',
  templateUrl: './site-update.component.html',
  styleUrls: ['./site-update.component.scss']
})
export class SiteUpdateComponent implements OnInit {

  isLoading:boolean=false;
  fileToUpload: File | null = null;
  constructor( public empApi: EmployeeService,) { }

  ngOnInit() {
  }


  downloadSiteUploadTemplate(){
    this.empApi.downloadSiteUploadTemplate().subscribe(()=>{},()=>{},()=>{});
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.isLoading=true;
    this.empApi.postBulkUpdateSiteFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      this.isLoading=false;
      window.location.reload();
    }, error => {
      this.isLoading=false;
      swal({
        title: 'Error!',
        text: 'Some Vendor records was not updated, please check log page',
        type: 'error',
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false
      });
      console.log(error);
    });
  }
}
