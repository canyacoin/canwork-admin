import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteProviderComponent } from './vote-provider.component';

describe('VoteProviderComponent', () => {
  let component: VoteProviderComponent;
  let fixture: ComponentFixture<VoteProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
