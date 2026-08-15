/**
 * Premium Persian RTL Software Studio Website - JS Module
 * Highly polished, modular, accessible, and high-performance.
 */

// Global state for projects and current active filter
const projects = [
  {
    id: 1,
    title: "کفشام",
    category: "ecommerce",
    categoryLabel: "فروشگاه آنلاین کفش · خرید سریع و آسان",
    year: "۱۴۰۴",
    cover: "assets/projects/project-01/cover.webp",
    type: "website",
    featured: true,
    specs: {
      type: "فروشگاه اینترنتی کفش و کتانی",
      duration: "۴ هفته",
      techs: ["طراحی اختصاصی", "سرعت بالا", "سازگار با موبایل"],
      metrics: [
        { label: "رضایت خریداران", value: "۹۸٪" },
        { label: "افزایش فروش آنلاین", value: "+۳۰٪" },
        { label: "زمان آماده‌سازی", value: "۳ هفته" }
      ]
    },
    screens: [
      "assets/projects/project-01/cover.webp",
      "assets/projects/project-01/3.jpg",
      "assets/projects/project-01/4.jpg",
      "assets/projects/project-01/screen-01.webp",
    ],
    description: "«کفشام» یک وب‌سایت مدرن و بسیار کاربرپسند برای فروشگاه آنلاین کفش است. در طراحی این سایت تمرکز اصلی روی نمایش شفاف محصولات و خرید آسان در ۳ کلیک بوده است تا مشتریان بدون معطلی کفش مورد نظرشان را انتخاب و خریداری کنند."
  },
  {
    id: 2,
    title: "چمپینگ",
    category: "ecommerce",
    categoryLabel: "فروشگاه لوازم کمپینگ و سفر",
    year: "۱۴۰۴",
    cover: "assets/projects/project-02/1.webp",
    type: "website",
    featured: false,
    specs: {
      type: "فروشگاه آنلاین تجهیزات مسافرتی",
      duration: "۵ هفته",
      techs: ["طراحی زیبا", "نمایش عالی در موبایل", "پرداخت سریع"],
      metrics: [
        { label: "سهولت در خرید", value: "+۴۰٪" },
        { label: "سازگاری با گوشی", value: "۱۰۰٪" },
        { label: "تعداد صفحات سایت", value: "۶ صفحه" }
      ]
    },
    screens: [
      "assets/projects/project-02/1.webp",
      "assets/projects/project-02/2.webp",
      "assets/projects/project-02/3.webp"
    ],
    description: "«چمپینگ» یک فروشگاه اینترنتی جذاب برای تجهیزات کمپینگ، کوهنوردی و سفر است. چیدمان صفحات طوری انجام شده که مشتریان به راحتی وسایل مورد نیاز خود را پیدا کرده و سفارششان را ثبت کنند."
  },
  {
    id: 3,
    title: "پنتر",
    category: "ecommerce",
    categoryLabel: "فروشگاه آنلاین پوشاک و مد",
    year: "۱۴۰۴",
    cover: "assets/projects/project-03/cover.webp",
    type: "website",
    featured: false,
    specs: {
      type: "فروشگاه اینترنتی لباس و مزون",
      duration: "۴ هفته",
      techs: ["طراحی لوکس", "نمایش عالی تصاویر", "بارگذاری سریع"],
      metrics: [
        { label: "طراحی مینیمال", value: "عالی" },
        { label: "سرعت باز شدن صفحات", value: "زیر ۱ ثانیه" },
        { label: "رضایت مشتریان", value: "۹۵٪" }
      ]
    },
    screens: [
      "assets/projects/project-03/cover.webp",
      "assets/projects/project-03/screen-01.webp",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "«پنتر» یک سایت شیک و لوکس برای فروشگاه‌های لباس و مزون‌های پوشاک است. ظاهر مرتب و تیره سایت باعث می‌شود لباس‌ها و جزئیات بافت پارچه به زیبایی به چشم بیایند."
  },
  {
    id: 4,
    title: "تایم‌لند",
    category: "ecommerce",
    categoryLabel: "فروشگاه لوکس ساعت و اکسسوری",
    year: "۱۴۰۴",
    cover: "assets/projects/project-04/1.webp",
    type: "website",
    featured: true,
    specs: {
      type: "فروشگاه اختصاصی ساعت و زیورآلات",
      duration: "۵ هفته",
      techs: ["افکت‌های جذاب", "نمایش تمام‌صفحه", "پشتیبانی کامل"],
      metrics: [
        { label: "جذابیت بصری", value: "+۸۸٪" },
        { label: "نمایش عالی در موبایل", value: "۱۰۰٪" },
        { label: "بخش‌های تعاملی", value: "۲۴+" }
      ]
    },
    screens: [
      "assets/projects/project-04/1.webp",
      "assets/projects/project-04/2.webp",
      "assets/projects/project-04/3.webp"
    ],
    description: "«تایم‌لند» یک فروشگاه فوق‌العاده شیک برای گالری‌های ساعت مچی و اکسسوری‌های خاص است. استفاده از فونت‌های چشم‌نواز و افکت‌های ملایم، احساس حضور در یک مغازه شیک را به مشتری منتقل می‌کند."
  },
  {
    id: 5,
    title: "پت شاپ پت من",
    category: "ecommerce",
    categoryLabel: "فروشگاه آنلاین غذا و لوازم حیوانات خانگی",
    year: "۱۴۰۳",
    cover: "assets/projects/project-05/1.webp",
    type: "website",
    featured: false,
    specs: {
      type: "فروشگاه اینترنتی پت شاپ",
      duration: "۳ هفته",
      techs: ["دسته بندی آسان", "رنگ‌بندی شاداب", "ثبت سریع سفارش"],
      metrics: [
        { label: "زمان خرید مشتری", value: "کاهش ۳۵٪" },
        { label: "رضایت صاحبان پت", value: "۹۸٪" },
        { label: "سهولت در استفاده", value: "عالی" }
      ]
    },
    screens: [
      "assets/projects/project-05/1.webp",
      "assets/projects/project-05/2.webp",
      "assets/projects/project-05/3.jpg"
    ],
    description: "«پت شاپ پت من» یک وب‌سایت شاداب و صمیمی برای خرید غذا و لوازم حیوانات خانگی است. دسته‌بندی‌های واضح گربه، سگ و پرندگان باعث می‌شود خریداران در سریع‌ترین زمان کالای مدنظر را انتخاب کنند."
  },
  {
    id: 6,
    title: "Sayra",
    category: "saas",
    categoryLabel: "سامانه آنلاین رزرو گیم‌نت",
    year: "۱۴۰۴",
    cover: "assets/projects/sayra/ps-1.webp",
    type: "saas",
    featured: false,
    specs: {
      type: "سامانه رزرو و مدیریت سیستم‌های گیم‌نت",
      duration: "۹ هفته",
      techs: ["رزرو لحظه‌ای", "پنل مدیریت", "اعلان پیامکی"],
      metrics: [
        { label: "سرعت ثبت رزرو", value: "زیر ۱ ثانیه" },
        { label: "تست عملکرد", value: "موفق" },
        { label: "جلوگیری از تداخل رزرو", value: "۱۰۰٪" }
      ]
    },
    screens: [
      "assets/projects/sayra/ps-1.webp",
      "assets/projects/sayra/ps-2.webp",
      "assets/projects/sayra/ps-3.webp",
      "assets/projects/sayra/ps-4.webp"
    ],
    description: "«سایرا» یک برنامه آنلاین کاربردی برای رزرو سیستم‌ها و کنسول‌های گیم‌نت است. این سیستم به مالکان گیم‌نت اجازه می‌دهد سیستم‌ها را مدیریت کنند و بازیکنان بدون معطلی و تداخل، زمان بازی خود را آنلاین رزرو کنند."
  }
];

// Global state for Blog Posts
const blogPosts = [
  {
    id: 1,
    slug: "طراحی-فروشگاه-اینترنتی-با-نرخ-تبدیل-بالا",
    title: "چطور یک فروشگاه اینترنتی با نرخ تبدیل بالا طراحی کنیم؟",
    category: "طراحی محصول",
    date: "۱۴۰۴/۱۱/۲۰",
    readTime: "۶ دقیقه",
    image: "assets/projects/project-02/cover.webp",
    excerpt: "راهنمای عملی و مهندسی‌شده برای بهینه‌سازی تجربه خرید کاربر، کاهش نرخ انصراف از سبد خرید و افزایش فروش کل.",
    author: {
      name: "امیرحسین رضایی",
      role: "طراح ارشد محصول در دپیکس",
      avatar: "assets/brand/favicon.png"
    },
    content: {
      intro: "موفقیت یک فروشگاه آنلاین تنها به داشتن محصولات باکیفیت خلاصه نمی‌شود؛ نحوه ارائه محصول، سرعت بارگذاری، سادگی فرآیند پرداخت و هدایت ذهنی کاربر نقش بسیار تعیین‌کننده‌ای در نرخ تبدیل (Conversion Rate) دارند. در این مقاله به بررسی کلیدی‌ترین فاکتورهای طراحی یک E-Commerce مدرن می‌پردازیم.",
      sections: [
        {
          title: "۱. اصول Show - Label - Explain در نمایش محصولات",
          text: "کاربران در نگاه اول به دنبال تصویر روشن از محصول هستند. با رعایت سه اصل زیر، تصمیم‌گیری خریدار را تا ۵۰٪ سریع‌تر می‌کنید:",
          list: [
            "Show: تصویر فوق‌العاده باکیفیت و شفاف محصول بدون شلوغی‌های غیرضروری background.",
            "Label: نشان دادن صریح ویژگی‌های کلیدی مانند سایز، رنگ، موجودی و قیمت.",
            "Explain: توضیحات روان، کوتاه و شفاف درباره ارزش محصول و نحوه کاربرد آن."
          ]
        },
        {
          title: "۲. مقایسه متدولوژی‌های طراحی سبد خرید",
          text: "طراحی مسیر پرداخت (Checkout Flow) یکی از حساس‌ترین بخش‌های دیزاین فروشگاهی است. جدول زیر مقایسه‌ای بین الگوی یک‌مرحله‌ای (Single-Step) و چندمرحله‌ای (Multi-Step) ارائه می‌دهد:",
          table: {
            headers: ["شاخص", "پرداخت یک‌مرحله‌ای (Single-Step)", "پرداخت چندمرحله‌ای (Multi-Step)"],
            rows: [
              ["سرعت تکمیل خرید", "فوق‌العاده سریع (زیر ۴۵ ثانیه)", "متوسط (۱ الی ۲ دقیقه)"],
              ["میزان تمرکز کاربر", "بالا (عدم خروج از صفحه)", "امکان ریزش در مراحل میان‌بر"],
              ["مناسب برای", "محصولات تک و خریدهای سریع", "فروشگاه‌های جامع با اطلاعات ارسال پیچیده"],
              ["نرخ تبدیل میانگین", "۲۸٪ بالاتر", "پایدار و استاندارد"]
            ]
          }
        },
        {
          image: "assets/projects/project-01/3.jpg",
          caption: "نمونه‌ای از چیدمان مینیمال و کاربرمحور صفحه محصول در طراحی مدرن"
        },
        {
          title: "۳. ساده‌سازی فرآیند تسویه‌حساب (Seamless Checkout)",
          text: "حذف فرم‌های طولانی و اجبار به ثبت‌نام قبل از مشاهده سبد خرید، دو عامل اصلی انصراف خریداران است. امکان «خرید به عنوان مهمان» و ورود با شماره همراه (OTP) نرخ تکمیل سفارش را به طور چشمگیری افزایش می‌دهد.",
          quote: "هر کلیک اضافی در مسیر تسویه‌حساب، احتمال انصراف مشتری را تا ۱۰ درصد افزایش می‌دهد."
        },
        {
          title: "۴. چک‌لیست نهایی برای بهینه‌سازی فروشگاه",
          list: [
            "بهینه‌سازی سرعت بارگذاری تصاویر به زیر ۱.۵ ثانیه با فرمت WebP.",
            "دسترسی‌پذیری کامل دکمه افزودن به سبد خرید در تمام نمایشگرهای موبایل.",
            "نمایش شفاف هزینه‌های ارسال و مالیات پیش از وارد کردن اطلاعات کارت.",
            "ارائه پشتیبانی زنده و پاسخ به پرسش‌های متداول خریداران در صفحه محصول."
          ]
        }
      ]
    }
  },
  {
    id: 2,
    slug: "از-اتودهای-اولیه-فیگما-تا-خروجی-دموی-واقعی",
    title: "از اتودهای اولیه فیگما تا خروجی دموی واقعی وب‌سایت",
    category: "توسعه محصول",
    date: "۱۴۰۴/۱۱/۱۲",
    readTime: "۷ دقیقه",
    image: "assets/projects/project-03/cover.webp",
    excerpt: "چگونه فاصله بین طراحان UI/UX و فرانت‌اند کاران را پر کنیم تا خروجی نهایی ۱۰۰٪ با طرح اولیه مطابقت داشته باشد.",
    author: {
      name: "سارا محمدی",
      role: "مدیر فنی فرانت‌اند",
      avatar: "assets/brand/favicon.png"
    },
    content: {
      intro: "بزرگ‌ترین چالش در توسعه محصولات دیجیتال، تفاوت میان آنچه در فیگما (Figma) دیزاین می‌شود و آنچه در کد نهایی پیاده‌سازی می‌گردد است. در دپیکس، ما با اتخاذ دیزاین سیستم‌های دقیق و استانداردهای یکسان کدنوسی، این فاصله را به صفر رسانده‌ایم.",
      sections: [
        {
          title: "۱. تعریف Design Tokens و همگام‌سازی با Tailwind CSS",
          text: "به جای استفاده از مقادیر هاردکد شده رنگ و فاصله، از متغیرهای سیستماتیک (Tokens) استفاده می‌کنیم. این کار باعث جابه‌جایی بی‌نقص بین تم تاریک و روشن و حفظ یکپارچگی خطوط می‌شود.",
          list: [
            "تعریف دقیق پالت رنگی (Primary, Muted, Border, Background).",
            "استفاده از گرید سیستم متناسب با Breakpointهای استاندار استاندارد.",
            "تنظیم تایپوگرافی بومی (پیمانه‌بندی فونت پیدا در فونت‌های فارسی)."
          ]
        },
        {
          title: "۲. مقایسه ابزارهای پیاده‌سازی تعاملات بصری",
          table: {
            headers: ["ویژگی / ابزار", "CSS Transitions & Keyframes", "GSAP ScrollTrigger"],
            rows: [
              ["پیچیدگی انیمیشن", "ساده تا متوسط", "پیشرفته و چند مرحله‌ای"],
              ["ارتباط با اسکرول", "محدود به Sticky", "کنترل دقیق Scrubbing & Pinning"],
              ["عملکرد و کارایی", "بسیار سبک و سخت‌افزاری", "بهینه‌سازی شده با RequestAnimationFrame"],
              ["کاربرد اصلی", "میکرو-اینتراکشن‌ها و Hover", "استوری‌تلینگ و معرفی محصولات"]
            ]
          }
        },
        {
          image: "assets/projects/project-03/screen-01.webp",
          caption: "تطابق کامل ساختار گرید کدهای فرانت‌اند با لایه‌های فیگما"
        },
        {
          title: "۳. چک‌لیست تحویل طرح از دیزاین به کد (Handoff)",
          text: "طراحان باید پیش از تحویل فایل، تمامی حالات دکمه‌ها (Default, Hover, Active, Disabled)، صفحات خطا و responsive سایزهای مختلف را آماده کنند.",
          quote: "یک دیزاین سیستم قوی، زبان مشترک طراح و برنامه‌نویس است؛ نه صرفاً مجموعه‌ای از رنگ‌ها."
        }
      ]
    }
  },
  {
    id: 3,
    slug: "اهمیت-show-label-explain-در-طراحی-پورتفولیو",
    title: "اهمیت Show-Label-Explain در طراحی پورتفولیوها و صفحات فروشگاهی",
    category: "رابط کاربری UI/UX",
    date: "۱۴۰۴/۱۱/۰۵",
    readTime: "۵ دقیقه",
    image: "assets/projects/project-01/cover.webp",
    excerpt: "چرا رویکرد بصری‌محور و نمایش بزرگ محصولات همراه با برچسب‌های ملموس، سریع‌ترین راه جذب اعتماد کاربر است.",
    author: {
      name: "امیرحسین رضایی",
      role: "طراح ارشد محصول در دپیکس",
      avatar: "assets/brand/favicon.png"
    },
    content: {
      intro: "در دنیای امروز که زمان توجه (Attention Span) کاربران به چند ثانیه کاهش یافته است، متن‌های طولانی بدون تصویرسازی شفاف اثرگذاری خود را از دست داده‌اند. فلسفه Show-Label-Explain راهکاری نوین برای ارائه محصولات است.",
      sections: [
        {
          title: "۱. بررسی سه رکن اصلی معماری اطلاعات بصری",
          text: "این سه‌گانه بصری تضمین می‌کند که مخاطب در اولین نگاه، جوهره اصلی محصول شما را درک کند:",
          list: [
            "Show (نمایش): استفاده از کارت‌های بزرگ، اسکرین‌شات‌های واقعی و گیف‌های تعاملی.",
            "Label (برچسب): عنوان‌های کوتاه و ملموس شامل شاخص‌های عددی و دسته پروژه.",
            "Explain (توضیح): متون مختصر در دو الی سه جمله که ارزش خلق‌شده را تشریح می‌کنند."
          ]
        },
        {
          title: "۲. مقایسه تاثیر این رویکرد در تعامل کاربران",
          table: {
            headers: ["معیار سنحش", "طراحی متن‌محور سنتی", "طراحی به سبک Show-Label-Explain"],
            rows: [
              ["زمان ماندگاری کاربر در صفحه", "کوتاه (زیر ۳۰ ثانیه)", "طولانی (بیش از ۲ دقیقه)"],
              ["درک ویژگی‌های کلیدی", "نیازمند مطالعه متن", "فوری و در یک نگاه"],
              ["نرخ کلیک روی پروژه‌ها", "متوسط", "افزایش ۴۵ درصدی"]
            ]
          }
        },
        {
          image: "assets/projects/project-04/1.webp",
          caption: "نمونه‌ای از اجرای رویکرد بصری‌محور در معرفی محصولات لوکس"
        },
        {
          title: "۳. نتیجه‌گیری و جمع‌بندی",
          text: "استفاده از این ساختار بصری نه تنها در پورتفولیوها، بلکه در صفحات Landing Page محصولات SaaS و فروشگاه‌های مدرن بهترین بازخورد را خلق می‌کند.",
          quote: "تصاویر باکیفیت صحبت می‌کنند، برچسب‌ها مسیر را نشان می‌دهند و توضیحات اعتماد می‌سازند."
        }
      ]
    }
  }
];

// Centralized contact data object containing real/placeholder values
const consultationConfig = {
  phone: {
    label: "تماس تلفنی",
    value: "۰۹۳۹۶۸۲۱۴۳۵",
    href: "tel:+989396821435",
    icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 011.94.571l-1.057 4.96a1 1 0 01-.908.741H5V5zm16 14a2 2 0 01-2-2v-2.328a1 1 0 01.741-.908l4.96-1.057a1 1 0 011.05-.54V19h-3.28a1 1 0 01-.571-.194z" /></svg>`
  },
  telegram: {
    label: "تلگرام",
    value: "۰۹۳۹۶۸۲۱۴۳۵",
    href: "https://t.me/989396821435",
    icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.89 1.19-5.34 3.52-.5.35-.96.52-1.37.51-.45-.01-1.32-.26-1.97-.47-.79-.26-1.42-.4-1.37-.85.03-.23.35-.47.96-.72 3.76-1.63 6.27-2.71 7.53-3.23 3.58-1.48 4.32-1.74 4.81-1.75.11 0 .35.03.5.16.13.11.17.26.19.37-.02.08-.01.23-.02.27z"/></svg>`
  },
  whatsapp: {
    label: "واتس‌اپ",
    value: "۰۹۳۹۶۸۲۱۴۳۵",
    href: "https://wa.me/989396821435",
    icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.908.533 3.69 1.46 5.215L2.03 21.97l4.89-.1.01-.01c1.512.87 3.255 1.36 5.074 1.36 5.524 0 10.004-4.48 10.004-10.004S17.528 2 12.004 2zm0 18.008c-1.633 0-3.21-.444-4.577-1.28l-.33-.2-.294.02-3.15.064.67-3.116-.16-.27a7.94 7.94 0 01-1.11-4.22c0-4.413 3.591-8.004 8.004-8.004 4.412 0 8.003 3.59 8.003 8.004s-3.59 8.004-8.003 8.004z"/></svg>`
  },
  instagram1: {
    label: "اینستاگرام اصلی",
    value: "depix.ir@",
    href: "https://instagram.com/depix.ir",
    icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`
  },
  instagram2: {
    label: "پشتیبانی اینستاگرام",
    value: "depix.support@",
    href: "https://instagram.com/depix.support",
    icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`
  },
  githubFrontend: {
    label: "گیت‌هاب فرانت‌اند",
    value: "moazzen3169",
    href: "https://github.com/moazzen3169",
    icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.63.07-.62.07-.63 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.42 1.08 3 1 .09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>`
  },
  githubBackend: {
    label: "گیت‌هاب بک‌اند",
    value: "amirhossein-moloki",
    href: "https://github.com/amirhossein-moloki",
    icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.63.07-.62.07-.63 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.42 1.08 3 1 .09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>`
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initPortfolioGrid();
  initStartupStory();
  initCooperationModal();
  initBlogGrid();
  initAccordion();
  initContactForm();
  initScrollAnimations();
  initProjectDetailPage(); // Check if we are on project.html
  initBlogDetailPage(); // Check if we are on blog-detail.html
  initConsultationExperience(); // Initialize persistent floating CTA and overlay
});

/**
 * 1. Theme Management (Dark / Light Mode)
 */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const getSavedTheme = () => {
    return localStorage.getItem('theme') || 'dark';
  };

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
    localStorage.setItem('theme', theme);
    updateToggleIcons(theme);
  };

  const updateToggleIcons = (theme) => {
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');

    if (theme === 'light') {
      sunIcon?.classList.add('hidden');
      moonIcon?.classList.remove('hidden');
    } else {
      sunIcon?.classList.remove('hidden');
      moonIcon?.classList.add('hidden');
    }
  };

  // Initial setup
  const currentTheme = getSavedTheme();
  applyTheme(currentTheme);

  // Toggle Action
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.classList.contains('light') ? 'dark' : 'light';
    applyTheme(nextTheme);
  });
}

