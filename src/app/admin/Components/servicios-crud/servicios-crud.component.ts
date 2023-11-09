import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { servicioService as apiService } from '../../../services/servicio.service';
import { catalogoService } from 'src/app/services/catalogo.service';
import { ServiciosModel } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

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
    private catalogoService: catalogoService,
    private sanitizer: DomSanitizer
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
    fimg: ['', [Validators.required]],
    personalizacion: ['', [Validators.required]],
    img: [''],
  });

  capturarArchivo(event: any): any {
    const archivoCapturado = event.target.files[0];
    this.extrarBase64(archivoCapturado).then((imagen: string | null) => {
      console.log(typeof imagen);

      this.insertedServiciosForm.controls.img.setValue(imagen);
      // console.log(imagen);
    });
    console.log(archivoCapturado);
    // console.log(event.target.files[0]);
  }
  extrarBase64 = ($event: any): Promise<string | null> => {
    return new Promise((resolve): void => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();

        reader.readAsDataURL($event);

        reader.onload = () => {
          resolve(reader.result as string);
        };

        reader.onerror = (error) => {
          resolve(null);
        };
      } catch (e) {
        resolve(null);
      }
    });
  };

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

  get fimgServicios() {
    return this.insertedServiciosForm.controls.fimg;
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
        paquete: servicio.paquete.toString(),
        personalizacion: servicio.personalizacion,
      });
    });
  }

  OcultarUpdateServiciosFormulario() {
    this.formUpdateServiciosVisible = false;
  }
}
