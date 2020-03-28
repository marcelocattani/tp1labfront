import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NoticiaService } from 'src/app/services/noticia.service';
import { Noticia } from 'src/app/models/noticia';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-tiny',
  templateUrl: './tiny.component.html',
  styleUrls: ['./tiny.component.css']
})
export class TinyComponent implements OnInit {
  idAux:number
  seleccionado:Empresa={
    denominacion:'algo',
    telefono:'',
    latitud:0,
    longitud:0,
    email:'',
    quienesSomos:'',
    domicilio:'',
    horarioDeAtencion:''
  }
  tinyForm: FormGroup
  empresas:Empresa[]=[]
  noticia: Noticia={
    id: 0,
    tituloDeLaNoticia: '',
    resumenDeLaNoticia: '',
    imagenNoticia: '',
    contenidoHtml: '',
    fechaPublicacion: '',
    publicada: '',
    empresa: null
  }
  constructor(private noticiaService: NoticiaService, private empresaService:EmpresaService, private router: Router, private ruta: ActivatedRoute) {
  this.getAllEnterprise()
    this.load();

  }
  getAllEnterprise(){
    this.empresaService.getAll().subscribe(res=>{
      this.empresas=res;
      console.log("EMPRESAS")
      console.log(this.empresas)
    })
  }
  load() {
    this.ruta.params.subscribe(params => {
      if(params['id']==0){
        this.idAux=0;
        this.createReactiveForm(this.noticia);
        return;
      }
      this.noticiaService.getOne(params['id']).subscribe(data => {
        console.log(data)
        this.idAux=params['id']
        this.createReactiveForm(data)
      })

    })
  }

createReactiveForm(data:Noticia){
  this.tinyForm = new FormGroup({
    title: new FormControl(data.tituloDeLaNoticia),
    content: new FormControl(data.contenidoHtml),
    summary: new FormControl(data.resumenDeLaNoticia),
    imageURL: new FormControl(data.imagenNoticia),

  });
  this.noticia.empresa=data.empresa
}
  ngOnInit() {
  }

  addNews() {
    if(this.idAux===0){
      this.saveNews();
      return;
    }
    this.updateNews();
   
  }

  saveNews(){
    console.log('SAVE')
    let date = new Date();
    this.noticia.tituloDeLaNoticia = this.tinyForm.get('title').value
    this.noticia.imagenNoticia = this.tinyForm.get('imageURL').value
    this.noticia.contenidoHtml = this.tinyForm.get('content').value
    this.noticia.resumenDeLaNoticia = this.tinyForm.get('summary').value
    this.noticia.fechaPublicacion = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    this.noticia.publicada = 'Y';
    this.noticia.empresa.id=this.seleccionado.id
    console.log(this.noticia.empresa.id)

    this.noticiaService.post(this.noticia).subscribe(data => {
      console.log(data)
    }, error => {
      console.log('Failure Response')
    })
  }
  updateNews(){
    console.log('UPDATE')
    let date = new Date();
    this.noticia.tituloDeLaNoticia = this.tinyForm.get('title').value
    this.noticia.imagenNoticia = this.tinyForm.get('imageURL').value
    this.noticia.contenidoHtml = this.tinyForm.get('content').value
    this.noticia.resumenDeLaNoticia = this.tinyForm.get('summary').value
    this.noticia.fechaPublicacion = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    this.noticia.publicada = 'Y';
    this.noticia.empresa.id=this.seleccionado.id
    console.log(this.noticia.empresa.id)
    this.noticiaService.put(this.idAux,this.noticia).subscribe(data => {
      console.log(data)
    }, error => {
      console.log('Failure Response')
    })
  }
}
