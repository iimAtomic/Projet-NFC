import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserProfile, Experience } from '../../core/data/mock-users';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: UserProfile | null = null;
  isSaving = false;
  saveMessage = '';

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      bio: ['', [Validators.required, Validators.minLength(10)]],
      photoUrl: [''],
      social: this.fb.group({
        website: [''],
        github: [''],
        linkedin: [''],
        twitter: [''],
      }),
      experiences: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();
    if (this.currentUser) {
      this.loadUserData();
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  get experiencesFormArray(): FormArray {
    return this.profileForm.get('experiences') as FormArray;
  }

  private loadUserData(): void {
    if (this.currentUser) {
      this.profileForm.patchValue({
        fullName: this.currentUser.fullName,
        bio: this.currentUser.bio,
        photoUrl: this.currentUser.photoUrl || '',
        social: {
          website: this.currentUser.social?.website || '',
          github: this.currentUser.social?.github || '',
          linkedin: this.currentUser.social?.linkedin || '',
          twitter: this.currentUser.social?.twitter || '',
        },
      });

      // Load experiences
      this.experiencesFormArray.clear();
      if (this.currentUser.experiences) {
        this.currentUser.experiences.forEach((exp) => {
          this.addExperience(exp);
        });
      }
    }
  }

  addExperience(experience?: Experience): void {
    const experienceForm = this.fb.group({
      company: [experience?.company || '', [Validators.required]],
      role: [experience?.role || '', [Validators.required]],
      startDate: [experience?.startDate || '', [Validators.required]],
      endDate: [experience?.endDate || ''],
      description: [experience?.description || '', [Validators.required]],
    });

    this.experiencesFormArray.push(experienceForm);
  }

  removeExperience(index: number): void {
    this.experiencesFormArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isSaving = true;
      this.saveMessage = '';

      const formData = this.profileForm.value;

      // Préparer les données pour la sauvegarde
      const updates = {
        fullName: formData.fullName,
        bio: formData.bio,
        photoUrl: formData.photoUrl,
        social: formData.social,
        experiences: formData.experiences,
      };

      this.authService.updateProfile(updates).subscribe({
        next: (updatedUser) => {
          this.isSaving = false;
          if (updatedUser) {
            this.saveMessage = 'Profil sauvegardé avec succès !';
            this.currentUser = updatedUser;

            setTimeout(() => {
              this.saveMessage = '';
            }, 3000);
          } else {
            this.saveMessage = 'Erreur lors de la sauvegarde';
          }
        },
        error: (error) => {
          this.isSaving = false;
          this.saveMessage = 'Erreur lors de la sauvegarde';
          console.error('Erreur de sauvegarde:', error);
        },
      });
    }
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  /**
   * Obtient l'URL du profil public
   */
  getPublicProfileUrl(): string {
    return this.currentUser ? `/p/${this.currentUser.username}` : '';
  }

  /**
   * Ouvre le profil public dans un nouvel onglet
   */
  viewPublicProfile(): void {
    if (this.currentUser) {
      window.open(this.getPublicProfileUrl(), '_blank');
    }
  }
}
