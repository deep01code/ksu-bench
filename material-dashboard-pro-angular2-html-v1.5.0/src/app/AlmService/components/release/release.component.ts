import {Component, OnInit, Output, EventEmitter, ViewChild, Input, AfterViewInit} from '@angular/core';
import {ReleaseService} from '../../services/release/release.service';
import {Release} from '../../classes/release';

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit {
    @Input() type: string;
    @Output() onSelectValue = new EventEmitter<{release: number}>();
    @Input() releases:Release[];


  constructor( public api: ReleaseService ) {
  }


  ngOnInit() {

  }

    onChange(e: any) {
        this.onSelectValue.emit( e );
    }
}
