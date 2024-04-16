import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { catchError, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email : string = "";
  password : string = "";
  message : string = "Login";

  constructor (private auth : AuthService, private router : Router) {}

  async onLogIn() {

    this.message = "Please wait...";

    console.log(this.email);
    console.log(this.password);

    const creds = { email: this.email, password: this.password };
    const req_url = "http://localhost:8080/auth/login";

    this.auth.login(creds).pipe(
      map((res) => {
        this.message = res.message;
        this.auth.setAuthToken(res.token);
        // this.router.navigate(["/user"]);

      }),

      catchError((err: HttpErrorResponse) => {

        if (err.status === 404) {
          this.message = "Account not found";
        } else {
          this.message = "Something went wrong...";
        }

        return this.message;

      })
    ).subscribe();
  }
}
