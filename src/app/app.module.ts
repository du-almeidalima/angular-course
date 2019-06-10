import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {ServerComponent} from './server/server.component';
import {ServersComponent} from './servers/servers.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

/**
 * This "bootstrap" property in "imports" that is being used in "./src/main.ts" tells angular all the components it should know, when
 * it's analyzing the "index.html" file
 *
 * Angular, differently from Spring, doesn't scan the project for components, we need to specify it.
 * And we do it in the "modules", which will be like packages of our components. We can do it in the "declarations" property
 */
