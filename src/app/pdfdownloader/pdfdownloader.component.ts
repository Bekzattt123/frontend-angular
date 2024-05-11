import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-pdfdownloader',
  templateUrl: './pdfdownloader.component.html',
  styleUrls: ['./pdfdownloader.component.css']
})
export class PdfdownloaderComponent {
  @Output() pdfUploaded = new EventEmitter<File>();

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    this.loadPDF(file);
  }

  onDragOver(event: any): void {
    event.preventDefault();
    event.currentTarget.classList.add('drag-over');
  }

  onDrop(event: any): void {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');

    // Check if files were dropped
    if (event.dataTransfer.items) {
      // Use the first dropped item
      const file = event.dataTransfer.items[0].getAsFile();

      // Load the PDF file
      this.loadPDF(file);
    } else {
      // Fallback for browsers that do not support event.dataTransfer.items
      const file = event.dataTransfer.files[0];

      // Load the PDF file
      this.loadPDF(file);
    }
  }


  loadPDF(file: File): void {
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        // Emit the loaded file content
        this.pdfUploaded.emit(e.target.result);
      };

      // Error handler for FileReader
      reader.onerror = (e) => {
        // Handle error
        console.error('File reading error:', e);
        alert('An error occurred while reading the file.');
      };

      // Start reading the file
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a file in PDF format.');
    }
  }

}
