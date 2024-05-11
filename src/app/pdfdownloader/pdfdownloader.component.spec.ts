import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfdownloaderComponent } from './pdfdownloader.component';

describe('PdfdownloaderComponent', () => {
  let component: PdfdownloaderComponent;
  let fixture: ComponentFixture<PdfdownloaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfdownloaderComponent]
    });
    fixture = TestBed.createComponent(PdfdownloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
