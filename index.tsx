
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useTranslation, I18nextProvider } from 'react-i18next';
import i18n from './src/i18n/config';
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
  Send
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
  icon: React.ReactNode;
}

// --- Data ---
const TEAM_MEMBERS: TeamMember[] = [
  { name: "Kürşat", surname: "Çiçin", role: "Ekip Kaptanı", dept: "Aviyonik Lideri", isSenior: true, linkedin: "#", photo: "/crew/kursat-cicin.jpg" },
  { name: "Kadir", surname: "Arslanpınar", role: "Baş Tasarımcı", dept: "Mekanik Tasarım", isSenior: true, linkedin: "#", photo: "/crew/kadir-arslanpinar.jpg" },
  { name: "Begüm", surname: "Aydoğan", role: "Yazılım Ve Kontrol", dept: "Yazılım", isSenior: true, linkedin: "#", photo: "/crew/begum-aydogan.jpg" },
  { name: "Rabia", surname: "Kıratlı", role: "Yazılım Lideri", dept: "Yazılım", isSenior: true, linkedin: "#", photo: "/crew/rabia-kiratli.jpg" },
  { name: "Mustafa", surname: "Ardıç", role: "Üretim Sorumlusu", dept: "Analiz ve Üretim", isSenior: true, linkedin: "#", photo: "/crew/mustafa-ardic.jpg" },
  { name: "Şevval", surname: "Özaytekin", role: "Ar-Ge Mühendisi", dept: "Yazılım", linkedin: "#", photo: "/crew/sevval-ozaytekin.jpg" },
  { name: "Mustafa", surname: "Özcan", role: "Ar-Ge Mühendisi", dept: "Mekanik Tasarım", linkedin: "#", photo: "/crew/mustafa-ozcan.jpg" },
  { name: "İsmail", surname: "Tanoğlu", role: "Ar-Ge Mühendisi", dept: "Aviyonik", linkedin: "#", photo: "/crew/ismail-tanoglu.jpg" },
  { name: "Akif Kerem", surname: "Özkan", role: "Ar-Ge Mühendisi", dept: "Mekanik Tasarım", linkedin: "#", photo: "/crew/akif-kerem-ozkan.jpg" },
  { name: "Mustafa", surname: "Albayrak", role: "Ar-Ge Mühendisi", dept: "Yazılım", linkedin: "#", photo: "/crew/mustafa-albayrak.jpg" },
  { name: "Ahmet Faruk", surname: "Işık", role: "Ar-Ge Mühendisi", dept: "Analiz", linkedin: "#", photo: "/crew/ahmet-faruk-isik.jpg" },
  { name: "İsmayıl", surname: "Bulut", role: "Ar-Ge Mühendisi", dept: "Mekanik Tasarım", linkedin: "#", photo: "/crew/ismayil-bulut.jpg" },
  { name: "Ahmet Korkmaz", surname: "Peker", role: "Ar-Ge Mühendisi", dept: "Aviyonik", linkedin: "#", photo: "/crew/ahmet-korkmaz-peker.jpg" },
  { name: "Tuba", surname: "Meydan", role: "Ar-Ge Mühendisi", dept: "Kurumsal Ve İletişim", linkedin: "#", photo: "/crew/tuba-meydan.jpg" },
  { name: "Halil", surname: "Közoğlu", role: "Ar-Ge Mühendisi", dept: "Mekanik Tasarım", linkedin: "#", photo: "/crew/halil-kozoglu.jpg" },
];

