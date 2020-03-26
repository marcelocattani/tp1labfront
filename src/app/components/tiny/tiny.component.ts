import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import { NoticiaService } from 'src/app/services/noticia.service';
import { Noticia } from 'src/app/models/noticia';

@Component({
  selector: 'app-tiny',
  templateUrl: './tiny.component.html',
  styleUrls: ['./tiny.component.css']
})
export class TinyComponent implements OnInit {

  tinyForm: FormGroup
  noticia: Noticia
  title = new FormControl('')
  content = new FormControl('')
  summary= new FormControl('')
  imageURL=new FormControl('')

  constructor(private noticiaService: NoticiaService, private router: Router) {
    this.tinyForm = new FormGroup({
      title: this.title,
      content: this.content,
      summary:this.summary,
      imageURL:this.imageURL
    });
    this.noticia = {
      id:0,
      tituloDeLaNoticia:'',
      resumenDeLaNoticia:'',
      imagenNoticia:'',
      contenidoHtml:'',
      fechaPublicacion:'',
      publicada:''
    }
  }

  ngOnInit() {
    
  }

  addNotice() {
    let date= new Date();
    console.log(this.tinyForm.get('title'))
    console.log(this.tinyForm.get('imageURL'))
    console.log(this.tinyForm.get('content'))
    console.log(this.tinyForm.get('summary'))
    this.noticia.tituloDeLaNoticia = this.tinyForm.get('title').value
    this.noticia.imagenNoticia=this.tinyForm.get('imageURL').value
    this.noticia.contenidoHtml = this.tinyForm.get('content').value
    this.noticia.resumenDeLaNoticia=this.tinyForm.get('summary').value
    this.noticia.fechaPublicacion=date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
    this.noticia.publicada='Y';
    console.log(this.noticia.contenidoHtml)
    this.noticiaService.post(this.noticia).subscribe(data => {
      console.log(data)
    }, error => {
      console.log('Failure Response')
    })
  }
}
