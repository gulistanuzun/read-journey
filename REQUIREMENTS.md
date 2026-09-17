# Read Journey — Proje Gereksinimleri

Bu dosya, ödevin geçerlilik kriterlerini ve teknik şartnamesini tek yerde toplamak için oluşturuldu.
Proje boyunca kararlarımızı bu dosyaya göre kontrol edeceğiz.

## Tasarım (Figma)

- Figma linki: https://www.figma.com/file/z3m0rdBcEfLTJUBDkAKhWQ/BOOKS-READING?type=design&node-id=18743%3A4973&mode=design&t=Hi1KTaUJMogWXZzz-1
- Backend API dokümantasyonu (Swagger): https://readjourney.b.goit.study/api-docs/

## Proje Kararları (Netleştirildi)

- **Backend:** GoIT API (`readjourney.b.goit.study`) kullanılacak. Genel kriterlerde geçen "Firebase" ifadesi şablon/genel metin olarak değerlendirildi; Teknik Şartname'nin tüm akışları (token tabanlı auth, server-side pagination, backend'in okuma hızını hesaplaması vb.) zaten bu API'ye özel yazılmış, kullanıcı da bu API linkini backend olarak onayladı.
- **Frontend:** React + Vite (JavaScript, TypeScript değil).
- Form doğrulama: react-hook-form + Yup (şartnamede zaten React'e özel kütüphaneler olarak geçiyor, seçimimizle uyumlu).

## Genel Geçerlilik Kriterleri (Ödev Değerlendirmesi)

- [ ] Tasarım, Figma/Teknik Şartnameye uygun olmalı.
- [ ] Responsive: mobil ve tablette doğru görüntülenmeli.
- [ ] HTML semantik ve valid (W3C validator ile kontrol edilebilir).
- [ ] Tarayıcı konsolunda hata olmamalı.
- [ ] Native JavaScript + bundler (Vite/Parcel) **veya** React (isteğe bağlı TypeScript) ile geliştirilmeli.
- [ ] Authentication ve veri koleksiyonları backend (GoIT API) ile yapılmalı. *(Bkz. "Proje Kararları" bölümü — genel kriterde "Firebase" yazsa da, bu proje için GoIT API kullanılacak.)*
- [ ] İnteraktif özellikler teknik görevde tarif edildiği gibi çalışmalı.
- [ ] Kod formatlanmış olmalı, gereksiz yorum satırı olmamalı.
- [ ] Repo içinde README.md bulunmalı (proje açıklaması, kullanılan teknolojiler, tasarım linki, teknik görev linki).
- [ ] Proje bir hosting servisinde (GitHub Pages, Netlify, vb.) deploy edilmiş olmalı.

**Alternatif kabul durumu:** Daha önce yapılmış kişisel proje/test görevi de kabul edilir, ancak native JS+bundler veya React/React+TS ile geliştirilmiş olması şartı geçerli.

> Not: Bu çelişki netleştirildi, bkz. yukarıdaki "Proje Kararları" bölümü — GoIT API kullanılacak.

## Responsive Breakpoint'ler

| Cihaz | Genişlik |
|---|---|
| Mobile | 320px'den itibaren esnek, 375px'den itibaren tam responsive |
| Tablet | 768px'den itibaren |
| Desktop | 1440px'den itibaren |

## Genel Teknik Gereksinimler

- HTML5 semantik yapı.
- Web fontları bağlı (Google Fonts vb.).
- Vektör/raster görseller optimize edilmiş.
- Retina ekran desteği (2x görseller / srcset).
- Görsel yüklemeleri optimize (lazy loading, sıkıştırma).
- Tüm ikonlar sprite ile bağlanmalı (SVG sprite).
- Favicon eklenmeli.

---

## Sayfa Yapısı ve İşlevsellik

### Yetkisiz Kullanıcı (Auth Olmayan)

#### Register Page — `/register`

- `RegisterForm` + Login sayfasına link ("Already have an account?").
- Input alanları: Name, Email, Password.
- Submit butonu: "Registration".
- Doğrulama: **react-hook-form + Yup**.
  - Name: string, zorunlu.
  - Email: string, pattern: `/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/`
  - Password: string, min 7 karakter.
- Geçersiz veri → hata mesajı gösterilir, backend'e istek gitmez.
- Geçerli veri → backend'e istek gönderilir.
- Backend hata dönerse → pop-up notification ile gösterilir.
- Başarılıysa (token alınırsa) → kullanıcı otomatik yetkilendirilir ve `/recommended` sayfasına yönlendirilir.

#### Login Page — `/login`

- `LoginForm` + Register sayfasına link ("Don't have an account?").
- Input alanları: Email, Password.
- Submit butonu: "Log In".
- Doğrulama: react-hook-form + Yup (aynı Email/Password kuralları).
- Geçersiz veri → hata mesajı, backend'e istek yok.
- Geçerli veri → backend isteği.
- Hata → pop-up notification.
- Başarılı (token) → yetkilendirme + `/recommended` yönlendirme.

---

### Yetkili Kullanıcı (Auth Sonrası)

#### Main Layout — `/`

- Tüm authorized sayfalarda görünen `Header`:
  - Şirket logosu.
  - `UserNav`: `/recommended` ve `/library` linkleri.
  - `UserBar`: kullanıcı bilgisi.
  - Log out butonu.
- Mobil/tablette `UserNav` → burger menü.
- Aktif sayfa `UserNav` içinde vurgulanmalı.
- Log out click:
  - Backend'e oturum sonlandırma isteği.
  - Hata → pop-up notification.
  - Başarılı → Public Welcome page'e yönlendirme.
  - Backend yanıtından bağımsız olarak client-side de-authorize: redux store + localStorage temizlenir.

#### Recommended Page — `/recommended`

**Dashboard** (evrensel bileşen, sayfaya göre farklı içerik sarar):
- `Filters` bloğu: 2 input + "To apply" submit butonu (kitap arama/filtreleme).
- Uygulama işlevini açıklayan blok + My Library sayfasına link.
- Statik alıntı (quote) bloğu.
- **Add Word (AddWordBtn) butonu bu sayfada GÖSTERİLMEMELİ.**

**RecommendedBooks**:
- Sayfa başlığı.
- Server-side pagination (page number + limit parametreleriyle backend'e istek).
  - Her zaman geri/ileri ok butonları var.
  - İlk sayfadaysa geri oku disabled.
  - Son sayfadaysa ileri oku disabled.
- Kitap kartları: kapak görseli, ad, yazar.
- Kapak click → modal (kitap detayları + "Add to library" butonu).
- "Add to library" → kitabı kullanıcı kütüphanesine ekler.
- Modal kapanma koşulları: backdrop click, çarpı ikonu click, ESC tuşu.

#### My Library Page — `/library`

**Dashboard**:
- `AddBook` bloğu: 3 input + "Add book" submit butonu.
  - Tüm alanlar doğrulanmalı.
  - Submit → backend'e yeni kitap ekleme isteği.
  - Hata → pop-up notification.
  - Başarılı → "kitap eklendi" bilgisi içeren modal.
- Önerilen kitaplar bloğu + Recommended page'e link.

**MyLibraryBooks**:
- Sayfa başlığı.
- Select: kitapları okuma durumuna göre filtreleme.
- Kitap kartları: kapak, ad, yazar, silme butonu.
  - Silme butonu → backend'e silme isteği.
- Kapak click → modal (detaylar + "Start reading" butonu → Reading Page'e geçiş).
- Modal kapanma: backdrop click, çarpı ikonu, ESC.

#### Reading Page — `/reading`

**Dashboard**:
- `AddReading` bloğu: 1 input + submit butonu.
  - Buton metni duruma göre değişir: "To start" / "To stop".
  - Alan doğrulanmalı.
  - **"To start"** click:
    - Backend'e başlangıç sayfa numarasını kaydetme isteği.
    - Hata → pop-up notification.
    - Başarılı → `MyBook` bloğunda durum "şu an okunuyor" olarak güncellenir.
  - **"To stop"** click:
    - Backend'e bitiş sayfa numarasını kaydetme isteği.
    - Hata → pop-up notification.
    - Başarılı → `Details` bloğunda okuma hızı bilgisi güncellenir (backend hesaplar).
    - Eğer durulan sayfa == kitabın toplam sayfa sayısı → "kitap tamamlandı" modalı açılır.

- `Details` bloğu — iki görünüm:
  - **Diary**: tarihe göre okuma etkinlikleri listesi.
    - Okunan sayfa sayısı, okuma süresi, toplam sayfaya göre yüzde.
    - Silme butonu → backend'e o etkinliği silme isteği.
  - **Statistics**: okuma ilerlemesini gösteren grafik.

---

## GoIT API — Endpoint Listesi (Swagger'dan alındı)

Base URL: `https://readjourney.b.goit.study/api`

### Auth (Authorization endpoints)

| Method | Endpoint | Açıklama | Auth gerekli mi |
|---|---|---|---|
| POST | `/users/signup` | Kullanıcı kaydı | Hayır |
| POST | `/users/signin` | Kullanıcı girişi | Hayır |
| GET | `/users/current` | Mevcut kullanıcı bilgisi | Evet (🔒) |
| GET | `/users/current/refresh` | Token yenileme (fresh token + refreshToken) | Evet (🔒) |
| POST | `/users/signout` | Kullanıcı çıkışı | Evet (🔒) |

### Book (Book endpoints)

| Method | Endpoint | Açıklama | Auth gerekli mi |
|---|---|---|---|
| GET | `/books/recommend` | Önerilen kitapları getir (Recommended page için — pagination burada olacak) | Evet (🔒) |
| POST | `/books/add` | Yeni kitap ekle (manuel, My Library'deki AddBook formu) | Evet (🔒) |
| POST | `/books/add/{id}` | Önerilen kitaplardan birini kütüphaneye ekle ("Add to library" butonu) | Evet (🔒) |
| DELETE | `/books/remove/{id}` | Kullanıcının kitabını sil (My Library'deki silme butonu) | Evet (🔒) |
| GET | `/books/own` | Kullanıcının kendi kitaplarını getir (My Library page) | Evet (🔒) |
| POST | `/books/reading/start` | Kitap okumaya başlama kaydı ("To start" butonu) | Evet (🔒) |
| POST | `/books/reading/finish` | Kitap okumayı bitirme kaydı ("To stop" butonu) | Evet (🔒) |
| DELETE | `/books/reading` | Okuma etkinliğini sil (Diary'deki silme butonu) | Evet (🔒) |
| GET | `/books/{id}` | Belirli bir kitabın detay bilgisi (modal içerikleri için) | Evet (🔒) |

> Not: Neredeyse tüm Book endpoint'leri kilitli (🔒) — yani `Authorization: Bearer <token>` header'ı ile istek atılmalı. Bu yüzden auth (signup/signin) akışını en başta doğru kurmamız kritik; token'ı nasıl sakladığımız (örn. Redux + localStorage) sonraki adımlarda diğer tüm istekleri etkileyecek.

> Swagger'da Auth ve Book dışında ayrı bir grup (ör. Statistics) yok — şema listesinde sadece Auth + Book ile ilgili request/response'lar var (bkz. aşağıdaki "Schemas" bölümü). Demek ki Statistics grafiği, `GetUsersBooksResponse` veya `FinishReadingBookResponse` içindeki veriden bizim hesaplayıp çizmemiz gerekecek — ayrı bir "statistics" endpoint'i yok.

## GoIT API — Şemalar (Request/Response)

### Auth Şemaları

**`SignUpRequest`** (POST `/users/signup` body):
```json
{
  "name": "string",      // zorunlu
  "email": "string",     // zorunlu
  "password": "string"   // zorunlu
}
```

**`SignUpResponse`**:
```json
{
  "email": "test@gmail.com",
  "name": "TestName",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**`SignInRequest`** (POST `/users/signin` body):
```json
{
  "email": "string",     // zorunlu
  "password": "string"   // zorunlu
}
```

**`SignInResponse`**: `SignUpResponse` ile aynı yapı (email, name, token, refreshToken).

> Önemli not: Response'ta kullanıcı ID'si (`id`, `_id`) yok gibi görünüyor — token'ın içinde (JWT payload) `id` alanı var (örnekte `"id":"64b1e25f6b0a2ccb95591ec7"` şeklinde encode edilmiş). Gerekirse JWT'yi decode ederek id'yi çıkarabiliriz, ama muhtemelen `/users/current` endpoint'i tam kullanıcı bilgisini (id dahil) döndürüyor olacak — onu da ayrıca kontrol edeceğiz.

> Token stratejisi: `token` + `refreshToken` ikilisi var → access token süresi dolunca `/users/current/refresh` ile yenileme yapılacak. Redux store'da ikisini de saklayıp, API isteklerinde `Authorization: Bearer <token>` header'ı göndereceğiz; 401 alırsak refresh akışını tetikleyeceğiz.

### Book Şemaları

**`GetRecommendBooksResponse`** (GET `/books/recommend` response):
```json
{
  "results": [
    {
      "_id": "654fc4d00a563c69b09895ef",
      "title": "Lovers of Justice",
      "author": "Yuri Andrukhovych",
      "imageUrl": "https://res.cloudinary.com/.../1.webp",
      "totalPages": 304,
      "recommend": true
    }
  ],
  "totalPages": 4,
  "page": 1,
  "perPage": 2
}
```

> Not: Pagination bilgisi response içinde geliyor (`page`, `perPage`, `totalPages`). Yani istek atarken query parametresi olarak `?page=1&perPage=10` gibi göndereceğiz, backend bize toplam sayfa sayısını söyleyecek — "ileri" okunun `page < totalPages` iken aktif, `page === totalPages` iken disabled olacağını buradan hesaplayacağız. "Geri" oku ise `page > 1` iken aktif olacak.

### Diğer Şemalar (henüz detay içi açılmadı — isim listesi)

- `GetCurrentResponse`, `GetRefreshCurrentResponse`, `SignOutResponse`
- `AddNewBookRequest`, `AddNewBookResponse`, `RemoveBookResponse`
- `StartReadingBookRequest`, `StartReadingBookResponse`
- `FinishReadingBookRequest`, `FinishReadingBookResponse`
- `GetUsersBooksResponse`

> Bunları, ilgili sayfayı (My Library, Reading) kodlamaya başladığımızda aynı şekilde tek tek açtırıp dosyaya ekleyeceğiz — şimdi hepsini bir anda çözmeye çalışmak yerine, ihtiyaç anında netleştirmek daha verimli.

## Açık Sorular / Netleştirilecekler

1. Public Welcome page (`/`, auth olmadan önce) için ayrı bir tasarım/içerik var mı? (Figma'dan kontrol edilecek.)
2. Grafik kütüphanesi (Statistics bileşeni için) tercihi var mı? (Öneri: recharts veya chart.js — ilerleyen adımda karar vereceğiz.)
3. `GetCurrentResponse` şeması — kullanıcı ID'sini bu endpoint'ten mi alacağız? (Auth kodunu yazarken netleştirilecek.)
4. `AddNewBookRequest`, `StartReadingBookRequest`, `FinishReadingBookRequest` şemaları — ilgili sayfaları kodlarken tek tek açtırıp öğreneceğiz.

## Sonraki Adım

1. Proje iskeletini kuracağız: Vite + React kurulumu, klasör yapısı, React Router ile sayfa rotaları (`/register`, `/login`, `/recommended`, `/library`, `/reading`).
2. İlk kodlanacak özellik: Register sayfası (react-hook-form + Yup ile form, `/users/signup` isteği). Bu sırada `GetCurrentResponse` şemasını da netleştireceğiz.
