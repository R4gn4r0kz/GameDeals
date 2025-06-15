import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonItem, IonLabel, IonInput, IonButton, IonAvatar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent, IonItem, IonLabel, IonInput, IonButton, IonAvatar
  ]
})
export class PerfilComponent {
  perfilForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.perfilForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      email: [''],
      nickname: [''],
      avatarUrl: ['assets/default-avatar.png'] // ruta por defecto
    });
  }

  guardarCambios() {
    alert('¡Perfil guardado!\n' + JSON.stringify(this.perfilForm.value, null, 2));
  }

  volverHome() {
    this.router.navigate(['/home']);
  }
}