<?php
require_once "./DB.php";

// select maSV
$qr = "SELECT * FROM thanhvien";
$rows = mysqli_query($con, $qr);
$mang = array();
?>




<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trang Đăng Kí</title>
    <link rel="stylesheet" href="css/style_page_form.css">
</head>

<body>
    <?php require_once  './page_form.html'; ?>
    <div class="list table-container">
        <table class="">
            <thead>
                <tr>
                    <th>Mã SV</th>
                    <th>Tên</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($rows as $item) {
                    $mang[] = $item;
                ?>
                    <tr>
                        <th><?php echo $item["maSV"]; ?></th>
                        <th><?php echo $item["ten"]; ?></th>
                        <th>
                            <button class="btn-out" data-id="<?php echo $item["maSV"]; ?>">
                                Xuất
                            </button>
                        </th>
                    </tr>
                <?php }
                $json_data = json_encode($mang);
                ?>
            </tbody>
        </table>
    </div>

</body>

</html>
<script type="text/javascript">
    const btnOutList = document.querySelectorAll('.btn-out');
    let id
    let listSV = <?php echo $json_data; ?>;
</script>
<script type="text/javascript" src="./js/page_form.js"></script>