// --- منطق العداد التصاعدي ---
document.addEventListener('DOMContentLoaded', () => {
    // ضع التاريخ الذي تريد بدء العد منه هنا (السنة، الشهر-1، اليوم)
    const startDate = new Date(2025, 8, 9, 0, 0, 0); // 9 سبتمبر 2025

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCounter() {
        const now = new Date();
        const diffInSeconds = Math.floor((now - startDate) / 1000);

        if (diffInSeconds < 0) return; // لا تبدأ العد قبل التاريخ المحدد

        const d = Math.floor(diffInSeconds / (3600 * 24));
        const h = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
        const m = Math.floor((diffInSeconds % 3600) / 60);
        const s = Math.floor(diffInSeconds % 60);

        // تحديث الأرقام على الشاشة
        daysEl.innerText = d;
        hoursEl.innerText = h < 10 ? '0' + h : h;
        minutesEl.innerText = m < 10 ? '0' + m : m;
        secondsEl.innerText = s < 10 ? '0' + s : s;
    }

    // قم بتشغيل الدالة كل ثانية
    setInterval(updateCounter, 1000);

    // قم بتشغيلها مرة واحدة فوراً عند تحميل الصفحة
    updateCounter();

    // ... باقي كود الجافاسكريبت الخاص بك ...
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.image-container');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');

    // --- عناصر نافذة الرسالة المنبثقة ---
    const messageModal = document.getElementById('message-modal');
    const openModalButton = document.getElementById('envelope-button');
    const closeModalButton = document.getElementById('close-modal-button');

    // دالة تبديل الكروت
    function shuffleCards() {
        const topCard = container.lastElementChild;
        if (topCard) {
            container.insertBefore(topCard, container.firstElementChild);
        }
    }

    // دوال فتح وإغلاق اللايت بوكس للصور
    function openLightbox(src) {
        lightboxImage.src = src;
        lightbox.classList.add('visible');
    }
    function closeLightbox() {
        lightbox.classList.remove('visible');
    }

    // --- دوال فتح وإغلاق نافذة الرسالة ---
    function openMessageModal() {
        messageModal.classList.add('visible');
    }
    function closeMessageModal() {
        messageModal.classList.remove('visible');
    }

    // --- ربط الأحداث ---
    openModalButton.addEventListener('click', openMessageModal);
    closeModalButton.addEventListener('click', closeMessageModal);
    messageModal.addEventListener('click', (event) => {
        // الإغلاق فقط عند الضغط على الخلفية السوداء وليس على المحتوى
        if (event.target === messageModal) {
            closeMessageMessage();
        }
    });

    lightbox.addEventListener('click', closeLightbox);
    lightboxImage.addEventListener('click', (event) => event.stopPropagation());


    // --- منطق السحب والنقر على الصور ---
    let isDragging = false;
    let startX = 0, startY = 0;

    function onPointerDown(event) {
        isDragging = true;
        startX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        startY = event.type.includes('mouse') ? event.pageY : event.touches[0].clientY;
    }

    function onPointerUp(event) {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = event.type.includes('mouse') ? event.pageX : event.changedTouches[0].clientX;
        const endY = event.type.includes('mouse') ? event.pageY : event.changedTouches[0].clientY;
        
        const movedByX = Math.abs(endX - startX);
        const movedByY = Math.abs(endY - startY);

        if (movedByX > 40 && movedByY < 40) {
            shuffleCards();
        } else if (movedByX < 10 && movedByY < 10) {
            const topCard = container.lastElementChild;
            if (topCard) {
                openLightbox(topCard.src);
            }
        }
    }
    
    container.addEventListener('mousedown', onPointerDown);
    container.addEventListener('mouseup', onPointerUp);
    container.addEventListener('mouseleave', () => { isDragging = false; });

    // *** تم تصحيح الخطأ هنا ***
    // كانت 'on-PointerDown' وأصبحت 'onPointerDown'
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    container.addEventListener('touchend', onPointerUp);
});