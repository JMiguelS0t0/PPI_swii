import { ComponentFixture, TestBed } from '@angular/core/testing';

import { homeComponent } from './home.component';

describe('InicioComponent', () => {
  let component: homeComponent;
  let fixture: ComponentFixture<homeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [homeComponent]
    });
    fixture = TestBed.createComponent(homeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
