function toggleDropdown(id) {
    const content = document.getElementById(id);
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        // Close any other open dropdowns
        document.querySelectorAll('.dropdown-content').forEach(function(el) {
            if (el.id !== id) {
                el.style.display = 'none';
            }
        });
        content.style.display = "block";
    }
}

// Close dropdowns when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        document.querySelectorAll('.dropdown-content').forEach(function(el) {
            el.style.display = 'none';
        });
    }
}
