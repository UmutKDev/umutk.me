import type { Dict } from "./en";

const tr = {
  skip: "İçeriğe geç",
  nav: { work: "İşler", now: "Şimdi", uses: "Kullandıklarım", cv: "Özgeçmiş", primary: "Ana menü", language: "Dil" },
  palette: {
    placeholder: "Bir komut yazın ya da arayın",
    empty: '"{q}" için sonuç yok',
    switchLang: "Switch to English",
    copyEmail: "E-postayı kopyala",
    copied: "E-posta kopyalandı",
  },
  spotify: {
    playing: "Şu an çalıyor",
    last: "Son çalınan",
    off: "Şu an bir şey çalmıyor",
    error: "Spotify'a ulaşılamadı",
  },
  hero: {
    title: "Full-stack işler, kayıt altında.",
    sentence: "2023'ten beri Bursa'dan React, NestJS ve PostgreSQL ile ürün geliştiriyorum.",
    contact: "İletişim",
    cv: "Özgeçmiş",
    intro:
      "Ben Umut Kızıloğlu, Bursa'da çalışan bir full-stack geliştiriciyim. Nisan 2024'ten beri ThinkCut'ta İK ürünleri geliştiriyorum: tekrar kullanılabilir arayüz bileşenleri, API entegrasyonları ve hız ile arama için ayarlanmış, sunucuda oluşturulan sayfalar. Öncesinde Dijital Sahne'de Node.js, TypeScript ve PostgreSQL ile müşteri projeleri yayına aldım. React, Next.js, NestJS, PostgreSQL, Redis ve Docker ile çalışıyorum.",
  },
  record: { title: "Her rol, bir diff olarak", role: "Rol", period: "Dönem" },
  work: { title: "Seçili işler", next: "Sonraki vaka çalışması", caseStudy: "vaka çalışması", stack: "Stack" },
  now: { title: "Şimdi", current: "Şu an" },
  uses: { title: "Kullandıklarım", stack: "Stack" },
  cv: { experience: "Deneyim", skills: "Yetkinlikler" },
  close: { title: "Yazın ya da arayın.", sign: "Umut, Osmangazi, Bursa", elsewhere: "Diğer hesaplar" },
  notFound: { title: "Bu sayfa kayıtta yok", back: "Ana sayfaya dön" },
  meta: {
    home: {
      title: "Umut Kızıloğlu — Bursa'da Full-Stack Yazılım Geliştirici",
      description:
        "Bursa'da React, Next.js, TypeScript, NestJS ve PostgreSQL ile ölçeklenebilir web uygulamaları geliştiren full-stack geliştirici. Şu an ThinkCut'ta.",
    },
    now: {
      title: "Şu An — Umut Kızıloğlu",
      description:
        "Şu an neye odaklandığım: ThinkCut'taki işim, öğrendiklerim ve Bursa'da full-stack geliştirici olarak üzerinde çalıştıklarım.",
    },
    uses: {
      title: "Kullandıklarım: Araçlar ve Kurulum — Umut Kızıloğlu",
      description:
        "Full-stack geliştirici olarak her gün kullandığım editör, donanım, framework ve servisler: React, Next.js, NestJS, PostgreSQL, Docker ve fazlası.",
    },
    cv: {
      title: "Özgeçmiş (CV) — Umut Kızıloğlu, Full-Stack Geliştirici",
      description:
        "Umut Kızıloğlu özgeçmişi: ThinkCut'ta full-stack geliştirici, öncesinde Dijital Sahne. React, Next.js, NestJS, PostgreSQL. PDF olarak indirin.",
    },
    work: {
      "pick-a-seat": {
        title: "Pick a Seat: Koltuk Rezervasyonu — Umut Kızıloğlu",
        description:
          "Vaka çalışması: Biletinial'ın Pick a Seat ürünü için Next.js, TypeScript ve Tailwind CSS ile duyarlı bilet ve koltuk rezervasyonu arayüzleri.",
      },
      "thinkcut-hr-suite": {
        title: "ThinkCut İK Yazılımı Vaka Çalışması — Umut Kızıloğlu",
        description:
          "Vaka çalışması: ThinkCut'ta İK odaklı web özellikleri; yeniden kullanılabilir arayüz sistemi, API entegrasyonları ve SSR. NestJS, React, PostgreSQL.",
      },
    },
  },
} satisfies Dict;

export default tr;
