document.addEventListener('DOMContentLoaded', function () {
    // 1. تهيئة الخريطة
    const map = L.map('map').setView([30.0444, 31.2357], 13);

    // 2. إضافة طبقة الخريطة الأساسية
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 3. إضافة أيقونة البحث (GeoSearch)
    const provider = new GeoSearch.OpenStreetMapProvider();
    const searchControl = new GeoSearch.GeoSearchControl({
        provider: provider,
        style: 'bar', // سيظهر كشريط بحث أنيق في الأعلى
        showMarker: true,
        showPopup: false,
        autoClose: true,
        searchLabel: 'ابحث عن مكان أو عنوان...'
    });
    map.addControl(searchControl);

    // 4. دالة لإضافة دبوس مع نافذة معلومات
    function addMemoryMarker(latlng, imageUrl, visitDate) {
        const marker = L.marker(latlng).addTo(map);
        const popupContent = `
            <img src="${imageUrl}" alt="صورة الزيارة">
            <p>تاريخ الزيارة: ${visitDate}</p>
        `;
        marker.bindPopup(popupContent).openPopup();
    }

    // --- عرض الذكريات المحفوظة مسبقًا ---
    const memories = [
        { lat: 30.0596, lng: 31.2234, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400', date: '25-09-2025' },
        { lat: 29.9792, lng: 31.1342, image: 'https://images.unsplash.com/photo-1596614457235-35015b3c692f?w=400', date: '15-08-2025' }
    ];
    memories.forEach(memory => {
        addMemoryMarker([memory.lat, memory.lng], memory.image, memory.date);
    });

    // 5. إضافة دبوس جديد عند النقر على الخريطة
    map.on('click', function(e) {
        // نتجاهل النقر إذا كان شريط البحث مفتوحًا
        if (document.querySelector('.leaflet-geosearch-bar.active')) return;
        
        const latlng = e.latlng;
        const visitDate = prompt("الرجاء إدخال تاريخ الزيارة:", new Date().toLocaleDateString('ar-EG'));
        if (visitDate) {
            const imageUrl = prompt("الرجاء إدخال رابط الصورة:");
            if (imageUrl) {
                addMemoryMarker(latlng, imageUrl, visitDate);
            }
        }
    });

    // 6. تفعيل زر تحديد الموقع
    const locateBtn = document.getElementById('locate-btn');
    locateBtn.addEventListener('click', function() {
        map.locate({ setView: true, maxZoom: 16 });
    });

    // عند العثور على الموقع بنجاح
    map.on('locationfound', function(e) {
        L.marker(e.latlng).addTo(map)
            .bindPopup("<strong>أنت هنا!</strong>").openPopup();
    });

    // في حال فشل العثور على الموقع
    map.on('locationerror', function(e) {
        alert("فشل تحديد الموقع: " + e.message);
    });
});