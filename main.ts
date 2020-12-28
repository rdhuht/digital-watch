let tm = TM1637.create(
DigitalPin.P1,
DigitalPin.P2,
7,
4
)
timeanddate.set24HourTime(12, 0, 0)
while (!(input.isGesture(Gesture.ScreenUp))) {
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
        tm.showNumber(hour * 100 + minute)
    })
}
basic.forever(function () {
    tm.showDP(1, true)
    timeanddate.numericTime(function (hour, minute, second, month, day, year) {
        tm.showNumber(hour * 100 + minute)
    })
    basic.pause(500)
    tm.showDP(1, false)
    basic.pause(500)
})
