import { Component } from '@angular/core';
import { AuthService, AuthUser } from '../auth.service';
import axios from "axios";
import { catchError, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-user-info',
  standalone: true,
  imports: [],
  templateUrl: './get-user-info.component.html',
  styleUrl: './get-user-info.component.css'
})
export class GetUserInfoComponent {

  user : AuthUser | null = null;
  state : ScreenState = "loading";

  constructor(private auth : AuthService, private router : Router) {}

  async ngOnInit() {
    this.auth.getAuthUser()
    .pipe(
      map((res) => {
        this.user = res;
        this.state = "success";
      }),

      catchError((err : HttpErrorResponse) => {
        this.user = {email : err.message, name : err.status.toString()}
        this.state = "error";

        if(this.auth.getAuthToken() === "") {
          this.router.navigate(["/login"]);
        }

        return "";
      })
    ).subscribe();
  }

  logout() {
    this.auth.clearAuthToken();
    this.router.navigate(["/login"]);
  }

}

export type ScreenState = "loading" | "success" | "error";
