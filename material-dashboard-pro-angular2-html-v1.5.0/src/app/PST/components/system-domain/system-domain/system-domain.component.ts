import { Router } from '@angular/router';
import { SystemDomainService } from './../../../services/system-domain/system-domain.service';
import { Component, OnInit } from '@angular/core';
import { System } from 'app/PST/classes/system-domain';

@Component({
  selector: 'app-system-domain',
  templateUrl: './system-domain.component.html',
  styleUrls: ['./system-domain.component.scss'],
})
export class SystemDomainComponent implements OnInit {

  systemDomains: System[] = null;
  constructor(private api: SystemDomainService, private route: Router) {
    this.api.getSystemDomains().subscribe((res) => {
      this.systemDomains = res;
    })
  }

  ngOnInit() {
  }
  addSystemDomain() {
    this.route.navigate(["/pst/system-domain/new"])
  }

  getSystemDetails(domain: System) {
    this.api.setSystemDomain(domain);
    this.route.navigate(["/pst/system-domain/" + domain.id])

  }

}
