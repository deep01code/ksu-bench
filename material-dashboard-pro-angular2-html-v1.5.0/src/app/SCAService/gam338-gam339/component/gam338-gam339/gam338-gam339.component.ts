import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {DataTableConfigService} from '../../../../common-services/data-table-config/data-table-config.service';
import {GetDataTableService} from '../../../sharedServices/get-data-table.service';
import {ScRequest} from '../../../commonClasses/sc-request';
import {Gam338Gam339Service} from '../../gam338-gam339.service';
import {ScDetails} from '../../../commonClasses/sc-details';
import {WizardService} from '../../../wizard/wizard.service';

@Component({
    selector: 'app-gam338-gam339',
    templateUrl: './gam338-gam339.component.html',
    styleUrls: ['./gam338-gam339.component.scss'],
})
export class Gam338Gam339Component implements OnInit {
    isLoading: boolean = false;
    selectedRow: number;
    listOfOffers: any[] = [];
    editList: any[] = [];
    modifiedList: any[] = [];
    private scRequest: ScRequest = {
        TABLENAME: 'SC_OFFERS_DETAILS',
        START: '0',
        FILTER: '',
        COUNT: '1000'
    };

    scDetails: ScDetails = {
        listName: 'updateOffersList',
        data: this.editList,
        isValid: function () {
            alert('Please add Offer(s) to be added/updated');
            return false;
        },
        fileName: 'Update_Offers',
        isCompleted: false
    };

    constructor(private api: Gam338Gam339Service,
                //private api: GetDataTableService,
                private config: DataTableConfigService,
                private wizService:WizardService) {
                this.wizService.updateSCDetailsMethod(this.scDetails);

    }

    ngOnInit() {
        this.configuration.paginationEnabled = true;
        this.configuration.rows = 4;
        this.api.getScenarioList(this.scRequest)
            .subscribe((data) => {
                    this.isLoading = false;
                    this.listOfOffers = data.data;
                },
                (err) => {
                    this.isLoading = false;
                });
    }

    public columns: any[] = [
        {key: 'ID', title: 'ID'},
        {key: 'English Name', title: 'ENGLISHNAME'},
        {key: 'Arabic Name', title: 'ARABICNAME'},
        {title: '', key: 'edit'}
    ];

    data: any[] = [];
    configuration = this.config.getConfig();

    public eventEmitted($event) {
    }

    addNewOffer(offer: NgForm) {
        if (this.hasOffer(this.editList, {ENGLISHNAME: offer.value.EnglishName})) {
            alert('You have already added this offer');
            return;
        }
        if (this.hasOffer(this.listOfOffers, {ENGLISHNAME: offer.value.EnglishName})) {
            alert('there is an offer with the same name!');
            return;
        }
        this.editList.push({
            ID: '',
            ENGLISHNAME: offer.value.EnglishName,
            ARABICNAME: offer.value.ArabicName,
            NEWENGLISHNAME: '',
            NEWARABICNAME: '',
            ENGLISHDESCRIPTION: '',
            ARABICDESCRIPTION: '',
            OFFERSTARTTIME: '',
            OFFERENDTIME: '',
            MONTHLYPRICE: '',
            DATAPACKAGE: '',
            WIFIPACKAGE: '',
            FREESMS: '',
            COMPATIBLEPRODUCTS: '',
            FREEMINUTES: '',
            SERVICEID:'',
            action: 'NEW'
        });
        if (!this.selectedRow && this.selectedRow !== 0)
            this.selectedRow = 0;
        else this.selectedRow = this.editList.length - 1;
        this.validate();
    }


