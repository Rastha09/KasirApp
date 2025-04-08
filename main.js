function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const savedUser = localStorage.getItem("username");
  const savedPass = localStorage.getItem("password");

  if (username === savedUser && password === savedPass) {
    localStorage.setItem("loggedIn", true);
    window.location.href = "index.html";
  } else {
    alert("Login gagal. Periksa username dan password.");
  }
}

function register() {
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;

  if (username && password) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    alert("Pendaftaran berhasil, silakan login.");
    window.location.href = "login.html";
  } else {
    alert("Mohon isi semua data.");
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

function simpanPengaturan() {
  const logo = document.getElementById("logoInput").files[0];
  const qris = document.getElementById("qrisInput").files[0];

  if (logo) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("logoPreview").src = e.target.result;
      localStorage.setItem("logo", e.target.result);
    };
    reader.readAsDataURL(logo);
  }

  if (qris) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("qrisPreview").src = e.target.result;
      localStorage.setItem("qris", e.target.result);
    };
    reader.readAsDataURL(qris);
  }

  localStorage.setItem("namaToko", document.getElementById("namaToko").value);
}

function cetakStruk() {
  const namaToko = document.getElementById("namaToko").value;
  const barang = document.getElementById("barang").value;
  const harga = document.getElementById("harga").value;
  const logo = document.getElementById("logoPreview").src;
  const qris = document.getElementById("qrisPreview").src;
  const metode = document.getElementById("metodeCetak").value;

  const strukHTML = `
    <img src="${logo}" style="max-width:80px;margin:10px auto;">
    <h3>${namaToko}</h3>
    <p>Barang: ${barang}</p>
    <p>Harga: Rp ${parseInt(harga).toLocaleString()}</p>
    <img src="${qris}" style="max-width:120px;margin:10px auto;">
    <p>${new Date().toLocaleString()}</p>
  `;

  document.getElementById("outputStruk").innerHTML = strukHTML;
  document.getElementById("outputStruk").style.display = "block";

  if (metode === "manual") {
    document.getElementById("simpanStrukBtn").style.display = "inline-block";
  } else {
    document.getElementById("simpanStrukBtn").style.display = "none";
    alert("Fitur cetak Bluetooth akan aktif di versi build.");
  }
}


document.addEventListener("DOMContentLoaded", function() {
  if (localStorage.getItem("logo")) {
    document.getElementById("logoPreview").src = localStorage.getItem("logo");
  }
  if (localStorage.getItem("qris")) {
    document.getElementById("qrisPreview").src = localStorage.getItem("qris");
  }
  if (localStorage.getItem("namaToko")) {
    document.getElementById("namaToko").value = localStorage.getItem("namaToko");
  }
});

function simpanStrukKeGambar() {
  const element = document.getElementById("outputStruk");
  html2canvas(element).then(canvas => {
    const link = document.createElement('a');
    link.download = 'struk.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}
