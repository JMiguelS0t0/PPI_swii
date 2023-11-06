import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntCatalogoComponent } from './ent-catalogo.component';

describe('EntCatalogoComponent', () => {
  let component: EntCatalogoComponent;
  let fixture: ComponentFixture<EntCatalogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntCatalogoComponent]
    });
    fixture = TestBed.createComponent(EntCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
