import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlonePageComponent } from './alone-page.component';

describe('AlonePageComponent', () => {
  let component: AlonePageComponent;
  let fixture: ComponentFixture<AlonePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlonePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlonePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
