import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { apiService } from '../../services/api.service';
import { CatalogoModel, ServiciosModel } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  public listacatalogo: any = [];
  public listaservicios: any = [];
  public nombresCatalogo: any[] = [];

  constructor(
    private apiService: apiService,
    private formBuidler: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCatalogo();

    this.getServicios();
  }

  //------------------------------CATALOGO

  getCatalogo() {
    this.apiService.getCatalogo().subscribe((catalogo) => {
      this.listacatalogo = catalogo;

      this.nombresCatalogo = catalogo;
      // console.log('Nombres', this.nombresCatalogo);
    });
  }

  deleteCatalogo(Id: number) {
    this.apiService.deleteCatalogo(Id);
    this.getCatalogo();
  }

  showError = false;
  errorMessage = '';

  insertCatalogoForm = this.formBuidler.group({
    Id: [''],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    img: ['', [Validators.required]],
    items: ['', [Validators.required]],
  });

  insertCatalogo() {
    if (this.insertCatalogoForm.valid) {
      this.apiService
        .createCatalogo(
          this.insertCatalogoForm.value as unknown as CatalogoModel
        )
        .subscribe({
          next: (response) => {
            if (response) {
              this.insertCatalogoForm.reset();
              this.OcultarFormulario();
              this.toastr.success('Se creó correctamente.');
              this.getCatalogo();
            } else {
              this.showError = true;
            }
          },
        });
    } else {
      this.insertCatalogoForm.markAllAsTouched();
    }
    // console.log(this.insertCatalogoForm.value);
  }

  get nombre() {
    return this.insertCatalogoForm.controls.nombre;
  }

  get descripcion() {
    return this.insertCatalogoForm.controls.descripcion;
  }
  get img() {
    return this.insertCatalogoForm.controls.img;
  }
  get items() {
    return this.insertCatalogoForm.controls.items;
  }

  // FORMULARIO INSERT CATALOGO

  public formVisible: boolean = false;

  MostrarFormulario() {
    this.formVisible = true;
  }

  OcultarFormulario() {
    this.formVisible = false;
  }

  // FORMULARIO UPDATE CATALOGO
  public formUpdateVisible: boolean = false;
  private catalogoIdToUpdate: number | null = null;

  updateCatalogo() {
    if (this.insertCatalogoForm.valid && this.catalogoIdToUpdate) {
      const catalogoData = this.insertCatalogoForm
        .value as unknown as CatalogoModel;

      this.apiService
        .updateCatalogo(catalogoData, this.catalogoIdToUpdate)
        .subscribe({
          next: (response) => {
            if (response) {
              this.insertCatalogoForm.reset();
              this.OcultarUpdateFormulario();
              this.toastr.success('Se actualizó correctamente.');
              this.getCatalogo();
            } else {
              this.showError = true;
            }
          },
        });
    } else {
      this.insertCatalogoForm.markAllAsTouched();
    }
  }

  MostrarFormularioUpdate(Id: number) {
    this.formUpdateVisible = true;
    this.catalogoIdToUpdate = Id;

    // Cargar los datos del catálogo en el formulario
    this.apiService.getCatalogoById(Id).subscribe((catalogo) => {
      this.insertCatalogoForm.patchValue({
        nombre: catalogo.nombre,
        descripcion: catalogo.descripcion,
        img: catalogo.img,
        items: catalogo.items,
      });
    });
  }

  OcultarUpdateFormulario() {
    this.formUpdateVisible = false;
  }

  //--------------------------------------SERVICIOS
  getServicios() {
    this.apiService.getServicios().subscribe((servicios) => {
      console.log(servicios);
      this.listaservicios = servicios;
    });
  }

  deleteServicio(Id: number) {
    this.apiService.deleteServicio(Id);
    this.getServicios();
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

    // // Cargar los datos del servicio en el formulario
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
