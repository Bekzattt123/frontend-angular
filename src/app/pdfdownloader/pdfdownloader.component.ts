import { Component, EventEmitter, Output } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

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
          const regex = new RegExp(`(\\d+(?:[.,]\\d+)?)\\s+${keyword}`);
          const match = regex.exec(line);
          if (match) {
            extractedText.push(`${keyword} ${match[1].replace(',', '.')}`);
          }
        });
      });
    }

    this.pdfText = extractedText;
  }
}
