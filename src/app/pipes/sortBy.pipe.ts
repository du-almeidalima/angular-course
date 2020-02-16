import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name : 'sortBy'})
export class SortByPipe implements PipeTransform {

  transform(value: any[], property: string): any {

    if (value.length === 0) {
      return value;
    }

    if (value[0][property] === undefined) {
      throw new ReferenceError(`Property:  + ${property} doesn't exists for elements of array`);
    }

    return [...value].sort((a, b) => {

      const aProp = a[property];
      const bProp = b[property];

      if (aProp > bProp) {
        return 1;
      }
      if (aProp < bProp) {
        return -1;
      }

      return 0;
    });
  }

}

/*
 * We have to spread because sort actually mutates the array
 */