    public addToEdit(row) {
        if (this.hasOffer(this.editList, row)) {
            alert('You have already added this offer');
            return;
        }
        this.scDetails.isValid = function () {
            alert('Please Update All Offer(s)');
            return false;
        };
        this.scDetails.isCompleted = false;

        this.editList.push({
            ID: row.ID,
            ENGLISHNAME: row.ENGLISHNAME,
            ARABICNAME: row.ARABICNAME,
            ENGLISHDESCRIPTION: row.ENGLISHDESCRIPTION,
            ARABICDESCRIPTION: row.ARABICDESCRIPTION,
            OFFERSTARTTIME: row.OFFERSTARTTIME,
            OFFERENDTIME: row.OFFERENDTIME,
            MONTHLYPRICE: row.MONTHLYPRICE,
            DATAPACKAGE: row.DATAPACKAGE,
            WIFIPACKAGE: row.WIFIPACKAGE,
            FREESMS: row.FREESMS,
            COMPATIBLEPRODUCTS: row.COMPATIBLEPRODUCTS,
            UPDATEINPACKAGE:row.UPDATEINPACKAGE,
            FREEMINUTES: row.FREEMINUTES,
            SERVICEID: row.SERVICEID,
            NEWENGLISHNAME: '',
            NEWARABICNAME: '',
            action: 'UPDATE'
        });
        if (!this.selectedRow && this.selectedRow !== 0)
            this.selectedRow = 0;
        else this.selectedRow = this.editList.length - 1;
        this.validate();
    }

