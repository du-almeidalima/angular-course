import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import {Store} from "@ngrx/store";
import * as AuthActions from './core/auth/store/auth.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new AuthActions.AutoLogin());
    }

    console.log('AppComponent >> Is Working');
  }
}
