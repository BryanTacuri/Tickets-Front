import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Historial } from 'src/app/models/Historial';
import { HistorialDetalle } from 'src/app/models/HistorialDetalle';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { ValueService } from 'src/app/services/value.service';
import { formatISO } from 'date-fns';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  loading: boolean = false;
  ticket: Ticket = new Ticket();
  historial: Historial = new Historial();
  historial_detalle: HistorialDetalle[] = [];
  validateForm!: FormGroup;
  validateFormTicket!: FormGroup;
  detailsFromGrup!: FormGroup;

  id: any;
  htmlContent: any;
  detailDelete: HistorialDetalle[] = [];
  idDetail: string;
  colorDegradado: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ticketService: TicketService,
    private message: NzMessageService,
    public valueService: ValueService
  ) {}

  get details(): any {
    return this.validateForm.get('details') as FormArray;
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
    this.validateFormTicket = this.fb.group({
      persona_solicitante: [null, [Validators.required]],

      fecha_ingreso: [null],
      asunto: [null, [Validators.required]],
      descripcion: [null, [Validators.maxLength(150)]],
      status: [null],
    });

    this.validateForm = this.fb.group({
      id: [null],
      usuario_soporte: [null, [Validators.required]],

      comentario: [null, [Validators.maxLength(150)]],
      fecha_atencion: [null, [Validators.required]],
      tickets_id: [null],

      details: this.fb.array([
        this.fb.group({
          // name: [null, [Validators.required]],
          descripcion: [
            null,
            Validators.compose([
              Validators.required,
              Validators.maxLength(150),
            ]),
          ],
          id: [null],
          status: [null],
        }),
      ]),
    });

    let p1 = this.getTicketbyId(this.valueService.idTicket);

    this.loading = true;
    Promise.all([p1]).then(
      (res) => (this.loading = false),
      (err) => {
        this.loading = false;
        this.message.error(err.error.message);
      }
    );
  }

  getTicketbyId(id: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ticketService
        .getById(`?embed[]=historialIncidencia.historialDetalles`, id)
        .subscribe({
          next: (res) => {
            this.ticket = res;
            this.historial = this.ticket.historial_incidencia;

            this.validateFormTicket.patchValue({
              persona_solicitante: this.ticket.persona_solicitante,
              fecha_ingreso: this.ticket.fecha_ingreso,
              asunto: this.ticket.asunto,
              descripcion: this.ticket.descripcion,
              status: this.ticket.status,
            });

            this.validateForm.patchValue({
              id: this.historial.id,
              usuario_soporte: this.historial.usuario_soporte,
              comentario: this.historial.comentario,
              fecha_atencion: this.historial.fecha_atencion,
              tickets_id: this.historial.tickets_id,
            });
            this.removeDetail(0);

            this.historial_detalle = this.historial.historial_detalles;

            for (let i = 0; i < this.historial.historial_detalles.length; i++) {
              this.addDetail(this.historial.historial_detalles[i].id);
              this.details.at(i).patchValue({
                descripcion: this.historial.historial_detalles[i].descripcion,
                id: this.historial.historial_detalles[i].id,
                status: this.historial.historial_detalles[i].status,
              });
            }

            this.loading = false;

            resolve();
          },
          error: (err) => {
            this.loading = false;
            reject(err);
          },
        });
    });
  }

  back(): void {
    this.router.navigate(['/admin']);
  }

  submitForm(): void {
    if (this.validateForm.valid && this.validateFormTicket.valid) {
      this.updateTicket(this.validateForm.value, this.validateFormTicket.value);
    } else {
      this.message.error('Complete los campos requeridos');
      Object.values(this.validateFormTicket.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });

      if (this.validateForm.controls['details'].invalid) {
        for (let i = 0; i < this.details.length; i++) {
          /*     this.details.at(i).get('name').markAsDirty();
          this.details
            .at(i)
            .get('name')
            .updateValueAndValidity({ onlySelf: true }); */
          this.details.at(i).get('descripcion').markAsDirty();
          this.details.at(i).get('descripcion').updateValueAndValidity({
            onlySelf: true,
          });
        }
      }
    }
  }

  updateTicket(formData: any, formDataTicket: any): void {
    for (let i = 0; i < this.detailDelete.length; i++) {
      formData.details.push(this.detailDelete[i]);
    }

    if (
      formDataTicket.fecha_ingreso != null &&
      typeof formDataTicket.fecha_ingreso == 'object'
    ) {
      formDataTicket.fecha_ingreso = formatISO(formDataTicket.fecha_ingreso, {
        representation: 'date',
      });
    }

    formDataTicket.historial = formData;
    console.log('datafinal', formDataTicket);

    this.loading = true;
    this.ticketService
      .updateTicket(formDataTicket, this.valueService.idTicket)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.message.success('ticket actualizado correctamente');

          this.router.navigate(['/admin']);
        },
        error: (err) => {
          this.loading = false;
          this.message.error(err.error.message || JSON.stringify(err.error));
        },
      });
  }
}
