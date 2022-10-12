import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GvaSearchResultComponent } from './gva-search-result.component';

describe('GvaSearchResultComponent', () => {
  let component: GvaSearchResultComponent;
  let fixture: ComponentFixture<GvaSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GvaSearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GvaSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
