import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxTripsComponent } from './dialog-box-trips.component';

describe('DialogBoxTripsComponent', () => {
  let component: DialogBoxTripsComponent;
  let fixture: ComponentFixture<DialogBoxTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoxTripsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBoxTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
