import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filter: string, propName: string): any {

    // Checking if servers (value) is empty or the filter condition
    if (value.length === 0 || filter === '') {
      return value;
    }

    const result = value.filter( v => v[propName] === filter );


    return result.length === 0 ? value : result;
  }
}
