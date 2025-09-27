document.addEventListener('DOMContentLoaded', function () {
    // 1. تهيئة الخريطة
    const map = L.map('map').setView([30.0444, 31.2357], 13);

    // 2. إضافة طبقة الخريطة الأساسية
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 3. تفعيل خاصية البحث (GeoSearch)
    const searchControl = new GeoSearch.GeoSearchControl({
        provider: new GeoSearch.OpenStreetMapProvider(),
        style: 'bar', // شكل شريط البحث
        autoClose: true, // إغلاق النتائج بعد الاختيار
        searchLabel: 'ابحث عن مكان...',
        keepResult: true,
    });
    map.addControl(searchControl);

    // 4. دالة لإضافة دبوس مع معلومات (تبقى كما هي)
    function addMemoryMarker(lat, lng, imageUrl, visitDate) {
        const marker = L.marker([lat, lng]).addTo(map);
        const popupContent = `
            <img src="${imageUrl}" alt="صورة الزيارة">
            <p>تاريخ الزيارة: ${visitDate}</p>
        `;
        marker.bindPopup(popupContent);
    }

    // --- مثال لإضافة ذكريات محفوظة مسبقًا ---
    const memories = [
        { lat: 30.0596, lng: 31.2234, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400', date: '25-09-2025' },
        { lat: 29.9792, lng: 31.1342, image: 'https://images.unsplash.com/photo-1596614457235-35015b3c692f?w=400', date: '15-08-2025' }
    ];
    memories.forEach(memory => {
        addMemoryMarker(memory.lat, memory.lng, memory.image, memory.date);
    });

    // 5. السماح للمستخدم بإضافة دبوس جديد عند النقر على الخريطة (تبقى كما هي)
    map.on('click', function(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        const visitDate = prompt("الرجاء إدخال تاريخ الزيارة:", new Date().toLocaleDateString('ar-EG'));
        if (visitDate) {
            const imageUrl = prompt("الرجاء إدخال رابط الصورة:");
            if (imageUrl) {
                addMemoryMarker(lat, lng, imageUrl, visitDate);
            }
        }
    });

    // 6. تفعيل خاصية تحديد الموقع الحالي
    const locateBtn = document.getElementById('locate-btn');
    locateBtn.addEventListener('click', function() {
        map.locate({ setView: true, maxZoom: 16 });
    });

    // عند العثور على الموقع بنجاح
    map.on('locationfound', function(e) {
        L.marker(e.latlng).addTo(map)
            .bindPopup("أنت هنا!").openPopup();
    });

    // في حال فشل العثور على الموقع
    map.on('locationerror', function(e) {
        alert("لا يمكن الوصول لموقعك. الرجاء التأكد من تفعيل خدمات الموقع في متصفحك.");
    });
});