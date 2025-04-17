let config = {
    minZoom: 7,
    maxZoom: 18,
    fullscreenControl: true,
};

const zoom = 17;
const lat = 10.74537;
const lng = 106.62661;



const map = L.map("map", config).setView([lat, lng], zoom);
map.attributionControl.setPrefix(false);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="#">LT GIS</a> cơ bản',
}).addTo(map);

let points = [

    [10.7453114, 106.6261304, "GS25 40 - 42 Bình Phú"],

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
    <div style="width: 250px; margin-left: 0.9rem; margin-top: 0.5rem;">
        <img src="/static/img/BP40.png" alt="hong có" style="width: 100%; height: auto; border-radius: 8px; margin-left: 0.14rem; margin-top: 0.5rem"/>
       
        <h3 style="margin: 10px 0 5px;; text-align: center; color: RGB(45, 132, 203)">GS25 40 - 42 Bình Phú</h3>
         <hr  style="margin: 10px 0; border: 1px solid #ccc;"/>
        <h4 style="margin: 2px auto; text-align: center; color: RGB(45, 132, 203)">Thông tin cửa hàng</h4>
        <br/>  
        <p style="margin: 0;"><i class="fa-solid fa-clock"></i> Giờ mở cửa - đóng cửa <br/> Thứ 2 - Chủ nhật: Mở cửa cả ngày
</p>
        <br/>  
        <p style="margin: 0;"><i class="fa-solid fa-phone"></i> Số điện thoại: (028) 71025204</p>
        <br/>  
        <p style="margin: 0;"><i class="fa-solid fa-location-dot"></i> Địa chỉ: 40 – 42 Bình Phú, Phường 11, Quận 6, Thành phố Hồ Chí Minh</p>
      </div>
  `;
    return div;
};

legend.addTo(map);