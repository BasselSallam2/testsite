document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.image-container');

    // دالة لإعادة ترتيب الكروت
    function shuffleCards() {
        const topCard = container.lastElementChild; // الحصول على الكرت العلوي
        if (topCard) {
            // نقوم بنقل الكرت العلوي ليصبح أول عنصر (أي في أسفل الكومة)
            container.insertBefore(topCard, container.firstElementChild);
        }
    }

    // --- منطق السحب (Swipe Logic) ---
    let startX = 0;
    let isDragging = false;

    function dragStart(event) {
        isDragging = true;
        // تحديد نقطة بداية اللمس أو السحب
        startX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function dragEnd(event) {
        if (!isDragging) return;
        isDragging = false;
        
        // تحديد نقطة نهاية اللمس أو السحب
        const endX = event.type.includes('mouse') ? event.pageX : event.changedTouches[0].clientX;
        const movedBy = endX - startX;

        // إذا كانت المسافة المسحوبة كافية (أكثر من 50 بكسل)، قم بتبديل الكرت
        if (Math.abs(movedBy) > 50) {
            shuffleCards();
        }
    }

    // ربط الأحداث
    container.addEventListener('mousedown', dragStart);
    container.addEventListener('mouseup', dragEnd);
    container.addEventListener('touchstart', dragStart);
    container.addEventListener('touchend', dragEnd);
});