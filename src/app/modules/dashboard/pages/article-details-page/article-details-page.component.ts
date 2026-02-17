import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(val => {
      this.articleService
        .getArticleById(val.get('id') || '')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: res => {
            this.article = res;
          },
          error: error => {
            if (error.status !== 401) {
              this.notificationService.showError(error.error.message);
              this.router.navigate(['/dashboard']);
            }
          },
        });
    });
  }
}
