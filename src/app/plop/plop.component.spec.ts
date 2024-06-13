import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlopComponent } from './plop.component';

describe('PlopComponent', () => {
  let component: PlopComponent;
  let fixture: ComponentFixture<PlopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
