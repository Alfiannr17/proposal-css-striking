const scriptURL = "https://script.google.com/macros/s/AKfycbx2ME3fb9vQsERhPJJy9WOGZoJ8p9ZtS1f1uFqZpmnLK4lhkwV0et6hdZgEEFYztjwd/exec";

const form = document.getElementById("fightForm");
const submitBtn = document.getElementById("submitBtn");

let isSubmitting = false;

// 🔒 CEK JIKA SUDAH SUBMIT (ANTI REFRESH / BACK)
if (sessionStorage.getItem("submitted") === "yes") {
  window.location.href = "konfirmasi.html";
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // ❌ BLOK KLIK KEDUA
  if (isSubmitting) return;
  isSubmitting = true;

  // 🔄 LOCK BUTTON
  submitBtn.disabled = true;
  submitBtn.innerText = "SEDANG MENGIRIM...";

  try {
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
      lagu: f.lagu.value,
      foto_atribut: f.foto_atribut.files[0]
        ? await toBase64(f.foto_atribut.files[0])
        : "",
      foto_pose: f.foto_pose.files[0]
        ? await toBase64(f.foto_pose.files[0])
        : "",
      bukti_bayar: f.bukti_bayar.files[0]
        ? await toBase64(f.bukti_bayar.files[0])
        : ""
    };

    const res = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.status === "success") {
      // ✅ SIMPAN STATUS SUBMIT
      sessionStorage.setItem("submitted", "yes");

      window.location.href = "konfirmasi.html";
    } else {
      throw new Error("Gagal menyimpan data");
    }

  } catch (err) {
    alert("Terjadi kesalahan, silakan coba lagi");

    // 🔓 BUKA KUNCI JIKA GAGAL
    isSubmitting = false;
    submitBtn.disabled = false;
    submitBtn.innerText = "KIRIM PENDAFTARAN";
  }
});
