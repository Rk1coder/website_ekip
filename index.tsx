import { LanguageProvider, useLanguage } from './src/i18n';
import './src/sponsors.css';
import './src/refinements.css';
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Plane, 
  Users, 
  Navigation, 
  Cpu, 
  Code,
  Wrench,
  BarChart3,
  CircuitBoard,
  ChevronRight,
  Globe,
  Radio,
  Trophy,
  Activity,
  Target,
  ExternalLink,
  Award,
  History,
  Rocket,
  Shield,
  Layers,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Star,
  Mail,
  Menu,
  X,
  Compass,
  Zap,
  Cpu as Chip,
  Linkedin as LinkedinIcon,
  Crown,
  Box,
  Shirt,
  Video,
  Settings,
  Printer,
  Factory,
  CheckCircle2,
  Milestone,
  Timer,
  Microchip,
  Cpu as Processor,
  CloudLightning,
  MapPin,
  Phone,
  Send,
  Bell,
  ClipboardCheck,
  Info,
  BookOpen,
  GraduationCap,
  FlaskConical,
  Binary,
  Megaphone,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

// --- Types ---
type Page = 'home' | 'fleet' | 'achievements' | 'crew' | 'contact';

interface Aircraft {
  name: string;
  desc: string;
  badge: string;
  type: string;
  photo?: string;
}

interface TeamMember {
  name: string;
  surname: string;
  role: string;
  dept: string;
  photo?: string; 
  linkedin?: string;
  isSenior?: boolean;
}

interface Sponsor {
  name: string;
  sub: string;
  isGlobal: boolean;
  background: string;
  logo?: string;
}

// --- Data ---
const TEAM_MEMBERS: TeamMember[] = [
  { name: "Hasan Bedirhan", surname: "Çolak", role: "Yazılım ve Kontrol", dept: "Yazılım" },
  { name: "Çetin Berat", surname: "Türkay", role: "Analiz", dept: "Analiz" },
  { name: "Zehra", surname: "Boyraz", role: "Aviyonik", dept: "Aviyonik" },
  { name: "Kürşat", surname: "Çiçin", role: "Ekip Kaptanı", dept: "Aviyonik Lideri", isSenior: true, linkedin: "#", photo: "/crew/kursat-cicin.jpg" },
  { name: "Kadir", surname: "Arslanpınar", role: "Baş Tasarımcı", dept: "Mekanik Tasarım", isSenior: true, linkedin: "#", photo: "/crew/kadir-arslanpinar.jpg" },
  { name: "Begüm", surname: "Aydoğan", role: "Yazılım Ve Kontrol", dept: "Yazılım", isSenior: true, linkedin: "#", photo: "/crew/begum-aydogan.jpg" },
  { name: "Rabia", surname: "Kıratlı", role: "Yazılım Lideri", dept: "Yazılım", isSenior: true, linkedin: "#", photo: "/crew/rabia-kiratli.jpg" },
  { name: "Mustafa", surname: "Ardıç", role: "Üretim Sorumlusu", dept: "Analiz ve Üretim", isSenior: true, linkedin: "#", photo: "/crew/mustafa-ardic.jpg" },
  { name: "Mustafa", surname: "Özcan", role: "Ar-Ge Mühendisi", dept: "Mekanik Tasarım", linkedin: "#", photo: "/crew/mustafa-ozcan.jpg" },
  { name: "İsmail", surname: "Tanoğlu", role: "Ar-Ge Mühendisi", dept: "Aviyonik", linkedin: "#", photo: "/crew/ismail-tanoglu.jpg" },
  { name: "Akif Kerem", surname: "Özkan", role: "Ar-Ge Mühendisi", dept: "Mekanik Tasarım", linkedin: "#", photo: "/crew/akif-kerem-ozkan.jpg" },
  { name: "Mustafa", surname: "Albayrak", role: "Ar-Ge Mühendisi", dept: "Yazılım", linkedin: "#", photo: "/crew/mustafa-albayrak.jpg" },
  { name: "Ahmet Faruk", surname: "Işık", role: "Ar-Ge Mühendisi", dept: "Analiz", linkedin: "#", photo: "/crew/ahmet-faruk-isik.jpg" },
  { name: "Ahmet Korkmaz", surname: "Peker", role: "Ar-Ge Mühendisi", dept: "Aviyonik", linkedin: "#", photo: "/crew/ahmet-korkmaz-peker.jpg" },
  { name: "Halil", surname: "Közoğlu", role: "Ar-Ge Mühendisi", dept: "Mekanik Tasarım", linkedin: "#", photo: "/crew/halil-kozoglu.jpg" },
];

