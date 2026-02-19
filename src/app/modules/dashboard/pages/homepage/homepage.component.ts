import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ArticleService } from '@core/services/article.service';
import { NotificationService } from '@core/services/notification.service';
import { Article } from '@shared/models/article.model';
import { PaginatorData } from '@shared/models/paginator.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  articleService: ArticleService = inject(ArticleService);
  articles!: Article[];
  isLoading = true;
  paginatorData!: PaginatorData;
  router = inject(Router);
  route = inject(ActivatedRoute);
  notificationService = inject(NotificationService);
  searchText?: string;
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.fetchArticles();
  }

  onSearch(query: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: query || null },
      queryParamsHandling: 'merge',
    });
  }

  fetchFilteredArticles(params: Params) {
    this.articleService.getAllArticles(params).subscribe({
      next: resp => {
        this.articles = resp?.data;
        this.paginatorData.totalArticles = resp?.totalItems;
        this.paginatorData.pageIndex = resp?.currentPage - 1;
        this.isLoading = false;
      },
      error: error => {
        this.notificationService.showError(error.error.message, 5000);
      },
    });
  }

  handlePageChanged(pageEvent: PageEvent) {
    this.paginatorData.pageSize = pageEvent.pageSize;
    const pageNum = pageEvent.pageIndex + 1;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pageSize: this.paginatorData.pageSize,
        page: pageNum,
      },
      queryParamsHandling: 'merge',
    });
  }

  fetchArticles() {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.paginatorData = {
        totalArticles: this.paginatorData?.totalArticles || 0, // Preserve total if it exists
        pageIndex: (+params['page'] || 1) - 1,
        pageSize: +params['pageSize'] || 10,
      };
      this.searchText = params['search'] || '';
      this.fetchFilteredArticles(params);
    });
  }
}
