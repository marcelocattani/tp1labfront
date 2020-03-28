import { Component, OnInit } from '@angular/core';
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
  titleNews:string
  srcImg:string
  content:string
  summary:string
  idEnterprise:number
  empresas:Empresa[]

  noticia: Noticia={
    id: 0,
    tituloDeLaNoticia: '',
    resumenDeLaNoticia: '',
    imagenNoticia: '',
    contenidoHtml: '',
    fechaPublicacion: '',
    publicada: '',
    empresa: {
      id:0,
      denominacion:'',
      telefono:'',
      latitud:0,
      longitud:0,
      email:'',
      quienesSomos:'',
      domicilio:'',
      horarioDeAtencion:''
    }

  }
  constructor(private noticiaService: NoticiaService, private empresaService:EmpresaService, private router: Router, private ruta: ActivatedRoute) {
    this.getAllEnterprise()
    this.load();

  }
  getAllEnterprise(){
    this.empresaService.getAll().subscribe(res=>{
      this.empresas=res;
    }, error => {
      console.log('Failure Response (getAllEnterprise)')
    })
  }
  load() {
    this.ruta.params.subscribe(params => {
      if(params['id']==0){
        this.idAux=0;
        this.loadAtributes(this.noticia);
        return;
      }
      this.noticiaService.getOne(params['id']).subscribe(data => {
        this.idAux=params['id']
        this.loadAtributes(data)
      }, error => {
        console.log('Failure Response (getOne News)')
      })

    })
  }

loadAtributes(data:Noticia){
this.titleNews=data.tituloDeLaNoticia
this.srcImg=data.imagenNoticia
this.noticia.empresa=data.empresa
this.content=data.contenidoHtml
this.summary=data.resumenDeLaNoticia
}
mostrar(algo:any){
  console.log('mostrar')
  console.log(algo)
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

prepareNews(){
  let date = new Date();
    this.noticia.tituloDeLaNoticia = this.titleNews
    this.noticia.contenidoHtml =this.content
    this.noticia.resumenDeLaNoticia = this.summary
    this.noticia.imagenNoticia=this.srcImg
    this.noticia.fechaPublicacion = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    this.noticia.publicada = 'Y';
    this.noticia.empresa.id=this.idEnterprise
    console.log(this.noticia)
}
  saveNews(){
    this.prepareNews();
    this.noticiaService.post(this.noticia).subscribe(data => {
      this.router.navigate(['abmnoticias'])
    }, error => {
      console.log('Failure Response (saveNews)')
    })
   
  }
  updateNews(){
    this.prepareNews();
    this.noticiaService.put(this.idAux,this.noticia).subscribe(data => {
      this.router.navigate(['abmnoticias'])
    }, error => {
      console.log('Failure Response (updateNews)')
    })

  }

}
