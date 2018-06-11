import { Injectable } from '@angular/core';
import { IDAOUser } from 'src/app/_state/reducers/dao.reducer';

const USER = 'user';

@Injectable()
export class UserService {

  constructor() { }

  getId() {
    return this.getUser().id;
  }

  setId(id) {
    this.update({ id });
  }

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

  set(props) {
    this.update(props);
  }

  update(props): IDAOUser {
    const user = Object.assign(this.getUserFromCache(), props);
    this.setUserToCache(user);
    return user;
  }

  getUser(): IDAOUser {
    return this.getUserFromCache();
  }

  logout() {
    sessionStorage.removeItem(USER);
  }

  getPermissions() {
    return this.getUser() || [];
  }

  setPermissions(permissions) {
    this.update({ permissions });
  }

  private getUserFromCache(): IDAOUser {
    const userStr = sessionStorage.getItem(USER);
    return userStr ? JSON.parse(userStr) : {};
  }

  private setUserToCache(user): IDAOUser {
    sessionStorage.setItem(USER, JSON.stringify(user));
    return user;
  }
}
