import { Component, OnInit } from '@angular/core';
import { NoticiaService} from 'src/app/services/noticia.service';
import { Noticia } from 'src/app/models/noticia';

@Component({
  selector: 'app-abm-noticia',
  templateUrl: './abm-noticia.component.html',
  styleUrls: ['./abm-noticia.component.css']
})
export class AbmNoticiaComponent implements OnInit {

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
    this.noticiaService.getAll().subscribe( res => {
      this.newsList = res;
    });
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




}
