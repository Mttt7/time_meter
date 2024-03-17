import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(): void {
    this.http.get('http://localhost:3000/api/v1/auth').subscribe((res: any) => {
      window.location.href = res.url;

    });
  }

  isUserLogged() {
    return this.http.get('http://localhost:3000/api/v1/auth/isUserLogged');
  }
}
