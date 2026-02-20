// ===============================
// DATA UNIT & TYPE (FULL)
// ===============================
const dataMobil = {

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
    "X Prime 6 Seat 1 Tone": 361300000,
    "X Prime 6 Seat 2 Tone": 362800000,
    "X Style 7 Seat": 349450000,
    "X Prime 7 Seat 1 Tone": 360300000,
    "X Prime 7 Seat 2 Tone": 361800000
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
    "Trend X 7 Seat": 371750000,
    "Trend X Captain": 375250000,
    "Style X 7 Seat": 385200000,
    "Style X Captain": 388700000,
    "Prime Package 7 Seat": 402200000,
    "Prime Package Captain": 405700000
  },

  "Creta": {
    "Active MT": 291300000,
    "Trend MT": 313500000,
    "Trend IVT": 334600000,
    "Style IVT": 376500000,
    "Prime IVT": 404000000
  },

  "Kona EV": {
    "Style Reguler": 566250000,
    "Prime Reguler": 584500000,
    "Prime Extended": 635500000,
    "Signature Reguler": 652650000,
    "Signature Reguler Two Tone": 655650000,
    "Signature Extended": 669550000,
    "Signature Extended Two Tone": 672550000,
    "N Line": 690550000,
    "N Line Two Tone": 693550000
  },

  "IONIQ 5": {
    "Signature Extended": 926600000,
    "Signature Reguler": 874900000,
    "Prime Extended": 852500000,
    "Prime Reguler": 810000000
  },

  "Santa Fe": {
    "G 2.5 Prime": 737300000,
    "G 2.5 Calligraphy": 826800000,
    "HEV Prime": 828900000,
    "HEV Calligraphy": 916200000
  },

  "Palisade": {
    "HEV Signature GRG": 1133400000,
    "HEV Calligraphy GRA": 1306200000,
    "HEV Calligraphy AWD GRA": 1393300000
  }
};


// ===============================
// FORMAT RUPIAH
// ===============================
function formatRupiah(angka){
  return angka.toLocaleString("id-ID");
}


// ===============================
// LOAD TYPE OTOMATIS
// ===============================
function loadType(){
  const unit = document.getElementById("unitSelect").value;
  const typeSelect = document.getElementById("typeSelect");

  typeSelect.innerHTML = '<option value="">Pilih Type</option>';

  if(dataMobil[unit]){
    for(let type in dataMobil[unit]){
      let option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      typeSelect.appendChild(option);
    }
  }
}


// ===============================
// ISI OTR OTOMATIS
// ===============================
function isiOTR(){
  const unit = document.getElementById("unitSelect").value;
  const type = document.getElementById("typeSelect").value;

  if(dataMobil[unit] && dataMobil[unit][type]){
    document.getElementById("hargaOTR").value =
      formatRupiah(dataMobil[unit][type]);
  }
}


// ===============================
// DP 20% OTOMATIS
// ===============================
function isiDP20(){
  const harga = parseInt(
    document.getElementById("hargaOTR").value.replace(/\./g,'')
  );

  const dp = harga * 0.2;

  document.getElementById("dpManual").value =
    formatRupiah(dp);
}


// ===============================
// HITUNG SIMULASI
// ===============================
function hitungSimulasi(){

  const harga = parseInt(
    document.getElementById("hargaOTR").value.replace(/\./g,'')
  );

  const dp = parseInt(
    document.getElementById("dpManual").value.replace(/\./g,'')
  );

  const tenor = parseInt(document.getElementById("tenor").value);

  const bunga = 0.05;

  const pokok = harga - dp;
  const total = pokok + (pokok * bunga * tenor);
  const cicilan = Math.round(total / (tenor * 12));

  document.getElementById("hasilSimulasi").innerHTML =
    "DP: Rp " + formatRupiah(dp) +
    "<br>Cicilan / bulan: Rp " + formatRupiah(cicilan) +
    '<div class="note">*Hitungan ini hanya simulasi estimasi</div>';
}


// ===============================
// HAMBURGER MENU
// ===============================
function toggleMenu(){
  document.getElementById("sideMenu").classList.toggle("active");
}

function closeMenu(){
  document.getElementById("sideMenu").classList.remove("active");
}