const FLEET_DATA: Aircraft[] = [
  { name: "Sarp", desc: "Pars platformunun VTOL kabiliyeti kazanmış hibrit versiyonu. 2025 METU VTOL yarışmasında 5. ardışık şampiyonluğu getiren amiral gemimiz.", badge: "2025 CHAMPION", type: "Hybrid / VTOL", photo: "/fleet/sarp.jpg" },
  { name: "Tulpar", desc: "Hibrit tilt-rotor mekanizmalı özgün tasarım. METU VTOL 2020, 2022, 2023 şampiyonluklarının simgesi.", badge: "CHAMPION", type: "Hybrid / VTOL", photo: "/fleet/tulpar.png" },
  { name: "Pars", desc: "Savaşan İHA kategorisi için 9 prototip ile geliştirilen platform. Sarp İHA'nın aerodinamik atasını temsil eder.", badge: "COMBAT READY", type: "Fixed Wing", photo: "/fleet/pars.png" },
  { name: "Tuğberk", desc: "Ağır kırım sonrası 30 saatte onarılarak şampiyon olan, dayanıklılığımızın sembolü olan VTOL.", badge: "RESILIENT", type: "VTOL", photo: "/fleet/tugberk.png" },
  { name: "Dikine Teyyare", desc: "2017 METU VTOL En İyi Uçuş Performansı 1.liği kazanan ilk dikey kalkış projemiz.", badge: "CLASSIC", type: "VTOL", photo: "/fleet/dikine.png" },
  { name: "Fenrir", desc: "TÜBİTAK İHA yarışmalarında final aşamasına kadar yükselen uzun menzilli platform.", badge: "FINALIST", type: "Fixed Wing", photo: "/fleet/fenrir.jpeg" },
  { name: "Ebabil", desc: "2016'da Türkiye'nin ilk İHA yarışmasında 6.lık alan miras projemiz.", badge: "LEGACY", type: "Fixed Wing", photo: "/fleet/ebabil.png" },
  { name: "Gökbörü", desc: "Yüksek manevra kabiliyeti ve otonom görev odaklı 2020 tasarımı sabit kanat.", badge: "AGILE", type: "Fixed Wing", photo: "/fleet/gokboru.png" },
];

const ACHIEVEMENTS_TIMELINE = [
  { year: "2025", desc: "Sarp İHA ile METU VTOL Uluslararası Yarışması'nda 5. Kez Üst Üste Genel Sıralama 1.liği.", category: "International", icon: <Trophy /> },
  { year: "2023", desc: "Tulpar İHA ile METU VTOL 1.liği ve Teknofest 'En İyi Girişim' Ödülü (Havacılık & Savunma).", category: "Startup", icon: <Rocket /> },
  { year: "2022", desc: "Tuğberk ve Tulpar ile METU VTOL Şampiyonluğu. Pars İHA ile Savaşan İHA kategorisinde 9.luk.", category: "National", icon: <Target /> },
  { year: "2019", desc: "AIAA DBF (ABD) Yarışması'nda 'Best Turkish Team' Ünvanı ve Dünya Derecesi.", category: "Global", icon: <Globe /> },
  { year: "2017", desc: "Dikine Teyyare 01 ile En İyi Uçuş Performansı 1.liği. TÜBİTAK Döner Kanat 4.lüğü.", category: "Technical", icon: <Zap /> },
  { year: "2016", desc: "Türkiye'nin ilk İHA Yarışmasında Ebabil 01 ile 6.lık ve Ekibimizin resmi kuruluşu.", category: "Foundation", icon: <History /> },
];

const SPONSORS: Sponsor[] = [
  { name: "MathWorks", sub: "Computing Software", isGlobal: true, icon: <Settings className="w-5 h-5" /> },
  { name: "SolidWorks", sub: "3D CAD Design", isGlobal: true, icon: <Box className="w-5 h-5" /> },
  { name: "Altium", sub: "PCB Design", isGlobal: true, icon: <CircuitBoard className="w-5 h-5" /> },
  { name: "Polymaker3D", sub: "Printing Materials", isGlobal: true, icon: <Layers className="w-5 h-5" /> },
  { name: "Innopark", sub: "Technology Center", isGlobal: false, icon: <Factory className="w-5 h-5" /> },
  { name: "Printest", sub: "Printing Services", isGlobal: false, icon: <Printer className="w-5 h-5" /> },
  { name: "Medyavuz", sub: "Media Partner", isGlobal: false, icon: <Video className="w-5 h-5" /> },
  { name: "Erva İş Elbiseleri", sub: "Technical Wear", isGlobal: false, icon: <Shirt className="w-5 h-5" /> },
  { name: "Kıratlıoğlu Kaporta", sub: "Mechanical Support", isGlobal: false, icon: <Wrench className="w-5 h-5" /> }
];

