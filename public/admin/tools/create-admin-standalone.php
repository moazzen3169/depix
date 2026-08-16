<?php
/**
 * Administrator Initial Creation Tool (Standalone)
 */

ini_set('display_errors', 0);
error_reporting(E_ALL);

$configPath = null;
$possiblePaths = [
    __DIR__ . '/../../config/database.php',
    __DIR__ . '/../../../config/database.php',
    __DIR__ . '/../config/database.php'
];

foreach ($possiblePaths as $path) {
    if (file_exists($path)) {
        $configPath = $path;
        break;
    }
}

if (!$configPath) {
    if (php_sapi_name() === 'cli') {
        echo "Error: Database configuration file not found.\n";
    } else {
        http_response_code(500);
        echo "خطا در بارگذاری فایل پیکربندی دیتابیس.";
    }
    exit(1);
}

require_once $configPath;

function ensureAdminTableExists(PDO $pdo): void {
    $sql = "CREATE TABLE IF NOT EXISTS admin_users (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        last_login_at TIMESTAMP NULL,
        failed_login_attempts INT UNSIGNED NOT NULL DEFAULT 0,
        locked_until TIMESTAMP NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

    $pdo->exec($sql);
}

function countExistingAdmins(PDO $pdo): int {
    ensureAdminTableExists($pdo);
    $stmt = $pdo->query("SELECT COUNT(*) FROM admin_users");
    return (int) $stmt->fetchColumn();
}

function validatePasswordStrength(string $password): array {
    $errors = [];
    if (mb_strlen($password, 'UTF-8') < 8) {
        $errors[] = 'رمز عبور باید حداقل ۸ کاراکتر باشد.';
    }
    if (!preg_match('/[A-Z]/', $password)) {
        $errors[] = 'رمز عبور باید حداقل شامل یک حرف بزرگ انگلیسی (A-Z) باشد.';
    }
    if (!preg_match('/[a-z]/', $password)) {
        $errors[] = 'رمز عبور باید حداقل شامل یک حرف کوچک انگلیسی (a-z) باشد.';
    }
    if (!preg_match('/[0-9_\W]/', $password)) {
        $errors[] = 'رمز عبور باید حداقل شامل یک عدد یا نماد باشد.';
    }
    return $errors;
}

