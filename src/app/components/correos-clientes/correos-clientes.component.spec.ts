import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreosClientesComponent } from './correos-clientes.component';

describe('CorreosClientesComponent', () => {
  let component: CorreosClientesComponent;
  let fixture: ComponentFixture<CorreosClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorreosClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorreosClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
