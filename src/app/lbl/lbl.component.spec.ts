import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LblComponent } from './lbl.component';

describe('LblComponent', () => {
  let component: LblComponent;
  let fixture: ComponentFixture<LblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LblComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
