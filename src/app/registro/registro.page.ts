import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    HttpClientModule
  ]
})
export class RegistroPage implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.registroForm = this.fb.group({
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.registroForm.valid) {
      const nuevoUsuario = this.registroForm.value;

      try {
        // 🔁 Enviar a tu API
        await this.http.post('http://192.168.100.118:3000/usuarios', nuevoUsuario).toPromise();

        // ✅ Mostrar mensaje
        const toast = await this.toastController.create({
          message: 'Usuario registrado correctamente',
          duration: 2000,
          color: 'success'
        });
        await toast.present();

        // 🔁 Redirigir al login
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('❌ Error al registrar usuario:', error);
        const toast = await this.toastController.create({
          message: 'Error al registrar. Intenta nuevamente.',
          duration: 2500,
          color: 'danger'
        });
        await toast.present();
      }
    }
  }
}
