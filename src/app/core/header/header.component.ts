import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {DataStorageService} from "../http/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {User} from "../auth/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userAuthSubscription: Subscription;
  public isUserAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService) {}

  public onSaveData(): void {
    this.dataStorageService.saveRecipes();
  }

  public onFetchData(): void {
    this.dataStorageService.getRecipes()
      .subscribe()
  }

  public onLogOut(): void {
    this.authService.logOut();
  }

  ngOnInit(): void {
    this.userAuthSubscription = this.authService.userAuthObservable
      .subscribe((user: User) => {
        // user ? true : false
        this.isUserAuthenticated = !!user;
      })
  }

  ngOnDestroy(): void {
    this.userAuthSubscription.unsubscribe();
  }

}
