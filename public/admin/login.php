<?php
/**
 * Administrator Login Endpoint & Interface
 */

// Error handling configuration - keep raw details out of public response
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Session Security Configuration
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.cookie_samesite', 'Lax');

    $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443)
        || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https');

    if ($isHttps) {
        ini_set('session.cookie_secure', '1');
    }

    session_start();
}

// Security Headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: strict-origin-when-cross-origin');

// If already logged in, redirect to admin index
if (!empty($_SESSION['admin_authenticated']) && !empty($_SESSION['admin_id'])) {
    header("Location: index.php");
    exit;
}

require_once __DIR__ . '/includes/db.php';

// Check if any admin exists in database
$noAdminExists = false;
try {
    $pdo = getAdminDbConnection();
    if (countExistingAdmins($pdo) === 0) {
        $noAdminExists = true;
    }
} catch (Exception $e) {
    error_log("Database connection error in login.php: " . $e->getMessage());
}

// Generate CSRF token if missing
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

$errorMessage = '';
$noticeMessage = '';

if (isset($_GET['expired'])) {
    $noticeMessage = 'نشست کاری شما به دلیل عدم فعالیت منقضی شده است. لطفاً دوباره وارد شوید.';
} elseif (isset($_GET['logout'])) {
    $noticeMessage = 'شما با موفقیت از حساب کاربری خود خارج شدید.';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $submittedToken = $_POST['csrf_token'] ?? '';
    $username       = trim((string)($_POST['username'] ?? ''));
    $password       = (string)($_POST['password'] ?? '');

    // 1. CSRF Token Validation
    if (empty($submittedToken) || !hash_equals($_SESSION['csrf_token'], $submittedToken)) {
        $errorMessage = 'خطای امنیتی. لطفاً صفحه را بازخوانی کرده و دوباره تلاش کنید.';
    } elseif (empty($username) || empty($password)) {
        $errorMessage = 'نام کاربری یا رمز عبور صحیح نیست.';
    } else {
        try {
            $pdo = getAdminDbConnection();
            $admin = getAdminByUsername($pdo, $username);

            $genericErrorMessage = 'نام کاربری یا رمز عبور صحیح نیست.';

            if (!$admin) {
                // User not found - show generic message
                $errorMessage = $genericErrorMessage;
            } else {
                // Check Lockout Status
                if (!empty($admin['locked_until']) && strtotime($admin['locked_until']) > time()) {
                    $errorMessage = 'حساب کاربری به دلیل تلاش‌های ناموفق متعدد موقتاً قفل شده است. لطفاً چند دقیقه دیگر دوباره تلاش کنید.';
                } elseif (empty($admin['is_active'])) {
                    // Inactive admin account
                    $errorMessage = $genericErrorMessage;
                } else {
                    // Password Verification
                    if (password_verify($password, $admin['password_hash'])) {
                        // Success: Reset failed attempts & regenerate session ID
                        resetFailedLoginAttempts($pdo, (int)$admin['id']);
                        session_regenerate_id(true);

                        $_SESSION['admin_id']            = (int)$admin['id'];
                        $_SESSION['admin_username']      = $admin['username'];
                        $_SESSION['admin_authenticated'] = true;
                        $_SESSION['last_activity']       = time();

                        // Redirect to admin panel index
                        header("Location: index.php");
                        exit;
                    } else {
                        // Failed password verify
                        recordFailedLoginAttempt($pdo, $admin);
                        $errorMessage = $genericErrorMessage;
                    }
                }
            }
        } catch (Exception $e) {
            error_log("Database Exception in login.php: " . $e->getMessage());
            $errorMessage = 'خطایی در برقراری ارتباط با سرور رخ داده است.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ورود به پنل مدیریت | دپیکس</title>
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
    <div class="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
        <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 mb-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
            </div>
            <h1 class="text-2xl font-bold text-white tracking-tight">ورود مدیر سیستم</h1>
            <p class="text-slate-400 text-sm mt-1">احراز هویت تنها حساب Administrator</p>
        </div>

        <?php if ($noAdminExists): ?>
            <div class="bg-amber-950/60 border border-amber-500/50 text-amber-200 p-5 rounded-xl text-sm mb-6 text-center">
                <div class="font-medium text-base mb-1">حساب مدیری ثبت نشده است</div>
                <p class="text-xs text-amber-300/80 mb-4 leading-relaxed">برای اولین بار باید مدیر اصلی سیستم را ایجاد کنید.</p>
                <a href="tools/create-admin.php" class="inline-block px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold rounded-xl text-xs transition-colors shadow-lg shadow-amber-600/20">
                    ساخت اولین حساب مدیر
                </a>
            </div>
        <?php endif; ?>

        <?php if ($noticeMessage): ?>
            <div class="bg-indigo-950/50 border border-indigo-500/40 text-indigo-200 p-4 rounded-xl text-sm mb-6 text-center">
                <?php echo htmlspecialchars($noticeMessage, ENT_QUOTES, 'UTF-8'); ?>
            </div>
        <?php endif; ?>

        <?php if ($errorMessage): ?>
            <div class="bg-rose-950/50 border border-rose-500/40 text-rose-200 p-4 rounded-xl text-sm mb-6 text-center">
                <?php echo htmlspecialchars($errorMessage, ENT_QUOTES, 'UTF-8'); ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="" class="space-y-5">
            <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token'], ENT_QUOTES, 'UTF-8'); ?>">

            <div>
                <label class="block text-slate-300 text-sm mb-2 font-medium">نام کاربری</label>
                <input type="text" name="username" required autocomplete="username"
                    value="<?php echo isset($_POST['username']) ? htmlspecialchars($_POST['username'], ENT_QUOTES, 'UTF-8') : ''; ?>"
                    class="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-left dir-ltr transition-all">
            </div>

            <div>
                <label class="block text-slate-300 text-sm mb-2 font-medium">رمز عبور</label>
                <input type="password" name="password" required autocomplete="current-password"
                    class="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-left dir-ltr transition-all">
            </div>

            <button type="submit" class="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-600/25 active:scale-[0.99]">
                ورود به سیستم
            </button>
        </form>
    </div>
</body>
</html>
