import { Page404Component } from './components/page404/page404.component';
import { HomeComponent } from './components/home/home.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { TinyComponent } from './components/tiny/tiny.component';
import { AbmNoticiaComponent } from './components/abm-noticia/abm-noticia.component';


const routes: Routes = [
  {path : '', component: IndexComponent},
  {path: 'buscador',component: BuscadorComponent},
  {path: 'detalle/:id',component: DetalleComponent},
  {path: 'home/:id',component: HomeComponent},
  {path: 'tiny/:id',component: TinyComponent},
  {path: 'abmnoticia',component: AbmNoticiaComponent},
  {path: '**',component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
