import {Contact, Vendor} from './../../../classes/vendor';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { VendorContact } from 'app/PST/classes/vendor-contact';

@Component({
  selector: 'app-VendorForm',
  templateUrl: './VendorForm.component.html',
  styleUrls: ['./VendorForm.component.scss']
})
export class VendorFormComponent implements OnInit {

  @Input() inVendor: Vendor;
  @Input() editable: boolean;
  @Input() isNew: boolean;
  vendorTypes: String[] = ["Main Contractor", "Subcontractor", "Both"];

  @Output() outVendor = new EventEmitter();
  constructor() {
    if(this.inVendor === null){
      this.inVendor = new Vendor();
      //this.inVendor.contacts = new Array<Contact>();
    }
   }

  ngOnInit() {
  }

}
