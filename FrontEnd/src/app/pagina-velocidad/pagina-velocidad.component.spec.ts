import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaVelocidadComponent } from './pagina-velocidad.component';

describe('PaginaVelocidadComponent', () => {
  let component: PaginaVelocidadComponent;
  let fixture: ComponentFixture<PaginaVelocidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaVelocidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaVelocidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
