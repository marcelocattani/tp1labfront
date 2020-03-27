import { Empresa } from './empresa';
export interface Noticia{
    id?: number
    tituloDeLaNoticia:string
    resumenDeLaNoticia:string
    imagenNoticia:string
    contenidoHtml:string
    fechaPublicacion:string
    publicada:string
    empresa  ?: Empresa
}