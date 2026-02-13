import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '@core/services/loader-service';

/**
 * Interceptor for intercepting All requests and showing loader
 */
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  loaderService = inject(LoaderService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.hide(); // Show loader on request start
    return next.handle(req).pipe(
      finalize(() => this.loaderService.hide()) // Hide loader on request completion or fail
    );
  }
}
