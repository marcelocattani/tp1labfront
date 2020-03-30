import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Empresa } from '../models/empresa';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends CommonService<Empresa>{

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = "http://localhost:9001/api/v1/empresa/";
  }

  public selectedEmpresa: Empresa = {
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
  
}
