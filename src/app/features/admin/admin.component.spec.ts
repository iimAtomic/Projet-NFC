import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AdminComponent } from './admin.component';
import { AuthService } from '../../core/services/auth.service';
import { PortfolioService } from '../../core/services/portfolio.service';
import { UserStorageService } from '../../core/services/user-storage.service';
import { UserProfile } from '../../core/data/mock-users';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockPortfolioService: jasmine.SpyObj<PortfolioService>;
  let mockUserStorageService: jasmine.SpyObj<UserStorageService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockAdmin: UserProfile = {
    id: 'admin-1',
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

  const mockUsers: UserProfile[] = [
    {
      id: 'user-1',
      username: 'user1',
      email: 'user1@test.com',
      password: 'password',
      fullName: 'User One',
      bio: 'User bio',
      role: 'USER',
      experiences: [],
      social: { website: '', github: '', linkedin: '', twitter: '' },
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    },
    mockAdmin,
  ];

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['currentUser', 'logout']);
    const portfolioServiceSpy = jasmine.createSpyObj('PortfolioService', ['getAllUsers']);
    const userStorageServiceSpy = jasmine.createSpyObj('UserStorageService', ['deleteUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AdminComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: PortfolioService, useValue: portfolioServiceSpy },
        { provide: UserStorageService, useValue: userStorageServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockPortfolioService = TestBed.inject(PortfolioService) as jasmine.SpyObj<PortfolioService>;
    mockUserStorageService = TestBed.inject(
      UserStorageService,
    ) as jasmine.SpyObj<UserStorageService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to dashboard if user is not admin', () => {
    const regularUser = { ...mockUsers[0], role: 'USER' as const };
    mockAuthService.currentUser.and.returnValue(regularUser);

    component.ngOnInit();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should load users on init for admin', () => {
    mockAuthService.currentUser.and.returnValue(mockAdmin);
    mockPortfolioService.getAllUsers.and.returnValue(of(mockUsers));

    component.ngOnInit();

    expect(mockPortfolioService.getAllUsers).toHaveBeenCalled();
  });

  it('should calculate user statistics correctly', () => {
    component.users = mockUsers;

    expect(component.totalUsers).toBe(2);
    expect(component.normalUsers).toBe(1);
    expect(component.adminUsers).toBe(1);
  });

  it('should generate public profile URL', () => {
    const url = component.getPublicProfileUrl('testuser');
    expect(url).toBe('/p/testuser');
  });

  it('should check if user can be deleted', () => {
    component.currentUser = mockAdmin;

    expect(component.canDeleteUser(mockUsers[0])).toBe(true);
    expect(component.canDeleteUser(mockAdmin)).toBe(false);
  });

  it('should delete user successfully', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    mockUserStorageService.deleteUser.and.returnValue(true);
    spyOn(component, 'refreshUsers');

    component.deleteUser('user-1', 'user1');

    expect(mockUserStorageService.deleteUser).toHaveBeenCalledWith('user-1');
    expect(component.refreshUsers).toHaveBeenCalled();
  });

  it('should not delete current admin', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.currentUser = mockAdmin;

    component.deleteUser(mockAdmin.id, mockAdmin.username);

    expect(mockUserStorageService.deleteUser).not.toHaveBeenCalled();
  });

  it('should logout and redirect to login', () => {
    mockAuthService.logout.and.returnValue(of(void 0));

    component.logout();

    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login']);
  });
});
