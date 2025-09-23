import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserProfile } from '../../../core/data/mock-users';
import { PortfolioService } from '../../../core/services/portfolio.service';

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.css',
})
export class PublicProfileComponent implements OnInit {
  user$: Observable<UserProfile | undefined> | undefined;

  private readonly route = inject(ActivatedRoute);
  private readonly portfolioService = inject(PortfolioService);

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.user$ = this.portfolioService.getProfileByUsername(username);
    }
  }
}
