import React from 'react';
import './ImportButton.css';

export default class ImportButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isActive: true };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.isActive) {
      this.setState({ isActive: false });
      window.pdfjsLib
        .getDocument(this.props.src)
        .promise.then((pdf) => {
          // TODO: handle multiple pages
          // document.querySelector('#page-count').textContent = pdf.numPages;
          pdf.getPage(1).then((page) => {
            page.getTextContent().then((data) => {
              // send data back to app;
              this.props.onImport(data.items);
              this.setState({ isActive: true });
            });
          });
          pdf.getPage(2).then((page) => {
            page.getTextContent().then((data) => {
              // send data back to app;
              console.log(data.items);
            });
          });
        })
        .catch((err) => {
          // TODO: handle errors
          console.log(err);
          this.setState({ isActive: true });
        });
    }
  }

  render() {
    return (
      <button
        onClick={this.handleClick}
        className={this.state.isActive ? 'active' : 'loading'}
      >
        {this.state.isActive
          ? 'Importer une Commande'
          : 'Importation en cours...'}
      </button>
    );
  }
}
