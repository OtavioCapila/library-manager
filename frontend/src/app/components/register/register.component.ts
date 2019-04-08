import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServerService } from 'src/app/shared/server.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _service: ServerService,
    private _router: Router,
    private _toastr: ToastrService
  ) {
    this.registerForm = this._fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      userType: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  onClickGoBack() {
    this._router.navigate(['']);
  }

  onClickIsAdmin(evt) {

    if (evt === true) {
      this.registerForm.controls['userType'].setValue('admin');
    } else {
      this.registerForm.controls['userType'].setValue('user');
    }
  }

  onClickRegister() {
    if (this.registerForm.valid) {
      this._toastr.info('Registrando...', '');
      this._service.register(this.registerForm.value).subscribe(
        accept => {
          this._toastr.success('Registrado com sucesso', '');
          this._router.navigate(['']);

        },
        reject => {
          this._toastr.error('Erro ao Registrar', '');

        }
      );
    } else {
      this._toastr.warning('Preencha todo o formulário!', '');
    }
  }
}
