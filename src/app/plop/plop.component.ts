import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-plop',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzDatePickerModule,
    NzButtonModule,
    NzInputNumberModule,
    CommonModule,
  ],
  templateUrl: './plop.component.html',
  styleUrls: ['./plop.component.css'],
})

export class PlopComponent implements OnInit {
  
  chupeteForm: FormGroup<{
    name: FormControl<string>;
    flavor: FormControl<string>;
    price: FormControl<number>;
  }>;

  constructor(
    private fb: NonNullableFormBuilder,
    private apiService: ApiService,
    private notification: NzNotificationService
  ) {
    const { required } = Validators;
    this.chupeteForm = this.fb.group({
      name: ['', [required]],
      flavor: ['', [required]],
      price: [0, [required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  ngOnInit() {
    this.loadChupetes();
  }

  loadChupetes() {
    this.apiService.getChupetes().subscribe(
      (response: any[]) => {
        console.log('Chupetes recibidos:', response);
      },
      (error: any) => {
        console.error('Error fetching chupetes:', error);
      }
    );
  }

  submitForm(): void {
    if (this.chupeteForm.valid) {
      this.apiService.addChupete(this.chupeteForm.value).subscribe(
        () => {
          this.createNotification(
            'success',
            `${this.chupeteForm.value.name} ${this.chupeteForm.value.flavor}`,
            'El sabor de chupete ha sido creado con éxito!'
          );
          this.chupeteForm.reset();
        },
        (error) => {
          this.createNotification(
            'error',
            'Error',
            'Hubo un error al crear el sabor de chupete.'
          );
          console.error('Error al agregar el chupete:', error);
        }
      );
    } else {
      Object.values(this.chupeteForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
}
