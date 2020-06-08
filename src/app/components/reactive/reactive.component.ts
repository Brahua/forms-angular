import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from 'src/app/core/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {

  formReactive: FormGroup;
  formSubmitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private validadorService: ValidadoresService
  ) {
    this.crearForm();
    // this.cargarDataAlFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  crearForm() {
    this.formReactive = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this.validadorService.noHerrera]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', Validators.required, this.validadorService.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.formBuilder.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos: this.formBuilder.array([])
    }, {
      validators: this.validadorService.passwordsIguales('pass1', 'pass2')
    });
  }

  get pasatiempos() {
    return this.formReactive.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return this.formReactive.get('nombre').invalid && this.formReactive.get('nombre').touched;
  }

  get apellidoNoValido() {
    return this.formReactive.get('apellido').invalid && this.formReactive.get('apellido').touched;
  }

  get correoNoValido() {
    return this.formReactive.get('correo').invalid && this.formReactive.get('correo').touched;
  }

  get usuarioNoValido() {
    return this.formReactive.get('usuario').invalid && this.formReactive.get('usuario').touched;
  }

  get distritoNoValido() {
    return this.formReactive.get('direccion.distrito').invalid && this.formReactive.get('direccion.distrito').touched;
  }

  get ciudadNoValido() {
    return this.formReactive.get('direccion.ciudad').invalid && this.formReactive.get('direccion.ciudad').touched;
  }

  get pass1NoValido() {
    return this.formReactive.get('pass1').invalid && this.formReactive.get('pass1').touched;
  }

  get pass2NoValido() {
    const pass1 = this.formReactive.get('pass1').value;
    const pass2 = this.formReactive.get('pass2').value;

    return (pass1 === pass2) ? false : true;
  }

  crearListeners() {
    // this.forma.valueChanges.subscribe( valor => {
    //   console.log(valor);
    // });

    // this.forma.statusChanges.subscribe( status => console.log({ status }));
    this.formReactive.get('nombre').valueChanges.subscribe(console.log);
  }

  cargarDataAlFormulario() {
    // this.forma.setValue({
    this.formReactive.reset({
      nombre: 'Josue',
      apellido: 'Bravo',
      correo: 'josue@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        distrito: 'Ontario',
        ciudad: 'Ottawa'
      },
    });
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.formBuilder.control(''));
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    if (this.formReactive.invalid) {
      return Object.values(this.formReactive.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control2 => control2.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }

    this.formSubmitted = true;

    /*this.formReactive.reset({
      nombre: 'Sin nombre'
    });*/
  }

}
