var i = 0

function a() {
    i = i + 5
    if (i === 5) {
        i += 7
    }
    else {
        return i
    }
}

var x = a()
console.log('test---- ', x)