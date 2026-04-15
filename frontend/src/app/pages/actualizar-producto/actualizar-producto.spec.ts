import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarProducto } from './actualizar-producto';

describe('ActualizarProducto', () => {
  let component: ActualizarProducto;
  let fixture: ComponentFixture<ActualizarProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarProducto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
