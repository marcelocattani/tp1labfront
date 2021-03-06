import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { Noticia } from 'src/app/models/noticia';
import { Empresa } from '../../models/empresa';


import { EmpresaService } from '../../services/empresa.service';
import { NoticiaService } from '../../services/noticia.service';


import * as Mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mapa: Mapboxgl.Map;
  textoBuscadoDeAfuera= '';

  public empresa: Empresa = {
    id: null,
    denominacion: "",
    domicilio: "",
    email: "",
    horarioDeAtencion : "",
    latitud : null,
    longitud : null,
    quienesSomos : "",
    telefono : ""
  };

  
  public noticias: Noticia[] ;

  constructor(private empresaService: EmpresaService, private noticiaService: NoticiaService, private router: ActivatedRoute, private cambioDeRutas: Router) { }

  ngOnInit(): void {
    const idEmpresa = this.router.snapshot.params['id'];
    this.getDetails(idEmpresa);
    
  }

  private getDetails(id: number) {
    this.empresaService.getOne(id).subscribe(data => {
      this.empresa = data;


      this.iniciarMapa();
      this.crearMarcador();

      this.noticiaService.getNoticia(id).subscribe(data => {
        this.noticias = data;
      });
    })
  }

  public buscar(formulario : NgForm){
    this.noticiaService.textoBuscado=formulario.value.termino;
    console.log(this.noticiaService.textoBuscado+ " esto va al buscador");
    this.cambioDeRutas.navigate(['/buscador']);   
  }

public iniciarMapa(){  
  Mapboxgl.accessToken = environment.mapboxKey;
  this.mapa = new Mapboxgl.Map({
  container: 'mapbox-mapa', // container id
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [this.empresa.longitud,this.empresa.latitud], // posicion de inicio (LONG - LAT)
  zoom: 16 // starting zoom
  });
}

  public async crearMarcador(){
    var marker = new Mapboxgl.Marker({
      draggable: false
      })
      .setLngLat([this.empresa.longitud,this.empresa.latitud])
      
      .addTo(this.mapa);
  }

  public agregarNoticia(){
    this.cambioDeRutas.navigate(['/tiny/0']);
  }
}
