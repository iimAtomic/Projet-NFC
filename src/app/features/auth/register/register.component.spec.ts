import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../../core/services/auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.registerForm.get('username')?.value).toBe('');
    expect(component.registerForm.get('email')?.value).toBe('');
    expect(component.registerForm.get('password')?.value).toBe('');
    expect(component.registerForm.get('confirmPassword')?.value).toBe('');
    expect(component.registerForm.get('fullName')?.value).toBe('');
  });

  it('should validate required fields', () => {
    component.registerForm.patchValue({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
    });

    expect(component.registerForm.valid).toBeFalsy();
    expect(component.registerForm.get('username')?.hasError('required')).toBeTruthy();
    expect(component.registerForm.get('email')?.hasError('required')).toBeTruthy();
    expect(component.registerForm.get('password')?.hasError('required')).toBeTruthy();
    expect(component.registerForm.get('confirmPassword')?.hasError('required')).toBeTruthy();
    expect(component.registerForm.get('fullName')?.hasError('required')).toBeTruthy();
  });

  it('should validate email format', () => {
    component.registerForm.patchValue({
      username: 'testuser',
      email: 'invalid-email',
      password: 'password123',
      confirmPassword: 'password123',
      fullName: 'Test User',
    });

    expect(component.registerForm.get('email')?.hasError('email')).toBeTruthy();
  });

  it('should validate password minimum length', () => {
    component.registerForm.patchValue({
      username: 'testuser',
      email: 'test@test.com',
      password: '123',
      confirmPassword: '123',
      fullName: 'Test User',
    });

    expect(component.registerForm.get('password')?.hasError('minlength')).toBeTruthy();
  });

  it('should call authService.register on valid form submission', () => {
    const mockUser = {
      id: '1',
      username: 'testuser',
      email: 'test@test.com',
      password: 'password123',
      fullName: 'Test User',
      bio: 'Test bio',
      role: 'USER' as const,
      experiences: [],
      social: { website: '', github: '', linkedin: '', twitter: '' },
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };

    mockAuthService.register.and.returnValue(of(mockUser));

    component.registerForm.patchValue({
      username: 'testuser',
      email: 'test@test.com',
      password: 'password123',
      confirmPassword: 'password123',
      fullName: 'Test User',
    });

    component.onSubmit();

    expect(mockAuthService.register).toHaveBeenCalledWith(
      jasmine.objectContaining({
        username: 'testuser',
        email: 'test@test.com',
        password: 'password123',
        fullName: 'Test User',
      }),
    );
  });

  it('should not call authService.register on invalid form', () => {
    component.registerForm.patchValue({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
    });

    component.onSubmit();

    expect(mockAuthService.register).not.toHaveBeenCalled();
  });

  it('should handle registration success', () => {
    const mockUser = {
      id: '1',
      username: 'testuser',
      email: 'test@test.com',
      password: 'password123',
      fullName: 'Test User',
      bio: 'Test bio',
      role: 'USER' as const,
      experiences: [],
      social: { website: '', github: '', linkedin: '', twitter: '' },
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };

    mockAuthService.register.and.returnValue(of(mockUser));

    component.registerForm.patchValue({
      username: 'testuser',
      email: 'test@test.com',
      password: 'password123',
      confirmPassword: 'password123',
      fullName: 'Test User',
    });

    component.onSubmit();

    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBe('');
  });

  it('should handle registration error', () => {
    mockAuthService.register.and.returnValue(of(null));

    component.registerForm.patchValue({
      username: 'testuser',
      email: 'test@test.com',
      password: 'password123',
      confirmPassword: 'password123',
      fullName: 'Test User',
    });

    component.onSubmit();

    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBe(
      "Erreur lors de la création du compte. Vérifiez que le nom d'utilisateur et l'email ne sont pas déjà utilisés.",
    );
  });
});
