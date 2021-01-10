import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccountRequestComponent } from './customer-account-request.component';

describe('CustomerAccountRequestComponent', () => {
  let component: CustomerAccountRequestComponent;
  let fixture: ComponentFixture<CustomerAccountRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAccountRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAccountRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
