import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosCrudComponent } from './servicios-crud.component';

describe('ServiciosCrudComponent', () => {
  let component: ServiciosCrudComponent;
  let fixture: ComponentFixture<ServiciosCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiciosCrudComponent]
    });
    fixture = TestBed.createComponent(ServiciosCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
