import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataTableConfigService} from '../../common-services/data-table-config/data-table-config.service';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import {DeviceService} from '../device.service';
import swal from 'sweetalert2';

const ELEMENT_DATA: Element[] = [{MAKE:undefined, COLOR:undefined, DEVICE_COST:undefined, DEVICE_COST_DISCOUNT:undefined, INVENTORY_CHECK:undefined,
    ITEM_CODE:undefined, MEMORY:undefined, MODEL:undefined, RETAIL_COST:undefined, STC_SALECO_ITEM_CODE:undefined, VALIDATE_IMEI_FLG:undefined,
    X_STC_ELIGIBLE_FOR_RETENTION:undefined, X_STC_PREPAID_PRICE:undefined, X_STC_RETENTION_DEVICE_COST:undefined, COMMENTS: undefined}];
@Component({
  selector: 'app-view-devices',
  templateUrl: './view-devices.component.html',
  styleUrls: ['./view-devices.component.scss'],
  providers: [DeviceService]
})
export class ViewDevicesComponent implements OnInit {

    selectedRow=0;
    displayedColumns: string[] = ['Make', 'Model', 'Memory', 'Color', 'Add'];
    dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    editList = [];
    response = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public pageLimit = 50;
    public isLoading = false;
  constructor(private api: DeviceService,
              private config: DataTableConfigService) { }

  ngOnInit() {
      this.configuration.horizontalScroll = true;
      this.configuration.serverPagination = true;
      this.configuration.paginationEnabled = true;
      this.configuration.paginationRangeEnabled = true;
      this.configuration.clickEvent = true;
      this.configuration.rows = this.pageLimit;
      this.getData()
  }

  public getData(){
      this.dataSource = new MatTableDataSource();
      this.isLoading = true;
      this.data = [];
      this.api.getDevices()
          .subscribe((data)=>{
              this.isLoading = false;
              this.pagination.count = (this.pagination.count === -1) ? data.count : this.pagination.count;
              this.pagination = { ...this.pagination };
              this.configuration.isLoading = false;

              this.dataSource = new MatTableDataSource(data.result);
              this.dataSource.paginator = this.paginator
              this.dataSource.sort = this.sort

          }, (err)=>{
              this.isLoading = false;
          })
  }

    public configuration = this.config.getConfig();
    public columns = [
        {title: "MAKE", key: "MAKE"},
        {title: "MODEL", key: "MODEL"},
        {title: "MEMORY", key: "MEMORY"},
        {title: "COLOR", key: "COLOR"},
        {title: "ITEM_CODE", key: "ITEM_CODE"},
        {title: "Saleco item code", key: "STC_SALECO_ITEM_CODE"},
        {title: "Validate IMEI flag", key: "VALIDATE_IMEI_FLG"},
        {title: "Inventory Check", key: "INVENTORY_CHECK"},
        {title: "Device cost", key: "DEVICE_COST"},
        {title: "DEVICE_COST_DISCOUNT", key: "DEVICE_COST_DISCOUNT"},
        {title: "X_STC_PREPAID_PRICE", key: "X_STC_PREPAID_PRICE"},
        {title: "X_STC_RETENTION_DEVICE_COST", key: "X_STC_RETENTION_DEVICE_COST"},
        {title: "X_STC_ELIGIBLE_FOR_RETENTION", key: "X_STC_ELIGIBLE_FOR_RETENTION"},
        {title: "RETAIL_COST", key: "RETAIL_COST"},
    ];
    public data:any[];
    pagination = {
        limit: this.pageLimit,
        offset: 0,
        count: -1,
    };
    eventEmitted($event) {
        if($event.event === "onPagination"){
            this.parseEvent($event);
        }
    }

    private parseEvent(obj) {
        this.getData();
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    public addToEdit(row){
        if(this.hasOperator(this.editList, row)){
            alert("You cannot add same device twice");
            return;
        }
        let obj = Object.assign({}, row)
        this.editList.push(obj);
        if(!this.selectedRow && this.selectedRow!==0)
            this.selectedRow = 0;
        else this.selectedRow = this.editList.length-1;
    };

    hasOperator(list: any[], operator): boolean{
        operator.MEMORY = operator.MEMORY?operator.MEMORY:''; // set to '' to make it easy to compare
        for(let i = 0; i < list.length; i++){
            list[i].MEMORY = list[i].MEMORY?list[i].MEMORY:'';

            if(list[i].MAKE.toUpperCase() === operator.MAKE.toUpperCase()
                && list[i].MODEL.toUpperCase()  === operator.MODEL.toUpperCase()
                && list[i].COLOR.toUpperCase()  === operator.COLOR.toUpperCase()
                && ( list[i].MEMORY.toUpperCase()  === operator.MEMORY.toUpperCase()) ){
                return true;
            }
        }
        return false;
    }

    public removeFromEdit(index){
        this.editList.splice(index, 1)
        this.selectedRow=this.selectedRow?this.selectedRow-1:this.selectedRow;
    }

    public trClicked(i){
        this.selectedRow = i;
    }

    submit(){
        let self = this;
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to revert this!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Yes, Update!',
            buttonsStyling: false
        }).then(function() {
            let obj = {};
            let array = [];
            self.editList.map(function (value) {

                obj["deviceMake"] = value.MAKE;
                obj["deviceModelName"] = value.MODEL;
                obj["deviceMemory"] = value.MEMORY;
                obj["color"] = value.COLOR;
                obj["comments"] = value.COMMENTS;

                obj["attributeList"] = {
                    "STC Device Item Code": value.ITEM_CODE,
                    "STC Saleco Item Code": value.STC_SALECO_ITEM_CODE ,
                    "STC Validate IMEI Flag": value.VALIDATE_IMEI_FLG ,
                    "STC Inventory Check": value.INVENTORY_CHECK ,
                    "STC Device Price": value.DEVICE_COST ,
                    "STC Device Subsidy Cost": value.DEVICE_COST_DISCOUNT ,
                    "STC Prepaid Device Price": value.X_STC_PREPAID_PRICE ,
                    "STC Retention Device Cost": value.X_STC_RETENTION_DEVICE_COST ,
                    "STC Eligible for Retention": value.X_STC_ELIGIBLE_FOR_RETENTION ,
                    "STC Retail Price": value.RETAIL_COST
                }
                array.push(Object.assign({}, obj))
            })
            self.isLoading = true;
            self.api.updateDevices(array).subscribe((data)=>{
                self.response = data;
                self.isLoading = false;
                swal({
                    title: 'Done!',
                    text: 'Your request has been sent, please check result below.',
                    type: 'success',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }, (err)=>{
                swal({
                    title: 'Error!',
                    text: 'Error! please try again later.',
                    type: 'error',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            });

        }).catch(swal.noop);


    }
}

export interface Element {
    MAKE: any,
    MODEL: any,
    MEMORY: any,
    COLOR: any
    ITEM_CODE: any
    STC_SALECO_ITEM_CODE: any
    VALIDATE_IMEI_FLG: any
    INVENTORY_CHECK: any
    DEVICE_COST: any
    DEVICE_COST_DISCOUNT: any
    X_STC_PREPAID_PRICE: any
    X_STC_RETENTION_DEVICE_COST: any
    X_STC_ELIGIBLE_FOR_RETENTION: any
    RETAIL_COST: any
    COMMENTS: any
}

export interface Device {
    deviceMake: any,
    deviceModelName: any,
    deviceMemory: any,
    color: any
    comments: any
    attributeList:{}
}