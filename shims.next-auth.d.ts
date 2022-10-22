import { Session, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  export interface Session {
    user?: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      access?: string | null;
    };
  }

  export interface DefaultUser {
    access?: string | null;
  }
}
