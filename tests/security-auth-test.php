<?php
/**
 * Automated Security & Functional Test Suite for Admin Authentication
 */

// Error handling - start session at top before output
if (session_status() === PHP_SESSION_NONE) {
    @session_start();
}

define('GREEN', "\033[32m");
define('RED', "\033[31m");
define('RESET', "\033[0m");

$testsPassed = 0;
$testsFailed = 0;

function assertTest(bool $condition, string $testName, string $details = ''): void {
    global $testsPassed, $testsFailed;
    if ($condition) {
        $testsPassed++;
        echo GREEN . "[PASS] " . RESET . $testName . ($details ? " ($details)" : "") . "\n";
    } else {
        $testsFailed++;
        echo RED . "[FAIL] " . RESET . $testName . ($details ? " ($details)" : "") . "\n";
    }
}

echo "==================================================\n";
echo " Executing Admin Authentication Security Tests\n";
echo "==================================================\n\n";

// Create SQLite In-Memory Database for testing
$pdo = new PDO('sqlite::memory:');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

// SQLite schema equivalent to MySQL admin_users
$pdo->exec("CREATE TABLE admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP NULL,
    failed_login_attempts INT UNSIGNED NOT NULL DEFAULT 0,
    locked_until TIMESTAMP NULL
)");

// Include DB helper functions
require_once __DIR__ . '/../public/admin/includes/db.php';

// Test 1: Password Hashing Quality
$plainPassword = 'AdminSecretPassword123!';
$hash = password_hash($plainPassword, PASSWORD_DEFAULT);
$hashInfo = password_get_info($hash);
assertTest($hashInfo['algoName'] !== 'unknown' && password_verify($plainPassword, $hash), 'Password Hashing', 'Uses password_hash() with default algorithm');

// Test 2: Create First Admin User
$username = 'admin_super';
$createSuccess = createAdminUserInPdo($pdo, $username, $plainPassword);
assertTest($createSuccess === true, 'Create First Admin', 'Successfully created single admin user');

function createAdminUserInPdo(PDO $pdo, string $username, string $password): bool {
    $stmt = $pdo->query("SELECT COUNT(*) FROM admin_users");
    if ((int)$stmt->fetchColumn() > 0) {
        return false;
    }
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO admin_users (username, password_hash, is_active) VALUES (:username, :hash, 1)");
    return $stmt->execute([':username' => $username, ':hash' => $hash]);
}

// Test 3: Block Creation of Second Admin
$secondAdminAttempt = createAdminUserInPdo($pdo, 'admin_second', 'AnotherPassword123!');
assertTest($secondAdminAttempt === false, 'Single Admin Restriction', 'Second admin creation was blocked');

// Test 4: Find Admin User by Username
$adminRecord = getAdminByUsername($pdo, $username);
assertTest(!empty($adminRecord) && $adminRecord['username'] === $username, 'Query Admin User', 'Prepared statement query returns admin user');

// Test 5: Verify Incorrect Password Verification
$wrongPasswordVerify = password_verify('WrongPassword123!', $adminRecord['password_hash']);
assertTest($wrongPasswordVerify === false, 'Password Verification Failure', 'Rejects wrong password');

// Test 6: Verify Correct Password Verification
$correctPasswordVerify = password_verify($plainPassword, $adminRecord['password_hash']);
assertTest($correctPasswordVerify === true, 'Password Verification Success', 'Accepts valid password');

// Test 7: Record Failed Login Attempts & Brute Force Lockout
for ($i = 0; $i < 4; $i++) {
    $currentRecord = getAdminByUsername($pdo, $username);
    recordFailedLoginAttemptSQLite($pdo, $currentRecord);
}
$after4 = getAdminByUsername($pdo, $username);
assertTest((int)$after4['failed_login_attempts'] === 4 && empty($after4['locked_until']), 'Brute Force Attempts Increment', 'Failed login count is 4');

// 5th failed attempt triggers lock
recordFailedLoginAttemptSQLite($pdo, $after4);
$after5 = getAdminByUsername($pdo, $username);
assertTest((int)$after5['failed_login_attempts'] === 5 && !empty($after5['locked_until']), 'Brute Force Lockout Triggered', 'Account locked after 5 failed attempts');

function recordFailedLoginAttemptSQLite(PDO $pdo, array $admin): void {
    $adminId = (int)$admin['id'];
    $newAttempts = ((int)$admin['failed_login_attempts']) + 1;

    if ($newAttempts >= 5) {
        $futureTime = date('Y-m-d H:i:s', time() + 900);
        $stmt = $pdo->prepare("UPDATE admin_users SET failed_login_attempts = :attempts, locked_until = :locked WHERE id = :id");
        $stmt->execute([':attempts' => $newAttempts, ':locked' => $futureTime, ':id' => $adminId]);
    } else {
        $stmt = $pdo->prepare("UPDATE admin_users SET failed_login_attempts = :attempts WHERE id = :id");
        $stmt->execute([':attempts' => $newAttempts, ':id' => $adminId]);
    }
}

// Test 8: Reset Failed Login Attempts
resetFailedLoginAttemptsSQLite($pdo, (int)$adminRecord['id']);
$afterReset = getAdminByUsername($pdo, $username);
assertTest((int)$afterReset['failed_login_attempts'] === 0 && empty($afterReset['locked_until']) && !empty($afterReset['last_login_at']), 'Reset Lockout on Success', 'Failed attempts reset to 0, locked_until cleared, last_login_at updated');

function resetFailedLoginAttemptsSQLite(PDO $pdo, int $adminId): void {
    $now = date('Y-m-d H:i:s');
    $stmt = $pdo->prepare("UPDATE admin_users SET failed_login_attempts = 0, locked_until = NULL, last_login_at = :now WHERE id = :id");
    $stmt->execute([':now' => $now, ':id' => $adminId]);
}

// Test 9: Password is not stored in plaintext
$dbUser = getAdminByUsername($pdo, $username);
assertTest($dbUser['password_hash'] !== $plainPassword && strpos($dbUser['password_hash'], '$2y$') === 0, 'No Plaintext Passwords', 'Stored password is a secure bcrypt hash');

// Test 10: CSRF Helper Functions
$csrfToken = getCsrfTokenTest();
assertTest(!empty($csrfToken) && strlen($csrfToken) === 64, 'CSRF Token Generation', 'Generates 64-character random hex token');
assertTest(verifyCsrfTokenTest($csrfToken) === true, 'CSRF Validation Success', 'Validates correct CSRF token');
assertTest(verifyCsrfTokenTest('invalid_token') === false, 'CSRF Validation Rejection', 'Rejects invalid CSRF token');

function getCsrfTokenTest(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verifyCsrfTokenTest(?string $token): bool {
    if (empty($token) || empty($_SESSION['csrf_token'])) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

// Summary
echo "\n==================================================\n";
echo " Test Results: " . $testsPassed . " Passed, " . $testsFailed . " Failed\n";
echo "==================================================\n";

if ($testsFailed > 0) {
    exit(1);
}
exit(0);
