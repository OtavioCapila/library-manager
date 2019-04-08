import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ServerService {
  // BASE_URL = 'https://librarybackend.herokuapp.com/api';
  BASE_URL = 'http://localhost:3000/api';
  constructor(private _HTTP: HttpClient) {}

  login(data): Observable<any> {
    return this._HTTP.post(`${this.BASE_URL}/login`, data);
  }

  register(data): Observable<any> {
    return this._HTTP.post(`${this.BASE_URL}/register`, data);
  }

  getAllBooks(): Observable<any> {
    return this._HTTP.get(`${this.BASE_URL}/books`);
  }

  createBook(data): Observable<any> {
    return this._HTTP.post(`${this.BASE_URL}/books`, data);
  }

  takeBook(book_id): Observable<any> {
    return this._HTTP.put(`${this.BASE_URL}/book/${book_id}`, '');
  }

  returnBook(book_id): Observable<any> {
    return this._HTTP.put(`${this.BASE_URL}/book/return/${book_id}`, '');
  }

  setBookToUser(userId, book_id): Observable<any> {
    const data = {
      client_id: userId,
    };
    return this._HTTP.put(`${this.BASE_URL}/books/user/${book_id}`, data);
  }

  getLoggedUserData(): Observable<any> {
    return this._HTTP.get(`${this.BASE_URL}/profile`);
  }

  getAllUsers(): Observable<any> {
    return this._HTTP.get(`${this.BASE_URL}/users`);
  }
}
