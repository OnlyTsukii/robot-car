import threading
import serial

def read_serial_data(port):
    while True:
        b = port.read()
        if b.decode('utf-8') == '@':
            data = int(port.read(2).decode('utf-8'), 16)
            print("Received data:", data)

ser = serial.Serial('COM5', baudrate=115200)

serial_thread = threading.Thread(target=read_serial_data, args=(ser,), daemon=True)
serial_thread.start()

running = True

try:
    while running:
        pass
except KeyboardInterrupt:
    running = False
