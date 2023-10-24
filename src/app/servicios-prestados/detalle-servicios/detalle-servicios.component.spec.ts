import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleServiciosComponent } from './detalle-servicios.component';

describe('DetalleServiciosComponent', () => {
  let component: DetalleServiciosComponent;
  let fixture: ComponentFixture<DetalleServiciosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleServiciosComponent]
    });
    fixture = TestBed.createComponent(DetalleServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
