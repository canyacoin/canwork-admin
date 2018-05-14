import { Injectable } from '@angular/core';
import { User } from '../app.store';

const USER = 'CANYA_CORE_USER';

@Injectable()
export class UserService {

  constructor() { }

  isAuthenticated(): boolean {
    return this.getUserFromCache().isAuthenticated;
  }

  setVerificationStatus(isVerified) {
    this.update({ isVerified });
  }

  setAuthenticationStatus(isAuthenticated) {
    this.update({ isAuthenticated });
  }

  setIsClient(isClient) {
    this.update({ isClient });
  }

  update(props): User {
    const user = Object.assign(this.getUserFromCache(), props);
    this.setUserToCache(user);
    return user;
  }

  getUser(): User {
    return this.getUserFromCache();
  }

  logout() {
    sessionStorage.removeItem(USER);
  }

  getPermissions() {
    return this.getUser().permissions || [];
  }

  setPermissions(permissions) {
    this.update({ permissions });
  }

  private getUserFromCache(): User {
    const userStr = sessionStorage.getItem(USER);
    return userStr ? JSON.parse(userStr) : {};
  }

  private setUserToCache(user): User {
    sessionStorage.setItem(USER, JSON.stringify(user));
    return user;
  }
}
