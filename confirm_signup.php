<?php
require_once "./DB.php";
// giá trị lấy từ form  
$maSV = $_POST["maSV"];
$ten = $_POST["ten"];
$email = $_POST["email"];
$gioiTinh = $_POST["gioiTinh"];
$soThich = $_POST["arrSoThich"];
$quocTich = $_POST["quocTich"];
$ghiChu = $_POST["ghiChu"];
$btnSubmit = $_POST["btn-submit"];


// select maSV
$qr = "SELECT maSV FROM thanhvien";
$rows = mysqli_query($con, $qr);

// kiểm tra maSV có tồn tại trong datase hay chưa
$result = false;
foreach ($rows as $item) {
    if ($_POST["maSV"] == $item["maSV"]) {
        $result = true;
    }
}
$text = $result === true ? "true" : "false";

switch ($btnSubmit) {
    case "btn-add":
        try {
            if ($result) {
                $thongbao =  "đã tồn tại sinh viên này";
                require_once(realpath(dirname(__FILE__) . '/notify.html'));
                // echo "đã tồn tại sinh viên này";
            } else {
                $qr = "INSERT INTO thanhvien VALUES ($maSV,'$ten','$email','$gioiTinh','$soThich','$quocTich','$ghiChu')";
                mysqli_query($con, $qr);
                $thongbao = "đăng kí thành công";
                require_once(realpath(dirname(__FILE__) . '/notify.html'));
            }
        } catch (PDOException $e) {
            echo "lỗi";
        }
        break;
    case "btn-update":
        try {
            if (!$result) {
                $thongbao = "không tồn tại sinh viên này";
                require_once(realpath(dirname(__FILE__) . '/notify.html'));
            } else {
                $qr = "UPDATE thanhvien SET ten = '$ten', 
                                            email = '$email',
                                            gioiTinh = '$gioiTinh',
                                            soThich = '$soThich',
                                            quocTich = '$quocTich',
                                            ghiChu = '$ghiChu' WHERE maSV = $maSV";
                mysqli_query($con, $qr);
                if (mysqli_query($con, $qr)) {
                    $thongbao = "chỉnh sửa thành công";
                    require_once(realpath(dirname(__FILE__) . '/notify.html'));
                } else {
                    $thongbao = "chỉnh sửa không thành công";
                    require_once(realpath(dirname(__FILE__) . '/notify.html'));
                }
            }
        } catch (PDOException $e) {
            echo "lỗi";
        }
        break;
    case "btn-delete":
        try {
            if (!$result) {
                $thongbao = "không tồn tại sinh viên này";
                require_once(realpath(dirname(__FILE__) . '/notify.html'));
            } else {
                $maSV = $_POST["maSV"];

                $qr = "DELETE FROM thanhvien WHERE maSV = $maSV";
                mysqli_query($con, $qr);
                if (mysqli_query($con, $qr)) {
                    $thongbao = "xóa thành công";
                    require_once(realpath(dirname(__FILE__) . '/notify.html'));
                } else {
                    $thongbao = "xóa không thành công";
                    require_once(realpath(dirname(__FILE__) . '/notify.html'));
                }
            }
        } catch (PDOException $e) {
            echo "lỗi";
        }
        break;
}
