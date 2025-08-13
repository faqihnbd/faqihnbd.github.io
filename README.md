# Portfolio & Curriculum Vitae Website

Sebuah website portfolio dan CV profesional yang responsif dan modern, dirancang untuk menampilkan keterampilan, proyek, dan pengalaman profesional secara efektif.

## Fitur

- Desain modern dan profesional
- Tampilan yang sepenuhnya responsif untuk semua perangkat
- Tema gelap/terang yang dapat disesuaikan
- Animasi dan transisi yang menarik
- Bagian portfolio dengan filter kategori
- Bagian CV/resume dengan tab interaktif
- Formulir kontak yang terintegrasi
- Optimasi SEO
- Kompatibel dengan semua browser modern

## Teknologi yang Digunakan

- HTML5
- CSS3 (dengan variabel CSS dan layout Flexbox/Grid)
- JavaScript (vanilla, tanpa framework)
- Font Awesome untuk ikon
- Google Fonts
- Typed.js untuk animasi teks

## Struktur Proyek

```
portfolio_website/
├── index.html              # File HTML utama
├── css/
│   ├── style.css           # File CSS utama
│   └── animations.css      # CSS untuk animasi
├── js/
│   └── script.js           # JavaScript untuk interaktivitas
├── img/                    # Folder untuk gambar
└── README.md               # Dokumentasi proyek
```

## Cara Penggunaan

1. Clone atau download repository ini
2. Edit file index.html untuk menyesuaikan konten dengan informasi pribadi Anda
3. Ganti gambar placeholder di folder img/ dengan gambar Anda sendiri
4. Sesuaikan warna dan gaya dengan mengedit variabel CSS di style.css
5. Deploy ke layanan hosting web pilihan Anda

## Panduan Kustomisasi

### Mengubah Informasi Pribadi

Edit bagian berikut di file `index.html`:

- Nama dan profesi di bagian hero
- Informasi kontak di bagian about dan contact
- Pendidikan dan pengalaman kerja di bagian resume
- Proyek di bagian portfolio
- Layanan yang ditawarkan di bagian services

### Mengubah Warna

Untuk mengubah skema warna, edit variabel CSS di bagian `:root` dalam file `style.css`:

```css
:root {
  --primary-color: #2d31fa;
  --secondary-color: #5d8bf4;
  --accent-color: #051367;
  /* Variabel lainnya */
}
```

### Menambahkan Proyek Portfolio

Tambahkan proyek baru dengan menyalin dan mengedit struktur berikut di bagian portfolio:

```html
<div class="portfolio-item" data-category="web">
  <div class="portfolio-img">
    <img src="img/portfolio1.jpg" alt="Portfolio Item 1" />
  </div>
  <div class="portfolio-overlay">
    <div class="portfolio-info">
      <h3>Judul Proyek</h3>
      <p>Kategori Proyek</p>
      <a href="#" class="portfolio-link" data-portfolio="portfolio1">
        <i class="fas fa-plus"></i>
      </a>
    </div>
  </div>
</div>
```

## Catatan untuk Placeholder

Untuk implementasi yang sebenarnya, ganti gambar placeholder di folder `img/` dengan gambar Anda sendiri:

- profile.png - Foto profile untuk bagian hero
- about.jpg - Foto untuk bagian about
- portfolio1.jpg hingga portfolio6.jpg - Gambar untuk proyek portfolio
- testimonial1.jpg hingga testimonial3.jpg - Foto untuk testimonial

## Lisensi

Bebas digunakan untuk keperluan pribadi dan komersial.

---

Dibuat dengan ❤️ untuk menampilkan profil profesional Anda dengan cara yang menarik dan efektif.
