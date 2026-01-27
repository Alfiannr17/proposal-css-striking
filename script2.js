const scriptURL = "https://script.google.com/macros/s/AKfycbx2ME3fb9vQsERhPJJy9WOGZoJ8p9ZtS1f1uFqZpmnLK4lhkwV0et6hdZgEEFYztjwd/exec";

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

document.getElementById("fightForm").addEventListener("submit", async e => {
  e.preventDefault();
  const f = e.target;

  const data = {
    nama: f.nama.value,
    tgl_lahir: f.tgl_lahir.value,
    usia: f.usia.value,
    jk: f.jk.value,
    berat: f.berat.value,
    tinggi: f.tinggi.value,
    ukuran_baju: f.ukuran_baju.value,
    kategori: f.kategori.value,
    telp: f.telp.value,
    instagram: f.instagram.value,
    camp: f.camp.value,
    pelatih: f.pelatih.value,
    telp_pelatih: f.telp_pelatih.value,
    riwayat: f.riwayat.value,
    nominal: f.nominal.value,
    foto_atribut: f.foto_atribut.files[0] ? await toBase64(f.foto_atribut.files[0]) : "",
    foto_pose: f.foto_pose.files[0] ? await toBase64(f.foto_pose.files[0]) : "",
    bukti_bayar: f.bukti_bayar.files[0] ? await toBase64(f.bukti_bayar.files[0]) : ""
  };

  fetch(scriptURL, {
  method: "POST",
  body: JSON.stringify(data)
})
.then(res => res.json())
.then(res => {
  if (res.status === "success") {
    window.location.href = "konfirmasi.html";
  } else {
    alert("Gagal menyimpan data");
  }
})
.catch(() => {
  alert("Terjadi kesalahan koneksi");
});

});
