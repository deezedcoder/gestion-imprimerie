import React from 'react';
import { Button } from '@blueprintjs/core';
import IpcService from '../../services/IpcService';

export default class ImportButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { systemInfo: null };
  }

  async handleClick() {
    const systemInfoService = new IpcService('system-info', {
      responseChannel: 'system-info-response',
    });
    const ipcResponse = await systemInfoService.send();
    console.log(ipcResponse);
    this.setState({ systemInfo: ipcResponse });
  }

  render() {
    return (
      <div>
        <Button intent="primary" onClick={this.handleClick}>
          System info
        </Button>
        <p>{this.state.systemInfo}</p>
      </div>
    );
  }
}
