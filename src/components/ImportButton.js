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
      const getData = (pdf, pageNumber) => {
        return pdf.getPage(pageNumber).then((page) => page.getTextContent());
      };

      this.setState({ isActive: false });

      window.pdfjsLib
        .getDocument(this.props.src)
        .promise.then((pdf) => {
          const pages = Array.from(Array(pdf.numPages).keys());
          let promises = [];

          pages.forEach((pageNumber) =>
            promises.push(getData(pdf, pageNumber + 1))
          );

          Promise.all(promises).then((result) => {
            const data = result.reduce((prev, curr) => {
              return prev.concat(curr.items);
            }, []);

            this.props.onImport(data);
            this.setState({ isActive: true });
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
