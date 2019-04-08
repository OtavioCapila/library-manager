import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _router: Router,private _token:TokenService) { }

  ngOnInit() {
  }

  onClickLogout(){
    this._token.DeleteCookie();
    this._router.navigate(['']);
  }

}
