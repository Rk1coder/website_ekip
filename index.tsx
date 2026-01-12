
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
  CloudLightning
} from 'lucide-react';

// --- Types ---
type Page = 'home' | 'fleet' | 'achievements' | 'crew';

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
  { name: "Sarp", desc: "Pars platformunun VTOL kabiliyeti kazandırılmış hibrit versiyonu. 2025 METU VTOL yarışmasında ekibimize 5. ardışık şampiyonluğu getiren amiral gemimiz.", badge: "2025 CHAMPION", type: "VTOL / Hybrid", photo: "/fleet/sarp.jpg" },
  { name: "Tulpar", desc: "Hibrit tilt-rotor mekanizmalı özgün tasarım. METU VTOL 2020, 2022, 2023 şampiyonluklarının mimarı.", badge: "CHAMPION", type: "Hybrid/VTOL", photo: "/fleet/tulpar.jpg" },
  { name: "Pars", desc: "4 farklı versiyon ve 9 prototip ile geliştirilen Savaşan İHA platformu. 2022 Teknofest'te 9.luk elde etmiştir.", badge: "COMBAT READY", type: "Fixed Wing", photo: "/fleet/pars.jpg" },
  { name: "Tuğberk", desc: "Ağır kırım sonrası 30 saatte onarılarak METU VTOL 2022'de şampiyonluğa uzanan efsanevi VTOL.", badge: "RESILIENT", type: "VTOL", photo: "/fleet/tugberk.jpg" },
  { name: "Dikine Teyyare", desc: "2017 METU VTOL En İyi Uçuş Performansı 1.liği kazanan ilk dikey kalkış projemiz.", badge: "CLASSIC", type: "VTOL", photo: "/fleet/dikine.jpg" },
  { name: "Fenrir", desc: "TÜBİTAK İHA yarışmalarında final aşamasına kadar yükselen uzun menzilli platform.", badge: "FINALIST", type: "Fixed Wing", photo: "/fleet/fenrir.jpg" },
  { name: "Ebabil", desc: "2016'da Türkiye'nin ilk İHA yarışmasında 6.lık alan miras projemiz.", badge: "LEGACY", type: "Fixed Wing", photo: "/fleet/ebabil.jpg" },
  { name: "Gökbörü", desc: "Yüksek manevra kabiliyeti ve düşük maliyetli otonom uçuş odaklı tasarım (2020).", badge: "AGILE", type: "Fixed Wing", photo: "/fleet/gokboru.jpg" },
  { name: "Kalender", desc: "TÜBİTAK 2017 Döner Kanat kategorisinde 4.lük derecesi alan çok motorlu İHA.", badge: "MULTI-ROTOR", type: "Fixed/Rotary", photo: "/fleet/kalender.jpg" }
];

const ACHIEVEMENTS_TIMELINE = [
  { year: "2025", desc: "Sarp İHA ile METU VTOL (Boeing Destekli) Uluslararası Yarışması'nda 5. Kez Genel Sıralama 1.liği.", category: "International", icon: <Trophy /> },
  { year: "2023", desc: "Tulpar İHA ile METU VTOL Genel Klasman 1.liği ve Teknofest Girişim Yarışması 'En İyi Girişim' Ödülü.", category: "Startup", icon: <Rocket /> },
  { year: "2022", desc: "METU VTOL'da Tuğberk ve Tulpar ile 1.lik. Savaşan İHA'da Pars ile 9.luk. TÜBİTAK'ta 6.lık.", category: "National", icon: <Target /> },
  { year: "2020", desc: "Tulpar İHA projesi ile METU VTOL Genel Sıralama Şampiyonluğu.", category: "International", icon: <Award /> },
  { year: "2019", desc: "AIAA DBF (ABD) Yarışması'nda 'Best Turkish Team' (En İyi Türk Takımı) Ünvanı.", category: "Global", icon: <Globe /> },
  { year: "2018", desc: "METU VTOL Uluslararası Yarışması Genel Sıralama 1.liği.", category: "International", icon: <Trophy /> },
  { year: "2017", desc: "Dikine Teyyare 01 ile En İyi Uçuş Performansı 1.liği, Genel Klasman 2.liği. TÜBİTAK 4.lüğü.", category: "Technical", icon: <Zap /> },
  { year: "2016", desc: "Ebabil 01 ile Türkiye'nin ilk İHA Yarışmasında 6.lık ve Ekibimizin kuruluşu.", category: "Foundation", icon: <History /> },
];

