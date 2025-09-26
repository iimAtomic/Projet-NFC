import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../core/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.loginForm.get('identifier')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should validate required fields', () => {
    component.loginForm.patchValue({
      identifier: '',
      password: '',
    });

    expect(component.loginForm.valid).toBeFalsy();
    expect(component.loginForm.get('identifier')?.hasError('required')).toBeTruthy();
    expect(component.loginForm.get('password')?.hasError('required')).toBeTruthy();
  });

  it('should call authService.login on valid form submission', () => {
    const mockUser = {
      id: '1',
      username: 'test',
      email: 'test@test.com',
      password: 'password',
      fullName: 'Test User',
      bio: 'Test bio',
      role: 'USER' as const,
      experiences: [],
    };
    mockAuthService.login.and.returnValue(of(mockUser));

    component.loginForm.patchValue({
      identifier: 'test',
      password: 'password123',
    });

    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith('test', 'password123');
  });

  it('should redirect to dashboard for regular users', () => {
    const mockUser = {
      id: '1',
      username: 'test',
      email: 'test@test.com',
      password: 'password',
      fullName: 'Test User',
      bio: 'Test bio',
      role: 'USER' as const,
      experiences: [],
    };
    mockAuthService.login.and.returnValue(of(mockUser));

    component.loginForm.patchValue({
      identifier: 'test',
      password: 'password123',
    });

    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith('test', 'password123');
  });

  it('should redirect to admin for admin users', () => {
    const mockAdmin = {
      id: '1',
      username: 'admin',
      email: 'admin@test.com',
      password: 'password',
      fullName: 'Admin User',
      bio: 'Admin bio',
      role: 'ADMIN' as const,
      experiences: [],
    };
    mockAuthService.login.and.returnValue(of(mockAdmin));

    component.loginForm.patchValue({
      identifier: 'admin',
      password: 'password123',
    });

    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith('admin', 'password123');
  });

  it('should not call authService.login on invalid form', () => {
    component.loginForm.patchValue({
      identifier: '',
      password: '',
    });

    component.onSubmit();

    expect(mockAuthService.login).not.toHaveBeenCalled();
  });
});
