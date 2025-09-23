import { Injectable, signal } from '@angular/core';
import { UserProfile } from '../data/mock-users';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  private readonly STORAGE_KEY = 'tapfolio_users';
  private readonly CURRENT_USER_KEY = 'tapfolio_current_user';

  // Signal pour les utilisateurs
  private usersSignal = signal<UserProfile[]>([]);
  public users = this.usersSignal.asReadonly();

  constructor() {
    this.loadUsersFromStorage();
  }

  /**
   * Charge les utilisateurs depuis localStorage
   */
  private loadUsersFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const users = JSON.parse(stored);
        this.usersSignal.set(users);
      } else {
        // Initialiser avec les utilisateurs par défaut
        this.initializeDefaultUsers();
      }
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
      this.initializeDefaultUsers();
    }
  }

  /**
   * Sauvegarde les utilisateurs dans localStorage
   */
  private saveUsersToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.usersSignal()));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des utilisateurs:', error);
    }
  }

  /**
   * Initialise avec les utilisateurs par défaut
   */
  private initializeDefaultUsers(): void {
    const defaultUsers: UserProfile[] = [
      {
        id: 'u_001',
        username: 'jdoe',
        email: 'jdoe@example.com',
        password: 'Password123!',
        fullName: 'John Doe',
        bio: 'Frontend engineer passionate about Angular, UX, and performance.',
        photoUrl: 'https://avatars.githubusercontent.com/u/000000?v=4',
        role: 'USER',
        experiences: [
          {
            company: 'Acme Corp',
            role: 'Angular Developer',
            startDate: '2022-04',
            endDate: '2024-08',
            description:
              'Built a design system with TailwindCSS and Angular standalone components. Improved LCP by 35%.',
          },
          {
            company: 'Freelance',
            role: 'Web Developer',
            startDate: '2024-09',
            description:
              'Delivered SPA dashboards and public marketing sites with SSR and accessibility focus.',
          },
        ],
        social: {
          website: 'https://jdoe.dev',
          github: 'https://github.com/jdoe',
          linkedin: 'https://www.linkedin.com/in/jdoe/',
          twitter: 'https://x.com/jdoe',
        },
        createdAt: '2022-04-10T00:00:00.000Z',
        updatedAt: '2024-09-01T00:00:00.000Z',
      },
      {
        id: 'u_002',
        username: 'admin',
        email: 'admin@tapfolio.dev',
        password: 'AdminStrong!2024',
        fullName: 'Tapfolio Admin',
        bio: 'Administrator account with full privileges.',
        role: 'ADMIN',
        experiences: [
          {
            company: 'Tapfolio',
            role: 'System Administrator',
            startDate: '2023-01',
            description: 'Oversees user management and platform reliability.',
          },
        ],
        social: {
          website: 'https://tapfolio.dev',
          github: 'https://github.com/tapfolio',
          linkedin: 'https://www.linkedin.com/company/tapfolio/',
        },
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2024-09-01T00:00:00.000Z',
      },
    ];

    this.usersSignal.set(defaultUsers);
    this.saveUsersToStorage();
  }

  /**
   * Trouve un utilisateur par username ou email
   */
  findUserByIdentifier(identifier: string): UserProfile | null {
    const users = this.usersSignal();
    return users.find((user) => user.username === identifier || user.email === identifier) || null;
  }

  /**
   * Trouve un utilisateur par ID
   */
  findUserById(id: string): UserProfile | null {
    const users = this.usersSignal();
    return users.find((user) => user.id === id) || null;
  }

  /**
   * Trouve un utilisateur par username
   */
  findUserByUsername(username: string): UserProfile | null {
    const users = this.usersSignal();
    return users.find((user) => user.username === username) || null;
  }

  /**
   * Vérifie si un username existe déjà
   */
  isUsernameTaken(username: string): boolean {
    return this.findUserByUsername(username) !== null;
  }

  /**
   * Vérifie si un email existe déjà
   */
  isEmailTaken(email: string): boolean {
    const users = this.usersSignal();
    return users.some((user) => user.email === email);
  }

  /**
   * Crée un nouvel utilisateur
   */
  createUser(userData: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>): UserProfile {
    const newUser: UserProfile = {
      ...userData,
      id: this.generateUserId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const currentUsers = this.usersSignal();
    const updatedUsers = [...currentUsers, newUser];
    this.usersSignal.set(updatedUsers);
    this.saveUsersToStorage();

    return newUser;
  }

  /**
   * Met à jour un utilisateur
   */
  updateUser(userId: string, updates: Partial<UserProfile>): UserProfile | null {
    const currentUsers = this.usersSignal();
    const userIndex = currentUsers.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return null;
    }

    const updatedUser: UserProfile = {
      ...currentUsers[userIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const updatedUsers = [...currentUsers];
    updatedUsers[userIndex] = updatedUser;
    this.usersSignal.set(updatedUsers);
    this.saveUsersToStorage();

    return updatedUser;
  }

  /**
   * Supprime un utilisateur
   */
  deleteUser(userId: string): boolean {
    const currentUsers = this.usersSignal();
    const filteredUsers = currentUsers.filter((user) => user.id !== userId);

    if (filteredUsers.length === currentUsers.length) {
      return false; // Utilisateur non trouvé
    }

    this.usersSignal.set(filteredUsers);
    this.saveUsersToStorage();
    return true;
  }

  /**
   * Sauvegarde l'utilisateur connecté
   */
  setCurrentUser(user: UserProfile | null): void {
    if (user) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.CURRENT_USER_KEY);
    }
  }

  /**
   * Récupère l'utilisateur connecté
   */
  getCurrentUser(): UserProfile | null {
    try {
      const stored = localStorage.getItem(this.CURRENT_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur connecté:", error);
      return null;
    }
  }

  /**
   * Génère un ID unique pour un utilisateur
   */
  private generateUserId(): string {
    return 'u_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Obtient tous les utilisateurs
   */
  getAllUsers(): UserProfile[] {
    return this.usersSignal();
  }

  /**
   * Obtient les statistiques des utilisateurs
   */
  getUserStats(): { total: number; normal: number; admin: number } {
    const users = this.usersSignal();
    return {
      total: users.length,
      normal: users.filter((user) => user.role === 'USER').length,
      admin: users.filter((user) => user.role === 'ADMIN').length,
    };
  }
}
