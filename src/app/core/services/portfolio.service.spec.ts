import { TestBed } from '@angular/core/testing';
import { PortfolioService } from './portfolio.service';
import { UserStorageService } from './user-storage.service';

describe('PortfolioService', () => {
  let service: PortfolioService;
  let mockUserStorageService: jasmine.SpyObj<UserStorageService>;

  beforeEach(() => {
    const userStorageSpy = jasmine.createSpyObj('UserStorageService', [
      'getAllUsers',
      'findUserByUsername',
    ]);

    TestBed.configureTestingModule({
      providers: [{ provide: UserStorageService, useValue: userStorageSpy }],
    });

    service = TestBed.inject(PortfolioService);
    mockUserStorageService = TestBed.inject(
      UserStorageService,
    ) as jasmine.SpyObj<UserStorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', (done) => {
    const mockUsers = [
      {
        id: '1',
        username: 'user1',
        email: 'user1@test.com',
        password: 'password',
        fullName: 'User One',
        bio: 'Bio one',
        role: 'USER' as const,
        experiences: [],
        social: { website: '', github: '', linkedin: '', twitter: '' },
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      },
    ];

    mockUserStorageService.getAllUsers.and.returnValue(mockUsers);

    service.getAllUsers().subscribe({
      next: (users) => {
        expect(users).toEqual(mockUsers);
        expect(mockUserStorageService.getAllUsers).toHaveBeenCalled();
        done();
      },
      error: done,
    });
  });

  it('should get user by username', (done) => {
    const mockUser = {
      id: '1',
      username: 'testuser',
      email: 'test@test.com',
      password: 'password',
      fullName: 'Test User',
      bio: 'Test bio',
      role: 'USER' as const,
      experiences: [],
      social: { website: '', github: '', linkedin: '', twitter: '' },
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };

    mockUserStorageService.findUserByUsername.and.returnValue(mockUser);

    service.getProfileByUsername('testuser').subscribe({
      next: (user) => {
        expect(user).toEqual(mockUser);
        expect(mockUserStorageService.findUserByUsername).toHaveBeenCalledWith('testuser');
        done();
      },
      error: done,
    });
  });

  it('should return undefined for non-existent user', (done) => {
    mockUserStorageService.findUserByUsername.and.returnValue(null);

    service.getProfileByUsername('nonexistent').subscribe({
      next: (user) => {
        expect(user).toBeUndefined();
        done();
      },
      error: done,
    });
  });
});
