import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ShortenPipe} from './pipes/shorten.pipe';
import {FormsModule} from '@angular/forms';
import {FilterPipe} from './pipes/filter.pipe';
import {ReversePipe} from './pipes/reverse.pipe';
import {SortByPipe} from './pipes/sortBy.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ShortenPipe,
    FilterPipe,
    ReversePipe,
    SortByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
