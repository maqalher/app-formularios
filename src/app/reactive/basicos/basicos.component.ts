import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit{

  // miFormulario: FormGroup = new FormGroup({
  //   nombre: new FormControl('RTX 4080ti'),
  //   precio: new FormControl(1500),
  //   existencias: new FormControl(5),
  // })

  miFormulario: FormGroup = this.fb.group({
    // [valor campo, validador sincrono, validador asincrono]
    nombre     : [, [Validators.required, Validators.minLength(3)]],
    precio     : [, [Validators.required, Validators.min(0)]],
    existencias: [, [Validators.required, Validators.min(0)]],
  })

  constructor( private fb:FormBuilder ) { }

  ngOnInit(): void {

    // cuando de dese inicializar el formulario con valores default
    // setValue: necesita todos los parametros
    // this.miFormulario.setValue({
    //   nombre: 'RTX 8556',
    //   precio: 0,
    //   existencias: 0
    // })
    this.miFormulario.reset({
      nombre: 'RTX 8556',
      precio: 0,
    })
  }

  campoEsValido( campo:string ) {
    // return this.miFormulario.controls.nombre.errors
    //     && this.miFormulario.controls.nombre.touched;
    return this.miFormulario.controls[campo].errors
        && this.miFormulario.controls[campo].touched;
  }

  guardar(){

    if(this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

}
