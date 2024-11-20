import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaTiempoComponent } from './pagina-tiempo.component';

describe('PaginaTiempoComponent', () => {
  let component: PaginaTiempoComponent;
  let fixture: ComponentFixture<PaginaTiempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaTiempoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
