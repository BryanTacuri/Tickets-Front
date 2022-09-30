import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Historial } from 'src/app/models/Historial';
import { HistorialDetalle } from 'src/app/models/HistorialDetalle';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  loading: boolean = false;
  ticket: Ticket = new Ticket();
  historial_detalle: HistorialDetalle[] = [];
  historial: Historial = new Historial();
  validateForm!: FormGroup;
  detailsFromGrup!: FormGroup;
  id: any;
  htmlContent: any;
  validateFormHistorial!: FormGroup;
  detailDelete: HistorialDetalle[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ticketService: TicketService,
    private message: NzMessageService,

    public valueService: ValueService
  ) {}

  get details(): any {
    return this.validateFormHistorial.get('details') as FormArray;
  }

  addDetail(id: any): void {
    this.detailsFromGrup = this.fb.group({
      // name: [null, [Validators.required]],
      descripcion: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      id: [null],
      status: [null],
    });
    this.details.push(this.detailsFromGrup);
  }

  removeDetail(index: number, id: any = ''): void {
    if (this.historial_detalle.length > 0) {
      if (id != '' && id != null) {
        this.historial_detalle[index].status = 'E';
        this.detailDelete.push(this.historial_detalle[index]);
      }
    }
    this.details.removeAt(index);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      persona_solicitante: [null, [Validators.required]],

      fecha_ingreso: [null],
      asunto: [null, [Validators.required]],
      descripcion: [null, [Validators.maxLength(150)]],
      status: [null],
    });
    this.validateFormHistorial = this.fb.group({
      usuario_soporte: [null, [Validators.required]],
      comentario: [null],

      details: this.fb.array([
        this.fb.group({
          id: [null],
          status: [null],
          description: [
            null,
            Validators.compose([
              Validators.required,
              Validators.maxLength(150),
            ]),
          ],
        }),
      ]),
    });

    let p1 = this.getTicketById(this.valueService.idPlan);

    this.loading = true;
    Promise.all([p1]).then(
      (res) => (this.loading = false),
      (err) => {
        this.loading = false;
        this.message.error(err.error.message);
      }
    );
  }

  getTicketById(id: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ticketService
        .getById(`?embed[]=historialIncidencia.historialDetalles`, id)
        .subscribe({
          next: (res) => {
            this.ticket = res;

            this.validateForm.patchValue({
              persona_solicitante: this.ticket.persona_solicitante,
              fecha_ingreso: this.ticket.fecha_ingreso,
              asunto: this.ticket.asunto,
              descripcion: this.ticket.descripcion,
              status: this.ticket.status,
            });

            this.removeDetail(0);

            this.historial_detalle =
              this.ticket.historial_incidencia.historial_detalles;

            this.validateFormHistorial.patchValue({
              usuario_soporte: this.ticket.historial_incidencia.usuario_soporte,
              comentario: this.ticket.historial_incidencia.comentario,
            });

            for (let i = 0; i < this.historial_detalle.length; i++) {
              this.addDetail(this.historial_detalle[i]);
              console.log(this.historial_detalle[i].descripcion);

              this.details.at(i).patchValue({
                id: this.historial_detalle[i].id,
                status: this.historial_detalle[i].status,
                descripcion: this.historial_detalle[i].descripcion,
              });
            }
            console.log(
              'aver',
              this.details.controls[0].get('descripcion').value
            );

            resolve();
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }

  back(): void {
    this.router.navigate(['/admin']);
  }

  submitForm(): void {
    if (this.validateForm.valid && this.validateFormHistorial.valid) {
      this.updatePlan(
        this.validateForm.value,
        this.validateFormHistorial.value
      );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
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

  updatePlan(formData: any, formDataHistorial: any): void {
    for (let i = 0; i < this.detailDelete.length; i++) {
      formData.details.push(this.detailDelete[i]);
    }
    formData.historial = formDataHistorial;

    console.log(formData);
    /* 
    this.loading = true;
    this.ticketService.updatePlan(formData, this.valueService.idPlan).subscribe({
      next: (res) => {
        this.loading = false;
        this.message.success('Plan actualizado correctamente');

        this.router.navigate(['/admin/plan']);
      },
      error: (err) => {
        this.loading = false;
        this.message.error(err.error.message || JSON.stringify(err.error));
      },
    });
  */
  }
}
