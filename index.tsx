
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
  Linkedin as LinkedinIcon
} from 'lucide-react';

// --- Types ---
type Page = 'home' | 'fleet' | 'achievements' | 'crew';

interface TeamMember {
  name: string;
  surname: string;
  role: string;
  dept: string;
  photo?: string; 
  linkedin?: string;
  isSenior?: boolean;
}

interface Aircraft {
  name: string;
  desc: string;
  badge: string;
  type: string;
  photo?: string;
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
  { name: "Tulpar", desc: "Hibrit (tilt mekanizmalı) İHA. METU VTOL'da 3 yıl üst üste 1.lik (2020-22-23).", badge: "3x CHAMPION", type: "Hybrid/VTOL", photo: "/fleet/tulpar.jpg" },
  { name: "Pars", desc: "Savaşan İHA kategorisinde geliştirildi; 2019'da 6., 2022'de 9. oldu.", badge: "COMBAT READY", type: "Fixed Wing", photo: "/fleet/pars.jpg" },
  { name: "Dikine Teyyare", desc: "METU VTOL 2017: En İyi Uçuş Performance 1.liği ve Genel Klasman 2.liği.", badge: "BEST PERFORMANCE", type: "VTOL", photo: "/fleet/dikine.jpg" },
  { name: "Tuğberk", desc: "METU VTOL genel klasman 1.liği ödülü kazanan platform.", badge: "WINNER", type: "VTOL", photo: "/fleet/tugberk.jpg" },
  { name: "Fenrir", desc: "Tübitak Uluslararası Sabit Kanat İHA kategorisi finalisti.", badge: "FINALIST", type: "Fixed Wing", photo: "/fleet/fenrir.jpg" },
  { name: "Ebabil", desc: "UAV Turkey 2016'da 6. olan ilk sabit kanatlı İHA projemiz.", badge: "LEGACY", type: "Fixed Wing", photo: "/fleet/ebabil.jpg" },
  { name: "Kalender", desc: "Sabit ve döner kanatlı modeller; 2017'de 4.lük derecesi.", badge: "MULTI-ROTOR", type: "Fixed/Rotary", photo: "/fleet/kalender.jpg" },
  { name: "Gökbörü", desc: "2020: Yüksek manevra kabiliyeti ve düşük maliyet odaklı tasarım.", badge: "AGILE", type: "Fixed Wing", photo: "/fleet/gokboru.jpg" }
];

const ACHIEVEMENTS_DATA = [
  { year: "2016", desc: "GÖKTÜRK İHA Ekibi'nin kuruluşu ve Ebabil Projesi ile ilk başarı." },
  { year: "2017", desc: "METU VTOL En İyi Uçuş Performansı 1.liği Ödülü." },
  { year: "2018", desc: "METU VTOL Genel Sıralama 1.liği." },
  { year: "2019", desc: "AIAA DBF (ABD) Yarışması: En İyi Türk Takımı Ünvanı." },
  { year: "2020-25", desc: "METU VTOL Genel Sıralama 1.liği (Üst üste 4 yıl şampiyonluk)." },
  { year: "2023", desc: "TEKNOFEST Girişim Yarışması: 'En İyi Girişim' Ödülü." }
];

// --- Components ---

const SocialLinks = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <a href="https://www.instagram.com/gokturkekibi/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-500 transition-all">
      <Instagram className="w-5 h-5" />
    </a>
    <a href="https://twitter.com/gokturiha" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-all">
      <Twitter className="w-5 h-5" />
    </a>
    <a href="https://www.linkedin.com/company/ne%C3%BC-g%C3%B6kt%C3%BCrk-uas/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-all">
      <LinkedinIcon className="w-5 h-5" />
    </a>
  </div>
);

const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <img 
    src="/logo.png" 
    alt="Logo" 
    className={`${className} object-contain`}
    onError={(e) => {
      e.currentTarget.style.display = 'none';
      e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
    }}
  />
);

