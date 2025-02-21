import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PrepaidVoucherService} from '../prepaid-voucher.service'
import {PrepaidVotcherRespons} from '../classes/prepaid-votcher-respons';
import {DataTableConfigService} from '../../../common-services/data-table-config/data-table-config.service';
import {ScRequest} from '../../commonClasses/sc-request';
import {WizardService} from '../../wizard/wizard.service';
import {ScDetails} from '../../commonClasses/sc-details';

@Component({
  selector: 'app-gam-prepaid-vouchers',
  templateUrl: './gam-prepaid-vouchers.component.html',
  styleUrls: ['./gam-prepaid-vouchers.component.scss']
})
export class GamPrepaidVouchersComponent implements OnInit {

    public editList: Array<any> = [];
    public modifiedList: Array<any> = [];
    public isModified: boolean = true;
    public isLoading: boolean = false;

    constructor(private api: PrepaidVoucherService,
                private config: DataTableConfigService,
                private wizService:WizardService) {
        // table config modification
        this.configuration.orderEnabled = false;
        this.configuration.clickEvent = false;
        this.configuration.paginationEnabled = true;
        this.configuration.rows = 10;

        this.configuration2.orderEnabled = false;
        this.configuration2.clickEvent = false;
        this.configuration2.globalSearchEnabled = false;
        this.wizService.updateSCDetailsMethod(this.scDetails);
    };

    public prepaidRespones: PrepaidVotcherRespons = new PrepaidVotcherRespons();
    private scRequest: ScRequest = {
        TABLENAME: "SC_TEST_PREPAIDVOUCHERS",
        START: "0",
        FILTER: "",
        COUNT:"1000"
    };
    public scDetails: ScDetails = {
        listName: 'prepaidVouchersList',
        data: this.modifiedList,
        isValid: function(){
            alert("Please add Voucher(s) to be updated");
            return false;
        },
        fileName: 'Prepaid Vouchers',
        isCompleted: false
    };
    data = [];
    columns = [
        { title: "ID", key: "VOUCHER_ID"},
        { title: "Voucher Name", key: "VOUCHER_NAME"},
        { title: "Arabic Voucher", key: "AR_NAME"},
        { title: "English Voucher", key: "EN_NAME"},
        { title: "Price", key: "PRICE"},
        { title: "Validity", key: "VALIDITY"},
        { title: "", key: "edit"}
    ];

    configuration = this.config.getConfig();
    configuration2 = this.config.getConfig();

    eventEmitted(e){

    }

    ngOnInit() {
        this.isLoading = true;
        this.api.getPrepaidVoucher(this.scRequest)
            .subscribe((data) => {
                this.isLoading = false;
                this.prepaidRespones = data;
            }, (err) => {
                this.isLoading = false;
            }
        );
    }


    addToEdit(row){
        this.editList.push(row);
        this.editList = [ ...this.editList];
    }

    removeFromEdit(row){
        let index = this.editList.indexOf(row);
        this.editList.splice(index, 1);
        this.editList = [...this.editList];
        this.removeFromEditedList(row.VOUCHER_ID);
        this.validate();
    }

    removeFromEditedList(id){
        for (let i = 0; i < this.modifiedList.length; i++) {
            if (this.modifiedList[i].VOUCHER_ID === id)
                this.modifiedList.splice(i, 1)
        }
    }




    textChanged(row, content, lang){
        let obj = Object.assign({}, row);
        let alreadyUpdated = this.containsObject(obj, this.modifiedList);
        let index = this.editList.indexOf(row);
        let changed = false;

        if(alreadyUpdated !==  -1) {
            obj = this.modifiedList[alreadyUpdated]
        }

        if(lang === 'A' && content !== obj.AR_NAME){
            obj.AR_NAME = content;
            changed = true;
        }else if(lang === 'B' && content !== obj.EN_NAME){
            obj.EN_NAME = content;
            changed = true;
        } else if (lang === 'C' && content !== obj.PRICE){
            obj.PRICE = content;
            changed = true;
        } else if (lang === 'D' && content !== obj.VALIDITY){
            obj.VALIDITY = content;
            changed = true;
        } else if (lang === 'E' && content !== obj.VOUCHER_NAME){
            obj.VOUCHER_NAME = content;
            changed = true;
        }

        if( alreadyUpdated === -1 && changed) {
            this.modifiedList.push(obj)
        }else if(changed){
            this.modifiedList[this.containsObject(obj, this.modifiedList)] = obj;
        }

        if (this.isOriginalValue(obj, this.editList)) {
            this.removeFromEditedList(obj.VOUCHER_ID)
        }

        this.validate();
    }



    containsObject(obj, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].VOUCHER_ID === obj.VOUCHER_ID) {
                return i;
            }
        }
        return -1;
    }

    isOriginalValue(obj, list: Array<any>): boolean{
        for(let i = 0; i < list.length; i++){
            if(list[i].VOUCHER_ID === obj.VOUCHER_ID){
                if(list[i].AR_NAME === obj.AR_NAME
                    && list[i].EN_NAME === obj.EN_NAME
                    && list[i].PRICE === obj.PRICE
                    && list[i].VALIDITY === obj.VALIDITY
                    && list[i].VOUCHER_NAME === obj.VOUCHER_NAME
                ){
                    return true
                }
                return false;
            }
        }
        return false
    }

    isNotChanged(obj){
        this.validate()
        for(let i = 0; i < this.modifiedList.length; i++) {
            if (obj.VOUCHER_ID === this.modifiedList[i].VOUCHER_ID) {
                return false;
            }
        }
        return true;
    }


    public validate(){
        if( !this.editList.length){
            this.scDetails.isCompleted = false;
            this.scDetails.isValid = function () {
                alert("Please add Voucher(s) to be updated");
                return false;
            }
        }else if( !this.modifiedList.length  || this.modifiedList.length < this.editList.length){
            this.scDetails.isCompleted = false;
            this.scDetails.isValid = function () {
                alert("Please Update All Voucher(s)");
                return false;
            }
        }else{
            this.scDetails.isCompleted = true;
            this.scDetails.isValid = function () {
                return true;
            }
        }
    }

}
