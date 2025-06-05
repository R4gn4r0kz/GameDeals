import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeCl from '@angular/common/locales/es-CL';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  juegos = [
    { 
      nombre: 'The Witcher 3', 
      descripcion: 'RPG de mundo abierto', 
      imagen: 'assets/witcher3.jpg', 
      descuento: 50, 
      favorito: true,
      precio: 19990 // Precio normal
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
    // ...Agrega aquí tus juegos reales o mock
  ];
  todosJuegos = [...this.juegos]; // Copia para poder filtrar y restaurar

  constructor(private router: Router) {}

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
}

registerLocaleData(localeCl);