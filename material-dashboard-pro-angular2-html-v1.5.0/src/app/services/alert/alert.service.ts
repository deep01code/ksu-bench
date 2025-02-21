import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class AlertService {

  constructor() { }


  log(title,text,confirmButtonText,confirmTitle,confirmMessage,callback,onClose){

      swal({
          title: title,
          text: text,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: confirmButtonText,
          reverseButtons: true
      }).then((result) => {
          if (result) {
              try{
                  callback();
                  swal({title: confirmTitle,text: confirmMessage,type: 'success',onClose:onClose()})
              }catch (e) {
                  swal("Bad Request","Error :"+e,"error")

              }

          }
      })
  }

}
