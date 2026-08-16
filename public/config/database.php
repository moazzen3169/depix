<?php
/**
 * Database Configuration & Connection Helper
 * Supports standalone execution when 'public/' is published as web root.
 */

$rootConfig = __DIR__ . '/../../config/database.php';

if (file_exists($rootConfig)) {
    require_once $rootConfig;
}

if (!defined('DB_HOST')) define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
if (!defined('DB_PORT')) define('DB_PORT', getenv('DB_PORT') ?: '3306');
if (!defined('DB_NAME')) define('DB_NAME', getenv('DB_NAME') ?: 'depixdq_project_db');
if (!defined('DB_USER')) define('DB_USER', getenv('DB_USER') ?: 'depixdq_project_db');
if (!defined('DB_PASS')) define('DB_PASS', getenv('DB_PASS') ?: 'DAkWtQnyz84w6wA6N3Vn');
if (!defined('DB_CHARSET')) define('DB_CHARSET', 'utf8mb4');

if (!function_exists('getDbConnection')) {
    /**
     * Creates and returns a PDO database connection instance.
     */
    function getDbConnection(): PDO {
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        return new PDO($dsn, DB_USER, DB_PASS, $options);
    }
}

if (!function_exists('ensureDatabaseTablesExist')) {
    /**
     * Guarantees that essential database tables (admin_users & project_requests) exist.
     */
    function ensureDatabaseTablesExist(PDO $pdo): void {
        static $tablesCreated = false;
        if ($tablesCreated) {
            return;
        }

        $sqlAdminUsers = "CREATE TABLE IF NOT EXISTS admin_users (
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

        $sqlProjectRequests = "CREATE TABLE IF NOT EXISTS project_requests (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(150) NOT NULL,
            company_name VARCHAR(150) NULL,
            phone VARCHAR(50) NOT NULL,
            social_handle VARCHAR(100) NULL,
            project_type VARCHAR(100) NOT NULL,
            budget VARCHAR(50) NULL,
            project_description TEXT NOT NULL,
            status VARCHAR(20) NOT NULL DEFAULT 'new',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

        $pdo->exec($sqlAdminUsers);
        $pdo->exec($sqlProjectRequests);
        $tablesCreated = true;
    }
}
