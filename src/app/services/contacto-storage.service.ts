import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class ContactoStorageService {
  private _isReady = false;

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    if (!this._isReady) {
      await this.storage.create();
      this._isReady = true;
    }
  }

  // Guarda un solo contacto (agrega a la lista de contactos)
  async guardarContacto(contacto: any): Promise<void> {
    await this.init();
    let contactos = await this.storage.get('contactos');
    if (!Array.isArray(contactos)) {
      contactos = [];
    }
    contactos.push(contacto);
    await this.storage.set('contactos', contactos);
  }

  // Devuelve la lista de contactos
  async obtenerContactos(): Promise<any[]> {
    await this.init();
    const contactos = await this.storage.get('contactos');
    return Array.isArray(contactos) ? contactos : [];
  }
}