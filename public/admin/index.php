<?php
/**
 * Administrator Panel - Project Requests Management Dashboard
 * Protected by Auth Middleware
 */

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/db.php';

$pdo = getAdminDbConnection();
$adminUsername = $_SESSION['admin_username'] ?? 'Administrator';

$successMessage = '';
$errorMessage = '';

// Handle POST actions (Status update & Delete request)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $csrfToken = $_POST['csrf_token'] ?? '';

    if (!verifyCsrfToken($csrfToken)) {
        $errorMessage = 'خطای امنیتی CSRF. لطفاً صفحه را بازخوانی کرده و مجدداً تلاش کنید.';
    } else {
        $action = $_POST['action'] ?? '';
        $requestId = (int)($_POST['request_id'] ?? 0);

        if ($action === 'update_status' && $requestId > 0) {
            $newStatus = trim((string)($_POST['status'] ?? ''));
            if (updateProjectRequestStatus($pdo, $requestId, $newStatus)) {
                $successMessage = 'وضعیت درخواست شماره ' . $requestId . ' با موفقیت به روز شد.';
            } else {
                $errorMessage = 'خطا در به روزرسانی وضعیت درخواست.';
            }
        } elseif ($action === 'delete_request' && $requestId > 0) {
            if (deleteProjectRequest($pdo, $requestId)) {
                $successMessage = 'درخواست شماره ' . $requestId . ' با موفقیت از سیستم حذف شد.';
            } else {
                $errorMessage = 'خطا در حذف درخواست.';
            }
        }
    }
}

// Retrieve Filter & Search Query
$selectedStatus = isset($_GET['status']) && $_GET['status'] !== 'all' ? trim((string)$_GET['status']) : null;
$searchQuery = isset($_GET['q']) ? trim((string)$_GET['q']) : null;

// Fetch Stats & Requests List
$stats = getProjectRequestStats($pdo);
$requests = getProjectRequests($pdo, $selectedStatus, $searchQuery);

/**
 * Formats datetime string into Jalali / Persian date format
 */
function formatPersianDate(string $datetimeStr): string {
    $timestamp = strtotime($datetimeStr);
    if (!$timestamp) return $datetimeStr;

    if (class_exists('IntlDateFormatter')) {
        try {
            $formatter = new IntlDateFormatter(
                'fa_IR@calendar=persian',
                IntlDateFormatter::MEDIUM,
                IntlDateFormatter::SHORT,
                'Asia/Tehran',
                IntlDateFormatter::TRADITIONAL
            );
            $formatted = $formatter->format($timestamp);
            if ($formatted) return $formatted;
        } catch (Exception $e) {
            // Fallback to standard
        }
    }

    return date('Y/m/d - H:i', $timestamp);
}

/**
 * Returns UI badge metadata for status
 */
function getStatusBadge(string $status): array {
    switch ($status) {
        case 'new':
            return ['label' => 'جدید', 'bg' => 'bg-indigo-500/10', 'text' => 'text-indigo-400', 'border' => 'border-indigo-500/30'];
        case 'in_progress':
            return ['label' => 'در حال بررسی', 'bg' => 'bg-amber-500/10', 'text' => 'text-amber-400', 'border' => 'border-amber-500/30'];
        case 'contacted':
            return ['label' => 'تماس گرفته شده', 'bg' => 'bg-cyan-500/10', 'text' => 'text-cyan-400', 'border' => 'border-cyan-500/30'];
        case 'completed':
            return ['label' => 'تکمیل شده', 'bg' => 'bg-emerald-500/10', 'text' => 'text-emerald-400', 'border' => 'border-emerald-500/30'];
        case 'archived':
            return ['label' => 'بایگانی', 'bg' => 'bg-slate-500/10', 'text' => 'text-slate-400', 'border' => 'border-slate-500/30'];
        default:
            return ['label' => $status, 'bg' => 'bg-slate-500/10', 'text' => 'text-slate-400', 'border' => 'border-slate-500/30'];
    }
}
?>
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مدیریت سفارشات و مشاوره | پنل دپیکس</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            background-color: #0b0f19;
            color: #f8fafc;
            font-family: system-ui, -apple-system, sans-serif;
        }
        /* Custom scrollbar for table container */
        .custom-scrollbar::-webkit-scrollbar {
            height: 6px;
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #0f172a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #475569;
        }
    </style>
