import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

export interface Juego {
  id?: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  descuento: number;
  favorito: boolean;
  precio: number;
}

@Injectable({
  providedIn: 'root'
})
export class JuegosSqliteService {
  private dbInstance: SQLiteObject | null = null;

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.platform.ready().then(() => {
      this.inicializarBD();
    });
  }

  async inicializarBD() {
    try {
      this.dbInstance = await this.sqlite.create({
        name: 'juegos.db',
        location: 'default'
      });

      await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS juegos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT,
          descripcion TEXT,
          imagen TEXT,
          descuento INTEGER,
          favorito INTEGER,
          precio REAL
        );`,
        []
      );

      console.log('✅ Tabla juegos creada o ya existente');
    } catch (error) {
      console.error('❌ Error al crear la BD o la tabla:', error);
    }
  }

  

  async obtenerJuegos(): Promise<Juego[]> {
    if (!this.dbInstance) return [];

    const result = await this.dbInstance.executeSql('SELECT * FROM juegos', []);
    const juegos: Juego[] = [];

    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);
      juegos.push({
        id: row.id,
        nombre: row.nombre,
        descripcion: row.descripcion,
        imagen: row.imagen,
        descuento: row.descuento,
        favorito: !!row.favorito,
        precio: row.precio
      });
    }

    return juegos;
  }

  async agregarJuego(juego: Juego): Promise<void> {
    if (!this.dbInstance) return;

    await this.dbInstance.executeSql(
      `INSERT INTO juegos (nombre, descripcion, imagen, descuento, favorito, precio)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        juego.nombre,
        juego.descripcion,
        juego.imagen,
        juego.descuento,
        juego.favorito ? 1 : 0,
        juego.precio
      ]
    );
  }

  async eliminarJuego(id: number): Promise<void> {
    if (!this.dbInstance) return;
    await this.dbInstance.executeSql('DELETE FROM juegos WHERE id = ?', [id]);
  }

  async actualizarJuego(juego: Juego): Promise<void> {
    if (!this.dbInstance || juego.id == null) return;

    await this.dbInstance.executeSql(
      `UPDATE juegos
       SET nombre = ?, descripcion = ?, imagen = ?, descuento = ?, favorito = ?, precio = ?
       WHERE id = ?`,
      [
        juego.nombre,
        juego.descripcion,
        juego.imagen,
        juego.descuento,
        juego.favorito ? 1 : 0,
        juego.precio,
        juego.id
      ]
    );
  }

  async vaciarTabla(): Promise<void> {
    if (!this.dbInstance) return;
    await this.dbInstance.executeSql('DELETE FROM juegos', []);

    
  }
}