const SPONSORS: Sponsor[] = [
  { name: "MathWorks", sub: "Computing Software", isGlobal: true, icon: <Settings className="w-5 h-5" /> },
  { name: "SolidWorks", sub: "3D CAD Design", isGlobal: true, icon: <Box className="w-5 h-5" /> },
  { name: "Altium", sub: "PCB Design", isGlobal: true, icon: <CircuitBoard className="w-5 h-5" /> },
  { name: "Polymaker3D", sub: "Printing Materials", isGlobal: true, icon: <Layers className="w-5 h-5" /> },
  { name: "Innopark", sub: "Technology Center", isGlobal: false, icon: <Factory className="w-5 h-5" /> },
  { name: "Printest", sub: "3D Services", isGlobal: false, icon: <Printer className="w-5 h-5" /> },
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
    {subtitle && <p className="text-slate-500 mono text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold mt-4">{subtitle}</p>}
  </div>
);

// --- Components ---

const SponsorSection = () => {
  const marqueeSponsors = [...SPONSORS, ...SPONSORS, ...SPONSORS]; 

  return (
    <section className="py-24 bg-slate-950 border-t border-blue-900/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h3 className="text-blue-500 mono text-[10px] uppercase tracking-[0.6em] mb-4 font-black">GÖKYÜZÜNDEKİ PARTNERLERİMİZ</h3>
        <div className="h-px w-24 bg-blue-500 mx-auto opacity-30"></div>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee hover:[animation-play-state:paused] flex">
          {marqueeSponsors.map((s, i) => (
            <div 
              key={i} 
              className={`flex-shrink-0 mx-6 w-56 md:w-72 p-8 rounded-3xl transition-all duration-500 transform hover:scale-105 ${
                s.isGlobal 
                  ? 'gold-shimmer border-2 border-yellow-500/50 shadow-[0_0_30px_rgba(255,215,0,0.2)]' 
                  : 'glass-panel border border-blue-500/20 shadow-2xl'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`mb-4 p-3 rounded-2xl ${s.isGlobal ? 'bg-yellow-900/10 text-yellow-600' : 'bg-blue-600/10 text-blue-400'}`}>
                  {s.icon}
                </div>
                
                {s.isGlobal && (
                  <div className="flex items-center gap-1 mb-2">
                    <Crown className="w-3 h-3 text-yellow-700" />
                    <span className="text-[7px] font-black uppercase tracking-widest text-yellow-800">Global Partner</span>
                  </div>
                )}
                
                <span className={`font-black text-sm md:text-xl tracking-tighter uppercase ${
                  s.isGlobal ? 'text-slate-900' : 'text-white'
                }`}>
                  {s.name}
                </span>
                
                <span className={`text-[9px] mt-1 mono uppercase tracking-widest font-bold ${
                  s.isGlobal ? 'text-slate-950/60' : 'text-slate-500'
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
    <div className="group relative overflow-hidden glass-panel rounded-3xl border border-blue-900/10 hover:border-blue-500/30 transition-all duration-500 h-full flex flex-col">
      <div className="relative h-64 md:h-80 bg-slate-900 overflow-hidden">
        {plane.photo && !imgError ? (
          <img src={plane.photo} alt={plane.name} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" onError={() => setImgError(true)}/>
        ) : (
          <ImagePlaceholder label={plane.name} className="h-full border-none" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
        <div className="absolute top-4 right-4">
          <span className="text-[8px] md:text-[10px] bg-blue-600 px-4 py-1.5 rounded-full text-white font-black uppercase tracking-widest shadow-xl">{plane.badge}</span>
        </div>
      </div>
      <div className="p-8 flex flex-col flex-grow bg-slate-950/40">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-3xl md:text-4xl font-black italic uppercase text-white group-hover:text-blue-400 transition-colors">{plane.name}</h3>
          <div className="h-px bg-blue-900/30 flex-grow"></div>
        </div>
        <span className="text-[10px] mono text-blue-400/80 uppercase tracking-[0.3em] font-black mb-4">{plane.type}</span>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">{plane.desc}</p>
      </div>
    </div>
  );
};

const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`group relative p-6 glass-panel rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${member.isSenior ? 'border-blue-500/30' : 'border-slate-800'}`}>
      <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
        <div className="w-4 h-4 border-t-2 border-r-2 border-blue-500 rounded-tr-lg"></div>
      </div>
      <div className="absolute bottom-0 left-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
        <div className="w-4 h-4 border-b-2 border-l-2 border-blue-500 rounded-bl-lg"></div>
      </div>
      <div className="relative mb-6 mx-auto w-28 h-28 md:w-36 md:h-36 overflow-hidden rounded-2xl bg-slate-900 shadow-inner">
        {member.photo && !imgError ? (
          <img src={member.photo} alt={member.name} className="w-full h-full object-cover grayscale-0 group-hover:grayscale group-hover:scale-110 transition-all duration-500 opacity-100 group-hover:opacity-90" onError={() => setImgError(true)}/>
        ) : (
          <ImagePlaceholder label="GÖKTÜRK" className="h-full border-none" />
        )}
        {member.isSenior && (
          <div className="absolute top-2 right-2 bg-blue-600 p-1.5 rounded-lg shadow-xl animate-pulse z-20"><Star className="text-white w-3 h-3 fill-current" /></div>
        )}
        <div className="absolute inset-0 bg-blue-600/60 flex items-center justify-center gap-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-full text-blue-600 hover:scale-110 transition-transform"><LinkedinIcon className="w-4 h-4" /></a>
          <button className="bg-white p-2 rounded-full text-blue-600 hover:scale-110 transition-transform"><Mail className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="text-center">
        <h4 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-blue-400 transition-colors">{member.name} <span className="text-blue-400 group-hover:text-white">{member.surname}</span></h4>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1 mb-3">{member.role}</p>
        <div className="inline-block px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 text-slate-500 text-[8px] mono uppercase tracking-tighter font-black">{member.dept}</div>
      </div>
    </div>
  );
};

const Navbar = ({ activePage, setPage }: { activePage: Page, setPage: (p: Page) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [{ id: 'home', label: 'Ana Sayfa' }, { id: 'fleet', label: 'Uçaklarımız' }, { id: 'achievements', label: 'Başarılarımız' }, { id: 'crew', label: 'Ekibimiz' }];
  const handleNav = (p: Page) => { setPage(p); setIsMenuOpen(false); };

  return (
    <nav className="fixed top-0 w-full z-[100] glass-panel border-b border-blue-500/10 px-4 md:px-8 py-3 md:py-4 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNav('home')}>
        <div className="bg-blue-600/20 p-1.5 rounded-lg group-hover:bg-blue-600/40 transition-all">
          <Logo className="w-6 h-6 md:w-8 md:h-8" />
          <Target className="text-white w-6 h-6 fallback-icon hidden" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-lg md:text-xl font-black tracking-tighter glow-text uppercase">GÖKTÜRK <span className="text-blue-400 italic">İHA</span></span>
          <span className="text-[6px] md:text-[7px] mono text-blue-300/60 uppercase tracking-widest">NEÜ • KONYA</span>
        </div>
      </div>
      <div className="hidden lg:flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
        {menuItems.map(item => (
          <button key={item.id} onClick={() => handleNav(item.id as Page)} className={`${activePage === item.id ? 'text-blue-400 border-b-2 border-blue-400 font-black' : 'text-slate-400 hover:text-white font-black'} transition-all pb-1`}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <a href="https://form.jotform.com/212165646397059" target="_blank" className="bg-white text-slate-950 px-4 md:px-6 py-1.5 md:py-2 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-tighter hover:bg-blue-50 transition-all flex items-center gap-2">KATIL <ExternalLink className="w-3 h-3" /></a>
        <button className="lg:hidden text-slate-400 p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
      </div>
    </nav>
  );
};

const Logo = ({ className = "w-10 h-10" }: { className?: string }) => <img src="/logo.png" alt="Logo" className={`${className} object-contain`} onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden'); }} />;
const ImagePlaceholder = ({ label, className = "" }: { label: string, className?: string }) => (
  <div className={`w-full bg-slate-900/50 border-2 border-dashed border-blue-900/50 flex flex-col items-center justify-center p-6 text-center group ${className}`}>
    <Target className="w-8 h-8 text-slate-700 group-hover:text-blue-400 transition-colors mb-2" />
    <span className="text-slate-500 font-bold uppercase tracking-widest text-[8px]">{label}</span>
  </div>
);

const App = () => {
  const [page, setPage] = useState<Page>('home');
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-blue-500 selection:text-white font-['Inter']">
      <Navbar activePage={page} setPage={setPage} />

      {page === 'home' && (
        <>
          <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0 scanlines">
              <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/40 via-[#020617]/70 to-[#020617] z-10"></div>
              <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60"><source src="/background-4.mp4" type="video/mp4" /></video>
            </div>
            <div className="relative z-20 text-center px-6 mt-10 md:mt-20 max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-blue-400 text-[8px] md:text-[10px] mono uppercase tracking-[0.3em] mb-6 md:mb-8 font-black">
                <History className="w-3 h-3" /> EST. 2016 • AEROSPACE EXCELLENCE
              </div>
              <div className="flex flex-col items-center gap-4 mb-6">
                <Logo className="w-16 h-16 md:w-32 md:h-32 mb-4" />
                <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter mb-4 leading-none text-white">
                  GÖKTÜRK <br />
                  <span className="text-white glow-text italic underline decoration-blue-600 decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8">İHA EKİBİ</span>
                </h1>
              </div>
              <p className="max-w-2xl mx-auto text-slate-300 text-sm md:text-xl mb-8 md:mb-12 leading-relaxed font-light px-4">"Yerli ve milli mühendislik çözümleriyle İnsansız Hava Araçları'nın geleceğini tasarlıyoruz."</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => setPage('fleet')} className="bg-blue-600 text-white px-8 md:px-12 py-3.5 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:scale-105 transition-all flex items-center justify-center gap-3">PROJELERİMİZ <ChevronRight className="w-4 h-4" /></button>
                <button onClick={() => setPage('crew')} className="border border-blue-500/30 bg-slate-900/40 backdrop-blur-md px-8 md:px-12 py-3.5 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs text-white">EKİBİMİZ</button>
              </div>
            </div>
          </section>

          <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16 text-center text-white">TEKNİK <span className="text-blue-500">DEPARTMANLAR</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { name: 'Analiz', icon: <BarChart3 className="w-6 h-6"/>, desc: 'Aerodinamik optimizasyon.' },
                { name: 'Mekanik', icon: <Wrench className="w-6 h-6"/>, desc: '3D Tasarım ve CAD.' },
                { name: 'Yazılım', icon: <Code className="w-6 h-6"/>, desc: 'Otonom kontrol sistemleri.' },
                { name: 'Aviyonik', icon: <CircuitBoard className="w-6 h-6"/>, desc: 'Elektronik ve PCB.' },
                { name: 'Kompozit', icon: <Layers className="w-6 h-6"/>, desc: 'Üretim ve montaj.' }
              ].map((cap, i) => (
                <div key={i} className="glass-panel p-8 rounded-3xl border border-blue-900/20 text-center group transition-all hover:bg-blue-900/10">
                  <div className="text-blue-500 mb-4 group-hover:scale-110 transition-transform flex justify-center">{cap.icon}</div>
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-white mb-2">{cap.name}</h3>
                  <p className="hidden md:block text-[9px] text-slate-500 leading-relaxed font-bold">{cap.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {page === 'fleet' && (
        <section className="py-40 px-6 max-w-7xl mx-auto min-h-screen">
          <PageHeading title="İHA" emphasis="FİLOMUZ" subtitle="Aviation Engineering Platforms" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {FLEET_DATA.map((plane, i) => <AircraftCard key={i} plane={plane} />)}
          </div>
        </section>
      )}

      {page === 'achievements' && (
        <section className="py-40 px-6 max-w-7xl mx-auto min-h-screen">
          <PageHeading title="BAŞARI" emphasis="RAPORU" subtitle="Excellence in UAV Engineering Since 2016" />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            <div className="glass-panel p-8 rounded-3xl border border-blue-500/20 text-center">
              <Trophy className="text-blue-500 w-10 h-10 mx-auto mb-4" />
              <h4 className="text-4xl font-black text-white tracking-tighter">5x</h4>
              <p className="text-[9px] text-slate-500 mono uppercase tracking-widest font-black">METU VTOL 1.lik</p>
            </div>
            <div className="glass-panel p-8 rounded-3xl border border-blue-500/20 text-center">
              <Rocket className="text-blue-500 w-10 h-10 mx-auto mb-4" />
              <h4 className="text-4xl font-black text-white tracking-tighter">1.lik</h4>
              <p className="text-[9px] text-slate-500 mono uppercase tracking-widest font-black">En İyi Girişim (Teknofest)</p>
            </div>
            <div className="glass-panel p-8 rounded-3xl border border-blue-500/20 text-center">
              <Globe className="text-blue-500 w-10 h-10 mx-auto mb-4" />
              <h4 className="text-4xl font-black text-white tracking-tighter">USA</h4>
              <p className="text-[9px] text-slate-500 mono uppercase tracking-widest font-black">Best Turkish Team (AIAA)</p>
            </div>
            <div className="glass-panel p-8 rounded-3xl border border-blue-500/20 text-center">
              <Wrench className="text-blue-500 w-10 h-10 mx-auto mb-4" />
              <h4 className="text-4xl font-black text-white tracking-tighter">30h</h4>
              <p className="text-[9px] text-slate-500 mono uppercase tracking-widest font-black">Rekor Onarım Süresi</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <h3 className="text-2xl font-black uppercase text-blue-500 italic flex items-center gap-3">
                <History className="w-6 h-6" /> KRONOLOJİK BAŞARI ÇİZGİSİ
              </h3>
              <div className="relative space-y-12">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-blue-900/50"></div>
                {ACHIEVEMENTS_TIMELINE.map((item, i) => (
                  <div key={i} className="pl-12 relative group">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-blue-600 border-4 border-slate-950 flex items-center justify-center z-10 group-hover:scale-125 transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                      {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-3 h-3 text-white" })}
                    </div>
                    <div className="glass-panel p-8 rounded-3xl border border-blue-900/10 hover:border-blue-500/30 transition-all">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-blue-400 font-black mono text-2xl tracking-tighter">{item.year}</span>
                        <span className="text-[8px] bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full mono font-black uppercase tracking-widest border border-blue-500/20">{item.category}</span>
                      </div>
                      <p className="text-slate-300 font-light leading-relaxed text-base">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-12">
              <h3 className="text-2xl font-black uppercase text-blue-500 italic flex items-center gap-3">
                <Microchip className="w-6 h-6" /> TEKNİK KABİLİYETLER & İNOVASYON
              </h3>
              
              <div className="bg-blue-600/5 border border-blue-500/20 p-10 rounded-[3rem] h-fit">
                <div className="space-y-8">
                  <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-blue-600">
                    <h4 className="text-xl font-black text-white uppercase mb-2">Rekor Onarım (Tuğberk)</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">METU VTOL 2022'de Tuğberk İHA ağır kırım yaşamasına rağmen, ekip tarafından 30 saat gibi rekor bir sürede onarılarak şampiyon olmuştur.</p>
                  </div>
                  <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-blue-600">
                    <h4 className="text-xl font-black text-white uppercase mb-2">İteratif Geliştirme (Pars)</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">Savaşan İHA kategorisinde yarışan Pars İHA, 4 farklı versiyon ve toplamda 9 prototip test edilerek bugünkü operasyonel gücüne ulaşmıştır.</p>
                  </div>
                  <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-blue-600">
                    <h4 className="text-xl font-black text-white uppercase mb-2">Hibrit Tilt-Rotor (Tulpar)</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">Tamamen özgün mekanizması ile dikey kalkış ve yatay uçuşu birleştiren Tulpar, uluslararası arenada üst üste birincilikler getiren en gelişmiş platformumuzdur.</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-[2rem] border border-slate-800">
                <div className="flex items-center gap-4 mb-6">
                  <Processor className="text-blue-500 w-6 h-6" />
                  <h4 className="text-xl font-black uppercase tracking-tighter text-white">PROJE İSTATİSTİKLERİ</h4>
                </div>
                <div className="space-y-6">
                  {[
                    { label: "Geliştirilen Prototip", value: "25+", icon: <Layers className="w-4 h-4" /> },
                    { label: "Uluslararası Derece", value: "8", icon: <Globe className="w-4 h-4" /> },
                    { label: "Yerlilik Oranı", value: "%100", icon: <Shield className="w-4 h-4" /> }
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-slate-500">{stat.icon}</div>
                        <span className="text-[10px] text-slate-400 mono uppercase tracking-widest font-black">{stat.label}</span>
                      </div>
                      <span className="text-xl font-black text-blue-400 mono">{stat.value}</span>
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
          <PageHeading title="MÜHENDİSLİK" emphasis="EKİBİMİZ" subtitle="Flight & Research Crew Excellence" />
          <div className="mb-32">
            <div className="flex items-center gap-6 mb-16 px-4">
              <div className="p-3 rounded-2xl bg-blue-600/10 border border-blue-500/20"><Award className="text-blue-500 w-8 h-8" /></div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white leading-none mb-1">KIDEMLİ PROJE EKİBİ</h3>
                <p className="text-blue-400/60 text-[10px] mono uppercase font-black tracking-[0.3em]">Senior Engineering Leads</p>
              </div>
              <div className="h-px bg-gradient-to-r from-blue-900/50 to-transparent flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 px-4">
              {TEAM_MEMBERS.filter(m => m.isSenior).map((member, i) => <TeamMemberCard key={i} member={member} />)}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-6 mb-16 px-4">
              <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50"><Chip className="text-slate-500 w-8 h-8" /></div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-slate-300 leading-none mb-1">AR-GE EKİBİ</h3>
                <p className="text-slate-500 text-[10px] mono uppercase font-black tracking-[0.3em]">Research & Development Units</p>
              </div>
              <div className="h-px bg-gradient-to-r from-slate-900 to-transparent flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 px-4">
              {TEAM_MEMBERS.filter(m => !m.isSenior).map((member, i) => <TeamMemberCard key={i} member={member} />)}
            </div>
          </div>
        </section>
      )}

      <SponsorSection />

      <footer className="py-24 border-t border-blue-900/20 px-8 bg-[#01040f]">
        <div className="max-w-7xl mx-auto text-center">
          <Logo className="w-12 h-12 mx-auto mb-8 opacity-40" />
          <p className="text-slate-600 text-[10px] mono uppercase tracking-[0.5em] font-black">© 2016-2025 GÖKTÜRK UAV TECHNOLOGY TEAM</p>
          <div className="flex justify-center mt-10 gap-8">
             <a href="https://www.instagram.com/gokturkekibi/" target="_blank" className="text-slate-500 hover:text-pink-500 transition-all"><Instagram className="w-6 h-6" /></a>
             <a href="https://twitter.com/gokturiha" target="_blank" className="text-slate-500 hover:text-blue-400 transition-all"><Twitter className="w-6 h-6" /></a>
             <a href="https://www.linkedin.com/company/ne%C3%BC-g%C3%B6kt%C3%BCrk-uas/" target="_blank" className="text-slate-500 hover:text-blue-600 transition-all"><LinkedinIcon className="w-6 h-6" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
