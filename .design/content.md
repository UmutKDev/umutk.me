# umutk.me — Metin taslağı (M2) / Copy draft

Kaynak: yalnızca `app/lib/data.ts` ve `DESIGN.md`. Uydurulmuş metrik, referans ya da logo yok.
**[SORU]** ile işaretli yerler senden bilgi bekliyor. Boş bırakırsan o bölüm yayına çıkmaz.
Ses: birinci tekil şahıs, sade, teknik. EN ve TR aynı yapıda.

---

## 1. Ana sayfa / Home

### Hero
| | EN | TR |
|---|---|---|
| Başlık (≤7 kelime) | Full-stack work, kept as a record. | Full-stack işler, kayıt altında. |
| Cümle (≤12 kelime) | React, NestJS and PostgreSQL, built and shipped from Bursa since 2023. | 2023'ten beri Bursa'dan React, NestJS ve PostgreSQL ile ürün geliştiriyorum. |
| Birincil eylem | Contact | İletişim |
| İkincil eylem | CV | Özgeçmiş |

### İlk 60 kelime (GEO: "kim?" sorusunun cevabı, HTML'de görünür)
- **EN:** I'm Umut Kızıloğlu, a full-stack developer in Bursa, Türkiye. Since April 2024 I've built HR products at ThinkCut: reusable UI components, API integrations and server-rendered pages tuned for speed and search. Before that I shipped client projects at Dijital Sahne with Node.js, TypeScript and PostgreSQL. I work in React, Next.js, NestJS, PostgreSQL, Redis and Docker.
- **TR:** Ben Umut Kızıloğlu, Bursa'da çalışan bir full-stack geliştiriciyim. Nisan 2024'ten beri ThinkCut'ta İK ürünleri geliştiriyorum: tekrar kullanılabilir arayüz bileşenleri, API entegrasyonları ve hız ile arama için ayarlanmış, sunucuda oluşturulan sayfalar. Öncesinde Dijital Sahne'de Node.js, TypeScript ve PostgreSQL ile müşteri projeleri yayına aldım. React, Next.js, NestJS, PostgreSQL, Redis ve Docker ile çalışıyorum.

### Kayıt bölümü (imza: kariyer diff'i)
| | EN | TR |
|---|---|---|
| Başlık | Every role, stored as a diff | Her rol, bir diff olarak |
| Sürümler | v1 Vanelli · v2 Dijital Sahne · v3 Pick a Seat · v4 ThinkCut | aynı |
| Satır adları | Company, Role, Period, Stack kept, Dropped, Added, Why | Şirket, Rol, Dönem, Korunan, Bırakılan, Eklenen, Neden |
| Dönem biçimi | Apr 2024 to present | Nisan 2024'ten bugüne |

