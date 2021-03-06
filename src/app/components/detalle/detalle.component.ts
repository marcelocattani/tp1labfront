import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from '../../services/noticia.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Empresa } from '../../models/empresa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  public idNoticia : number = null;
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
  
  constructor(public noticiService: NoticiaService, private router: ActivatedRoute, private cambioDeRutas: Router) {
    this.idNoticia = this.router.snapshot.params['id'];
    this.getDetails(this.idNoticia);
  }

  ngOnInit(): void {
  }

  private getDetails(id : number){
    this.noticiService.getOne(id).subscribe(data => {
      this.noticia = data; 
      
    })
  }

  public buscar(formulario : NgForm){
    this.noticiService.textoBuscado=formulario.value.termino;
    console.log(this.noticiService.textoBuscado+ " esto va al buscador");
    this.cambioDeRutas.navigate(['/buscador']); 
  }

  public eliminar(){
    if(confirm("Desea eliminar")){
      this.noticiService.delete(this.idNoticia).subscribe(data =>{
        if(data) {
          this.noticia = {
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
          this.cambioDeRutas.navigate(['/'])
        } else {
          console.error(Error);          
        }
      })
    }
  }

  public actualizar(){
    this.cambioDeRutas.navigate(['/tiny/'+this.idNoticia]);
  }

}
