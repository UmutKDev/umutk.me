import type { Dict } from "./en";

const tr = {
  skip: "İçeriğe geç",
  nav: { home: "Ana sayfa", work: "İşler", now: "Şimdi", uses: "Kullandıklarım", cv: "Özgeçmiş", primary: "Ana menü", language: "Dil", search: "Ara" },
  palette: {
    placeholder: "Bir komut yazın ya da arayın",
    empty: '"{q}" için sonuç yok',
    switchLang: "Switch to English",
    copyEmail: "E-postayı kopyala",
    copied: "E-posta kopyalandı",
    blocked: "Kopyalanamadı, e-posta adresi {email}",
    title: "Komut paleti",
    results: "Komutlar",
    github: "GitHub'ı aç",
    linkedin: "LinkedIn'i aç",
    terminal: "Terminali aç",
    close: "Kapat",
  },
  spotify: {
    playing: "Şu an çalıyor",
    last: "Son çalınan",
    off: "Şu an bir şey çalmıyor",
    error: "Spotify'a ulaşılamadı",
  },
  terminal: {
    label: "Komut",
    run: "Çalıştır",
    output: "Terminal çıktısı",
    help: "Komutlar: help, whoami, work, stack, contact, lang, clear",
    whoami: "Umut Kızıloğlu, Bursa'da çalışan bir full-stack geliştirici.",
    lang: "Dil: Türkçe. Değiştirmek için lang en yazın.",
    unknown: "Komut bulunamadı: {cmd}. help yazın.",
  },
  hero: {
    title: "Full-stack işler, kayıt altında.",
    sentence: "2023'ten beri Bursa'dan React, NestJS ve PostgreSQL ile ürün geliştiriyorum.",
    contact: "İletişim",
    cv: "Özgeçmiş",
    intro:
      "Ben Umut Kızıloğlu, Bursa'da çalışan bir full-stack geliştiriciyim. Nisan 2024'ten beri ThinkCut'ta İK ürünleri geliştiriyorum: tekrar kullanılabilir arayüz bileşenleri, API entegrasyonları ve hız ile arama için ayarlanmış, sunucuda oluşturulan sayfalar. Öncesinde Dijital Sahne'de Node.js, TypeScript ve PostgreSQL ile müşteri projeleri yayına aldım. React, Next.js, NestJS, PostgreSQL, Redis ve Docker ile çalışıyorum.",
  },
  record: {
    title: "Her rol, bir diff olarak",
    versions: "Sürümler",
    change: "Değişiklik",
    field: "Alan",
    before: "Önce",
    company: "Şirket",
    role: "Rol",
    period: "Dönem",
    kept: "Korunan",
    dropped: "Bırakılan",
    added: "Eklenen",
    why: "Neden",
    who: "Kim",
    when: "Ne zaman",
    changed: "değişti",
    removed: "çıkarıldı",
    new: "eklendi",
    comparedWith: "karşılaştırılan:",
    branchedFrom: "dallandığı sürüm:",
    first: "ilk kayıt",
  },
  work: {
    title: "Seçili işler",
    next: "Sonraki vaka çalışması",
    back: "Seçili işlere dön",
    changed: "Neler değişti",
    did: "Neler yaptım",
    cv: "Özgeçmişin tamamını oku",
  },
  updated: "Güncelleme: {date}",
  now: { title: "Şimdi", current: "Şu an", shell: "Terminal", uses: "Araçlar", usesLink: "Neyle geliştirdiğim" },
  uses: { title: "Kullandıklarım" },
  cv: { experience: "Deneyim", skills: "Yetkinlikler" },
  close: { title: "Sıradaki kaydı birlikte yazalım.", memoji: "Umut'un memojisi", sign: "Umut, Osmangazi, Bursa", elsewhere: "Diğer hesaplar" },
  notFound: { title: "Bu sayfa kayıtta yok", back: "Ana sayfaya dön" },
  meta: {
    home: {
      title: "Umut Kızıloğlu — Bursa'da Full-Stack Yazılım Geliştirici",
      description:
        "Bursa'da React, Next.js, TypeScript, NestJS ve PostgreSQL ile ölçeklenebilir web uygulamaları geliştiren full-stack geliştirici. Şu an ThinkCut'ta.",
    },
    now: {
      title: "Şimdi — Umut Kızıloğlu",
      description:
        "Şu an üzerinde çalıştığım iş: Bursa'da, ThinkCut'ta full-stack geliştirme.",
    },
    uses: {
      title: "Kullandıklarım: Araçlar ve Kurulum — Umut Kızıloğlu",
      description:
        "Full-stack geliştirici olarak her gün kullandığım framework, dil ve araçlar: React, Next.js, NestJS, PostgreSQL, Docker ve fazlası.",
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
