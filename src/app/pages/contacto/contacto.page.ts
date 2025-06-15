import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactoStorageService } from '../../services/contacto-storage.service';
import { ContactoSqliteService } from '../../services/contacto-sqlite.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss']
})
export class ContactoPage {
  segmento = 'formulario';
  contacto = {
    nombre: '',
    email: '',
    mensaje: ''
  };
  mensajes: any[] = [];

  constructor(
    private toastCtrl: ToastController,
    private contactoStorage: ContactoStorageService,
    private contactoSqlite: ContactoSqliteService
  ) {}

  async enviarFormulario() {
    if (!this.contacto.nombre || !this.contacto.email || !this.contacto.mensaje) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor completa todos los campos.',
        color: 'danger',
        duration: 2000
      });
      toast.present();
      return;
    }

    let mensajeGuardado = false;
    let mensajeSqlite = '';
    let mensajeStorage = '';

    // Guardar en SQLite
    try {
      await this.contactoSqlite.guardarContacto(
        this.contacto.nombre,
        this.contacto.email,
        this.contacto.mensaje
      );
      mensajeSqlite = 'Guardado en SQLite ✓';
      mensajeGuardado = true;
    } catch (e) {
      mensajeSqlite = 'No se pudo guardar en SQLite';
    }

    // Guardar en Storage
    try {
      await this.contactoStorage.guardarContacto(this.contacto);
      mensajeStorage = 'Guardado en Storage ✓';
      mensajeGuardado = true;
    } catch (e) {
      mensajeStorage = 'No se pudo guardar en Storage';
    }

    // Mensaje final
    const toast = await this.toastCtrl.create({
      message: [mensajeSqlite, mensajeStorage].join(' | '),
      color: mensajeGuardado ? 'success' : 'danger',
      duration: 3000
    });
    toast.present();

    if (mensajeGuardado) {
      this.contacto = { nombre: '', email: '', mensaje: '' };
      this.cargarMensajes();
    }
  }

  async cargarMensajes() {
    // Puedes elegir mostrar los de Storage o los de SQLite, o ambos.
    this.mensajes = await this.contactoStorage.obtenerContactos();
  }

  onSegmentChanged(ev: any) {
    if (ev.detail.value === 'mensajes') {
      this.cargarMensajes();
    }
  }
}