let menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

let section = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header .navbar a");

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");

  section.forEach((sec) => {
    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header .navbar a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};

document.querySelector("#search-icon").onclick = () => {
  document.querySelector("#search-form").classList.toggle("active");
};

document.querySelector("#close").onclick = () => {
  document.querySelector("#search-form").classList.remove("active");
};

var swiper = new Swiper(".home-slider", {
  spaceBetween: 150,
  centeredSlides: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
});

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  loop: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

function loader() {
  document.querySelector(".loader-container").classList.add("fade-out");
}

function fadeOut() {
  setInterval(loader, 3000);
}

window.onload = fadeOut;

document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Ambil nilai dari setiap input
  const nama = document.getElementById("nama").value;
  const telepon = document.getElementById("telepon").value;
  const pesanan = document.getElementById("pesanan").value;
  const tambahan = document.getElementById("tambahan").value;
  const jumlah = document.getElementById("jumlah").value;
  const waktu = document.getElementById("waktu").value;
  const alamat = document.getElementById("alamat").value;
  const pesan = document.getElementById("pesan").value;

  // Susun pesan WhatsApp
  const message = `Halo Admin,%0A
Saya ingin memesan produk dengan detail berikut:%0A%0A
🧍 Nama: ${nama}%0A
📞 No. Telp: ${telepon}%0A
📦 Pesanan: ${pesanan}%0A
➕ Produk Tambahan: ${tambahan}%0A
🔢 Jumlah: ${jumlah}%0A
📅 Waktu & Tanggal: ${waktu}%0A
📍 Alamat: ${alamat}%0A
📝 Pesan Tambahan: ${pesan}%0A%0A
Mohon konfirmasi ya, terima kasih.`;

  // Link WhatsApp Admin
  const adminNumber = "+6282226872587"; // tanpa tanda 0 depan
  const waUrl = `https://wa.me/${adminNumber}?text=${message}`;

  // Buka WhatsApp
  window.open(waUrl, "_blank");
});
