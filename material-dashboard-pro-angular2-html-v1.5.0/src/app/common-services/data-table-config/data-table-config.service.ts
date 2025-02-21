import { Injectable } from '@angular/core';
import {Config} from 'ngx-easy-table/src/app/ngx-easy-table/model/config';

@Injectable()
export class DataTableConfigService {

    public config: Config;
  constructor() { }

  public getConfig(): Config{
      this.config ={
          searchEnabled: false,
          headerEnabled: true,
          orderEnabled: true,
          globalSearchEnabled: true,
          paginationEnabled: false,
          exportEnabled: false,
          clickEvent: true,
          selectRow: false,
          selectCol: false,
          selectCell: false,
          additionalActions: false,
          serverPagination: false,
          rows: 1000,
          isLoading: false,
          detailsTemplate: false,
          groupRows: false,
          paginationRangeEnabled: true,
          collapseAllRows: false,
          checkboxes: false,
          resizeColumn: false,
          fixedColumnWidth: false,
          horizontalScroll: false,
          draggable: false,
          logger: false,
          tableLayout: {
              style: 'normal',
              theme: 'light',
              borderless: false,
              hover: true,
              striped: true,
          }
      };

      return this.config;
  }
}
