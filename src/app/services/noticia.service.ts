import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Noticia } from '../models/noticia';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService extends CommonService<Noticia> {

  constructor(http : HttpClient) {
    super(http);
    this.baseUrl ="http://localhost:9001/api/v1/noticia/";
   }

   textoBuscado: string;
}
