import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneSchedulesComponent } from './zone-schedules.component';

describe('ZoneSchedulesComponent', () => {
  let component: ZoneSchedulesComponent;
  let fixture: ComponentFixture<ZoneSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoneSchedulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoneSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
