// Cấu hình bản đồ
let config = {
    minZoom: 7,
    maxZoom: 18
};

// Độ phóng đại khi bản đồ được mở
const zoom = 15;

// Tọa độ của bản đồ khi mở
const lat = 10.7400;
const lng = 106.6350;

// Khởi tạo bản đồ
const map = L.map("map", config).setView([lat, lng], zoom);
map.attributionControl.setPrefix(false);

// Được dùng để tải và trình các layer trên bản đồ
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href=">LT GIS</a> cơ bản',
}).addTo(map);

// Tạo danh sách các địa điểm gồm vĩ độ, kinh độ và tên của địa điểm đó
// Tạo danh sách các địa điểm gồm vĩ độ, kinh độ và tên của địa điểm đó
let points = [
    [10.7444823, 106.6342885, "GS25 Nguyễn Văn Luông"],
    [10.7390557, 106.6267074, "GS25 Bình Phú - Cư xá Phú Lâm D"],
    [10.7453114, 106.6261304, "GS25 Bình Phú - 38 Bình Phú"],
    [10.7338687, 106.6239282, "GS25 Trần Văn Kiểu"],
    [10.7455956, 106.6342674, "GS25 Hậu Giang"],
    [10.7433795, 106.6442238, "GS25 Viva Riverside"]
];

// Tạo 1 vòng lặp để thực hiện thêm nhiều marker vào bản đồ
// loop that adds many markers to the map
for (let i = 0; i < points.length; i++) {
    const [lat, lng, popupText] = points[i];
    const marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    })
        .bindPopup(popupText)
        .addTo(map);

    // Kéo thả maker
    marker.on("dragend", function (e) {
        const markerPlace = document.querySelector(".marker-position");
        markerPlace.textContent = `${marker.getLatLng().lat}, ${marker.getLatLng().lng}`;
    });
}
