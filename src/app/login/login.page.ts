import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController,
    private http: HttpClient
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
    if (this.loginForm.invalid) {
      const toast = await this.toastCtrl.create({
        message: 'Formulario inválido. Verifica los campos.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    }

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    try {
      const usuarios = await firstValueFrom(
        this.http.get<any[]>('http://192.168.100.118:3000/usuarios')
      );

      const usuarioEncontrado = usuarios.find(
        (u) => u.usuario === username && u.password === password
      );

      if (usuarioEncontrado) {
        localStorage.setItem('isLoggedIn', 'true');

        const toast = await this.toastCtrl.create({
          message: `Bienvenido, ${username}!`,
          duration: 2000,
          color: 'success'
        });
        await toast.present();

        this.router.navigate(['/home']);
      } else {
        const toast = await this.toastCtrl.create({
          message: 'Credenciales incorrectas. Inténtalo de nuevo.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    } catch (error) {
      console.error('❌ Error al consultar la API:', error);
      const toast = await this.toastCtrl.create({
        message: 'Error al conectar con el servidor.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }
}
