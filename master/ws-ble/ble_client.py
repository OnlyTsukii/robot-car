from bleak import *
from definitions import *
import asyncio
from copy import deepcopy


class BLEClient:
   def __init__(self) -> None:
      self.device = None
      self.scanner = None
      self.trigger = asyncio.Event()
      self.device = None

   def detection_callback(self, dev: BLEDevice, adv: AdvertisementData):
      print(dev.name)
      if dev.address == PEER_ADDRESS and dev.name != None:
         self.device = Device(BLUETOOTH_ICON, BLUETOOTH_TYPE, dev.name, dev.address, adv.rssi)
         self.trigger.set()

   async def ble_discover(self) -> []:
      self.scanner = BleakScanner(detection_callback=self.detection_callback, scanning_mode='active')
      await self.scanner.start()
      await self.trigger.wait()
      await self.scanner.stop()
      temp = deepcopy(self.device)
      self.device = None
      self.trigger.clear()
      return [temp]
      
   async def ble_connect(self, address: str) -> bool:
      self.device = BleakClient(address)
      return await self.device.connect()

   async def ble_disconnect(self) -> bool:
      return await self.device.disconnect()
   
   async def ble_write(self, param: int):
      await self.device.write_gatt_char(char_specifier=SLAVE_CHARACTERISTIC_UUID, data=param.to_bytes())
         
if __name__ == "__main__":
   client = BLEClient()
   asyncio.run(client.ble_discover())