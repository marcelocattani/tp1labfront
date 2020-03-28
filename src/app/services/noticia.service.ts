import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Noticia } from '../models/noticia';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService extends CommonService<Noticia> {

  constructor(http: HttpClient) {
    super(http);

    this.baseUrl = "http://localhost:9001/api/v1/noticias/";
  }

  public getNoticia(id: number): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.baseUrl + "recent?idEmpresa=" + id);
  }

  buscar(texto: string) {
    return this.http.get<Noticia[]>(this.baseUrl + 'search?word=' + texto);
  }

  textoBuscado: string;
}