const FLEET_DATA: Aircraft[] = [
  { name: "Sarp", desc: "Pars platformunun VTOL kabiliyeti kazanmış hibrit versiyonu. 2025 METU VTOL yarışmasında 5. ardışık şampiyonluğu getiren amiral gemimiz.", badge: "2025 CHAMPION", type: "Hybrid / VTOL", photo: "/fleet/sarp.jpg" },
  { name: "Tulpar", desc: "Hibrit tilt-rotor mekanizmalı özgün tasarım. METU VTOL 2020, 2022, 2023 şampiyonluklarının simgesi.", badge: "CHAMPION", type: "Hybrid / VTOL", photo: "/fleet/tulpar.png" },
  { name: "Pars", desc: "Savaşan İHA kategorisi için 9 prototip ile geliştirilen platform. Sarp İHA'nın aerodinamik atasını temsil eder.", badge: "COMBAT READY", type: "Fixed Wing", photo: "/fleet/pars.png" },
  { name: "Tuğberk", desc: "Ağır kırım sonrası 30 saatte onarılarak şampiyon olan, dayanıklılığımızın sembolü olan VTOL.", badge: "RESILIENT", type: "VTOL", photo: "/fleet/tugberk.png" },
  { name: "Dikine Teyyare", desc: "2017 METU VTOL En İyi Uçuş Performance 1.liği kazanan ilk dikey kalkış projemiz.", badge: "CLASSIC", type: "VTOL", photo: "/fleet/dikine.png" },
  { name: "Fenrir", desc: "TÜBİTAK İHA yarışmalarında final aşamasına kadar yükselen uzun menzilli platform.", badge: "FINALIST", type: "Fixed Wing", photo: "/fleet/fenrir.jpeg" },
  { name: "Ebabil", desc: "2016'da Türkiye'nin ilk İHA yarışmasında 6.lık alan miras projemiz.", badge: "LEGACY", type: "Fixed Wing", photo: "/fleet/ebabil.png" },
  { name: "Gökbörü", desc: "Yüksek manevra kabiliyeti ve otonom görev odaklı 2020 tasarımı sabit kanat.", badge: "AGILE", type: "Fixed Wing", photo: "/fleet/gokboru.png" },
];

const ACHIEVEMENTS_TIMELINE = [
  { year: "2025", desc: "METU VTOL'25 Uluslararası Yarışması Genel Sıralama 1.liği. TEKNOFEST 2025 Sürü İHA ve Savaşan İHA kategorilerinde sayılı finalist takımlardan biri olma başarısı.", category: "CHAMPION & FINALIST", icon: <Trophy /> },
  { year: "2024", desc: "TEKNOFEST 2024 Savaşan İHA Yarışması (Şampiyonlar Ligi) Raporlama 3.lüğü ve finalistlik başarısı.", category: "TECHNICAL AWARD", icon: <Target /> },
  { year: "2023", desc: "METU VTOL'23 Genel Sıralama 1.liği. TEKNOFEST 2023 Uzay, Havacılık ve Savunma Teknolojileri Girişim Yarışması'nda 'En İyi Girişim' ödülü ile 1.lik.", category: "CHAMPION & STARTUP", icon: <Navigation /> },
  { year: "2022", desc: "METU VTOL'22 Genel Sıralama 1.liği başarısı. Teknofest Savaşan İHA yarışmasında 6.lık elde edilmiştir.", category: "CHAMPION", icon: <Award /> },
  { year: "2020", desc: "METU VTOL'20 Genel Sıralama 1.liği. TEKNOFEST 2020'de pandemi koşullarına rağmen hem Döner Kanat hem Sabit Kanat kategorilerinde katılım başarısı.", category: "CHAMPION & AGILITY", icon: <Shield /> },
  { year: "2019", desc: "Dünyanın en prestijli İHA yarışması olan AIAA DBF (USA)'da 'Best Turkish Team' başarısı. TEKNOFEST 2019 Savaşan İHA Finalistliği ve genel sıralama 13.lüğü.", category: "GLOBAL & NATIONAL", icon: <Globe /> },
  { year: "2018", desc: "METU VTOL'18 Genel Sıralama 1.liği ile ilk büyük şampiyonluk başarısı.", category: "CHAMPION", icon: <History /> },
  { year: "2017", desc: "Hem döner kanat hem de sabit kanat da yarışmaya katılım sağlanmış ve döner kanatlı kategorisinde 4.olunmuştur.METU VTOL’17 yarışmada ekibimiz en iyi uçuş performansı kategorisinde 1., genel sıralamada 2. olmuştur", category: "First Steps", icon: <History /> },
  { year: "2016", desc: "Türkiye'nin ilk İHA yarışması olan TÜBİTAK İHA Yarışması'nda 6.lık başarısı.", category: "LEGACY", icon: <Rocket /> },
];

const ACADEMIC_STUDIES = [
  { title: "TÜBİTAK 2209-A", subtitle: "Üniversite Öğrencileri Araştırma Projeleri Destekleme Programı", desc: "Ekibimiz lisans düzeyinde yürüttüğü araştırma projeleriyle TÜBİTAK tarafından desteklenmektedir.", icon: <GraduationCap /> },
  { title: "TÜBİTAK 1001", subtitle: "Bilimsel ve Teknolojik Araştırma Projelerini Destekleme Programı", desc: "Orta ve büyük ölçekli bilimsel araştırma projelerinde ekibimiz aktif rol almaktadır.", icon: <FlaskConical /> },
  { title: "TÜBİTAK 1002", subtitle: "Hızlı Destek Programı", desc: "Kısa süreli ve düşük bütçeli Ar-Ge projelerinde kabul edilmiş akademik çalışmalarımız mevcuttur.", icon: <Zap /> },
  { title: "BAP PROJELERİ", subtitle: "Bilimsel Araştırma Projeleri", desc: "Üniversitemiz bünyesinde yürütülen teknik projelerde akademik kabullerimiz ve devam eden çalışmalarımız bulunmaktadır.", icon: <BookOpen /> },
];

