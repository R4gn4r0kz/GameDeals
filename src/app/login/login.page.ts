import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9]+$')
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$')
        ]
      ]
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      // Guardar estado de sesión
      localStorage.setItem('isLoggedIn', 'true');

      // Redirigir al home
      await this.router.navigate(['/home']);

      // (Opcional) Mostrar un mensaje de bienvenida
      const toast = await this.toastCtrl.create({
        message: `Bienvenido, ${this.loginForm.value.username}!`,
        duration: 2000,
        color: 'success'
      });
      toast.present();
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Formulario inválido. Verifica los campos.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }
}
