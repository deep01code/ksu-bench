/*
*
* Author: Yasser Assiry
* Data: 3-Apr-2018
* Description: this is a service to generate csv files
*
* */

import { Injectable } from '@angular/core';
import {Angular2Csv} from 'angular2-csv';

@Injectable()
export class CsvService {


  constructor() { }

  buildCsv(data,report_title) {

//  This is how should you prepare your data
// First element of your array will be the header
// Then, each element will be a row


     /* var data = [
          {
              name: "name",
              age: "age",
              average: "average",
              approved: "approved",
              description: "description"
          },
          {
              name: "Test 1",
              age: 13,
              average: 8.2,
              approved: true,
              description: "using 'Content here, content here' "
          },
          {
              name: 'Test 2',
              age: 11,
              average: 8.2,
              approved: true,
              description: "using 'Content here, content here' "
          },
          {
              name: 'Test 4',
              age: 10,
              average: 8.2,
              approved: true,
              description: "using 'Content here, content here' "
          },
      ];*/
        report_title=report_title+"-"+new Date()
      new Angular2Csv(data, report_title);
  }
}
