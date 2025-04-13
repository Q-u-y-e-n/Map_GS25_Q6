// Cấu hình bản đồ
let config = {
    minZoom: 7,
    maxZoom: 18,
    fullscreenControl: true, // Thêm button fullscreen trên bản đồ
};

// Độ phóng đại khi bản đồ được mở
const zoom = 18;

// Toạ độ mặc định
const lat = 10.796501883372228;
const lng = 106.66680416611385;

// Khởi tạo bản đồ
const map = L.map("map", config).setView([lat, lng], zoom);
map.attributionControl.setPrefix(false);

// Bước dựng để tải và trình các layer trên bản đồ
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='#'>LT GIS</a> cơ bản",
}).addTo(map);

// Xử lý định vị vị trí hiện tại
map.locate({
    setView: true,
    enableHighAccuracy: true,
})
    .on("locationfound", (e) => {
        // marker
        const marker = L.marker([e.latitude, e.longitude]).bindPopup("You are here :)");
        const circle = L.circle([e.latitude, e.longitude], e.accuracy / 2, {
            weight: 2,
            color: "red",
            fillColor: "red",
            fillOpacity: 0.1,
        });

        map.addLayer(marker);
        map.addLayer(circle);
    })
    .on("locationerror", () => {
        alert("Location access denied.");
    });

// Tuỳ chỉnh icon marker
const funny = L.icon({
    iconUrl: "https://cntt.pnk.io.vn/ts-map-pin.png",
    iconSize: [50, 58],
    iconAnchor: [22, 58],
    popupAnchor: [0, -60],
});

// Nội dung popup tùy chỉnh
const customPopup = `
    <iframe width="560" height="315" src="https://www.youtube.com/embed/7WhSL0E1eM?si=dT73sU7QuBD8bkVY"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
    </iframe>
`;




// Tuỳ chỉnh popup
const customOptions = {
    maxWidth: "auto",
    className: "customPopup",
};


// Thêm marker vào bản đồ
L.marker([lat, lng], { icon: funny })
    .bindPopup(customPopup, customOptions)
    .addTo(map);

// Xử lý tìm kiếm địa điểm với Autocomplete
window.addEventListener("DOMContentLoaded", function () {
    new Autocomplete("search", {
        delay: 1000,
        selectFirst: true,
        howManyCharacters: 2,

        onSearch: function ({ currentValue }) {
            const api = `https://nominatim.openstreetmap.org/search?format=geojson&limit=5&q=${encodeURI(currentValue)}`;

            return new Promise((resolve) => {
                fetch(api)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Dữ liệu từ API:", data); // Debug dữ liệu trả về
                        resolve(data.features);
                    })
                    .catch((error) => {
                        console.error("Lỗi gọi API:", error);
                    });
            });
        },

        // Xử lý kết quả từ API
        onResults: ({ currentValue, matches, template }) => {
            if (matches.length === 0) return template(`<li>No results found: "${currentValue}"</li>`);

            return matches
                .map((element) => {
                    return `
                        <li class="loupe" role="option">
                            ${element.properties.display_name.replace(
                        new RegExp(currentValue, "i"),
                        (str) => `<b>${str}</b>`
                    )}
                        </li>`;
                })
                .join("");
        },

        onSubmit: ({ object }) => {
            const { display_name } = object.properties;
            const coord = object.geometry.coordinates;

            // Xóa marker cũ nếu có
            map.eachLayer(function (layer) {
                if (layer instanceof L.Marker && !layer._icon.classList.contains("leaflet-marker-icon")) {
                    map.removeLayer(layer);
                }
            });

            // Tạo marker mới
            const marker = L.marker([coord[1], coord[0]], {
                title: display_name,
            });

            marker.addTo(map).bindPopup(display_name).openPopup();
            map.setView([coord[1], coord[0]], 14);
        },

        onSelectedItem: ({ index, element, object }) => {
            console.log("onSelectedItem:", index, element, object);
        },

        noResults: ({ currentValue, template }) =>
            template(`<li>No results found: "${currentValue}"</li>`),
    });

    // Thêm phần chú thích trên bản đồ
    const legend = L.control({ position: "bottomleft" });

    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "description");
        L.DomEvent.disableClickPropagation(div);

        const text =
            "<b>Thu Điếu - Nguyễn Khuyến</b><br>" +
            "Ao thu lạnh lẽo nước trong veo,<br>" +
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


});
// //Được dùng để tải và trình các layer trên bản đồ 
// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: '&copy; <a href="#">LT GIS</a> cơ bản',
// }).addTo(map);

// Thêm lớp bản đồ nền từ OpenStreetMap
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="#">LT GIS</a> cơ bản',
}).addTo(map);



map.locate({
    // Kích hoạt chế độ xem bản đồ khi tìm thấy vị trí
    setView: true,
    enableHighAccuracy: true, // Sử dụng GPS có độ chính xác cao
})
    .on("locationfound", (e) => {
        // Tạo marker hiển thị vị trí hiện tại
        const marker = L.marker([e.latitude, e.longitude])
            .bindPopup("You are here :)");

        // Tạo vòng tròn xung quanh vị trí
        const circle = L.circle([e.latitude, e.longitude], e.accuracy / 2, {
            weight: 2,
            color: "red",
            fillColor: "red",
            fillOpacity: 0.1,
        });

        // Thêm marker và vòng tròn vào bản đồ
        map.addLayer(marker);
        map.addLayer(circle);
    })
    .on("locationerror", () => {
        alert("Location access denied.");
    });


// map
//     .locate({
//         // https://leafletjs.com/reference-1.7.1.html#locate-options-option
//         setView: true,
//         enableHighAccuracy: true,
//     })
//     // if location found show marker and circle
//     .on("locationfound", (e) => {
//         // marker





// [topleft, topright, bottomleft, bottomright]
L.control.zoom({ position: "topright" }).addTo(map);
// holder for all articles
const articles = document.querySelectorAll("article");
// setting a marker
function setMarker([lat, lng], title) {
    const marker = L.marker([lat, lng], { title });
    // add a marker to the map and create a popup
    marker.addTo(map).bindPopup(title);
}
// map centering
function centerMap([lat, lng], target, title) {
    const active = target.classList.contains("active");
    // set the map to lat coordinates, lng
    map.setView([lat, lng], 16);
    // checking if the active class is already
    // set, if not, set the marker
    if (!active) {
        setMarker([lat, lng], title);
    }
}
// helper function to intersectionObserver
function onChange(changes) {
    changes.forEach(function (change) {
        // get data from html coordinates element
        const data = change.target.dataset.coordinates;
        // get title from html
        const title = change.target.dataset.title;
        if (change.intersectionRatio > 0) {
            // center map
            centerMap(JSON.parse(data), change.target, title);
            // add class to article
            change.target.classList.add("active");
        }
    });
}
// checking if IntersectionObserver is supported
if ("IntersectionObserver" in window) {
    const config = {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
    };
    let observer = new IntersectionObserver(onChange, config);
    articles.forEach(function (article) {
        observer.observe(article);
    });
}