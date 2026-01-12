# 🔒 Güvenlik Önemleri

Bu proje public olarak GitHub'da yayınlandığı için aşağıdaki güvenlik önlemlerini almışız:

## ✅ Alınan Önlemler

### 1. **Environment Variables (.env)**
- Tüm sensitif bilgiler (API keys, Form IDs) `.env.local` dosyasında saklanıyor
- `.env.local` ve tüm `.env` dosyaları `.gitignore`'da kayıtlı
- GitHub'a yüklenmeyecek ✓

### 2. **Formspree Integration**
- Form ID'si `import.meta.env.VITE_FORMSPREE_FORM_ID` üzerinden yükleniyor
- `.env.local` dosyasında saklanıyor
- Hardcoded değildir ✓

### 3. **.env.example Dosyası**
- Örnek environment variables `.env.example` dosyasında belirtildi
- Yeni geliştiricilerin neler yapması gerektiğini gösterir

### 4. **Dependency Security**
```bash
npm audit  # Güvenlik açıklarını kontrol etmek için
```

## 📋 Kurulum & Çalıştırma Adımları

### Yeni Klonlandığında:

```bash
# 1. Projeyi klonla
git clone https://github.com/Rk1coder/website_ekip.git
cd gokturk-iha

# 2. .env.local dosyası oluştur
cp .env.example .env.local

# 3. .env.local'ı düzenle ve Formspree Form ID'sini ekle
# VITE_FORMSPREE_FORM_ID=f/your_form_id_from_formspree

# 4. Dependencies yükle
npm install

# 5. Çalıştır
npm run dev
```

## ⚙️ Configuration

### Formspree Form ID Alma:
1. https://formspree.io adresine git
2. Hesap oluştur/Giriş yap
3. Yeni form oluştur
4. Email adresi: `gokturkekibi@gmail.com`
5. Verilen Form ID'yi kopyala (örn: `f/abc123xyz`)
6. `.env.local` dosyasına ekle:
   ```
   VITE_FORMSPREE_FORM_ID=f/abc123xyz
   ```

## 🚨 ASLA Yapılmaması Gerekenler

❌ API keys, Form IDs, Tokens'ı doğrudan kod içine yazma
❌ `.env.local` dosyasını GitHub'a push etme
❌ Sosyal medya veya kişisel hesap bilgilerini hardcode etme
❌ Dependencies'leri güncellemeden `npm audit` kontrol etme

## 🔍 Düzenli Kontroller

```bash
# Güvenlik açıklarını kontrol et
npm audit

# Güvenlik açıklarını otomatik onar (dikkatli ol!)
npm audit fix

# Bağımlılıkları güncelle
npm update
```

## 📧 Public Bilgiler (Güvenli)

Bunlar public olması önemsizdir:
- 📬 Email: gokturkekibi@gmail.com
- 🔗 Social Media Links (Instagram, Twitter, LinkedIn, YouTube)
- 📍 Konum: NEÜ Mühendislik Fakültesi

## 📝 Notes

- `.env.local` dosyası `.gitignore`'da → GitHub'a yüklenmez
- Tüm contributors aynı şekilde `.env.local` oluşturmalı
- Formspree otomatik olarak gelen mesajları email'e gönderir
