// src/types/pdfjs-dist.d.ts

declare module 'pdfjs-dist/build/pdf' {
  const pdfjsLib: any;
  export = pdfjsLib;
}

declare module 'pdfjs-dist/build/pdf.worker.entry' {
  const pdfjsWorker: any;
  export = pdfjsWorker;
}