const SPONSORS: Sponsor[] = [
  {
    name: 'Dassault Systèmes',
    sub: 'Design & Simulation',
    isGlobal: true,
    background: '/sponsors/backgrounds/cad.webp',
    logo: '/sponsors/logos/dassault-systemes.png'
  },
  {
    "name": "MathWorks",
    "sub": "Computing Software",
    "isGlobal": true,
    "background": "/sponsors/backgrounds/simulation.webp",
    "logo": "/sponsors/logos/mathworks.png"
  },
  {
    "name": "SolidWorks",
    "sub": "3D CAD Design",
    "isGlobal": true,
    "background": "/sponsors/backgrounds/cad.webp",
    "logo": "/sponsors/logos/solidworks.png"
  },
  {
    "name": "Altium",
    "sub": "PCB Design",
    "isGlobal": true,
    "background": "/sponsors/backgrounds/electronics.webp",
    "logo": "/sponsors/logos/altium.svg"
  },
  {
    "name": "Polymaker3D",
    "sub": "Printing Materials",
    "isGlobal": true,
    "background": "/sponsors/backgrounds/materials.webp",
    "logo": "/sponsors/logos/polymaker.png"
  },
  {
    "name": "Innopark",
    "sub": "Technology Center",
    "isGlobal": false,
    "background": "/sponsors/backgrounds/technology.webp",
    "logo": "/sponsors/logos/innopark.png"
  },
  {
    "name": "Printest",
    "sub": "Printing Services",
    "isGlobal": false,
    "background": "/sponsors/backgrounds/printing.webp",
    "logo": "/sponsors/logos/printest.png"
  },
  {
    "name": "Medyavuz",
    "sub": "Media Partner",
    "isGlobal": false,
    "background": "/sponsors/backgrounds/media.webp",
    "logo": "/sponsors/logos/medyavuz.png"
  },
  {
    "name": "Erva İş Elbiseleri",
    "sub": "Technical Wear",
    "isGlobal": false,
    "background": "/sponsors/backgrounds/workwear.webp"
  },
  {
    "name": "Kıratlıoğlu Kaporta",
    "sub": "Mechanical Support",
    "isGlobal": false,
    "background": "/sponsors/backgrounds/mechanical.webp"
  },
  {
    name: 'Kahveci Otomotiv',
    sub: 'Automotive',
    isGlobal: false,
    background: '/sponsors/backgrounds/mechanical.webp',
    logo: '/sponsors/logos/kahveci-otomotiv.png'
  },
  {
    name: 'Ceylan Composite',
    sub: 'Composite Materials',
    isGlobal: false,
    background: '/sponsors/backgrounds/materials.webp',
    logo: '/sponsors/logos/ceylan-composite.png'
  }
];

// --- Standardized Heading Component ---
const PageHeading = ({ title, subtitle, emphasis }: { title: string, subtitle?: string, emphasis?: string }) => (
  <div className="text-center mb-10 md:mb-14 px-4">
    <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-4 text-white">
      {title} {emphasis && <span className="text-blue-400">{emphasis}</span>}
    </h2>
    {subtitle && <p className="text-slate-500 mono text-[10px] md:text-xs uppercase tracking-[0.4em] font-black mt-4">{subtitle}</p>}
  </div>
);

// --- Components ---

