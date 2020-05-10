import {async, TestBed} from '@angular/core/testing';

import {User, UserComponent} from './user.component';
import {UserService} from './user.service';
import {HttpClientModule} from '@angular/common/http';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';

describe('UserComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(UserComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // ======= COMPONENT TESTS =======
  it('should create', () => {
    // The component being tested
    const fixture = TestBed.createComponent(UserComponent);
    const userComponent = fixture.componentInstance;

    expect(userComponent).toBeTruthy();
  });

  // ======= SERVICE TESTS =======
  it('should get sync user from UserService after logIn call', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const userDe = fixture.debugElement;
    const userComponent: UserComponent = userDe.componentInstance;
    const userService = fixture.debugElement.injector.get(UserService);
    const userId = 1;

    userComponent.getAsync = false;
    userComponent.logIn(userId);
    // We need to manually run change detection when the component state change
    fixture.detectChanges();

    expect(userComponent.user).toEqual(userService.getSyncUser(userId));
  });

  it('should get async user from UserService after logIn call', async(() => {
    const fixture = TestBed.createComponent(UserComponent);
    const userDe = fixture.debugElement;
    const userComponent: UserComponent = userDe.componentInstance;
    const userService = fixture.debugElement.injector.get(UserService);
    const mockUser: User = { id: 5, name: 'Test User', email: 'testuser@test.com'};

    spyOn(userService, 'getAsyncUserById').and.returnValue( of(mockUser) );

    // Async Code
    userComponent.getAsync = true;
    userComponent.logIn(mockUser.id);

    // We need to manually run change detection when the component state change

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(userComponent.user).toEqual(mockUser);
    });
  }));
  // ======= DOM TESTS =======
  it('should display the user name if the user is logged in using HTML nativeElement', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const userDe = fixture.debugElement;
    const userComponent: UserComponent = userDe.componentInstance;
    const userId = 2;

    userComponent.getAsync = false;
    userComponent.logIn(userId);
    fixture.detectChanges();

    const welcomeMessageH3: HTMLHeadingElement = userDe.nativeElement.querySelector('#messageTitle');
    expect(welcomeMessageH3.textContent).toContain(userComponent.user.name);
  });

  it('should display the user name if the user is logged in using By.css()', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const userDe = fixture.debugElement;
    const userComponent: UserComponent = userDe.componentInstance;
    const userId = 3;

    userComponent.getAsync = false;
    userComponent.logIn(userId);
    fixture.detectChanges();

    // This ensures Platform Safety in case of being running in Servers or WebWorkers
    const welcomeMessageH3: HTMLHeadingElement = userDe.query(By.css('#messageTitle')).nativeElement;
    expect(welcomeMessageH3.textContent).toContain(userComponent.user.name);
  });

  it('should display \'User not Logged\' in message if User is not valid', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const userDe = fixture.debugElement;
    const userComponent: UserComponent = userDe.componentInstance;
    const userId = 999;

    userComponent.getAsync = false;
    userComponent.logIn(userId);
    fixture.detectChanges();

    const welcomeMessageH3: HTMLHeadingElement = userDe.query(By.css('#messageTitle')).nativeElement;
    expect(welcomeMessageH3.textContent).toContain('User not Logged');
  });
});

/*
 * Necessary to test HTTP https://medium.com/better-programming/testing-http-requests-in-angular-with-httpclienttestingmodule-3880ceac74cf
 */
