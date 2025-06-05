import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfoAdicionalComponent } from './info-adicional.component';

describe('InfoAdicionalComponent', () => {
  let component: InfoAdicionalComponent;
  let fixture: ComponentFixture<InfoAdicionalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [InfoAdicionalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
