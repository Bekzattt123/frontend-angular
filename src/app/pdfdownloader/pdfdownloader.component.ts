import { Component, EventEmitter, Output } from '@angular/core';
import { DataUploadService } from '../data-upload.service';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse

@Component({
  selector: 'app-pdfdownloader',
  templateUrl: './pdfdownloader.component.html',
  styleUrls: ['./pdfdownloader.component.css']
})
export class PdfdownloaderComponent {
  @Output() pdfUploaded = new EventEmitter<File>();
  pdfText: string[] = [];
  keywords: string[] = [
    'Гемоглобин', 'Эритроциты', 'Цветной показатель', 'Гематокрит', 'Тромбоциты',
    'Лейкоциты', 'Эозинофилы', 'Базофилы', 'Лимфоциты', 'Моноциты',
    'СОЭ Скорость оседания эритроцитов по Вестергрену', 'Нейтрофилы',
    'Средняя концентрация гемоглобина в эритроците', 'Средний объем эритроцитов',
    'Среднее содержание гемоглобина в эритроците', 'Тромбокрит'
  ];

  constructor(private dataUploadService: DataUploadService) {}

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      this.loadPDF(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    target.classList.add('drag-over');
  }

  onDragLeave(event: DragEvent): void {
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('drag-over');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('drag-over');

    if (event.dataTransfer?.items) {
      const file = event.dataTransfer.items[0].getAsFile();
      if (file) {
        this.loadPDF(file);
      }
    } else if (event.dataTransfer?.files) {
      const file = event.dataTransfer.files[0];
      this.loadPDF(file);
    }
  }

  async loadPDF(file: File): Promise<void> {
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();

      reader.onload = async (e: ProgressEvent<FileReader>) => {
        const pdfData = e.target?.result as ArrayBuffer;
        if (pdfData) {
          await this.extractTextFromPDF(pdfData);
          await this.uploadPdfData(); // Upload extracted data to server
          this.pdfUploaded.emit(file);
        }
      };

      reader.onerror = (e) => {
        console.error('File reading error:', e);
        alert('An error occurred while reading the file.');
      };

      reader.readAsArrayBuffer(file);
    } else {
      alert('Please upload a file in PDF format.');
    }
  }

  async extractTextFromPDF(pdfData: ArrayBuffer): Promise<void> {
    const pdfjsLib = await import('pdfjs-dist/build/pdf');
    const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');

    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    const pdf = await loadingTask.promise;

    const numPages = pdf.numPages;
    let extractedText: string[] = [];

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      let pageText = '';

      textContent.items.forEach((item: any) => {
        pageText += item.str + ' ';
      });

      const lines = pageText.split('\n');
      lines.forEach(line => {
        this.keywords.forEach(keyword => {
          const regex = new RegExp(`(\\d*\\.?\\d+\\s*)${keyword}`);
          const match = regex.exec(line);
          if (match) {
            extractedText.push(`${keyword} ${match[1].trim()}`);
          }
        });
      });
    }

    this.pdfText = extractedText;
  }

  async uploadPdfData(): Promise<void> {
    const testData: any = {
      hemoglobinLevel: 0,
      rbcLevel: 0,
      colorIndicatorLevel: 0,
      reticulocytesLevel: 0,
      plateletsLevel: 0,
      wbcLevel: 0,
      neutrophilsLevel: 0,
      eosinophilsLevel: 0,
      basophilsLevel: 0,
      lymphocytesLevel: 0,
      monocytesLevel: 0,
      ESRLevel: 0,
      hematocritLevel: 0,
      mchc: 0,
      mcv: 0,
      mch: 0,
      thrombocritLevel: 0
    };

    this.pdfText.forEach(item => {
      const [key, value] = item.split(' ');
      const numValue = parseFloat(value.replace(',', '.'));
      switch (key) {
        case 'Гемоглобин':
          testData.hemoglobinLevel = numValue;
          break;
        case 'Эритроциты':
          testData.rbcLevel = numValue;
          break;
        case 'Цветной':
          testData.colorIndicatorLevel = numValue;
          break;
        case 'Гематокрит':
          testData.hematocritLevel = numValue;
          break;
        case 'Тромбоциты':
          testData.plateletsLevel = numValue;
          break;
        case 'Лейкоциты':
          testData.wbcLevel = numValue;
          break;
        case 'Эозинофилы':
          testData.eosinophilsLevel = numValue;
          break;
        case 'Базофилы':
          testData.basophilsLevel = numValue;
          break;
        case 'Лимфоциты':
          testData.lymphocytesLevel = numValue;
          break;
        case 'Моноциты':
          testData.monocytesLevel = numValue;
          break;
        case 'СОЭ':
          testData.ESRLevel = numValue;
          break;
        case 'Нейтрофилы':
          testData.neutrophilsLevel = numValue;
          break;
        case 'Средняя':
          testData.mchc = numValue;
          break;
        case 'Средний':
          testData.mcv = numValue;
          break;
        case 'Среднее':
          testData.mch = numValue;
          break;
        case 'Тромбокрит':
          testData.thrombocritLevel = numValue;
          break;
        default:
          break;
      }
    });

    try {
      const response = await this.dataUploadService.uploadTestResults(testData).toPromise();
      // Check for successful response
      if (response && typeof response === 'object' && response.text === "The data has been processed successfully!") {
        alert('Test results uploaded successfully.');
      } else {
        console.error('Unexpected server response:', response);
        alert('Server error occurred. Please try again later.');
      }
    } catch (error) {
      this.handleError(error); // Handle the error here
    }
  }

  private handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
        alert('An error occurred on the client side or network.');
      } else {
        console.error('Server error:', error.status, error.error);
        if (error.status === 0) {
          alert('Server is unreachable. Please check your internet connection.');
        } else if (error.status === 400) {
          alert('Bad request. Please check your input data.');
        } else if (error.status === 401) {
          alert('Unauthorized. Please login again.');
        } else if (error.status === 404) {
          alert('Resource not found.');
        } else if(error.status === 200) {
          alert('The data has been processed successfully!');
        }
      }
    } else {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred.');
    }
  }

}
