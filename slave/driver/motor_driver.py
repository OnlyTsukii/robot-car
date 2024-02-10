from gpiozero import *
import time


class Wheel_A:
  def __init__(self) -> None:
    self.pwm = PWMLED(22)
    self.in1 = LED(17)
    self.in2 = LED(27)
    self.is_forward = False
    self.is_backward = False

  def forward(self):
    if self.pwm.value == 0:
      self.pwm.value = 0.3

    self.in1.off()
    self.in2.on()
    self.is_forward = False
    self.is_backward = True

  def backward(self):
    if self.pwm.value == 0:
      self.pwm.value = 0.3
    
    self.in1.on()
    self.in2.off()
    self.is_forward = False
    self.is_backward = True

  def pause(self):
    self.in1.off()
    self.in2.off()
    self.pwm.off()

  def adjust_velocity(self, vel: float):
    self.pwm.value = vel

class Wheel_B:
  def __init__(self) -> None:
    self.pwm = PWMLED(13)
    self.in1 = LED(9)
    self.in2 = LED(10)
    self.is_forward = False
    self.is_backward = False

  def forward(self):
    if self.pwm.value == 0:
      self.pwm.value = 0.3

    self.in1.off()
    self.in2.on()
    self.is_forward = False
    self.is_backward = True

  def backward(self):
    if self.pwm.value == 0:
      self.pwm.value = 0.3
    
    self.in1.on()
    self.in2.off()
    self.is_forward = False
    self.is_backward = True
  
  def pause(self):
    self.in1.off()
    self.in2.off()
    self.pwm.off()
  
  def adjust_velocity(self, vel: float):
    self.pwm.value = vel

class Wheel_C:
  def __init__(self) -> None:
    self.pwm = PWMLED(14)
    self.in1 = LED(3)
    self.in2 = LED(2)
    self.is_forward = False
    self.is_backward = False

  def forward(self):
    if self.pwm.value == 0:
      self.pwm.value = 0.3
    
    self.in1.on()
    self.in2.off()
    self.is_forward = True
    self.is_backward = False

  def backward(self):
    if self.pwm.value == 0:
      self.pwm.value = 0.3

    self.in1.off()
    self.in2.on()
    self.is_backward = True
    self.is_forward = False

  def pause(self):
    self.in1.off()
    self.in2.off()
    self.pwm.off()

  def adjust_velocity(self, vel: float):
    self.pwm.value = vel

class Wheel_D:
  def __init__(self) -> None:
    self.pwm = PWMLED(6)
    self.in1 = LED(0)
    self.in2 = LED(5)
    self.is_forward = False
    self.is_backward = False

  def forward(self):
    if self.pwm.value == 0:
      self.pwm.value = 0.3
    
    self.in1.on()
    self.in2.off()
    self.is_forward = False
    self.is_backward = True

  def backward(self):
    if self.pwm.value == 0:
      self.pwm.value = 0.3

    self.in1.off()
    self.in2.on()
    self.is_forward = False
    self.is_backward = True

  def pause(self):
    self.in1.off()
    self.in2.off()
    self.pwm.off()

  def adjust_velocity(self, vel: float):
    self.pwm.value = vel


class UnderPan:
  def __init__(self) -> None:
    self.wheel_a = Wheel_A()
    self.wheel_b = Wheel_B()
    self.wheel_c = Wheel_C()
    self.wheel_d = Wheel_D()
    self.STBY_AC = LED(4)
    self.STBY_BD = LED(11)

  def boot(self):
    self.STBY_AC.on()
    self.STBY_BD.on()

  def move_forward(self):
    self.wheel_a.forward()
    self.wheel_b.forward()
    self.wheel_c.forward()
    self.wheel_d.forward()

  def move_backward(self):
    self.wheel_a.backward()
    self.wheel_b.backward()
    self.wheel_c.backward()
    self.wheel_d.backward()

  def move_left(self):
    self.wheel_a.forward()
    self.wheel_b.backward()
    self.wheel_c.backward()
    self.wheel_d.forward()

  def move_right(self):
    self.wheel_a.backward()
    self.wheel_b.forward()
    self.wheel_c.forward()
    self.wheel_d.backward()

  def move_left_forward(self):
    self.wheel_a.forward()
    self.wheel_b.backward()
    self.wheel_c.forward()
    self.wheel_d.forward()

  def move_right_forward(self):
    self.wheel_a.backward()
    self.wheel_b.forward()
    self.wheel_c.forward()
    self.wheel_d.forward()

  def move_left_backward(self):
    self.wheel_a.backward()
    self.wheel_b.backward()
    self.wheel_c.backward()
    self.wheel_d.forward()

  def move_right_backward(self):
    self.wheel_a.backward()
    self.wheel_b.backward()
    self.wheel_c.forward()
    self.wheel_d.backward()

  def clockwise_spin(self):
    self.wheel_a.backward()
    self.wheel_b.forward()
    self.wheel_c.backward()
    self.wheel_d.forward()

  def counter_clockwise_spin(self):
    self.wheel_a.forward()
    self.wheel_b.backward()
    self.wheel_c.forward()
    self.wheel_d.backward()

  def speed_up(self):
    if self.wheel_a.pwm.value != 1:
      self.wheel_a.pwm.value += 0.1
    if self.wheel_b.pwm.value != 1:
      self.wheel_b.pwm.value += 0.1
    if self.wheel_c.pwm.value != 1:
      self.wheel_c.pwm.value += 0.1
    if self.wheel_d.pwm.value != 1:
      self.wheel_d.pwm.value += 0.1

  def slow_dowm(self):
    if self.wheel_a.pwm.value != 0:
      self.wheel_a.pwm.value -= 0.1
    if self.wheel_b.pwm.value != 0:
      self.wheel_b.pwm.value -= 0.1
    if self.wheel_c.pwm.value != 0:
      self.wheel_c.pwm.value -= 0.1
    if self.wheel_d.pwm.value != 0:
      self.wheel_d.pwm.value -= 0.1

  def pause(self):
    self.wheel_a.pause()
    self.wheel_b.pause()
    self.wheel_c.pause()
    self.wheel_d.pause()

  def shutdowm(self):
    self.pause()
    self.STBY_AC.off()
    self.STBY_BD.off()


# if __name__ == '__main__':
#   underpan = UnderPan()
#   underpan.boot()
#   underpan.move_forward()
#   time.sleep(5)