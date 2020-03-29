import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Noticia } from '../models/noticia';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService extends CommonService<Noticia> {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = "http://localhost:9001/api/v1/noticia/";

  }

  public getNoticia(id: number): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.baseUrl+ "recent?idEmpresa=" + id);
  }

  public noticias(page: number, size: number, order: string, asc: boolean): Observable<any> {
    return this.http.get<any>(this.baseUrl+'paginas?' + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }
  buscar(texto: string) {
    return this.http.get<Noticia[]>(this.baseUrl + 'search?word=' + texto);
  }

  textoBuscado: string;
}
