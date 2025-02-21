import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Formv2Service} from '../../../services/commonServices/formService/formv2.service';
import {NgForm, NgModel} from '@angular/forms';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
@Component({
    selector: 'app-form2',
    templateUrl: './formv2.component.html',
    styleUrls: ['./formv2.component.scss'],
})
export class Formv2Component implements OnInit {

    @Output() onSubmit: EventEmitter<any> = new EventEmitter();
    isLoading: boolean = false;
    public projects: string[];
    public selectedProjects: string[];
    public projectFilter: string = '';

    public modules: string[];
    public selectedModules: string[];
    public moduleFilter: string = '';

    public endDate: Date;
    public startDate: Date;

    public locations: string[];
    public locationFilter: string = '';
    public selectedLocations: string[];

    public billingRoles: string[];
    public billingRoleFilter: string = '';
    public selectedBillingRoles: string[];

    public employees: any[];
    public selectedEmployees: string[]
    public employeeFiler: string = '';
    public selectedEmployeesId: any[] = [];

    public days: boolean = true;
    public cost: boolean = true;

    constructor(private api : Formv2Service) { }

    ngOnInit() {
        this.setProjects();
        this.setLocations();
        //this.projects = ["BSST", "BAU", "TAOASUL"]
    }

    setProjects(): void{
        this.isLoading = true;
        this.api.getProjects()
            .subscribe((data)=>{
                    this.isLoading = false;
                    this.projects = data;
                },
                (err)=>{
                    this.isLoading = false;
                })
    }




    setMoudles(): void{
        if(this.form.controls.modules.dirty){
            this.form.controls.modules.reset();
        }
        if(this.form.controls.endDate.dirty){
            this.form.controls.endDate.reset();
        }

        if(this.form.form.controls.projects.invalid){
            this.modules = [];
            this.selectedModules = [];
            return;
        }
        this.isLoading = true;
        if(this.selectedProjects){
            this.api.getModules({projects: this.form.value.projects})
                .subscribe(
                    (data)=>{
                        this.isLoading = false;
                        this.modules=data;
                        this.setBillingRoles();
                    },
                    (error)=>{
                        this.isLoading = false;
                    }
                )
        }
    }

    setBillingRoles(){
        if(this.form.controls.employees.dirty){
            this.form.controls.employees.reset();
        }
        let module = this.form.form.value.modules&&this.form.form.value.modules.length?this.form.form.value.modules:this.modules
        this.isLoading = true;
        let reqBody = {
            projects: this.form.value.projects,
            modules: module
        };
        this.api.getBillingRoles(reqBody)
            .subscribe(
                (data)=>{
                    this.isLoading = false;
                    this.billingRoles = data;
                },
                (error)=>{
                    this.isLoading = false;
                }
            )
    }

    onStartDateChange(e){
        if(this.form.controls.employees.dirty){
            this.form.controls.employees.reset();
        }
        if(this.form.controls.endDate.value){
            this.setEmployees(this.form.controls.endDate.value);
        }
    }

    setEmployees(endDate): void{
        if(this.form.controls.employees.dirty){
            this.form.controls.employees.reset();
        }
        let billingRoles = this.form.form.value.billingRoles&&this.form.form.value.billingRoles.length?this.form.form.value.billingRoles:this.billingRoles
        let locations = this.form.form.value.locations&&this.form.form.value.locations.length?this.form.form.value.locations:this.locations
        let modules = this.form.form.value.modules&&this.form.form.value.modules.length?this.form.form.value.modules:this.modules
        this.isLoading = true;
        let startDate = new Date()
        startDate = this.form.controls.startDate.value;
        let reqBody = {
            projects: this.form.controls.projects.value,
            modules: modules,
            locations: locations,
            d1: (startDate.getDate())+"/"+(startDate.getMonth()+1)+"/"+startDate.getFullYear(),
            d2: (endDate.getDate())+"/"+(endDate.getMonth()+1)+"/"+endDate.getFullYear(),
            billing_roles: billingRoles
        }
        this.api.getEmployees(reqBody)
            .subscribe(
                (data)=>{
                    this.isLoading=false;
                    this.employees = data
                },
                (error)=>{
                    this.isLoading = false;
                }
            )
    }

