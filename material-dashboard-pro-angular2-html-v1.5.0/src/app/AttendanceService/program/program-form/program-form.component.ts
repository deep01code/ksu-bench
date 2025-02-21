import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Gam883Service} from '../../gam883/gam883.service';
import {AlertService} from '../../../services/alert/alert.service';
import swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

@Component({
    selector: 'app-program-form',
    templateUrl: './program-form.component.html',
    styleUrls: ['./program-form.component.scss']
})
export class ProgramFormComponent implements OnInit {

    programs=[];
    programsDataSource = new MatTableDataSource(this.programs);
    programsColumns = ['Name'];

    programForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        locationBasedCosts: new FormControl('', [Validators.required])
    });

    constructor(private api: Gam883Service, private alert: AlertService,private router:Router) {
    }

    ngOnInit() {
        this.getPrograms();
    }

    getPrograms(){
        this.api.getPrograms().subscribe((res)=>{
            this.programs = res;
            this.programsDataSource = new MatTableDataSource(this.programs);
        },(err)=>{
            swal('Error', 'failed to load programs, please reload the page', 'error');
        });
    }

    submitProgram(program) {
        //set alert messages
        let title = 'Create Program';
        let text = 'You are about to create a new program, are you sure ?';
        let confirmTitle = 'Program Created';
        let confirmMessage = 'program has been created successfully!';

        //fire alert
        this.alert.log(title, text, 'Yes', confirmTitle, confirmMessage, () => {
            //send request
            this.api.addProgram(program).subscribe((res) => {
                console.log(res);
                this.getPrograms();
            }, (err) => {
                console.log(err);
                swal('Error', 'request failed', 'error');
            })
        }, () => {
        });

    }

    selectProgram(programId){
        this.router.navigate(['attendanceService/programs/' ,programId])
    }

}
