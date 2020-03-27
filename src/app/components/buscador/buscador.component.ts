import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../models/noticia';
import { Router } from '@angular/router';
import { NoticiaService } from 'src/app/services/noticia.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  constructor(private route: Router, private noticiaService: NoticiaService) { }

  public textoBuscado = '';
  public noticias: Noticia[];

  ngOnInit(): void {
  }


  goNoticia(id: number) {
    this.route.navigate(['/detalle/' + id]);
  }

  public buscar(formulario : NgForm){
    console.info("Metodo no implementado")
    console.info(formulario.value.textoBuscado);
    this.textoBuscado=formulario.value.textoBuscado;
    this.getNoticias();    
  }

  getNoticias() {
    this.noticias = null;
    this.noticiaService.buscar(this.textoBuscado).subscribe(dato => {
      dato.forEach(n => {
        n.resumenDeLaNoticia = n.resumenDeLaNoticia.substring(0, 40).concat('...');
      });
      dato.sort((a, b) => {
        if (a.fechaPublicacion < b.fechaPublicacion) {
          return 1;
        }
        if (a.fechaPublicacion > b.fechaPublicacion) {
          return -1;
        }
        return 0;
      });
      this.noticias = dato;
    },
    err => {
      alert('Ocurrió un error al cargar las Noticias: ' + err);
    });
  }
}
