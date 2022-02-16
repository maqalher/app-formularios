import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { nombreApellidoPattern, emailPattern, noPuedeSerStrider } from '../../../shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  // nombreApellidoPattern:string = '([a-zA-Z]+) ([a-zA-Z]+)';



  miFormulario: FormGroup = this.fb.group({
    // nombre: ['', [Validators.required, Validators.pattern(this.nombreApellidoPattern)]],
    // desde vaidaciones.ts
    // nombre: ['', [Validators.required, Validators.pattern(nombreApellidoPattern)]],
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator] ],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    validators: [ this.validatorService.camposIguales('password', 'password2')]
  })

  get emailErrorMsg(): string {

    const errors = this.miFormulario.get('email')?.errors;

    if(errors?.required){
      return 'El email es obligatorio';
    }else if(errors?.pattern){
      return 'El formato del email es invalido';
    }else if(errors?.emailTomado){
      return 'El email ya existe';
    }

    return '';
  }

  constructor(
    private fb:FormBuilder,
    private validatorService:ValidatorService,
    private emailValidator:EmailValidatorService
  ) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Alan Maqueda',
      email: 'test1@test.com',
      username: 'maqalher',
    })

  }

  campoNoValido(campo:string) {
    return this.miFormulario.get(campo)?.invalid
          && this.miFormulario.get(campo)?.touched;
  }

  // emailRequired() {
  //   return this.miFormulario.get('email')?.errors?.required && this.miFormulario.get('email')?.touched;
  // }

  // emailFormato() {
  //   return this.miFormulario.get('email')?.errors?.pattern && this.miFormulario.get('email')?.touched;
  // }

  // emailTomado() {
  //   return this.miFormulario.get('email')?.errors?.emailTomado && this.miFormulario.get('email')?.touched;
  // }

  submitFormulario(){
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }

}

