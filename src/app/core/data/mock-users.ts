export type Role = 'USER' | 'ADMIN';

export interface Experience {
  company: string;
  role: string;
  startDate: string; 
  endDate?: string; 
  description: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  password: string; 
  fullName: string;
  bio: string;
  photoUrl?: string;
  role: Role;
  experiences: Experience[];
  social?: {
    website?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export const USERS: UserProfile[] = [
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
        description: 'Delivered SPA dashboards and public marketing sites with SSR and accessibility focus.',
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


