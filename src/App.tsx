
import React, { useState } from 'react';
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
// İPUCU: Ekip fotoğraflarını public/crew/ klasörüne ekleyin.
const TEAM_MEMBERS: TeamMember[] = [
  { name: "Kürşat", surname: "Çiçin", role: "Ekip Kaptanı", dept: "Aviyonik Lideri", isSenior: true, linkedin: "#", photo: "/crew/kursat-cicin.jpg" },
  { name: "Kadir", surname: "Arslanpınar", role: "Baş Tasarımcı", dept: "Mekanik Tasarım", isSenior: true, linkedin: "#", photo: "/crew/kadir-arslanpinar.jpg" },
  { name: "Begüm", surname: "Aydoğan", role: "Yazılım Ve Kontrol", dept: "Yazılım", isSenior: true, linkedin: "#", photo: "/crew/begum-aydogan.jpg" },
  { name: "Rabia", surname: "Kıratlı", role: "Yazılım Lideri", dept: "Yazılım", isSenior: true, linkedin: "https://www.linkedin.com/in/rabiakiratlieng/", photo: "/crew/rabia-kiratli.jpg" },
  { name: "Mustafa", surname: "Ardıç", role: "Analiz Lideri", dept: "Analiz ve Üretim", isSenior: true, linkedin: "#", photo: "/crew/mustafa-ardic.jpg" },
  { name: "Şevval", surname: "Özaytekin", role: "Ar-Ge Mühendisi", dept: "Yazılım", linkedin: "#" , photo: "/crew/sevval-ozaytekin.jpg"},
  { name: "Mustafa", surname: "Özcan", role: "Ar-Ge Mühendisi", dept: "Mekanik Tasarım", linkedin: "#", photo: "/crew/mustafa-ozcan.jpg" },
  { name: "İsmail", surname: "Tanoğlu", role: "Ar-Ge Mühendisi", dept: "Aviyonik", linkedin: "#", photo: "/crew/ismail-tanoglu.jpg" },
  { name: "Akif Kerem", surname: "Özkan", role: "Ar-Ge Mühendisi", dept: "Mekanik Tasarım", linkedin: "#", photo: "/crew/akif-kerem-ozkan.jpg" },
  { name: "Mustafa", surname: "Albayrak", role: "Ar-Ge Mühendisi", dept: "Yazılım", linkedin: "#", photo: "/crew/mustafa-albayrak.jpg" },
  { name: "Ahmet Faruk", surname: "Işık", role: "Ar-Ge Mühendisi", dept: "Analiz", linkedin: "#"  , photo: "/crew/ahmet-faruk-isik.jpg" },
  { name: "İsmayıl", surname: "Bulut", role: "Ar-Ge Mühendisi", dept: "Mekanik Tasarım", linkedin: "#", photo: "/crew/ismayil-bulut.jpg" },
  { name: "Ahmet Korkmaz", surname: "Peker", role: "Ar-Ge Mühendisi", dept: "Aviyonik", linkedin: "#", photo: "/crew/ahmet-korkmaz-peker.jpg" },
  { name: "Tuba", surname: "Meydan", role: "Ar-Ge Mühendisi", dept: "Kurumsal Ve İletişim", linkedin: "#", photo: "/crew/tuba-meydan.jpg" },
  { name: "Halil", surname: "Közoğlu", role: "Ar-Ge Mühendisi", dept: "Mekanik Tasarım", linkedin: "#", photo: "/crew/halil-kozoglu.jpg" },
];

