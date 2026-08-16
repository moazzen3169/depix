<?php
/**
 * Administrator Initial Creation Tool
 *
 * Tool to create the single Administrator account.
 * Disabled automatically after the 1st admin account is created.
 */

// Error handling - avoid leaking sensitive details to browser
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Load Admin DB & Database Configuration
$dbHelperPath = __DIR__ . '/../includes/db.php';

if (!file_exists($dbHelperPath)) {
    if (php_sapi_name() === 'cli') {
        echo "Error: Database helper file not found.\n";
    } else {
        http_response_code(500);
        echo "خطا در بارگذاری فایل پیکربندی دیتابیس.";
    }
    exit(1);
}

require_once $dbHelperPath;

/**
 * Validates password strength
 */
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

/**
 * Creates single admin user
 */
function createAdminUser(PDO $pdo, string $username, string $password): bool {
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

// Check database connection and admin count
$isCli = (php_sapi_name() === 'cli');

try {
    $pdo = getAdminDbConnection();
    $adminCount = countExistingAdmins($pdo);
} catch (Exception $e) {
    if ($isCli) {
        echo "Database connection error: " . $e->getMessage() . "\n";
    } else {
        http_response_code(500);
        echo "خطا در اتصال به دیتابیس. لطفاً تنظیمات دیتابیس را بررسی کنید.";
    }
    exit(1);
}

// Single Admin Restriction Check
if ($adminCount > 0) {
    if ($isCli) {
        echo "Error: An admin account already exists. Creation of additional admin accounts is prohibited.\n";
        exit(1);
    } else {
        http_response_code(403);
        header('Content-Type: text/html; charset=utf-8');
        ?>
        <!DOCTYPE html>
        <html lang="fa" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>خطا - دسترسی غیرمجاز | دپیکس</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                body {
                    background-color: #0b0f19;
                    color: #f8fafc;
                    font-family: system-ui, -apple-system, sans-serif;
                }
            </style>
        </head>
        <body class="flex items-center justify-center min-h-screen p-4 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]">
            <div class="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl text-center">
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400 mb-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                </div>
                <h2 class="text-xl font-bold text-white mb-2">ایجاد مدیر جدید امکان‌پذیر نیست</h2>
                <p class="text-slate-400 text-sm mb-6 leading-relaxed">
                    یک حساب مدیر قبلاً در سیستم ثبت شده است. جهت حفظ امنیت، امکان ساخت حساب دوم وجود ندارد.
                </p>
                <a href="../login.php" class="inline-flex items-center justify-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-indigo-600/25">
                    ورود به پنل مدیریت
                </a>
            </div>
        </body>
        </html>
        <?php
        exit;
    }
}

// --- CLI EXECUTION ---
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

// --- WEB EXECUTION FALLBACK (Active ONLY if 0 admins exist) ---
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
                $successMessage = 'حساب مدیر اصلی با موفقیت ساخته شد! این ابزار ثبت اکنون برای همیشه غیرفعال شد.';
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
<body class="flex items-center justify-center min-h-screen p-4 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]">
    <div class="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
        <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 mb-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                </svg>
            </div>
            <h1 class="text-2xl font-bold text-white mb-2">راه‌اندازی مدیر اصلی</h1>
            <p class="text-slate-400 text-sm">ساخت تنها حساب Administrator سیستم</p>
        </div>

        <?php if ($successMessage): ?>
            <div class="bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 p-5 rounded-xl text-sm mb-6 text-center">
                <p class="font-medium text-base mb-2">ثبت با موفقیت انجام شد</p>
                <p class="text-slate-300 text-xs leading-relaxed mb-4"><?php echo htmlspecialchars($successMessage, ENT_QUOTES, 'UTF-8'); ?></p>
                <a href="../login.php" class="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-emerald-600/25 text-sm">
                    ورود به پنل مدیریت
                </a>
            </div>
        <?php else: ?>
            <?php if ($errorMessage): ?>
                <div class="bg-rose-950/60 border border-rose-500/50 text-rose-300 p-4 rounded-xl text-sm mb-6">
                    <?php echo $errorMessage; ?>
                </div>
            <?php endif; ?>

            <form method="POST" action="" class="space-y-5">
                <div>
                    <label class="block text-slate-300 text-sm mb-2 font-medium">نام کاربری</label>
                    <input type="text" name="username" required value="<?php echo isset($_POST['username']) ? htmlspecialchars($_POST['username'], ENT_QUOTES, 'UTF-8') : ''; ?>"
                        class="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-left dir-ltr transition-all">
                </div>

                <div>
                    <label class="block text-slate-300 text-sm mb-2 font-medium">رمز عبور</label>
                    <input type="password" name="password" required
                        class="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-left dir-ltr transition-all">
                    <p class="text-xs text-slate-500 mt-1">حداقل ۸ کاراکتر شامل حروف بزرگ، کوچک و عدد/نماد</p>
                </div>

                <div>
                    <label class="block text-slate-300 text-sm mb-2 font-medium">تکرار رمز عبور</label>
                    <input type="password" name="confirm_password" required
                        class="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-left dir-ltr transition-all">
                </div>

                <button type="submit" class="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-600/25 active:scale-[0.99]">
                    ایجاد حساب مدیر
                </button>
            </form>
        <?php endif; ?>
    </div>
</body>
</html>
