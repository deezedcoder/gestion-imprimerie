import { useState } from 'react';
import { Button } from '@blueprintjs/core';
import IpcService from '../../services/IpcService';

export default function ImportButton() {
  const [systemInfo, setSystemInfo] = useState(null);

  const handleClick = () => {
    const systemInfoService = new IpcService('system-info');
    systemInfoService.send().then((ipcMainResponse) => {
      setSystemInfo(ipcMainResponse);
    });
  };

  return (
    <div>
      <Button intent="primary" onClick={handleClick}>
        System info
      </Button>
      <p>{systemInfo}</p>
    </div>
  );
}
