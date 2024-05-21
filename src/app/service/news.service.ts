import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article, Root } from '../modelli/models';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiKey = 'fcdf7ea0564c4ea6a5b96c35ea98147b'

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      "Authorization": this.apiKey
    })
  }

  getArticles(query: string): Observable<Root> {
   
    return this.http.get<Root>('https://newsapi.org/v2/everything?q=' + query, this.httpOptions)
  }
}