const ImagePlaceholder = ({ label, className = "" }: { label: string, className?: string }) => (
  <div className={`w-full bg-slate-900/50 border-2 border-dashed border-blue-900/50 flex flex-col items-center justify-center p-6 text-center group ${className}`}>
    <Target className="w-8 h-8 text-slate-700 group-hover:text-blue-400 transition-colors mb-2" />
    <span className="text-slate-500 font-bold uppercase tracking-widest text-[8px]">{label}</span>
  </div>
);

const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`group relative p-4 glass-panel rounded-2xl transition-all duration-300 hover:-translate-y-1 ${member.isSenior ? 'border-blue-500/30' : 'border-slate-800'}`}>
      <div className="relative mb-4 mx-auto w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-xl bg-slate-900 shadow-inner">
        {member.photo && !imgError ? (
          <img 
            src={member.photo} 
            alt={member.name} 
            className="w-full h-full object-cover grayscale-0 group-hover:grayscale transition-all duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <ImagePlaceholder label="TEAM" className="h-full border-none" />
        )}
        {member.isSenior && (
          <div className="absolute top-1 right-1 bg-blue-600 p-1 rounded-lg shadow-xl z-20">
            <Star className="text-white w-2 h-2 fill-current" />
          </div>
        )}
      </div>
      <div className="text-center">
        <h4 className="text-sm font-black uppercase text-white tracking-tight">
          {member.name} <span className="text-blue-400">{member.surname}</span>
        </h4>
        <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mt-1">
          {member.role}
        </p>
      </div>
    </div>
  );
};

const AircraftCard = ({ plane }: { plane: Aircraft }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group glass-panel p-5 rounded-3xl border border-blue-900/10 hover:border-blue-500/30 transition-all flex flex-col h-full overflow-hidden">
      <div className="relative h-40 mb-4 rounded-xl overflow-hidden bg-slate-900">
        {plane.photo && !imgError ? (
          <img 
            src={plane.photo} 
            alt={plane.name} 
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <ImagePlaceholder label={`${plane.name} CAD`} className="h-full border-none" />
        )}
      </div>
      <h3 className="text-xl font-black uppercase italic text-white group-hover:text-blue-400 transition-colors mb-1">{plane.name}</h3>
      <span className="text-[8px] mono text-blue-400/60 uppercase tracking-widest mb-3">{plane.type}</span>
      <p className="text-slate-400 text-[10px] leading-relaxed mb-4">{plane.desc}</p>
      <div className="mt-auto pt-4 border-t border-slate-800/50">
        <span className="text-[8px] px-2 py-1 bg-blue-600/20 text-blue-400 rounded-md font-black mono border border-blue-500/10">{plane.badge}</span>
      </div>
    </div>
  );
};

const Navbar = ({ activePage, setPage }: { activePage: Page, setPage: (p: Page) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'fleet', label: 'Uçaklarımız' },
    { id: 'achievements', label: 'Başarılarımız' },
    { id: 'crew', label: 'Ekibimiz' }
  ];

  const handleNav = (p: Page) => {
    setPage(p);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-[100] glass-panel border-b border-blue-500/10 px-4 md:px-8 py-3 md:py-4 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNav('home')}>
        <div className="bg-blue-600/20 p-1.5 rounded-lg group-hover:bg-blue-600/40 transition-all">
          <Logo className="w-6 h-6 md:w-8 md:h-8" />
          <Target className="text-white w-6 h-6 fallback-icon hidden" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-lg md:text-xl font-black tracking-tighter glow-text uppercase">
            GÖKTÜRK <span className="text-blue-400 italic">İHA</span>
          </span>
          <span className="text-[6px] md:text-[7px] mono text-blue-300/60 uppercase tracking-widest">NEÜ • KONYA</span>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
        {menuItems.map(item => (
          <button 
            key={item.id}
            onClick={() => handleNav(item.id as Page)} 
            className={`${activePage === item.id ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-white'} transition-all pb-1`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <a 
          href="https://form.jotform.com/212165646397059" 
          target="_blank" 
          className="bg-white text-slate-950 px-4 md:px-6 py-1.5 md:py-2 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-tighter hover:bg-blue-50 transition-all flex items-center gap-2"
        >
          Katıl <ExternalLink className="w-3 h-3" />
        </a>
        <button 
          className="lg:hidden text-slate-400 p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#020617] border-b border-blue-500/20 flex flex-col p-6 gap-4 lg:hidden animate-in fade-in slide-in-from-top duration-300">
          {menuItems.map(item => (
            <button 
              key={item.id}
              onClick={() => handleNav(item.id as Page)}
              className={`text-left text-sm font-black uppercase tracking-widest p-2 ${activePage === item.id ? 'text-blue-400' : 'text-slate-500'}`}
            >
              {item.label}
            </button>
          ))}
          <div className="h-px bg-slate-800 my-2"></div>
          <div className="flex justify-center gap-6">
            <SocialLinks />
          </div>
        </div>
      )}
    </nav>
  );
};

