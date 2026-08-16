<?php
/**
 * Database Configuration & Connection Utility
 *
 * Update credentials below or use environment variables to configure your MySQL connection.
 */

if (!defined('DB_HOST')) define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
if (!defined('DB_PORT')) define('DB_PORT', getenv('DB_PORT') ?: '3306');
if (!defined('DB_NAME')) define('DB_NAME', getenv('DB_NAME') ?: 'depixdq_project_db');
if (!defined('DB_USER')) define('DB_USER', getenv('DB_USER') ?: 'depixdq_project_db');
if (!defined('DB_PASS')) define('DB_PASS', getenv('DB_PASS') ?: 'DAkWtQnyz84w6wA6N3Vn');
if (!defined('DB_CHARSET')) define('DB_CHARSET', 'utf8mb4');

if (!function_exists('getDbConnection')) {
    /**
     * Returns a PDO database connection instance
     *
     * @return PDO
     * @throws PDOException
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
