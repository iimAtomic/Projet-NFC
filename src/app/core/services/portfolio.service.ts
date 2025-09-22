import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { USERS, UserProfile } from '../data/mock-users';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  getAllUsers(): Observable<UserProfile[]> {
    return of(USERS).pipe(delay(500));
  }

  getProfileByUsername(username: string): Observable<UserProfile | undefined> {
    return of(USERS).pipe(
      delay(500),
      map((list) => list.find((u) => u.username.toLowerCase() === username.toLowerCase()))
    );
  }
}


