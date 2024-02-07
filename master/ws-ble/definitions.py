from dataclasses import dataclass
from typing import Optional, List

LOCAL_IP = "127.0.0.1"
PORT = 1234

PEER_ADDRESS = "24:DC:C3:C3:09:8E"

BLUETOOTH_DEVICE = 0
XBEE_DEVICE = 1
SCAN_REQUEST = 2
CONNECT_REQUEST = 3
DISCONNECT_REQUEST = 12
CONTROL_REQUEST = 4
SCAN_RESPONSE = 6
CONNECT_RESPONSE = 7
DISCONNECT_RESPONSE = 13
CONTROL_RESPONSE = 8
OK = 10
FAILED = 11

MOVE_FORWARD = 20
MOVE_BACKWARD = 21
MOVE_LEFT = 22
MOVE_RIGHT = 23
MOVE_LEFT_FORWARD = 24
MOVE_RIGHT_FORWARD = 25
MOVE_LEFT_BACKWARD = 26
MOVE_RIGHT_FORWARD = 27

SPEED_UP = 28
SLOW_DOWN = 29
PAUSE = 30

BLUETOOTH_ICON = "https://cdn-icons-png.flaticon.com/128/9173/9173887.png"
BLUETOOTH_TYPE = "Bluetooth"
SLAVE_CHARACTERISTIC_UUID = "0000ff01-0000-1000-8000-00805f9b34fb"


@dataclass
class RequestBody:
    controlParam: Optional["int"] = None
    connectDevice: Optional["str"] = None


@dataclass
class WsRequest:
    deviceType: int
    requestType: int
    requestBody: Optional["RequestBody"] = None


@dataclass
class ResponseBody:
    status: int
    deviceList: Optional[List["Device"]] = None


@dataclass
class WsResponse:
    responseType: int
    responseBody: ResponseBody


@dataclass
class Device:
    icon: str
    type: str
    name: str
    address: str
    rssi: int
