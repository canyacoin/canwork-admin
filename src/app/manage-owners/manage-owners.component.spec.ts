import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOwnersComponent } from './manage-owners.component';

describe('ManageOwnersComponent', () => {
  let component: ManageOwnersComponent;
  let fixture: ComponentFixture<ManageOwnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageOwnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
