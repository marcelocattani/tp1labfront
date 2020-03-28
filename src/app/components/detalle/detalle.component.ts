import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NoticiaService } from '../../services/noticia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  constructor(private noticaService: NoticiaService, private cambioDeRutas: Router) { }

  ngOnInit(): void {
  }

  public buscar(formulario : NgForm){
    this.noticaService.textoBuscado=formulario.value.termino;
    console.log(this.noticaService.textoBuscado+ " esto va al buscador");
    this.cambioDeRutas.navigate(['/buscador']);   
  }

}
