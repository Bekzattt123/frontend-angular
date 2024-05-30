import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailsendedComponent } from './mailsended.component';

describe('MailsendedComponent', () => {
  let component: MailsendedComponent;
  let fixture: ComponentFixture<MailsendedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailsendedComponent]
    });
    fixture = TestBed.createComponent(MailsendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
