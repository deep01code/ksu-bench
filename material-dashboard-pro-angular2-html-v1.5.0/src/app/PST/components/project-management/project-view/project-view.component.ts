import { Router } from '@angular/router';
import { Project } from './../../../classes/project';
import { ProjectApiService } from './../../../services/project/project-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {

  projects: Project[];
  constructor(private api: ProjectApiService, private route: Router) {
  }

  ngOnInit() {
    this.api.setProject(null);
    this.api.getAllProjects().subscribe((res) => {
      this.projects = res;
    }, (err) => {

    })
  }


  goToProjectDetils(project: Project) {
    let id =(project==null)? "new":project.id;
    this.route.navigate(["/pst/project/" + id]);
  }


}
