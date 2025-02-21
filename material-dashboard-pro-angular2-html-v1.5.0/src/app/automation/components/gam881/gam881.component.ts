import { Component, OnInit, AfterViewInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {log} from 'util';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {unescape} from 'querystring';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;
@Component({
  selector: 'app-gam881',
  templateUrl: './gam881.component.html',
  styleUrls: ['./gam881.component.scss']
})
export class Gam881Component implements OnInit,AfterViewInit {

    public dataTable: DataTable;
    public products:any[]=[]
    public isLoading:boolean
    constructor(public router:Router,public http: HttpClient){

    }

    ngOnInit() {
        //localhost:8080/product



        this.http.get<any[]>('http://localhost:8081/product/').subscribe(data => {
            this.products=data
            this.dataTable = {
                //{"NAME":"0 Months Installment Period","ROW_ID":"1-JZWJVV","PRICE_TYPE_CD":"One-Time","STD_PRI_UNIT":0}
                headerRow: [ 'NAME', 'ROW_ID', 'PRICE_TYPE_CD', 'PRICE_TYPE_CD', 'STD_PRI_UNIT', 'Actions' ],
                footerRow: [ 'NAME', 'ROW_ID', 'PRICE_TYPE_CD', 'PRICE_TYPE_CD', 'STD_PRI_UNIT', 'Actions' ],

                dataRows:this.products
            };



        })

    }

    ngAfterViewInit() {

        $('#loading').hide();
        $('#datatables').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
            responsive: true,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Search records',
            }

        });

        const table = $('#datatables').DataTable();

        // Edit record
        table.on( 'click', '.edit', function () {
            const $tr = $(this).closest('tr');

            const data = table.row($tr).data();
/*            alert( 'You press on Row: -->' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.' );*/

            swal({
                title: 'Update Price',
                text: 'Are you sure you want to edit '+data[0]+' price ?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                reverseButtons: true
            }).then((result) => {
                if (result) {
                    try{

                        swal({
                            text: 'Enter new Price',
                            input: "text",
                            confirmButtonText: 'Update',
                        }).then(price => {

                            //localhost:8080/update-price?productName='JawalNet 1000'&price=155

                            console.log('before the post')
//                            var url='http://localhost:8081/update-price?productName='+data[0]+'&price='+price;
                            var url='http://localhost:8081/update-price'


                            $('#loading').show();

                            var jqxhr = $.post( url,{productName:data[0],price:price}, function() {
                                $('#loading').hide();
                            })
                                .done(function() {
                                    $('#loading').hide();
                                    swal({title:"Successful Update",text:"your update request was successful",type:"success",onClose:()=>{
                                            location.reload();
                                        }})

                                })
                                .fail(function() {
                                    $('#loading').hide();
                                    swal("Bad Request","Error :","error")
                                })
/*

                            $.ajax({
                                type: 'POST',
                                url : url,
                                data: {
                                },
                                beforeSend: function () {
                                    $('#loading').show();
                                }
                            }).done(function(r) { // executed only if successful
                                $('#loading').hide();
                            });
*/



                          //  return fetch(`https://itunes.apple.com/search?term=${name}&entity=movie`);
                        })

                        //callback();
//                        swal({title: confirmTitle,text: confirmMessage,type: 'success',onClose:onClose()})
                    }catch (e) {
                        swal("Bad Request","Error :"+e,"error")

                    }

                }
            })
        } );

        // Delete a record
        table.on( 'click', '.remove', function (e: any) {
            const $tr = $(this).closest('tr');
            table.row($tr).remove().draw();
            e.preventDefault();
        } );

        // Like record
        table.on( 'click', '.like', function () {
            alert('You clicked on Like button');
        });
    }


    public showLoading(){
        this.isLoading=true;
    }

   public hideLoading(){
        this.isLoading=false;
    }
}