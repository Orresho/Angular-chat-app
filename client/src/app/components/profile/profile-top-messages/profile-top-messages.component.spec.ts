import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTopMessagesComponent } from './profile-top-messages.component';

describe('ProfileTopMessagesComponent', () => {
  let component: ProfileTopMessagesComponent;
  let fixture: ComponentFixture<ProfileTopMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTopMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTopMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
