import { Component } from '@angular/core';
import { Article, Root } from '../../modelli/models';
import { NewsService } from '../../service/news.service';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {

  articoli: Article[] = []
  query: string = ''
  message = false

  constructor(private ns: NewsService, private as: AuthService, private router: Router) { }


  getArticoli() {
    if (this.query.trim()) {
      this.ns.getArticles(this.query).subscribe({
        next: (data: Root) => {
          this.articoli = data.articles
        },
        error: (error) => {
          this.message = true
          this.query = ''
          console.log(error)
        }
      })
    }
  }


  logout() {
    this.as.logout()
    this.router.navigate([''])
  }
}



