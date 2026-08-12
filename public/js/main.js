/**
 * Premium Persian RTL Software Studio Website - JS Module
 * Highly polished, modular, accessible, and high-performance.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initTemplateFilter();
  initAccordion();
  initModal();
  initContactForm();
  initScrollAnimations();
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
    } else {
      document.documentElement.classList.remove('light');
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
 * 3. Dynamic Template Filter with Micro-Animations
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
 * 4. High-Performance Accessible Accordion
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
 * 5. Premium Modal Handling (Demo & Details Actions)
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
 * 6. Contact Form Validation and Simulated States
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
 * 7. Clean Scroll Reveal / Interactive Transition Triggers
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
