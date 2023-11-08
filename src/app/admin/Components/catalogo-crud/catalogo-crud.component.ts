import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catalogoService as apiService} from '../../../services/catalogo.service';
import { CatalogoModel } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-catalogo-crud',
  templateUrl: './catalogo-crud.component.html',
  styleUrls: ['./catalogo-crud.component.css'],
})
export class CatalogoCrudComponent implements OnInit {
  public listacatalogo: any = [];
  public nombresCatalogo: any[] = [];

  constructor(
    private apiService: apiService,
    private formBuidler: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCatalogo();
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
}
