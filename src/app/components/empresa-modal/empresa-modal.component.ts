import { Component, OnInit, ViewChild, ElementRef, Host, Input } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { AbmEmpresaComponent } from '../abm-empresa/abm-empresa.component'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Empresa } from 'src/app/models/empresa';

@Component({
  selector: 'app-empresa-modal',
  templateUrl: './empresa-modal.component.html',
  styleUrls: ['./empresa-modal.component.css']
})
export class EmpresaModalComponent implements OnInit {

  constructor(public empresaService: EmpresaService, @Host() private tabla: AbmEmpresaComponent, private formBuilder: FormBuilder) { }

  @Input() set empresaActual(valor) {
    this.onBuild();
    if (valor) {
      this.empresaOrignal = valor;
      this.edit = true;
      this.formEmpresa.patchValue({
        id: valor.id,
        denominacion: valor.denominacion,
        telefono: valor.telefono,
        horarioDeAtencion: valor.horarioDeAtencion,
        quienesSomos: valor.quienesSomos,
        latitud: valor.latitud,
        longitud: valor.longitud,
        domicilio: valor.domicilio,
        email: valor.email
      });
    }
  }

  @ViewChild('btnClose', { static: true }) btnClose: ElementRef;

  public formEmpresa: FormGroup;
  public empresaOrignal: any;
  public edit = false;
  public isError = false;

  ngOnInit(): void {
    this.onBuild();
  }

  onBuild() {
    this.formEmpresa = this.formBuilder.group({
      id: new FormControl(0),
      denominacion: new FormControl('', Validators.required),
      domicilio: new FormControl('', Validators.required),
      horarioDeAtencion: new FormControl('', Validators.required),
      quienesSomos: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      telefono: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{1,10}')]),
      latitud: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{-300,300}')]),
      longitud: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{-300,300}')])
    });
  }

  onSaveEmpresa(empresaForm: FormGroup): void {

    if (empresaForm.value.id === 0) {
      this.add(empresaForm.value);
    } else {
      this.update(empresaForm.value);
    }
    this.btnClose.nativeElement.click();

  }
  add(empresa: Empresa) {
    this.empresaService.post(empresa).subscribe(
      res => {
        this.tabla.empresas.push(res);
      },
      err => {
        alert('Ocurrió un error al agregar la persona');
      }
    );
  }

  update(empresa: Empresa) {
    this.empresaService.put(empresa.id, empresa).subscribe(
      res => {
        alert('Persona fue actualizada con éxito');
        const cambio = this.tabla.empresas.filter(item => item.id !== empresa.id);
        this.tabla.empresas = cambio;
        this.tabla.empresas.unshift(empresa);
      },
      err => {
        alert('Ocurrió un error al actualizar persona');
      }
    );
  }

  onClose() {
    this.empresaActual = {
      id: 0,
      nombre: '',
      apellido: '',
      dni: null
    };

    this.isError = false;
  }

  onCloseAlert() {
    this.isError = false;
  }
}

