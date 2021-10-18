import React from 'react';
import { getDocument } from '../libs/pdfjs/build/pdf';
import './ImportButton.css';

export default class ImportButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.props.src);

    getDocument(this.props.src).promise.then((pdf) => {
      // document.querySelector('#page-count').textContent = pdf.numPages;
      pdf.getPage(1).then((page) => {
        page.getTextContent().then((data) => {
          console.log(data);
          // send data to app;
        });
      });
    });
  }

  render() {
    return <button onClick={this.handleClick}>Import</button>;
  }
}
