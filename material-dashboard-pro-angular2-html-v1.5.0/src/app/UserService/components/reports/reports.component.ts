import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StructureService} from "../../services/structureServices/structure.service";
import {Color} from "ng2-charts";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {


  public applicationTotalReport={
    lineChartData:[],
    datasets:[],
    options:{},
    colors:[],
    labels:[],
    lineChartType:'bar',
    lineChartLegend:false,
    chartColors: [
      { // grey
        backgroundColor: 'rgba(123,31,160,0.5)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      /*{ // red
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }*/
    ],
  }

  public vendorReport={
    lineChartData:[],
    datasets:[],
    options:{},
    colors:[],
    labels:[],
    lineChartType:'bar',
    lineChartLegend:false,
    chartColors: [
      { // grey
        backgroundColor: 'rgba(123,31,160,0.5)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      /*{ // red
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }*/
    ],
  }


  public typeReport={
    lineChartData:[],
    datasets:[],
    options:{},
    colors:[],
    labels:[],
    lineChartType:'pie',
    lineChartLegend:false,
    chartColors:  [
      {
        backgroundColor: ['rgba(123,31,160,0.5)', 'rgba(123,31,160,0.1)'],
      },
    ]
  }

  public genderReport={
    lineChartData:[],
    datasets:[],
    options:{},
    colors:[],
    labels:[],
    lineChartType:'pie',
    lineChartLegend:false,
    chartColors:  [
      {
        backgroundColor: ['rgba(123,31,160,0.5)', 'rgba(123,31,160,0.1)'],
      },
    ]
  }

  public saudiRationReport={
    lineChartData:[],
    datasets:[],
    options:{},
    colors:[],
    labels:[],
    lineChartType:'pie',
    lineChartLegend:false,
    chartColors:  [
      {
        backgroundColor: ['rgba(123,31,160,0.5)', 'rgba(123,31,160,0.1)'],
      },
    ]
  }
  public jobRationReport={
    lineChartData:[],
    datasets:[],
    options:{},
    colors:[],
    labels:[],
    lineChartType:'pie',
    lineChartLegend:false,
    chartColors:  [
      {
        backgroundColor: ['rgba(123,31,160,0.5)', 'rgba(123,31,160,0.1)'],
      },
    ]
  }

  public reportEmployeesPerSite=[]
  public reportGenderPerUnit=[]
  public reportNationality=[]

  @ViewChild('reports') firstTab: ElementRef;

  triggerFirstTabClick() {
    let el: HTMLElement = this.firstTab.nativeElement;
    el.click();
  }


  constructor(public structureService:StructureService) {

  //  this.labels = this.reportByDepartment['labels'];
  //  this.datasets.push({data:this.reportByDepartment['numbers']})
    setTimeout(()=>{this.triggerFirstTabClick()},700)
   }

  ngOnInit() {

    this.structureService.getReportByDepartment().subscribe(
        (data)=>{
           this.applicationTotalReport.labels=data['labels']
          this.applicationTotalReport.datasets.push({data:data['numbers']})
         }
    );


    this.structureService.getReportByType().subscribe(
        (data)=>{
          this.typeReport.labels=data['labels']
          this.typeReport.datasets.push({data:data['numbers']})
        }
    );

    this.structureService.getReportByGender().subscribe(
        (data)=>{
          this.genderReport.labels=data['labels']
          this.genderReport.datasets.push({data:data['numbers']})
        }
    );

    this.structureService.getReportBySaudiRatio().subscribe(
        (data)=>{
          this.saudiRationReport.labels=data['labels']
          this.saudiRationReport.datasets.push({data:data['numbers']})
        }
    );

    this.structureService.getReportByJobRatio().subscribe(
        (data)=>{
          this.jobRationReport.labels=data['labels']
          this.jobRationReport.datasets.push({data:data['numbers']})
        }
    );


    this.structureService.getReportByVendor().subscribe(
        (data)=>{
          this.vendorReport.labels=data['labels']
          this.vendorReport.datasets.push({data:data['numbers']})
        }
    )

    this.structureService.getReportByDepartmentAndSite().subscribe(
        (data)=>{
          this.reportEmployeesPerSite=data as [any];
        }
    )

    this.structureService.getReportByDepartmentAndGender().subscribe(
        (data)=>{
          this.reportGenderPerUnit=data as [any];
        }
    )

    this.structureService.getReportByNationality().subscribe(
        (data)=>{
          this.reportNationality=data as [any];
        }
    )

  }

  openTapClick(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  getGrandTotal(){

    return parseInt(this.reportEmployeesPerSite[this.reportEmployeesPerSite.length-1]['onsite'])+parseInt(this.reportEmployeesPerSite[this.reportEmployeesPerSite.length-1]['offsite'])
  }

  getGrandTotalGenderPerDepartment(){
    return parseInt(this.reportGenderPerUnit[this.reportGenderPerUnit.length-1]['male'])+parseInt(this.reportGenderPerUnit[this.reportGenderPerUnit.length-1]['female'])

  }

}
