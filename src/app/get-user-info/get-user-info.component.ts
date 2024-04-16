import { Component } from '@angular/core';
import { AuthService, AuthUser } from '../auth.service';
import axios from "axios";
import { catchError, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-get-user-info',
  standalone: true,
  imports: [],
  templateUrl: './get-user-info.component.html',
  styleUrl: './get-user-info.component.css'
})
export class GetUserInfoComponent {

  user : AuthUser | null = null;

  constructor(private auth : AuthService) {}

  async ngOnInit() {
    this.auth.getAuthUser()
    .pipe(
      map((res) => {
        this.user = res;
      }),

      catchError((err : HttpErrorResponse) => {
        this.user = {email : err.message, name : err.status.toString()}
        return "";
      })
    ).subscribe();
  }

}