/**
 * 2. Sticky Navigation & Mobile Menu (ARIA Friendly)
 */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!navbar) return;

  // Sticky Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('glass', 'border-b', 'border-border-subtle', 'shadow-sm');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('glass', 'border-b', 'border-border-subtle', 'shadow-sm');
      navbar.classList.add('bg-transparent');
    }
  });

  // Mobile Menu Toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);

      if (!isExpanded) {
        mobileMenu.classList.remove('hidden');
        // Simple slide-in animation trigger
        setTimeout(() => {
          mobileMenu.classList.remove('opacity-0', '-translate-y-4');
        }, 10);
      } else {
        mobileMenu.classList.add('opacity-0', '-translate-y-4');
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
        }, 200);
      }
    });

    // Close menu when clicking links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.add('opacity-0', '-translate-y-4');
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
        }, 200);
      });
    });
  }
}

/**
 * 3.5. Interactive Startup Story logic (GSAP Pinned Scroll Implementation)
 */
function initStartupStory() {
  const section = document.getElementById('startup-story');
  if (!section) return;

  // If the section is hidden (e.g. on mobile/tablet viewports), bypass initialization completely
  if (window.getComputedStyle(section).display === 'none') {
    return;
  }

  // 1. Preload story images
  const imagesToPreload = [
    "assets/projects/sayra/ps-0.webp",
    "assets/projects/sayra/ps-1.webp",
    "assets/projects/sayra/ps-2.webp",
    "assets/projects/sayra/ps-3.webp",
    "assets/projects/sayra/ps-4.webp"
  ];
  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // Query DOM elements
  const images = section.querySelectorAll('[data-story-image]');
  const desktopButtons = section.querySelectorAll('[data-story-step]');
  const mobileButtons = section.querySelectorAll('[data-story-step-mob]');
  const introBlock = document.getElementById('story-intro-block');
  const microLabel = document.getElementById('story-micro-label');
  const microStep = document.getElementById('story-micro-step');
  const microStepNum = document.getElementById('micro-step-num');
  const desktopHud = document.getElementById('story-desktop-hud');
  const mobileHud = document.getElementById('story-mobile-hud');
  const ctaOverlay = document.getElementById('product-cta-overlay');
  const desktopProgressFill = document.getElementById('story-desktop-progress-fill');

  // Step information
    const stepsData = {
    1: { num: "۰۱", title: "۱. شناخت نیاز و مسئله", desc: "بررسی دقیق مشکلات افراد برای رزرو آنلاین سیستم‌های گیم‌نت بدون اتلاف وقت." },
    2: { num: "۰۲", title: "۲. برنامه‌ریزی و ایده‌پردازی", desc: "طراحی یک مسیر ساده و سریع برای رزرو فوری سیستم‌ها و کنسول‌های بازی." },
    3: { num: "۰۳", title: "۳. طراحی ظاهر و منوها", desc: "ساخت ظاهری جذاب و آسان برای بازیکنان و پنل مدیریت راحت برای صاحبان گیم‌نت." },
    4: { num: "۰۴", title: "۴. ساخت و کدنویسی سریع", desc: "برنامه‌نویسی بدون نقص به طوری که تمام رزروها بلافاصله و بدون معطلی ثبت شوند." },
    5: { num: "۰۵", title: "۵. تحویل کامل و راه‌اندازی", desc: "راه‌اندازی کامل سامانه سایرا و ارائه خدمات عالی به کاربران و گیمرها." }
  };

  // Check reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Active stage updater
  const updateActiveUI = (stageNum) => {
    const persianNum = stepsData[stageNum].num;

    // Update micro step number
    if (microStepNum) microStepNum.textContent = persianNum;

    // Update Desktop list styles
    desktopButtons.forEach(btn => {
      const step = parseInt(btn.getAttribute('data-story-step'), 10);
      if (step === stageNum) {
        btn.classList.add('active');
        gsap.to(btn, { opacity: 1, duration: 0.3 });
      } else {
        btn.classList.remove('active');
        gsap.to(btn, { opacity: 0.4, duration: 0.3 });
      }
    });

    // Update Mobile text & buttons styling
    if (mobileHud) {
      const mobStepNum = document.getElementById('mobile-step-num');
      const mobStepTitle = document.getElementById('mobile-step-title');
      const mobStepDesc = document.getElementById('mobile-step-desc');
      const mobileTextContainer = document.getElementById('mobile-text-container');
      const mobileHudCta = document.getElementById('mobile-hud-cta');

      // Check if text has changed to prevent flashing
      if (mobStepTitle && mobStepTitle.textContent !== stepsData[stageNum].title) {
        // Micro transitions for mobile text swap
        gsap.killTweensOf(mobileTextContainer);
        gsap.fromTo(mobileTextContainer,
          { opacity: 0.4, y: 5 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );

        if (mobStepNum) mobStepNum.textContent = `مرحله ${persianNum}`;
        if (mobStepTitle) mobStepTitle.textContent = stepsData[stageNum].title;
        if (mobStepDesc) mobStepDesc.textContent = stepsData[stageNum].desc;
      }

      // Show/Hide integrated mobile HUD CTA in Step 5
      if (mobileHudCta) {
        if (stageNum === 5) {
          mobileHudCta.classList.remove('hidden');
          gsap.fromTo(mobileHudCta, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
        } else {
          mobileHudCta.classList.add('hidden');
        }
      }

      mobileButtons.forEach(btn => {
        const step = parseInt(btn.getAttribute('data-story-step-mob'), 10);
        if (step === stageNum) {
          btn.className = "w-9 h-9 rounded-full border-2 border-primary-accent bg-primary-accent/10 text-white flex items-center justify-center text-xs font-black transition-all cursor-pointer";
        } else if (step < stageNum) {
          btn.className = "w-9 h-9 rounded-full border-2 border-primary-accent/60 bg-black/40 text-primary-accent flex items-center justify-center text-xs font-black transition-all cursor-pointer";
        } else {
          btn.className = "w-9 h-9 rounded-full border-2 border-white/10 bg-black/40 text-white/50 flex items-center justify-center text-xs font-black transition-all cursor-pointer";
        }
      });

      // Update mobile connector progress fills
      for (let i = 1; i <= 4; i++) {
        const fill = document.getElementById(`mobile-progress-${i}`);
        if (fill) {
          if (i < stageNum) {
            fill.style.width = '100%';
          } else {
            fill.style.width = '0%';
          }
        }
      }
    }
  };

  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Set initial states for elements
  gsap.set([microLabel, microStep], { opacity: 0, y: -10 });
  gsap.set([desktopHud], { opacity: 0, x: 20 });
  gsap.set([mobileHud], { opacity: 0, y: 20 });
  gsap.set(ctaOverlay, { opacity: 0, y: 15 });

  // Pre-set images scales and opacities
  images.forEach(img => {
    const idx = parseInt(img.getAttribute('data-story-image'), 10);
    if (idx === 1) {
      gsap.set(img, { opacity: 1, scale: 1 });
    } else {
      gsap.set(img, { opacity: 0, scale: prefersReduced ? 1 : 1.04 });
    }
  });

  const isMobileViewport = window.innerWidth < 1024;

  // Create GSAP ScrollTrigger timeline with increased delay/scroll-range on mobile
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: isMobileViewport ? "+=5200" : "+=3600",
      scrub: isMobileViewport ? 1.8 : 1.2, // smoother scrub lag for touch-inertia feel
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Track progress to calculate the current active stage
        // Stages: 1 (0 to 0.2), 2 (0.2 to 0.4), 3 (0.4 to 0.6), 4 (0.6 to 0.8), 5 (0.8 to 1.0)
        const prog = self.progress;
        let activeStage = 1;
        if (prog >= 0.2 && prog < 0.4) activeStage = 2;
        else if (prog >= 0.4 && prog < 0.6) activeStage = 3;
        else if (prog >= 0.6 && prog < 0.8) activeStage = 4;
        else if (prog >= 0.8) activeStage = 5;

        updateActiveUI(activeStage);

        // Update Desktop Progress Fill Line height
        if (desktopProgressFill) {
          desktopProgressFill.style.transform = `scaleY(${prog})`;
        }
      }
    }
  });

  // Build the timeline animations step by step

  // 1. Scroll starts: Fade out intro-block & fade in HUDs
  tl.to(introBlock, {
    opacity: 0,
    scale: prefersReduced ? 1 : 0.95,
    y: prefersReduced ? 0 : -30,
    duration: 0.5
  }, 0);

  // Expand image-container slightly
  images.forEach(img => {
    const idx = parseInt(img.getAttribute('data-story-image'), 10);
    if (idx === 1) {
      if (!prefersReduced) {
        tl.to(img, { scale: 1.01, duration: 0.5 }, 0);
      }
    }
  });

  // Fade in HUD Overlays & Micro labels
  tl.to([microLabel, microStep], {
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 0.4
  }, 0.2);

  tl.to([desktopHud, mobileHud], {
    opacity: 1,
    x: 0,
    y: 0,
    duration: 0.5
  }, 0.3);

  // Define crossfade helpers for stage transitions on timeline
  const addCrossfade = (fromIdx, toIdx, startTime) => {
    const fromImg = section.querySelector(`[data-story-image="${fromIdx}"]`);
    const toImg = section.querySelector(`[data-story-image="${toIdx}"]`);

    if (fromImg && toImg) {
      // Fade out fromImg
      tl.to(fromImg, {
        opacity: 0,
        scale: prefersReduced ? 1 : 1.04,
        duration: 0.6
      }, startTime);

      // Fade in toImg
      tl.to(toImg, {
        opacity: 1,
        scale: 1,
        duration: 0.6
      }, startTime);
    }
  };

  // Transition Stage 1 -> Stage 2
  addCrossfade(1, 2, 0.6);

  // Transition Stage 2 -> Stage 3
  addCrossfade(2, 3, 1.2);

  // Transition Stage 3 -> Stage 4
  addCrossfade(3, 4, 1.8);

  // Transition Stage 4 -> Stage 5
  addCrossfade(4, 5, 2.4);

  // CTA Overlay appears at Stage 5
  tl.to(ctaOverlay, {
    opacity: 1,
    y: 0,
    duration: 0.4
  }, 2.6);

  // Extra padding time at the end to let product stage stay a bit
  tl.to({}, { duration: 0.4 });

  // Handle Button Clicks (both desktop and mobile) for direct smooth navigation
  const setupNavClicks = (buttons, isMobile) => {
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const stepAttr = isMobile ? 'data-story-step-mob' : 'data-story-step';
        const targetStep = parseInt(btn.getAttribute(stepAttr), 10);

        // Map target steps to accurate timeline progress points
        const stepProgressMap = {
          1: 0.05,
          2: 0.30,
          3: 0.50,
          4: 0.70,
          5: 0.95
        };

        const targetProgress = stepProgressMap[targetStep];
        const scrollTriggerInstance = tl.scrollTrigger;

        if (scrollTriggerInstance) {
          const start = scrollTriggerInstance.start;
          const end = scrollTriggerInstance.end;
          const targetScroll = start + (end - start) * targetProgress;

          gsap.to(window, {
            scrollTo: { y: targetScroll, autoKill: false },
            duration: 1.2,
            ease: "power2.out"
          });
        }
      });
    });
  };

  setupNavClicks(desktopButtons, false);
  setupNavClicks(mobileButtons, true);

  // Initial trigger refresh to sync layouts
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
}

