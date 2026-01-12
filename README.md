# 🚁 GÖKTÜRK İHA EKİBİ - Website

Necmettin Erbakan Üniversitesi GÖKTÜRK İHA Ekibi'nin resmi web sitesi. Projelerimiz, ekibimiz, başarılarımız ve iletişim bilgilerini sunar.

## 🌐 Canlı Site
[görüntüle](#) (daha sonra deploy edilecek)

## ✨ Özellikler

- **Responsive Design** - Mobil, tablet ve masaüstü uyumlu
- **Modern UI** - Tailwind CSS ve Lucide Icons ile tasarlanmış
- **Sayfalı Yapı**:
  - 🏠 Ana Sayfa - Genel bakış ve departmanlar
  - ✈️ İHA Filomuz - Geliştirmiş olduğumuz uçaklar
  - 🏆 Başarılarımız - Kronolojik başarı timeline'ı
  - 👥 Ekibimiz - Kıdemli ve AR-GE ekibi üyeleri
  - 💬 İletişim - Contact form ve sosyal medya
- **Sponsor Animasyonu** - Marquee efekti ile partner gösterimi
- **Dark Mode** - Göz dostu koyu tema

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Build**: Vite 6
- **Icons**: Lucide React
- **Forms**: Formspree
- **Linting**: ESLint

## 📦 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Adımlar

```bash
# 1. Repository klonla
git clone https://github.com/Rk1coder/website_ekip.git
cd gokturk-iha

# 2. Environment setup
cp .env.example .env.local
# .env.local dosyasını düzenle ve Formspree Form ID'sini ekle

# 3. Dependencies yükle
npm install

# 4. Development server başlat
npm run dev

# 5. Build et (production)
npm run build
```

## ⚙️ Configuration

### Formspree Form ID
1. https://formspree.io adresine git
2. Yeni form oluştur
3. Email: `gokturkekibi@gmail.com`
4. Form ID'yi `.env.local` dosyasına ekle

Detaylı güvenlik talimatları için [SECURITY.md](./SECURITY.md) dosyasını okuyun.

## 📁 Proje Yapısı

```
gokturk-iha/
├── src/
│   ├── App.tsx           # Main component
│   ├── index.css         # Global styles
│   └── assets/           # Static assets
├── public/               # Public assets (images)
│   ├── crew/             # Ekip fotoğrafları
│   └── fleet/            # İHA fotoğrafları
├── index.tsx             # Main React file
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind configuration
├── .env.example          # Environment variables template
├── .env.local            # Environment variables (local - gitignore)
├── SECURITY.md           # Security guidelines
└── README.md             # Bu dosya
```

## 🚀 Deploy

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### GitHub Pages
```bash
npm run build
# dist/ klasörünü GitHub Pages'e push et
```

### Diğer Seçenekler
- Netlify
- Railway
- Heroku

## 🔒 Güvenlik

Bu proje public repository olduğu için:
- ✅ Tüm sensitif bilgiler `.env.local` dosyasında saklanıyor
- ✅ `.env.local` `.gitignore`'da - GitHub'a yüklenmez
- ✅ API keys ve Form IDs environment variables kullanılıyor

Detaylar için [SECURITY.md](./SECURITY.md) okuyun.

## 📧 İletişim

- **Email**: gokturkekibi@gmail.com
- **Instagram**: [@gokturkekibi](https://instagram.com/gokturkekibi)
- **Twitter**: [@gokturiha](https://twitter.com/gokturiha)
- **LinkedIn**: [NEÜ GÖKTÜRK UAS](https://linkedin.com/company/neü-göktürk-uas)
- **YouTube**: [@gokturekibi](https://youtube.com/@gokturekibi)

## 📄 Lisans

MIT License - Detaylar için [LICENSE](./LICENSE) dosyasına bakın

## 👥 Katkıda Bulunanlar

GÖKTÜRK İHA Ekibi

---

**Yapım Yılı**: 2016-2025 | **Yer**: Necmettin Erbakan Üniversitesi, Konya
