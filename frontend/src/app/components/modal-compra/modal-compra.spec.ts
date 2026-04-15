import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCompra } from './modal-compra';

describe('ModalCompra', () => {
  let component: ModalCompra;
  let fixture: ComponentFixture<ModalCompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCompra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCompra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
