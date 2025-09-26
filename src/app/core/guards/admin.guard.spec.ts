import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { adminGuard } from './admin.guard';
import { AuthService } from '../services/auth.service';
import { UserProfile } from '../data/mock-users';

describe('AdminGuard', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['currentUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access when user is admin', () => {
    const mockAdmin: UserProfile = {
      id: '1',
      username: 'admin',
      email: 'admin@test.com',
      password: 'password',
      fullName: 'Admin User',
      bio: 'Admin bio',
      role: 'ADMIN',
      experiences: [],
      social: { website: '', github: '', linkedin: '', twitter: '' },
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };

    mockAuthService.currentUser.and.returnValue(mockAdmin);

    const result = TestBed.runInInjectionContext(() => adminGuard({} as never, {} as never));

    expect(result).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to dashboard when user is not admin', () => {
    const mockUser: UserProfile = {
      id: '1',
      username: 'user',
      email: 'user@test.com',
      password: 'password',
      fullName: 'Regular User',
      bio: 'User bio',
      role: 'USER',
      experiences: [],
      social: { website: '', github: '', linkedin: '', twitter: '' },
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };

    mockAuthService.currentUser.and.returnValue(mockUser);

    const result = TestBed.runInInjectionContext(() => adminGuard({} as never, {} as never));

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should redirect to dashboard when user is not authenticated', () => {
    mockAuthService.currentUser.and.returnValue(null);

    const result = TestBed.runInInjectionContext(() => adminGuard({} as never, {} as never));

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
