import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ServersService} from '../servers.service';
import {Injectable} from '@angular/core';

interface Server {
  id: number;
  name: string;
  status: string;
  allowEdit: string;
}

// In the generics we're defining the type of data that the resolver will give us in the end
@Injectable({providedIn: 'root'})
export class ServerResolverService implements Resolve<Server> {

  // Getting the servers with the service
  constructor(private serversService: ServersService) {}

  // This "Resolve" interface requires that a method "resolve" is implemented
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Server> | Promise<Server> | Server {

    return this.serversService.getServer(+route.params['id']);
  }
}

/**
 * Here in this class we will take a look at Resolver, which is away in Angular to fetch data to display into a component before
 * navigating to it or displaying the route. It's really good when dealing with async code
 */
