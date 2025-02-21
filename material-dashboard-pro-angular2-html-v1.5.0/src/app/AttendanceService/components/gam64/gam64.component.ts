import { Component, OnInit } from '@angular/core';
import { Attendance } from '../../classes/gam64/attendance';
import { Gam64Service } from '../../services/gam64/gam64.service';


@Component({
  selector: 'app-gam64',
  templateUrl: './gam64.component.html',
  styleUrls: ['./gam64.component.scss']
})
export class Gam64Component implements OnInit {

  
  attendees:Attendance[];
  isLoading :boolean = false;
  constructor(private api: Gam64Service  ) { }

  ngOnInit() {
  }

    dates = [
      {value: '01/2017', viewValue: 'Jan - 2017'},
      {value: '02/2017', viewValue: 'Feb - 2017'},
      {value: '03/2017', viewValue: 'Mar - 2017'},
      {value: '04/2017', viewValue: 'Apr - 2017'},
      {value: '05/2017', viewValue: 'May - 2017'},
      {value: '06/2017', viewValue: 'Jun - 2017'},
      {value: '07/2017', viewValue: 'Jul - 2017'},
      {value: '08/2017', viewValue: 'Aug - 2017'},
      {value: '09/2017', viewValue: 'Sep - 2017'},
      {value: '10/2017', viewValue: 'Oct - 2017'},
      {value: '11/2017', viewValue: 'Nov - 2017'},
      {value: '12/2017', viewValue: 'Dec - 2018'},
      {value: '01/2018', viewValue: 'Jan - 2018'},
      {value: '02/2018', viewValue: 'Feb - 2018'},
      {value: '03/2018', viewValue: 'Mar - 2018'},
      {value: '04/2018', viewValue: 'Apr - 2018'},
      {value: '05/2018', viewValue: 'May - 2018'},
      {value: '06/2018', viewValue: 'Jun - 2018'},
      {value: '07/2018', viewValue: 'Jul - 2018'},
      {value: '08/2018', viewValue: 'Aug - 2018'},
      {value: '09/2018', viewValue: 'Sep - 2018'},
      {value: '10/2018', viewValue: 'Oct - 2018'},
      {value: '11/2018', viewValue: 'Nov - 2018'},
      {value: '12/2018', viewValue: 'Dec - 2018'},
    ]
    
    
    getCountOfEmpOnsiteOffshore(selectedDate): void {
        this.isLoading = true;
        this.api.getCountOfEmpOnsiteOffshore(selectedDate)
                .subscribe((data)=>{
                        this.attendees=data;
                        this.isLoading = false;
                },
                    (error)=>{
                        this.isLoading = false;
                    });
    }
    
    
    select(selectedDate): void {
        const selected = 'select';
        this.getCountOfEmpOnsiteOffshore(selectedDate)
    }
    
    
}
