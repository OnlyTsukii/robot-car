import { Device } from "./definitions";

// export const Options = {
  // shouldReconnect: (closeEvent: Event) => true, 
  // reconnectInterval: 2000,
  // reconnectAttempts: 10,
  // retryOnError: true,
  // onClose: (event: WebSocketEventMap['close']) => {
  //   window.location.reload()
  // }
// }

export const BluetoothDevice          = 0;
export const XbeeDevice               = 1;
export const ScanRequest              = 2;
export const ConnectRequest           = 3;
export const DisconnectRequest        = 12;
export const ControlRequest           = 4;
export const ScanResponse             = 6;
export const ConnectResponse          = 7;
export const DisconnectResponse       = 13;
export const ControlResponse          = 8;
export const StatusOK                 = 10;
export const StatusFailed             = 11;

export const MoveForward              = 20;
export const MoveBackward             = 21;
export const MoveLeft                 = 22;
export const MoveRight                = 23;
export const MoveLeftForward          = 24;
export const MoveRightForward         = 25;
export const MoveLeftBackward         = 26;
export const MoveRightBackward        = 27;

export const SpeedUp                  = 28;
export const SlowDown                 = 29;
export const Pause                    = 30;

export const ClockwiseSpin            = 31;
export const CounterClockwiseSpin     = 32;


export type WsRequest = {
  deviceType: number;
  requestType: number;
  requestBody?: {
    controlParam?: number;
    connectDevice?: string;
  }
};

export type WsResponse = {
  responseType: number;
  responseBody: {
    status: number;
    deviceList?: Device[]
  }
}
