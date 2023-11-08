import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { apiService } from '../../services/api.service';
import { CatalogoModel, ServiciosModel } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';
import { contactoService } from 'src/app/services/contacto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  public listacatalogo: any = [];
  public listaservicios: any = [];
  public nombresCatalogo: any[] = [];
  public listacontacto: any[] = [];

  constructor(
    private apiService: apiService,
    private contactoService: contactoService,
    private formBuidler: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCatalogo();
    this.getContacto();
    this.getServicios();
  }

  routerPag(url: string): void {
    this.router.navigate([url]);
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
    this.ocultarVisibleBtnDelete();
    this.apiService.deleteCatalogo(Id);
    setTimeout(() => {
      this.getCatalogo();
    }, 900);
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
  // ----------
  public VisibleBtn: boolean = false;
  mostrarVisibleBtn() {
    this.VisibleBtn = true;
  }

  ocultarVisibleBtn() {
    this.VisibleBtn = false;
  }

  /** BOTONES CONFIRMACION - DELETE*/
  public VisibleBtnDelete: boolean = false;
  mostrarVisibleBtnDelete() {
    this.VisibleBtnDelete = true;
  }

  ocultarVisibleBtnDelete() {
    this.VisibleBtnDelete = false;
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

  // CONTACTO

  getContacto() {
    this.contactoService.getContacto().subscribe((contacto) => {
      this.listacontacto = contacto;
    });
  }

  deleteContacto(Id: number) {
    this.ocultarContacto();
    this.contactoService.deleteContacto(Id);
    setTimeout(() => {
      this.getContacto();
    }, 900);
  }

  public btnContacto: boolean = false;
  mostrarContacto() {
    this.btnContacto = true;
  }

  ocultarContacto() {
    this.btnContacto = false;
  }
}
