import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ServerService } from 'src/app/shared/server.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private _FB: FormBuilder,
    private _service: ServerService,
    private _router: Router,
    private _toastr: ToastrService,
    private _token: TokenService
  ) {
    this.loginForm = this._FB.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  onClickLogin() {
    if (this.loginForm.valid) {
      this._toastr.info('Autenticando...', '');
      this._service.login(this.loginForm.value).subscribe(
        accept => {
          this._toastr.success('Logado com sucesso', '');
          this._token.SetCookie(accept.token);

          this._router.navigate(['inicio']);
        },
        reject => {
          if (reject.error.message === 'User not registered') {
            this._toastr.error('Usuário não cadastrado', '');
          } else {
            this._toastr.error('Falha ao logar', '');
          }

        }
      );
    } else {
      this._toastr.warning('Preencha todo o formulário!', '');
    }
  }

  onClickRegister() {
    this._router.navigate(['registro']);
  }
}
