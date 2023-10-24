import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntServiciosComponent } from './ent-servicios.component';

describe('EntServiciosComponent', () => {
  let component: EntServiciosComponent;
  let fixture: ComponentFixture<EntServiciosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntServiciosComponent]
    });
    fixture = TestBed.createComponent(EntServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
