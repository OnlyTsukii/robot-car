export type Device = {
  icon: string;
  type: string;
  name: string;
  address: string;
  rssi: number;
}

export type AlertBody = {
  alertType: string;
  open: boolean;
  alertMsg: string;
}