// --- Standardized Heading Component ---
const PageHeading = ({ title, subtitle, emphasis }: { title: string, subtitle?: string, emphasis?: string }) => (
  <div className="text-center mb-16 md:mb-24 px-4">
    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-tight mb-4 text-white">
      {title} {emphasis && <span className="text-blue-500 italic underline decoration-blue-600 decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8">{emphasis}</span>}
    </h2>
    {subtitle && <p className="text-slate-500 mono text-[10px] md:text-xs uppercase tracking-[0.4em] font-black mt-4">{subtitle}</p>}
  </div>
);

// --- Components ---

const ContactSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-40 px-6 max-w-7xl mx-auto min-h-screen">
      <PageHeading title={t('contact.title')} emphasis={t('contact.emphasis')} subtitle={t('contact.subtitle')} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* İletişim Bilgileri */}
        <div className="space-y-10">
          <div className="glass-panel p-10 rounded-[2.5rem] border border-blue-500/20 hover:border-blue-500/40 transition-all">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-blue-600/10">
                <Mail className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">{t('contact.email')}</h3>
                <a href="mailto:gokturkekibi@gmail.com" className="text-lg text-blue-400 hover:text-blue-300 transition-colors font-bold break-all">
                  gokturkekibi@gmail.com
                </a>
                <p className="text-slate-500 text-sm mt-2">{t('contact.emailDesc')}</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-10 rounded-[2.5rem] border border-blue-500/20 hover:border-blue-500/40 transition-all">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-blue-600/10">
                <MapPin className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">{t('contact.location')}</h3>
                <p className="text-lg text-slate-300 font-bold mb-2">
                  {t('contact.neu')}<br />
                  {t('contact.engineering')}<br />
                  {t('contact.konya')}
                </p>
                <a 
                  href="https://www.google.com/maps/search/Necmettin+Erbakan+%C3%9Cniversitesi+M%C3%BChendislik+Fakültesi+Konya" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-bold flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" /> {t('contact.openMap')}
                </a>
              </div>
            </div>
          </div>
          <div className="glass-panel p-10 rounded-[2.5rem] border border-blue-500/20">
            <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-8">{t('contact.social')}</h3>
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

        {/* İletişim Formu */}
        <div className="glass-panel p-12 rounded-[2.5rem] border border-blue-500/20 h-fit sticky top-24">
          <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-10">{t('contact.directMessage')}</h3>
          <form 
            action={`https://formspree.io/${import.meta.env.VITE_FORMSPREE_FORM_ID}`}
            method="POST" 
            className="space-y-6"
          >
            <div>
              <label className="block text-white font-bold text-sm mb-3 uppercase tracking-wider">{t('contact.name')}</label>
              <input 
                type="text" 
                name="name"
                placeholder={t('contact.namePlaceholder')} 
                required
                className="w-full px-5 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-white font-bold text-sm mb-3 uppercase tracking-wider">{t('contact.emailLabel')}</label>
              <input 
                type="email" 
                name="email"
                placeholder={t('contact.emailPlaceholder')} 
                required
                className="w-full px-5 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-white font-bold text-sm mb-3 uppercase tracking-wider">{t('contact.subject')}</label>
              <input 
                type="text" 
                name="subject"
                placeholder={t('contact.subjectPlaceholder')} 
                required
                className="w-full px-5 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-white font-bold text-sm mb-3 uppercase tracking-wider">{t('contact.message')}</label>
              <textarea 
                name="message"
                placeholder={t('contact.messagePlaceholder')} 
                rows={6}
                required
                className="w-full px-5 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-all resize-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20"
            >
              <Send className="w-5 h-5" /> {t('contact.send')}
            </button>

            <p className="text-slate-500 text-xs text-center">
              {t('contact.sendNote')}
            </p>
          </form>
        </div>
      </div>

      {/* Hızlı İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
        <div className="glass-panel p-10 rounded-[2.5rem] border border-blue-500/20 text-center hover:bg-blue-900/10 transition-all">
          <Users className="w-12 h-12 text-blue-500 mx-auto mb-6" />
          <h4 className="text-4xl font-black text-white tracking-tighter mb-2">16+</h4>
          <p className="text-slate-500 mono text-[10px] uppercase tracking-widest font-black">{t('contact.teamMembers')}</p>
        </div>
        
        <div className="glass-panel p-10 rounded-[2.5rem] border border-blue-500/20 text-center hover:bg-blue-900/10 transition-all">
          <Trophy className="w-12 h-12 text-blue-500 mx-auto mb-6" />
          <h4 className="text-4xl font-black text-white tracking-tighter mb-2">5x</h4>
          <p className="text-slate-500 mono text-[10px] uppercase tracking-widest font-black">{t('contact.internationalDegree')}</p>
        </div>
        
        <div className="glass-panel p-10 rounded-[2.5rem] border border-blue-500/20 text-center hover:bg-blue-900/10 transition-all">
          <Zap className="w-12 h-12 text-blue-500 mx-auto mb-6" />
          <h4 className="text-4xl font-black text-white tracking-tighter mb-2">9+</h4>
          <p className="text-slate-500 mono text-[10px] uppercase tracking-widest font-black">{t('contact.successPrototypes')}</p>
        </div>
      </div>
    </section>
  );
};

const SponsorSection = () => {
  const { t } = useTranslation();
  // Triple the list to ensure a truly infinite scroll even on ultra-wide screens
  const marqueeSponsors = [...SPONSORS, ...SPONSORS, ...SPONSORS]; 

  return (
    <section className="py-24 bg-slate-950 border-t border-blue-900/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h3 className="text-blue-500 mono text-[10px] uppercase tracking-[0.6em] mb-4 font-black">{t('sponsor.title')}</h3>
        <div className="h-px w-24 bg-blue-500 mx-auto opacity-30"></div>
      </div>

      <div className="relative">
        {/* Fade masks for smooth disappearance at edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee-infinite">
          {marqueeSponsors.map((s, i) => (
            <div 
              key={i} 
              className={`flex-shrink-0 mx-4 w-64 md:w-80 p-8 rounded-3xl transition-transform duration-500 transform hover:scale-105 ${
                s.isGlobal 
                  ? 'bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-orange-500/10 shadow-[0_0_25px_rgba(251,191,36,0.15)] border border-yellow-500/20' 
                  : 'glass-panel shadow-2xl'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`mb-4 p-3 rounded-2xl ${s.isGlobal ? 'bg-gradient-to-br from-yellow-400/30 to-amber-400/20 text-yellow-300' : 'bg-blue-600/10 text-blue-400'}`}>
                  {s.icon}
                </div>
                
                {s.isGlobal && (
                  <div className="flex items-center gap-1 mb-2">
                    <Crown className="w-3 h-3 text-yellow-300" />
                    <span className="text-[7px] font-black uppercase tracking-widest text-yellow-300">Global Partner</span>
                  </div>
                )}
                
                <span className={`font-black text-sm md:text-lg tracking-tighter uppercase ${
                  s.isGlobal ? 'text-yellow-100' : 'text-white'
                }`}>
                  {s.name}
                </span>
                
                <span className={`text-[9px] mt-1 mono uppercase tracking-widest font-bold ${
                  s.isGlobal ? 'text-yellow-300/70' : 'text-slate-500'
                }`}>
                  {s.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AircraftCard = ({ plane }: { plane: Aircraft }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative overflow-hidden glass-panel rounded-[2.5rem] border border-blue-900/10 hover:border-blue-500/30 transition-all duration-500 h-full flex flex-col">
      <div className="relative h-64 md:h-80 bg-slate-900 overflow-hidden">
        {plane.photo && !imgError ? (
          <img src={plane.photo} alt={plane.name} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" onError={() => setImgError(true)}/>
        ) : (
          <ImagePlaceholder label={plane.name} className="h-full border-none" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
        <div className="absolute top-6 right-6">
          <span className="text-[9px] md:text-[11px] bg-blue-600 px-5 py-2 rounded-full text-white font-black uppercase tracking-[0.15em] shadow-2xl">{plane.badge}</span>
        </div>
      </div>
      <div className="p-10 flex flex-col flex-grow bg-slate-950/40">
        <div className="flex items-center gap-4 mb-5">
          <h3 className="text-3xl md:text-5xl font-black italic uppercase text-white group-hover:text-blue-400 transition-colors">{plane.name}</h3>
          <div className="h-px bg-blue-900/30 flex-grow"></div>
        </div>
        <span className="text-[11px] mono text-blue-400/80 uppercase tracking-[0.4em] font-black mb-5">{plane.type}</span>
        <p className="text-slate-400 text-sm md:text-lg leading-relaxed font-light">{plane.desc}</p>
      </div>
    </div>
  );
};

const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`group relative p-8 glass-panel rounded-[2rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${member.isSenior ? 'border-blue-500/30' : 'border-slate-800'}`}>
      <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
        <div className="w-5 h-5 border-t-2 border-r-2 border-blue-500 rounded-tr-xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
        <div className="w-5 h-5 border-b-2 border-l-2 border-blue-500 rounded-bl-xl"></div>
      </div>
      <div className="relative mb-8 mx-auto w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-3xl bg-slate-900 shadow-inner">
        {member.photo && !imgError ? (
          <img src={member.photo} alt={member.name} className="w-full h-full object-cover grayscale-0 group-hover:grayscale group-hover:scale-110 transition-all duration-500 opacity-100 group-hover:opacity-90" onError={() => setImgError(true)}/>
        ) : (
          <ImagePlaceholder label="GÖKTÜRK" className="h-full border-none" />
        )}
        {member.isSenior && (
          <div className="absolute top-3 right-3 bg-blue-600 p-2 rounded-xl shadow-xl animate-pulse z-20"><Star className="text-white w-3 h-3 fill-current" /></div>
        )}
        <div className="absolute inset-0 bg-blue-600/60 flex items-center justify-center gap-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white p-2.5 rounded-full text-blue-600 hover:scale-110 transition-transform"><LinkedinIcon className="w-5 h-5" /></a>
          <button className="bg-white p-2.5 rounded-full text-blue-600 hover:scale-110 transition-transform"><Mail className="w-5 h-5" /></button>
        </div>
      </div>
      <div className="text-center">
        <h4 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-blue-400 transition-colors">{member.name} <span className="text-blue-400 group-hover:text-white">{member.surname}</span></h4>
        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] mt-2 mb-4">{member.role}</p>
        <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 text-slate-500 text-[9px] mono uppercase tracking-tighter font-black">{member.dept}</div>
      </div>
    </div>
  );
};

const Navbar = ({ activePage, setPage }: { activePage: Page, setPage: (p: Page) => void }) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { id: 'home', label: t('nav.home') }, 
    { id: 'fleet', label: t('nav.fleet') }, 
    { id: 'achievements', label: t('nav.achievements') }, 
    { id: 'crew', label: t('nav.crew') },
    { id: 'contact', label: t('nav.contact') }
  ];
  const handleNav = (p: Page) => { setPage(p); setIsMenuOpen(false); };
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <nav className="fixed top-0 w-full z-[100] glass-panel border-b border-blue-500/10 px-4 md:px-12 py-4 md:py-5 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-4 cursor-pointer group" onClick={() => handleNav('home')}>
        <div className="bg-blue-600/20 p-2 rounded-xl group-hover:bg-blue-600/40 transition-all">
          <Logo className="w-8 h-8 md:w-10 md:h-10" />
          <Target className="text-white w-8 h-8 fallback-icon hidden" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-xl md:text-2xl font-black tracking-tighter glow-text uppercase text-white">GÖKTÜRK <span className="text-blue-400 italic">İHA</span></span>
          <span className="text-[7px] md:text-[8px] mono text-blue-300/60 uppercase tracking-[0.4em] font-bold">NEÜ • KONYA</span>
        </div>
      </div>
      <div className="hidden lg:flex gap-10 text-[12px] font-black uppercase tracking-[0.25em]">
        {menuItems.map(item => (
          <button key={item.id} onClick={() => handleNav(item.id as Page)} className={`${activePage === item.id ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-white'} transition-all pb-1`}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 md:gap-5">
        {/* Dil Seçici */}
        <div className="flex gap-2 bg-slate-900/50 p-2 rounded-lg border border-blue-500/10">
          <button
            onClick={() => changeLanguage('tr')}
            className={`px-3 md:px-4 py-1.5 rounded-md font-black text-[10px] md:text-[11px] uppercase tracking-wider transition-all ${
              i18n.language === 'tr' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            TR
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`px-3 md:px-4 py-1.5 rounded-md font-black text-[10px] md:text-[11px] uppercase tracking-wider transition-all ${
              i18n.language === 'en' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            EN
          </button>
        </div>
        
        <a href="https://form.jotform.com/212165646397059" target="_blank" className="bg-white text-slate-950 px-5 md:px-8 py-2 md:py-2.5 rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-wider hover:bg-blue-50 transition-all flex items-center gap-3">{t('nav.join')} <ExternalLink className="w-4 h-4" /></a>
        <button className="lg:hidden text-slate-400 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}</button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-slate-950/95 border-b border-blue-500/10 lg:hidden z-50">
          <div className="flex flex-col gap-4 p-6 max-w-7xl mx-auto">
            {menuItems.map(item => (
              <button key={item.id} onClick={() => handleNav(item.id as Page)} className={`text-left py-3 px-4 rounded-lg font-black uppercase tracking-[0.15em] transition-all ${
                activePage === item.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
              }`}>
                {item.label}
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
  const { t } = useTranslation();
  const [page, setPage] = useState<Page>('home');
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-blue-500 selection:text-white font-['Inter']">
      <Navbar activePage={page} setPage={setPage} />

      {page === 'home' && (
        <>
          <section id="hero" className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0 scanlines">
              <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/40 via-[#020617]/70 to-[#020617] z-10"></div>
              <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60"><source src="/background-4.mp4" type="video/mp4" /></video>
            </div>
            <div className="relative z-20 text-center px-6 mt-16 max-w-6xl mx-auto">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-blue-400 text-[10px] md:text-[12px] mono uppercase tracking-[0.4em] mb-10 font-black">
                <History className="w-4 h-4" /> EST. 2016 • AEROSPACE EXCELLENCE
              </div>
              <div className="flex flex-col items-center gap-6 mb-8">
                <Logo className="w-20 h-20 md:w-40 md:h-40 mb-4 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]" />
                <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter mb-6 leading-none text-white">
                  GÖKTÜRK <br />
                  <span className="text-white glow-text italic underline decoration-blue-600 decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8">İHA EKİBİ</span>
                </h1>
              </div>
              <p className="max-w-3xl mx-auto text-slate-300 text-base md:text-2xl mb-12 md:mb-16 leading-relaxed font-light px-4">"{t('home.subtitle')}"</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button onClick={() => setPage('fleet')} className="bg-blue-600 text-white px-10 md:px-16 py-4 md:py-6 rounded-2xl md:rounded-[2rem] font-black uppercase tracking-widest text-xs md:text-sm hover:scale-105 transition-all flex items-center justify-center gap-4 shadow-xl shadow-blue-600/20">{t('home.projects')} <ChevronRight className="w-5 h-5" /></button>
                <button onClick={() => setPage('crew')} className="border border-blue-500/30 bg-slate-900/40 backdrop-blur-md px-10 md:px-16 py-4 md:py-6 rounded-2xl md:rounded-[2rem] font-black uppercase tracking-widest text-xs md:text-sm text-white hover:bg-slate-900/60 transition-all">{t('home.team')}</button>
              </div>
            </div>
          </section>

          <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-20 text-center text-white">{t('home.departments')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {[
                { name: t('home.analysis'), icon: <BarChart3 className="w-8 h-8"/>, desc: t('home.analysisDesc') },
                { name: t('home.mechanical'), icon: <Wrench className="w-8 h-8"/>, desc: t('home.mechanicalDesc') },
                { name: t('home.software'), icon: <Code className="w-8 h-8"/>, desc: t('home.softwareDesc') },
                { name: t('home.avionics'), icon: <CircuitBoard className="w-8 h-8"/>, desc: t('home.avionicsDesc') },
                { name: t('home.composite'), icon: <Layers className="w-8 h-8"/>, desc: t('home.compositeDesc') }
              ].map((cap, i) => (
                <div key={i} className="glass-panel p-10 rounded-[2.5rem] border border-blue-900/20 text-center group transition-all hover:bg-blue-900/10 hover:-translate-y-2">
                  <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform flex justify-center">{cap.icon}</div>
                  <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-white mb-3">{cap.name}</h3>
                  <p className="hidden md:block text-[10px] text-slate-500 leading-relaxed font-bold">{cap.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {page === 'fleet' && (
        <section className="py-40 px-6 max-w-7xl mx-auto min-h-screen">
          <PageHeading title={t('fleet.title')} emphasis={t('fleet.emphasis')} subtitle={t('fleet.subtitle')} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {FLEET_DATA.map((plane, i) => <AircraftCard key={i} plane={plane} />)}
          </div>
        </section>
      )}

      {page === 'achievements' && (
        <section className="py-40 px-6 max-w-7xl mx-auto min-h-screen">
          <PageHeading title={t('achievements.title')} emphasis={t('achievements.emphasis')} subtitle={t('achievements.subtitle')} />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {[
              { val: "5x", label: t('achievements.metu5x'), icon: <Trophy /> },
              { val: "1.lik", label: t('achievements.bestStartup'), icon: <Rocket /> },
              { val: "USA", label: t('achievements.bestTurkish'), icon: <Globe /> },
              { val: "30h", label: t('achievements.repairRecord'), icon: <Wrench /> }
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-10 rounded-[2.5rem] border border-blue-500/20 text-center hover:bg-blue-900/10 transition-all">
                <div className="text-blue-500 w-12 h-12 mx-auto mb-6">{stat.icon}</div>
                <h4 className="text-5xl font-black text-white tracking-tighter mb-2">{stat.val}</h4>
                <p className="text-[10px] text-slate-500 mono uppercase tracking-widest font-black">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-24">
            <div className="space-y-16">
              <h3 className="text-3xl font-black uppercase text-blue-500 italic flex items-center gap-4">
                <History className="w-8 h-8" /> KRONOLOJİK BAŞARI ÇİZGİSİ
              </h3>
              <div className="relative space-y-12">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-blue-900/50"></div>
                {ACHIEVEMENTS_TIMELINE.map((item, i) => (
                  <div key={i} className="pl-16 relative group">
                    <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-blue-600 border-4 border-slate-950 flex items-center justify-center z-10 group-hover:scale-125 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                      {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-4 h-4 text-white" })}
                    </div>
                    <div className="glass-panel p-10 rounded-[2.5rem] border border-blue-900/10 hover:border-blue-500/40 transition-all">
                      <div className="flex items-center gap-5 mb-4">
                        <span className="text-blue-400 font-black mono text-3xl tracking-tighter">{item.year}</span>
                        <span className="text-[9px] bg-blue-600/20 text-blue-400 px-4 py-1.5 rounded-full mono font-black uppercase tracking-[0.2em] border border-blue-500/20">{item.category}</span>
                      </div>
                      <p className="text-slate-300 font-light leading-relaxed text-lg">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-16">
              <h3 className="text-3xl font-black uppercase text-blue-500 italic flex items-center gap-4">
                <Microchip className="w-8 h-8" /> TEKNİK KABİLİYETLER & İNOVASYON
              </h3>
              
              <div className="bg-blue-600/5 border border-blue-500/20 p-12 rounded-[3.5rem] h-fit">
                <div className="space-y-10">
                  {[
                    { title: "Sarp: Pars'ın VTOL Mirası", desc: "Sarp İHA, ekibimizin Savaşan İHA deneyimini VTOL (Dikey Kalkış-İniş) kabiliyetiyle birleştiren hibrit amiral gemimizdir. 2025 METU VTOL şampiyonluğunu getirmiştir." },
                    { title: "Rekor Onarım (Tuğberk)", desc: "METU VTOL 2022'de Tuğberk İHA ağır kırım yaşamasına rağmen, ekip tarafından 30 saat gibi rekor bir sürede onarılarak şampiyon olmuştur." },
                    { title: "İteratif Geliştirme (Pars)", desc: "Pars platformu, 4 farklı versiyon ve toplamda 9 prototip test edilerek bugünkü operasyonel stabilitesine ve aerodinamik gücüne kavuşturulmuştur." }
                  ].map((tech, i) => (
                    <div key={i} className="glass-panel p-10 rounded-[2rem] border-l-8 border-l-blue-600 hover:bg-blue-900/10 transition-all">
                      <h4 className="text-2xl font-black text-white uppercase mb-3 tracking-tight">{tech.title}</h4>
                      <p className="text-slate-400 text-base leading-relaxed font-light">{tech.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-10 rounded-[3rem] border border-slate-800">
                <div className="flex items-center gap-5 mb-8">
                  <Processor className="text-blue-500 w-8 h-8" />
                  <h4 className="text-2xl font-black uppercase tracking-tighter text-white">PROJE İSTATİSTİKLERİ</h4>
                </div>
                <div className="space-y-8">
                  {[
                    { label: "Geliştirilen Prototip", value: "25+", icon: <Layers className="w-5 h-5" /> },
                    { label: "Uluslararası Derece", value: "8", icon: <Globe className="w-5 h-5" /> },
                    { label: "Yerlilik Oranı", value: "%80", icon: <Shield className="w-5 h-5" /> }
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="text-slate-500 group-hover:text-blue-400 transition-colors">{stat.icon}</div>
                        <span className="text-[12px] text-slate-400 mono uppercase tracking-widest font-black">{stat.label}</span>
                      </div>
                      <span className="text-2xl font-black text-blue-400 mono">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {page === 'crew' && (
        <section className="py-40 px-6 max-w-7xl mx-auto min-h-screen">
          <PageHeading title={t('crew.title')} emphasis={t('crew.emphasis')} subtitle={t('crew.subtitle')} />
          <div className="mb-32">
            <div className="flex items-center gap-8 mb-20 px-6">
              <div className="p-4 rounded-3xl bg-blue-600/10 border border-blue-500/20"><Award className="text-blue-500 w-10 h-10" /></div>
              <div>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-white leading-none mb-2">{t('crew.senior')}</h3>
                <p className="text-blue-400/60 text-[11px] mono uppercase font-black tracking-[0.4em]">{t('crew.seniorSub')}</p>
              </div>
              <div className="h-px bg-gradient-to-r from-blue-900/50 to-transparent flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 px-6">
              {TEAM_MEMBERS.filter(m => m.isSenior).map((member, i) => <TeamMemberCard key={i} member={member} />)}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-8 mb-20 px-6">
              <div className="p-4 rounded-3xl bg-slate-800/50 border border-slate-700/50"><Chip className="text-slate-500 w-10 h-10" /></div>
              <div>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-slate-300 leading-none mb-2">{t('crew.rnd')}</h3>
                <p className="text-slate-500 text-[11px] mono uppercase font-black tracking-[0.4em]">{t('crew.rndSub')}</p>
              </div>
              <div className="h-px bg-gradient-to-r from-slate-900 to-transparent flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 px-6">
              {TEAM_MEMBERS.filter(m => !m.isSenior).map((member, i) => <TeamMemberCard key={i} member={member} />)}
            </div>
          </div>
        </section>
      )}

      {page === 'contact' && (
        <ContactSection />
      )}

      <SponsorSection />

      <footer className="py-32 border-t border-blue-900/20 px-8 bg-[#01040f]">
        <div className="max-w-7xl mx-auto text-center">
          <Logo className="w-16 h-16 mx-auto mb-10 opacity-50 hover:opacity-100 transition-opacity" />
          <p className="text-slate-600 text-[11px] mono uppercase tracking-[0.6em] font-black">{t('footer.copyright')}</p>
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

// Set initial language
const savedLang = localStorage.getItem('language') || 'tr';
document.documentElement.lang = savedLang;
i18n.changeLanguage(savedLang);

createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);
