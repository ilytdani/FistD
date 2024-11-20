import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDistanciaComponent } from './pagina-distancia.component';

describe('PaginaDistanciaComponent', () => {
  let component: PaginaDistanciaComponent;
  let fixture: ComponentFixture<PaginaDistanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaDistanciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaDistanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
