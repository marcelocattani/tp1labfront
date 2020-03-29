import { Component, OnInit } from '@angular/core';
import { NoticiaService} from 'src/app/services/noticia.service';
import { Noticia } from 'src/app/models/noticia';

@Component({
  selector: 'app-abm-noticia',
  templateUrl: './abm-noticia.component.html',
  styleUrls: ['./abm-noticia.component.css']
})
export class AbmNoticiaComponent implements OnInit {
  totalPages: Array<number>;

  page = 0;
  size = 7;
  order = 'id';
  asc = true;

  isFirst = false;
  isLast = false;

  public newsList: Noticia[];
  public news: Noticia = {
    id:0,
    tituloDeLaNoticia:'',
    resumenDeLaNoticia:'',
    imagenNoticia:'',
    contenidoHtml:'',
    fechaPublicacion:'',
    publicada:''

  };
  constructor(private noticiaService: NoticiaService) { }

  ngOnInit() {
    this.getAllnews();
  }

  getAllnews() {
    this.noticiaService.noticias(this.page, this.size, this.order, this.asc).subscribe( data => {
      this.newsList = data.content;
      this.isFirst = data.first;
      this.isLast = data.last;
      this.totalPages = new Array(data['totalPages']);
      console.log(data);
    },
    err => {
      console.log(err.error);
    }
    );
  }
 

  delete(news: Noticia) {
    const opcion = confirm('¿Desea eliminar este registro?');
    if (opcion === true) {
      this.noticiaService.delete(news.id).subscribe(
        res => {
          alert('El registro fue eliminado con éxito');
          const indexNews = this.newsList.indexOf(news);
          this.newsList.splice(indexNews, 1);
        }
      );
    }
  }

sort(): void {
    this.asc = !this.asc;
    this.getAllnews();
  }

  rewind(): void {
    if (!this.isFirst) {
      this.page--;
      this.getAllnews();
    }
  }

  forward(): void {
    if (!this.isLast) {
      this.page++;
      this.getAllnews();
    }
  }

  setPage(page: number): void {
    this.page = page;
    this.getAllnews();
  }
  
  setOrder(order: string): void {
    this.order = order;
    this.getAllnews();
  }



}
