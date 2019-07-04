import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LogService {

  public logStatus(status: string) {
    console.log('A server status changed, new status: ' + status);
  }
}

/**
 * To create a Service is quite straight forward, it's just a normal TS class.
 * The tricky part is on Injecting it into the Component!
 * Take a look at the account components
 *
 * You would think that we could just instantiate it in our component
 *  - const logService = new LogService();
 *
 *  But this is not Services should be implemented.
 *
 *  For Angular to Inject a Dependency we need to specify it in our constructor, and ALSO, in the Decorator, we need to create a property
 *  called "providers":
 *
 *    @Component({
 *      selector: 'app-root',
 *      templateUrl: './app.component.html',
 *      styleUrls: ['./app.component.css'],
 *      providers: []
 *    })
 *
 * @Injectable({providedIn: })   https://stackoverflow.com/questions/50848357/what-is-the-purpose-of-providedin-with-the-injectable-decorator-when-generating
 */
