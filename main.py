# 调整时间
def ajustTM():
    tm.show_dp(1, False)
    while not (input.is_gesture(Gesture.SCREEN_UP)):
        pass
# 晃动时调整时间

def on_gesture_shake():
    ajustTM()
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

# 开机设置
tm: TM1637.TM1637LEDs = None
tm = TM1637.create(DigitalPin.P1, DigitalPin.P2, 7, 4)
# 拓展名：Time and Date
timeanddate.set24_hour_time(12, 0, 0)
ajustTM()
# 显示时间

def on_forever():
    
    def on_numeric_time(hour, minute, second, month, day, year):
        tm.show_number(hour * 100 + minute)
    timeanddate.numeric_time(on_numeric_time)
    
basic.forever(on_forever)

# 秒数：闪烁

def on_forever2():
    tm.show_dp(1, True)
    basic.pause(500)
    tm.show_dp(1, False)
    basic.pause(500)
basic.forever(on_forever2)
