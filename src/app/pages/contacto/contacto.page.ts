import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactoStorageService } from '../../services/contacto-storage.service';
import { ContactoSqliteService } from '../../services/contacto-sqlite.service';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
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
  apiMensajes: any[] = [];

  constructor(
    private toastCtrl: ToastController,
    private contactoStorage: ContactoStorageService,
    private contactoSqlite: ContactoSqliteService,
    private router: Router,
    private http: HttpClient
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
    let mensajeAPI = '';

    // SQLite
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

    // Storage
    try {
      await this.contactoStorage.guardarContacto(this.contacto);
      mensajeStorage = 'Guardado en Storage ✓';
      mensajeGuardado = true;
    } catch (e) {
      mensajeStorage = 'No se pudo guardar en Storage';
    }

    // POST a API local json-server
    try {
      await this.enviarComentarioAPI();
      mensajeAPI = 'Enviado a API ✓';
    } catch (e) {
      mensajeAPI = 'No se pudo enviar a API';
    }

    const toast = await this.toastCtrl.create({
      message: [mensajeSqlite, mensajeStorage, mensajeAPI].join(' | '),
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
    this.mensajes = await this.contactoStorage.obtenerContactos();
  }

  onSegmentChanged(ev: any) {
    if (ev.detail.value === 'mensajes') {
      this.cargarMensajes();
    } else if (ev.detail.value === 'externos') {
      this.cargarDesdeAPI();
    }
  }

  cargarDesdeAPI() {
    const guardados = localStorage.getItem('mensajesAPI');
    if (guardados) {
      this.apiMensajes = JSON.parse(guardados);
      console.log('Mensajes externos cargados desde localStorage');
    } else {
      this.http.get<any[]>('https://jsonplaceholder.typicode.com/comments?_limit=5')
        .subscribe(data => {
          this.apiMensajes = data;
          localStorage.setItem('mensajesAPI', JSON.stringify(data));
          console.log('Mensajes externos cargados desde API y guardados');
        }, error => {
          console.error('Error cargando desde API:', error);
        });
    }
  }

  async enviarComentarioAPI() {
    const nuevoComentario = {
      nombre: this.contacto.nombre,
      mensaje: this.contacto.mensaje
    };

    return this.http.post('http://localhost:3000/comentarios', nuevoComentario).toPromise();
  }

  async volverHome() {
    const toast = await this.toastCtrl.create({
      message: 'Volviendo al inicio...',
      duration: 1500,
      color: 'primary'
    });
    await toast.present();

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1500);
  }
}
