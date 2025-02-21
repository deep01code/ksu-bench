import swal from 'sweetalert2';
import { ProjectApiService } from './../../../services/project/project-api.service';
import { VendorContact } from 'app/PST/classes/vendor-contact';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { System } from 'app/PST/classes/system-domain';
import { Vendor } from './../../../classes/vendor';
import { GeneralDepartment } from './../../../classes/GeneralDepartment';
import { LoVService } from './../../../services/LoV/LoVService';
import { VednorApisService } from './../../../services/Vendor/VednorApis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemDomainService } from './../../../services/system-domain/system-domain.service';
import { Project, Contract } from './../../../classes/project';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class ProjectDetailsComponent implements OnInit {
  generalDepartments: GeneralDepartment[];
  mainVendors: Vendor[];
  subVendors: Vendor[];
  systemDomains: System[];
  selectedSystems: System[];
  newContract: Contract = new Contract();
  isNew: boolean = false;
  formEditable: boolean = false;
  id: any;
  isSubContractSelected: boolean = false
  proejctTypes = ["Projection", "MS", "TM", "Scope"];

  project: Project;
  isLoading: boolean = false;
  viewConfig: any = {
    editable: true,
    createNew: false
  }

  @ViewChild("form") form: NgForm;

  constructor(private systemDomainApi: SystemDomainService, private route: Router,
    private router: ActivatedRoute, private vendorApi: VednorApisService,
    private lovApi: LoVService, public dialog: MatDialog, private api: ProjectApiService) {
    this.id = this.router.snapshot.paramMap.get('id')

    this.systemDomainApi.getSystemDomains().subscribe((res) => {
      this.systemDomains = res;
    }, (err) => {
      swal({
        title: 'Error!',
        text: 'Not able to find any system domain, please create system domain to procees',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-danger'
      }).catch(swal.noop);
      this.route.navigate(["/pst/system-domains"]);
    });

    this.vendorApi.getMainVendors().subscribe((res) => {
      console.log('====START====')
      console.log(res)
      console.log('====END======')
      this.mainVendors = res;
    }, (err) => {
      swal({
        title: 'Error!',
        text: 'Not able to find any vendor, please create vendor to procees',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-danger'
      }).catch(swal.noop);
      this.route.navigate(["/pst/vendors"]);
    });

    this.vendorApi.getSubVendors().subscribe((res) => {
      this.subVendors = res;
    }, (err) => {

    });
    this.lovApi.getGeneralDepartments().subscribe((res) => {
      this.generalDepartments = res;
    }, (err) => {

    })



    let self = this;
    this.project = this.api.getProject();
    this.formEditable = (this.id == "new");
    if (!this.project && this.id != "new") {
      this.api.getProjectById(this.id).subscribe((res) => {
        this.project = res;
        console.log(res)
        //this.setSystemValue();
      }, (err) => {
        if (err.status == 404) {
          swal({
            title: 'Error!',
            text: 'Not able to find Project with id:' + this.id,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-danger'
          }).catch(swal.noop);
          self.route.navigate(["/pst/projects"]);
        } else {
          swal({
            title: 'Error!',
            text: 'Oops, something went wrong, please contact Admin team.',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-danger'
          }).catch(swal.noop);
          self.route.navigate(["/pst/projects"]);
        }
      });
    } else if (this.id == "new") {
      this.project = new Project();
      this.isNew = true;
    }


  }

  ngOnInit() {
    if (!this.project)
      this.project = new Project();

  }

  compareWithId(o1: any, o2: any) {
    return o1.id == o2.id;
  }

  containsSystemDomain(systemDomains: System[], system: System): boolean {
    for (let i = 0; i < systemDomains.length; i++) {
      if (systemDomains[i].id == system.id) {
        return true;
      }
    }
    return false;
  }

  addContractDialog(contract: Contract): void {
    if (!contract.contacts) {
      contract.contacts = new Array<VendorContact>();
    }
    let dialogRef = this.dialog.open(ContractDetails, {
      width: '65%',
      data: { contract: contract, projectType: this.project.projectType, vendors: this.mainVendors, editable: true }
    });


    dialogRef.afterClosed().subscribe(result => {

      if (!result || !result.contacts) return

      if (!this.project.contracts) this.project.contracts = new Array<Contract>();
      this.project.contracts.push(result.contract)
      this.newContract = new Contract();
    });
  }

  editContractDialog(contract: Contract): void {
    if (!contract.contacts) {
      contract.contacts = new Array<VendorContact>();
    }
    console.log(this.formEditable)
    let dialogRef = this.dialog.open(ContractDetails, {
      width: '65%',
      data: { contract: contract, projectType: this.project.projectType, vendors: this.mainVendors, editable: this.formEditable },

    });


    dialogRef.afterClosed().subscribe(result => {

      if (!result) return

    });
  }



  saveChanges() {
    let self = this;

    swal({
      title: 'Confirmation',
      text: 'Are you sure you want save changes?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Create Project!',
      buttonsStyling: false
    }).then(function () {
      self.isLoading = true;
      if (!self.isNew) {
        self.api.updateProject(self.id, self.project).subscribe((res) => {
          self.project = res;
          self.isLoading = false;
          swal({
            title: 'Done!',
            text: 'Changes has been saved successfully',
            type: 'success',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
          self.project = res;
          self.api.setProject(res)
          self.route.navigate(["/pst/projects"]);
        }, (err) => {
          self.isLoading = false;
          var errorMessage = "Error! not able to save your changes, please contact admin team";
          if (err.status == 409) {
            errorMessage = "Error! Please make sure you have entered unique values";
          } else if (err.status == 401) {
            errorMessage = err.error.developerMessage;
          } else if (err.status = 404){
            errorMessage = "Error, there is no such project exist, not able to update.";
          } else if (err.status = 400) {
            errorMessage = "";
            Object.keys(err.error).forEach(function (key) {
              errorMessage = errorMessage + key + ": " + err.error[key] + "<hr>";
            })
          }
          swal({
            title: 'Error!',
            html: errorMessage,
            type: 'error',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          });
          console.log("Creating new project")

          self.route.navigate(["/pst/projects"]);
        });
      } else {
        {
          self.api.createProject(self.project).subscribe((res) => {
            self.project = res;
            self.isLoading = false;
            swal({
              title: 'Done!',
              text: 'Project has been created successfully',
              type: 'success',
              confirmButtonClass: 'btn btn-success',
              buttonsStyling: false
            });
            self.project = res;
            self.api.setProject(res)
            self.route.navigate(["/pst/projects"]);
          }, (err) => {
            self.isLoading = false;
            var errorMessage = "Error! not able to create the project, please contact admin team";
            if (err.status == 401) {
              errorMessage = err.error.developerMessage;
            }
            swal({
              title: 'Error!',
              text: errorMessage,
              type: 'error',
              confirmButtonClass: 'btn btn-success',
              buttonsStyling: false
            });
            self.route.navigate(["/pst/projects"]);
          });
        }
      }

    }).catch(swal.noop);
  }

  enableEdit() {
    this.formEditable = (!this.formEditable || this.isNew);
  }

  viewSubcontractDetails(project: Project, i) {
    this.api.setProject(project);
    this.api.setContractIndex(i)
    this.route.navigate(["/pst", "project", this.id, "subcontract"]);
  }
  setTest() {

    // @ts-ignore
    this.project = {
      "ps":true,
      "id":null,
      "projectName": "MSAS",
      "projectNumber": 22134,
      "projectType": "Projection",
      "yearOfProject": 2021,
      "finNumber": 5458,
      "projectValue": 5000000,
      "startDate": new Date("2019-09-30T21:00:00.000Z"),
      "endDate": new Date("2022-01-30T21:00:00.000Z"),
      "systemDomains": [
        {
          "id": 1,
          "systemDomainNumber": "123",
          "systemDomainEngName": "CRM",
          "systemDescription": "Test Desc",
          "companyName": "Oracle",
          "companyCountry": "USA",
          "createdDate": null,
          "lastModifiedDate": "2021-02-05T22:34:03.771+00:00",
          "sectionId": 1,
          "departmentName": "Core Processing Applications",
          "gdName": "Consumer Enablement",
          "sectionName": "Consumer Mediation and Billing"
        },
        {
          "id": 2,
          "systemDomainNumber": "66",
          "systemDomainEngName": "RBM",
          "systemDescription": "",
          "companyName": "GINIVA",
          "companyCountry": "Canada",
          "createdDate": null,
          "lastModifiedDate": "2021-02-05T22:34:03.780+00:00",
          "sectionId": 5,
          "departmentName": "Financial Planning And Control",
          "gdName": "Applications Planning & Control",
          "sectionName": "Applications Financial Planning"
        }
      ],
      "requestingGD": {
        "id": 1,
        "generalDepartmentNumber": 215,
        "gdEnName": "Consumer Enablement",
        "gdArName": "تمكين المستهلك",
        "departments": [
          {
            "id": 1,
            "departmentNumber": 114,
            "departmentEnglishName": "Core Processing Applications",
            "departmentArabicName": "تطبيقات المعالجة الأساسية",
            "sections": [
              {
                "id": 1,
                "sectionNumber": 11,
                "sectionEnglishName": "Consumer Mediation and Billing",
                "sectionArabicName": "قسم الفوترة",
                "employees": [],
                "domains": [
                  {
                    "id": 1,
                    "systemDomainNumber": "123",
                    "systemDomainEngName": "CRM",
                    "systemDescription": "Test Desc",
                    "companyName": "Oracle",
                    "companyCountry": "USA",
                    "createdDate": null,
                    "lastModifiedDate": "2021-02-05T22:34:03.771+00:00",
                    "sectionId": 1,
                    "departmentName": "Core Processing Applications",
                    "gdName": "Consumer Enablement",
                    "sectionName": "Consumer Mediation and Billing"
                  }
                ]
              },
              {
                "id": 2,
                "sectionNumber": 12,
                "sectionEnglishName": "Charging and Rating Systems",
                "sectionArabicName": "قسم التكاليف والحسابات",
                "employees": [],
                "domains": []
              }
            ]
          },
          {
            "id": 2,
            "departmentNumber": 113,
            "departmentEnglishName": "Consumer Solutions",
            "departmentArabicName": "حلول المستهلك",
            "sections": [
              {
                "id": 3,
                "sectionNumber": 13,
                "sectionEnglishName": "Release Management",
                "sectionArabicName": "قسم إدارة الإصدارات",
                "employees": [],
                "domains": []
              },
              {
                "id": 4,
                "sectionNumber": 14,
                "sectionEnglishName": "CEX,CVM and Sales Solutions",
                "sectionArabicName": "قسم حلول البيع وتجربة العميل",
                "employees": [],
                "domains": []
              }
            ]
          }
        ]
      },
      "sectorOwner": "CBU",
      "expenseType": "CAPEX",
      "multiYearAgreement": true,
      "proejctDescription": "D",
      "contracts": [
        {
          "contacts": [
            {
              "name": "Ahmed",
              "jobTitle": "PM",
              "mobileNumber": "0566606917",
              "emailAddress": "fahed.imamu@gmail.com"
            },
            {
              "name": "Fahad",
              "jobTitle": "PM",
              "mobileNumber": "0566606917",
              "emailAddress": "fahed.imamu@gmail.com"
            }
          ],
          "poNumber": "PO-59831",
          "poIssueDate": "2020-06-11T21:00:00.000Z",
          "poEndDate": "2022-01-09T21:00:00.000Z",
          "poValue": "25000",
          "marginPercent": "10",
          "marginCap": "5800",
          "vendor": {
            "id": 1,
            "name": "TCS",
            "number": "34",
            "type": "Main Contractor",
            "commercialRegistration": 566721565,
            "vatNumber": 254867,
            "website": "www.tcs.com",
            "contact": [
              {
                "id": 1,
                "name": "Suresh Kumar",
                "jobTitle": "Account Manager",
                "mobileNumber": 5544668877,
                "emailAddress": "sukumar@tcs.com"
              },
              {
                "id": 2,
                "name": "Vinay Juri",
                "jobTitle": "Project Manager",
                "mobileNumber": 5654668877,
                "emailAddress": "vinay@tcs.com"
              }
            ],
            "endDate": null
          },
          "subProjectDescription": "Testing",
          "subcontracts": [
            {
              "contacts": [
                {
                  "name": "Nasser",
                  "mobileNumber": "0566606917",
                  "emailAddress": "fahed.imamu@gmail.com",
                  "jobTitle": "CEO"
                }
              ],
              "poNumber": "PO-59831",
              "projectSystemDomains": [
                {
                  "id": 2,
                  "systemDomainNumber": "66",
                  "systemDomainEngName": "RBM",
                  "systemDescription": "",
                  "companyName": "GINIVA",
                  "companyCountry": "Canada",
                  "createdDate": null,
                  "lastModifiedDate": "2021-02-05T22:34:03.780+00:00",
                  "sectionId": 5,
                  "departmentName": "Financial Planning And Control",
                  "gdName": "Applications Planning & Control",
                  "sectionName": "Applications Financial Planning"
                }
              ],
              "subVendor": {
                "id": 2,
                "name": "STCs",
                "number": "12",
                "type": "Both",
                "commercialRegistration": 233564565,
                "vatNumber": 4135867,
                "website": "www.stcs.com.sa",
                "contact": [
                  {
                    "id": 3,
                    "name": "Waleed Alsanad",
                    "jobTitle": "Account Manager",
                    "mobileNumber": 558877909,
                    "emailAddress": "walsanad@stcs.com.sa"
                  }
                ],
                "endDate": null
              },
              "subContractStartDate": "2018-12-31T21:00:00.000Z",
              "subContractEndDate": "2021-02-27T21:00:00.000Z",
              "comment": "Subcontract"
            }
          ]
        }
      ]
    } as Project;
  }
}



@Component({
  selector: 'contract-details',
  templateUrl: 'add-contract.html',
})
export class ContractDetails {
  newContact: VendorContact = new VendorContact();
  constructor(
    public dialogRef: MatDialogRef<ContractDetails>,
    @Inject(MAT_DIALOG_DATA) public data: Contract) {
    if (!data.contacts) data.contacts = new Array<VendorContact>();
  }

  @ViewChild("form") form: NgForm;

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewContact() {
    this.data.contacts.push(this.newContact);
    this.newContact = new VendorContact();
  }

  selectedVendor(o1: Vendor, o2: Vendor) {
    return o1.id == o2.id;
  }
}


