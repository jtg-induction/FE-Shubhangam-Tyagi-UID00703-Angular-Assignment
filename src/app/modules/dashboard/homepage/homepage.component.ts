import { Component, inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ArticleService } from '@core/services/article.service';
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
  pageSize = 10;
  pageIndex = 0;
  router = inject(Router);
  route = inject(ActivatedRoute);
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pageIndex = +params['pageIndex'] || 1;
      this.pageSize = +params['pageSize'] || 10;
      this.fetchArticles(params);
    });
  }

  onSearch(query: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: query },
      queryParamsHandling: 'merge',
    });
  }

  fetchArticles(params: Params) {
    this.articleService.getAllArticles(params).subscribe({
      next: resp => {
        // console.log(resp.totalItems);
        this.articles = resp.data;
        this.totalArticles = resp?.totalItems;
        this.isLoading = false;
      },
      error: error => {
        console.log(error);
      },
    });
  }

  handlePageChanged(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pageSize: this.pageSize,
        page: this.pageIndex + 1,
      },
      queryParamsHandling: 'merge',
    });
  }
}
