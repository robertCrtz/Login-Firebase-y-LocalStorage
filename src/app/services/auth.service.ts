import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModels } from '../models/usuario.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = 'AIzaSyBDEJEtvuOFHDzU9pZMh5k7aeRcsbafqhA';
  private url = 'https://identitytoolkit.googleapis.com/v1/';

  userToken: string;

  constructor(private http: HttpClient) {
    this.leerToken();
   }

  logout(){
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModels){
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}accounts:signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map( resp => {
        this.guardarToken( resp['idToken']);
        return resp;
      })
    );
  }


  nuevoUsuario(usuario: UsuarioModels){
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}accounts:signUp?key=${this.apiKey}`,
      authData
    ).pipe(
      map( resp => {
        this.guardarToken( resp['idToken']);
        return resp;
      })
    );
  }


  private guardarToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken(){
    if (localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado(): boolean {
    return this.userToken.length > 2;
  }

}

