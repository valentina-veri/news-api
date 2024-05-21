import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginDTO } from '../../modelli/auth';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model:LoginDTO = new LoginDTO()
  errorMessage = ''

  constructor(private as: AuthService, private router: Router) { }

  login() {
    this.as.login(this.model).pipe(catchError((err: HttpErrorResponse) => {
      this.errorMessage = err.error
      return of(undefined)
    })
    )
      .subscribe(user => {
        if (user) {
          this.as.getLoggedUser()
          this.model = new LoginDTO
          this.router.navigate(["/news"])
        }
      })
  }
}
