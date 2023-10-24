import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosPrestadosComponent } from './servicios-prestados.component';

describe('ServiciosPrestadosComponent', () => {
  let component: ServiciosPrestadosComponent;
  let fixture: ComponentFixture<ServiciosPrestadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiciosPrestadosComponent]
    });
    fixture = TestBed.createComponent(ServiciosPrestadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
