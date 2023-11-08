import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { servicioService as apiService } from '../../../services/servicio.service';
import { catalogoService } from 'src/app/services/catalogo.service';
import { ServiciosModel } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-servicios-crud',
  templateUrl: './servicios-crud.component.html',
  styleUrls: ['./servicios-crud.component.css'],
})
export class ServiciosCrudComponent implements OnInit {
  public listaservicios: any = [];
  public nombresCatalogo: any[] = [];

  constructor(
    private apiService: apiService,
    private formBuidler: FormBuilder,
    private toastr: ToastrService,
    private catalogoService: catalogoService
  ) {}

  ngOnInit(): void {
    this.getServicios();
    this.getCatalogo();
  }

  showError = false;
  errorMessage = '';

  //--------------------------------------SERVICIOS
  getServicios() {
    this.apiService.getServicios().subscribe((servicios) => {
      console.log(servicios);
      this.listaservicios = servicios;
    });
  }
  getCatalogo() {
    this.catalogoService.getCatalogo().subscribe((catalogo) => {
      this.nombresCatalogo = catalogo;
    });
  }

  deleteServicio(Id: number) {
    this.ocultarVisibleBtnDeleteS();
    this.apiService.deleteServicio(Id);
    setTimeout(() => {
      this.getServicios();
    }, 900);
  }

  getNombrePaquete(id: number): string {
    const nombreCatalogo = this.nombresCatalogo.find(
      (nombre) => nombre.id === id
    );
    return nombreCatalogo ? nombreCatalogo.nombre : 'Desconocido';
  }

  insertedServiciosForm = this.formBuidler.group({
    descripcion: ['', [Validators.required]],
    paquete: ['', [Validators.required]],
    img: ['', [Validators.required]],
    personalizacion: ['', [Validators.required]],
  });

  insertServicios() {
    if (this.insertedServiciosForm.valid) {
      this.apiService
        .createServicio(
          this.insertedServiciosForm.value as unknown as ServiciosModel
        )
        .subscribe({
          next: (response) => {
            if (response) {
              this.insertedServiciosForm.reset();
              this.OcultarFormularioS();
              this.toastr.success('Se creó correctamente.');
              this.getServicios();
            } else {
              this.showError = true;
            }
          },
        });
    } else {
      this.insertedServiciosForm.markAllAsTouched();
    }
    console.log(this.insertedServiciosForm.value);
  }

  get paqueteServicios() {
    return this.insertedServiciosForm.controls.paquete;
  }

  get personalizacion() {
    return this.insertedServiciosForm.controls.personalizacion;
  }
  get descripcionServicios() {
    return this.insertedServiciosForm.controls.descripcion;
  }

  get imgServicios() {
    return this.insertedServiciosForm.controls.img;
  }

  // FORMULARIO INSERT SERVICIOS
  public formServicios: boolean = false;

  MostrarFormularioS() {
    this.formServicios = true;
  }

  OcultarFormularioS() {
    this.formServicios = false;
  }

  /** BOTONES CONFIRMACION - DELETE SERVICIOS*/
  public VisibleBtnDeleteS: boolean = false;
  mostrarVisibleBtnDeleteS() {
    this.VisibleBtnDeleteS = true;
  }

  ocultarVisibleBtnDeleteS() {
    this.VisibleBtnDeleteS = false;
  }

  /** BOTONES CONFIRMACION - UPDATE SERVICIOS*/
  public VisibleBtnUpdateS: boolean = false;
  mostrarVisibleBtnUpdateS() {
    this.VisibleBtnUpdateS = true;
  }

  ocultarVisibleBtnUpdateS() {
    this.VisibleBtnUpdateS = false;
  }

  // FORMULARIO UPDATE SERVICIOS
  public formUpdateServiciosVisible: boolean = false;
  private servicioIdToUpdate: number | null = null;

  updateServicios() {
    if (this.insertedServiciosForm.valid && this.servicioIdToUpdate) {
      const servicioData = this.insertedServiciosForm
        .value as unknown as ServiciosModel;

      this.apiService
        .updateServicio(servicioData, this.servicioIdToUpdate)
        .subscribe({
          next: (response) => {
            if (response) {
              this.insertedServiciosForm.reset();
              this.OcultarUpdateServiciosFormulario();
              this.toastr.success('Se actualizó el servicio correctamente.');
              this.getServicios();
            } else {
              this.showError = true;
            }
          },
        });
    } else {
      this.insertedServiciosForm.markAllAsTouched();
    }
  }

  MostrarFormularioUpdateServicios(Id: number) {
    this.formUpdateServiciosVisible = true;
    this.servicioIdToUpdate = Id;

    this.apiService.getServicioById(Id).subscribe((servicio) => {
      this.insertedServiciosForm.patchValue({
        descripcion: servicio.descripcion,
        img: servicio.img,
        paquete: servicio.paquete.toString(),
        personalizacion: servicio.personalizacion,
      });
    });
  }

  OcultarUpdateServiciosFormulario() {
    this.formUpdateServiciosVisible = false;
  }
}
