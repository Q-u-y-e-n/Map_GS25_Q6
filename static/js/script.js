function toggleDropdown() {
    document.getElementById("dropdown").classList.toggle("show");
}

// Đóng dropdown nếu bấm ra ngoài
window.onclick = function (event) {
    if (!event.target.matches('.dropdown-btn') && !event.target.closest('.dropdown-btn')) {
        var dropdowns = document.getElementsByClassName("dropdown");
        for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].classList.remove('show');
        }
    }
}

