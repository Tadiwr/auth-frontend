import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  email : string = "";
  name : string = "";
  password : string = "";

  message : string = "Create Account";

  constructor(private router : Router, private auth : AuthService) {}

  checkEmail(e : string) {
    const regex : RegExp = new  RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
    return regex.test(e);
  }

  onCreateAccount() {

    this.message = "Please wait";
    const creds = {email : this.email, password : this.password, name: this.name};

    this.auth.createAcccount(creds).pipe(
      map((res) => {
        this.auth.setAuthToken(res.token);
        this.router.navigate(["/user"]);
      }),

      catchError((err : HttpErrorResponse) => {

        if (err.status == 404) {
          this.message = "Account Not Found"
        }

        this.message = "Something went wrong";

        return "";
      })
    ).subscribe();
  }
}
