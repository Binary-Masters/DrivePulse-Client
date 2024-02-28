// import * as pdfjsLib from 'pdfjs-dist';

// function extractImageFromPDF(file: File): string {
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   let imageSrc = '';

//   // Synchronously read the contents of the file as a data URL
//   reader.onload = () => {
//     const dataUrl: string = reader.result as string;

//     // Synchronously load the PDF document from the data URL
//     const pdf = pdfjsLib.getDocument({ data: atob(dataUrl.split(',')[1]) });

//     // Synchronously get the first page of the PDF document
//     const pageNumber = 1;
//     const page = pdf.getPage(pageNumber);

//     // Synchronously render the first page onto a canvas
//     const viewport = page.getViewport({ scale: 1 });
//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');
//     if (!context) {
//       console.error('Failed to get canvas context');
//       return '';
//     }
//     canvas.width = viewport.width;
//     canvas.height = viewport.height;
//     page.render({ canvasContext: context, viewport });

//     // Synchronously convert the canvas to an image
//     imageSrc = canvas.toDataURL('image/jpeg');
//   };

//   reader.onerror = () => {
//     console.error(reader.error);
//   };

//   return imageSrc;
// }
// export default extractImageFromPDF;

// // Example usage:
// // const fileInput: HTMLInputElement = document.getElementById('fileInput') as HTMLInputElement;
// // fileInput.addEventListener('change', (event) => {
// //   const file: File | null = (event.target as HTMLInputElement).files?.[0];
// //   if (file) {
// //     const imageSrc: string = extractImageFromPDF(file);
// //     console.log(imageSrc);
// //   }
// // });

