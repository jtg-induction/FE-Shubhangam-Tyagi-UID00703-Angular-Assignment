import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '@core/services/article.service';
import { Article } from '@shared/models/article.model';

@Component({
  selector: 'app-article-details-page',
  templateUrl: './article-details-page.component.html',
  styleUrl: './article-details-page.component.scss',
})
export class ArticleDetailsPageComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  articleService = inject(ArticleService);
  article!: Article;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(val => {
      this.articleService.getArticleById(val.get('id') || '').subscribe(res => {
        console.log(res);
        this.article = res;
      });
    });
  }
}
