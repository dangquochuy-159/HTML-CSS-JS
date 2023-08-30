const anh = document.getElementById('anh')
const vitrAnh = document.getElementById('vitri')
const btnAuto = document.querySelector('.btn_auto')
let images = []
let index = 0
let sohinh = 13
for (let i = 0; i < sohinh; i++) {
    images[i] = new Image()
    images[i].src = 'images/' + i + '.jpg'
}
anh.src = images[index].src
vitrAnh.innerHTML = `Ảnh ${index + 1}/${images.length}`


const first = function () {
    index = 0
    vitrAnh.innerHTML = `Ảnh ${index + 1}/${images.length}`
    anh.src = images[0].src
}
const last = function () {
    index = images.length - 1
    vitrAnh.innerHTML = `Ảnh ${index + 1}/${images.length}`
    anh.src = images[images.length - 1].src
}
const prev = function () {
    index--
    if (index < 0) index = images.length - 1
    vitrAnh.innerHTML = `Ảnh ${index + 1}/${images.length}`
    anh.src = images[index].src
}
const next = function () {
    index++
    if (index == images.length) index = 0
    vitrAnh.innerHTML = `Ảnh ${index + 1}/${images.length}`
    anh.src = images[index].src
}

let autoImg
const auto = function () {
    if (btnAuto.classList.contains('active')) {
        btnAuto.classList.remove('active')
        clearInterval(autoImg)
    } else {
        btnAuto.classList.add('active')
        autoImg = setInterval(next, 3000)
    }
}