    hasOffer(list: any[], offer) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].ENGLISHNAME.toLowerCase() === offer.ENGLISHNAME.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    public removeFromEdit(item, index) {
        this.editList.splice(index, 1);
        this.removeByENGLISHNAME(item.ENGLISHNAME, 'modifiedList');
        this.selectedRow = this.selectedRow ? this.selectedRow - 1 : this.selectedRow;
        this.validate();
    }

    public trClicked(i) {
        this.selectedRow = i;
    }

    validate() {
        if (this.modifiedList
            &&
            this.editList.length>0
            &&
            this.editList.length == this.modifiedList.length
        ) {
            this.scDetails.isCompleted = true;
            this.scDetails.isValid = function () {
                //this.scDetails.isCompleted = true;
                return true;
            }
        } else if (this.editList.length>0){
            this.scDetails.isCompleted = false;
            this.scDetails.isValid = function () {
                alert('Please update offer(s)');
                return false;
            }
        }
        else {
            this.scDetails.isCompleted = false;
            this.scDetails.isValid = function () {
                alert('Please add Offer(s) to be added/updated');
                return false;
            }
        }
    }

    fieldChanged(item) {
        if (this.containsByENGLISHNAME(item, this.modifiedList)) {
            if (this.isOriginal(item, this.listOfOffers) || !this.offerIsValid(item)) {
                this.removeByENGLISHNAME(item.ENGLISHNAME, 'modifiedList');
            }
        }

        console.log("-----------------------------")
        console.log(this.containsByENGLISHNAME(item,this.modifiedList))
        console.log("++++++++++++++++++++++++++++")
        if (!this.isOriginal(item, this.listOfOffers)
            && !this.containsByENGLISHNAME(item,this.modifiedList)
            && this.offerIsValid(item)) {
            this.modifiedList.push(item);
        }

        if (item.action==='NEW' && this.offerIsValid(item)
            && !this.containsByENGLISHNAME(item,this.modifiedList)){
            this.modifiedList.push(item);
        }
        this.validate();
    }

    isOriginal(object: any, list: any[]) {
        if (!object || !list || list.length == 0) {
            return true;
        }

        for (let i = 0; i < list.length; i++) {
            if (object.ENGLISHNAME === list[i].ENGLISHNAME) {
                if (object.NEWENGLISHNAME && list[i].ENGLISHNAME.toLowerCase() !== object.NEWENGLISHNAME.toLowerCase()) {
                    console.log("1")
                    return false;
                } else if (object.NEWARABICNAME && list[i].ARABICNAME.toLowerCase() !== object.NEWARABICNAME.toLowerCase()) {
                    console.log("2")
                    return false;
                } else if (list[i].ENGLISHDESCRIPTION.toLowerCase() !== object.ENGLISHDESCRIPTION.toLowerCase()) {
                    console.log("3")
                    return false;

                } else if (list[i].ARABICDESCRIPTION.toLowerCase() !== object.ARABICDESCRIPTION.toLowerCase()) {
                    console.log("4")
                    return false;
                } else if (list[i].OFFERSTARTTIME.getTime() !== object.OFFERSTARTTIME.getTime()) {
                    console.log("5")
                    return false;
                } else if (list[i].OFFERENDTIME.getTime() !== object.OFFERENDTIME.getTime()) {
                    console.log("6")
                    return false;
                } else if (list[i].MONTHLYPRICE.toLowerCase() !== object.MONTHLYPRICE.toLowerCase()) {
                    console.log("7")
                    return false;
                } else if (list[i].DATAPACKAGE.toLowerCase() !== object.DATAPACKAGE.toLowerCase()) {
                    console.log("8")
                    return false;
                }else if ((list[i].UPDATEINPACKAGE && object.UPDATEINPACKAGE && list[i].UPDATEINPACKAGE.toLowerCase() !== object.UPDATEINPACKAGE.toLowerCase())
                    ||
                    (object.UPDATEINPACKAGE && !list[i].UPDATEINPACKAGE)
                    ||
                    (!object.UPDATEINPACKAGE && list[i].UPDATEINPACKAGE)) {
                    console.log("9")
                    return false;
                } else if (list[i].WIFIPACKAGE.toLowerCase() !== object.WIFIPACKAGE.toLowerCase()) {
                    console.log("10")
                    return false;
                } else if (list[i].FREESMS.toLowerCase() !== object.FREESMS.toLowerCase()) {
                    console.log("11")
                    return false;
                } else if (list[i].COMPATIBLEPRODUCTS.toLowerCase() !== object.COMPATIBLEPRODUCTS.toLowerCase()) {
                    console.log("12")
                    return false;
                } else if (list[i].FREEMINUTES.toLowerCase() !== object.FREEMINUTES.toLowerCase()) {
                    console.log("13")
                    return false;
                }
            }
        }

        return true;
    }

    removeByENGLISHNAME(englishName: string, listName: string): boolean {
        if (!englishName || !this[listName] || this[listName].length == 0) {
            return false;
        }

        for (let i = 0; i < this[listName].length; i++) {
                if (this[listName][i].ENGLISHNAME.toLowerCase() === englishName.toLowerCase()) {
                    this[listName].splice(i, 1);
                    this.validate();
                    return true;
                }
        }
        return false;
    }

    containsByENGLISHNAME(object, list: any[]): any {
        if (!object || !list || list.length == 0) {
            return null;
        }


        for (let i = 0; i < list.length; i++) {
            if (list[i].ENGLISHNAME && list[i].ENGLISHNAME.toLowerCase() === object.ENGLISHNAME.toLowerCase()) {
                return list[i];
            }
        }
        return null;
    }

    offerIsValid(offer): boolean {
        if (!offer) {
            return false;
        }
        if (offer.ENGLISHDESCRIPTION && offer.ARABICDESCRIPTION
            && offer.OFFERSTARTTIME && offer.OFFERENDTIME && offer.MONTHLYPRICE) {

            console.log(offer.OFFERSTARTTIME>offer.OFFERENDTIME);
            if (offer.OFFERENDTIME.getTime()<=offer.OFFERSTARTTIME.getTime()){
                this.scDetails.isCompleted = false;
                console.log(this.scDetails.isCompleted);
                this.scDetails.isValid = this.mChange();
                return false;
                }

            return true;
        }
        return false;
    }

    differenceBetweenArrays(arr1:any[],arr2:any):any[]{
        let difference = arr1.filter(item => arr2.indexOf(item) < 0);
        return difference;
    }

    mChange():Function{
        let mfunc = function () {
            alert("offer start date must be before end date!");
            return false;
        }
        return mfunc;
    }

}