// İPUCU: Uçak fotoğraflarını public/fleet/ klasörüne ekleyin.
const FLEET_DATA: Aircraft[] = [
  { name: "Tulpar", desc: "Hibrit (tilt mekanizmalı) İHA. METU VTOL'da 4 yıl üst üste 1.lik (2020-22-23).", badge: "4x CHAMPION", type: "Hybrid/VTOL", photo: "/fleet/tulpar.png" },
  { name: "Pars", desc: "Savaşan İHA kategorisinde geliştirildi; 2019'da 6., 2022'de 9. oldu.", badge: "COMBAT READY", type: "Fixed Wing", photo: "/fleet/pars.jpg" },
  { name: "Dikine Teyyare", desc: "METU VTOL 2017: En İyi Uçuş Performansı 1.liği ve Genel Klasman 2.liği.", badge: "BEST PERFORMANCE", type: "VTOL", photo: "/fleet/dikine.png" },
  { name: "Tuğberk", desc: "METU VTOL genel klasman 1.liği ödülü kazanan platform.", badge: "WINNER", type: "VTOL", photo: "/fleet/tugberk.png" },
  { name: "Fenrir", desc: "Tübitak Uluslararası Sabit Kanat İHA kategorisi finalisti.", badge: "FINALIST", type: "Fixed Wing", photo: "/fleet/fenrir.jpeg" },
  { name: "Ebabil", desc: "UAV Turkey 2016'da 6. olan ilk sabit kanatlı İHA projemiz.", badge: "LEGACY", type: "Fixed Wing", photo: "/fleet/ebabil.png" },
  { name: "Kalender", desc: "Sabit ve döner kanatlı modeller; 2017'de 4.lük derecesi.", badge: "MULTI-ROTOR", type: "Fixed/Rotary", photo: "/fleet/kalender.png" },
  { name: "Gökbörü", desc: "2020: Yüksek manevra kabiliyeti ve düşük maliyet odaklı tasarım.", badge: "AGILE", type: "Fixed Wing", photo: "/fleet/gokboru.png" }
];

const ACHIEVEMENTS_DATA = [
  { year: "2016", desc: "GÖKTÜRK İHA Ekibi'nin kuruluşu ve Ebabil Projesi ile ilk başarı." },
  { year: "2017", desc: "METU VTOL En İyi Uçuş Performansı ve 2.liği" },
  { year: "2018", desc: "METU VTOL Genel Sıralama 1.liği." },
  { year: "2019", desc: "AIAA DBF (ABD) Yarışması: En İyi Türk Takımı Ünvanı." },
  { year: "2020", desc: "METU VTOL Genel Sıralama 1.liği." },
  { year: "2023", desc: "METU VTOL Genel Sıralama 1.liği." },
  { year: "2023", desc: "TEKNOFEST Girişim Yarışması: 'En İyi Girişim' Ödülü." },
  { year: "2025", desc: "METU VTOL Genel Sıralama 1.liği (Üst üste 5 yıl şampiyonluk)." }
];

// --- Components ---

const SocialLinks = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <a href="https://www.instagram.com/gokturkekibi/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-pink-500 transition-all hover:scale-110">
      <Instagram className="w-5 h-5" />
    </a>
    <a href="https://twitter.com/gokturkiha" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-all hover:scale-110">
      <Twitter className="w-5 h-5" />
    </a>
    <a href="https://www.linkedin.com/company/ne%C3%BC-g%C3%B6kt%C3%BCrk-uas/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition-all hover:scale-110">
      <LinkedinIcon className="w-5 h-5" />
    </a>
    <a href="https://www.youtube.com/@gokturkekibi219" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-red-500 transition-all hover:scale-110">
      <Youtube className="w-5 h-5" />
    </a>
  </div>
);

const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <img 
    src="/logo.png" 
    alt="Göktürk İHA Logo" 
    className={`${className} object-contain transition-transform group-hover:scale-110`}
    onError={(e) => {
      e.currentTarget.style.display = 'none';
      e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
    }}
  />
);

const ImagePlaceholder = ({ label, className = "" }: { label: string, className?: string }) => (
  <div className={`w-full bg-slate-900/50 border-2 border-dashed border-blue-900/50 flex flex-col items-center justify-center p-6 text-center group hover:border-blue-500/50 transition-all duration-500 ${className}`}>
    <div className="relative mb-2">
      <Target className="w-10 h-10 text-slate-700 group-hover:text-blue-400 transition-colors" />
      <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
    <span className="text-slate-500 font-semibold uppercase tracking-[0.2em] text-[8px] group-hover:text-blue-200">{label}</span>
  </div>
);

const DepartmentIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'Analiz ve Üretim': return <BarChart3 className="w-5 h-5" />;
    case 'Mekanik Tasarım': return <Wrench className="w-5 h-5" />;
    case 'Yazılım': return <Code className="w-5 h-5" />;
    case 'Aviyonik ve Kontrol': return <CircuitBoard className="w-5 h-5" />;
    case 'Üretim (Kompozit)': return <Layers className="w-5 h-5" />;
    default: return <Activity className="w-5 h-5" />;
  }
};

const TeamMemberCard = ({ member, key }: { member: TeamMember; key?: string }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`group relative p-6 glass-panel rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${member.isSenior ? 'border-blue-500/30' : 'border-slate-800'}`}>
      <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
        <div className="w-4 h-4 border-t-2 border-r-2 border-blue-500 rounded-tr-lg"></div>
      </div>
      <div className="absolute bottom-0 left-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
        <div className="w-4 h-4 border-b-2 border-l-2 border-blue-500 rounded-bl-lg"></div>
      </div>
      
      <div className="relative mb-6 mx-auto w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-2xl bg-slate-900 shadow-inner">
        {member.photo && !imgError ? (
          <img 
            src={member.photo} 
            alt={`${member.name} ${member.surname}`} 
            className="w-full h-full object-cover grayscale-0 group-hover:grayscale group-hover:scale-110 transition-all duration-500 opacity-100 group-hover:opacity-90"
            onError={() => setImgError(true)}
          />
        ) : (
          <ImagePlaceholder label="GÖKTÜRK" className="h-full border-none" />
        )}

        {member.isSenior && (
          <div className="absolute top-2 right-2 bg-blue-600 p-1.5 rounded-lg shadow-xl animate-pulse z-20">
            <Star className="text-white w-3 h-3 fill-current" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-blue-600/60 flex items-center justify-center gap-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-full text-blue-600 hover:scale-110 transition-transform">
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <button className="bg-white p-2 rounded-full text-blue-600 hover:scale-110 transition-transform">
            <Mail className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="text-center">
        <h4 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-blue-400 transition-colors">
          {member.name} <span className="text-blue-400 group-hover:text-white">{member.surname}</span>
        </h4>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1 mb-3">
          {member.role}
        </p>
        <div className="inline-block px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 text-slate-500 text-[8px] mono uppercase tracking-tighter">
          {member.dept}
        </div>
      </div>
    </div>
  );
};

const AircraftCard = ({ plane, index }: { plane: Aircraft; index: number; key?: string }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group glass-panel p-6 rounded-[2rem] border border-blue-900/10 hover:border-blue-500/30 transition-all flex flex-col h-full overflow-hidden">
      <div className="relative h-48 mb-6 rounded-xl overflow-hidden bg-slate-900">
        {plane.photo && !imgError ? (
          <>
            <img 
              src={plane.photo} 
              alt={plane.name} 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-50"
              onError={() => setImgError(true)}
            />
            {/* Overlay Technical Specs on Hover */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4">
               <div className="w-full border-t border-blue-500/50 mb-2"></div>
               <span className="text-[10px] mono text-blue-400 uppercase tracking-widest mb-1">DESIGN READY</span>
               <span className="text-[8px] mono text-blue-300/60 uppercase">AUTO-PILOT INTEGRATED</span>
               <div className="w-full border-b border-blue-500/50 mt-2"></div>
            </div>
          </>
        ) : (
          <ImagePlaceholder label={`${plane.name} CAD`} className="h-full border-none" />
        )}
      </div>
      
      <div className="flex justify-between items-start mb-4 px-2">
        <div>
          <h3 className="text-2xl font-black uppercase italic group-hover:text-blue-400 transition-colors">{plane.name}</h3>
          <span className="text-[9px] mono text-blue-400/60 uppercase tracking-widest">{plane.type}</span>
        </div>
        <span className="text-[8px] px-2 py-1 bg-blue-600/20 text-blue-400 rounded font-black mono border border-blue-500/10">{plane.badge}</span>
      </div>
      <p className="text-slate-400 text-xs leading-relaxed flex-grow px-2 mb-4 font-light">{plane.desc}</p>
      
      <div className="mt-auto pt-4 border-t border-slate-800/50 flex justify-between items-center px-2">
         <div className="flex gap-1">
            <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
            <div className="w-1 h-3 bg-blue-500/50 rounded-full"></div>
            <div className="w-1 h-3 bg-blue-500/20 rounded-full"></div>
         </div>
         <button className="text-[9px] uppercase font-bold text-slate-500 hover:text-blue-400 transition-colors flex items-center gap-1">
            Teknik Rapor <ChevronRight className="w-3 h-3" />
         </button>
      </div>
    </div>
  );
};

