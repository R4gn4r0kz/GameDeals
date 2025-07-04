import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; 
import { CommonModule, registerLocaleData } from '@angular/common';
import localeCl from '@angular/common/locales/es-CL';
import { HttpClientModule } from '@angular/common/http';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { JuegosSqliteService, Juego } from '../../app/services/juegos-sqlite.service';



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
export class HomePage implements OnInit {
  juegos: Juego[] = [];
  todosJuegos: Juego[] = [];

  ubicacion: { lat: number, lon: number } | null = null;
  fotoBase64: string | null = null;

  constructor(
    private router: Router,
    private juegosService: JuegosSqliteService
  ) {}

  async ngOnInit() {
    const juegosActuales = await this.juegosService.obtenerJuegos();
    if (juegosActuales.length === 0) {
      await this.insertarJuegosIniciales();
    }
    await this.cargarJuegos();
  }

  async cargarJuegos() {
    try {
      const datos = await this.juegosService.obtenerJuegos();
      this.juegos = datos;
      this.todosJuegos = [...datos];
      console.log('✅ Juegos cargados desde SQLite');
    } catch (error) {
      console.error('❌ Error al cargar juegos desde SQLite:', error);
    }
  }

  async insertarJuegosIniciales() {
    const juegosBase: Juego[] = [
      {
        nombre: 'The Witcher 3',
        descripcion: 'RPG de mundo abierto',
        imagen: 'assets/witcher3.jpg',
        descuento: 50,
        favorito: true,
        precio: 19990
      },
      {
        nombre: 'Hades',
        descripcion: 'Roguelike de acción',
        imagen: 'assets/hades.jpg',
        descuento: 20,
        favorito: false,
        precio: 13000
      },
      {
        nombre: 'Celeste',
        descripcion: 'Plataformas desafiante',
        imagen: 'assets/celeste.jpg',
        descuento: 0,
        favorito: true,
        precio: 7000
      },
      {
        nombre: 'Hollow Knight',
        descripcion: 'Metroidvania',
        imagen: 'assets/hollowknight.jpg',
        descuento: 30,
        favorito: false,
        precio: 4300
      }
    ];

    for (const juego of juegosBase) {
      await this.juegosService.agregarJuego(juego);
    }

    console.log('🎮 Juegos iniciales insertados en SQLite');
  }

  async reiniciarJuegos() {
    await this.juegosService.vaciarTabla();
    await this.insertarJuegosIniciales();
    await this.cargarJuegos();
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
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

  irMapa() {
  this.router.navigate(['/mapa']);
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
