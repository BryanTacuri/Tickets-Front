import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { formatISO } from 'date-fns';
import { TicketService } from 'src/app/services/ticket.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  loading: boolean = false;
  validateForm!: FormGroup;
  validateFormHistorial!: FormGroup;
  dateFormat = 'yyyy/MM/dd';
  detailsFromGrup!: FormGroup;
  idManual: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ticketService: TicketService,
    private message: NzMessageService
  ) {}

  get details(): any {
    return this.validateFormHistorial.get('details') as FormArray;
  }

  addStep(id: any): void {
    this.detailsFromGrup = this.fb.group({
      descripcion: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
    });
    this.details.push(this.detailsFromGrup);
  }

  removeDetail(index: number): void {
    this.details.removeAt(index);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      persona_solicitante: [null, [Validators.required]],

      fecha_ingreso: [null],
      asunto: [null, [Validators.required]],
      descripcion: [null, [Validators.maxLength(150)]],
    });

    this.validateFormHistorial = this.fb.group({
      usuario_soporte: [null, [Validators.required]],
      comentario: [null],

      details: this.fb.array([
        this.fb.group({
          descripcion: [
            null,
            Validators.compose([
              Validators.required,
              Validators.maxLength(150),
            ]),
          ],
        }),
      ]),
    });

    this.validateForm.patchValue({
      fecha_ingreso: new Date(),
    });
  }

  back(): void {
    this.router.navigate([`/admin`]);
  }

  submitForm(): void {
    if (this.validateForm.valid && this.validateFormHistorial.valid) {
      this.addTicket(this.validateForm.value, this.validateFormHistorial.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });

      Object.values(this.validateFormHistorial.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });

      if (this.validateFormHistorial.controls['details'].invalid) {
        for (let i = 0; i < this.details.length; i++) {
          this.details.at(i).get('descripcion').markAsDirty();
          this.details.at(i).get('descripcion').updateValueAndValidity({
            onlySelf: true,
          });
        }
      }
    }
  }

  addTicket(formData: any, formDataHistorial: any): void {
    if (
      formData.fecha_ingreso != null &&
      typeof formData.fecha_ingreso == 'object'
    ) {
      formData.fecha_ingreso = formatISO(formData.fecha_ingreso, {
        representation: 'date',
      });
    }

    formData.historial = formDataHistorial;

    this.loading = true;
    this.ticketService.addTicket(formData).subscribe({
      next: (res) => {
        this.loading = false;
        this.message.success('Ticket creado con éxito');
        this.router.navigate([`/admin`]);
      },
      error: (err) => {
        this.loading = false;
        this.message.error(err.error.message || JSON.stringify(err.error));
      },
    });
  }
}