/**
 * 3.5b. Cooperation/Contact Modal Handling
 */
function initCooperationModal() {
  const modal = document.getElementById('cooperation-modal');
  const openBtn = document.getElementById('open-cooperation-modal-btn');
  const closeBtn = document.getElementById('cooperation-modal-close');

  if (!modal || !openBtn) return;

  const openModal = () => {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Lock background scroll
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modal.querySelector('.modal-content').classList.remove('scale-95', 'opacity-0');
    }, 10);
  };

  const closeModal = () => {
    modal.classList.add('opacity-0');
    modal.querySelector('.modal-content').classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = ''; // Unlock scroll
    }, 250);
  };

  openBtn.addEventListener('click', openModal);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESC Close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/**
 * 3.6. Dynamic Blog Preview Grid rendering
 */
function initBlogGrid() {
  const container = document.getElementById('blog-grid-container');
  if (!container) return;

  container.innerHTML = '';

  blogPosts.forEach(post => {
    const card = document.createElement('article');
    card.className = `group bg-card-bg border border-border-subtle rounded-2xl overflow-hidden hover:border-primary-accent/40 hover:shadow-2xl transition-all-custom cursor-pointer`;
    card.setAttribute('role', 'article');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `مطالعه مقاله: ${post.title}`);

    card.innerHTML = `
      <div class="relative aspect-[16/10] overflow-hidden bg-muted-bg/50">
        <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" loading="lazy">

        <!-- Subtle Overlay on Hover -->
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span class="px-5 py-2.5 rounded-full bg-white text-black font-bold text-sm shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <span>مطالعه مقاله</span>
            <svg class="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </span>
        </div>
      </div>

      <div class="p-6 text-right space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-xs text-primary-accent font-bold">${post.category}</span>
          <span class="text-xs text-muted-fg font-medium">${post.readTime} مطالعه</span>
        </div>

        <h3 class="text-base sm:text-lg font-bold text-fg-main group-hover:text-primary-accent transition-colors duration-200 line-clamp-2 leading-snug">
          ${post.title}
        </h3>

        <div class="flex items-center justify-between pt-2 border-t border-border-subtle/30 text-xs text-muted-fg">
          <span>${post.date}</span>
          <div class="flex items-center gap-1 text-primary-accent font-bold group-hover:gap-2 transition-all">
            <span>ادامه مطلب</span>
            <span class="transform rotate-180">←</span>
          </div>
        </div>
      </div>
    `;

    // Click triggers
    const readArticle = () => {
      window.location.href = `blog-detail.html?slug=${encodeURIComponent(post.slug)}`;
    };

    card.addEventListener('click', readArticle);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        readArticle();
      }
    });

    container.appendChild(card);
  });
}