function createAdminUser(PDO $pdo, string $username, string $password): bool {
    ensureAdminTableExists($pdo);

    if (countExistingAdmins($pdo) > 0) {
        return false;
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO admin_users (username, password_hash, is_active) VALUES (:username, :hash, 1)");
    return $stmt->execute([
        ':username' => $username,
        ':hash'     => $hash
    ]);
}

$isCli = (php_sapi_name() === 'cli');

try {
    $pdo = getDbConnection();
    ensureAdminTableExists($pdo);
    $adminCount = countExistingAdmins($pdo);
} catch (Exception $e) {
    if ($isCli) {
        echo "Database connection error: " . $e->getMessage() . "\n";
    } else {
        http_response_code(500);
        echo "خطا در اتصال به دیتابیس.";
    }
    exit(1);
}

if ($adminCount > 0) {
    if ($isCli) {
        echo "Error: An admin account already exists. Multiple administrator accounts are not allowed.\n";
        exit(1);
    } else {
        http_response_code(403);
        header('Content-Type: text/html; charset=utf-8');
        echo '<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><title>خطا - دسترسی غیرمجاز</title>';
        echo '<style>body{font-family:sans-serif;background:#0f172a;color:#f8fafc;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;}';
        echo '.box{background:rgba(30,41,59,0.8);border:1px solid #334155;padding:2rem;border-radius:1rem;max-width:500px;text-align:center;box-shadow:0 10px 25px rgba(0,0,0,0.5);}</style></head><body>';
        echo '<div class="box"><h2 style="color:#ef4444;">ایجاد مدیر جدید امکان‌پذیر نیست</h2><p>یک حساب مدیر قبلاً در سیستم ثبت شده است. جهت حفظ امنیت، امکان ایجاد حساب دوم وجود ندارد.</p></div></body></html>';
        exit;
    }
}

if ($isCli) {
    echo "========================================\n";
    echo " Depix Digital Product Studio\n";
    echo " Initial Admin Setup Utility\n";
    echo "========================================\n\n";

    echo "Enter Admin Username: ";
    $username = trim((string) fgets(STDIN));

    if (empty($username) || strlen($username) < 3) {
        echo "Error: Username must be at least 3 characters long.\n";
        exit(1);
    }

    echo "Enter Admin Password: ";
    $password = trim((string) fgets(STDIN));

    echo "Confirm Admin Password: ";
    $confirmPassword = trim((string) fgets(STDIN));

    if ($password !== $confirmPassword) {
        echo "Error: Passwords do not match.\n";
        exit(1);
    }

    $strengthErrors = validatePasswordStrength($password);
    if (!empty($strengthErrors)) {
        echo "Password Validation Errors:\n";
        foreach ($strengthErrors as $err) {
            echo " - " . $err . "\n";
        }
        exit(1);
    }

    if (createAdminUser($pdo, $username, $password)) {
        echo "\n[SUCCESS] Administrator account successfully created!\n";
        echo "Username: " . $username . "\n";
        echo "Setup is now permanently locked.\n";
        exit(0);
    } else {
        echo "\n[ERROR] Failed to create admin user.\n";
        exit(1);
    }
}

$errorMessage = '';
$successMessage = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username        = isset($_POST['username']) ? trim((string)$_POST['username']) : '';
    $password        = isset($_POST['password']) ? (string)$_POST['password'] : '';
    $confirmPassword = isset($_POST['confirm_password']) ? (string)$_POST['confirm_password'] : '';

    if (empty($username) || mb_strlen($username, 'UTF-8') < 3) {
        $errorMessage = 'نام کاربری باید حداقل ۳ کاراکتر باشد.';
    } elseif ($password !== $confirmPassword) {
        $errorMessage = 'رمز عبور و تکرار آن یکسان نیستند.';
    } else {
        $strengthErrors = validatePasswordStrength($password);
        if (!empty($strengthErrors)) {
            $errorMessage = implode('<br>', $strengthErrors);
        } else {
            if (createAdminUser($pdo, $username, $password)) {
                $successMessage = 'حساب مدیر اصلی با موفقیت ساخته شد! این ابزار نصب اکنون برای همیشه غیرفعال شد.';
            } else {
                $errorMessage = 'خطا در ساخت حساب مدیر.';
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>راه‌اندازی حساب مدیر اصلی | دپیکس</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            background-color: #0b0f19;
            color: #e2e8f0;
            font-family: system-ui, -apple-system, sans-serif;
        }
    </style>
</head>
<body class="flex items-center justify-center min-h-screen p-4">
    <div class="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
        <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-white mb-2">راه‌اندازی مدیر اصلی</h1>
            <p class="text-slate-400 text-sm">ساخت تنها حساب Administrator سیستم</p>
        </div>

        <?php if ($successMessage): ?>
            <div class="bg-emerald-900/40 border border-emerald-500/50 text-emerald-300 p-4 rounded-xl text-sm mb-6 text-center">
                <?php echo htmlspecialchars($successMessage, ENT_QUOTES, 'UTF-8'); ?>
                <div class="mt-4">
                    <a href="../login.php" class="inline-block px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors font-medium">ورود به پنل مدیریت</a>
                </div>
            </div>
        <?php else: ?>
            <?php if ($errorMessage): ?>
                <div class="bg-rose-900/40 border border-rose-500/50 text-rose-300 p-4 rounded-xl text-sm mb-6">
                    <?php echo $errorMessage; ?>
                </div>
            <?php endif; ?>

            <form method="POST" action="" class="space-y-5">
                <div>
                    <label class="block text-slate-300 text-sm mb-2 font-medium">نام کاربری</label>
                    <input type="text" name="username" required value="<?php echo isset($_POST['username']) ? htmlspecialchars($_POST['username'], ENT_QUOTES, 'UTF-8') : ''; ?>"
                        class="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-left dir-ltr">
                </div>

                <div>
                    <label class="block text-slate-300 text-sm mb-2 font-medium">رمز عبور</label>
                    <input type="password" name="password" required
                        class="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-left dir-ltr">
                    <p class="text-xs text-slate-500 mt-1">حداقل ۸ کاراکتر شامل حروف بزرگ، کوچک و عدد/نماد</p>
                </div>

                <div>
                    <label class="block text-slate-300 text-sm mb-2 font-medium">تکرار رمز عبور</label>
                    <input type="password" name="confirm_password" required
                        class="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-left dir-ltr">
                </div>

                <button type="submit" class="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors shadow-lg shadow-indigo-600/30">
                    ایجاد حساب مدیر
                </button>
            </form>
        <?php endif; ?>
    </div>
</body>
</html>
