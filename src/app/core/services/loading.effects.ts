import { Injectable, effect, inject } from '@angular/core';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingEffects {
  private readonly loadingService = inject(LoadingService);

  constructor() {
    effect(() => {
      const isLoading = this.loadingService.isLoading();

      if (isLoading) {
        // Démarrer un timeout pour éviter les loadings infinis
        const timeoutId = setTimeout(() => {
          if (this.loadingService.isLoading()) {
            console.warn('Loading timeout reached, stopping loading...');
            this.loadingService.setLoading(false);
          }
        }, 10000); // 10 secondes de timeout

        return () => clearTimeout(timeoutId);
      }

      return undefined;
    });

    effect(() => {
      const isLoading = this.loadingService.isLoading();

      if (isLoading) {
        console.log('Loading started...');
      } else {
        console.log('Loading finished');
      }
    });
  }
}
