import {Component, OnInit,ChangeDetectorRef} from '@angular/core';
import { Release } from '../../classes/gam91/release';
import {ReleaseDate} from '../../classes/gam91/release-date';
import {ReleaseType} from '../../classes/gam91/release-type';
import {ReleaseDateId} from '../../classes/gam91/release-date-id';
import {Gam91Service} from '../../services/gam91/gam91.service';
import {DateAdapter} from '@angular/material';
import swal from 'sweetalert2';
import { MatInput } from '@angular/material';
declare var $: any;



@Component({
    selector: 'app-gam91',
    templateUrl: './gam91.component.html',
    styleUrls: ['./gam91.component.scss']
})

export class Gam91Component implements OnInit {


    listReleases: Release[];
    release: Release;

    members: any[];

    releaseDate: ReleaseDate;

    releaseTypes: ReleaseType[];

    selectedReleaseType: ReleaseType;

    touch: boolean;

    selectedStartDate: Date;

    selectedEndDate: Date;

    selectedReleaseDateNumber: string;

    createdReleaseDate: ReleaseDate;

    createdReleaseDateId: ReleaseDateId;

    existingReleaseDate: ReleaseDate;

    modifiedStartDate: Date;

    modifiedEndDate: Date;

    selectedReleaseDate:ReleaseDate;

    modifiedReleaseDate:ReleaseDate;

    tobeDeletedReleaseDate:ReleaseDate;
    public isLoading: boolean = true;


    constructor(private api: Gam91Service, private cd: ChangeDetectorRef) {
    }

    confirmDelete: boolean;
    public confirmDeleteMethod(confirmDelete): void {
        if(confirmDelete){
            console.log('hit');
            this.deleteRelease(this.releaseDateTobeDeleted2);
        }
    }


    getListReleases(): void {
        this.isLoading = true;
        this.api.getAllReleases()
            .subscribe(data => {
                this.listReleases = data
                this.isLoading = false;
            },
                (error)=>{
                    this.isLoading = false;
                });
    }

    isDeleted: boolean;
    deleteRelease(relObject): void {
        this.isLoading = true;
        this.api.deleteSelectedRelease(relObject.releaseType.name, relObject.releaseDateId.releaseNumber)
            .subscribe(successCode => {
                this.isDeleted = successCode,
                    this.isLoading = false;
            },
                (error)=>{
                    this.isLoading = false;
                });
    }

    releaseDateTobeDeleted2: ReleaseDate;
    setParmater(releaseDateTobeDeleted: ReleaseDate):void{
        let releaseDateTobeDeleted1 = new ReleaseDateId();
        releaseDateTobeDeleted1.releaseNumber = releaseDateTobeDeleted.releaseDateId.releaseNumber;
        this.releaseDateTobeDeleted2 = new ReleaseDate();
        this.releaseDateTobeDeleted2.releaseDateId = releaseDateTobeDeleted1;
        this.releaseDateTobeDeleted2.releaseType = releaseDateTobeDeleted.releaseType;
        console.log(releaseDateTobeDeleted.releaseType.name + releaseDateTobeDeleted.releaseDateId.releaseNumber + "this test");
    }




    ngOnInit() {
        this.getReleaseTypes();
        this.getListReleases();
    }

    addReleaseDate(): void {
        if (!this.selectedReleaseType) {
            alert('choose a category please!');
            return;
        }
        if (!this.selectedReleaseDateNumber) {
            alert('enter a number please!');
            return;
        }
        if (!this.selectedStartDate) {
            alert('enter a start date please!');
            return;
        }
        if (!this.selectedEndDate) {
            alert('enter a end date please!');
            return;
        }
        if (this.selectedEndDate.getTime() < this.selectedStartDate.getTime()) {
            alert('wrong input an end date must be after start date');
            return;
        }

        this.existingReleaseDate = null;
        this.getReleaseType(this.selectedReleaseType.name, this.selectedReleaseDateNumber);

        if (this.existingReleaseDate) {
            alert('this release is already exists!');
            return;
        }
        this.createdReleaseDateId = new ReleaseDateId();
        this.createdReleaseDate = new ReleaseDate();
        this.createdReleaseDateId.releaseNumber = this.selectedReleaseDateNumber;
        this.createdReleaseDate.releaseDateId = this.createdReleaseDateId;
        this.createdReleaseDate.releaseType = this.selectedReleaseType;
        this.createdReleaseDate.startDate = this.selectedStartDate.getTime();
        this.createdReleaseDate.endDate = this.selectedEndDate.getTime();

        this.api.addReleaseDate(this.createdReleaseDate).subscribe(releaseDate => {
            this.releaseDate = releaseDate;
        });
    }

    getReleaseType(releaseTypeName: string, releaseDateNumber: string): void {
        this.isLoading = true;
        this.api.getReleaseDate(releaseTypeName, releaseDateNumber)
            .subscribe(existingReleaseDate => {
                this.existingReleaseDate = existingReleaseDate;
                this.isLoading = false;
            },
                (error)=>{
                    this.isLoading = false;
                });
    }

    getReleaseTypes(): void {
        this.isLoading = true;

        this.api.getReleaseTypes()
            .subscribe(releaseTypes => {
                this.releaseTypes = releaseTypes;
                this.isLoading = false;
            },
                (error)=>{
                    this.isLoading = false;
                });
    }

    updateReleaseDate(): void {
        if (!this.modifiedStartDate) {
            alert('enter a start date please!');
            return;
        }
        if (!this.modifiedEndDate) {
            alert('enter a end date please!');
            return;
        }
        if (this.modifiedStartDate.getTime() > this.modifiedEndDate.getTime()) {
            alert('wrong input an end date must be after start date');
            return;
        }

        this.selectedReleaseDate.startDate = this.modifiedStartDate.getTime();
        this.selectedReleaseDate.endDate = this.modifiedEndDate.getTime();


        this.api.updateReleaseDate(this.selectedReleaseDate).subscribe(modifiedReleaseDate => {
            this.modifiedReleaseDate = modifiedReleaseDate;
        });

    }

    selectedRelease(release:ReleaseDate){
        let releaseDateId = new ReleaseDateId();
        releaseDateId.releaseNumber = release.releaseDateId.releaseNumber;
        this.selectedReleaseDate = new ReleaseDate();
        this.selectedReleaseDate.releaseDateId = releaseDateId;
        this.selectedReleaseDate.releaseType = release.releaseType;
        this.selectedReleaseDate.startDate = release.startDate;
        this.selectedReleaseDate.endDate = release.endDate;
    }

    showSwal(type) {
        if (type === 'warning-message-and-confirmation') {
            swal({
                title: 'Are you sure?',
                text: 'You will not be able to revert this!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                confirmButtonText: 'Yes, delete it!',
                buttonsStyling: false,
            }).then((result) => {
                this.confirmDeleteMethod(true);
                //this.api.getAllReleases();
                swal({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    type: 'success',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false,
                }).then((result) => {
                    location.reload();    
                });
            }).catch(swal.noop);
        }
    }

}
