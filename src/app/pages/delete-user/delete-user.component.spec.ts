import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUSerComponent } from './delete-user.component';

describe('DeleteUSerComponent', () => {
  let component: DeleteUSerComponent;
  let fixture: ComponentFixture<DeleteUSerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUSerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
