import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { identifier, password } = this.loginForm.value;

      this.authService.login(identifier, password).subscribe({
        next: (user) => {
          this.isLoading = false;
          if (user) {
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Identifiants incorrects';
          }
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'Erreur de connexion';
        },
      });
    }
  }
}
