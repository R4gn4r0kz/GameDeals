import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class ContactoSqliteService {
  private dbInstance: SQLiteObject | null = null;

  constructor(private sqlite: SQLite) {}

  async initDB() {
    if (!this.dbInstance) {
      this.dbInstance = await this.sqlite.create({
        name: 'myapp.db',
        location: 'default'
      });
      await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS contacto (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT,
          email TEXT,
          mensaje TEXT,
          fecha DATETIME DEFAULT CURRENT_TIMESTAMP
        );`, []
      );
    }
  }

  async guardarContacto(nombre: string, email: string, mensaje: string) {
    await this.initDB();
    return this.dbInstance!.executeSql(
      `INSERT INTO contacto (nombre, email, mensaje) VALUES (?, ?, ?)`,
      [nombre, email, mensaje]
    );
  }

  async obtenerContactos() {
    await this.initDB();
    const res = await this.dbInstance!.executeSql(`SELECT * FROM contacto ORDER BY fecha DESC`, []);
    let contactos = [];
    for (let i = 0; i < res.rows.length; i++) {
      contactos.push(res.rows.item(i));
    }
    return contactos;
  }
}