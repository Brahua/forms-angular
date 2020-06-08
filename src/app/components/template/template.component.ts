import { Component, OnInit } from '@angular/core';
import { PaisService } from 'src/app/core/services/pais.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  usuario: any = {

  };
  paises: any[] = [];
  formSubmitted: boolean;
  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
      .subscribe(paises => {
        this.paises = paises;
        this.paises.unshift({ nombre: 'Seleccione un país', codigo: '' });
      });
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach(control => control.markAsTouched());
      return;
    }

    this.formSubmitted = true;
  }

}
