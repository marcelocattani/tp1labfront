import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { NoticiaService } from '../../services/noticia.service';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from '../../models/empresa';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


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

  constructor(private empresaService: EmpresaService, private noticaService: NoticiaService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    const idEmpresa = this.router.snapshot.params['id'];
    this.getDetails(idEmpresa);
  }

  private getDetails(id: number) {
    this.empresaService.getOne(id).subscribe(data => {
      this.empresa = data;
    })
  }

  public buscar(formulario : NgForm){
    console.info("Metodo no implementado")
    console.info(formulario.value.termino);    
  }

}
