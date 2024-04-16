import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'any',
})
export class AuthService {

  private base_url = "http://localhost:8080/auth";

  constructor(private http : HttpClient, private cookies : CookieService) { }

  login(creds : LoginCreds) {
    const req_url = `${this.base_url}/login`;

    return this.http.post<AuthRes>(req_url, creds, {
      headers : {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
      }
    })
  }

  public setAuthToken(token : string) {
    this.cookies.set("auth_token", token);
  }

  public getAuthToken() : string {
    return this.cookies.get("auth_token");
  }

  public clearAuthToken() {
    this.cookies.delete("auth_token");
  }

  public getAuthUser() {
    const token : string = this.getAuthToken();
    const req_url = `http://localhost:8080/api/getUserInfo`;

    return this.http.get<AuthUser>(req_url, {
      responseType : "json",
      headers : {
        "Authorization" : `Bearer ${token}`
      }
    });

  }

}

export type LoginCreds = {
  email : string,
  password : string
}

export type AuthRes = {
  token : string,
  message : string
}

export type AuthUser = {
  email : string,
  name : string
}
