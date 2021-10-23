import React from 'react';
import { Button } from '@blueprintjs/core';

export default class ImportButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (!this.state.isLoading) {
      const getData = (pdf, pageNumber) => {
        return pdf.getPage(pageNumber).then((page) => page.getTextContent());
      };

      this.setState({ isLoading: true });

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
            this.setState({ isLoading: false });
          });
        })
        .catch((err) => {
          // TODO: handle errors
          console.log(err);
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    return (
      <Button
        intent="primary"
        onClick={this.handleClick}
        disabled={this.state.isLoading}
        icon="document"
      >
        Importer une Commande
      </Button>
    );
  }
}
