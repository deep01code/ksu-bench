import { VednorApisService } from './../../../services/Vendor/VednorApis.service';
import swal from 'sweetalert2';
import { Vendor } from './../../../classes/vendor';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-VendorMainView',
  templateUrl: './VendorMainView.component.html',
  styleUrls: ['./VendorMainView.component.scss'],
})
export class VendorMainViewComponent implements OnInit {

  vendors: Vendor[] = null;
  fileToUpload: File | null = null;
  isLoading=false;
  constructor(private api: VednorApisService, private route: Router) {
    this.api.getAllVendors().subscribe((res) => {
      this.vendors = res;
    }, (err) => {
      swal({
        type: 'error',
        title: 'Error!',
        text: 'Not able to fetch vendors, please contact admin team.',
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false
      });
    })
  }

  ngOnInit() {
  }
  getVendorDetails(vendor) {
    this.api.setVendor(vendor);
    this.route.navigate(["/pst/vendor/" + vendor.id]);
  }

  deleteVendor(vendor: Vendor) {
    let self = this;
    swal({
      title: 'Enter Vendor End Date',
      html: '<div class="form-group">' +
        '<input id="endDate" type="date" class="form-control" />' +
        '</div>',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(function (result) {
      let endDate = $('#endDate').val();
      vendor.endDate = endDate;
      self.api.deleteVendor(vendor).subscribe((res) => {
        swal({
          type: 'success',
          html: 'Vendor: <strong>' +
            vendor.name +
            '</strong> has been ended successfuly!',
          confirmButtonClass: 'btn btn-success',
          buttonsStyling: false

        });
      }, (err) => {

      });

    }).catch(swal.noop);
  }

  addVendor(){
    this.route.navigate(["/pst/vendor/new"])
  }



  downloadVendorUploadTemplate(){
    this.api.downloadVendorUploadTemplate().subscribe(()=>{},()=>{},()=>{});
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.isLoading=true;
    this.api.postFile(this.fileToUpload).subscribe(data => {
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
