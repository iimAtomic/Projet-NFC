import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GalleryImage } from '../../../core/data/mock-users';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  @Input() images: GalleryImage[] = [];
  @Output() addImage = new EventEmitter<GalleryImage>();
  @Output() removeImage = new EventEmitter<string>();
  @Output() updateImage = new EventEmitter<GalleryImage>();

  imageForm: FormGroup;
  isUploading = false;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  private readonly fb = inject(FormBuilder);

  constructor() {
    this.imageForm = this.fb.group({
      title: [''],
      description: ['']
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      
      // Créer une URL de prévisualisation
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadImage(): void {
    if (!this.selectedFile) return;

    this.isUploading = true;

    // Simuler l'upload (dans un vrai projet, vous utiliseriez un service d'upload)
    setTimeout(() => {
      const newImage: GalleryImage = {
        id: this.generateId(),
        url: this.previewUrl || '',
        title: this.imageForm.get('title')?.value || '',
        description: this.imageForm.get('description')?.value || '',
        uploadedAt: new Date().toISOString()
      };

      this.addImage.emit(newImage);
      this.resetForm();
      this.isUploading = false;
    }, 1000);
  }

  removeImageFromGallery(imageId: string): void {
    this.removeImage.emit(imageId);
  }

  updateImageInfo(image: GalleryImage): void {
    this.updateImage.emit(image);
  }

  private resetForm(): void {
    this.imageForm.reset();
    this.selectedFile = null;
    this.previewUrl = null;
    
    // Reset file input
    const fileInput = document.getElementById('imageFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  private generateId(): string {
    return 'img_' + Math.random().toString(36).substr(2, 9);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR');
  }
}
