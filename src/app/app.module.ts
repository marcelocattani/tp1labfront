import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// H T T P
import {HttpClientModule} from '@angular/common/http';
import { IndexComponent } from './components/index/index.component';
import { Page404Component } from './components/page404/page404.component'

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
