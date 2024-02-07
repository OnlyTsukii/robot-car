'use client'

import ListBox from '@/app/ui/dashboard/listbox'
import DeviceList from './ui/dashboard/table';
import { Device, AlertBody } from './lib/definitions';
import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Config from '../config';
import MyAlert from './ui/alert'
import {
  ScanResponse,
  ConnectResponse,
  DisconnectResponse,
  ControlResponse,
  StatusOK,
  StatusFailed
} from './lib/websocket';

export default function Page() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [alertBody, setAlertBody] = useState<AlertBody>();
  const [selectedItem, setSelectedItem] = useState(0);
  const [connectStatus, setConnectStatus] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false)

  const [socketUrl, setSocketUrl] = useState('ws://' + Config.defaultServer + ':' + Config.defaultPort)

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  function ShowAlert(alertBody: AlertBody) {
    setAlertBody(alertBody)
    setTimeout(() => {
      setAlertBody((prev) => {
        if (prev != undefined)
          return {
            alertType: prev?.alertType,
            open: false,
            alertMsg: prev?.alertMsg
          }
      })
    }, 3000);
  }
  
  useEffect(() => {
    if (readyState == ReadyState.OPEN) {
      const temp = {
        alertType: "success",
        open: true,
        alertMsg: "Connect to server successfully !"
      };
      ShowAlert(temp)
      setCanRefresh(true)
    } else if (readyState == ReadyState.CLOSED) {
      const temp = {
        alertType: "warning",
        open: true,
        alertMsg: "Connection to server has closed !"
      };
      ShowAlert(temp)
      if (canRefresh) {
        window.location.reload();
        setCanRefresh(false)
      }
    }
  }, [readyState])

  useEffect(() => {
    if (lastMessage != null) {
      const data = JSON.parse(lastMessage.data);
      if(data?.responseType == ScanResponse) {
        setLoading(false)
        if (data?.responseBody?.deviceList != undefined)
          setDevices(data?.responseBody?.deviceList)
      } else if(data?.responseType == ConnectResponse) {
        setLoading(false)
        if (data?.responseBody?.status == StatusOK) {
          const temp = {
            alertType: "success",
            open: true,
            alertMsg: "Connect to device successfully !"
          };
          ShowAlert(temp)
          setConnectStatus(true);
        } else {
          const temp = {
            alertType: "warning",
            open: true,
            alertMsg: "Connect to device failed !"
          };
          ShowAlert(temp)
        }
      } else if(data?.responseType == DisconnectResponse) {
        setLoading(false)
        if (data?.responseBody?.status == StatusOK) {
          setConnectStatus(false);
          const temp = {
            alertType: "success",
            open: true,
            alertMsg: "Disconnect to device successfully !"
          };
          ShowAlert(temp);
        } else {
          const temp = {
            alertType: "warning",
            open: true,
            alertMsg: "Disconnect to device failed."
          };
          ShowAlert(temp)
        }
      } else if(data?.responseType == ControlResponse) {
        setLoading(false)
      }
    }
  }, [lastMessage])

  return (
    <>
      <MyAlert alertBody={alertBody}></MyAlert>
      <main className="h-full w-full grid grid-cols-2 gap-4">
        <div className="col-span-1 px-20 py-4 bg-gray-50 rounded-lg">
          <div className='text-2xl font-medium mt-3'>Remote Control</div>
          <div className='mt-4'>
            <ListBox 
              setSelectedItem={setSelectedItem}
              setLoading={setLoading} 
              sendMessage={sendMessage}
              readyState={readyState}
              showAlert={ShowAlert}
              loading={loading}
              connectStatus={connectStatus}
              setDevices={setDevices}
            />
          </div>
          <div className='mt-2'>
            <DeviceList 
              devices={devices} 
              loading={loading}
              setLoading={setLoading} 
              sendMessage={sendMessage}
              selectedItem={selectedItem}
              connectStatus={connectStatus}
            ></DeviceList>
          </div>
        </div>
        <div className="col-span-1 bg-gray-50 rounded-lg"></div>
      </main>
    </>
  );
}
