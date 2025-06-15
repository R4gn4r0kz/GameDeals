import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DBTaskService } from '../services/dbtask.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private db: DBTaskService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const hasSession = await this.db.hasActiveSession();
    if (!hasSession) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}