const Navbar = ({ activePage, setPage }: { activePage: Page, setPage: (p: Page) => void }) => (
  <nav className="fixed top-0 w-full z-50 glass-panel border-b border-blue-500/10 px-8 py-4 flex justify-between items-center">
    <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setPage('home')}>
      <div className="relative">
        <div className="bg-blue-600/20 p-1.5 rounded-lg glow-blue group-hover:bg-blue-600/40 transition-all">
          <Logo className="w-8 h-8" />
          <Target className="text-white w-6 h-6 fallback-icon hidden" />
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-xl font-black tracking-tighter glow-text uppercase flex items-center gap-2">
          GÖKTÜRK <span className="text-blue-400 italic">İHA EKİBİ</span>
        </span>
        <span className="text-[7px] mono text-blue-300/60 uppercase tracking-widest mt-1">Necmettin Erbakan Üniversitesi • Konya</span>
      </div>
    </div>
    <div className="hidden lg:flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
      <button onClick={() => setPage('home')} className={`${activePage === 'home' ? 'text-blue-400 border-b-2 border-blue-400' : 'hover:text-blue-400'} transition-colors pb-1`}>Ana Sayfa</button>
      <button onClick={() => setPage('fleet')} className={`${activePage === 'fleet' ? 'text-blue-400 border-b-2 border-blue-400' : 'hover:text-blue-400'} transition-colors pb-1`}>Uçaklarımız</button>
      <button onClick={() => setPage('achievements')} className={`${activePage === 'achievements' ? 'text-blue-400 border-b-2 border-blue-400' : 'hover:text-blue-400'} transition-colors pb-1`}>Başarılarımız</button>
      <button onClick={() => setPage('crew')} className={`${activePage === 'crew' ? 'text-blue-400 border-b-2 border-blue-400' : 'hover:text-blue-400'} transition-colors pb-1`}>Ekibimiz</button>
    </div>
    <div className="flex items-center gap-6">
      <SocialLinks className="hidden md:flex" />
      <a 
        href="https://form.jotform.com/212165646397059" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-white text-slate-950 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-tighter hover:bg-blue-50 transition-all shadow-xl shadow-blue-500/10 flex items-center gap-2"
      >
        Bize Katıl <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  </nav>
);

