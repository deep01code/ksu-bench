import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform{
    transform(value: any, filterString: string, propName: string): any{
        if(!value || value.length === 0 || filterString === '' || ! filterString){
            return value;
        }
        let resultSet = [];
        for(let item of value){
           if (propName && item[propName] !== undefined ){
               if(item[propName].toUpperCase().includes(filterString.toUpperCase())) {
                   resultSet.push(item);
               }
           }else if ( item.toUpperCase().includes(filterString.toUpperCase())){
               resultSet.push(item);
           }
        }
        return resultSet;

    };
}
