<?php
/**
 * Public Admin Setup Inclusion Proxy
 */
$rootTool = __DIR__ . '/../../../tools/create-admin.php';

if (file_exists($rootTool)) {
    require_once $rootTool;
} else {
    // Direct execution fallback if only public/ folder is published on web server
    require_once __DIR__ . '/create-admin-standalone.php';
}
