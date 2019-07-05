import {EventEmitter, Injectable} from '@angular/core';
import {LogService} from './log.service';

@Injectable()
export class AccountsService {

  // Properties
  private accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  public statusUpdated = new EventEmitter<string>();

  constructor(private logService: LogService) {}

  public addAccount(name: string, status: string): void {
    this.accounts.push({name, status});

    this.logService.logStatus(status);
  }

  public statusChange(id: number, newStatus: string): void {
    this.accounts[id].status = newStatus;

    this.statusUpdated.emit(newStatus);
    this.logService.logStatus(newStatus);
  }

}

// In this service we will take care of the accounts, so it'll be a Data Service

/** On lesson 107 we created this service and injected it into every component, but there is a problem with instances, Angular only
 * propagate the same instance to the child components, take a look on README to understand the Hierarchical Injector concept
 *
 * What's happening is, we're providing this service to AppComponent, and this one is providing the same instance to its
 * children (NewAccountComponent and AccountsService), but we're overwriting it into those components by instantiating it again!
 */

/**
 * What if we wanted the LogService to work here? Then we should only instantiate it here in the constructor since it's being already
 * instantiated in AppModule, right?
 *
 * No! The reason is, if you inject a Service into something, this something needs to have some metadata attached to it, in the @Component
 * @Directive we already have it, but here, since it's a normal TS class we don't.
 * To solve it we can add @Injectable, this tells Angular that something can be injected in here. We always need to add this Decorator to
 * the service receiving a service
 *
 * If you're using Angular 6+ (check your package.json  to find out), you can provide application-wide services in a different way.
 * Instead of adding a service class to the providers[]  array in AppModule , you can set the following config in @Injectable() :
 *
 *    @Injectable({providedIn: 'root'})
 *    export class MyService { ... }
 */

/**
 * What if we wanted Cross-Component communication without having to pass properties up and down through a chain of components?
 * We could make use of subscribing to an event, here for example, we're emitting an event in the "statusChange()" and in the NewAccountComp
 * we're listening to it, so every time this event occurs NewAccountComponent will listen to it and can get its data, so the components
 * are actually communicating much leaner now.
 */
