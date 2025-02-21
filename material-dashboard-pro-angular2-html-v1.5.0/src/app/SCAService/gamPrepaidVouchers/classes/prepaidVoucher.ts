export class PrepaidVoucher {

    type:string;
    id:string;
    arabic:string;
    english:string;

    isValid():boolean{
        if (this.type && this.id && this.arabic && this.english){
            return true;
        }
        alert("enter all fields please !!")
        return false;
    }
}