/**
 * 3. Dynamic Visual Portfolio Grid & Custom Filtering
 */
function initPortfolioGrid() {
  const container = document.getElementById('portfolio-grid-container');
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');

  if (!container) return;

  // Render function to draw Dribbble-inspired grid
  const renderProjects = (filterType = 'all') => {
    container.innerHTML = '';

    const filtered = projects.filter(p => filterType === 'all' || p.category === filterType);

    filtered.forEach(p => {
      // featured card logic - desktop spans 2 columns
      const spanClass = p.featured ? 'md:col-span-2' : 'col-span-1';

      const card = document.createElement('article');
      card.className = `${spanClass} project-card group relative flex flex-col bg-card-bg border border-border-subtle rounded-2xl overflow-hidden hover:border-primary-accent/40 hover:shadow-2xl transition-all-custom cursor-pointer`;
      card.setAttribute('data-id', p.id);
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `مشاهده پروژه ${p.title}`);

      card.innerHTML = `
        <div class="project-media relative aspect-[16/10] overflow-hidden bg-muted-bg/50">
          <img src="${p.cover}" alt="${p.title}" class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" loading="lazy">

          <!-- Subtle Premium Hover Overlay -->
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span class="px-5 py-2.5 rounded-full bg-white text-black font-bold text-sm shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <span>مشاهده پروژه</span>
              <svg class="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </span>
          </div>
        </div>

        <div class="project-meta p-5 flex items-center justify-between border-t border-border-subtle/50">
          <div class="space-y-1 text-right">
            <h3 class="text-base font-bold text-fg-main group-hover:text-primary-accent transition-colors duration-200">${p.title}</h3>
            <span class="text-xs text-muted-fg font-medium">${p.categoryLabel}</span>
          </div>
          <div class="w-8 h-8 rounded-full border border-border-subtle bg-muted-bg group-hover:border-primary-accent group-hover:bg-primary-accent/10 flex items-center justify-center text-muted-fg group-hover:text-primary-accent transition-all duration-300">
            <svg class="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      `;

      // Click / Keyboard Key navigates directly to the project detail page
      const navigateToProject = () => {
        window.location.href = `project.html?id=${p.id}`;
      };
      card.addEventListener('click', navigateToProject);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigateToProject();
        }
      });

      container.appendChild(card);
    });
  };

  // Setup click triggers on segment filter bar
  if (filterBtns) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('bg-primary-accent', 'text-white', 'border-primary-accent');
          b.classList.add('bg-muted-bg', 'text-muted-fg', 'border-border-subtle');
        });
        btn.classList.add('bg-primary-accent', 'text-white', 'border-primary-accent');
        btn.classList.remove('bg-muted-bg', 'text-muted-fg', 'border-border-subtle');

        const category = btn.getAttribute('data-filter');
        renderProjects(category);
      });
    });
  }

  // Initial render
  renderProjects();
}

/**
 * Helper to setup carousel slider logic in dynamic HTML
 */
function setupCarouselLogic(containerId, screens) {
  let currentSlide = 0;
  const totalSlides = screens.length;
  const slidesContainer = document.getElementById(`${containerId}-slides`);
  const dots = document.querySelectorAll(`.${containerId}-dot`);
  const prevBtn = document.getElementById(`${containerId}-slide-prev`);
  const nextBtn = document.getElementById(`${containerId}-slide-next`);

  if (!slidesContainer) return;

  const updateCarousel = (index) => {
    currentSlide = (index + totalSlides) % totalSlides;
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('bg-white', 'w-4');
        dot.classList.remove('bg-white/40');
      } else {
        dot.classList.remove('bg-white', 'w-4');
        dot.classList.add('bg-white/40');
      }
    });
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateCarousel(currentSlide - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateCarousel(currentSlide + 1);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      updateCarousel(idx);
    });
  });

  // Initial setup
  updateCarousel(0);
}

/**
 * 4. Dynamic Case Study modal & Lightbox implementation
 */
function openCaseStudy(id) {
  const project = projects.find(p => p.id === Number(id));
  if (!project) return;

  // Build the visual-first Case Study Modal
  let csModal = document.getElementById('case-study-modal');
  if (!csModal) {
    csModal = document.createElement('div');
    csModal.id = 'case-study-modal';
    csModal.className = 'fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md opacity-0 transition-opacity duration-300 flex justify-center p-4 sm:p-6';
    csModal.setAttribute('role', 'dialog');
    csModal.setAttribute('aria-modal', 'true');
    document.body.appendChild(csModal);
  }

  // Generate Metric Cards dynamically
  let metricsHTML = '';
  if (project.specs && project.specs.metrics) {
    project.specs.metrics.forEach(m => {
      metricsHTML += `
        <div class="bg-card-bg border border-border-subtle rounded-xl p-5 text-center">
          <p class="text-3xl font-extrabold text-primary-accent tracking-tight">${m.value}</p>
          <p class="text-xs text-muted-fg font-medium mt-1">${m.label}</p>
        </div>
      `;
    });
  }

  // Generate Tech Tags
  let techsHTML = '';
  if (project.specs && project.specs.techs) {
    project.specs.techs.forEach(t => {
      techsHTML += `
        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-muted-bg text-muted-fg border border-border-subtle">${t}</span>
      `;
    });
  }

  // Elegant LTR slider for multiple images
  const sliderHTML = `
    <div class="relative w-full overflow-hidden rounded-xl border border-border-subtle bg-muted-bg/30 aspect-[16/10]" dir="ltr">
      <!-- Slides Container -->
      <div id="cs-modal-carousel-slides" class="flex transition-transform duration-500 ease-out h-full" style="transform: translateX(0%);">
        ${project.screens.map((scr, idx) => `
          <div class="w-full flex-shrink-0 h-full relative group cursor-zoom-in">
            <img src="${scr}" alt="${project.title} - تصویر ${idx + 1}" class="w-full h-full object-cover select-none" loading="lazy">
            <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
              <span class="p-3 rounded-full bg-white/20 backdrop-blur text-white">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </span>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Slider Controls -->
      ${project.screens.length > 1 ? `
        <button id="cs-modal-carousel-slide-prev" class="absolute top-1/2 left-4 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all cursor-pointer z-10" aria-label="تصویر قبلی">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button id="cs-modal-carousel-slide-next" class="absolute top-1/2 right-4 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all cursor-pointer z-10" aria-label="تصویر بعدی">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Indicators -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          ${project.screens.map((_, idx) => `
            <button class="cs-modal-carousel-dot w-2 h-2 rounded-full bg-white/40 hover:bg-white transition-all cursor-pointer" data-index="${idx}"></button>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;

  csModal.innerHTML = `
    <div class="case-study-content w-full max-w-4xl bg-background border border-border-subtle rounded-2xl overflow-hidden shadow-2xl scale-95 opacity-0 transition-all duration-300 flex flex-col h-fit">

      <!-- Top header bar -->
      <div class="flex items-center justify-between px-6 py-4 bg-muted-bg border-b border-border-subtle sticky top-0 z-10 backdrop-blur-md bg-opacity-80">
        <div class="space-y-0.5 text-right">
          <h2 class="text-lg font-black text-fg-main">${project.title}</h2>
          <span class="text-xs text-primary-accent font-semibold">${project.categoryLabel}</span>
        </div>
        <button id="cs-modal-close" class="p-2 text-muted-fg hover:text-fg-main rounded-lg border border-border-subtle/50 hover:bg-muted-bg cursor-pointer" aria-label="بستن پنجره">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Scrollable content -->
      <div class="p-6 sm:p-8 space-y-12">

        <!-- LTR Carousel for multiple screenshots -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs text-muted-fg">جهت بزرگنمایی روی عکس کلیک کنید</span>
            <span class="text-xs text-primary-accent font-bold">ورق بزنید</span>
          </div>
          ${sliderHTML}
        </div>

        <!-- Case study details & specs -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-right">

          <div class="md:col-span-2 space-y-6">
            <h3 class="text-xl font-bold text-fg-main">درباره پروژه</h3>
            <p class="text-base text-muted-fg leading-relaxed">${project.description}</p>

            <div class="pt-4 space-y-2">
              <h4 class="text-xs font-bold text-muted-fg uppercase tracking-wider">فناوری‌های کلیدی استفاده شده</h4>
              <div class="flex flex-wrap gap-2">
                ${techsHTML}
              </div>
            </div>
          </div>

          <!-- Specs panel -->
          <div class="bg-card-bg border border-border-subtle rounded-xl p-6 space-y-4">
            <div>
              <p class="text-[10px] text-muted-fg font-bold uppercase tracking-wider">نوع پروژه</p>
              <p class="text-sm font-bold text-fg-main mt-1">${project.specs.type}</p>
            </div>
            <div class="border-t border-border-subtle/50 pt-3">
              <p class="text-[10px] text-muted-fg font-bold uppercase tracking-wider">مدت زمان پیاده‌سازی</p>
              <p class="text-sm font-bold text-fg-main mt-1">${project.specs.duration}</p>
            </div>
            <div class="border-t border-border-subtle/50 pt-3">
              <p class="text-[10px] text-muted-fg font-bold uppercase tracking-wider">سال تولید</p>
              <p class="text-sm font-bold text-fg-main mt-1">${project.year}</p>
            </div>
          </div>

        </div>

        <!-- Metrics widgets section -->
        ${metricsHTML ? `
        <div class="space-y-6">
          <h3 class="text-lg font-bold text-right text-fg-main">نتایج و دستاوردهای عددی</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
            ${metricsHTML}
          </div>
        </div>
        ` : ''}

        <!-- Call to action block -->
        <div class="bg-muted-bg/50 border border-border-subtle rounded-2xl p-8 text-center space-y-6">
          <h3 class="text-xl font-black text-fg-main">آیا این پروژه به نیاز شما نزدیک است؟</h3>
          <p class="text-sm text-muted-fg max-w-lg mx-auto">ما مشتاقیم تجربه‌ای مشابه یا حتی فراتر را برای کسب‌وکار شما مهندسی کنیم.</p>
          <div class="flex flex-wrap gap-4 justify-center">
            <a href="project.html?id=${project.id}" class="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold text-white bg-primary-accent hover:bg-accent-hover transition-all-custom shadow-lg shadow-primary-accent/15">
              مشاهده صفحه اختصاصی پروژه
            </a>
            <a href="#contact" id="cs-cta-btn" class="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold text-fg-main bg-card-bg border border-border-subtle hover:bg-muted-bg transition-all">
              دریافت مشاوره رایگان
            </a>
          </div>
        </div>

      </div>

    </div>
  `;

  // Animate Open
  csModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    csModal.classList.remove('opacity-0');
    csModal.querySelector('.case-study-content').classList.remove('scale-95', 'opacity-0');
  }, 10);

  // Setup Carousel Slider
  setupCarouselLogic('cs-modal-carousel', project.screens);

  // Close functionality
  const closeCS = () => {
    csModal.classList.add('opacity-0');
    csModal.querySelector('.case-study-content').classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      csModal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 250);
  };

  csModal.querySelector('#cs-modal-close').addEventListener('click', closeCS);
  csModal.addEventListener('click', (e) => {
    if (e.target === csModal) {
      closeCS();
    }
  });

  // Handle CTA button click to close and go to contact
  const ctaBtn = csModal.querySelector('#cs-cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      closeCS();
    });
  }

  // Setup slide click triggers for premium Lightbox zoom
  const sliderImages = csModal.querySelectorAll('#cs-modal-carousel-slides img');
  sliderImages.forEach((img, idx) => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(project.screens, idx);
    });
  });
}