</head>
<body class="min-h-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.12),rgba(255,255,255,0))] flex flex-col antialiased">

    <!-- Top Navigation Bar -->
    <header class="sticky top-0 z-30 bg-slate-900/80 border-b border-slate-800 backdrop-blur-xl">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30 text-lg">
                    d
                </div>
                <div>
                    <h1 class="text-base font-bold text-white leading-tight">پنل مدیریت دپیکس</h1>
                    <p class="text-xs text-slate-400">مدیریت درخواست‌های پروژه و فرم‌های مشاوره</p>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <div class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>مدیر: <strong class="text-white dir-ltr inline-block"><?php echo htmlspecialchars($adminUsername, ENT_QUOTES, 'UTF-8'); ?></strong></span>
                </div>

                <a href="logout.php" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-medium transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    خروج
                </a>
            </div>
        </div>
    </header>

    <!-- Main Content Container -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        <!-- Flash Messages -->
        <?php if ($successMessage): ?>
            <div class="flex items-center gap-3 bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 p-4 rounded-2xl text-sm shadow-lg">
                <svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span><?php echo htmlspecialchars($successMessage, ENT_QUOTES, 'UTF-8'); ?></span>
            </div>
        <?php endif; ?>

        <?php if ($errorMessage): ?>
            <div class="flex items-center gap-3 bg-rose-950/60 border border-rose-500/50 text-rose-200 p-4 rounded-2xl text-sm shadow-lg">
                <svg class="w-5 h-5 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <span><?php echo htmlspecialchars($errorMessage, ENT_QUOTES, 'UTF-8'); ?></span>
            </div>
        <?php endif; ?>

        <!-- Statistics Metric Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            <a href="index.php" class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group">
                <div class="text-xs text-slate-400 font-medium">کل درخواست‌ها</div>
                <div class="text-2xl font-bold text-white mt-2 group-hover:text-indigo-400 transition-colors">
                    <?php echo number_format($stats['total']); ?>
                </div>
            </a>

            <a href="index.php?status=new" class="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 hover:border-indigo-500/40 transition-all flex flex-col justify-between group">
                <div class="text-xs text-indigo-300 font-medium flex items-center justify-between">
                    <span>جدید</span>
                    <span class="w-2 h-2 rounded-full bg-indigo-400"></span>
                </div>
                <div class="text-2xl font-bold text-indigo-400 mt-2">
                    <?php echo number_format($stats['new']); ?>
                </div>
            </a>

            <a href="index.php?status=in_progress" class="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between group">
                <div class="text-xs text-amber-300 font-medium flex items-center justify-between">
                    <span>در حال بررسی</span>
                    <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                </div>
                <div class="text-2xl font-bold text-amber-400 mt-2">
                    <?php echo number_format($stats['in_progress']); ?>
                </div>
            </a>

            <a href="index.php?status=contacted" class="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex flex-col justify-between group">
                <div class="text-xs text-cyan-300 font-medium flex items-center justify-between">
                    <span>تماس گرفته شده</span>
                    <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
                </div>
                <div class="text-2xl font-bold text-cyan-400 mt-2">
                    <?php echo number_format($stats['contacted']); ?>
                </div>
            </a>

            <a href="index.php?status=completed" class="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex flex-col justify-between group col-span-2 sm:col-span-1">
                <div class="text-xs text-emerald-300 font-medium flex items-center justify-between">
                    <span>تکمیل شده</span>
                    <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <div class="text-2xl font-bold text-emerald-400 mt-2">
                    <?php echo number_format($stats['completed']); ?>
                </div>
            </a>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xl">
            <!-- Filter Tabs -->
            <div class="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 custom-scrollbar text-xs">
                <?php
                $statusTabs = [
                    'all'         => 'همه (' . $stats['total'] . ')',
                    'new'         => 'جدید (' . $stats['new'] . ')',
                    'in_progress' => 'در حال بررسی (' . $stats['in_progress'] . ')',
                    'contacted'   => 'تماس گرفته شده (' . $stats['contacted'] . ')',
                    'completed'   => 'تکمیل شده (' . $stats['completed'] . ')',
                    'archived'    => 'بایگانی (' . $stats['archived'] . ')',
                ];
                $activeStatus = $selectedStatus ?? 'all';
                foreach ($statusTabs as $stKey => $stLabel):
                    $isActive = ($activeStatus === $stKey);
                    $url = ($stKey === 'all') ? 'index.php' : 'index.php?status=' . $stKey;
                    if (!empty($searchQuery)) $url .= (strpos($url, '?') !== false ? '&' : '?') . 'q=' . urlencode($searchQuery);
                ?>
                    <a href="<?php echo htmlspecialchars($url, ENT_QUOTES, 'UTF-8'); ?>"
                        class="px-3.5 py-2 rounded-xl whitespace-nowrap transition-all font-medium <?php echo $isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'; ?>">
                        <?php echo $stLabel; ?>
                    </a>
                <?php endforeach; ?>
            </div>

            <!-- Search Input -->
            <form method="GET" action="index.php" class="flex items-center gap-2">
                <?php if ($selectedStatus): ?>
                    <input type="hidden" name="status" value="<?php echo htmlspecialchars($selectedStatus, ENT_QUOTES, 'UTF-8'); ?>">
                <?php endif; ?>
                <div class="relative flex-1 md:w-64">
                    <input type="text" name="q" value="<?php echo htmlspecialchars($searchQuery ?? '', ENT_QUOTES, 'UTF-8'); ?>"
                        placeholder="جستجو در نام، تلفن، نوع..."
                        class="w-full bg-slate-950/70 border border-slate-800 rounded-xl pr-3 pl-9 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all">
                    <button type="submit" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </button>
                </div>
                <?php if ($searchQuery): ?>
                    <a href="<?php echo $selectedStatus ? 'index.php?status=' . urlencode($selectedStatus) : 'index.php'; ?>"
                        class="px-3 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs transition-colors">
                        حذف فیلتر
                    </a>
                <?php endif; ?>
            </form>
        </div>

        <!-- Project Requests Table Section -->
        <div class="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
            <?php if (empty($requests)): ?>
                <div class="p-12 text-center">
                    <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800/80 text-slate-500 mb-4">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                        </svg>
                    </div>
                    <h3 class="text-base font-bold text-white mb-1">هیچ درخواستی یافت نشد</h3>
                    <p class="text-xs text-slate-400 max-w-sm mx-auto">هنوز هیچ درخواست پروژه‌ای با این مشخصات ثبت نشده است یا عبارت جستجوی شما نتیجه‌ای نداشت.</p>
                </div>
            <?php else: ?>
                <div class="overflow-x-auto custom-scrollbar">
                    <table class="w-full text-right text-xs">
                        <thead class="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                            <tr>
                                <th scope="col" class="py-4 px-4 w-12 text-center">#</th>
                                <th scope="col" class="py-4 px-4">مشتری / شرکت</th>
                                <th scope="col" class="py-4 px-4">راه ارتباطی</th>
                                <th scope="col" class="py-4 px-4">نوع پروژه</th>
                                <th scope="col" class="py-4 px-4">بودجه</th>
                                <th scope="col" class="py-4 px-4">وضعیت</th>
                                <th scope="col" class="py-4 px-4">تاریخ ثبت</th>
                                <th scope="col" class="py-4 px-4 text-center">عملیات</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-800/60">
                            <?php foreach ($requests as $req):
                                $badge = getStatusBadge($req['status']);
                                $reqDataJson = htmlspecialchars(json_encode([
                                    'id'                 => $req['id'],
                                    'full_name'          => $req['full_name'],
                                    'company_name'       => $req['company_name'] ?? '---',
                                    'phone'              => $req['phone'],
                                    'social_handle'      => $req['social_handle'] ?? '---',
                                    'project_type'       => $req['project_type'],
                                    'budget'             => $req['budget'] ?? 'تعیین نشده',
                                    'project_description'=> $req['project_description'],
                                    'status'             => $req['status'],
                                    'created_at'         => formatPersianDate($req['created_at'])
                                ], JSON_UNESCAPED_UNICODE), ENT_QUOTES, 'UTF-8');
                            ?>
                                <tr class="hover:bg-slate-800/40 transition-colors group">
                                    <td class="py-4 px-4 font-mono text-slate-500 text-center font-bold">
                                        #<?php echo $req['id']; ?>
                                    </td>
                                    <td class="py-4 px-4 font-medium text-white">
                                        <div class="font-bold text-slate-100"><?php echo htmlspecialchars($req['full_name'], ENT_QUOTES, 'UTF-8'); ?></div>
                                        <?php if (!empty($req['company_name'])): ?>
                                            <div class="text-[11px] text-slate-400 mt-0.5"><?php echo htmlspecialchars($req['company_name'], ENT_QUOTES, 'UTF-8'); ?></div>
                                        <?php endif; ?>
                                    </td>
                                    <td class="py-4 px-4">
                                        <a href="tel:<?php echo htmlspecialchars($req['phone'], ENT_QUOTES, 'UTF-8'); ?>" class="font-mono text-indigo-400 hover:underline dir-ltr inline-block">
                                            <?php echo htmlspecialchars($req['phone'], ENT_QUOTES, 'UTF-8'); ?>
                                        </a>
                                        <?php if (!empty($req['social_handle'])): ?>
                                            <div class="text-[11px] text-slate-400 mt-0.5 dir-ltr inline-block block">
                                                @<?php echo htmlspecialchars(ltrim($req['social_handle'], '@'), ENT_QUOTES, 'UTF-8'); ?>
                                            </div>
                                        <?php endif; ?>
                                    </td>
                                    <td class="py-4 px-4">
                                        <span class="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-[11px] font-medium">
                                            <?php echo htmlspecialchars($req['project_type'], ENT_QUOTES, 'UTF-8'); ?>
                                        </span>
                                    </td>
                                    <td class="py-4 px-4 text-slate-300 font-medium">
                                        <?php echo !empty($req['budget']) ? htmlspecialchars($req['budget'], ENT_QUOTES, 'UTF-8') : '<span class="text-slate-500">مشخص نشده</span>'; ?>
                                    </td>
                                    <td class="py-4 px-4">
                                        <!-- Inline Status Selector -->
                                        <form method="POST" action="" class="inline-block">
                                            <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars(getCsrfToken(), ENT_QUOTES, 'UTF-8'); ?>">
                                            <input type="hidden" name="action" value="update_status">
                                            <input type="hidden" name="request_id" value="<?php echo $req['id']; ?>">
                                            <select name="status" onchange="this.form.submit()"
                                                class="bg-slate-950 border <?php echo $badge['border']; ?> <?php echo $badge['text']; ?> text-[11px] font-semibold rounded-lg px-2.5 py-1 focus:outline-none cursor-pointer">
                                                <option value="new" <?php echo $req['status'] === 'new' ? 'selected' : ''; ?>>جدید</option>
                                                <option value="in_progress" <?php echo $req['status'] === 'in_progress' ? 'selected' : ''; ?>>در حال بررسی</option>
                                                <option value="contacted" <?php echo $req['status'] === 'contacted' ? 'selected' : ''; ?>>تماس گرفته شده</option>
                                                <option value="completed" <?php echo $req['status'] === 'completed' ? 'selected' : ''; ?>>تکمیل شده</option>
                                                <option value="archived" <?php echo $req['status'] === 'archived' ? 'selected' : ''; ?>>بایگانی</option>
                                            </select>
                                        </form>
                                    </td>
                                    <td class="py-4 px-4 text-slate-400 whitespace-nowrap">
                                        <?php echo formatPersianDate($req['created_at']); ?>
                                    </td>
                                    <td class="py-4 px-4 text-center whitespace-nowrap">
                                        <div class="inline-flex items-center gap-2">
                                            <button type="button" onclick="openDetailsModal(<?php echo $reqDataJson; ?>)"
                                                class="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-lg border border-indigo-500/30 font-medium transition-all">
                                                جزئیات کامل
                                            </button>
                                            <form method="POST" action="" onsubmit="return confirm('آیا از حذف این درخواست اطمینان دارید؟');" class="inline">
                                                <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars(getCsrfToken(), ENT_QUOTES, 'UTF-8'); ?>">
                                                <input type="hidden" name="action" value="delete_request">
                                                <input type="hidden" name="request_id" value="<?php echo $req['id']; ?>">
                                                <button type="submit" class="px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white rounded-lg border border-rose-500/20 transition-all">
                                                    حذف
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            <?php endif; ?>
        </div>
    </main>

    <!-- Request Details Modal -->
    <div id="detailsModal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity">
        <div class="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
            <!-- Modal Header -->
            <div class="flex items-center justify-between border-b border-slate-800 pb-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-mono font-bold text-sm" id="modalReqId">
                        #0
                    </div>
                    <div>
                        <h2 class="text-lg font-bold text-white" id="modalClientName">---</h2>
                        <p class="text-xs text-slate-400" id="modalCompanyName">---</p>
                    </div>
                </div>
                <button type="button" onclick="closeDetailsModal()" class="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                    ✕
                </button>
            </div>

            <!-- Modal Info Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div class="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                    <span class="text-slate-500 block mb-1">شماره تماس:</span>
                    <a id="modalPhone" href="#" class="font-mono text-indigo-400 font-bold text-sm hover:underline dir-ltr inline-block">---</a>
                </div>

                <div class="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                    <span class="text-slate-500 block mb-1">آیدی شبکه‌های اجتماعی:</span>
                    <span id="modalSocial" class="text-slate-200 font-mono font-semibold">---</span>
                </div>

                <div class="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                    <span class="text-slate-500 block mb-1">نوع پروژه:</span>
                    <span id="modalProjectType" class="text-indigo-300 font-semibold">---</span>
                </div>

                <div class="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                    <span class="text-slate-500 block mb-1">بودجه در نظر گرفته شده:</span>
                    <span id="modalBudget" class="text-emerald-400 font-semibold">---</span>
                </div>
            </div>

            <!-- Full Description Box -->
            <div class="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
                <span class="text-xs text-slate-400 font-medium block">توضیحات و نیازمندی‌های پروژه:</span>
                <p id="modalDescription" class="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed font-normal">
                    ---
                </p>
            </div>

            <!-- Status Quick Change & Actions inside Modal -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800">
                <div class="text-xs text-slate-400 flex items-center gap-2">
                    <span>تاریخ ثبت:</span>
                    <span id="modalDate" class="text-slate-300 font-mono">---</span>
                </div>

                <form method="POST" action="" class="flex items-center gap-2 w-full sm:w-auto">
                    <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars(getCsrfToken(), ENT_QUOTES, 'UTF-8'); ?>">
                    <input type="hidden" name="action" value="update_status">
                    <input type="hidden" name="request_id" id="modalFormReqId" value="0">
                    <select name="status" id="modalStatusSelect"
                        class="bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none">
                        <option value="new">جدید</option>
                        <option value="in_progress">در حال بررسی</option>
                        <option value="contacted">تماس گرفته شده</option>
                        <option value="completed">تکمیل شده</option>
                        <option value="archived">بایگانی</option>
                    </select>
                    <button type="submit" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition-colors shadow-lg shadow-indigo-600/25">
                        ذخیره تغییرات
                    </button>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal JavaScript -->
    <script>
        function openDetailsModal(data) {
            document.getElementById('modalReqId').innerText = '#' + data.id;
            document.getElementById('modalFormReqId').value = data.id;
            document.getElementById('modalClientName').innerText = data.full_name;
            document.getElementById('modalCompanyName').innerText = data.company_name !== '---' ? 'شرکت: ' + data.company_name : 'مشتری حقیقی';

            const phoneEl = document.getElementById('modalPhone');
            phoneEl.innerText = data.phone;
            phoneEl.href = 'tel:' + data.phone;

            document.getElementById('modalSocial').innerText = data.social_handle;
            document.getElementById('modalProjectType').innerText = data.project_type;
            document.getElementById('modalBudget').innerText = data.budget;
            document.getElementById('modalDescription').innerText = data.project_description;
            document.getElementById('modalDate').innerText = data.created_at;

            const statusSelect = document.getElementById('modalStatusSelect');
            if (statusSelect) {
                statusSelect.value = data.status;
            }

            const modal = document.getElementById('detailsModal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function closeDetailsModal() {
            const modal = document.getElementById('detailsModal');
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }

        // Close modal on Escape key press
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeDetailsModal();
            }
        });
    </script>
</body>
</html>
