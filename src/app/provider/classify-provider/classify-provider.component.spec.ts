import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifyProviderComponent } from './classify-provider.component';

describe('ClassifyProviderComponent', () => {
  let component: ClassifyProviderComponent;
  let fixture: ComponentFixture<ClassifyProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassifyProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifyProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
