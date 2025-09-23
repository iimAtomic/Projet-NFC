import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { PortfolioService } from '../../core/services/portfolio.service';
import { UserProfile } from '../../core/data/mock-users';
import { InitialsPipe } from '../../shared/pipes/initials.pipe';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, InitialsPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  users: UserProfile[] = [];
  currentUser: UserProfile | null = null;
  isLoading = false;

  private readonly authService = inject(AuthService);
  private readonly portfolioService = inject(PortfolioService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();

    if (!this.currentUser || this.currentUser.role !== 'ADMIN') {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.loadUsers();
  }

  private loadUsers(): void {
    this.isLoading = true;
    this.portfolioService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
      },
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  get totalUsers(): number {
    return this.users?.length || 0;
  }

  get normalUsers(): number {
    return this.users?.filter((u) => u.role === 'USER').length || 0;
  }

  get adminUsers(): number {
    return this.users?.filter((u) => u.role === 'ADMIN').length || 0;
  }
}
