import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DataTableConfigService} from '../../../common-services/data-table-config/data-table-config.service';
import {WizardService} from '../../wizard/wizard.service';
import { GamvouchersService } from '../gamvouchers.service';
import {Voucherrequest} from '../classes/voucherrequest';
import {Voucherrespoend} from '../classes/voucherrespoend';
import {ScDetails} from '../../commonClasses/sc-details';



@Component({
  selector: 'app-gamvouchers',
  templateUrl: './gamvouchers.component.html',
  styleUrls: ['./gamvouchers.component.scss']
})
export class GamvouchersComponent implements OnInit {

    configuration = this.config.getConfig();
    select:boolean = false;
    public stopVoucherList: Array<any> = [];
    public scDetails: ScDetails = {
        listName: 'stopVoucherList',
        data: this.stopVoucherList,
        isValid: function(){
            alert("Please select at least 1 voucher to proceed");
            return false;
        },
        fileName: 'Stop Vouchers',
        isCompleted: false
    };
  constructor(private api: GamvouchersService,
              private config: DataTableConfigService,
              private wizService:WizardService) {
      // table config modification
      this.configuration.orderEnabled = false;
      this.configuration.clickEvent = false;
      this.configuration.paginationEnabled = true;
      this.configuration.rows = 5;
      this.wizService.updateSCDetailsMethod(this.scDetails);
  }

    public modifiedList: Array<any> = [];
    public isModified: boolean = true;
    public isLoading: boolean = false;

    public voucher: Voucherrespoend = new Voucherrespoend();
    private voucherRequest: Voucherrequest = {
        TABLENAME: "SC_VOUCHERS_LIST",
        START: "0",
        COUNT:"1000"
    };

    ngOnInit() {
        this.isLoading = true;
        this.api.getVoucher(this.voucherRequest)
            .subscribe((data)=>{
                    this.isLoading = false;
                    this.voucher = data;
                },
                (err)=>{
                    this.isLoading = false;
                });
    }

    addToList(row, isChecked){
        let index = this.stopVoucherList.indexOf(row);
        if(isChecked){
            this.stopVoucherList.push(row)
        }else{
            this.stopVoucherList.splice(index,1);
        }

        if(!this.stopVoucherList.length){
            this.scDetails.isCompleted = false;
            this.scDetails.isValid = function () {
                alert("Please select at least 1 voucher to proceed");
                return false;
            }
        }else{
            this.scDetails.isCompleted = true;
            this.scDetails.isValid = function () {
                return true;
            }
        }
    }
    data = [];
    columns = [
        { title: "", key: "Select"},
        { title: "ID", key: "VOUCHER_ID"},
        { title: "Voucher Name", key: "VOUCHER_NAME"}
    ];

    eventEmitted(e){

    }


}
