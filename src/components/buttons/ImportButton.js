import { useState } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import IpcService from '../../services/IpcService';
import { CHANNELS } from '../../shared/constants/channels';

export default function ImportButton() {
  const [systemInfo, setSystemInfo] = useState(null);

  const handleClick = () => {
    const systemInfoService = new IpcService(CHANNELS.SYSTEM_INFO);
    systemInfoService.send().then((ipcMainResponse) => {
      setSystemInfo(ipcMainResponse);
    });
  };

  return (
    <div>
      <Button intent={Intent.PRIMARY} onClick={handleClick}>
        System info
      </Button>
      <p>{systemInfo}</p>
    </div>
  );
}
