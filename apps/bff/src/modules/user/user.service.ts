import { Injectable } from '@nestjs/common';
import { createHash, randomUUID } from 'node:crypto';

export type StoredUser = {
  id: string;
  email: string;
  passwordHash: string;
};

export function hashPassword(password: string) {
  return createHash('sha256').update(password).digest('hex');
}

@Injectable()
export class UserService {
  private readonly users = new Map<string, StoredUser>();

  constructor() {
    const demo = {
      id: 'user-demo',
      email: 'demo@example.com',
      passwordHash: hashPassword('demo'),
    };
    this.users.set(demo.id, demo);
  }

  create(email: string, password: string): StoredUser {
    const user: StoredUser = {
      id: randomUUID(),
      email,
      passwordHash: hashPassword(password),
    };
    this.users.set(user.id, user);
    return user;
  }

  findById(id: string): StoredUser | undefined {
    return this.users.get(id);
  }

  findByEmail(email: string): StoredUser | undefined {
    const normalized = email.trim().toLowerCase();
    for (const user of this.users.values()) {
      if (user.email === normalized) {
        return user;
      }
    }
    return undefined;
  }

  toPublic(user: StoredUser) {
    return { id: user.id, email: user.email };
  }
}
