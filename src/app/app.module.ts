import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';


// H T T P
import {HttpClientModule} from '@angular/common/http';

//Componentes

import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { Page404Component } from './components/page404/page404.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { HomeComponent } from './components/home/home.component';
import { TinyComponent } from './components/tiny/tiny.component';

//Formularios
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//Editor tyny
import {EditorModule} from '@tinymce/tinymce-angular';
import { AbmNoticiaComponent } from './components/abm-noticia/abm-noticia.component';
import { AbmEmpresaComponent } from './components/abm-empresa/abm-empresa.component';



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    Page404Component,
    BuscadorComponent,
    DetalleComponent,
    HomeComponent,
    TinyComponent,
    AbmNoticiaComponent,
    AbmEmpresaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
    FormsModule,
    EditorModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
