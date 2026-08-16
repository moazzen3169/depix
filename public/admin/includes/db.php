<?php
/**
 * Admin Database Helpers
 */

$configPath = null;
$possiblePaths = [
    __DIR__ . '/../../config/database.php',
    __DIR__ . '/../../../config/database.php'
];

foreach ($possiblePaths as $path) {
    if (file_exists($path)) {
        $configPath = $path;
        break;
    }
}

if ($configPath) {
    require_once $configPath;
}

/**
 * Returns PDO connection instance
 */
function getAdminDbConnection(): PDO {
    return getDbConnection();
}

/**
 * Finds admin record by username using prepared statement
 */
function getAdminByUsername(PDO $pdo, string $username): ?array {
    $stmt = $pdo->prepare("SELECT id, username, password_hash, is_active, failed_login_attempts, locked_until, last_login_at FROM admin_users WHERE username = :username LIMIT 1");
    $stmt->execute([':username' => $username]);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);
    return $admin ?: null;
}

/**
 * Records a failed login attempt and locks account if threshold reached (5 attempts -> 15 min lock)
 */
function recordFailedLoginAttempt(PDO $pdo, array $admin): void {
    $adminId = (int)$admin['id'];
    $newAttempts = ((int)$admin['failed_login_attempts']) + 1;

    if ($newAttempts >= 5) {
        $stmt = $pdo->prepare("UPDATE admin_users SET failed_login_attempts = :attempts, locked_until = DATE_ADD(NOW(), INTERVAL 15 MINUTE) WHERE id = :id");
        $stmt->execute([':attempts' => $newAttempts, ':id' => $adminId]);
    } else {
        $stmt = $pdo->prepare("UPDATE admin_users SET failed_login_attempts = :attempts WHERE id = :id");
        $stmt->execute([':attempts' => $newAttempts, ':id' => $adminId]);
    }
}

/**
 * Resets failed login attempts and updates last_login_at on successful authentication
 */
function resetFailedLoginAttempts(PDO $pdo, int $adminId): void {
    $stmt = $pdo->prepare("UPDATE admin_users SET failed_login_attempts = 0, locked_until = NULL, last_login_at = NOW() WHERE id = :id");
    $stmt->execute([':id' => $adminId]);
}
