import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-responsible-form',
  templateUrl: './responsible-form.component.html',
  styleUrls: ['./responsible-form.component.scss']
})
export class ResponsibleFormComponent implements OnInit {


    @Input('inputResponsible') inputResponsible:any;
    @Output('outputResponsible') outputResponsible = new EventEmitter<any>();
    responsibleForm = new FormGroup({
        type:new FormControl('',[Validators.required]),
        name:new FormControl('',[Validators.required]),
        number:new FormControl('',[Validators.required]),
        email:new FormControl('',[Validators.required,Validators.email]),
    });

  constructor() { }

  ngOnInit() {
      if (this.inputResponsible==null){
          this.inputResponsible = {type:null,name:null,number:null,email:null}
      }
  }

    submitResponsible(responsible){
      console.log(responsible);
      this.outputResponsible.emit(responsible);

  }

}
