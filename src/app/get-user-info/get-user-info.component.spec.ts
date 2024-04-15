import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserInfoComponent } from './get-user-info.component';

describe('GetUserInfoComponent', () => {
  let component: GetUserInfoComponent;
  let fixture: ComponentFixture<GetUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetUserInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
