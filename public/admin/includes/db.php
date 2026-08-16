<?php
/**
 * Admin Database Helpers & Project Requests Data Access Object
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
 * Returns PDO connection instance and ensures required tables exist.
 */
function getAdminDbConnection(): PDO {
    $pdo = getDbConnection();
    ensureDatabaseTablesExist($pdo);
    return $pdo;
}

/**
 * Counts total existing admin users
 */
function countExistingAdmins(PDO $pdo): int {
    ensureDatabaseTablesExist($pdo);
    $stmt = $pdo->query("SELECT COUNT(*) FROM admin_users");
    return (int) $stmt->fetchColumn();
}

/**
 * Finds admin record by username using prepared statement
 */
function getAdminByUsername(PDO $pdo, string $username): ?array {
    ensureDatabaseTablesExist($pdo);
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

/**
 * Retrieves project request statistical metrics
 */
function getProjectRequestStats(PDO $pdo): array {
    ensureDatabaseTablesExist($pdo);
    $stats = [
        'total'       => 0,
        'new'         => 0,
        'in_progress' => 0,
        'contacted'   => 0,
        'completed'   => 0,
        'archived'    => 0,
    ];

    $stmt = $pdo->query("SELECT status, COUNT(*) as cnt FROM project_requests GROUP BY status");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($rows as $row) {
        $st = $row['status'];
        $cnt = (int)$row['cnt'];
        $stats['total'] += $cnt;
        if (isset($stats[$st])) {
            $stats[$st] = $cnt;
        }
    }

    return $stats;
}

/**
 * Fetches list of project requests with optional status filtering and search query
 */
function getProjectRequests(PDO $pdo, ?string $statusFilter = null, ?string $searchQuery = null): array {
    ensureDatabaseTablesExist($pdo);

    $sql = "SELECT id, full_name, company_name, phone, social_handle, project_type, budget, project_description, status, created_at, updated_at
            FROM project_requests
            WHERE 1=1";
    $params = [];

    $allowedStatuses = ['new', 'contacted', 'in_progress', 'completed', 'archived'];
    if ($statusFilter !== null && in_array($statusFilter, $allowedStatuses, true)) {
        $sql .= " AND status = :status";
        $params[':status'] = $statusFilter;
    }

    if (!empty($searchQuery)) {
        $sql .= " AND (full_name LIKE :search OR company_name LIKE :search OR phone LIKE :search OR social_handle LIKE :search OR project_type LIKE :search OR project_description LIKE :search)";
        $params[':search'] = '%' . $searchQuery . '%';
    }

    $sql .= " ORDER BY created_at DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

/**
 * Fetches a single project request by ID
 */
function getProjectRequestById(PDO $pdo, int $id): ?array {
    ensureDatabaseTablesExist($pdo);
    $stmt = $pdo->prepare("SELECT id, full_name, company_name, phone, social_handle, project_type, budget, project_description, status, created_at, updated_at FROM project_requests WHERE id = :id LIMIT 1");
    $stmt->execute([':id' => $id]);
    $res = $stmt->fetch(PDO::FETCH_ASSOC);
    return $res ?: null;
}

/**
 * Updates the status of a project request
 */
function updateProjectRequestStatus(PDO $pdo, int $id, string $status): bool {
    ensureDatabaseTablesExist($pdo);
    $allowedStatuses = ['new', 'contacted', 'in_progress', 'completed', 'archived'];
    if (!in_array($status, $allowedStatuses, true)) {
        return false;
    }

    $stmt = $pdo->prepare("UPDATE project_requests SET status = :status WHERE id = :id");
    return $stmt->execute([':status' => $status, ':id' => $id]);
}

/**
 * Deletes a project request record
 */
function deleteProjectRequest(PDO $pdo, int $id): bool {
    ensureDatabaseTablesExist($pdo);
    $stmt = $pdo->prepare("DELETE FROM project_requests WHERE id = :id");
    return $stmt->execute([':id' => $id]);
}
