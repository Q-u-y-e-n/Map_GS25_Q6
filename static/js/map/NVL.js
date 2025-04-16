// Cấu hình bản đồ
let config = {
    minZoom: 7,
    maxZoom: 18,
    fullscreenControl: true,
};

// Độ phóng đại khi bản đồ được mở
const zoom = 15;

// Tọa độ của bản đồ khi mở
const lat = 10.750004863768702;
const lng = 106.62999680756033;



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
    {
        lat: 10.7444823,
        lng: 106.6342885,
        name: "GS25 Nguyễn Văn Luôn",
        image: "/static/img/nvl.png",
        address: "Địa chỉ: Số 223 Đường Nguyễn Văn Luông, Phường 11, Quận 6, Thành phố Hồ Chí Minh",
        header: "Thông tin cửa hàng",
        hour: "Giờ mở cửa: Thứ hai - Chủ nhật: Mở cửa 24/24",
        phone: "Điện thoại: 028 3855 5555",
    },
    // Thêm điểm khác...
];
points.forEach(point => {
    const popupContent = `
      <div style="width: 250px;">
        <img src="${point.image}" alt="${point.name}" style="width: 100%; height: auto; border-radius: 8px; margin-left: 0.14rem; margin-top: 0.5rem"/>
       
        <h3 style="margin: 10px 0 5px;; text-align: center; color: RGB(45, 132, 203)">${point.name}</h3>
         <hr  style="margin: 10px 0; border: 1px solid #ccc;"/>
        <h4 style="margin: 2px auto; text-align: center; color: RGB(45, 132, 203)">${point.header}</h4>
        <br/>  
        <p style="margin: 0;"><i class="fa-solid fa-clock"></i> ${point.hour}</p>
        <br/>  
        <p style="margin: 0;"><i class="fa-solid fa-phone"></i> ${point.phone}</p>
        <br/>  
        <p style="margin: 0;"><i class="fa-solid fa-location-dot"></i> ${point.address}</p>
      </div>
    `;

    L.marker([point.lat, point.lng])
        .addTo(map)
        .bindPopup(popupContent);
});

const customIcon = L.icon({
    iconUrl: 'img/marker.png',
    iconSize: [30, 40],       // kích thước icon
    iconAnchor: [15, 40],     // điểm neo: đáy giữa
    popupAnchor: [0, -40]     // popup lệch lên trên icon
});

L.marker([point.lat, point.lng], { icon: customIcon })
    .addTo(map)
    .bindPopup(popupContent);


// test
document.addEventListener("DOMContentLoaded", function () {
    const map = L.map('map').setView([10.733297782731418, 106.60855165255533], 25);

    const legend = L.control({ position: "topLeft" });

    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "description");

        L.DomEvent.disableClickPropagation(div);
        const text =
            "<b>Thu Điếu - Nguyễn Khuyến</b><br>" +
            "Ao thu lạnh lẽo nước trong veo.<br>" +
            "Một chiếc thuyền câu bé tẻo teo.<br>" +
            "Sóng biếc theo làn hơi gợn tí,<br>" +
            "Lá vàng trước gió sẽ đưa vèo.<br>" +
            "Tầng mây lơ lửng trời xanh ngắt,<br>" +
            "Ngõ trúc quanh co khách vắng teo.<br>" +
            "Tựa gối, ôm cần lâu chẳng được,<br>" +
            "Cá đâu đớp động dưới chân bèo.<br>";

        div.insertAdjacentHTML("beforeend", text);
        return div;
    };


    legend.addTo(map);

    // Thêm tile layer và legend ở đây...
});




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




