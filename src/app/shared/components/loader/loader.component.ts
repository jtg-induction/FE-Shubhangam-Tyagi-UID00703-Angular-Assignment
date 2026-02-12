import { Component, inject, OnInit } from '@angular/core';
import { LoaderService } from '@core/services/loader-service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements OnInit {
  loading!: boolean;
  loaderService = inject(LoaderService);

  ngOnInit(): void {
    this.loaderService.loading.subscribe(val => {
      this.loading = val;
    });
  }
}
