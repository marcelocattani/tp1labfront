import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public buscar(formulario : NgForm){
    console.info("Metodo no implementado")
    console.info(formulario.value.termino);    
  }
}
