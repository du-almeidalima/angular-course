import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
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

/**
 * When using Pipes, we need to keep in mind that they are not linked to the data, so if the data(Objects and Arrays) chantes
 * they will not be updated by it. But Angular allows us to do it, by setting the property { pure: false } in the @Pipe decorator.
 * When pure: false, it will apply the filter for every change detection.
 *
 * BE AWARE: THIS CAN LEAD TO PERFORMANCE ISSUES.
 *
 * In the example we're adding a new server while the filter is applyied, you can see that there is no change if the property
 * "pure" is not defined
 */
