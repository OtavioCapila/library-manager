import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
@Injectable()
export class TokenService {
  constructor(private _TOKEN: CookieService) {}

  SetCookie(data) {
    this._TOKEN.set("auth_token", data);
  }

  GetCookie() {
    return this._TOKEN.get("auth_token");
  }

  DeleteCookie() {
    this._TOKEN.delete("auth_token");
  }
}
