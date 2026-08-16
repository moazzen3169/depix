<?php
/**
 * Administrator Panel Placeholder
 * Protected by Auth Middleware
 */

require_once __DIR__ . '/includes/auth.php';

$adminUsername = $_SESSION['admin_username'] ?? 'Administrator';
?>
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>پنل مدیریت | دپیکس</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            background-color: #0b0f19;
            color: #f8fafc;
            font-family: system-ui, -apple-system, sans-serif;
        }
    </style>
</head>
<body class="min-h-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-lg bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mb-6">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
        </div>

        <h1 class="text-2xl font-bold text-white mb-2">احراز هویت مدیر با موفقیت انجام شد</h1>
        <p class="text-slate-400 text-sm mb-6">
            خوش آمدید، <span class="text-indigo-400 font-semibold dir-ltr inline-block"><?php echo htmlspecialchars($adminUsername, ENT_QUOTES, 'UTF-8'); ?></span>
        </p>

        <div class="p-4 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-400 mb-8 space-y-2">
            <div class="flex justify-between items-center">
                <span>وضعیت نشست:</span>
                <span class="text-emerald-400 font-medium">فعال و ایمن (Secure Session)</span>
            </div>
            <div class="flex justify-between items-center">
                <span>کنترل دسترسی:</span>
                <span class="text-slate-300">Server-Side Authenticated</span>
            </div>
        </div>

        <a href="logout.php" class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-600/90 hover:bg-rose-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-rose-600/20">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            خروج از حساب
        </a>
    </div>
</body>
</html>
