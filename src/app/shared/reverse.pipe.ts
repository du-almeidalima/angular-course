import {PipeTransform} from '@angular/core';

export class ReversePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value.split('').reverse().join('');
  }
}
