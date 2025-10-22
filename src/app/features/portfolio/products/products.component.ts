import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../core/data/mock-users';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent {
    @Input() products: Product[] = [];
    @Output() addProduct = new EventEmitter<Product>();
    @Output() removeProduct = new EventEmitter<string>();
    @Output() updateProduct = new EventEmitter<Product>();

    productForm: FormGroup;
    isUploading = false;
    selectedFile: File | null = null;
    previewUrl: string | null = null;

    private readonly fb = inject(FormBuilder);

    constructor() {
        this.productForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            price: ['', [Validators.required, Validators.min(0)]],
            description: [''],
            category: ['']
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

    addNewProduct(): void {
        if (!this.selectedFile || this.productForm.invalid) return;

        this.isUploading = true;

        // Simuler l'upload (dans un vrai projet, vous utiliseriez un service d'upload)
        setTimeout(() => {
            const newProduct: Product = {
                id: this.generateId(),
                name: this.productForm.get('name')?.value,
                price: parseFloat(this.productForm.get('price')?.value),
                imageUrl: this.previewUrl || '',
                description: this.productForm.get('description')?.value || '',
                category: this.productForm.get('category')?.value || '',
                createdAt: new Date().toISOString()
            };

            this.addProduct.emit(newProduct);
            this.resetForm();
            this.isUploading = false;
        }, 1000);
    }

    removeProductFromList(productId: string): void {
        this.removeProduct.emit(productId);
    }

    updateProductInfo(product: Product): void {
        this.updateProduct.emit(product);
    }

    private resetForm(): void {
        this.productForm.reset();
        this.selectedFile = null;
        this.previewUrl = null;

        // Reset file input
        const fileInput = document.getElementById('productImageFile') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    }

    private generateId(): string {
        return 'prod_' + Math.random().toString(36).substr(2, 9);
    }

    formatDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString('fr-FR');
    }

    formatPrice(price: number): string {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    }
}
