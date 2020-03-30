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
  public empresaActual: Empresa = {
    id: 0,
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

  onDeleteEmpresa(empresa: Empresa){
    const confirmation = confirm("EStas seguro de borrr esta empresa?");
    console.log(empresa.id);
    if(confirmation){
      this.empresaService.delete(empresa.id).subscribe(
        res => {
          alert('El registro fue eliminado con éxito');
          const indexEmpresa = this.empresas.indexOf(empresa);
          this.empresas.splice(indexEmpresa, 1);
        });
    }
  }

  onPreUpdateEmpresa(empresa: Empresa){
    console.log(empresa);
    this.empresaActual = empresa;
  }

  public buscar(formulario : NgForm){
    this.noticiaService.textoBuscado=formulario.value.termino;
    console.log(this.noticiaService.textoBuscado+ " esto va al buscador");
    this.cambioDeRutas.navigate(['/buscador']);   
  }
}