const App = () => {
  const [page, setPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-blue-500 selection:text-white">
      <Navbar activePage={page} setPage={setPage} />

      {page === 'home' && (
        <>
          <section id="hero" className="relative h-[90dvh] md:h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0 scanlines">
              <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/40 via-[#020617]/70 to-[#020617] z-10"></div>
              <video 
                autoPlay loop muted playsInline 
                className="w-full h-full object-cover scale-105"
                poster="/video-poster.jpg"
              >
                <source src="/background-4.mp4" type="video/mp4" />
                <div className="w-full h-full bg-[#020617]"></div>
              </video>
            </div>
            
            <div className="relative z-20 text-center px-6 mt-10 md:mt-20 max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-blue-400 text-[8px] md:text-[10px] mono uppercase tracking-[0.3em] mb-6 md:mb-8">
                <History className="w-3 h-3" /> Est. 2016 • Aerospace Excellence
              </div>
              <div className="flex flex-col items-center gap-4 mb-6">
                <Logo className="w-16 h-16 md:w-32 md:h-32 mb-4" />
                <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter mb-4 leading-none">
                  GÖKTÜRK <br />
                  <span className="text-white glow-text italic underline decoration-blue-600 decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8">İHA EKİBİ</span>
                </h1>
              </div>
              <p className="max-w-2xl mx-auto text-slate-300 text-sm md:text-xl mb-8 md:mb-12 leading-relaxed font-light px-4">
                "Yerli ve milli mühendislik çözümleriyle İnsansız Hava Araçları'nın geleceğini tasarlıyoruz."
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-6">
                <button onClick={() => setPage('fleet')} className="bg-blue-600 text-white px-8 md:px-12 py-3.5 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:scale-105 transition-all flex items-center justify-center gap-3">
                  Projelerimiz <ChevronRight className="w-4 h-4" />
                </button>
                <button onClick={() => setPage('crew')} className="border border-blue-500/30 bg-slate-900/40 backdrop-blur-md px-8 md:px-12 py-3.5 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs text-white">
                  Ekibe Göz At
                </button>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-32 px-6 max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-12 md:mb-20 text-center">Teknik <span className="text-blue-500">Departmanlar</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
              {[
                { name: 'Analiz', icon: <BarChart3 className="w-6 h-6"/>, desc: 'Aerodinamik optimizasyon.' },
                { name: 'Mekanik', icon: <Wrench className="w-6 h-6"/>, desc: '3D Tasarım ve CAD.' },
                { name: 'Yazılım', icon: <Code className="w-6 h-6"/>, desc: 'Otonom kontrol sistemleri.' },
                { name: 'Aviyonik', icon: <CircuitBoard className="w-6 h-6"/>, desc: 'Elektronik ve PCB.' },
                { name: 'Kompozit', icon: <Layers className="w-6 h-6"/>, desc: 'Üretim ve montaj.' }
              ].map((cap, i) => (
                <div key={i} className="glass-panel p-6 md:p-8 rounded-2xl border border-blue-900/20 text-center group transition-all">
                  <div className="text-blue-500 mb-4 group-hover:scale-110 transition-transform flex justify-center">
                    {cap.icon}
                  </div>
                  <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-white mb-2">{cap.name}</h3>
                  <p className="hidden md:block text-[9px] text-slate-500 leading-relaxed">{cap.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {page === 'fleet' && (
        <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto min-h-screen">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">İHA <span className="text-blue-500">FİLOMUZ</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {FLEET_DATA.map((plane, i) => (
              <AircraftCard key={i} plane={plane} />
            ))}
          </div>
        </section>
      )}

      {page === 'achievements' && (
        <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto min-h-screen">
          <div className="text-center mb-20 md:mb-32">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">BAŞARI <span className="text-blue-500">TABLOMUZ</span></h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20">
            <div className="relative space-y-8 md:space-y-12">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-blue-900/50"></div>
              {ACHIEVEMENTS_DATA.map((item, i) => (
                <div key={i} className="pl-12 relative group">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-slate-900 border-2 border-blue-600 flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  </div>
                  <div className="glass-panel p-5 md:p-6 rounded-2xl">
                    <span className="text-blue-500 font-black mono text-lg mb-1 block">{item.year}</span>
                    <p className="text-slate-300 text-xs md:text-sm font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-blue-600/5 border border-blue-500/20 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] h-fit">
              <Trophy className="text-blue-500 w-10 h-10 mb-6" />
              <h3 className="text-2xl md:text-3xl font-black uppercase mb-6 leading-tight">GELENEKSEL <br/> ŞAMPİYONLUK</h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light mb-8 italic">
                "METU VTOL yarışmalarında üst üste kazanılan şampiyonluklarla İHA teknolojisinde Konya'nın öncü ekibi olmaya devam ediyoruz."
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 md:p-6 rounded-2xl text-center">
                  <span className="text-2xl md:text-3xl font-black text-white block">4+</span>
                  <span className="text-[8px] md:text-[10px] text-blue-400 uppercase tracking-widest">ŞAMPİYONLUK</span>
                </div>
                <div className="bg-slate-900/50 p-4 md:p-6 rounded-2xl text-center">
                  <span className="text-2xl md:text-3xl font-black text-white block">USA</span>
                  <span className="text-[8px] md:text-[10px] text-blue-400 uppercase tracking-widest">BEST TURKISH TEAM</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {page === 'crew' && (
        <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto min-h-screen">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic">
              EKİP <span className="text-blue-400">ÜYELERİMİZ</span>
            </h2>
          </div>

          <div className="mb-20 md:mb-32">
            <div className="flex items-center gap-4 mb-10 md:mb-16">
              <Award className="text-blue-500 w-6 h-6" />
              <h3 className="text-xl md:text-3xl font-black uppercase tracking-widest text-white">YÖNETİM & KIDEMLİ</h3>
              <div className="h-px bg-gradient-to-r from-blue-900/50 to-transparent flex-grow"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
              {TEAM_MEMBERS.filter(m => m.isSenior).map((member, i) => (
                <TeamMemberCard key={i} member={member} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-10 md:mb-16">
              <Cpu className="text-slate-500 w-6 h-6" />
              <h3 className="text-xl md:text-3xl font-black uppercase tracking-widest text-slate-300">AR-GE EKİBİ</h3>
              <div className="h-px bg-gradient-to-r from-slate-900 to-transparent flex-grow"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
              {TEAM_MEMBERS.filter(m => !m.isSenior).map((member, i) => (
                <TeamMemberCard key={i} member={member} />
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="py-16 md:py-24 border-t border-blue-900/20 px-8 bg-[#01040f]">
        <div className="max-w-7xl mx-auto text-center">
          <Logo className="w-10 h-10 mx-auto mb-6 opacity-50" />
          <p className="text-slate-600 text-[8px] md:text-[10px] mono uppercase tracking-[0.4em]">© 2016-2024 GÖKTÜRK UAV TECHNOLOGY TEAM</p>
          <div className="flex justify-center mt-6">
             <SocialLinks />
          </div>
        </div>
      </footer>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
