import { TestBed } from '@angular/core/testing';
import { UserStorageService } from './user-storage.service';

describe('UserStorageService', () => {
  let service: UserStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStorageService);

    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default users', () => {
    const users = service.getAllUsers();
    expect(users.length).toBeGreaterThan(0);
  });

  it('should find user by identifier (username)', () => {
    const user = service.findUserByIdentifier('jdoe');
    expect(user).toBeTruthy();
    expect(user?.username).toBe('jdoe');
  });

  it('should find user by identifier (email)', () => {
    const user = service.findUserByIdentifier('jdoe@example.com');
    expect(user).toBeTruthy();
    expect(user?.email).toBe('jdoe@example.com');
  });

  it('should return null for non-existent user', () => {
    const user = service.findUserByIdentifier('nonexistent');
    expect(user).toBeNull();
  });

  it('should check if username is taken', () => {
    expect(service.isUsernameTaken('jdoe')).toBe(true);
    expect(service.isUsernameTaken('nonexistent')).toBe(false);
  });

  it('should check if email is taken', () => {
    expect(service.isEmailTaken('jdoe@example.com')).toBe(true);
    expect(service.isEmailTaken('nonexistent@example.com')).toBe(false);
  });

  it('should create new user', () => {
    const newUserData = {
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'password',
      fullName: 'New User',
      bio: 'New user bio',
      role: 'USER' as const,
      experiences: [],
      social: { website: '', github: '', linkedin: '', twitter: '' },
    };

    const newUser = service.createUser(newUserData);

    expect(newUser).toBeTruthy();
    expect(newUser.username).toBe('newuser');
    expect(newUser.id).toBeTruthy();
    expect(service.isUsernameTaken('newuser')).toBe(true);
  });

  it('should update user', () => {
    const users = service.getAllUsers();
    const firstUser = users[0];
    const updates = { fullName: 'Updated Name' };

    const updatedUser = service.updateUser(firstUser.id, updates);

    expect(updatedUser).toBeTruthy();
    expect(updatedUser?.fullName).toBe('Updated Name');
    expect(updatedUser?.id).toBe(firstUser.id);
  });

  it('should delete user', () => {
    const users = service.getAllUsers();
    const userToDelete = users[0];
    const initialCount = users.length;

    const success = service.deleteUser(userToDelete.id);

    expect(success).toBe(true);
    expect(service.getAllUsers().length).toBe(initialCount - 1);
    expect(service.findUserById(userToDelete.id)).toBeNull();
  });

  it('should return false when trying to delete non-existent user', () => {
    const success = service.deleteUser('nonexistent-id');
    expect(success).toBe(false);
  });

  it('should get user stats', () => {
    const stats = service.getUserStats();
    expect(stats.total).toBeGreaterThan(0);
    expect(stats.normal).toBeGreaterThanOrEqual(0);
    expect(stats.admin).toBeGreaterThanOrEqual(0);
    expect(stats.total).toBe(stats.normal + stats.admin);
  });
});
