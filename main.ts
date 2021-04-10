// 秒数blink
function blink () {
    if (timeanddate.secondsSinceReset() % 2 == 0) {
        tm.showDP(1, true)
    } else {
        tm.showDP(1, false)
    }
}
// 调整时间
function ajustTM () {
    timeanddate.numericTime(function (hour, minute, second, month, day, year) {
        if (input.buttonIsPressed(Button.A)) {
            if (hour >= 24) {
                timeanddate.set24HourTime(0, minute, 0)
            }
            timeanddate.set24HourTime(hour + 1, minute, 0)
            basic.pause(200)
        }
        if (input.buttonIsPressed(Button.B)) {
            if (minute >= 60) {
                timeanddate.set24HourTime(hour, 0, 0)
            }
            timeanddate.set24HourTime(hour, minute + 1, 0)
            basic.pause(200)
        }
    })
}
// 开机设置
let tm: TM1637.TM1637LEDs = null
tm = TM1637.create(
DigitalPin.P1,
DigitalPin.P2,
7,
4
)
// 拓展名：Time and Date
timeanddate.set24HourTime(12, 0, 0)
/**
 * 加入，亮度调节，环境光-》时间显示的亮度
 */
// 显示时间
basic.forever(function () {
    ajustTM()
    timeanddate.numericTime(function (hour, minute, second, month, day, year) {
        tm.showNumber(hour * 100 + minute)
    })
})
basic.forever(function () {
    blink()
})
