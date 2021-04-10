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
// 根据环境光，自动调整数码管的亮度
function autoIntensity () {
    tm.intensity(pins.map(
    input.lightLevel(),
    0,
    255,
    0,
    10
    ))
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
// 调整时间
// 显示时间
basic.forever(function () {
    ajustTM()
    timeanddate.numericTime(function (hour, minute, second, month, day, year) {
        tm.showNumber(hour * 100 + minute)
    })
})
// 秒数：闪烁
// 自动调整数码管亮度
basic.forever(function () {
    blink()
    autoIntensity()
})
