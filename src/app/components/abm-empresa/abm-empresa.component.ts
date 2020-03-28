import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../../services/noticia.service';
import { EmpresaService } from '../../services/empresa.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Empresa } from '../../models/empresa';

@Component({
  selector: 'app-abm-empresa',
  templateUrl: './abm-empresa.component.html',
  styleUrls: ['./abm-empresa.component.css']
})
export class AbmEmpresaComponent implements OnInit {

  constructor(private noticiaService: NoticiaService, private empresaService: EmpresaService, private cambioDeRutas: Router) { }

  public empresas: Empresa[];
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

  ngOnInit(): void{
    this.getAllEmpresas();
  }
  
  getAllEmpresas() {
    this.empresaService.getAll().subscribe((data: Empresa[]) => {
      if(data){
        this.empresas = data;
      }
    });
    console.log(this.empresas);
  }

  onDeleteEmpresa(idEmpresa: number){
    const confirmation = confirm("are you sure you want to delete this book?");
    console.log(idEmpresa);
    //if(confirmation){
    //  this.empresaService.delete(idEmpresa);
    //}
  }

  onPreUpdateEmpresa(empresa: Empresa){
    console.log(empresa);
    //this.dataApi.selectedBook= Object.assign({}, book);
  }

  public buscar(formulario : NgForm){
    this.noticiaService.textoBuscado=formulario.value.termino;
    console.log(this.noticiaService.textoBuscado+ " esto va al buscador");
    this.cambioDeRutas.navigate(['/buscador']);   
  }
}
