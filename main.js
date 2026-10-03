import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyADNAfsIwOWcKeI8-2bSIHnTKY73B_aJbU",
    authDomain: "tugas-1a.firebaseapp.com",
    projectId: "tugas-1a",
    storageBucket: "tugas-1a.firebasestorage.app",
    messagingSenderId: "944250444828",
    appId: "1:944250444828:web:4ba57f60df3086c18553d9",
    measurementId: "G-6YXK4DVXL9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


// =====================================================
// MEMBUAT AREA TAMPIL DATA
// =====================================================

const garisPembatas = document.createElement("hr");

const judulDaftar = document.createElement("h2");
judulDaftar.textContent = "Daftar Data Siswa";

const areaTampilData = document.createElement("div");

document.body.appendChild(garisPembatas);
document.body.appendChild(judulDaftar);
document.body.appendChild(areaTampilData);


// =====================================================
// FUNGSI MENGAMBIL DATA
// =====================================================

async function ambil() {

    try {

        const querySnapshot = await getDocs(
            collection(db, "data")
        );

        if (querySnapshot.empty) {

            areaTampilData.innerHTML =
                "<p>Belum ada data yang tersimpan di Firebase.</p>";

            return;
        }


        let kontenHTML = "<ul>";


        querySnapshot.forEach((doc) => {

            const siswa = doc.data();

            kontenHTML += `
                <li>
                    <strong>Nama:</strong> ${siswa.namas}
                    |
                    <strong>Kelas:</strong> ${siswa.kelass}
                    |
                    <strong>Nilai:</strong> ${siswa.nilais}
                </li>
            `;

        });


        kontenHTML += "</ul>";

        areaTampilData.innerHTML = kontenHTML;

    } catch (error) {

        console.error("Gagal mengambil data:", error);

        areaTampilData.innerHTML =
            "<p style='color:red;'>Gagal memuat data dari Firebase. Periksa koneksi atau rules database Anda.</p>";

    }

}


// Jalankan saat halaman dibuka
ambil();


// =====================================================
// TOMBOL SIMPAN DATA
// =====================================================

const tombol = document.getElementById("inisebuahtombol");


tombol.addEventListener("click", async () => {

    const nama = document.getElementById("nama").value;
    const kelas = document.getElementById("kelas").value;
    const nilai = document.getElementById("nilai").value;


    console.log("Isi variabel nama:", nama);
    console.log("Isi variabel kelas:", kelas);
    console.log("Isi variabel nilai:", nilai);


    try {

        await addDoc(collection(db, "data"), {

            namas: nama,
            kelass: kelas,
            nilais: nilai,
            waktus: new Date()

        });


        alert(`Data berhasil masuk ke database!
Nama: ${nama}`);


        // Kosongkan form
        document.getElementById("nama").value = "";
        document.getElementById("kelas").value = "";
        document.getElementById("nilai").value = "";


        // Refresh daftar data
        ambil();


    } catch (error) {

        console.error("Gagal menyimpan ke Firebase:", error);

        alert("Terjadi kesalahan, data gagal disimpan.");

    }

});
