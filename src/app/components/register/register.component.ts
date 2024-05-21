import { Component } from '@angular/core';
import { RegisterDTO } from '../../modelli/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: RegisterDTO = new RegisterDTO()
  errorMessage = ''

  constructor(private as: AuthService, private router: Router) { }

  register() {
    this.as.register(this.model).pipe(catchError((err: HttpErrorResponse) => {
      this.errorMessage = err.error
      return of(undefined)
    })
    )
      .subscribe(user => {
        if (user) {
          this.model = new RegisterDTO
          this.router.navigate(["/login"])
        }
      })
  }
}

