let config = {
    minZoom: 7,
    maxZoom: 18,
    fullscreenControl: true,
};

const zoom = 15;
const lat = 10.7400;
const lng = 106.6350;

const map = L.map("map", config).setView([lat, lng], zoom);
map.attributionControl.setPrefix(false);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="#">LT GIS</a> cơ bản',
}).addTo(map);

let points = [
    [10.7444823, 106.6342885, "GS25 Nguyễn Văn Luông"],
    [10.7390557, 106.6267074, "GS25 Bình Phú - Cư xá Phú Lâm D"],
    [10.7453114, 106.6261304, "GS25 Bình Phú - 38 Bình Phú"],
    [10.7338687, 106.6239282, "GS25 Trần Văn Kiểu"],
    [10.7455956, 106.6342674, "GS25 Hậu Giang"],
    [10.7433795, 106.6442238, "GS25 Viva Riverside"]
];

let gs25Markers = [];

function createMarkers() {
    for (let i = 0; i < points.length; i++) {
        const [lat, lng, popupText] = points[i];
        const marker = L.marker([lat, lng], {
            draggable: true,
            autoPan: true
        })
            .bindPopup(popupText)
            .addTo(map);

        marker.on("dragend", function (e) {
            const markerPlace = document.querySelector(".marker-position");
            markerPlace.textContent = `${marker.getLatLng().lat.toFixed(5)}, ${marker.getLatLng().lng.toFixed(5)}`;
        });

        gs25Markers.push(marker);
    }
}

function removeMarkers() {
    gs25Markers.forEach(marker => map.removeLayer(marker));
    gs25Markers = [];
}

// Ban đầu tạo marker
createMarkers();

// Bắt sự kiện checkbox
document.getElementById("toggle-markers").addEventListener("change", function (e) {
    if (e.target.checked) {
        createMarkers();
    } else {
        removeMarkers();
    }
});

// Thêm chú thích
const legend = L.control({ position: "bottomleft" });

legend.onAdd = function () {
    let div = L.DomUtil.create("div", "description");
    div.innerHTML = `
    <b>Thu Điếu - Nguyễn Khuyến</b><br>
    Ao thu lạnh lẽo nước trong veo,<br>
    Một chiếc thuyền câu bé tẻo teo.<br>
    Sóng biếc theo làn hơi gợn tí,<br>
    Lá vàng trước gió sẽ đưa vèo.<br>
    Tầng mây lơ lửng trời xanh ngắt,<br>
    Ngõ trúc quanh co khách vắng teo.<br>
    Tựa gối, ôm cần lâu chẳng được,<br>
    Cá đâu đớp động dưới chân bèo.<br>
  `;
    return div;
};

legend.addTo(map);