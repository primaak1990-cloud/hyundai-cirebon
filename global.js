/* ==============================
   HAMBURGER MENU
==============================*/
function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  if(menu) menu.classList.toggle("active");
}

function closeMenu() {
  const menu = document.getElementById("sideMenu");
  if(menu) menu.classList.remove("active");
}

/* ==============================
   ACCORDION
==============================*/
function toggleAccordion(id) {
  const content = document.getElementById(id);
  if(content) content.classList.toggle("active");
}

/* ==============================
   FILTER UNIT (FIX TOTAL)
==============================*/
function filterUnit(unit){
  const cards = document.querySelectorAll(".unit-card");

  cards.forEach(card=>{
    const title = card.querySelector("h2");
    if(!title) return;

    const namaUnit = title.innerText.trim().toLowerCase();

    if(unit === "all"){
      card.style.display = "block";
    } else {
      if(namaUnit.includes(unit.toLowerCase())){
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    }
  });
}

/* ==============================
   DATA MOBIL LENGKAP 2026
==============================*/
const mobilData = {

  "Stargazer": {
    "Active MT": 259700000,
    "Active IVT": 273100000,
    "Essential MT 7 Seat": 271800000,
    "Essential MT 6 Seat": 272800000,
    "Essential IVT 7 Seat": 283500000,
    "Essential IVT 6 Seat": 284500000,
    "Essential Tech 7 Seat": 304000000,
    "Essential Tech 6 Seat": 305000000,
    "Prime IVT 7 Seat 1 Tone": 333400000,
    "Prime IVT 7 Seat 2 Tone": 334900000,
    "Prime IVT 6 Seat 1 Tone": 334400000,
    "Prime IVT 6 Seat 2 Tone": 335900000,
    "Style 6 Seat": 350950000,
    "X Prime 6 Seat One Tone Roof": 361300000,
    "X Prime 6 Seat Two Tone Roof": 362800000,
    "X Style 7 Seat": 349450000,
    "X Prime 7 Seat One Tone Roof": 360300000,
    "X Prime 7 Seat Two Tone Roof": 361800000
  },

  "Stargazer Cartenz": {
    "Trend MT": 277500000,
    "Trend IVT": 287750000,
    "Style MT 7 Seat": 298000000,
    "Style MT Captain Seat": 301500000,
    "Style IVT 7 Seat": 308200000,
    "Style IVT Captain Seat": 311700000,
    "Smart IVT 7 Seat": 341750000,
    "Smart IVT Captain Seat": 345250000,
    "Prime IVT 7 Seat": 359700000,
    "Prime IVT Captain Seat": 363200000,
    "Cartenz X Trend 7 Seat": 371750000,
    "Cartenz X Trend Captain Seat": 375250000,
    "Cartenz X Style 7 Seat": 385200000,
    "Cartenz X Style Captain Seat": 388700000,
    "Cartenz X Prime Package 7 Seat": 402200000,
    "Cartenz X Prime Package Captain Seat": 405700000
  },

  "Kona EV": {
    "Style Regular": 566250000,
    "Prime Regular": 584500000,
    "Prime Extended": 635500000,
    "Signature Regular": 652650000,
    "Signature Extended": 669550000,
    "Signature Extended Two Tone": 672550000,
    "Signature Regular Two Tone": 655650000,
    "N Line": 690550000,
    "N Line Two Tone": 693550000
  },

  "IONIQ 5": {
    "Signature Extended": 926600000,
    "Signature Regular": 874900000,
    "Prime Extended": 852500000,
    "Prime Regular": 810000000
  },

  "Santa Fe": {
    "G 2.5 8AT Prime": 737300000,
    "G 2.5 8AT Calligraphy": 826800000,
    "D 1.6 8AT HEV Prime": 828900000,
    "D 1.6 8AT HEV Calligraphy": 916200000
  },

  "Palisade": {
    "HEV Signature GRG": 1133400000,
    "HEV Calligraphy GRA": 1306200000,
    "HEV Calligraphy AWD GRA": 1393300000
  }

};

/* ==============================
   POPUP SIMULASI
==============================*/
function openSimulasi(unit, type, harga) {
  const modal = document.getElementById("simulasiModal");
  if(modal) modal.style.display = "flex";

  if(unit){
    const unitSelect = document.getElementById("unitSelect");
    if(unitSelect){
      unitSelect.value = unit;
      loadType();
    }
  }

  if(type){
    const typeSelect = document.getElementById("typeSelect");
    if(typeSelect) typeSelect.value = type;
  }

  if(harga){
    const hargaInput = document.getElementById("hargaOTR");
    if(hargaInput) hargaInput.value = harga;
  }
}

function closeSimulasi() {
  const modal = document.getElementById("simulasiModal");
  if(modal) modal.style.display = "none";
}

function loadType(){
  const unitSelect = document.getElementById("unitSelect");
  const typeSelect = document.getElementById("typeSelect");

  if(!unitSelect || !typeSelect) return;

  const unit = unitSelect.value;
  typeSelect.innerHTML = '<option value="">Pilih Type</option>';

  if(mobilData[unit]){
    for(let type in mobilData[unit]){
      let option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      typeSelect.appendChild(option);
    }
  }
}

function isiOTR(){
  const unit = document.getElementById("unitSelect")?.value;
  const type = document.getElementById("typeSelect")?.value;

  if(unit && type && mobilData[unit] && mobilData[unit][type]){
    document.getElementById("hargaOTR").value = mobilData[unit][type];
  }
}

/* ==============================
   HITUNG CICILAN
==============================*/
function hitungSimulasi(){

  let harga = parseFloat(document.getElementById("hargaOTR")?.value);
  let dpPersen = parseFloat(document.getElementById("dpPersen")?.value);
  let tenor = parseInt(document.getElementById("tenor")?.value);

  if(!harga || !dpPersen || !tenor){
    document.getElementById("hasilCicilan").innerHTML = "Lengkapi data!";
    return;
  }

  let dp = harga * dpPersen / 100;
  let sisa = harga - dp;
  let bunga = sisa * (0.05 * tenor);
  let total = sisa + bunga;
  let cicilan = total / (tenor * 12);

  document.getElementById("hasilCicilan").innerHTML =
    "DP: Rp " + dp.toLocaleString("id-ID") +
    "<br>Angsuran/Bulan: Rp " +
    Math.round(cicilan).toLocaleString("id-ID") +
    "<br><br><small>*Simulasi ini bukan perhitungan resmi leasing / bank. Hasil dapat berbeda sesuai kebijakan pembiayaan.</small>";
}

/* ==============================
   TEST DRIVE
==============================*/
function openTestDrive(){
  const modal = document.getElementById("testDriveModal");
  if(modal) modal.style.display = "flex";
}

function closeTestDrive(){
  const modal = document.getElementById("testDriveModal");
  if(modal) modal.style.display = "none";
}

function kirimTestDrive(){

  let nama = document.getElementById("tdNama")?.value;
  let alamat = document.getElementById("tdAlamat")?.value;
  let hp = document.getElementById("tdHP")?.value;
  let unit = document.getElementById("tdUnit")?.value;
  let tanggal = document.getElementById("tdTanggal")?.value;
  let lokasi = document.getElementById("tdLokasi")?.value;

  if(!nama || !alamat || !hp || !unit || !tanggal || !lokasi){
    alert("Lengkapi data!");
    return;
  }

  let pesan =
`Halo Ardi Hyundai,

Permintaan Test Drive:

Nama: ${nama}
Alamat: ${alamat}
No HP: ${hp}
Unit: ${unit}
Tanggal: ${tanggal}
Lokasi: ${lokasi}`;

  window.open("https://wa.me/6287772805133?text=" + encodeURIComponent(pesan));
}

function formatRupiah(angka){
  return "Rp " + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function isiOTR(){
  const unit = document.getElementById("unitSelect").value;
  const type = document.getElementById("typeSelect").value;

  if(mobilData[unit] && mobilData[unit][type]){
    const harga = mobilData[unit][type];
    document.getElementById("hargaOTR").value = formatRupiah(harga);
  }
}

function setDPMode(){
  const mode = document.getElementById("dpMode").value;
  const dpInput = document.getElementById("dpInput");

  if(mode === "manual"){
    dpInput.style.display = "block";
  }else{
    dpInput.style.display = "none";
  }
}

function hitungSimulasi(){
  const hargaText = document.getElementById("hargaOTR").value.replace(/\D/g,'');
  const harga = parseInt(hargaText);

  const tenor = parseInt(document.getElementById("tenor").value);
  const dpMode = document.getElementById("dpMode").value;
  let dp;

  if(dpMode === "manual"){
    dp = parseInt(document.getElementById("dpInput").value.replace(/\D/g,''));
  }else{
    dp = harga * 0.2;
  }

  const pokok = harga - dp;
  const bunga = 0.05; 
  const total = pokok + (pokok * bunga * tenor);
  const cicilan = total / (tenor * 12);

  document.getElementById("hasilCicilan").innerHTML =
    "DP: " + formatRupiah(Math.round(dp)) + "<br>" +
    "Cicilan / bulan: <b>" + formatRupiah(Math.round(cicilan)) + "</b>";
}
