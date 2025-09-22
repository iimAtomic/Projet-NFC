import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { USERS } from '../data/mock-users';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login with valid credentials', (done) => {
    const user = USERS[0]; // John Doe
    service.login(user.username, user.password).subscribe({
      next: (result) => {
        expect(result).toBeTruthy();
        expect(result?.username).toBe(user.username);
        expect(service.currentUser()).toBeTruthy();
        done();
      },
      error: done
    });
  });

  it('should return null for invalid credentials', (done) => {
    service.login('invalid', 'invalid').subscribe({
      next: (result) => {
        expect(result).toBeNull();
        expect(service.currentUser()).toBeNull();
        done();
      },
      error: done
    });
  });

  it('should logout successfully', (done) => {
    // First login
    const user = USERS[0];
    service.login(user.username, user.password).subscribe(() => {
      expect(service.currentUser()).toBeTruthy();
      
      // Then logout
      service.logout().subscribe(() => {
        expect(service.currentUser()).toBeNull();
        done();
      });
    });
  });
});
