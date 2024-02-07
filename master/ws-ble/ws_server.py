import asyncio
import websockets
import json

from definitions import *
import ble_client as ble

class WsServer:
    def __init__(self, bclient) -> None:
        self.ble_client = bclient

    class CustomEncoder(json.JSONEncoder):
        def default(self, obj):
            if hasattr(obj, '__dict__'):
                return obj.__dict__
            return super().default(obj)

    def getResponse(self, type, status, devices=None) -> WsResponse:
        body = ResponseBody(status, devices)
        resp = WsResponse(type, body)
        return resp

    async def handleMessage(self, websocket, receivedMessage):
        msg = json.loads(receivedMessage)
        if msg["requestType"] == SCAN_REQUEST:
            devices = []
            if msg["deviceType"] == BLUETOOTH_DEVICE:
                devices = await self.ble_client.ble_discover()
            elif msg["deviceType"] == XBEE_DEVICE:
                # todo
                pass
            resp = self.getResponse(SCAN_RESPONSE, OK, devices)
            await websocket.send(json.dumps(resp, cls=self.CustomEncoder))
        elif msg["requestType"] == CONNECT_REQUEST:
            address = msg["requestBody"]["connectDevice"]
            res = await self.ble_client.ble_connect(address)
            print(res)
            resp = WsResponse(CONNECT_RESPONSE, ResponseBody(OK))
            if res == False:
                resp = self.getResponse(CONNECT_RESPONSE, ResponseBody(FAILED))
            await websocket.send(json.dumps(resp, cls=self.CustomEncoder))
        elif msg["requestType"] == DISCONNECT_REQUEST:
            res = await self.ble_client.ble_disconnect()
            print(res)
            resp = WsResponse(DISCONNECT_RESPONSE, ResponseBody(OK))
            if res == False:
                resp = self.getResponse(DISCONNECT_RESPONSE, ResponseBody(FAILED))
            await websocket.send(json.dumps(resp, cls=self.CustomEncoder))
        elif msg["requestType"] == CONTROL_REQUEST:
            ctrl_code = msg["requestBody"]["controlParam"]
            await self.ble_client.ble_write(int(ctrl_code))

    async def handler(self, websocket):
        while True:
                message = await websocket.recv()
                print(message)
                await self.handleMessage(websocket, message)

    async def start(self):
        async with websockets.serve(self.handler, LOCAL_IP, PORT):
            await asyncio.Future()  # run forever


if __name__ == "__main__":
    ble_client = ble.BLEClient()
    ws_server = WsServer(ble_client)
    asyncio.run(ws_server.start())