import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from '../../services/noticia.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Empresa } from '../../models/empresa';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {


  public noticia : Noticia = {
    contenidoHtml : "",
    fechaPublicacion : "",
    imagenNoticia : "",
    publicada : "",
    resumenDeLaNoticia : "",
    tituloDeLaNoticia : "",
    empresa : {
      denominacion : "",
      domicilio : "", 
      email : "", 
      horarioDeAtencion : "", 
      latitud : null,
      longitud : null,
      quienesSomos : "",
      telefono : ""       
    }
  }
  

  constructor(public noticiService: NoticiaService, private router: ActivatedRoute) {
    const idNoticia = this.router.snapshot.params['id'];
    this.getDetails(idNoticia);
  }

  ngOnInit(): void {
  }

  private getDetails(id : number){
    this.noticiService.getOne(id).subscribe(data => {
      this.noticia = data; 
      
    })
  }

  public buscar(termino : NgForm){
  
  }

}
