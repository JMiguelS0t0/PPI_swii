import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catalogoService as apiService } from '../../../services/catalogo.service';
import { CatalogoModel } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
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
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
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
    fimg: ['', [Validators.required]],
    items: ['', [Validators.required]],
    img: [''],
  });

  // ---------------------------- IMAGEN BASE 64

  capturarArchivo(event: any): any {
    const archivoCapturado = event.target.files[0];
    this.extrarBase64(archivoCapturado).then((imagen: string | null) => {
      console.log(typeof imagen);

      this.insertCatalogoForm.controls.img.setValue(imagen);
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
  get fimg() {
    return this.insertCatalogoForm.controls.fimg;
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
        // img: catalogo.img,
        items: catalogo.items,
      });
    });
  }

  OcultarUpdateFormulario() {
    this.formUpdateVisible = false;
  }
}
