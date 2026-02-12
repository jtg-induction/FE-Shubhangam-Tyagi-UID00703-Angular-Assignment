import { Component, inject, OnInit } from '@angular/core';
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
  isLoading = true;
  router = inject(Router);
  route = inject(ActivatedRoute);
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.fetchArticles(params);
    });
  }

  onSearch(query: string) {
    // Update your URL or call your service directly
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: query },
      queryParamsHandling: 'merge',
    });
  }

  fetchArticles(params: Params) {
    this.articleService.getAllArticles(params).subscribe({
      next: resp => {
        this.articles = resp;
        this.isLoading = false;
      },
      error: error => {
        console.log(error);
      },
    });
  }
}