    setLocations(): void{
        if(this.form.controls.employees && this.form.controls.employees.dirty){
            this.form.controls.employees.reset();
        }
        this.isLoading = true;
        this.api.getLocations()
            .subscribe(
                (data)=>{
                    this.isLoading = false;
                    this.locations = data;
                },
                (error)=>{
                    this.isLoading = false;
                }
            )
    };



    endDateFilter = (date: Date): boolean => {
        return date >= this.startDate && date <= new Date();
    }

    startDateFilter = (date: Date): boolean => {
        return date <= new Date();
    }




    @ViewChild("form") form: NgForm
    submitForm(): void{
        let billingRoles = this.form.form.value.billingRoles&&this.form.form.value.billingRoles.length?this.form.form.value.billingRoles:this.billingRoles
        let locations = this.form.form.value.locations&&this.form.form.value.locations.length?this.form.form.value.locations:this.locations
        let modules = this.form.form.value.modules&&this.form.form.value.modules.length?this.form.form.value.modules:this.modules

        let startDate = new Date();
        startDate = this.form.controls.startDate.value
        let endDate = new Date();
        endDate = this.form.controls.endDate.value

        let obj = {
            d1: (startDate.getDate()) + "/" + (startDate.getMonth()+1) + "/" + startDate.getFullYear(),
            d2: (endDate.getDate())  + "/" + (endDate.getMonth() +1) + "/" + endDate.getFullYear(),
            projects: this.form.controls.projects.value,
            modules: modules,
            locations: locations,
            billing_roles: billingRoles

        };
        if(this.form.controls.employees.value && this.form.controls.employees.value[0]) {
            obj["id"] = this.selectedEmployeesId;
        }
        this.getCost(obj);
    }

    getCost(obj){
        /*      this.setColumns(e.startDate, e.endDate)
              this.columns.push({title: 'Total'})*/
        this.isLoading = true;
        this.api.getCost(obj)
            .subscribe(
                (data)=>{
                    this.isLoading = false;
                    this.onSubmit.emit({
                        data: data,
                        months: this.getMonths(this.form.controls.startDate.value, this.form.controls.endDate.value)
                    })
                },
                (error)=>{
                    this.isLoading = false;
                }
            )
    }

    getMonths(d1: Date, d2: Date){
        let year1 = d1.getFullYear();
        let month1 = d1.getMonth();
        let year2 = d2.getFullYear();
        let month2 = d2.getMonth();
        let months =[];
        while(true){
            let sprator = month1+1<10?"-0":"-";
            months.push({
                title: year1+sprator+(month1+1),
                key: year1+sprator+(month1+1)
            });

            if(month1!==11)
                month1++
            else {
                year1++
                month1 = 0
            }

            if(year1 === year2 && month1 > month2)
                return months;
        }
    }

    selectAll(select: NgModel, values, target: HTMLElement) {
        if(!select.value || (!select.dirty && select.value>0) || !select.valid || select.value.length < values.length){
            target.innerText = "Deselect All"
            select.update.emit(values);
        }else{
            target.innerText = "Select All"
            select.update.emit([]);
        }
    }


    setSelectedEmployeesIds(employeesList: NgModel){
        if(employeesList.dirty || employeesList.value) {
            let employees = [];
            this.selectedEmployeesId = employeesList.value.forEach(function (item) {
                employees.push(item.id.toString())
            })
            this.selectedEmployeesId = employees;
        }
    }

    test(date: NgModel){
        let endDate = this.form.controls.endDate;
        let startDate = this.form.controls.startDate;
        if(endDate.valid && startDate.valid && this.form.controls.endDate.dirty){
            this.setEmployees(this.form.controls.endDate.value)
        }
    }

}
