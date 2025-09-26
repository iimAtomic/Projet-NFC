import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    this.registerForm = this.fb.group(
      {
        username: [
          '',
          [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]+$/)],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        fullName: ['', [Validators.required, Validators.minLength(2)]],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { username, email, password, fullName } = this.registerForm.value;

      this.authService
        .register({
          username: username!,
          email: email!,
          password: password!,
          fullName: fullName!,
          bio: '', // Bio par défaut vide
        })
        .subscribe({
          next: (user) => {
            this.isLoading = false;
            if (user) {
              this.successMessage = 'Compte créé avec succès ! Redirection...';
              setTimeout(() => {
                this.router.navigate(['/dashboard']);
              }, 2000);
            } else {
              this.errorMessage =
                "Erreur lors de la création du compte. Vérifiez que le nom d'utilisateur et l'email ne sont pas déjà utilisés.";
            }
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = error.message || 'Erreur lors de la création du compte';
          },
        });
    }
  }
}
