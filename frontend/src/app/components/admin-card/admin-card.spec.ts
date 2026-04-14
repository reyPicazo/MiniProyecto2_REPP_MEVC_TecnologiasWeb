import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCard } from './admin-card';

describe('AdminCard', () => {
  let component: AdminCard;
  let fixture: ComponentFixture<AdminCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
