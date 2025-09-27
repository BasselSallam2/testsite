document.addEventListener('DOMContentLoaded', () => {
    const timeElements = document.querySelectorAll('.mood-timestamp');

    function updateTimestamps() {
        const now = new Date();

        timeElements.forEach(element => {
            const timestamp = new Date(element.getAttribute('data-timestamp'));
            const diffInSeconds = Math.floor((now - timestamp) / 1000);

            let timeAgo;

            if (diffInSeconds < 60) {
                timeAgo = "الآن";
            } else if (diffInSeconds < 3600) {
                const minutes = Math.floor(diffInSeconds / 60);
                timeAgo = `منذ ${minutes} ${minutes === 1 ? 'دقيقة' : 'دقائق'}`;
            } else if (diffInSeconds < 86400) {
                const hours = Math.floor(diffInSeconds / 3600);
                timeAgo = `منذ ${hours} ${hours === 1 ? 'ساعة' : 'ساعات'}`;
            } else {
                const days = Math.floor(diffInSeconds / 86400);
                timeAgo = `منذ ${days} ${days === 1 ? 'يوم' : 'أيام'}`;
            }

            element.innerText = timeAgo;
        });
    }

    // قم بتحديث الوقت كل دقيقة (60000 ميلي ثانية)
    setInterval(updateTimestamps, 60000);

    // قم بالتحديث فورًا عند تحميل الصفحة
    updateTimestamps();
});