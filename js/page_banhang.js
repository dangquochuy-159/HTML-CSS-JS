const sanPham = [
    {
        ten: 'Iphone9',
        dongia: '500',
    },
    {
        ten: 'SamSung',
        dongia: '700',
    },
    {
        ten: 'Xiaomi',
        dongia: '900',
    },
    {
        ten: 'Oppo',
        dongia: '200',
    },
    {
        ten: 'Bphone',
        dongia: '180',
    },
    {
        ten: 'Nokia',
        dongia: '700',
    },
    {
        ten: 'Sony',
        dongia: '600',
    },
    {
        ten: 'LG',
        dongia: '300',
    },
    {
        ten: 'Acer',
        dongia: '1400',
    },
    {
        ten: 'Asus',
        dongia: '1600',
    },
]

const nf = new Intl.NumberFormat();
const mucGia = document.getElementById('mucgia')
const bodyTB = document.getElementById('body_tb')
const shop = document.getElementById('shop')
const tongTienEle = document.getElementById('tongtien')
let thanhTienEle

const printBodyTb = (ten, dongia) => {
    bodyTB.innerHTML +=
        `
    <tr>
        <th><input type="checkbox" onchange="changeStatus(this)" ></th>
        <th>${ten}</th>
        <th>${dongia}</th>
        <th><input type="number" onchange="tinhTien(this)" disabled></th>
        <th><span class="tien"></span></th>
    </tr>
`
}
const showSanPham = (gia) => {
    bodyTB.innerHTML = ''
    if (gia == null || isNaN(Number(mucGia.value))) {
        for (let sp of sanPham) {
            printBodyTb(sp.ten, sp.dongia)
        }
    } else {
        gia = Number(gia)
        for (let sp of sanPham) {
            if (sp.dongia <= gia) printBodyTb(sp.ten, sp.dongia)
        }
    }
    thanhTienEle = document.querySelectorAll('.tien')
    tongTienEle.innerHTML = 0
}
showSanPham()
mucGia.oninput = () => {
    let gia = mucGia.value
    showSanPham(gia)
}


const changeStatus = function (check) {
    let row = check.parentElement.parentElement
    let ipSoluong = row.children[3].children[0]
    let thanhTien = row.children[4].children[0]
    ipSoluong.disabled = !ipSoluong.disabled
    if (check.checked) {
        thanhTien.parentElement.style.backgroundColor = '#fff'
        ipSoluong.value == 0 ? ipSoluong.value = 1 : ipSoluong.value
        tinhTien(check)
    } else {
        thanhTien.parentElement.style.backgroundColor = '#ccc'
        thanhTien.innerHTML = ''
    }
    tinhTongTien()
}
const tinhTongTien = function () {
    let tongTien = 0
    Array.from(thanhTienEle).forEach(tt => {
        Number(tt.innerText) == 0 ? tongTien += 0 : tongTien += Number(tt.innerText)
    })
    tongTienEle.innerHTML = nf.format(tongTien)
}
const tinhTien = function (ipSoLuong) {
    let row = ipSoLuong.parentElement.parentElement
    let dongia = row.children[2].innerText
    let soLuong = row.children[3].children[0].value
    let thanhTien = row.children[4].children[0]
    let tien = 0
    tien += soLuong * Number(dongia)
    thanhTien.innerHTML = tien
    tinhTongTien()
}
