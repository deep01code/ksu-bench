import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { VendorContact } from 'app/PST/classes/vendor-contact';

@Component({
  selector: 'app-VendorContactForm',
  templateUrl: './VendorContactForm.component.html',
  styleUrls: ['./VendorContactForm.component.scss']
})
export class VendorContactFormComponent implements OnInit {
  @Input() inContact: VendorContact[];
  @Input() editable: boolean = false;
  @Input() isNew: boolean = false;
  newContact: VendorContact = null;

  @Output() contact = new EventEmitter();

  constructor() { 
  }

  ngOnInit() {
  }


  addContact(){
    if(this.newContact!==null){
      this.newContact = null;
    }else{
      this.newContact = new VendorContact();
    }
  }

  addNewContact(){
    this.inContact.push(this.newContact);
    this.newContact = null;
  }
}