"Neden" satırları `data.ts` maddelerinden gelir (çeviri Bölüm 5'te).

### Seçili işler (vaka çalışmalarına bağlantı)
| | EN | TR |
|---|---|---|
| Başlık | Selected work | Seçili işler |
| ThinkCut HR Suite | HR product surfaces: a reusable UI system, API integrations and SSR pages tuned for SEO. | İK ürün ekranları: tekrar kullanılabilir arayüz sistemi, API entegrasyonları ve SEO için ayarlanmış SSR sayfaları. |
| Pick a Seat | Ticketing and seat reservation for Biletinial: responsive booking flow and API work. | Biletinial için bilet ve koltuk rezervasyonu: duyarlı rezervasyon akışı ve API çalışmaları. |

### Kapanış (letter close)
- **EN:** Write, or call. umut.kiziloglu@umutk.me · +90 543 738 1962 — Umut, Osmangazi, Bursa
- **TR:** Yazın ya da arayın. umut.kiziloglu@umutk.me · +90 543 738 1962 — Umut, Osmangazi, Bursa
- **[SORU 1]** Telefon numarası sitede herkese açık kalsın mı? (Şu an `data.ts`'de ve eski sitede görünüyor; spam riski var.)

---

## 2. Vaka çalışmaları / Case studies (`/work/[slug]`)

Yapı: Problem → Rolüm → Kararlar (önce/sonra) → Sonuç → Stack → Sonraki iş.
`data.ts`'de yalnızca iki madde var; vaka çalışması için bu yetmiyor.

### `thinkcut-hr-suite` — Apr 2024 to present / Nisan 2024'ten bugüne
- **Bilinen:** HR odaklı web özellikleri uçtan uca; tekrar kullanılabilir UI bileşenleri; API entegrasyonları; SSR ile algılanan performans ve SEO; Figma'da tasarımcılarla çalışma; TypeScript; Swagger ile API sözleşmeleri. Stack: NestJS, React, TypeScript, Tailwind, shadcn/ui, PostgreSQL, Redis, Docker.
- **[SORU 2]** Ürün neyi çözüyor (kullanıcısı kim, hangi iş akışı)? Senin sahiplendiğin 2–3 somut parça hangileri? Verdiğin 2–3 teknik karar ve nedenleri? Paylaşılabilir bir sonuç var mı (gerçek bir sayı yoksa sayı yazmayacağız)? Ekran görüntüsü paylaşılabilir mi (NDA)?

### `pick-a-seat` — Mar–May 2024 / Mart–Mayıs 2024
- **Bilinen:** Biletinial'dan çıkan bilet ve koltuk rezervasyon ürünü; duyarlı arayüzler; API entegrasyonu; ölçeklenebilir ve güvenilir online rezervasyon için UX iyileştirmeleri. Stack: Next.js, TypeScript, Tailwind, REST.
- **[SORU 3]** Koltuk haritası nasıl çalışıyordu, senin payın neydi? Canlı bir URL ya da ekran görüntüsü var mı?

---

## 3. `/now`
- **EN title:** Now · **TR başlık:** Şimdi
- Biçim: tarihli tek sütun ("Updated 30 October 2026" / "Güncelleme: 30 Ekim 2026"), altında Spotify satırı.
- **[SORU 4]** Bu ay neyle meşgulsün? 3–5 madde yeter: iş, öğrendiğin şey, yan proje, okuduğun/izlediğin, Bursa'da yaptığın bir şey.

## 4. `/uses`
- **EN title:** Uses · **TR başlık:** Kullandıklarım
- Gruplar: Hardware / Donanım · Editor & terminal / Editör ve terminal · Apps / Uygulamalar · Stack (`data.ts` skill gruplarından otomatik).
- **[SORU 5]** Bilgisayar, monitör, klavye/fare, editör (VS Code? tema/font?), terminal ve kabuk, sık kullandığın uygulamalar.

## 5. CV (`/cv` + PDF)
Bölümler: Özet · Deneyim · Projeler · Yetkinlikler · Eğitim · Diller · İletişim.

### Deneyim maddeleri (TR çeviri; EN = `data.ts`)
- **ThinkCut, Full-Stack Developer, Bursa (Nisan 2024'ten bugüne)**
  - İK odaklı web özelliklerini uçtan uca geliştirdim: tekrar kullanılabilir arayüz bileşenleri, API entegrasyonları ve algılanan performansı ve SEO'yu iyileştiren SSR.
  - Figma'da tasarımcılarla birlikte çalıştım. TypeScript ile bakımı kolay, tipli kod ve Swagger ile temiz API sözleşmeleri yazdım.
- **Pick a Seat, yan proje, Biletinial (Mart–Mayıs 2024, uzaktan)**
  - Biletinial'dan çıkan bilet ve koltuk rezervasyon ürünü Pick a Seat'e katkı verdim.
  - Duyarlı arayüzler kurdum, API'leri entegre ettim ve ölçeklenebilir, güvenilir online rezervasyon için kullanıcı deneyimini iyileştirdim.
- **Dijital Sahne, Full-Stack Developer, Bursa (Mayıs 2023 – Nisan 2024)**
  - Node.js, TypeScript ve PostgreSQL ile farklı müşteri alanlarında birden çok full-stack projeyi yayına aldım.
  - Vite ile duyarlı React arayüzleri kurdum, veritabanı sorgularını iyileştirdim ve API'leri entegre ettim.
  - Ekip içinde Docker ve Git ile servisleri yayına aldım ve bakımını yaptım.
- **Vanelli, Türkün Holding A.Ş., Dijital Pazarlama Stajyeri, Bursa (Eylül 2021 – Haziran 2022)**
  - Online satış kampanyalarını destekledim ve e-ticaret stratejisine katkı verdim.
  - SEO ve içerik iyileştirmeleri yaptım, Google Analytics ile analiz yaptım ve sosyal medya reklamlarına destek verdim.

- **[SORU 6]** Eğitim (okul, bölüm, yıllar) ve diller (Türkçe ana dil; İngilizce seviyesi?) CV'ye eklensin mi?

---

## 6. Arayüz metinleri / UI strings (sözlük)
| Anahtar | EN | TR |
|---|---|---|
| nav.work | Work | İşler |
| nav.now | Now | Şimdi |
| nav.uses | Uses | Kullandıklarım |
| nav.cv | CV | Özgeçmiş |
| nav.search | Search | Ara |
| palette.placeholder | Type a command or search | Bir komut yazın ya da arayın |
| palette.empty | No results for "{q}" | "{q}" için sonuç yok |
| palette.switchLang | Türkçeye geç | Switch to English |
| palette.copyEmail | Copy email | E-postayı kopyala |
| palette.copied | Email copied | E-posta kopyalandı |
| spotify.playing | Now playing | Şu an çalıyor |
| spotify.last | Last played | Son çalınan |
| spotify.off | Nothing playing right now | Şu an bir şey çalmıyor |
| spotify.error | Couldn't reach Spotify | Spotify'a ulaşılamadı |
| cv.download | Download PDF | PDF'i indir |
| work.next | Next case study | Sonraki vaka çalışması |
| 404.title | This page isn't in the record | Bu sayfa kayıtta yok |
| 404.back | Back to the home page | Ana sayfaya dön |
| skip | Skip to content | İçeriğe geç |
