import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatChip } from '@angular/material/chips';
import { ArticlesModuleRoutingModule } from './articles-module-routing.module';
import { ArticleDetailsPageComponent } from './pages/article-details-page/article-details-page.component';

@NgModule({
  declarations: [ArticleDetailsPageComponent],
  imports: [CommonModule, ArticlesModuleRoutingModule, MatChip],
})
export class ArticlesModuleModule {}
