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
 *  But this is not Services should be implemented
 */
