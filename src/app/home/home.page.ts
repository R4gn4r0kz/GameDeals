import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; 
import { CommonModule, registerLocaleData } from '@angular/common';
import localeCl from '@angular/common/locales/es-CL';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonicModule,
    RouterModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  juegos = [
    { nombre: 'The Witcher 3', descripcion: 'RPG de mundo abierto', imagen: 'assets/witcher3.jpg', descuento: 50, favorito: true, precio: 19990 },
    { nombre: 'Hades', descripcion: 'Roguelike de acción', imagen: 'assets/hades.jpg', descuento: 20, favorito: false, precio: 13000 },
    { nombre: 'Celeste', descripcion: 'Plataformas desafiante', imagen: 'assets/celeste.jpg', descuento: 0, favorito: true, precio: 7000 },
    { nombre: 'Hollow Knight', descripcion: 'Metroidvania', imagen: 'assets/hollowknight.jpg', descuento: 30, favorito: false, precio: 4300 }
  ];
  todosJuegos = [...this.juegos];

  ubicacion: { lat: number, lon: number } | null = null;
  fotoBase64: string | null = null;

  constructor(
    private router: Router,
    private geolocation: Geolocation
  ) {}

  logout() {
    this.router.navigate(['/login']);
  }

  filtrar(filtro: string) {
    if (filtro === 'favoritos') {
      this.juegos = this.todosJuegos.filter(j => j.favorito);
    } else if (filtro === 'alertas') {
      this.juegos = this.todosJuegos.filter(j => j.descuento > 0);
    } else {
      this.juegos = [...this.todosJuegos];
    }
  }

  irPerfil() {
    this.router.navigate(['/perfil']);
  }

  irContacto() {
    this.router.navigate(['/contacto']);
  }

  obtenerUbicacion() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.ubicacion = {
        lat: resp.coords.latitude,
        lon: resp.coords.longitude
      };
      console.log('Ubicación obtenida:', this.ubicacion);
    }).catch((error) => {
      console.error('Error al obtener ubicación:', error);
    });
  }

  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

     this.fotoBase64 = image.dataUrl ?? null;
    } catch (err) {
      console.error('Error al tomar foto:', err);
    }
  }
}

registerLocaleData(localeCl);
