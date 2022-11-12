import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxStationsComponent } from './dialog-box-stations.component';

describe('DialogBoxComponent', () => {
  let component: DialogBoxStationsComponent;
  let fixture: ComponentFixture<DialogBoxStationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoxStationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBoxStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
