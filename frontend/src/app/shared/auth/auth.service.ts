import { TokenService } from 'src/app/shared/token.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthService {

  constructor(private _token: TokenService, private _router: Router) { }

  isAuthenticated() {
    const token = this._token.GetCookie();
    if (token) {
      return true;
    } else {
      this._router.navigate(['']);
      return false;
    }
  }
}
