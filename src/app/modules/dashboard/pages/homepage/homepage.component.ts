import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ArticleService } from '@core/services/article.service';
import { NotificationService } from '@core/services/notification.service';
import { Article } from '@shared/models/article.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  articleService: ArticleService = inject(ArticleService);
  articles!: Article[];
  isLoading = false;
  totalArticles?: number;
  pageSize?: number;
  pageIndex?: number;
  router = inject(Router);
  route = inject(ActivatedRoute);
  notificationService = inject(NotificationService);
  searchText?: string;
  destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.pageIndex = +params['page'];
      this.pageSize = +params['pageSize'] || 10; // + converting string to number
      this.searchText = params['search'] || '';
      this.fetchArticles(params);
    });
  }

  onSearch(query: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: query || null },
      queryParamsHandling: 'merge',
    });
  }

  fetchArticles(params: Params) {
    this.articleService
      .getAllArticles(params)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: resp => {
          this.articles = resp?.data;
          this.totalArticles = resp?.totalItems;
          this.pageIndex = resp?.currentPage - 1;
          this.isLoading = false;
        },
        error: error => {
          this.notificationService.showError(error.error.message);
        },
      });
  }

  handlePageChanged(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex + 1;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pageSize: this.pageSize,
        page: this.pageIndex,
      },
      queryParamsHandling: 'merge',
    });
  }
}
