import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth_url = "http://locahost:8080/auth";
  private auth_token_cookie_name = "auth_token";

  constructor(private cookies : CookieService, private router : Router) { }

  async login(creds: LoginCreds) : Promise<string> {
    const req_url = `${this.auth_url}/login`;

    try {
      const res = await fetch(req_url, {
        method : "POST",
        body : JSON.stringify(creds)
      });

      const login_res = await res.json() as LoginResBody;
      if (res.status == 200) {
        this.setAuthTokenCookie(login_res.token);
      }

      this.router.navigate(["/user"]);
      return login_res.message;

    } catch (error) {
      return "Something went wrong!";
    }

  }

  async createAccount(creds: CreateAccountCreds) : Promise<string> {
    const req_url = `${this.auth_url}/create/account`;

    try {
      const res = await fetch(req_url, {
        method : "POST",
        body : JSON.stringify(creds)
      });

      const login_res = await res.json() as LoginResBody;
      if (res.status == 200) {
        this.setAuthTokenCookie(login_res.token);
      }

      this.router.navigate(["/user"]);
      return login_res.message;

    } catch (error) {
      return "Something went wrong!";
    }

  }

  async logout() {
    this.deleteAuthCookie();
    this.router.navigate([""]);
  }

  private setAuthTokenCookie(token : string) {
    this.cookies.set(this.auth_token_cookie_name, token, {
      expires : 1
    })
  }

  private getAuthTokenCookie() {
    return this.cookies.get(this.auth_token_cookie_name) ?? "";
  }

  private deleteAuthCookie() {
    this.cookies.delete(this.auth_token_cookie_name, )
  }

  async getAuthUser() {
    const token : string = this.getAuthTokenCookie();

    if (token != "") {
      const req_url = `http://locahost:8080/api/getUserInfo`;

      const res = await fetch(req_url, {
        headers : {
          "Authorization" : `Bearer X ${token}`
        }
      })
    }
  }


}

export type LoginCreds = {
  email : string,
  password : string
}

export type LoginResBody = {
  token : string,
  message : string
}

export type CreateAccountCreds = LoginCreds & {
  name : string
}
