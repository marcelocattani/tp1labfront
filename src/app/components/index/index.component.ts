import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public empresas: Empresa[];

  constructor(private empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.empresaService.getAll().subscribe(data => {
      this.empresas = data;
    })
  }

}
