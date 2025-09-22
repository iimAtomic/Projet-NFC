import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private _isLoading = signal(false);

  get isLoading() {
    return this._isLoading.asReadonly();
  }

  setLoading(loading: boolean): void {
    this._isLoading.set(loading);
  }
}
