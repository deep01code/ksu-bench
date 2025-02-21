import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FinancialNumber, GlobalType, GlobalDTO, ManagerialUnit, PO} from "../../classes/managerialUnit";
import {StructureService} from "../../services/structureServices/structure.service";
import swal from "sweetalert2";

@Component({
  selector: 'app-upsert-fin',
  templateUrl: './upsert-fin.component.html',
  styleUrls: ['./upsert-fin.component.scss']
})
export class UpsertFinComponent implements OnInit {
  id: string;
  financialNumber:FinancialNumber= new FinancialNumber();
  managerialUnit:ManagerialUnit=new ManagerialUnit();

  isLoading:boolean=false
  constructor(
      private router: ActivatedRoute,
      public structureService:StructureService,
      public route: Router,
  ) { }

  ngOnInit() {
      this.financialNumber.managerialUnit=this.managerialUnit;
      this.id = this.router.snapshot.paramMap.get('id');
      if(this.id!=null && this.id.length>0){
      this.isLoading=true;
      let financialDTO:GlobalDTO=new GlobalDTO();
      let tempFin:FinancialNumber = new FinancialNumber()
      tempFin.type=GlobalType.FINANCIALNUMBER
      tempFin.id=this.id;
      financialDTO.financialUnit=tempFin
      this.structureService.getFinancialUnit(financialDTO).subscribe(
          data=>{this.financialNumber=data as FinancialNumber},
          err=>{},
          ()=>{this.isLoading=false}
      )
    }
  }

  upsertFinancialNumber(){
        let globalDTO:GlobalDTO=new GlobalDTO();
        this.financialNumber.type=GlobalType.FINANCIALNUMBER;
        globalDTO.type=GlobalType.FINANCIALNUMBER;
        globalDTO.managerialUnit=this.financialNumber.managerialUnit;
        globalDTO.financialUnit=this.financialNumber;
        this.structureService.upsertFinancialUnit(globalDTO).subscribe(
            (data)=>{
                swal({
                    title: 'Done!',
                    text: 'Financial Number Created successfully',
                    type: 'success',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            },
            (err)=>{
                console.log(err);
                swal({
                    title: 'Error',
                    text: 'Financial Number Information Duplicated',
                    type: 'error',
                    confirmButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                });
            }

        )
    }

  editPO(id) {
        this.route.navigate(["/userService/upsertPO/" + id]);
    }
}
