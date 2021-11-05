import parseImportedData from './parseImportedData';

const getData = (pdf, pageNumber) => {
  return pdf.getPage(pageNumber).then((page) => page.getTextContent());
};

export default function loadPdfData(srcFile) {
  return window.pdfjsLib
    .getDocument(srcFile)
    .promise.then((pdf) => {
      const pages = Array.from(Array(pdf.numPages).keys());
      let promises = [];

      pages.forEach((pageNumber) =>
        promises.push(getData(pdf, pageNumber + 1))
      );

      return Promise.all(promises).then((result) => {
        const data = result.reduce((prev, curr) => {
          return prev.concat(curr.items);
        }, []);
        return parseImportedData(data);
      });
    })
    .catch((err) => {
      // TODO: handle errors
      console.log(err);
    });
}
