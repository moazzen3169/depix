<?php
/**
 * Project Request Endpoint
 * API for receiving and saving project / cooperation requests into MySQL database.
 */

header('Content-Type: application/json; charset=utf-8');

// Ensure request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'روش ارسال درخواست معتبر نیست (فقط POST مجاز است).'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Require database configuration (Supports publishing 'public' as web root or hosting from project root)
$configPath = null;
$possiblePaths = [
    __DIR__ . '/../config/database.php',      // When publishing 'public/' as web root
    __DIR__ . '/../../config/database.php'    // When hosting from repository root
];

foreach ($possiblePaths as $path) {
    if (file_exists($path)) {
        $configPath = $path;
        break;
    }
}

if (!$configPath) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'خطا در پیکربندی سرور.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

require_once $configPath;

// Retrieve input data (Supports JSON payload and standard POST form data)
$inputRaw = file_get_contents('php://input');
$data = [];

if (!empty($inputRaw)) {
    $decoded = json_decode($inputRaw, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
}

if (empty($data)) {
    $data = $_POST;
}

// Extract and trim fields
$fullName     = isset($data['fullName']) ? trim((string)$data['fullName']) : '';
$companyName  = isset($data['companyName']) ? trim((string)$data['companyName']) : '';
$phone        = isset($data['phone']) ? trim((string)$data['phone']) : '';
$socialHandle = isset($data['socialHandle']) ? trim((string)$data['socialHandle']) : '';
$projectType  = isset($data['projectType']) ? trim((string)$data['projectType']) : '';
$budget       = isset($data['budget']) ? trim((string)$data['budget']) : '';
$projectDesc  = isset($data['projectDesc']) ? trim((string)$data['projectDesc']) : '';

// Validation checks
$errors = [];

if ($fullName === '') {
    $errors[] = 'لطفاً نام و نام خانوادگی خود را وارد کنید.';
} elseif (mb_strlen($fullName, 'UTF-8') > 150) {
    $errors[] = 'نام و نام خانوادگی نباید بیشتر از ۱۵۰ کاراکتر باشد.';
}

if ($companyName !== '' && mb_strlen($companyName, 'UTF-8') > 150) {
    $errors[] = 'نام شرکت نباید بیشتر از ۱۵۰ کاراکتر باشد.';
}

if ($phone === '') {
    $errors[] = 'لطفاً شماره تماس یا راه ارتباطی خود را وارد کنید.';
} elseif (mb_strlen($phone, 'UTF-8') < 3 || mb_strlen($phone, 'UTF-8') > 30) {
    $errors[] = 'شماره تماس یا راه ارتباطی باید بین ۳ تا ۳۰ کاراکتر باشد.';
} else {
    // Convert Persian / Arabic numerals to English digits for validation
    $convertedPhone = strtr($phone, [
        '۰'=>'0', '۱'=>'1', '۲'=>'2', '۳'=>'3', '۴'=>'4',
        '۵'=>'5', '۶'=>'6', '۷'=>'7', '۸'=>'8', '۹'=>'9',
        '٠'=>'0', '١'=>'1', '٢'=>'2', '٣'=>'3', '٤'=>'4',
        '٥'=>'5', '٦'=>'6', '٧'=>'7', '٨'=>'8', '٩'=>'9'
    ]);
    if (!preg_match('/^[a-zA-Z0-9+() ._@-]{3,30}$/u', $convertedPhone)) {
        $errors[] = 'شماره تماس یا راه ارتباطی وارد شده معتبر نیست.';
    }
}

if ($socialHandle !== '' && mb_strlen($socialHandle, 'UTF-8') > 100) {
    $errors[] = 'آیدی تلگرام/اینستاگرام نباید بیشتر از ۱۰۰ کاراکتر باشد.';
}

if ($projectType === '') {
    $errors[] = 'لطفاً نوع پروژه را انتخاب کنید.';
} elseif (mb_strlen($projectType, 'UTF-8') > 100) {
    $errors[] = 'نوع پروژه معتبر نیست.';
}

if ($budget !== '' && mb_strlen($budget, 'UTF-8') > 50) {
    $errors[] = 'مقدار بودجه نباید بیشتر از ۵۰ کاراکتر باشد.';
}

if ($projectDesc === '') {
    $errors[] = 'لطفاً توضیحات پروژه خود را وارد کنید.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => implode(' ', $errors)
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Prepare values for database insertion
$companyNameVal  = $companyName !== '' ? $companyName : null;
$socialHandleVal = $socialHandle !== '' ? $socialHandle : null;
$budgetVal       = $budget !== '' ? $budget : null;

try {
    $pdo = getDbConnection();
    ensureDatabaseTablesExist($pdo);

    $sql = "INSERT INTO project_requests
            (full_name, company_name, phone, social_handle, project_type, budget, project_description, status)
            VALUES
            (:full_name, :company_name, :phone, :social_handle, :project_type, :budget, :project_description, 'new')";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':full_name'           => $fullName,
        ':company_name'        => $companyNameVal,
        ':phone'               => $phone,
        ':social_handle'       => $socialHandleVal,
        ':project_type'        => $projectType,
        ':budget'              => $budgetVal,
        ':project_description' => $projectDesc
    ]);

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'درخواست شما با موفقیت ثبت شد! به زودی با شما تماس خواهیم گرفت.'
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    error_log("Database Error in project-request.php: " . $e->getMessage());

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'خطایی در ثبت اطلاعات در دیتابیس رخ داده است. لطفاً بعداً دوباره تلاش کنید.'
    ], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    error_log("General Error in project-request.php: " . $e->getMessage());

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'خطایی در پردازش درخواست شما رخ داده است.'
    ], JSON_UNESCAPED_UNICODE);
}
