import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/angular/standalone';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-info-adicional',
  standalone: true,
  templateUrl: './info-adicional.component.html',
  styleUrls: ['./info-adicional.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule
  ],
  animations: [
    trigger('titleAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'none' }))
      ])
    ]),
    trigger('inputAnim', [
      state('none', style({ transform: 'none', opacity: 1 })),
      state('move', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('void => move', [
        style({ transform: 'translateX(-50px)', opacity: 0 }),
        animate('400ms ease')
      ])
    ])
  ]
})
export class InfoAdicionalComponent {
  usuario = 'usuario'; // Puedes setearlo dinámicamente
  animateInputs = true;
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      nombre: [''],
      apellido: [''],
      nivel: [''],
      fechaNacimiento: ['']
    });
  }

  limpiar() {
    this.form.reset();
  }

  mostrar() {
    alert(JSON.stringify(this.form.value, null, 2));
  }

  irAHome() {
    this.router.navigate(['/home']);
  }
}