const App = () => {
  const [page, setPage] = useState<Page>('home');

  const technicalCapabilities = [
    { name: 'Analiz ve Üretim', tools: ['XFRL 5', 'Open VSP', 'ANSYS Fluent'], desc: 'Tasarım optimizasyonu ve akışkanlar dinamiği analizleri.' },
    { name: 'Mekanik Tasarım', tools: ['Solidworks', 'Catia'], desc: 'Atış sistemleri ve tilt mekanizmaları gibi kompleks sistemlerin katı modellemesi.' },
    { name: 'Yazılım', tools: ['Python', 'C++', 'OpenCV', 'Mavlink'], desc: 'Yapay zeka tabanlı nesne tespiti, İHA kontrol ve haberleşme.' },
    { name: 'Aviyonik ve Kontrol', tools: ['Ardupilot', 'MissionPlanner', 'Altium Designer'], desc: 'Tam otonom uçuş sistemleri ve özgün PCB tasarımları.' },
    { name: 'Üretim (Kompozit)', tools: ['Karbon/Cam Elyaf', '3D Yazıcı'], desc: 'Hafif ve dayanıklı gövde üretimi kabiliyeti.' }
  ];

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-blue-500 selection:text-white">
      <Navbar activePage={page} setPage={setPage} />

      {page === 'home' && (
        <>
          <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0 scanlines">
              <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-[#020617]/70 to-[#020617] z-10"></div>
              <video 
                autoPlay loop muted playsInline 
                className="w-full h-full object-cover grayscale-[0.1] brightness-[0.4]"
                poster="/video-poster.jpg"
              >
                <source src="/background-4.mp4" type="video/mp4" />
                <div className="w-full h-full bg-[#020617]"></div>
              </video>
            </div>
            
            <div className="relative z-20 text-center px-6 mt-20 max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-blue-400 text-[10px] mono uppercase tracking-[0.4em] mb-8">
                <History className="w-3 h-3" /> Founded 15.02.2016 • Aerospace Excellence
              </div>
              <div className="flex flex-col items-center gap-4 mb-8">
                <Logo className="w-24 h-24 md:w-32 md:h-32 mb-4 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
                <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-none">
                  GÖKTÜRK <br />
                  <span className="text-white glow-text underline decoration-blue-500 decoration-8 underline-offset-8 italic">İHA EKİBİ</span>
                </h1>
              </div>
              <p className="max-w-3xl mx-auto text-slate-200 text-lg md:text-xl mb-12 leading-relaxed font-light drop-shadow-lg">
                "Gökyüzünde kurulan hayallerin, yer yüzünde gerçeğe dönüşen projelerin adresi."
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <button onClick={() => setPage('fleet')} className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-3">
                  Projelerimizi Gör <ChevronRight className="w-4 h-4" />
                </button>
                <button onClick={() => setPage('achievements')} className="border border-blue-500/30 hover:border-blue-500/60 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 bg-slate-900/40 backdrop-blur-md text-white">
                  Başarı Tablosu
                </button>
              </div>
            </div>
          </section>

          <section className="py-24 px-6 bg-slate-950/50 relative">
             <div className="max-w-4xl mx-auto text-center">
                <Shield className="w-12 h-12 text-blue-500 mx-auto mb-8 opacity-50" />
                <h2 className="text-4xl font-black uppercase mb-8">VİZYONUMUZ</h2>
                <p className="text-slate-400 text-lg leading-relaxed font-light">
                  İnsansız hava aracı teknolojisinde uzman, özgün ve yenilikçi bir ekip olarak ülkemizi uluslararası alanda temsil etmek; havacılık literatürüne yerli mühendislik çözümleri kazandırmak.
                </p>
             </div>
          </section>

          <section className="py-32 px-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-16 text-center">Teknik <span className="text-blue-500">Kabiliyetler</span></h2>
            <div className="grid md:grid-cols-5 gap-6">
              {technicalCapabilities.map((cap, i) => (
                <div key={i} className="glass-panel p-8 rounded-2xl border border-blue-900/20 hover:border-blue-500/40 transition-all group">
                  <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform flex justify-center">
                    <DepartmentIcon name={cap.name} />
                  </div>
                  <h3 className="text-[11px] font-black uppercase tracking-widest leading-tight text-white mb-4 text-center">{cap.name}</h3>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {cap.tools.map(tool => (
                      <span key={tool} className="text-[8px] bg-blue-900/30 px-2 py-0.5 rounded text-blue-400 mono">{tool}</span>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500 text-center leading-relaxed">{cap.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {page === 'fleet' && (
        <section className="py-40 px-6 max-w-7xl mx-auto min-h-screen">
          <div className="text-center mb-24">
            <span className="text-blue-500 mono text-xs uppercase tracking-[0.5em] mb-4 block underline decoration-blue-500/30 underline-offset-8">GÖKTÜRK UAS PORTFOLIO</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">İHA <span className="text-blue-500">PROJELERİMİZ</span></h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {FLEET_DATA.map((plane, i) => (
              <AircraftCard plane={plane} index={i} key={`aircraft-${i}`} />
            ))}
          </div>
        </section>
      )}

      {page === 'achievements' && (
        <section className="py-40 px-6 max-w-7xl mx-auto min-h-screen">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">KRONOLOJİ & <span className="text-blue-500">BAŞARILAR</span></h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-20">
            <div className="relative space-y-12">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-blue-900/50"></div>
              {ACHIEVEMENTS_DATA.map((item, i) => (
                <div key={i} className="pl-12 relative group">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-slate-900 border-2 border-blue-600 flex items-center justify-center z-10 group-hover:scale-125 transition-transform">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                  </div>
                  <div className="glass-panel p-6 rounded-2xl hover:border-blue-500/40 transition-all">
                    <span className="text-blue-500 font-black mono text-xl mb-2 block">{item.year}</span>
                    <p className="text-slate-300 text-sm font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-10">
              <div className="bg-blue-600/5 border border-blue-500/20 p-10 rounded-[3rem]">
                <Rocket className="text-blue-500 w-12 h-12 mb-8" />
                <h3 className="text-3xl font-black uppercase mb-6">DOMİNASYON</h3>
                <p className="text-slate-400 leading-relaxed font-light mb-8 italic">
                  "Göktürk İHA, METU VTOL yarışmalarında son 5 yılda kazandığı şampiyonluklarla Türkiye'nin en istikrarlı teknoloji ekiplerinden biri olduğunu kanıtlamıştır."
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 p-6 rounded-2xl text-center">
                    <span className="text-3xl font-black text-white block mb-1">4 YIL</span>
                    <span className="text-[10px] text-blue-400 uppercase tracking-widest">ÜST ÜSTE 1.LİK</span>
                  </div>
                  <div className="bg-slate-900/50 p-6 rounded-2xl text-center">
                    <span className="text-3xl font-black text-white block mb-1">USA</span>
                    <span className="text-[10px] text-blue-400 uppercase tracking-widest">EN İYİ TÜRK EKİBİ</span>
                  </div>
                </div>
              </div>
              <div className="glass-panel p-10 rounded-[3rem] border-amber-500/20">
                <Trophy className="text-amber-500 w-10 h-10 mb-6" />
                <h4 className="text-xl font-black uppercase mb-4">TEKNOFEST BAŞARISI</h4>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  2023 yılında Teknofest Girişim Yarışması'nda 'En İyi Girişim' ödülünü alarak mühendislik projelerimizi ticarileşme ve sürdürülebilirlik odaklı bir boyuta taşıdık.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {page === 'crew' && (
        <section className="py-40 px-6 max-w-7xl mx-auto min-h-screen">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-[10px] mono uppercase tracking-[0.4em] mb-8">
              <Users className="w-3 h-3" /> Flight & Research Crew
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 italic">
              MÜHENDİSLİK <span className="text-blue-400">EKİBİMİZ</span>
            </h2>
          </div>

          <div className="mb-32">
            <div className="flex items-center gap-6 mb-16">
              <div className="p-3 rounded-2xl bg-blue-600/10 border border-blue-500/20">
                <Award className="text-blue-500 w-8 h-8" />
              </div>
              <div>
                <h3 className="text-3xl font-black uppercase tracking-widest text-white leading-none mb-1">KIDEMLİ PROJE EKİBİ</h3>
                <p className="text-blue-400/60 text-[10px] mono uppercase font-bold tracking-[0.3em]">Senior Engineering Leads</p>
              </div>
              <div className="h-px bg-gradient-to-r from-blue-900/50 to-transparent flex-grow"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {TEAM_MEMBERS.filter(m => m.isSenior).map((member, i) => (
                <TeamMemberCard key={`senior-${i}`} member={member} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-6 mb-16">
              <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                <Cpu className="text-slate-500 w-8 h-8" />
              </div>
              <div>
                <h3 className="text-3xl font-black uppercase tracking-widest text-slate-300 leading-none mb-1">AR-GE EKİBİ</h3>
                <p className="text-slate-500 text-[10px] mono uppercase font-bold tracking-[0.3em]">Research & Development Units</p>
              </div>
              <div className="h-px bg-gradient-to-r from-slate-900 to-transparent flex-grow"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {TEAM_MEMBERS.filter(m => !m.isSenior).map((member, i) => (
                <TeamMemberCard key={`rnd-${i}`} member={member} />
              ))}
            </div>
          </div>
        </section
      )}

      <footer className="py-24 border-t border-blue-900/20 px-8 bg-[#01040f]">
        <div className="max-w-7xl mx-auto text-center">
          <Logo className="w-12 h-12 mx-auto mb-6" />
          <p className="text-slate-600 text-[10px] mono uppercase tracking-[0.5em]">© 2016-2024 GÖKTÜRK UAV TECHNOLOGY TEAM</p>
          <div className="flex justify-center mt-8">
             <SocialLinks />
          </div>
        </div>
      </footer>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
