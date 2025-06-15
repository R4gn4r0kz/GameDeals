import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DBTaskService {
  private dbInstance: SQLiteObject | null = null;

  constructor(private sqlite: SQLite, private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    try {
      const db = await this.sqlite.create({
        name: 'skeletonapp.db',
        location: 'default'
      });
      this.dbInstance = db;
      await this.createTables();
    } catch (e) {
      console.error('Error initializing database:', e);
    }
  }

  async createTables() {
    if (!this.dbInstance) return;
    const sql = `
      CREATE TABLE IF NOT EXISTS sesion_data (
        user_name TEXT PRIMARY KEY NOT NULL,
        password INTEGER NOT NULL,
        active INTEGER NOT NULL
      );
    `;
    try {
      await this.dbInstance.executeSql(sql, []);
    } catch (e) {
      console.error('Error creating tables:', e);
    }
  }

  async hasActiveSession(): Promise<boolean> {
    if (!this.dbInstance) return false;
    try {
      const result = await this.dbInstance.executeSql(
        'SELECT * FROM sesion_data WHERE active = 1 LIMIT 1', []
      );
      return result.rows.length > 0;
    } catch (e) {
      console.error('Error checking active session:', e);
      return false;
    }
  }

  async validateUser(user: string, pass: number): Promise<boolean> {
    if (!this.dbInstance) return false;
    try {
      const r = await this.dbInstance.executeSql(
        'SELECT * FROM sesion_data WHERE user_name = ? AND password = ?', [user, pass]
      );
      return r.rows.length > 0;
    } catch (e) {
      console.error('Error validating user:', e);
      return false;
    }
  }

  async registerSession(user: string, pass: number) {
    if (!this.dbInstance) return;
    try {
      await this.dbInstance.executeSql(
        'INSERT INTO sesion_data (user_name, password, active) VALUES (?, ?, 1)', [user, pass]
      );
      await this.saveSessionToStorage(user, pass, true);
    } catch (e) {
      console.error('Error registering session:', e);
    }
  }

  async setActive(user: string, active: boolean) {
    if (!this.dbInstance) return;
    try {
      await this.dbInstance.executeSql(
        'UPDATE sesion_data SET active = ? WHERE user_name = ?', [active ? 1 : 0, user]
      );
      await this.saveSessionToStorage(user, null, active);
    } catch (e) {
      console.error('Error updating session active state:', e);
    }
  }

  async saveSessionToStorage(user: string, pass: number | null, active: boolean) {
    try {
      await this.storage.set('session', { user, pass, active });
    } catch (e) {
      console.error('Error saving session to storage:', e);
    }
  }

  async getSessionFromStorage() {
    try {
      return await this.storage.get('session');
    } catch (e) {
      console.error('Error getting session from storage:', e);
      return null;
    }
  }
}