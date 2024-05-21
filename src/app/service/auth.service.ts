import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoggedUser, LoginDTO, RegisterDTO } from '../modelli/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  
  register(model: RegisterDTO) {
    return this.http.post<LoggedUser>('http://localhost:3000/users/register', model)
  }

  login(model: LoginDTO): Observable<LoggedUser> {
    return this.http.post<LoggedUser>('http://localhost:3000/login', model).pipe(tap(user => this.setLoggedUser(user)))
  }

  setLoggedUser(user: LoggedUser) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  getLoggedUser(): LoggedUser | null {
    const loggedUser = localStorage.getItem('user')
    if (loggedUser) {
      return JSON.parse(loggedUser) as LoggedUser
    }
    return null
  }

logout(){
  localStorage.removeItem('user')
}

}