/**
 * 13. Dedicated Blog Detail Page dynamic renderer (blog-detail.html)
 */
function initBlogDetailPage() {
  const blogContainer = document.getElementById('blog-detail-container');
  if (!blogContainer) return; // We are not on blog-detail.html

  // Parse Persian Slug from Query String
  const params = new URLSearchParams(window.location.search);
  const rawSlug = params.get('slug');
  const decodedSlug = rawSlug ? decodeURIComponent(rawSlug) : null;

  // Find matching blog post by slug (or fallback to first post)
  const post = blogPosts.find(p => p.slug === decodedSlug) || blogPosts[0];

  // Update document title
  document.title = `${post.title} | وبلاگ دپیکس`;

  // Build rendered HTML for post content sections
  let sectionsHTML = '';
  if (post.content && post.content.sections) {
    sectionsHTML = post.content.sections.map(sec => {
      let partHTML = '';

      // Section Title
      if (sec.title) {
        partHTML += `<h2 class="text-xl sm:text-2xl font-black text-fg-main mt-10 mb-4">${sec.title}</h2>`;
      }

      // Paragraph Text
      if (sec.text) {
        partHTML += `<p class="text-base sm:text-lg text-muted-fg leading-relaxed mb-6">${sec.text}</p>`;
      }

      // Bullet List
      if (sec.list && Array.isArray(sec.list)) {
        partHTML += `
          <ul class="space-y-3 mb-8 pr-2">
            ${sec.list.map(item => `
              <li class="flex items-start gap-3 text-base text-fg-main font-medium">
                <span class="w-2 h-2 rounded-full bg-primary-accent mt-2.5 flex-shrink-0"></span>
                <span class="leading-relaxed">${item}</span>
              </li>
            `).join('')}
          </ul>
        `;
      }

      // Table Rendering
      if (sec.table) {
        partHTML += `
          <div class="my-8 overflow-x-auto rounded-2xl border border-border-subtle bg-card-bg shadow-sm">
            <table class="w-full text-right text-sm">
              <thead class="bg-muted-bg/80 border-b border-border-subtle text-fg-main font-extrabold">
                <tr>
                  ${sec.table.headers.map(h => `<th class="px-5 py-4">${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody class="divide-y divide-border-subtle/50 text-muted-fg">
                ${sec.table.rows.map(row => `
                  <tr class="hover:bg-muted-bg/30 transition-colors">
                    ${row.map((cell, idx) => `
                      <td class="px-5 py-4 ${idx === 0 ? 'font-bold text-fg-main' : ''}">${cell}</td>
                    `).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      }

      // Section Image
      if (sec.image) {
        partHTML += `
          <figure class="my-8 space-y-3">
            <div class="overflow-hidden rounded-2xl border border-border-subtle bg-muted-bg/50 aspect-[16/9]">
              <img src="${sec.image}" alt="${sec.caption || post.title}" class="w-full h-full object-cover">
            </div>
            ${sec.caption ? `<figcaption class="text-xs text-center text-muted-fg font-medium">${sec.caption}</figcaption>` : ''}
          </figure>
        `;
      }

      // Quote Block
      if (sec.quote) {
        partHTML += `
          <blockquote class="my-8 p-6 rounded-2xl bg-primary-accent/5 border-r-4 border-primary-accent space-y-2">
            <p class="text-base sm:text-lg font-bold text-fg-main leading-relaxed">« ${sec.quote} »</p>
          </blockquote>
        `;
      }

      return partHTML;
    }).join('');
  }

  // Related Blog Posts (Exclude current, take up to 2)
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 2);
  let relatedHTML = '';
  relatedPosts.forEach(rp => {
    relatedHTML += `
      <div onclick="window.location.href='blog-detail.html?slug=${encodeURIComponent(rp.slug)}'" class="group bg-card-bg border border-border-subtle rounded-2xl overflow-hidden hover:border-primary-accent/40 hover:shadow-xl transition-all duration-300 cursor-pointer">
        <div class="aspect-[16/10] overflow-hidden bg-muted-bg/50">
          <img src="${rp.image}" alt="${rp.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103">
        </div>
        <div class="p-6 text-right space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs text-primary-accent font-bold">${rp.category}</span>
            <span class="text-xs text-muted-fg font-medium">${rp.readTime} مطالعه</span>
          </div>
          <h4 class="text-base font-extrabold text-fg-main group-hover:text-primary-accent transition-colors line-clamp-2">${rp.title}</h4>
        </div>
      </div>
    `;
  });

  // Inject into Blog Detail Container
  blogContainer.innerHTML = `
    <!-- Header & Navigation Breadcrumb -->
    <div class="space-y-6 text-right">
      <nav class="flex items-center gap-2 text-xs font-semibold text-muted-fg">
        <a href="index.html" class="hover:text-primary-accent transition-colors">خانه</a>
        <span>/</span>
        <a href="index.html#blog" class="hover:text-primary-accent transition-colors">وبلاگ</a>
        <span>/</span>
        <span class="text-fg-main truncate max-w-[200px] sm:max-w-none">${post.title}</span>
      </nav>

      <div class="space-y-4">
        <div class="inline-flex items-center gap-3">
          <span class="px-3.5 py-1.5 rounded-full bg-primary-accent/10 border border-primary-accent/20 text-xs font-extrabold text-primary-accent">${post.category}</span>
          <span class="text-xs text-muted-fg font-medium">• ${post.readTime} مطالعه</span>
          <span class="text-xs text-muted-fg font-medium">• ${post.date}</span>
        </div>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-fg-main leading-tight tracking-tight">${post.title}</h1>
        <p class="text-base sm:text-xl text-muted-fg leading-relaxed">${post.excerpt}</p>
      </div>

      <!-- Author Bar -->
      <div class="flex items-center gap-4 py-4 border-y border-border-subtle/60">
        <div class="w-12 h-12 rounded-full border border-border-subtle bg-primary-accent/10 flex items-center justify-center p-1 overflow-hidden">
          <img src="${post.author.avatar}" alt="${post.author.name}" class="w-full h-full object-cover">
        </div>
        <div class="text-right">
          <p class="text-sm font-extrabold text-fg-main">${post.author.name}</p>
          <p class="text-xs text-muted-fg font-medium mt-0.5">${post.author.role}</p>
        </div>
      </div>
    </div>

    <!-- Main Feature Image -->
    <div class="my-10 overflow-hidden rounded-3xl border border-border-subtle bg-muted-bg/50 aspect-[16/9] shadow-xl">
      <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover">
    </div>

    <!-- Article Content -->
    <article class="prose max-w-none text-right space-y-6">
      <p class="text-lg sm:text-xl text-fg-main font-semibold leading-relaxed border-b border-border-subtle/50 pb-8">${post.content.intro}</p>
      ${sectionsHTML}
    </article>

    <!-- Call To Action Box -->
    <div class="mt-16 bg-muted-bg/50 border border-border-subtle rounded-3xl p-8 sm:p-10 text-center space-y-6">
      <h3 class="text-2xl font-black text-fg-main">می‌خواهید ایده‌تان را به یک محصول واقعی تبدیل کنید؟</h3>
      <p class="text-sm sm:text-base text-muted-fg max-w-xl mx-auto leading-relaxed">تیم دپیکس آماده است در تمام مراحل طراحی، توسعه فرانت‌اند و مهندسی سیستم همراه شما باشد.</p>
      <div class="flex justify-center">
        <a href="index.html#contact" class="px-8 py-4 rounded-xl text-sm font-bold text-white bg-primary-accent hover:bg-accent-hover shadow-xl shadow-primary-accent/20 transition-all">
          دریافت مشاوره تخصصی
        </a>
      </div>
    </div>

    <!-- Related Articles Section -->
    ${relatedHTML ? `
    <div class="mt-20 border-t border-border-subtle/60 pt-16 space-y-8 text-right">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl font-black text-fg-main">مقالات مرتبط</h3>
        <a href="index.html#blog" class="text-xs sm:text-sm font-bold text-primary-accent hover:gap-2.5 transition-all flex items-center gap-1.5">
          <span>همه مقالات</span>
          <span class="transform rotate-180">←</span>
        </a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${relatedHTML}
      </div>
    </div>
    ` : ''}
  `;
}

/**
 * 5. Premium Fullscreen Vanilla JS Lightbox (Accessible & RTL Aware)
 */
function openLightbox(urls, startIndex) {
  let currentIndex = startIndex;

  let lb = document.getElementById('lb-overlay');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'lb-overlay';
    lb.className = 'fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 opacity-0 transition-opacity duration-300 select-none';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'نمایش بزرگ تصاویر پروژه');
    document.body.appendChild(lb);
  }

  const renderImage = () => {
    const imgEl = lb.querySelector('#lb-image');
    if (imgEl) {
      imgEl.style.opacity = '0';
      imgEl.style.transform = 'scale(0.98)';
      setTimeout(() => {
        imgEl.src = urls[currentIndex];
        imgEl.style.opacity = '1';
        imgEl.style.transform = 'scale(1)';
      }, 150);
    }
  };

  lb.innerHTML = `
    <!-- Top toolbar -->
    <div class="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 to-transparent z-10">
      <span class="text-sm font-bold text-gray-400">تصویر ${currentIndex + 1} از ${urls.length}</span>
      <button id="lb-close" class="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors" aria-label="بستن گالری">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Center layout with responsive navigation buttons -->
    <div class="flex-1 flex items-center justify-between px-4 sm:px-12 relative">

      <!-- Prev Button -->
      <button id="lb-prev" class="p-3 sm:p-4 rounded-full bg-white/5 hover:bg-white/15 text-white cursor-pointer transition-all hover:scale-105 z-10" aria-label="تصویر قبلی">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Center Image display container -->
      <div class="absolute inset-0 flex items-center justify-center p-4">
        <img id="lb-image" src="${urls[currentIndex]}" alt="بزرگنمایی تصویر" class="max-w-full max-h-[75vh] sm:max-h-[80vh] object-contain rounded-lg transition-all duration-300 ease-out shadow-2xl">
      </div>

      <!-- Next Button -->
      <button id="lb-next" class="p-3 sm:p-4 rounded-full bg-white/5 hover:bg-white/15 text-white cursor-pointer transition-all hover:scale-105 z-10" aria-label="تصویر بعدی">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </div>

    <!-- Bottom label placeholder -->
    <div class="p-6 text-center text-xs text-gray-500 bg-gradient-to-t from-black/80 to-transparent">
      <span>میتوانید از کلیدهای جهت‌نما کیبورد (← / →) یا دکمه ESC استفاده کنید.</span>
    </div>
  `;

  // Animate Lightbox Open
  lb.classList.remove('hidden');
  setTimeout(() => {
    lb.classList.remove('opacity-0');
  }, 10);

  const closeLB = () => {
    lb.classList.add('opacity-0');
    setTimeout(() => {
      lb.classList.add('hidden');
    }, 250);
  };

  const nextImg = () => {
    currentIndex = (currentIndex + 1) % urls.length;
    renderImage();
    lb.querySelector('.text-gray-400').textContent = `تصویر ${currentIndex + 1} از ${urls.length}`;
  };

  const prevImg = () => {
    currentIndex = (currentIndex - 1 + urls.length) % urls.length;
    renderImage();
    lb.querySelector('.text-gray-400').textContent = `تصویر ${currentIndex + 1} از ${urls.length}`;
  };

  // Assign listeners
  lb.querySelector('#lb-close').addEventListener('click', closeLB);
  lb.querySelector('#lb-prev').addEventListener('click', prevImg);
  lb.querySelector('#lb-next').addEventListener('click', nextImg);

  // Keyboard navigation support
  const handleLBKeyboard = (e) => {
    if (lb.classList.contains('hidden')) return;

    if (e.key === 'Escape') {
      closeLB();
      document.removeEventListener('keydown', handleLBKeyboard);
    } else if (e.key === 'ArrowRight') {
      nextImg();
    } else if (e.key === 'ArrowLeft') {
      prevImg();
    }
  };
  document.addEventListener('keydown', handleLBKeyboard);

  // Click background to close
  lb.addEventListener('click', (e) => {
    if (e.target === lb || e.target.id === 'lb-image-container' || e.target.tagName === 'DIV') {
      if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'path' && e.target.tagName !== 'svg' && e.target.tagName !== 'IMG') {
        closeLB();
        document.removeEventListener('keydown', handleLBKeyboard);
      }
    }
  });
}

/**
 * 6. Dynamic Template Filter with Micro-Animations & accessible Modal Details
 */
function initTemplateFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const templateCards = document.querySelectorAll('.template-card');

  if (filterBtns.length === 0 || templateCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active Button Styling
      filterBtns.forEach(b => {
        b.classList.remove('bg-primary-accent', 'text-white', 'border-primary-accent');
        b.classList.add('bg-muted-bg', 'text-muted-fg', 'border-border-subtle');
      });
      btn.classList.add('bg-primary-accent', 'text-white', 'border-primary-accent');
      btn.classList.remove('bg-muted-bg', 'text-muted-fg', 'border-border-subtle');

      const filterVal = btn.getAttribute('data-filter');

      // Filtering with Fade & Scale Effect
      templateCards.forEach(card => {
        const category = card.getAttribute('data-category');

        card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

        if (filterVal === 'all' || category === filterVal) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 250);
        }
      });
    });
  });
}

/**
 * 7. High-Performance Accessible Accordion
 */
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  if (accordionHeaders.length === 0) return;

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const content = header.nextElementSibling;
      const icon = header.querySelector('.accordion-icon');
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      // Toggle state
      header.setAttribute('aria-expanded', !isExpanded);

      if (!isExpanded) {
        // Expand
        content.classList.remove('max-h-0', 'opacity-0');
        content.classList.add('opacity-100');
        // Dynamically compute height
        content.style.maxHeight = content.scrollHeight + 'px';
        icon?.classList.add('rotate-180');
        parent?.classList.add('border-primary-accent');
        parent?.classList.remove('border-border-subtle');
      } else {
        // Collapse
        content.style.maxHeight = '0';
        content.classList.add('opacity-0');
        content.classList.remove('opacity-100');
        icon?.classList.remove('rotate-180');
        parent?.classList.remove('border-primary-accent');
        parent?.classList.add('border-border-subtle');
      }
    });

    // Keyboard support
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
}

/**
 * 8. Premium Modal Handling (Demo & Details Actions)
 */
function initModal() {
  const modal = document.getElementById('details-modal');
  const modalClose = document.getElementById('modal-close');
  const openButtons = document.querySelectorAll('.open-details-btn');

  // Dynamic content containers
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalCategory = document.getElementById('modal-category');
  const modalTags = document.getElementById('modal-tags');
  const modalImage = document.getElementById('modal-image');
  const modalDemoLink = document.getElementById('modal-demo-link');

  if (!modal) return;

  // Template Data Map (No real DB, structured for premium look)
  const templateData = {
    'nexa': {
      title: 'نکسا — پوسته فرود SaaS متمایز',
      category: 'SaaS / استارتاپ',
      desc: 'قالب فرود بسیار شیک و مینیمال نکسا با رویکرد مدرن طراحی شده است. ایده آل برای پلتفرم‌های نرم‌افزاری، استارتاپ‌ها و شرکت‌های فناوری که به دنبال ارائه تمیز و اثربخش خدمات خود هستند. شامل بخش خدمات، معرفی فیچرها با تعاملات عالی و پلن‌های قیمت‌گذاری.',
      tags: ['SaaS', 'RTL Ready', 'Responsive', 'Tailwind CSS'],
      image: 'nexa-preview',
      demo: '#nexa-demo'
    },
    'aria': {
      title: 'آریا — فروشگاه اینترنتی مدرن و سریع',
      category: 'E-commerce / فروشگاهی',
      desc: 'یک قالب فروشگاهی جامع و بی‌نقص با معماری فوق‌سریع و طراحی کاربرپسند. این قالب شامل صفحات محصول با جزئیات کامل، سبد خرید مدرن، فیلترهای پیشرفته داینامیک و سازگاری کامل با سیستم‌های پرداخت بومی است.',
      tags: ['E-commerce', 'Tailwind', 'Responsive', 'Mobile-First'],
      image: 'aria-preview',
      demo: '#aria-demo'
    },
    'avesta': {
      title: 'اوستا — پرتال سازمانی و شرکتی',
      category: 'Corporate / شرکتی',
      desc: 'قالب رسمی و پر ابهت اوستا با رویکردی ساختاریافته طراحی شده است. این قالب برای شرکت‌های مهندسی، هلدینگ‌ها و آژانس‌های بزرگ مناسب است تا دستاوردها، خدمات و داستان برند خود را به صورت حرفه‌ای به نمایش بگذارند.',
      tags: ['Corporate', 'Minimal', 'SEO-Optimized', 'Vanilla JS'],
      image: 'avesta-preview',
      demo: '#avesta-demo'
    },
    'rayan': {
      title: 'رایان — داشبورد مدیریت و پنل کاربری',
      category: 'Dashboard / پنل کاربری',
      desc: 'یک پنل مدیریتی غنی از کامپوننت‌های مدرن و استاتیستیک‌های تعاملی. طراحی منطبق بر استانداردهای کاربری با داشبوردهایی برای امور مالی، مدیریت کاربران، چارت‌ها و اعلان‌های هوشمند.',
      tags: ['Dashboard', 'Tailwind CSS', 'Interactive Charts', 'Dark/Light'],
      image: 'rayan-preview',
      demo: '#rayan-demo'
    }
  };

  const openModal = (id) => {
    const data = templateData[id];
    if (!data) return;

    // Inject data
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalDesc) modalDesc.textContent = data.desc;
    if (modalDemoLink) modalDemoLink.href = data.demo;

    // Clear & build tags
    if (modalTags) {
      modalTags.innerHTML = '';
      data.tags.forEach(tag => {
        const badge = document.createElement('span');
        badge.className = 'px-2.5 py-1 text-xs font-medium rounded-full bg-muted-bg text-muted-fg border border-border-subtle';
        badge.textContent = tag;
        modalTags.appendChild(badge);
      });
    }

    // Modal Visual Mockup
    if (modalImage) {
      // Re-create a beautiful SVG UI mockup dynamically
      modalImage.innerHTML = `
        <div class="w-full h-full flex flex-col bg-bg-main border border-border-subtle rounded-xl overflow-hidden shadow-2xl">
          <!-- Browser Header -->
          <div class="flex items-center gap-1.5 px-4 py-3 bg-muted-bg border-b border-border-subtle">
            <span class="w-2.5 h-2.5 rounded-full bg-red-500 opacity-80"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-80"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-green-500 opacity-80"></span>
            <div class="mx-auto bg-bg-main border border-border-subtle rounded text-[10px] text-muted-fg px-4 py-0.5 w-1/2 text-center truncate">
              studio.ir/templates/${id}
            </div>
          </div>
          <!-- Body Simulation -->
          <div class="p-6 flex-1 flex flex-col justify-between gap-6 overflow-y-auto">
            <div class="space-y-3">
              <div class="h-4 w-1/3 bg-primary-accent opacity-20 rounded"></div>
              <div class="h-8 w-2/3 bg-fg-main opacity-10 rounded"></div>
              <div class="h-20 w-full bg-muted-bg border border-border-subtle rounded p-3 flex flex-col gap-2">
                <div class="h-2 w-full bg-fg-main opacity-10 rounded"></div>
                <div class="h-2 w-4/5 bg-fg-main opacity-10 rounded"></div>
                <div class="h-2 w-5/6 bg-fg-main opacity-10 rounded"></div>
              </div>
            </div>
            <!-- Showcase Card Grid -->
            <div class="grid grid-cols-2 gap-3">
              <div class="h-24 bg-muted-bg border border-border-subtle rounded p-3 flex flex-col justify-between">
                <span class="w-8 h-8 rounded bg-primary-accent opacity-20"></span>
                <div class="h-2 w-1/2 bg-fg-main opacity-10 rounded"></div>
              </div>
              <div class="h-24 bg-muted-bg border border-border-subtle rounded p-3 flex flex-col justify-between">
                <span class="w-8 h-8 rounded bg-accent-hover opacity-20"></span>
                <div class="h-2 w-2/3 bg-fg-main opacity-10 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // Open animations
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Lock background scroll
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modal.querySelector('.modal-content').classList.remove('scale-95', 'opacity-0');
    }, 10);
  };

  const closeModal = () => {
    modal.classList.add('opacity-0');
    modal.querySelector('.modal-content').classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = ''; // Unlock scroll
    }, 250);
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const templateId = btn.getAttribute('data-id');
      openModal(templateId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESC Close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/**
 * 9. Contact Form Validation and Simulated States
 */
function initContactForm() {
  const form = document.getElementById('project-form');
  if (!form) return;

  const btn = form.querySelector('button[type="submit"]');
  const statusContainer = document.getElementById('form-status');

  const showStatus = (type, message) => {
    if (!statusContainer) return;

    statusContainer.className = 'mt-4 p-4 rounded-lg text-sm border';

    if (type === 'success') {
      statusContainer.classList.add('bg-green-500/10', 'text-green-400', 'border-green-500/20');
      statusContainer.innerHTML = `
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>${message}</span>
        </div>
      `;
    } else if (type === 'error') {
      statusContainer.classList.add('bg-red-500/10', 'text-red-400', 'border-red-500/20');
      statusContainer.innerHTML = `
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>${message}</span>
        </div>
      `;
    }

    statusContainer.classList.remove('hidden');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset status
    if (statusContainer) statusContainer.classList.add('hidden');

    // Get Fields
    const name = form.querySelector('#fullName')?.value.trim();
    const phone = form.querySelector('#phone')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const projectType = form.querySelector('#projectType')?.value;
    const message = form.querySelector('#projectDesc')?.value.trim();

    // Client-side Validation
    if (!name) {
      showStatus('error', 'لطفاً نام و نام خانوادگی خود را وارد کنید.');
      return;
    }

    if (!phone && !email) {
      showStatus('error', 'لطفاً حداقل یک راه ارتباطی (ایمیل یا شماره تماس) وارد کنید.');
      return;
    }

    if (phone && !/^[0-9+() -]{9,15}$/.test(phone)) {
      showStatus('error', 'فرمت شماره تماس معتبر نیست.');
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus('error', 'فرمت آدرس ایمیل معتبر نیست.');
      return;
    }

    if (!projectType) {
      showStatus('error', 'لطفاً نوع پروژه را انتخاب کنید.');
      return;
    }

    if (!message) {
      showStatus('error', 'لطفاً توضیح مختصری از پروژه خود ارائه دهید.');
      return;
    }

    // Simulate Loading State
    if (btn) {
      const origText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        در حال ثبت اطلاعات...
      `;

      setTimeout(() => {
        // Restore button state
        btn.disabled = false;
        btn.innerHTML = origText;

        // Show Success
        showStatus('success', 'درخواست شما با موفقیت ثبت شد! به زودی همکاران ما با شما تماس خواهند گرفت.');

        // Reset form inputs
        form.reset();
      }, 1500);
    }
  });
}

/**
 * 10. Clean Scroll Reveal / Interactive Transition Triggers
 */
function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return; // Skip animations if user requested reduced motion
  }

  const animates = document.querySelectorAll('.scroll-animate');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-8');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animates.forEach(el => {
    el.classList.add('opacity-0', 'translate-y-8', 'transition-all-custom', 'duration-700');
    observer.observe(el);
  });
}

/**
 * 12. Persistent Floating Consultation CTA & Immersive Fullscreen Overlay Module
 */
function initConsultationExperience() {
  const trigger = document.getElementById('consultation-trigger');
  const overlay = document.getElementById('consultation-overlay');
  const closeBtn = document.getElementById('consultation-close');
  const stateContact = document.getElementById('consultation-state-contact');
  const stateInquiry = document.getElementById('consultation-state-inquiry');
  const toInquiryBtn = document.getElementById('to-project-inquiry-btn');
  const backToContactBtn = document.getElementById('back-to-contact-btn');
  const methodsGrid = document.getElementById('contact-methods-grid');
  const socialsRow = document.getElementById('contact-socials-row');
  const inquiryForm = document.getElementById('consultation-project-form');
  const formStatus = document.getElementById('consultation-form-status');
  const successState = document.getElementById('consultation-success-state');
  const successCloseBtn = document.getElementById('consultation-success-close-btn');

  if (!trigger || !overlay) return;

  // Active pulsing dot visually configured via HTML + CSS inside input.css
  const dot = trigger.querySelector('.animate-ping');
  if (dot) {
    dot.classList.add('consultation-dot-pulse');
  }

  // Populate Contact Grid dynamically from consultationConfig
  if (methodsGrid) {
    methodsGrid.innerHTML = '';
    const primaryKeys = ['telegram', 'whatsapp', 'phone', 'instagram1', 'instagram2'];
    primaryKeys.forEach((key, idx) => {
      const data = consultationConfig[key];
      if (!data) return;

      const item = document.createElement('a');
      item.href = data.href;
      item.target = "_blank";
      item.rel = "noopener noreferrer";
      item.className = "contact-item group flex items-center justify-between p-5 rounded-2xl bg-muted-bg/50 border border-border-subtle/80 hover:bg-muted-bg hover:border-primary-accent/40 hover:scale-[1.01] active:scale-[0.99] transition-all-custom text-right";
      item.setAttribute('aria-label', `${data.label}: ${data.value}`);

      item.innerHTML = `
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-xl bg-primary-accent/10 flex items-center justify-center text-primary-accent group-hover:bg-primary-accent group-hover:text-white transition-colors duration-300">
            ${data.icon}
          </div>
          <div class="space-y-0.5">
            <span class="text-xs text-muted-fg font-bold block">${data.label}</span>
            <span class="text-sm font-extrabold text-fg-main group-hover:text-primary-accent transition-colors duration-200 font-mono">${data.value}</span>
          </div>
        </div>
        <svg class="w-4 h-4 text-muted-fg transform rotate-180 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      `;
      methodsGrid.appendChild(item);
    });
  }

  // Populate Socials dynamically from consultationConfig
  if (socialsRow) {
    socialsRow.innerHTML = '';
    const socialKeys = ['githubFrontend', 'githubBackend'];
    socialKeys.forEach(key => {
      const data = consultationConfig[key];
      if (!data) return;

      const item = document.createElement('a');
      item.href = data.href;
      item.target = "_blank";
      item.rel = "noopener noreferrer";
      item.className = "px-4 py-2 rounded-xl bg-card-bg border border-border-subtle/80 text-xs font-bold text-muted-fg hover:text-fg-main hover:border-primary-accent/40 transition-colors flex items-center gap-2";
      item.setAttribute('aria-label', `${data.label}: ${data.value}`);

      item.innerHTML = `
        <span class="text-primary-accent">${data.icon}</span>
        <span>${data.label}</span>
      `;
      socialsRow.appendChild(item);
    });
  }

  // Scroll Behavior: Slightly reduce visual footprint during rapid scrolling
  let isScrolling;
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const diff = Math.abs(currentScrollY - lastScrollY);

    if (diff > 25 && overlay.classList.contains('pointer-events-none')) {
      // Rapid downward or upward scroll
      gsap.to(trigger, { scale: 0.94, opacity: 0.8, duration: 0.25, overwrite: "auto" });
      const textSpan = document.getElementById('consultation-trigger-text');
      if (textSpan && window.innerWidth >= 768) {
        gsap.to(textSpan, { width: 0, opacity: 0, marginLeft: 0, duration: 0.25, overwrite: "auto" });
      }
    }

    lastScrollY = currentScrollY;

    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      // Stopped scrolling
      gsap.to(trigger, { scale: 1, opacity: 1, duration: 0.3, overwrite: "auto" });
      const textSpan = document.getElementById('consultation-trigger-text');
      if (textSpan && window.innerWidth >= 768) {
        gsap.to(textSpan, { width: "auto", opacity: 1, marginLeft: "0.5rem", duration: 0.3, overwrite: "auto" });
      }
    }, 200);
  }, { passive: true });

  // Open & Close GSAP timelines
  let openTl;
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const initAnimations = () => {
    openTl = gsap.timeline({ paused: true });

    if (isReduced) {
      openTl
        .to(overlay, { opacity: 1, duration: 0.2 })
        .to([stateContact, stateInquiry], { opacity: 1, duration: 0.2 });
    } else {
      openTl
        .to(trigger, { scale: 0.9, opacity: 0, duration: 0.25, ease: "power2.inOut" })
        .to(overlay, { opacity: 1, duration: 0.35, ease: "power2.out" }, "-=0.15")
        .fromTo('#consultation-title', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, "-=0.15")
        .fromTo('.contact-item', { y: 15, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.35, ease: "power2.out" }, "-=0.25")
        .fromTo(toInquiryBtn, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }, "-=0.2");
    }
  };

  initAnimations();

  // Scroll Lock Helper
  const lockScroll = (lock) => {
    if (lock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const openOverlay = () => {
    overlay.classList.remove('pointer-events-none');
    lockScroll(true);
    openTl.play();

    // Focus Close Button or input
    setTimeout(() => {
      closeBtn.focus();
    }, 100);
  };

  const closeOverlay = () => {
    openTl.reverse().then(() => {
      overlay.classList.add('pointer-events-none');
      lockScroll(false);
      trigger.focus();
    });
  };

  trigger.addEventListener('click', openOverlay);
  closeBtn.addEventListener('click', closeOverlay);

  // Close with ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.classList.contains('pointer-events-none')) {
      closeOverlay();
    }
  });

  // Transition from Contact View to Inquiry Form
  toInquiryBtn.addEventListener('click', () => {
    if (isReduced) {
      stateContact.classList.add('hidden');
      stateInquiry.classList.remove('hidden');
      inquiryForm.classList.remove('hidden');
      successState.classList.add('hidden');
    } else {
      gsap.to(stateContact, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          stateContact.classList.add('hidden');
          stateInquiry.classList.remove('hidden');
          inquiryForm.classList.remove('hidden');
          successState.classList.add('hidden');
          gsap.fromTo(stateInquiry, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
        }
      });
    }
  });

  // Transition back to Contact View
  backToContactBtn.addEventListener('click', () => {
    if (isReduced) {
      stateInquiry.classList.add('hidden');
      stateContact.classList.remove('hidden');
    } else {
      gsap.to(stateInquiry, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          stateInquiry.classList.add('hidden');
          stateContact.classList.remove('hidden');
          gsap.fromTo(stateContact, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
        }
      });
    }
  });

  // Client-side Validation helper
  const showFormError = (msg) => {
    formStatus.className = "p-4 rounded-xl text-sm border bg-red-500/10 text-red-400 border-red-500/20";
    formStatus.textContent = msg;
    formStatus.classList.remove('hidden');
  };

  // Form Submission Point
  async function submitProjectInquiry(data) {
    // Configurable Backend/API Endpoint Integration Point
    console.log("Submitting Project Inquiry Data to Backend API:", data);
    return new Promise((resolve) => setTimeout(resolve, 1500));
  }

  inquiryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formStatus.classList.add('hidden');

    const name = document.getElementById('consultation-name').value.trim();
    const contact = document.getElementById('consultation-contact').value.trim();
    const type = document.getElementById('consultation-project-type').value;
    const budget = document.getElementById('consultation-budget').value;
    const desc = document.getElementById('consultation-desc').value.trim();

    if (!name) {
      showFormError("لطفاً نام خود را وارد کنید.");
      return;
    }

    if (!contact) {
      showFormError("لطفاً یک راه ارتباطی معتبر (شماره یا ایمیل) وارد کنید.");
      return;
    }

    if (!desc) {
      showFormError("لطفاً توضیح مختصری از پروژه خود ارائه دهید.");
      return;
    }

    // Loader on submit button
    const submitBtn = inquiryForm.querySelector('button[type="submit"]');
    const origHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      در حال ثبت درخواست...
    `;

    try {
      await submitProjectInquiry({ name, contact, type, budget, desc });

      // Success Transition
      if (isReduced) {
        inquiryForm.classList.add('hidden');
        successState.classList.remove('hidden');
      } else {
        gsap.to(inquiryForm, {
          opacity: 0,
          y: -15,
          duration: 0.3,
          onComplete: () => {
            inquiryForm.classList.add('hidden');
            successState.classList.remove('hidden');
            gsap.fromTo(successState, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 });
          }
        });
      }
    } catch (err) {
      showFormError("خطایی در ثبت درخواست رخ داده است. لطفاً دوباره تلاش کنید.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origHtml;
    }
  });

  // Success state Close action
  const resetAndClose = () => {
    inquiryForm.reset();
    formStatus.classList.add('hidden');
    stateInquiry.classList.add('hidden');
    stateContact.classList.remove('hidden');
    gsap.set([stateContact, stateInquiry, inquiryForm, successState], { clearProps: "all" });
    closeOverlay();
  };

  successCloseBtn.addEventListener('click', resetAndClose);
}

/**
 * 11. Dedicated Project Detail Page dynamic renderer (project.html)
 */
function initProjectDetailPage() {
  const detailContainer = document.getElementById('project-detail-container');
  if (!detailContainer) return; // We are not on project.html

  // Parse ID from Query String
  const params = new URLSearchParams(window.location.search);
  const projectId = Number(params.get('id'));

  const project = projects.find(p => p.id === projectId) || projects[0];

  // Title update
  document.title = `${project.title} | پورتفولیو دپیکس`;

  // Render specifications
  let specsHTML = '';
  if (project.specs) {
    specsHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-1 gap-6 border-y border-border-subtle py-8">
        <div>
          <p class="text-[11px] text-muted-fg font-bold uppercase tracking-wider">نوع پروژه</p>
          <p class="text-base font-extrabold text-fg-main mt-1">${project.specs.type}</p>
        </div>
        <div>
          <p class="text-[11px] text-muted-fg font-bold uppercase tracking-wider">مدت زمان پیاده‌سازی</p>
          <p class="text-base font-extrabold text-fg-main mt-1">${project.specs.duration}</p>
        </div>
        <div>
          <p class="text-[11px] text-muted-fg font-bold uppercase tracking-wider">سال پروژه</p>
          <p class="text-base font-extrabold text-fg-main mt-1">${project.year}</p>
        </div>
      </div>
    `;
  }

  // Render Metric Widgets
  let metricsHTML = '';
  if (project.specs && project.specs.metrics) {
    metricsHTML = `
      <div class="space-y-6 pt-6">
        <h3 class="text-xl font-extrabold text-fg-main">شاخص‌ها و نتایج عددی</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
          ${project.specs.metrics.map(m => `
            <div class="bg-card-bg border border-border-subtle rounded-2xl p-6 text-center shadow-sm">
              <p class="text-4xl font-black text-primary-accent tracking-tight">${m.value}</p>
              <p class="text-xs sm:text-sm text-muted-fg font-medium mt-1">${m.label}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Technologies HTML
  let techsHTML = '';
  if (project.specs && project.specs.techs) {
    techsHTML = `
      <div class="space-y-3 pt-6">
        <h4 class="text-xs font-bold text-muted-fg uppercase tracking-wider">تکنولوژی‌های کلیدی</h4>
        <div class="flex flex-wrap gap-2">
          ${project.specs.techs.map(t => `
            <span class="px-4 py-1.5 rounded-full text-xs font-semibold bg-card-bg text-muted-fg border border-border-subtle">${t}</span>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Slider HTML for the dedicated page
  const sliderHTML = `
    <div class="relative w-full overflow-hidden rounded-2xl border border-border-subtle bg-muted-bg/30 aspect-[16/10]" dir="ltr">
      <div id="project-page-carousel-slides" class="flex transition-transform duration-500 ease-out h-full" style="transform: translateX(0%);">
        ${project.screens.map((scr, idx) => `
          <div class="w-full flex-shrink-0 h-full relative group cursor-zoom-in">
            <img src="${scr}" alt="${project.title} - تصویر ${idx + 1}" class="w-full h-full object-cover select-none" loading="lazy">
            <div class="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
              <span class="p-3.5 rounded-full bg-white/20 backdrop-blur text-white">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </span>
            </div>
          </div>
        `).join('')}
      </div>

      ${project.screens.length > 1 ? `
        <button id="project-page-carousel-slide-prev" class="absolute top-1/2 left-4 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all cursor-pointer z-10" aria-label="تصویر قبلی">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button id="project-page-carousel-slide-next" class="absolute top-1/2 right-4 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all cursor-pointer z-10" aria-label="تصویر بعدی">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          ${project.screens.map((_, idx) => `
            <button class="project-page-carousel-dot w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white transition-all cursor-pointer" data-index="${idx}"></button>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;

  // Related Projects (Exclude current, take up to 3)
  const related = projects.filter(p => p.id !== project.id).slice(0, 3);
  let relatedHTML = '';
  related.forEach(p => {
    relatedHTML += `
      <div onclick="window.location.href='project.html?id=${p.id}'" class="group block bg-card-bg border border-border-subtle rounded-2xl overflow-hidden hover:border-primary-accent/40 hover:shadow-xl transition-all duration-300 cursor-pointer">
        <div class="aspect-[16/10] overflow-hidden bg-muted-bg/50">
          <img src="${p.cover}" alt="${p.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102">
        </div>
        <div class="p-5 text-right">
          <h4 class="text-base font-extrabold text-fg-main group-hover:text-primary-accent transition-colors">${p.title}</h4>
          <p class="text-xs text-muted-fg mt-1 font-medium">${p.categoryLabel}</p>
        </div>
      </div>
    `;
  });

  // Inject everything beautifully
  detailContainer.innerHTML = `
    <!-- Hero Header / Breadcrumbs -->
    <div class="space-y-4 text-right">
      <nav class="flex items-center gap-2 text-xs font-semibold text-muted-fg">
        <a href="index.html" class="hover:text-primary-accent transition-colors">خانه</a>
        <span>/</span>
        <a href="index.html#portfolio" class="hover:text-primary-accent transition-colors">نمونه‌کارها</a>
        <span>/</span>
        <span class="text-fg-main">${project.title}</span>
      </nav>

      <div class="space-y-2">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-fg-main leading-tight">${project.title}</h1>
        <p class="text-sm sm:text-base text-primary-accent font-bold">${project.categoryLabel}</p>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-8">

      <!-- Left side: Screens & Stats -->
      <div class="lg:col-span-8 space-y-12">

        <!-- Slider with images -->
        <div class="space-y-3">
          ${sliderHTML}
        </div>

        <!-- Comprehensive Description -->
        <div class="space-y-6 text-right">
          <h2 class="text-2xl font-black text-fg-main">معرفی و شرح کامل دستاوردها</h2>
          <p class="text-base sm:text-lg text-muted-fg leading-relaxed whitespace-pre-line">${project.description}</p>
        </div>

        <!-- Stats Section -->
        ${metricsHTML}

      </div>

      <!-- Right side: Specifications & Quick CTA -->
      <div class="lg:col-span-4 space-y-8 sticky top-24">

        <!-- Quick Stats Specs -->
        <div class="bg-card-bg border border-border-subtle rounded-2xl p-6 sm:p-8 space-y-6 text-right">
          <h3 class="text-lg font-black text-fg-main">مشخصات کلیدی پروژه</h3>

          ${specsHTML}
          ${techsHTML}
        </div>

        <!-- Fast Contact CTA Card -->
        <div class="bg-gradient-to-tr from-primary-accent to-accent-hover text-white rounded-2xl p-8 text-center space-y-6 shadow-xl shadow-primary-accent/15">
          <h3 class="text-xl font-black">پروژه مشابه‌ای در ذهن دارید؟</h3>
          <p class="text-sm opacity-90 leading-relaxed">ما در استودیو دپیکس آماده‌ایم ایده خلاقانه شما را با برترین متدهای مهندسی و بصری پیاده‌سازی کنیم.</p>
          <a href="index.html#contact" class="inline-flex w-full items-center justify-center py-3.5 px-6 rounded-xl text-sm font-bold bg-white text-primary-accent hover:bg-gray-50 transition-all-custom">
            شروع یک گفتگو رایگان
          </a>
        </div>

      </div>

    </div>

    <!-- Related Projects Section -->
    <div class="border-t border-border-subtle/50 pt-16 mt-16 space-y-8">
      <div class="flex items-center justify-between text-right">
        <h3 class="text-2xl font-black text-fg-main">سایر نمونه‌کارها</h3>
        <a href="index.html#portfolio" class="text-xs sm:text-sm font-bold text-primary-accent hover:gap-2.5 transition-all flex items-center gap-1.5">
          مشاهده همه نمونه‌کارها
          <span class="transform rotate-180">←</span>
        </a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${relatedHTML}
      </div>
    </div>
  `;

  // Initialize Carousel Slider
  setupCarouselLogic('project-page-carousel', project.screens);

  // Setup slide click triggers for Lightbox zoom on dedicated page
  const sliderImages = detailContainer.querySelectorAll('#project-page-carousel-slides img');
  sliderImages.forEach((img, idx) => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(project.screens, idx);
    });
  });
}
