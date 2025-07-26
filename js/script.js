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

// Toggle form tampil
document.querySelector("#search-icon")?.addEventListener("click", () => {
  document.querySelector("#search-form").classList.toggle("active");
});

// Tombol close
document.querySelector("#close").addEventListener("click", () => {
  document.querySelector("#search-form").classList.remove("active");

  // Reset hasil pencarian
  document.querySelector("#search-box").value = "";
  document.querySelectorAll(".menu .box").forEach((box) => {
    box.style.display = "block";
  });
});

// Fungsi pencarian
document.querySelector("#search-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const keyword = document.querySelector("#search-box").value.toLowerCase();
  const boxes = document.querySelectorAll(".menu .box");

  boxes.forEach((box) => {
    const title = box.querySelector("h3").textContent.toLowerCase();
    const desc = box.querySelector("p").textContent.toLowerCase();

    if (title.includes(keyword) || desc.includes(keyword)) {
      box.style.display = "block";
    } else {
      box.style.display = "none";
    }
  });

  document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
});

var swiper = new Swiper(".home-slider", {
  spaceBetween: 150,
  centeredSlides: true,
  speed: 800, // durasi transisi geser, makin tinggi makin halus
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
  grabCursor: true,
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
  const tanggal = document.getElementById("tanggal").value;
  const ukuran = document.getElementById("ukuran").value;
  const alamat = document.getElementById("alamat").value;
  const pesan = document.getElementById("pesan").value;

  // Susun pesan WhatsApp
  const message = `Halo Admin,%0A
Saya ingin memesan produk dengan detail berikut:%0A%0A
Nama: ${nama}%0A
No. Telp: ${telepon}%0A
Pesanan: ${pesanan}%0A
Produk Tambahan: ${tambahan}%0A
Jumlah: ${jumlah}%0A
Tanggal: ${tanggal}%0A
Ukuran: ${ukuran}%0A
Alamat: ${alamat}%0A
Pesan Tambahan: ${pesan}%0A%0A
Mohon konfirmasi ya, terima kasih.`;

  // Link WhatsApp Admin
  const adminNumber = "+6282226872587"; // tanpa tanda 0 depan
  const waUrl = `https://wa.me/${adminNumber}?text=${message}`;

  // Buka WhatsApp
  window.open(waUrl, "_blank");
});

// Tambahkan produk ke favorit (dipanggil saat klik hati produk)
function addToFavorites(event, id, name, image, price, description) {
  event.preventDefault();
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Tambahkan ke localStorage jika belum ada
  if (!favorites.some((item) => item.id === id)) {
    favorites.push({ id, name, image, price, description });

    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Produk ditambahkan ke favorit!");
  } else {
    alert("Produk sudah ada di favorit.");
  }

  // Refresh tampilan popup favorit (jika terbuka)
  refreshFavoriteList();
}

// Tampilkan popup favorit saat ikon hati di navbar diklik
document
  .getElementById("navbar-favorite-icon")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const popup = document.getElementById("favorite-popup");

    if (popup.style.display === "block") {
      popup.style.display = "none";
    } else {
      refreshFavoriteList(); // isi ulang isi popup
      popup.style.display = "block";
    }
  });

function refreshFavoriteList() {
  const list = document.getElementById("favorite-list");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    list.innerHTML = "<p>Tidak ada produk favorit.</p>";
  } else {
    list.innerHTML = "";
    favorites.forEach((item) => {
      list.innerHTML += `
          <div style="display:flex; align-items:center; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:10px;">
            <img src="${item.image}" width="50" style="margin-right:10px;" />
            <div style="flex-grow:1;">
              <strong>${item.name}</strong><br/>
              <span>${item.price}</span><br/>
              <button onclick="showProductPopup('${item.name}', '${item.image}', '${item.price}', \`${item.description}\`)" style="margin-top:5px;">Lihat</button>
              <button onclick="removeFromFavorites('${item.id}')" style="margin-top:5px; margin-left:5px; background-color:#f44336; color:white;">Hapus</button>
            </div>
          </div>
        `;
    });
  }
}

// Tampilkan popup detail produk dari favorit
function showProductPopup(title, image, price) {
  document.getElementById("popup-image").src = image;
  document.getElementById("popup-title").innerText = title;

  document.getElementById("popup-price").innerText = price;

  document.getElementById(
    "popup-buy-link"
  ).href = `https://wa.me/6282226872587?text=Halo%20admin,%20saya%20ingin%20beli%20${encodeURIComponent(
    title
  )}%20seharga%20${encodeURIComponent(price)}.%0AGambar:%20${encodeURIComponent(
    image
  )}`;

  document.getElementById("popup").style.display = "flex";
}

function removeFromFavorites(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((item) => item.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  refreshFavoriteList();
  alert("Produk dihapus dari favorit!");
}

// Tutup popup detail
function closePopup() {
  document.getElementById("popup").style.display = "none";
}