const ContactSection = () => {
  const { t } = useLanguage();
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <PageHeading title={t("BİZE")} emphasis={t("ULAŞIN")} subtitle={t("GET IN TOUCH WITH OUR TEAM")} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <div className="space-y-10">
          <div className="glass-panel p-10 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-blue-600/10">
                <Mail className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">{t("E-Mail")}</h3>
                <a href="mailto:gokturkekibi@gmail.com" className="text-lg text-blue-400 hover:text-blue-300 transition-colors font-bold break-all">
                  gokturkekibi@gmail.com
                </a>
                <p className="text-slate-500 text-sm mt-2">{t("Tüm sorularınız ve önerileriniz için bizimle iletişime geçin.")}</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-10 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-blue-600/10">
                <MapPin className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">{t("Yer / Konum")}</h3>
                <p className="text-lg text-slate-300 font-bold mb-2">{t("Necmettin Erbakan Üniversitesi")}<br />{t("Mühendislik Fakültesi")}<br />{t("Konya, Türkiye")}</p>
                <a 
                  href="https://www.google.com/maps/search/Necmettin+Erbakan+%C3%9Cniversitesi+M%C3%BChendislik+Fakültesi+Konya" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-bold flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />{t("Haritada Aç")}</a>
              </div>
            </div>
          </div>

          <div className="glass-panel p-10 rounded-2xl border border-blue-500/20">
            <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-8">{t("Sosyal Medya")}</h3>
            <div className="grid grid-cols-2 gap-6">
              <a 
                href="https://www.instagram.com/gokturkekibi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-6 rounded-2xl bg-blue-600/10 hover:bg-pink-600/20 transition-all border border-blue-500/20 hover:border-pink-500/40 text-center"
              >
                <Instagram className="w-8 h-8 mx-auto mb-3 text-slate-400 group-hover:text-pink-500 transition-colors" />
                <p className="font-black text-white group-hover:text-pink-400 transition-colors">Instagram</p>
              </a>
              
              <a 
                href="https://www.linkedin.com/company/ne%C3%BC-g%C3%B6kt%C3%BCrk-uas/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-6 rounded-2xl bg-blue-600/10 hover:bg-blue-700/20 transition-all border border-blue-500/20 hover:border-blue-600/40 text-center"
              >
                <LinkedinIcon className="w-8 h-8 mx-auto mb-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
                <p className="font-black text-white group-hover:text-blue-400 transition-colors">LinkedIn</p>
              </a>

              <a 
                href="https://www.youtube.com/@gokturkekibi219" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-6 rounded-2xl bg-blue-600/10 hover:bg-red-600/20 transition-all border border-blue-500/20 hover:border-red-500/40 text-center"
              >
                <Youtube className="w-8 h-8 mx-auto mb-3 text-slate-400 group-hover:text-red-500 transition-colors" />
                <p className="font-black text-white group-hover:text-red-400 transition-colors">YouTube</p>
              </a>
            </div>
          </div>
        </div>

        <div className="glass-panel p-12 rounded-2xl border border-blue-500/20 h-fit sticky top-24">
          <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-10">{t("Direkt Mesaj Gönder")}</h3>
          <form 
            action={`https://formspree.io/f/mykkyblk`}
            method="POST" 
            className="space-y-6"
          >
            <div>
              <label className="block text-white font-bold text-sm mb-3 uppercase tracking-wider">{t("Adınız")}</label>
              <input 
                type="text" 
                name="name"
                placeholder={t("Adınız ve soyadınız")}
                required
                className="w-full px-5 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-white font-bold text-sm mb-3 uppercase tracking-wider">{t("E-Mail")}</label>
              <input 
                type="email" 
                name="email"
                placeholder={t("ornek@email.com")}
                required
                className="w-full px-5 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-white font-bold text-sm mb-3 uppercase tracking-wider">{t("Konu")}</label>
              <input 
                type="text" 
                name="subject"
                placeholder={t("Mesajınızın konusu")}
                required
                className="w-full px-5 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-white font-bold text-sm mb-3 uppercase tracking-wider">{t("Mesaj")}</label>
              <textarea 
                name="message"
                placeholder={t("Mesajınızı yazın...")}
                rows={6}
                required
                className="w-full px-5 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-all resize-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20"
            >
              <Send className="w-5 h-5" />{t("Gönder")}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

const SponsorCard = ({ sponsor }: { sponsor: Sponsor }) => {
  const { t } = useLanguage();
  const [logoError, setLogoError] = useState(false);

  return (
    <article className="sponsor-card">
      <img className="sponsor-card-background" src={sponsor.background} alt="" loading="lazy" decoding="async" width="1536" height="1024" />
      <div className="sponsor-card-shade" />
      <div className="sponsor-card-top">
        <span className="sponsor-category">{t(sponsor.isGlobal ? 'Global Partner' : 'sponsors.localPartner')}</span>
        <span className="sponsor-card-dot" aria-hidden="true" />
      </div>
      <div className="sponsor-card-content">
        <div data-sponsor={sponsor.name} className={sponsor.logo && !logoError ? `sponsor-logo-panel${sponsor.name === 'Altium' ? ' sponsor-logo-panel--dark' : ''}` : 'sponsor-wordmark'}>
          {sponsor.logo && !logoError ? (
            <img className={sponsor.name === "MathWorks" || sponsor.name === "SolidWorks" ? "sponsor-logo-padded" : undefined} src={sponsor.logo} alt={sponsor.name} loading="lazy" decoding="async" onError={() => setLogoError(true)} />
          ) : <h3 lang="tr">{sponsor.name}</h3>}
        </div>
        <div className="sponsor-card-caption">
          <span>{t(sponsor.sub)}</span>
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
};

const SponsorSection = () => {
  const { t } = useLanguage();
  const [paused, setPaused] = useState(false);

  return (
    <section id="sponsors" className="sponsors-section" aria-labelledby="sponsors-heading">
      <div className="sponsors-heading-row">
        <div>
          <p className="sponsors-eyebrow">{t('sponsors.eyebrow')}</p>
          <h2 id="sponsors-heading">{t('sponsors.title')} <span>{t('sponsors.emphasis')}</span></h2>
          <p className="sponsors-description">{t('sponsors.description')}</p>
        </div>
        <button type="button" className="sponsors-pause" aria-pressed={paused} onClick={() => setPaused(value => !value)}>
          <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
          {t(paused ? 'sponsors.play' : 'sponsors.pause')}
        </button>
      </div>
      <div className="sponsors-window" tabIndex={0} role="region" aria-label={t('sponsors.list')}>
        <div className={`sponsors-track${paused ? ' is-paused' : ''}`}>
          {[0, 1].map(copy => (
            <div className="sponsors-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {SPONSORS.map(sponsor => <SponsorCard key={sponsor.name} sponsor={sponsor} />)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AircraftCard = ({ plane }: { plane: Aircraft }) => {
  const { t } = useLanguage();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative overflow-hidden glass-panel rounded-2xl border border-blue-900/10 hover:border-blue-500/30 transition-all duration-500 h-full flex flex-col">
      <div className="relative h-64 md:h-80 bg-slate-900 overflow-hidden">
        {plane.photo && !imgError ? (
          <img src={plane.photo} alt={plane.name} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" onError={() => setImgError(true)}/>
        ) : (
          <ImagePlaceholder label={plane.name} className="h-full border-none" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
        <div className="absolute top-6 right-6">
          <span className="text-[9px] md:text-[11px] bg-blue-600 px-5 py-2 rounded-full text-white font-black uppercase tracking-[0.15em] shadow-2xl">{t(plane.badge)}</span>
        </div>
      </div>
      <div className="p-10 flex flex-col flex-grow bg-slate-950/40">
        <div className="flex items-center gap-4 mb-5">
          <h3 className="text-2xl md:text-3xl font-bold uppercase text-white group-hover:text-blue-400 transition-colors">{plane.name}</h3>
          <div className="h-px bg-blue-900/30 flex-grow"></div>
        </div>
        <span className="text-[11px] mono text-blue-400/80 uppercase tracking-[0.4em] font-black mb-5">{t(plane.type)}</span>
        <p className="text-slate-400 text-sm md:text-lg leading-relaxed font-light">{t(plane.desc)}</p>
      </div>
    </div>
  );
};

const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  const { t } = useLanguage();
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`group relative p-8 glass-panel rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${member.isSenior ? 'border-blue-500/30' : 'border-slate-800'}`}>
      <div className="relative mb-8 mx-auto w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-3xl bg-slate-900 shadow-inner">
        {member.photo && !imgError ? (
          <img src={member.photo} alt={member.name} className="w-full h-full object-cover grayscale-0 group-hover:grayscale group-hover:scale-110 transition-all duration-500 opacity-100 group-hover:opacity-90" onError={() => setImgError(true)}/>
        ) : (
          <ImagePlaceholder label="GÖKTÜRK" className="h-full border-none" />
        )}
        {member.isSenior && (
          <div className="absolute top-3 right-3 bg-blue-600 p-2 rounded-xl shadow-xl  z-20"><Star className="text-white w-3 h-3 fill-current" /></div>
        )}
        {member.linkedin && member.linkedin !== "#" && <div className="absolute inset-0 bg-blue-600/60 flex items-center justify-center gap-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white p-2.5 rounded-full text-blue-600 hover:scale-110 transition-transform"><LinkedinIcon className="w-5 h-5" /></a>
        </div>}
      </div>
      <div className="text-center">
        <h4 lang="tr" className="text-xl font-black uppercase tracking-tight text-white group-hover:text-blue-400 transition-colors">{member.name} <span className="text-blue-400 group-hover:text-white">{member.surname}</span></h4>
        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] mt-2 mb-4">{t(member.role)}</p>
        <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 text-slate-500 text-[9px] mono uppercase tracking-tighter font-black">{t(member.dept)}</div>
      </div>
    </div>
  );
};

const Navbar = ({ activePage, setPage }: { activePage: Page, setPage: (p: Page) => void }) => {
  const { t, language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { id: 'home', label: 'Ana Sayfa' }, 
    { id: 'fleet', label: 'Uçaklarımız' }, 
    { id: 'achievements', label: 'Başarılarımız' }, 
    { id: 'crew', label: 'Ekibimiz' },
    { id: 'contact', label: 'İletişim' }
  ];
  const handleNav = (p: Page) => { setPage(p); setIsMenuOpen(false); };

  return (
    <nav className="fixed top-0 w-full z-[100] glass-panel border-b border-blue-500/10 px-3 md:px-8 py-4 md:py-5 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-2 md:gap-4 cursor-pointer group" onClick={() => handleNav('home')}>
        <div className="bg-blue-600/20 p-2 rounded-xl group-hover:bg-blue-600/40 transition-all">
          <Logo className="w-6 h-6 md:w-10 md:h-10" />
          <Target className="text-white w-8 h-8 fallback-icon hidden" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-sm md:text-2xl font-black tracking-tighter glow-text uppercase text-white">GÖKTÜRK <span className="text-blue-400 italic">{t("İHA")}</span></span>
          <span className="text-[7px] md:text-[8px] mono text-blue-300/60 uppercase tracking-[0.4em] font-bold">{t("NEU • KONYA")}</span>
        </div>
      </div>
      <div className="hidden xl:flex gap-6 text-[11px] font-black uppercase tracking-[0.25em]">
        {menuItems.map(item => (
          <button key={item.id} onClick={() => handleNav(item.id as Page)} className={`${activePage === item.id ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-white'} transition-all pb-1`}>
            {t(item.label)}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <div role="group" aria-label="Türkçe / English" className="flex items-center rounded-xl border border-blue-500/30 p-1 shrink-0">
          {(['tr', 'en'] as const).map(code => (
            <button key={code} type="button" lang={code} aria-label={code === 'tr' ? 'Türkçe' : 'English'} aria-pressed={language === code} onClick={() => setLanguage(code)} className={`px-2 py-2 rounded-lg text-[10px] font-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 ${language === code ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
              {code.toUpperCase()}
            </button>
          ))}
        </div>
        <a href="https://form.jotform.com/212165646397059" target="_blank" className="bg-white text-slate-950 px-2 md:px-5 py-2 md:py-2.5 rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-wider hover:bg-blue-50 transition-all flex items-center gap-3">{t("KATIL")}<ExternalLink className="hidden sm:block w-4 h-4" /></a>
        <button type="button" aria-label={t(isMenuOpen ? "Menüyü kapat" : "Menüyü aç")} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" className="xl:hidden text-slate-400 p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}</button>
      </div>

      {isMenuOpen && (
        <div id="mobile-navigation" className="absolute top-full left-0 right-0 bg-slate-950/95 border-b border-blue-500/10 xl:hidden z-50">
          <div className="flex flex-col gap-4 p-6 max-w-7xl mx-auto">
            {menuItems.map(item => (
              <button key={item.id} onClick={() => handleNav(item.id as Page)} className={`text-left py-3 px-4 rounded-lg font-black uppercase tracking-[0.15em] transition-all ${
                activePage === item.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
              }`}>
                {t(item.label)}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Logo = ({ className = "w-10 h-10" }: { className?: string }) => <img src="/logo.png" alt="Logo" className={`${className} object-contain`} onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden'); }} />;
const ImagePlaceholder = ({ label, className = "" }: { label: string, className?: string }) => (
  <div className={`w-full bg-slate-900/50 border-2 border-dashed border-blue-900/50 flex flex-col items-center justify-center p-8 text-center group ${className}`}>
    <Target className="w-10 h-10 text-slate-700 group-hover:text-blue-400 transition-colors mb-4" />
    <span className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">{label}</span>
  </div>
);

const App = () => {
  const { t } = useLanguage();
  const [page, setPage] = useState<Page>('home');
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div className="site-shell min-h-screen bg-[#020617] selection:bg-blue-500 selection:text-white font-['Inter']">
      <Navbar activePage={page} setPage={setPage} />

      {page === 'home' && (
        <>
          <section id="hero" className="relative min-h-[85svh] pt-28 pb-16 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0 scanlines">
              <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/40 via-[#020617]/70 to-[#020617] z-10"></div>
              <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60"><source src="/background-4.mp4" type="video/mp4" /></video>
            </div>
            <div className="relative z-20 text-center px-6 mt-4 max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-blue-400 text-[10px] md:text-[12px] mono uppercase tracking-[0.4em] mb-10 font-black">
                <History className="w-4 h-4" />{t("EST. 2016 • AEROSPACE EXCELLENCE")}</div>
              <div className="flex flex-col items-center gap-6 mb-8">
                <Logo className="w-20 h-20 md:w-28 md:h-28 mb-2" />
                <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-4 leading-tight text-white">
                  GÖKTÜRK <br />
                  <span className="text-blue-400">{t("İHA EKİBİ")}</span>
                </h1>
              </div>
              <p className="max-w-3xl mx-auto text-slate-300 text-base md:text-xl mb-8 md:mb-10 leading-relaxed font-light px-4">{t("\"Yerli ve milli mühendislik çözümleriyle İnsansız Hava Araçları'nın geleceğini tasarlıyoruz.\"")}</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button onClick={() => setPage('fleet')} className="bg-blue-600 text-white px-7 md:px-9 py-3.5 md:py-4 rounded-2xl md:rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm hover:scale-105 transition-all flex items-center justify-center gap-4 shadow-xl shadow-blue-600/20">{t("PROJELERİMİZ")}<ChevronRight className="w-5 h-5" /></button>
                <button onClick={() => setPage('crew')} className="border border-blue-500/30 bg-slate-900/40 backdrop-blur-md px-7 md:px-9 py-3.5 md:py-4 rounded-2xl md:rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm text-white hover:bg-slate-900/60 transition-all">{t("EKİBİMİZ")}</button>
              </div>
            </div>
          </section>

          <SponsorSection />

          <section className="py-24 md:pt-28 pb-16 md:pt-36 md:pb-24 px-6 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-10 text-center text-white">{t("TEKNİK")} <span className="text-blue-500">{t("DEPARTMANLAR")}</span></h2>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
              {[
                { name: 'Analiz', icon: <BarChart3 className="w-8 h-8"/>, desc: 'Aerodinamik optimizasyon.' },
                { name: 'Mekanik', icon: <Wrench className="w-8 h-8"/>, desc: '3D Tasarım ve CAD.' },
                { name: 'Yazılım', icon: <Code className="w-8 h-8"/>, desc: 'Otonom kontrol sistemleri.' },
                { name: 'Aviyonik', icon: <CircuitBoard className="w-8 h-8"/>, desc: 'Elektronik ve PCB.' },
                { name: 'Kompozit', icon: <Layers className="w-8 h-8"/>, desc: 'Üretim ve montaj.' }
              ].map((cap, i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl border border-blue-900/20 text-center group transition-all hover:bg-blue-900/10 hover:-translate-y-1">
                  <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform flex justify-center">{cap.icon}</div>
                  <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-white mb-3">{t(cap.name)}</h3>
                  <p className="hidden md:block text-[10px] text-slate-500 leading-relaxed font-bold">{t(cap.desc)}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="featured-projects" className="py-16 md:py-24 px-6 max-w-7xl mx-auto" aria-labelledby="featured-projects-heading">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">{t('featured.eyebrow')}</p>
                <h2 id="featured-projects-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">{t('featured.title')}</h2>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">{t('featured.description')}</p>
              </div>
              <button type="button" onClick={() => setPage('fleet')} className="shrink-0 self-start md:self-auto inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-slate-700 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">
                {t('featured.all')} <ArrowUpRight className="w-4 h-4 text-blue-400" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {FLEET_DATA.filter(plane => plane.name === 'Sarp' || plane.name === 'Tulpar').map(plane => (
                <AircraftCard key={plane.name} plane={plane} />
              ))}
            </div>
          </section>

          <section id="achievement-highlights" className="px-6 py-12 md:py-16 max-w-7xl mx-auto" aria-labelledby="achievement-highlights-heading">
            <div className="border-y border-slate-800 py-10 md:py-14">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div className="max-w-2xl">
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">{t('highlights.eyebrow')}</p>
                  <h2 id="achievement-highlights-heading" className="text-3xl md:text-4xl font-bold text-white">{t('highlights.title')}</h2>
                </div>
                <button type="button" onClick={() => setPage('achievements')} className="self-start shrink-0 inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-slate-700 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">
                  {t('highlights.all')} <ArrowUpRight className="w-4 h-4 text-blue-400" aria-hidden="true" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { year: '2025', title: 'highlights.vtol.title', description: 'highlights.vtol.description', icon: <Trophy className="w-5 h-5" aria-hidden="true" /> },
                  { year: '2023', title: 'highlights.startup.title', description: 'highlights.startup.description', icon: <Rocket className="w-5 h-5" aria-hidden="true" /> },
                  { year: '2019', title: 'highlights.dbf.title', description: 'highlights.dbf.description', icon: <Globe className="w-5 h-5" aria-hidden="true" /> }
                ].map(item => (
                  <article key={item.year} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
                    <div className="flex items-center justify-between text-blue-400 mb-6">
                      {item.icon}<span className="mono text-xs">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{t(item.title)}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{t(item.description)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="announcements" className="py-16 md:py-24 px-6 max-w-7xl mx-auto" aria-labelledby="announcements-heading">
            <div className="mb-10 max-w-2xl">
              <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">{t('news.eyebrow')}</p>
              <h2 id="announcements-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">{t('news.title')}</h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">{t('news.description')}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
              <div className="lg:col-span-3 space-y-6">
                <article className="p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-900/40">
                  <div className="flex flex-wrap items-center gap-3 text-xs mb-6">
                    <span className="rounded-md bg-blue-500/10 px-3 py-1.5 text-blue-300 font-semibold">{t('YARIŞMA KATILIMI')}</span>
                    <span className="text-slate-400">{t('2026 • ADIYAMAN')}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-white mb-5">{t('İleri Otonom Sistemler Tasarım ve Operasyon Yarışması')}</h3>
                  <p className="text-slate-300 text-base leading-relaxed">{t('Göktürk ekibi olarak 2026 yılında Adıyaman’da gerçekleşen İleri Otonom Sistemler Tasarım ve Operasyon Yarışması’nda yer aldık.')}</p>
                </article>
                <details className="news-archive rounded-2xl border border-slate-800 bg-slate-900/20">
                  <summary className="cursor-pointer px-6 py-5 text-sm font-semibold text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400">{t('news.archive')}</summary>
                  <div className="px-6 pb-6 divide-y divide-slate-800">
                    {[
                      { date: 'OCAK 2026', title: 'TEKNOFEST ŞANLIURFA', desc: 'Teknofest 2026 için hazırlıklarımız tüm hızıyla başladı!' },
                      { date: 'EKİM 2025', title: 'AKADEMİK BAŞVURU', desc: 'TÜBİTAK 2209-A İÇİN EKİBİMİZDEN REKOR KATILIMLA, 6 BAŞVURU YAPTIK!' }
                    ].map(item => (
                      <article key={item.date} className="py-5 last:pb-0">
                        <p className="text-xs text-slate-400 mb-2">{t(item.date)}</p>
                        <h3 className="text-base font-semibold text-white mb-2">{t(item.title)}</h3>
                        <p className="text-sm leading-relaxed text-slate-400">{t(item.desc)}</p>
                      </article>
                    ))}
                  </div>
                </details>
              </div>
              <aside className="lg:col-span-2 p-6 md:p-8 rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-950/60 to-slate-900/60" aria-labelledby="applications-heading">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-5 h-5 text-blue-400" aria-hidden="true" />
                  <span className="text-blue-300 text-xs font-semibold">{t('YENİ DÖNEM BAŞVURULARI')}</span>
                </div>
                <h3 id="applications-heading" className="text-2xl md:text-3xl font-semibold text-white mb-4">{t('news.applicationTitle')}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-7">{t('news.applicationDescription')}</p>
                <ol className="space-y-4 mb-8">
                  {['FORM', 'ELEME', 'MÜLAKAT'].map((step, index) => (
                    <li key={step} className="flex items-center gap-3 text-sm text-slate-200">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full border border-blue-500/30 text-blue-300 text-xs" aria-hidden="true">{index + 1}</span>
                      {t(step)}
                    </li>
                  ))}
                </ol>
                <a href="https://form.jotform.com/212165646397059" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white py-3.5 px-5 text-sm font-semibold transition-colors">
                  {t('news.apply')} <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <p className="text-xs text-slate-400 leading-relaxed mt-4">{t('TÜM BİRİMLERİMİZDE BAŞVURU AÇIKTIR')}</p>
              </aside>
            </div>
          </section>
        </>
      )}

      {page === 'fleet' && (
        <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-6 max-w-7xl mx-auto min-h-screen">
          <PageHeading title={t("İHA")} emphasis={t("FİLOMUZ")} subtitle={t("PROFESSIONAL AEROSPACE ENGINEERING PLATFORMS")} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {FLEET_DATA.map((plane, i) => <AircraftCard key={i} plane={plane} />)}
          </div>
        </section>
      )}

      {page === 'achievements' && (
        <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-6 max-w-7xl mx-auto min-h-screen">
          <PageHeading title={t("BAŞARI")} emphasis={t("RAPORU")} subtitle={t("Geçmişten Geleceğe Uzanan Başarı Zincirimiz")} />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { val: "5x", label: "METU VTOL 1.lik", },
              { val: "1.lik", label: "En İyi Girişim",  },
              { val: "USA", label: "Best Turkish Team", }
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-10 rounded-2xl border border-blue-500/20 text-center hover:bg-blue-900/10 transition-all">
                <h4 className="text-5xl font-black text-white tracking-tighter mb-2">{t(stat.val)}</h4>
                <p className="text-[10px] text-slate-500 mono uppercase tracking-widest font-black">{t(stat.label)}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-16">
              <h3 className="text-3xl font-black uppercase text-blue-500 italic flex items-center gap-4">
                <History className="w-8 h-8" />{t("KRONOLOJİK BAŞARI ÇİZGİSİ")}</h3>
              <div className="relative space-y-12">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-blue-900/50"></div>
                {ACHIEVEMENTS_TIMELINE.map((item, i) => (
                  <div key={i} className="pl-16 relative group">
                    <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-blue-600 border-4 border-slate-950 flex items-center justify-center z-10 group-hover:scale-125 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                      {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-4 h-4 text-white" })}
                    </div>
                    <div className="glass-panel p-8 rounded-2xl border border-blue-900/10 hover:border-blue-500/40 transition-all">
                      <div className="flex items-center gap-5 mb-4">
                        <span className="text-blue-400 font-black mono text-2xl tracking-tighter">{item.year}</span>
                        <span className="text-[9px] bg-blue-600/20 text-blue-400 px-4 py-1.5 rounded-full mono font-black uppercase tracking-[0.2em] border border-blue-500/20">{t(item.category)}</span>
                      </div>
                      <p className="text-slate-300 font-light leading-relaxed text-base">{t(item.desc)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-16">
              <h3 className="text-3xl font-black uppercase text-blue-500 italic flex items-center gap-4">
                <Microchip className="w-8 h-8" />{t("AKADEMİK ÇALIŞMALARIMIZ")}</h3>
              
              <div className="grid grid-cols-1 gap-8">
                {ACADEMIC_STUDIES.map((study, i) => (
                  <div key={i} className="glass-panel p-10 rounded-2xl border-l-8 border-l-blue-600 hover:bg-blue-900/10 transition-all group">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="p-3 rounded-2xl bg-blue-600/10 text-blue-500 group-hover:scale-110 transition-transform">
                        {study.icon}
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-white uppercase tracking-tight">{t(study.title)}</h4>
                        <p className="text-blue-400/60 text-[10px] font-black uppercase tracking-widest">{t(study.subtitle)}</p>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed font-light">{t(study.desc)}</p>
                  </div>
                ))}
                
                <div className="glass-panel p-10 rounded-2xl border border-slate-800 bg-blue-600/5">
                  <div className="flex items-center gap-5 mb-6">
                    <Binary className="text-blue-500 w-8 h-8" />
                    <h4 className="text-xl font-black uppercase tracking-tighter text-white">{t("ARAŞTIRMA VİZYONU")}</h4>
                  </div>
                  <p className="text-slate-300 text-sm italic leading-relaxed">{t("\"Ekibimiz, yarışmaların yanı sıra çeşitli akademik çalışmalarda da kabul almış olup, şu anda da üniversitemiz bünyesinde akademik çalışmalara aktif olarak devam etmektedir.\"")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {page === 'crew' && (
        <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-6 max-w-7xl mx-auto min-h-screen">
          <PageHeading title={t("MÜHENDİSLİK")} emphasis={t("EKİBİMİZ")} subtitle={t("DEDICATED FLIGHT & RESEARCH CREW")} />
          
          <div className="mb-16">
            <div className="flex items-center gap-8 mb-10 px-6">
              <div className="p-4 rounded-3xl bg-blue-600/10 border border-blue-500/20"><Award className="text-blue-500 w-10 h-10" /></div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-none mb-2">{t("KIDEMLİ PROJE EKİBİ")}</h3>
                <p className="text-blue-400/60 text-[11px] mono uppercase font-black tracking-[0.4em]">{t("Senior Engineering Management")}</p>
              </div>
              <div className="h-px bg-gradient-to-r from-blue-900/50 to-transparent flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {TEAM_MEMBERS.filter(m => m.isSenior).map((member, i) => <TeamMemberCard key={i} member={member} />)}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-8 mb-10 px-6">
              <div className="p-4 rounded-3xl bg-slate-800/50 border border-slate-700/50"><Chip className="text-slate-500 w-10 h-10" /></div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-300 leading-none mb-2">{t("AR-GE EKİBİ")}</h3>
                <p className="text-slate-500 text-[11px] mono uppercase font-black tracking-[0.4em]">{t("Research & Development Units")}</p>
              </div>
              <div className="h-px bg-gradient-to-r from-slate-900 to-transparent flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {TEAM_MEMBERS.filter(m => !m.isSenior).map((member, i) => <TeamMemberCard key={i} member={member} />)}
            </div>
          </div>
        </section>
      )}

      {page === 'contact' && (
        <ContactSection />
      )}


      <footer className="py-12 md:py-16 border-t border-blue-900/20 px-8 bg-[#01040f]">
        <div className="max-w-7xl mx-auto text-center">
          <Logo className="w-16 h-16 mx-auto mb-10 opacity-50 hover:opacity-100 transition-opacity" />
          <p className="text-slate-600 text-[11px] mono uppercase tracking-[0.6em] font-black">{t("© 2016-2025 GOKTURK UAV TECHNOLOGY TEAM • ALL RIGHTS RESERVED")}</p>
          <div className="flex justify-center mt-12 gap-10">
             <a href="https://www.instagram.com/gokturkekibi/" target="_blank" className="text-slate-500 hover:text-pink-500 hover:scale-125 transition-all"><Instagram className="w-8 h-8" /></a>
             <a href="https://twitter.com/gokturiha" target="_blank" className="text-slate-500 hover:text-blue-400 hover:scale-125 transition-all"><Twitter className="w-8 h-8" /></a>
             <a href="https://www.linkedin.com/company/ne%C3%BC-g%C3%B6kt%C3%BCrk-uas/" target="_blank" className="text-slate-500 hover:text-blue-600 hover:scale-125 transition-all"><LinkedinIcon className="w-8 h-8" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<LanguageProvider><App /></LanguageProvider>);