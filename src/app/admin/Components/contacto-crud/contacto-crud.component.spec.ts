import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoCrudComponent } from './contacto-crud.component';

describe('ContactoCrudComponent', () => {
  let component: ContactoCrudComponent;
  let fixture: ComponentFixture<ContactoCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactoCrudComponent]
    });
    fixture = TestBed.createComponent(ContactoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
