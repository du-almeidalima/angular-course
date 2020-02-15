import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'shorten'})
export class ShortenPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    return value.toString().length > 15 ?
      value.toString().substr(0, 15) + ' ...' : value;
  }

}

/**
 * The same as Resolvers, Guards, Observables, For us to create a Pipe that will be used by another Software, we need to implement a
 * interface to be compliant, for a Pipe it's the PipeTransform, which require us to implement the "transform" method.
 *
 *      transform(value: any, ...args: any[]): any {
 *        return ... ;
 *      }
 *
 * If we wanted to pass arguments, just like Java, we could assign it to a uncountable list of arguments.
 *
 * Also, just like Components, Directives ... we need to assign a Decorator to it, the @Pipe
 *
 * To get our Pipe working across our module we need to put it into the "Declarations" array of our module. Just like a component
 */
