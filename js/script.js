/* ============================================
   INFO DZ NATIONAL - JavaScript
   ============================================ */

// Breaking news items — edit this array to change ticker content
const breakingNews = [
  'عملية أمنية نوعية في ولاية الجزائر تسفر عن توقيف شبكة إجرامية خطيرة',
  'الدرك الوطني يطلق حملة وطنية للوقاية من حوادث المرور',
  'محكمة الجزائر تصدر أحكاماً مشددة في قضايا الفساد',
  'مصالح الأمن تكشف شبكة دولية لتهريب المخدرات عبر الحدود',
  'إطلاق سراح 150 سجيناً بمناسبة العيد الوطني',
  'الفرقة الوطنية للتحقيقات الجنائية تفك لغز جريمة قتل مزدوج',
];

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // BREAKING NEWS TICKER
  // ============================================
  (function initTicker() {
    const track = document.getElementById('tickerTrack');
    if (!track) return;

    // Build items: duplicate the array so the loop is seamless
    const items = [...breakingNews, ...breakingNews, ...breakingNews];
    items.forEach(text => {
      const span = document.createElement('span');
      span.className = 'ticker-item';
      span.textContent = text;
      track.appendChild(span);
    });

    let pos = 0;
    const speed = 0.6; // px per frame
    let paused = false;

    function animate() {
      if (!paused) {
        pos -= speed;
        const itemWidth = track.scrollWidth / 3;
        if (Math.abs(pos) >= itemWidth) {
          pos += itemWidth;
        }
        track.style.transform = `translateX(${pos}px)`;
      }
      requestAnimationFrame(animate);
    }

    // Pause on hover/touch
    track.addEventListener('mouseenter', () => { paused = true; });
    track.addEventListener('mouseleave', () => { paused = false; });
    track.addEventListener('touchstart', () => { paused = true; });
    track.addEventListener('touchend', () => { paused = false; });

    animate();
  })();

  // ============================================
  // MOBILE MENU
  // ============================================
  const menuToggle = document.getElementById('menuToggle');
  const navbar = document.getElementById('navbar');
  const navDropdowns = document.querySelectorAll('.nav-dropdown');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navbar.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });

  // Mobile dropdown toggle
  if (window.innerWidth <= 768) {
    navDropdowns.forEach(dropdown => {
      const link = dropdown.querySelector('a');
      link.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('open');
      });
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav-list > li > a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menuToggle.classList.remove('active');
        navbar.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    });
  });

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // ============================================
  // HERO SLIDER
  // ============================================
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('heroDots');
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');
  let currentSlide = 0;
  let slideInterval;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('button');

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetSlideTimer();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetSlideTimer();
  });

  function resetSlideTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 6000);
  }

  slideInterval = setInterval(nextSlide, 6000);

  // ============================================
  // STATS COUNTER
  // ============================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    statNumbers.forEach(stat => {
      const target = parseInt(stat.dataset.target);
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current += increment;

        if (current >= target) {
          stat.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current).toLocaleString();
        }
      }, duration / steps);
    });
  }

  // Intersection Observer for stats
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  // ============================================
  // SCROLL TO TOP
  // ============================================
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') return;
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ============================================
  // VIDEO DATA — load from localStorage, then videos.json, then fallback
  // ============================================
  const VIDEO_STORAGE_KEY = 'infoDZVideos';

  async function loadVideos() {
    try {
      const stored = localStorage.getItem(VIDEO_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch {}

    try {
      const res = await fetch('videos.json');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length) return data;
      }
    } catch {}

    return [
      {
        title: "عملية مداهمة ناجحة للشرطة الجزائرية",
        description: "توثيق حصري لعملية أمنية تطوق أوكار المجرمين",
        thumbnail: "photo/Algerian_police_arresting_a_dangerous_202605281729.jpeg",
        url: "",
        duration: "04:32",
        date: "05 يونيو 2026"
      },
      {
        title: "جلسة محاكمة علنية: قضايا الفساد الكبرى",
        description: "تغطية خاصة من داخل قاعة المحكمة العليا",
        thumbnail: "photo/Large_Algerian_courtroom_interior,_Arabic_202605291312.jpeg",
        url: "",
        duration: "12:18",
        date: "04 يونيو 2026"
      },
      {
        title: "داخل السجن: تقرير عن ظروف المؤسسات العقابية",
        description: "تحقيق استقصائي يرصد واقع السجون الجزائرية",
        thumbnail: "photo/Dark_Algerian_prison_corridor,_realistic_202605291122.jpeg",
        url: "",
        duration: "08:45",
        date: "03 يونيو 2026"
      },
      {
        title: "التحقيقات الجنائية: كشف الأدلة المادية",
        description: "داخل مختبرات الأدلة الجنائية والتحليل الرقمي",
        thumbnail: "photo/Masked_criminal_attempting_car_theft_202605291359.jpeg",
        url: "",
        duration: "06:20",
        date: "02 يونيو 2026"
      }
    ];
  }

  let videoData = [];

  function renderVideoCards(data) {
    const videoGrid = document.getElementById('videoGrid');
    if (!videoGrid) return;
    videoGrid.innerHTML = '';
    if (!data || !data.length) return;
    data.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'video-card';
      card.innerHTML = `
        <div class="video-thumb" style="background-image: url('${item.thumbnail}')">
          <div class="video-play">
            <i class="fas fa-play"></i>
          </div>
          <div class="video-duration">${item.duration || ''}</div>
        </div>
        <div class="video-info">
          <h3>${item.title}</h3>
          <p>${item.description || ''}</p>
          <span class="video-date"><i class="far fa-clock"></i> ${item.date || ''}</span>
        </div>
      `;
      videoGrid.appendChild(card);
    });
    // Observe new video cards for scroll animation
    const obs = window._videoObserver;
    if (obs) {
      videoGrid.querySelectorAll('.video-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        obs.observe(el);
      });
    }
  }

  // Load videos: check localStorage, then fetch, then fallback
  (async function initVideos() {
    videoData = await loadVideos();
    renderVideoCards(videoData);
  })();

  // ============================================
  // SCROLL ANIMATIONS
  // ============================================
  const animateElements = document.querySelectorAll(
    '.category-card, .video-card, .news-card, .stat-card, .report-card'
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  window._videoObserver = observer;

  animateElements.forEach(el => {
    if (!el.classList.contains('news-card')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    }
  });

  // ============================================
  // SEARCH FUNCTIONALITY
  // ============================================
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  let noResultsMsg = null;

  function filterNews() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.news-card');
    let matchCount = 0;

    cards.forEach(card => {
      const title = card.querySelector('h3')?.textContent || '';
      const text = card.querySelector('p')?.textContent || '';
      const category = card.querySelector('span')?.textContent || '';
      const match = !query || title.includes(query) || text.includes(query) || category.includes(query);

      if (match) {
        card.style.display = '';
        card.classList.remove('search-hidden');
        matchCount++;
      } else {
        card.style.display = 'none';
        card.classList.add('search-hidden');
      }
    });

    // Show/hide no-results message
    if (query && matchCount === 0) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'search-no-results';
        noResultsMsg.innerHTML = '<i class="fas fa-search"></i><p>لا توجد نتائج مطابقة لـ "<span></span>"</p>';
        document.getElementById('newsGrid').appendChild(noResultsMsg);
      }
      noResultsMsg.style.display = '';
      noResultsMsg.querySelector('span').textContent = query;
    } else if (noResultsMsg) {
      noResultsMsg.style.display = 'none';
    }

    // Toggle clear button
    const clearBtn = searchInput.parentElement.querySelector('.search-clear');
    if (query) {
      if (!clearBtn) {
        const btn = document.createElement('button');
        btn.className = 'search-clear';
        btn.innerHTML = '<i class="fas fa-times"></i>';
        btn.addEventListener('click', () => {
          searchInput.value = '';
          searchInput.focus();
          filterNews();
        });
        searchInput.parentElement.appendChild(btn);
      }
    } else if (clearBtn) {
      clearBtn.remove();
    }
  }

  searchInput.addEventListener('input', filterNews);
  searchBtn.addEventListener('click', () => {
    searchInput.focus();
    if (searchInput.value.trim()) filterNews();
  });
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') filterNews();
  });

  // ============================================
  // NEWSLETTER FORM
  // ============================================
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      input.value = '';
      input.placeholder = 'تم الاشتراك بنجاح!';
      input.style.borderColor = '#006233';
      setTimeout(() => {
        input.placeholder = 'أدخل بريدك الإلكتروني';
        input.style.borderColor = '';
      }, 3000);
    });
  }

  // ============================================
  // VIDEO PLAY BUTTON (event delegation)
  // ============================================
  document.addEventListener('click', (e) => {
    const playBtn = e.target.closest('.video-play');
    if (!playBtn) return;
    const card = playBtn.closest('.video-card');
    if (!card) return;
    const index = Array.from(card.parentElement.children).indexOf(card);
    const video = videoData[index];
    if (!video) return;

    if (video.url) {
      window.open(video.url, '_blank');
      return;
    }

    playBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
    playBtn.style.background = 'var(--green)';

    setTimeout(() => {
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
      playBtn.style.background = '';
      const notif = document.createElement('div');
      notif.style.cssText = `
        position: fixed; top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.95);
        padding: 40px 60px; border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.1);
        z-index: 9999; text-align: center;
        font-family: 'Tajawal', sans-serif;
        box-shadow: 0 20px 60px rgba(0,0,0,0.9);
        animation: fadeIn 0.3s ease;
      `;
      notif.innerHTML = `
        <i class="fas fa-video" style="font-size: 2rem; color: #D21034; margin-bottom: 15px; display: block;"></i>
        <p style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 8px;">مشغل الفيديو</p>
        <p style="color: #888; font-size: 0.85rem;">سيتم تشغيل الفيديو قريباً</p>
        <p style="color: #666; font-size: 0.75rem; margin-top: 6px;">${video.title}</p>
        <button onclick="this.closest('div').remove()" style="
          margin-top: 20px; padding: 8px 24px;
          background: #D21034; color: white;
          border: none; border-radius: 6px;
          font-family: 'Tajawal', sans-serif;
          font-weight: 700; cursor: pointer;
        ">إغلاق</button>
      `;
      document.body.appendChild(notif);
    }, 1200);
  });

  // ============================================
  // ACTIVE NAV LINK ON SCROLL
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-list > li > a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // ============================================
  // PARALLAX EFFECT ON HERO
  // ============================================
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    if (hero && scrolled <= hero.offsetHeight) {
      const slides = hero.querySelectorAll('.hero-slide.active');
      slides.forEach(slide => {
        slide.style.transform = `translateY(${scrolled * 0.15}px) scale(${1 + scrolled * 0.0003})`;
      });
    }
  });

  // ============================================
  // RESIZE HANDLER
  // ============================================
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      menuToggle.classList.remove('active');
      navbar.classList.remove('open');
      document.body.classList.remove('menu-open');
      navDropdowns.forEach(d => d.classList.remove('open'));
    }

    if (window.innerWidth <= 768) {
      navDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.removeEventListener('click', dropdown._clickHandler);
        dropdown._clickHandler = (e) => {
          e.preventDefault();
          dropdown.classList.toggle('open');
        };
        link.addEventListener('click', dropdown._clickHandler);
      });
    }
  });

  // ============================================
  // KEYBOARD SHORTCUTS
  // ============================================
  document.addEventListener('keydown', (e) => {
    // Ctrl + / to focus search
    if (e.ctrlKey && e.key === '/') {
      e.preventDefault();
      searchInput.focus();
    }
    // Escape to close mobile menu
    if (e.key === 'Escape') {
      if (window.innerWidth <= 768 && navbar.classList.contains('open')) {
        menuToggle.classList.remove('active');
        navbar.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
      searchInput.blur();
    }
  });

  // ============================================
  // PERFORMANCE: Add will-change for animated elements
  // ============================================
  document.querySelectorAll('.hero-slide, .video-card').forEach(el => {
    el.style.willChange = 'transform, opacity';
  });

  // ============================================
  // NEWS DATA
  // ============================================
  // ============================================
  // NEWS DATA — load from localStorage or defaults
  // ============================================
  const STORAGE_KEY = 'infoDZNews';

  function loadNews() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch {}
    // Default fallback data
    return [
      {
        title: "عملية أمنية كبرى في 5 ولايات",
        category: "الشرطة",
        image: "photo/Algerian_police_arresting_a_dangerous_202605281729.jpeg",
        text: "أسفرت عملية أمنية واسعة النطاق عبر 5 ولايات عن توقيف 23 متهماً وحجز كميات كبيرة من المخدرات والأسلحة البيضاء.",
        date: "05 يونيو 2026",
        location: "الجزائر العاصمة",
        fullText: "تمكنت مصالح الشرطة الجزائرية، في إطار عملياتها الأمنية المستمرة، من تنفيذ عملية مداهمة واسعة النطاق شملت 5 ولايات مختلفة، أسفرت عن توقيف 23 شخصاً من بينهم عناصر خطيرة مطلوبة للعدالة. وقد حجزت المصالح الأمنية كميات معتبرة من المخدرات قدرت بأكثر من 50 كيلوغراماً من الكيف المعالج، بالإضافة إلى أسلحة بيضاء ومبلغ مالي مهم من عائدات الترويج. العملية التي أشرف عليها النائب العام المختص جرت بتنسيق محكم بين مختلف الفرق الأمنية، وتمتد التحقيقات لكشف باقي أفراد الشبكة الإجرامية."
      },
      {
        title: "الدرك الوطني يطلق الرقم الأخضر",
        category: "الدرك الوطني",
        image: "photo/برومت_الرقم_الأخضر_للدرك_الوطني__202605291656.jpeg",
        text: "إطلاق خط ساخن جديد للإبلاغ عن الحوادث والاستفسار عن الخدمات الأمنية على مدار 24 ساعة.",
        date: "05 يونيو 2026",
        location: "الجزائر",
        fullText: "أعلنت القيادة العامة للدرك الوطني عن إطلاق الرقم الأخضر الجديد (10 55) المخصص لتلقي بلاغات المواطنين على مدار الساعة. ويهدف هذا الخط المباشر إلى تسهيل التواصل بين المواطن ومصالح الدرك الوطني، وتلقي الإخطار حول مختلف الحوادث، بالإضافة إلى تقديم الاستفسارات حول الخدمات الأمنية. الخدمة الجديدة تأتي في إطار سياسة العصرنة والرقمنة التي تنتهجها القيادة العليا للدرك الوطني، وستمثل إضافة نوعية في مجال التواصل المؤسساتي."
      },
      {
        title: "إصلاح المنظومة القضائية",
        category: "العدالة",
        image: "photo/Large_Algerian_courtroom_interior,_Arabic_202605291312.jpeg",
        text: "وزارة العدل تعلن عن حزمة إصلاحات شاملة لتحديث المنظومة القضائية ورقمنة الخدمات العدلية.",
        date: "05 يونيو 2026",
        location: "الجزائر العاصمة",
        fullText: "أعلنت وزارة العدل عن حزمة إصلاحات شاملة تهدف إلى تحديث المنظومة القضائية الوطنية ورقمنة الخدمات العدلية. وتشمل الإصلاحات إنشاء محاكم رقمية، وتطوير أنظمة التراسل الإلكتروني بين مختلف الهيئات القضائية، وإطلاق منصة رقمية لمتابعة القضايا عن بعد. كما تتضمن الإصلاحات برامج تكوينية متخصصة للقضاة وكتاب الضبط في مجال التقنيات الحديثة. وتأتي هذه الإصلاحات تنفيذاً لتوجيهات رئيس الجمهورية الرامية إلى عصرنة القضاء وتحسين جودة الخدمات العدلية."
      },
      {
        title: "برنامج إعادة التأهيل والإدماج",
        category: "السجن",
        image: "photo/Close-up_of_prisoner_hands_gripping_202605291251.jpeg",
        text: "إطلاق برنامج وطني لإعادة تأهيل النزلاء وتكوينهم مهنياً لتسهيل إدماجهم الاجتماعي بعد الإفراج.",
        date: "04 يونيو 2026",
        location: "الجزائر",
        fullText: "أشرفت وزارة العدل على إطلاق برنامج وطني واسع لإعادة تأهيل النزلاء وتكوينهم مهنياً، وذلك بهدف تسهيل إدماجهم الاجتماعي بعد الإفراج عنهم. البرنامج الذي يمتد على مدار السنة الجارية يشمل تكوينات في عدة مجالات مهنية كالفلاحة والبناء والصناعات التقليدية والإعلام الآلي. وسيستفيد من البرنامج آلاف النزلاء عبر مختلف المؤسسات العقابية الوطنية، في إطار المقاربة الجديدة التي تركز على الجانب التأهيلي والإنساني في السياسة العقابية."
      },
      {
        title: "الفرقة الجنائية تفك لغز جريمة القتل",
        category: "تحقيقات جنائية",
        image: "photo/Masked_criminal_attempting_car_theft_202605291359.jpeg",
        text: "بعد تحقيق استمر 3 أشهر، الفرقة الوطنية للتحقيقات الجنائية تكشف ملابسات جريمة قتل مزدوج.",
        date: "05 يونيو 2026",
        location: "تيبازة",
        fullText: "تمكنت الفرقة الوطنية للتحقيقات الجنائية من كشف ملابسات جريمة قتل مزدوج هزت ولاية تيبازة قبل 3 أشهر. التحقيقات المعمقة التي استخدمت فيها أحدث التقنيات العلمية في مجال الأدلة الجنائية قادت إلى تحديد هوية الجاني الرئيسي وتوقيفه. كما تم حجز الأسلحة المستخدمة في الجريمة. وأكدت المصادر أن الجاني اعترف بارتكاب الجريمة بدافع السرقة، وأن التحقيقات لا تزال متواصلة لكشف كل الملابسات المرتبطة بهذه القضية."
      },
      {
        title: "مشاريع تنموية كبرى في الجنوب",
        category: "أخبار وطنية",
        image: "photo/برومت_الخريطة_الجزائرية__Cinematic_realistic_202605291925.jpeg",
        text: "السلطات تطلق حزمة مشاريع تنموية كبرى في الولايات الجنوبية تشمل الصحة والتعليم والبنية التحتية.",
        date: "05 يونيو 2026",
        location: "الولايات الجنوبية",
        fullText: "أشرف الوزير الأول على إطلاق حزمة مشاريع تنموية كبرى في الولايات الجنوبية، شملت قطاعات الصحة والتعليم والبنية التحتية. المشاريع التي رصدت لها ميزانية ضخمة تشمل إنشاء مستشفيات جديدة، وتجهيز مؤسسات تعليمية، وشبكات طرق، ومحطات لتحلية المياه. وتهدف هذه المشاريع إلى تحسين ظروف عيش المواطنين في الولايات الجنوبية وتعزيز التنمية المحلية، تماشياً مع برنامج رئيس الجمهورية للتنمية المستدامة."
      }
    ];
  }

  const newsData = loadNews();
  const container = document.getElementById("newsGrid");
  newsData.forEach((item, index) => {
    const article = document.createElement('article');
    article.className = 'news-card';
    article.dataset.index = index;
    article.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="news-body">
        <h3>${item.title}</h3>
        <span>${item.category}</span>
        <p>${item.text}</p>
      </div>
    `;
    container.appendChild(article);
  });

  // ============================================
  // ARTICLE MODAL
  // ============================================
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  document.body.appendChild(modalOverlay);

  function openArticle(index) {
    const item = newsData[index];
    if (!item) return;

    const related = newsData
      .filter((_, i) => i !== index)
      .slice(0, 3);

    const relatedHtml = related.map((r, i) => `
      <div class="modal-related-card" data-related-index="${newsData.indexOf(r)}">
        <img src="${r.image}" alt="${r.title}">
        <h4>${r.title}</h4>
      </div>
    `).join('');

    modalOverlay.innerHTML = `
      <div class="modal-container">
        <button class="modal-close"><i class="fas fa-times"></i></button>
        <div class="modal-image">
          <img src="${item.image}" alt="${item.title}">
          <div class="modal-image-overlay"></div>
        </div>
        <div class="modal-content">
          <div class="modal-meta">
            <span class="modal-category">${item.category}</span>
            <span class="modal-date"><i class="far fa-clock"></i> ${item.date}</span>
            <span class="modal-location"><i class="fas fa-map-marker-alt"></i> ${item.location}</span>
          </div>
          <h2 class="modal-title">${item.title}</h2>
          <div class="modal-body">
            <p>${item.fullText}</p>
          </div>
          <div class="modal-share">
            <span>شارك المقال:</span>
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-whatsapp"></i></a>
          </div>
          ${related.length ? `
          <div class="modal-related">
            <h3>مقالات ذات صلة</h3>
            <div class="modal-related-grid">${relatedHtml}</div>
          </div>` : ''}
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Close handlers
    modalOverlay.querySelector('.modal-close').addEventListener('click', closeArticle);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeArticle();
    });

    // Related news click
    modalOverlay.querySelectorAll('.modal-related-card').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.relatedIndex);
        if (!isNaN(idx)) openArticle(idx);
      });
    });
  }

  function closeArticle() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { modalOverlay.innerHTML = ''; }, 400);
  }

  // Card click to open modal
  container.addEventListener('click', (e) => {
    const card = e.target.closest('.news-card');
    if (!card) return;
    const idx = parseInt(card.dataset.index);
    if (!isNaN(idx)) openArticle(idx);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeArticle();
    }
  });

});