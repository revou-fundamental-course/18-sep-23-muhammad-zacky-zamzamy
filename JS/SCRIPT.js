// Mengambil elemen input
const usiaInput = document.getElementById("usia");
const beratInput = document.getElementById("berat");
const tinggiInput = document.getElementById("tinggi");

// Mengambil elemen error
const usiaError = document.querySelector("#usia + .error");
const beratError = document.querySelector("#berat + .error");
const tinggiError = document.querySelector("#tinggi + .error");

// Menambahkan event listener pada input usia saat menekan tombol Enter
usiaInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    // Memvalidasi input usia (jika inputan berupa string, maka pesan error ditampilkan)
    validateInputAndFocusNext(
      usiaInput,
      beratInput,
      usiaError,
      "Input usia hanya boleh berupa angka"
    );
  }
});

// Menambahkan event listener pada input berat badan saat menekan tombol Enter
beratInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    // Memvalidasi input berat badan (jika inputan berupa string, maka pesan error ditampilkan)
    validateInputAndFocusNext(
      beratInput,
      tinggiInput,
      beratError,
      "Input berat badan hanya boleh berupa angka"
    );
  }
});

// Menambahkan event listener pada input tinggi badan saat menekan tombol Enter
tinggiInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    // Memvalidasi input tinggi badan (jika inputan berupa string, maka pesan error ditampilkan)
    validateInputAndPerformAction(
      tinggiInput,
      tinggiError,
      "Input tinggi badan hanya boleh berupa angka",
      function () {
        hitungBMI();
        getRadio();
      }
    );
  }
});

// Fungsi untuk memvalidasi input dan beralih ke input berikutnya jika valid
function validateInputAndFocusNext(
  inputElement,
  nextInputElement,
  errorMessageElement,
  errorMessageText
) {
  validateInputAndPerformAction(
    inputElement,
    errorMessageElement,
    errorMessageText,
    function () {
      nextInputElement.focus(); // Beralih ke input berikutnya
    }
  );
}

// Fungsi untuk memvalidasi input dan menjalankan tindakan jika valid
function validateInputAndPerformAction(
  inputElement,
  errorMessageElement,
  errorMessageText,
  action
) {
  const value = inputElement.value.trim();

  if (value === "" || !isAngka(value)) {
    errorMessageElement.textContent = errorMessageText;
    inputElement.classList.add("error");
  } else {
    errorMessageElement.textContent = "";
    inputElement.classList.remove("error");
    action(); // Menjalankan tindakan yang diberikan
  }
}

// Fungsi untuk memeriksa apakah suatu string hanya berisi angka
function isAngka(value) {
  return /^[0-9]+$/.test(value);
}

// Variabel tombol "Hitung BMI" dan "Reset"
let button = document.getElementById("hitung");
let btnReset = document.getElementById("reset");

// Menambahkan event listener pada tombol "Hitung BMI" dan "Reset"
button.addEventListener("click", function () {
  hitungBMI();
  getRadio();
});

btnReset.addEventListener("click", getReset);

// Fungsi untuk melakukan perhitungan BMI
function hitungBMI() {
  const berat = beratInput.value;
  const tinggi = tinggiInput.value;

  // Perhitungan BMI
  const t = Math.pow(tinggi / 100, 2);
  const h = berat / t;
  const a = h.toFixed(1);

  // Menampilkan hasil
  let s = document.getElementById("status");
  let rsl = document.getElementById("result");
  let nt = document.getElementById("note");
  const e1 = document.getElementById("explanation1");
  const e2 = document.getElementById("explanation2");
  const e3 = document.getElementById("explanation3");
  const e4 = document.getElementById("explanation4");
  const d1 = document.getElementById("disease1");
  const d2 = document.getElementById("disease2");

  // Menampilkan hasil berdasarkan kategori BMI
  if (a <= 18.5) {
    s.innerHTML = "Kekurangan berat badan";
    nt.innerHTML = "Anda kekurangan berat badan";
    rsl.innerHTML = a;
    e1.classList.remove("disable");
    d1.classList.remove("disable");
  } else if (a > 18.5 && a <= 24.9) {
    s.innerHTML = "Normal";
    nt.innerHTML = "Anda memiliki berat badan ideal<br>Good Job!!";
    rsl.innerHTML = a;
    e2.classList.remove("disable");
  } else if (a >= 25 && a <= 29.9) {
    s.innerHTML = "Kelebihan berat badan!";
    nt.innerHTML = "Anda memiliki berat badan berlebih!";
    rsl.innerHTML = a;
    e3.classList.remove("disable");
    d2.classList.remove("disable");
  } else if (a >= 30) {
    s.innerHTML = "Obesitas";
    nt.innerHTML = "Anda berada dalam kategori obesitas!";
    rsl.innerHTML = a;
    e4.classList.remove("disable");
    d2.classList.remove("disable");
  }
}

// Function reset untuk menghilangkan value input form yang sudah di-isikan
function getReset() {
  document.getElementById("berat").value = "";
  document.getElementById("usia").value = "";
  document.getElementById("tinggi").value = "";
  clearErrorMessages();
  clearResult();
}

// Function menampilkan pilihan input bertipe radio
function getRadio() {
  let radio = document.getElementsByName("gender");
  let i;
  for (i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      document.getElementById("radio-output").innerHTML =
        radio[i].value +
        "<br>Usia " +
        document.getElementById("usia").value +
        " Tahun" +
        "<br>Berat " +
        document.getElementById("berat").value +
        " kg" +
        "<br>Tinggi " +
        document.getElementById("tinggi").value +
        " cm";
    }
  }
}

// Fungsi untuk menghapus pesan kesalahan
function clearErrorMessages() {
  usiaError.textContent = "";
  beratError.textContent = "";
  tinggiError.textContent = "";
}

// Fungsi untuk mengosongkan hasil BMI jika tombol "Reset" di-klik
function clearResult() {
  let s = document.getElementById("status");
  let rsl = document.getElementById("result");
  let nt = document.getElementById("note");
  const e1 = document.getElementById("explanation1");
  const e2 = document.getElementById("explanation2");
  const e3 = document.getElementById("explanation3");
  const e4 = document.getElementById("explanation4");
  const d1 = document.getElementById("disease1");
  const d2 = document.getElementById("disease2");

  s.innerHTML = "";
  rsl.innerHTML = "";
  nt.innerHTML = "";
  e1.classList.add("disable");
  e2.classList.add("disable");
  e3.classList.add("disable");
  e4.classList.add("disable");
  d1.classList.add("disable");
  d2.classList.add("disable");
  const resultParagraph = document.querySelector(
    ".result-box .result p:last-child"
  );
  resultParagraph.textContent = "";
}
