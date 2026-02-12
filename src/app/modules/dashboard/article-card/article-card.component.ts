import { Component, Input } from '@angular/core';
import { Article } from '@shared/models/article.model';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
})
export class ArticleCardComponent {
  @Input() article!: Article;

  handleArticleClick(article: Article) {
    // Handle here for viewing article detail of clicked article
    console.log(article);
  }
}
