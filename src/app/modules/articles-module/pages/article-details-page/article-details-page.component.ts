import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '@core/services/article.service';
import { NotificationService } from '@core/services/notification.service';
import { Article } from '@shared/models/article.model';

@Component({
  selector: 'app-article-details-page',
  templateUrl: './article-details-page.component.html',
  styleUrl: './article-details-page.component.scss',
})
export class ArticleDetailsPageComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  articleService = inject(ArticleService);
  notificationService = inject(NotificationService);
  article!: Article;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(val => {
      this.articleService.getArticleById(val.get('id') || '').subscribe({
        next: res => {
          this.article = res;
        },
        error: error => {
          this.notificationService.showErrorSnackBar(error.error.message);
          this.router.navigate(['/dashboard']);
        },
      });
    });
  }
}
