import threading
import serial
import time

from definitions import *
from motor_driver import UnderPan

class BLEServer:
  def __init__(self, port, baudrate = 115200) -> None:
    self.serial_port = serial.Serial(port, baudrate)
    self.underpan = UnderPan()

  def handle_ctrlcode(self, ctrl_code):
    if ctrl_code == MOVE_FORWARD:
      self.underpan.move_forward()
    elif ctrl_code == MOVE_BACKWARD:
      self.underpan.move_backward()
    elif ctrl_code == MOVE_LEFT:
      self.underpan.move_left()
    elif ctrl_code == MOVE_RIGHT:
      self.underpan.move_right()
    elif ctrl_code == MOVE_LEFT_FORWARD:
      self.underpan.move_left_forward()
    elif ctrl_code == MOVE_RIGHT_FORWARD:
      self.underpan.move_right_forward()
    elif ctrl_code == MOVE_LEFT_BACKWARD:
      self.underpan.move_left_backward()
    elif ctrl_code == MOVE_RIGHT_BACKWARD:
      self.underpan.move_right_backward()
    elif ctrl_code == CLOCKWISESPIN:
      self.underpan.clockwise_spin()
    elif ctrl_code == COUNTERCLOCKWISESPIN:
      self.underpan.counter_clockwise_spin()
    elif ctrl_code == SPEED_UP:
      self.underpan.speed_up()
    elif ctrl_code == SLOW_DOWN:
      self.underpan.slow_dowm()   
    elif ctrl_code == PAUSE:
      self.underpan.pause()   

  def slave_sart(self):
    while True:
      b = self.serial_port.read()
      if b.decode('utf-8') == '@':
        ctrl_code = int(self.serial_port.read(2).decode('utf-8'), 16)
        print("Received data:", ctrl_code)
        self.handle_ctrlcode(ctrl_code)
                
if __name__ == '__main__':
  try:
    ble_server = BLEServer('/dev/ttyUSB0', baudrate=115200)
    ble_server.underpan.boot()
    
    serial_thread = threading.Thread(target=ble_server.slave_sart, args=(), daemon=True)
    serial_thread.start()

    while True:
        pass
  except KeyboardInterrupt:
    ble_server.underpan.shutdowm()
    time.sleep(1)
