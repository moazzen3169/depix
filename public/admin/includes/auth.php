<?php
/**
 * Admin Authentication Middleware
 *
 * Enforces session-based authentication, inactivity timeouts, security response headers, and CSRF protection.
 */

// Configure Secure Session Parameters before session_start()
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

/**
 * Set Global Security Headers for Admin Pages
 */
function setAdminSecurityHeaders(): void {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');
}

setAdminSecurityHeaders();

/**
 * Generates or retrieves CSRF token for the session
 */
function getCsrfToken(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Validates provided CSRF token against session token
 */
function verifyCsrfToken(?string $token): bool {
    if (empty($token) || empty($_SESSION['csrf_token'])) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Session Timeout Check (30 minutes = 1800 seconds)
 */
$timeoutSeconds = 1800;

if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > $timeoutSeconds)) {
    $_SESSION = [];
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params["path"],
            $params["domain"],
            $params["secure"],
            $params["httponly"]
        );
    }
    session_destroy();

    // Determine login page redirect path
    $loginUrl = (strpos($_SERVER['REQUEST_URI'], '/public/') !== false) ? '/public/admin/login.php?expired=1' : '/admin/login.php?expired=1';
    header("Location: " . $loginUrl);
    exit;
}

$_SESSION['last_activity'] = time();

/**
 * Enforce Server-Side Authentication
 */
if (empty($_SESSION['admin_authenticated']) || empty($_SESSION['admin_id'])) {
    $loginUrl = (strpos($_SERVER['REQUEST_URI'], '/public/') !== false) ? '/public/admin/login.php' : '/admin/login.php';
    header("Location: " . $loginUrl);
    exit;
}
