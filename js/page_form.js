
document.addEventListener("DOMContentLoaded", function () {
    const hoTen = document.getElementById("hoten");
    const maSV = document.getElementById("masv");
    const email = document.getElementById("email");
    const quocTich = document.getElementById("quoctich");
    const ghiChu = document.getElementById("ghichu");
    const error = document.getElementById("loi");
    const gender = document.getElementById("ip_gender");
    const like = document.getElementById("ip_like");
    const btnAdd = this.getElementById("btn-add")
    const btnUpdate = this.getElementById("btn-update")
    const btnDelete = this.getElementById("btn-delete")
    const btnSubmit = this.getElementById("btn-submit")

    const form = document.querySelector(".form");
    const gioiTinh = document.querySelectorAll(".gioitinh");
    const soThich = document.querySelectorAll(".sothich");

    let loi = ''
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let checkMail
    let isCheckGender
    let isCheckLike

    // Thực hiện gộp các checked sở thích vào một mảng gửi lên database
    const dataSoThich = () => {
        let mang = []
        soThich.forEach(st => {
            if (st.checked == true) {
                mang.push(st.value)
            }
        })
        return mang
    }
    // thực hiện check các sở thích theo như dữ liệu đọc từ database
    const checkSoThich = (chuoi) => {
        let mang = chuoi.split(',');
        soThich.forEach(st => {
            for (let i = 0; i < mang.length; i++) {
                if (st.value === mang[i]) st.checked = true
            }
        })
    }
    // thực hiện check radio giới tính theo như dữ liệu đọc từ database
    const checkGioiTinh = (value) => {
        gioiTinh.forEach(gt => {
            if (gt.value === value) return gt.checked = true
        })
    }

    // bắt sự kiện click button xuất để đọc dữ liệu từ database ra form
    Array.from(btnOutList).forEach((btnOut) => {
        btnOut.onclick = () => {
            id = btnOut.getAttribute("data-id")
            maSV.value = id;
            listSV.forEach(sv => {
                if (sv.maSV === id) {
                    hoTen.value = sv.ten
                    email.value = sv.email
                    checkGioiTinh(sv.gioiTinh)
                    checkSoThich(sv.soThich)
                    quocTich.value = sv.quocTich
                    ghiChu.value = sv.ghiChu
                }
            });
        }
    })

    // bắt sự kiện click button đăng ký
    btnAdd.onclick = (e) => {
        btnSubmit.value = e.target.name
        e.preventDefault();
        document.getElementById('arrSoThich').value = dataSoThich();
        kiemtra()
    }
    // bắt sự kiện click button sửa thông tin
    btnUpdate.onclick = (e) => {
        btnSubmit.value = e.target.name
        e.preventDefault();
        document.getElementById('arrSoThich').value = dataSoThich();
        kiemtra()
    }
    // bắt sự kiện click button xóa
    btnDelete.onclick = (e) => {
        btnSubmit.value = e.target.name
        e.preventDefault();
        kiemtra()
    }

    // ần thông báo lỗi khi load lần đầu chưa gặp lỗi
    error.classList.add("hidden");

    //hiện thông báo lỗi
    const showError = (ele) => {
        ele.classList.add("error");
    }

    // ẩn thông báo lỗi
    const hideError = (ele) => {
        if (ele.classList.contains("error")) ele.classList.remove("error")
    }

    // thực hiện thông báo lỗi hoặc submit nếu không còn lỗi
    const validate = (err, ele) => {
        switch (err) {
            case 'MASV':
                loi += `Vui lòng nhập mã sinh viên !<br>`
                showError(ele)
                break;
            case 'HOTEN':
                loi += `Vui lòng nhập họ tên !<br>`
                showError(ele)
                break;
            case 'EMAIL':
                if (email.value.length == 0) loi += `Vui lòng nhập email !<br>`
                else if (!checkMail) loi += `Vui lòng nhập đúng định dạng email !<br>`
                showError(ele)
                break;
            case 'GENDER':
                loi += 'Vui lòng chọn giới tính !<br />'
                showError(ele)
                break;
            case 'LIKE':
                loi += 'Vui lòng chọn sở thích !<br />'
                showError(ele)
                break;
            case 'NATIONAL':
                loi += `Vui lòng chọn quốc tịch !<br>`
                showError(ele)
                break;
            case 'NOTE':
                loi += `Vui lòng nhập ghi chú tối đa 200 ký tự !<br/>`
                showError(ele)
                break;
        }
        if (loi.length > 0) {
            error.classList.remove("hidden")
            error.innerHTML = loi
        } else {
            form.submit()
            console.log('submit')
            error.classList.add("hidden")
        }
    }

    // thực hiện kiểm tra có lỗi hay không
    const kiemtra = () => {
        isCheckLike = false
        isCheckGender = false
        loi = ''
        checkMail = regex.test(email.value)

        Array.from(gioiTinh).forEach(gt => { if (gt.checked) isCheckGender = true })
        Array.from(soThich).forEach(st => { if (st.checked) isCheckLike = true })

        maSV.value.length == 0 ? validate('MASV', maSV) : hideError(maSV)
        hoTen.value.length == 0 ? validate('HOTEN', hoTen) : hideError(hoTen)
        email.value.length == 0 || !checkMail ? validate('EMAIL', email) : hideError(email)
        !isCheckGender ? validate('GENDER', gender) : hideError(gender)
        !isCheckLike ? validate('LIKE', like) : hideError(like)
        quocTich.value.length == 0 ? validate('NATIONAL', quocTich) : hideError(quocTich)
        ghiChu.value.length > 200 ? validate('NOTE', ghiChu) : hideError(ghiChu)
        validate()
    }
});