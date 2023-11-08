import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoCrudComponent } from './catalogo-crud.component';

describe('CatalogoCrudComponent', () => {
  let component: CatalogoCrudComponent;
  let fixture: ComponentFixture<CatalogoCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoCrudComponent]
    });
    fixture = TestBed.createComponent(CatalogoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
