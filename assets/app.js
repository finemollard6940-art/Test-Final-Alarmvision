// ===================== TAILWIND CONFIG =====================
tailwind.config = {
  theme: {
    extend: {
      colors: {
        danger: { 500: '#DC2626', 600: '#B91C1C', 700: '#991B1B' }
      },
      fontFamily: {
        'tech': ['Orbitron', 'sans-serif'],
        'body': ['Rajdhani', 'sans-serif']
      }
    }
  }
};

const { useState, useEffect, useRef } = React;

// ===================== ICÔNES =====================
const EyeIcon = ({size=24, className=""}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const MenuIcon = ({size=24, className=""}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/>
  </svg>
);
const CloseIcon = ({size=24, className=""}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const CheckIcon = ({size=20, className=""}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const ShieldAlert = ({size=24}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M12 8v4"/><path d="M12 16h.01"/>
  </svg>
);
const ShieldIcon = ({size=24, stroke="currentColor"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const PhoneIcon = ({size=24}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.76a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const BotIcon = ({size=24}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/>
    <line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
);
const Camera = ({size=24}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
);
const Lock = ({size=24}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const ClipboardCheck = ({size=24}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    <path d="m9 14 2 2 4-4"/>
  </svg>
);
const BellRing = ({size=24}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
  </svg>
);

// ===================== FADE IN =====================
const FadeIn = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {children}
    </div>
  );
};

// ===================== SAV MODAL =====================
const SavModal = ({isOpen, onClose}) => {
  const [mode, setMode] = useState('menu');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [chatMessages, setChatMessages] = useState([{sender:'bot', text:"Bonjour ! Je suis l'assistant Alarm Vision. Comment puis-je vous aider aujourd'hui ?"}]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState('');
  const chatEndRef = useRef(null);

  const reset = () => {
    setMode('menu'); setPhone(''); setDescription('');
    setChatMessages([{sender:'bot', text:"Bonjour ! Je suis l'assistant Alarm Vision. Comment puis-je vous aider aujourd'hui ?"}]);
    setInputMsg(''); setEmailError(''); setSending(false);
    onClose();
  };

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({behavior:'smooth'});
  }, [chatMessages, isTyping]);

  const botRespond = (userMsg, idx) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const emailLink = "contact@alarmvision.fr";
      let reply = `Je transmets votre demande à notre équipe. Écrivez-nous à ${emailLink} — réponse sous 24h.`;
      const m = userMsg.toLowerCase();
      if (idx===0 || m.includes('systeme') || m.includes('fonctionne'))
        reply = `Je comprends votre problème. Contactez-nous à ${emailLink} en décrivant votre situation. Nous répondons sous 24h.`;
      else if (idx===1 || m.includes('camera') || m.includes('image'))
        reply = `Problème caméra identifié. Écrivez-nous à ${emailLink} en précisant votre modèle et la nature du problème.`;
      else if (idx===2 || m.includes('connexion') || m.includes('wifi'))
        reply = `Pour un diagnostic, envoyez-nous un email à ${emailLink} en indiquant votre type d'installation.`;
      else if (idx===3 || m.includes('autre'))
        reply = `Décrivez votre problème à ${emailLink} — notre équipe technique vous prend en charge rapidement.`;
      setChatMessages(prev => [...prev, {sender:'bot', text:reply}]);
    }, 1200);
  };

  const handleBotMsg = e => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const msg = inputMsg;
    setChatMessages(prev => [...prev, {sender:'user', text:msg}]);
    setInputMsg('');
    botRespond(msg, -1);
  };

  const handleQuickBtn = (btn, idx) => {
    setChatMessages(prev => [...prev, {sender:'user', text:btn.msg}]);
    botRespond(btn.msg, idx);
  };

  const handleCallSubmit = async () => {
    if (!phone.trim()) return;
    setSending(true);
    setEmailError('');
    try {
      await emailjs.send(
        'service_2rm7vom',
        'template_wioslbr',
        {
          telephone: phone,
          message: description.trim() || "Aucune description fournie"
        },
        'MFZW0V06es17giiT8'
      );
      setMode('callConfirm');
    } catch(err) {
      const msg = err?.text || err?.message || JSON.stringify(err);
      setEmailError('Erreur lors de l\'envoi : ' + msg);
      console.error('EmailJS SAV error:', err);
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  const quickBtns = [
    {icon:'🔧', label:'Système défectueux', msg:'Mon système de sécurité ne fonctionne plus.'},
    {icon:'📷', label:'Caméra défectueuse', msg:"Ma caméra ne s'affiche plus ou l'image est floue."},
    {icon:'📡', label:'Perte de connexion', msg:'Mon alarme a perdu la connexion réseau.'},
    {icon:'🆘', label:'Autre problème', msg:"J'ai un autre problème technique à signaler."}
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm" onClick={reset}>
      <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl shadow-2xl overflow-hidden" style={{maxHeight:'95vh'}} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bg-black text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center">
              <ShieldIcon size={18} stroke="#fff"/>
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">Service Après-Vente</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-2 h-2 bg-green-400 rounded-full"/>
                <span className="text-xs text-gray-300">Disponible 24h/24 - 7j/7</span>
              </div>
            </div>
          </div>
          <button onClick={reset} className="text-gray-400 hover:text-white text-2xl leading-none">×</button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto" style={{maxHeight:'calc(95vh - 140px)'}}>

          {/* Menu */}
          {mode === 'menu' && (
            <div className="p-5">
              <p className="text-gray-600 text-sm mb-5">Comment souhaitez-vous être assisté ?</p>
              <div className="space-y-3">
                <button onClick={() => setMode('callForm')} className="w-full flex items-center gap-4 bg-red-600 hover:bg-black text-white px-5 py-4 rounded-2xl transition">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0"><PhoneIcon size={18}/></div>
                  <div className="text-left">
                    <p className="font-semibold text-sm">Appel immédiat</p>
                    <p className="text-xs opacity-75">Un technicien vous rappelle sous 2 min</p>
                  </div>
                </button>
                <button onClick={() => setMode('chatbot')} className="w-full flex items-center gap-4 border-2 border-gray-200 hover:border-black bg-white px-5 py-4 rounded-2xl transition">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0"><BotIcon size={18}/></div>
                  <div className="text-left">
                    <p className="font-semibold text-sm">Assistant IA (chat automatique)</p>
                    <p className="text-xs text-gray-500">Réponse instantanée, disponible 24/7</p>
                  </div>
                </button>
              </div>
              <div className="mt-5 p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 text-center">Toutes les demandes urgentes sont traitées en priorité.</p>
              </div>
            </div>
          )}

          {/* Formulaire rappel */}
          {mode === 'callForm' && (
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <button onClick={() => setMode('menu')} className="text-gray-400 hover:text-black text-lg">←</button>
                <h4 className="font-bold">Rappel immédiat</h4>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5">
                <p className="text-sm text-red-800 font-medium">Un technicien certifié vous rappelle sous 2 minutes</p>
                <p className="text-xs text-red-600 mt-1">Service disponible 7j/7 incluant jours fériés</p>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Votre numéro de téléphone *</label>
                  <input type="tel" placeholder="06 12 34 56 78" required value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full border-2 border-gray-200 focus:border-black rounded-xl px-4 py-3 outline-none text-sm"/>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Description rapide du problème (optionnel)</label>
                  <textarea placeholder="Ex: Mon alarme sonne en permanence..." rows="2" value={description} onChange={e => setDescription(e.target.value)}
                    className="w-full border-2 border-gray-200 focus:border-black rounded-xl px-4 py-3 outline-none text-sm resize-none"/>
                </div>
              </div>
              {emailError && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl mt-3">{emailError}</p>}
              <div className="flex gap-3 mt-5">
                <button onClick={handleCallSubmit} disabled={sending}
                  className={`flex-1 bg-red-600 hover:bg-black text-white py-3 rounded-xl font-semibold text-sm transition ${sending ? 'opacity-60 cursor-not-allowed' : ''}`}>
                  {sending ? "Envoi en cours..." : "Confirmer le rappel"}
                </button>
                <button onClick={() => setMode('menu')} className="border-2 border-gray-200 px-4 py-3 rounded-xl text-sm">Retour</button>
              </div>
            </div>
          )}

          {/* Confirmation rappel */}
          {mode === 'callConfirm' && (
            <div className="p-5">
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <p className="text-green-700 font-bold text-lg">Demande enregistrée !</p>
                <p className="text-gray-500 text-sm mt-2">Un technicien vous appelera au</p>
                <p className="font-bold text-lg mt-1">{phone}</p>
                <p className="text-gray-500 text-sm">dans moins de 2 minutes.</p>
                <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500">Restez disponible sur ce numéro. Si vous ne décrochez pas, nous essaierons 3 fois.</p>
                </div>
                <button onClick={reset} className="mt-5 bg-black text-white px-8 py-2.5 rounded-full text-sm">Fermer</button>
              </div>
            </div>
          )}

          {/* Chatbot */}
          {mode === 'chatbot' && (
            <div className="flex flex-col">
              <div className="px-4 pt-4 pb-2 space-y-3" style={{minHeight:'200px'}}>
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs sm:max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-red-600 text-white rounded-br-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'0ms'}}/>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}}/>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'300ms'}}/>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef}/>
              </div>
              {chatMessages.length <= 2 && (
                <div className="px-4 pb-3">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Sujets fréquents :</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickBtns.map((btn, i) => (
                      <button key={i} onClick={() => handleQuickBtn(btn, i)}
                        className="flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 text-gray-700 text-xs font-medium px-3 py-2.5 rounded-xl text-left transition">
                        <span style={{fontSize:'16px'}}>{btn.icon}</span>
                        <span>{btn.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="border-t px-4 py-3">
                <form onSubmit={handleBotMsg} className="flex gap-2">
                  <input type="text" placeholder="Écrivez votre question..." value={inputMsg} onChange={e => setInputMsg(e.target.value)}
                    className="flex-1 border-2 border-gray-200 focus:border-black rounded-full px-4 py-2 text-sm outline-none"/>
                  <button type="submit" className="bg-black hover:bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1={22} y1={2} x2={11} y2={13}/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                </form>
                <button onClick={() => setMode('menu')} className="mt-2 text-xs text-gray-400 hover:text-gray-700 underline w-full text-center">← Retour au menu SAV</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ===================== CHATBOT WIDGET =====================
const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{position:'fixed', bottom:28, right:28, zIndex:9999, display:'flex', flexDirection:'column', alignItems:'flex-end', gap:12}}>
      <SavModal isOpen={open} onClose={() => setOpen(false)}/>
      <button onClick={() => setOpen(o => !o)}
        style={{
          width:62, height:62, borderRadius:'50%',
          background:'linear-gradient(135deg,#DC2626,#991B1B)',
          border:'none', cursor:'pointer',
          boxShadow:'0 6px 24px rgba(220,38,38,0.45)',
          display:'flex', alignItems:'center', justifyContent:'center',
          position:'relative'
        }}>
        {open
          ? <CloseIcon size={26} className="text-white"/>
          : <ShieldIcon size={26} stroke="#fff"/>
        }
        {!open && (
          <span style={{
            position:'absolute', top:-3, right:-3,
            width:18, height:18, background:'#DC2626',
            borderRadius:'50%', border:'2px solid white',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:10, fontWeight:800, color:'white'
          }}>!</span>
        )}
      </button>
    </div>
  );
};

// ===================== FRANCE MAP =====================
const FranceMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const locations = [
    { lat:48.8566, lng:2.3522,  label:"Showroom Paris",     clients:"320 clients" },
    { lat:45.7640, lng:4.8357,  label:"Siège Lyon",         clients:"410 clients" },
    { lat:43.2965, lng:5.3698,  label:"Agence Marseille",   clients:"280 clients" },
    { lat:44.8378, lng:-0.5792, label:"Agence Bordeaux",    clients:"195 clients" },
    { lat:50.6292, lng:3.0573,  label:"Agence Lille",       clients:"210 clients" },
    { lat:43.6047, lng:1.4442,  label:"Agence Toulouse",    clients:"235 clients" },
    { lat:47.2184, lng:-1.5536, label:"Agence Nantes",      clients:"165 clients" },
    { lat:48.5734, lng:7.7521,  label:"Agence Strasbourg",  clients:"188 clients" },
  ];
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    const map = L.map(mapRef.current, {zoomControl:true, scrollWheelZoom:false}).setView([46.6, 2.3], 5);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution:'&copy; OSM &copy; CARTO', maxZoom:18
    }).addTo(map);
    locations.forEach(loc => {
      const icon = L.divIcon({
        className:'',
        html:`<div style="width:28px;height:28px;background:#DC2626;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 3px 14px rgba(220,38,38,0.55);position:relative;"><div style="width:9px;height:9px;background:white;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)rotate(45deg);"></div></div>`,
        iconSize:[28,28], iconAnchor:[14,28], popupAnchor:[0,-30]
      });
      L.marker([loc.lat, loc.lng], {icon}).addTo(map)
       .bindPopup(`<div style="font-family:'Orbitron',sans-serif;font-weight:800;font-size:12px;color:#111;">${loc.label}</div><div style="font-family:'Rajdhani',sans-serif;font-weight:600;font-size:12px;color:#DC2626;">${loc.clients}</div>`, {maxWidth:200});
    });
    mapInstance.current = map;
    return () => { if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; } };
  }, []);
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <h3 className="text-danger-500 font-tech font-bold tracking-widest text-sm mb-2">COUVERTURE NATIONALE</h3>
            <h2 className="text-4xl md:text-5xl font-tech font-black text-gray-900">PRÉSENTS DANS TOUTE <span className="text-danger-500">LA FRANCE</span></h2>
            <div className="w-24 h-0.5 bg-danger-500 mx-auto mt-3"></div>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
          <div className="md:col-span-2">
            <FadeIn>
              <div style={{borderRadius:20,overflow:'hidden',border:'2px solid #fecaca',boxShadow:'0 8px 32px rgba(220,38,38,0.08)',background:'white'}}>
                <div ref={mapRef} style={{height:420,width:'100%',borderRadius:16,zIndex:1}}/>
              </div>
              <p className="text-xs text-gray-400 font-body mt-3 text-center tracking-wider">📍 8 agences · Paris · Lyon · Marseille · Bordeaux · Lille · Toulouse · Nantes · Strasbourg</p>
            </FadeIn>
          </div>
          <div className="space-y-4">
            {[{v:"8",l:"Agences en France"},{v:"2 580+",l:"Clients protégés"},{v:"<2h",l:"Délai d'intervention max"}].map((s,i) => (
              <FadeIn key={i} delay={i*80}>
                <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl shadow-sm">
                  <div className="text-5xl font-tech font-black text-danger-500 mb-1">{s.v}</div>
                  <div className="font-tech font-bold text-gray-700 text-sm">{s.l}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ===================== NAVBAR =====================
const Navbar = ({setPage, currentPage}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [{id:'home',label:'ACCUEIL'},{id:'tech',label:'TECHNOLOGIE'},{id:'services',label:'SERVICES'},{id:'contact',label:'CONTACT'}];
  const handleNav = id => { setPage(id); setIsOpen(false); window.scrollTo(0,0); };
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);
  return (
    <nav className="fixed w-full z-[100] bg-white border-b border-gray-200 shadow-md">
      <div className="container mx-auto px-5 md:px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer z-[110]" onClick={() => handleNav('home')}>
          <EyeIcon className="text-danger-500" size={30}/>
          <span className="text-xl font-tech font-black tracking-tighter text-gray-900">ALARM<span className="text-danger-500">VISION</span></span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map(item => (
            <button key={item.id} onClick={() => handleNav(item.id)}
              className={`text-sm font-tech font-bold tracking-widest hover:text-danger-500 transition-colors ${currentPage===item.id?'text-danger-500':'text-gray-700'}`}>
              {item.label}
            </button>
          ))}
          <button onClick={() => handleNav('devis')} className="bg-danger-600 text-white px-5 py-2.5 font-tech font-bold text-xs tracking-wider hover:bg-danger-700 transition-all rounded-md shadow-md">
            DEVIS GRATUIT
          </button>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden z-[110] flex items-center justify-center bg-white border-2 border-gray-300 w-12 h-12 rounded-xl shadow-md">
          {isOpen ? <CloseIcon className="text-danger-600" size={28}/> : <MenuIcon className="text-gray-800" size={28}/>}
        </button>
        <div className={`fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-6 transition-all duration-300 ${isOpen?'translate-x-0 opacity-100':'translate-x-full opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col items-center gap-6 w-full max-w-sm">
            {navItems.map(item => (
              <button key={item.id} onClick={() => handleNav(item.id)}
                className={`text-4xl font-tech font-black tracking-wider py-3 w-full text-center border-b-2 transition ${currentPage===item.id?'text-danger-600 border-danger-600':'text-gray-900 border-transparent'}`}>
                {item.label}
              </button>
            ))}
            <button onClick={() => handleNav('devis')} className="w-full bg-danger-600 text-white py-5 font-tech font-bold text-xl rounded-xl shadow-lg mt-6">DEVIS GRATUIT</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// ===================== PAGE HOME =====================
const PageHome = ({setPage}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const companies = [
    {name:"TechGuard",logo:"🛡️",sector:"Sécurité IT"},{name:"SecureHome",logo:"🏠",sector:"Domotique"},
    {name:"BankSafe",logo:"🏦",sector:"Banque"},{name:"LogiTrack",logo:"🚚",sector:"Logistique"},
    {name:"MediProtect",logo:"🏥",sector:"Santé"},{name:"RetailSec",logo:"🛍️",sector:"Grande distribution"},
    {name:"CitySurv",logo:"🏙️",sector:"Collectivités"},{name:"DataLock",logo:"🔒",sector:"Data center"},
    {name:"EduSafe",logo:"🎓",sector:"Éducation"},{name:"HotelShield",logo:"🏨",sector:"Hôtellerie"},
    {name:"IndusGuard",logo:"🏭",sector:"Industrie"},{name:"SmartOffice",logo:"💼",sector:"Bureaux"}
  ];
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisibleCount(2);
      else if (window.innerWidth < 768) setVisibleCount(3);
      else setVisibleCount(5);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const maxIndex = Math.max(0, companies.length - visibleCount);
  return (
    <div>
      {/* HERO */}
      <header className="relative overflow-hidden" style={{minHeight:"100vh",display:"flex",alignItems:"stretch"}}>
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" className="w-full h-full object-cover" alt="Securite IA"/>
          <div className="absolute inset-0" style={{background:"linear-gradient(96deg,rgba(255,255,255,0.97) 0%,rgba(255,255,255,0.96) 49%,rgba(8,10,16,0.83) 49%,rgba(4,5,10,0.92) 100%)"}}/>
        </div>
        <div className="relative z-10 w-full mx-auto px-6 md:px-14 pt-28 pb-16 md:pt-36 md:pb-20"
          style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0",alignItems:"center",maxWidth:1400}}>
          <div style={{paddingRight:"clamp(0px,6vw,80px)"}}>
            <div className="mb-5">
              <span style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(220,38,38,0.08)",border:"1px solid rgba(220,38,38,0.25)",borderRadius:100,padding:"4px 12px",fontSize:11,fontFamily:"Orbitron,sans-serif",fontWeight:700,color:"#DC2626",letterSpacing:"0.08em",textTransform:"uppercase"}}>
                <span style={{width:7,height:7,borderRadius:"50%",background:"#DC2626",display:"inline-block"}}/>
                Surveillance active 24h/24 — 7j/7
              </span>
            </div>
            <h1 className="font-tech font-black text-gray-900 mb-5 tracking-tight" style={{fontSize:"clamp(2rem,4vw,4rem)",lineHeight:1.06}}>
              Protégez votre<br/><span className="text-danger-500">maison &amp; entreprise</span><br/>par l'IA — 24h/24
            </h1>
            <p className="text-gray-600 font-body font-medium mb-8 leading-relaxed" style={{fontSize:"clamp(0.95rem,1.5vw,1.18rem)",maxWidth:460}}>
              Alarm Vision détecte les intrusions <strong className="text-gray-800">avant qu'elles n'arrivent</strong>. Analyse comportementale IA, zéro fausse alerte, intervention sous 2h en France entière.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["2 580+ clients protégés","99% intrusions avortées","Certifié NF & A2P"].map(b => (
                <span key={b} style={{display:"inline-flex",alignItems:"center",gap:6,background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:100,padding:"5px 12px",fontSize:12,fontFamily:"Rajdhani,sans-serif",fontWeight:600,color:"#374151"}}>
                  <span style={{width:7,height:7,borderRadius:"50%",background:"#22c55e",display:"inline-block"}}/>
                  {b}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 mb-10">
              <div style={{width:34,height:34,borderRadius:"50%",background:"#f0fdf4",border:"1.5px solid #86efac",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <CheckIcon size={15} className="text-green-600"/>
              </div>
              <p className="text-gray-500 font-body text-sm"><strong className="text-gray-700">Devis gratuit sous 48h</strong> · Sans engagement · Installation incluse</p>
            </div>
            <button onClick={() => setPage('tech')} className="font-tech font-bold text-sm text-gray-400 hover:text-danger-500 transition-colors flex items-center gap-2">
              <span style={{fontSize:17}}>→</span> Découvrir la technologie IA
            </button>
          </div>
          <div className="flex flex-col items-center justify-center" style={{paddingLeft:"clamp(0px,4vw,60px)"}}>
            <span className="font-tech font-bold text-white text-xs tracking-[0.28em] uppercase mb-5 opacity-75">La sécurité nouvelle génération</span>
            <EyeIcon size={118} className="text-danger-500 mb-4" style={{filter:"drop-shadow(0 0 20px rgba(220,38,38,0.6))"}}/>
            <button onClick={() => setPage('devis')} className="font-tech font-black text-white rounded-2xl w-full mb-3"
              style={{background:"linear-gradient(135deg,#DC2626 0%,#991B1B 100%)",padding:"20px 44px",fontSize:"clamp(0.9rem,1.4vw,1.1rem)",letterSpacing:"0.07em",maxWidth:340,boxShadow:"0 6px 20px rgba(220,38,38,0.38)",border:"none",cursor:"pointer"}}>
              DEVIS GRATUIT SOUS 48H
            </button>
            <p style={{color:"rgba(255,255,255,0.5)",fontSize:11,fontFamily:"Rajdhani,sans-serif",textAlign:"center",marginBottom:22,maxWidth:270}}>
              ✓ Rappel sous 2h · ✓ Sans engagement · ✓ Étude gratuite
            </p>
            <div style={{width:280,height:1,background:"rgba(255,255,255,0.1)",marginBottom:22}}/>
            <a href="tel:0800123456" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.16)",borderRadius:14,padding:"13px 28px",width:"100%",maxWidth:340,textDecoration:"none"}}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.76a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <div>
                <div className="font-tech font-black text-white" style={{fontSize:15,lineHeight:1.1}}>0800 123 456</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",fontFamily:"Rajdhani,sans-serif"}}>Urgence 24h/24 — Appel gratuit</div>
              </div>
            </a>
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <ShieldAlert size={42} className="text-danger-500 mx-auto mb-3"/>
              <h2 className="text-4xl font-tech font-bold text-gray-900">LA MENACE EST RÉELLE</h2>
              <div className="w-24 h-0.5 bg-danger-500 mx-auto mt-3"></div>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[{label:"Un cambriolage toutes les",val:"90s",src:"Ministère de l'Intérieur 2024"},{label:"Entreprises volées déposent bilan sous 2 ans",val:"80%",src:"Observatoire de la Sécurité"},{label:"Temps moyen d'une intrusion réussie",val:"14s",src:"Étude Européenne"}].map((item,idx) => (
              <FadeIn key={idx} delay={idx*100}>
                <div className="bg-white border-2 border-danger-200 p-8 text-center rounded-2xl shadow-md">
                  <div className="text-sm text-gray-700 uppercase tracking-wider font-body font-bold mb-3">{item.label}</div>
                  <div className="text-6xl font-tech font-black text-danger-500 mb-2">{item.val}</div>
                  <p className="text-xs text-gray-400 mt-3 font-body">{item.src}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* RÉSULTATS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <h3 className="text-danger-500 font-tech font-bold tracking-widest text-sm mb-2">L'EFFET ALARM VISION</h3>
              <h2 className="text-5xl font-tech font-black text-gray-900">RÉSULTATS <span className="text-danger-500">PROUVÉS</span></h2>
              <div className="w-20 h-0.5 bg-danger-500 mx-auto mt-4"></div>
            </FadeIn>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[{stat:"99%",title:"Tentatives d'Intrusion Avortées",desc:"L'IA détecte comportements suspects avant l'effraction."},{stat:"<10s",title:"Temps de Réaction IA",desc:"Alerte sonore + notification + télésurveillance simultanées."},{stat:"24/7",title:"Surveillance Continue",desc:"Centres certifiés NF & A2P."},{stat:"0",title:"Fausses Alertes",desc:"Reconnaissance humaine/animal, zéro déclenchement intempestif."}].map((item,i) => (
              <FadeIn key={i} delay={i*120}>
                <div className="bg-white border border-gray-200 p-8 rounded-2xl hover:border-danger-300 transition-all shadow-sm">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-danger-50 flex items-center justify-center border border-danger-200">
                      <span className="text-2xl font-tech font-black text-danger-500">{item.stat}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-tech font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600 font-body leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <FranceMap/>

      {/* CLIENTS CARROUSEL */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-10">
              <h3 className="text-danger-500 font-tech font-bold tracking-widest text-sm mb-2">PARTENAIRES & CLIENTS</h3>
              <h2 className="text-4xl md:text-5xl font-tech font-black text-gray-900">ILS NOUS FONT <span className="text-danger-500">DÉJÀ CONFIANCE</span></h2>
              <div className="w-24 h-0.5 bg-danger-500 mx-auto mt-3"></div>
            </div>
          </FadeIn>
          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-out gap-6 md:gap-8"
                style={{transform:`translateX(-${currentIndex*(100/visibleCount)}%)`}}>
                {companies.map((company,idx) => (
                  <div key={idx} className="flex-shrink-0 bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center hover:shadow-lg hover:border-danger-300 transition-all"
                    style={{width:`calc(${100/visibleCount}% - 24px)`}}>
                    <div className="w-20 h-20 mb-3 flex items-center justify-center bg-gray-50 rounded-full border border-gray-100 text-4xl">{company.logo}</div>
                    <p className="font-tech font-bold text-gray-800 text-center text-sm">{company.name}</p>
                    <p className="text-xs text-gray-400 font-body">{company.sector}</p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => setCurrentIndex(p => Math.max(0,p-1))} disabled={currentIndex===0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-10 h-10 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center hover:bg-danger-50 transition ${currentIndex===0?"opacity-40 cursor-not-allowed":""}`}>❮</button>
            <button onClick={() => setCurrentIndex(p => Math.min(maxIndex,p+1))} disabled={currentIndex>=maxIndex}
              className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-10 h-10 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center hover:bg-danger-50 transition ${currentIndex>=maxIndex?"opacity-40 cursor-not-allowed":""}`}>❯</button>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <FadeIn>
            <h3 className="text-2xl font-tech font-bold text-gray-800 mb-8">CERTIFICATIONS & CONFORMITÉ</h3>
            <div className="flex flex-wrap justify-center gap-10">
              {["NF","A2P","CE","RGPD"].map(badge => (
                <div key={badge} className="w-24 h-24 bg-gray-50 border-2 border-danger-200 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-tech font-black text-danger-500">{badge}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

// ===================== PAGE TECH =====================
const PageTech = () => (
  <div className="pt-32 pb-20 bg-white">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <FadeIn>
          <h2 className="text-danger-500 font-tech font-bold tracking-widest text-sm mb-2">Intelligence Artificielle</h2>
          <h3 className="text-5xl font-tech font-black text-gray-900">LA TECHNOLOGIE QUI VOUS PROTÈGE</h3>
          <div className="w-24 h-0.5 bg-danger-500 mx-auto mt-3"></div>
        </FadeIn>
      </div>
      {[
        {title:"Reconnaissance Faciale Avancée",img:"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",points:["128 points biométriques","Détection de masques","Base locale RGPD"],desc:"Analyse instantanée des visages autorisés, alerte immédiate si présence inconnue."},
        {title:"Analyse Comportementale",img:"https://images.unsplash.com/photo-1563906267088-b029e7101114?auto=format&fit=crop&w=800&q=80",points:["Zones paramétrables","Détection de rôdeur","Analyse nocturne"],desc:"Détecte les mouvements suspects, les tentatives de repérage avant intrusion."},
        {title:"Distinction Humain / Animal",img:"https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=800&q=80",points:["Classification multi","Immunité météo","Filtrage intelligent"],desc:"Fini les fausses alertes : différenciation chirurgicale humain / animal / véhicule."}
      ].map((tech,idx) => (
        <div key={idx} className="mb-20">
          <FadeIn delay={idx*100}>
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="rounded-2xl overflow-hidden border-2 border-danger-100 shadow-lg">
                <img src={tech.img} alt={tech.title} className="w-full h-80 object-cover"/>
              </div>
              <div>
                <h4 className="text-3xl font-tech font-black text-gray-900 mb-4"><span className="text-danger-500">0{idx+1}.</span> {tech.title}</h4>
                <p className="text-gray-600 font-body text-lg mb-6">{tech.desc}</p>
                <ul className="space-y-3">
                  {tech.points.map((pt,i) => (
                    <li key={i} className="flex items-center gap-3"><CheckIcon className="text-danger-500" size={18}/><span className="text-gray-700 font-body font-medium">{pt}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      ))}
    </div>
  </div>
);

// ===================== PAGE SERVICES =====================
const PageServices = ({setPage}) => (
  <div className="pt-32 pb-20 bg-gray-50">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <FadeIn>
          <h2 className="text-danger-500 font-tech font-bold tracking-widest text-sm mb-4">NOS SERVICES</h2>
          <h3 className="text-5xl font-tech font-black text-gray-900">SÉCURITÉ SUR-MESURE</h3>
          <div className="w-24 h-0.5 bg-danger-500 mx-auto mt-2"></div>
        </FadeIn>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {[
          {icon:Camera,title:"Vidéo surveillance",desc:"Caméras 4K, vision nocturne thermique, analyse IA en temps réel.",price:"À partir de 1 490€"},
          {icon:Lock,title:"Contrôle d'accès",desc:"Lecteurs biométriques, badges RFID anti-clonage, gestion par plages horaires.",price:"Sur devis"},
          {icon:ClipboardCheck,title:"Audit sécurité",desc:"Diagnostic complet, analyse des vulnérabilités, mise en conformité.",price:"Dès 390€"},
          {icon:BellRing,title:"Alarme intrusion",desc:"Centrale anti-brouillage, détecteurs volumétriques, sirène 120dB.",price:"À partir de 890€"}
        ].map((service,idx) => (
          <FadeIn key={idx} delay={idx*100}>
            <div className="bg-white border-2 border-gray-200 p-8 rounded-2xl hover:border-danger-400 transition-all group hover:shadow-xl">
              <service.icon className="text-danger-500 mb-4" size={44}/>
              <h3 className="text-2xl font-tech font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 font-body mb-6">{service.desc}</p>
              <div className="text-sm font-tech font-bold text-gray-500 uppercase">{service.price}</div>
            </div>
          </FadeIn>
        ))}
      </div>
      <div className="mt-16 text-center">
        <button onClick={() => setPage('devis')} className="bg-danger-600 text-white px-10 py-4 font-tech font-bold rounded-xl shadow-md hover:bg-danger-700 transition">DEVIS GRATUIT SOUS 48H</button>
      </div>
    </div>
  </div>
);

// ===================== PAGE CONTACT =====================
const PageContact = () => {
  const [status, setStatus] = useState('idle');
  const handleSubmit = e => {
    e.preventDefault(); setStatus('loading');
    setTimeout(() => { setStatus('success'); e.target.reset(); setTimeout(() => setStatus('idle'), 4000); }, 600);
  };
  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-5xl font-tech font-black text-gray-900">NOUS CONTACTER</h2>
            <div className="w-24 h-0.5 bg-danger-500 mx-auto my-4"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-tech font-bold text-gray-800 mb-4">Informations</h3>
              <ul className="space-y-4 text-gray-600 font-body">
                <li>📍 123 avenue de la Sécurité, 69000 Lyon</li>
                <li>📞 04 82 53 12 34</li>
                <li>✉️ contact@alarmvision.fr</li>
                <li>⏰ Lun - Ven : 9h - 19h | Sam sur RDV</li>
              </ul>
              <div className="mt-8">
                <h4 className="font-tech font-bold text-gray-800 mb-2">Service urgence 24h/24 7j/7</h4>
                <p className="text-danger-600 font-tech font-black text-xl">0800 123 456</p>
              </div>
            </div>
            <div>
              {status === 'success' ? (
                <div className="bg-green-50 p-6 rounded-2xl text-center"><CheckIcon className="mx-auto text-green-600 mb-2" size={40}/><p className="font-body">Message envoyé ! Nous vous répondrons sous 4h.</p></div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" placeholder="Nom" className="w-full border border-gray-300 p-3 rounded-xl font-body" required/>
                  <input type="text" placeholder="Prénom" className="w-full border border-gray-300 p-3 rounded-xl font-body" required/>
                  <input type="email" placeholder="Email" className="w-full border border-gray-300 p-3 rounded-xl font-body" required/>
                  <textarea rows="4" placeholder="Votre message" className="w-full border border-gray-300 p-3 rounded-xl font-body" required></textarea>
                  <button type="submit" className="bg-danger-600 text-white w-full py-3 font-tech font-bold rounded-xl hover:bg-danger-700 transition">ENVOYER</button>
                </form>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

// ===================== PAGE DEVIS =====================
const PageDevis = () => {
  const [status, setStatus] = useState('idle');
  const [clientType, setClientType] = useState('particulier');
  const handleSubmit = e => {
    e.preventDefault(); setStatus('loading');
    setTimeout(() => { setStatus('success'); e.target.reset(); setTimeout(() => setStatus('idle'), 4000); }, 600);
  };
  return (
    <div className="pt-32 pb-20 bg-white flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <FadeIn>
            <EyeIcon size={52} className="text-danger-500 mx-auto mb-4"/>
            <h2 className="text-5xl font-tech font-black text-gray-900">DEVIS GRATUIT SOUS 48H</h2>
            <div className="w-24 h-0.5 bg-danger-500 mx-auto my-4"></div>
            <p className="text-gray-600 font-body text-lg">Réponse rapide, étude personnalisée sans engagement.</p>
          </FadeIn>
        </div>
        {status === 'success' ? (
          <div className="bg-green-50 text-green-700 p-8 rounded-2xl text-center"><CheckIcon size={44} className="mx-auto mb-3"/><h3 className="text-2xl font-tech font-bold">DEMANDE ENVOYÉE</h3><p>Un expert vous recontacte sous 48h.</p></div>
        ) : (
          <div className="bg-white border border-gray-200 p-8 md:p-10 rounded-2xl shadow-xl">
            <div className="mb-6 flex gap-4">
              <button type="button" onClick={() => setClientType('particulier')} className={`flex-1 py-3 font-tech font-bold border-2 rounded-xl transition ${clientType==='particulier'?'border-danger-500 bg-danger-50 text-danger-600':'border-gray-200 text-gray-500'}`}>PARTICULIER</button>
              <button type="button" onClick={() => setClientType('entreprise')} className={`flex-1 py-3 font-tech font-bold border-2 rounded-xl transition ${clientType==='entreprise'?'border-danger-500 bg-danger-50 text-danger-600':'border-gray-200 text-gray-500'}`}>ENTREPRISE</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {clientType==='entreprise' && <input type="text" placeholder="Raison Sociale" className="w-full border border-gray-300 p-4 rounded-xl font-body" required/>}
              <div className="grid md:grid-cols-2 gap-5">
                <input type="text" placeholder="Nom" required className="border p-4 rounded-xl"/>
                <input type="text" placeholder="Prénom" required className="border p-4 rounded-xl"/>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <input type="email" placeholder="Email" required className="border p-4 rounded-xl"/>
                <input type="tel" placeholder="Téléphone" required className="border p-4 rounded-xl"/>
              </div>
              <select className="w-full border p-4 rounded-xl bg-white">
                <option>Vidéo surveillance</option><option>Contrôle d'accès</option><option>Audit sécurité</option><option>Alarme intrusion</option><option>Solution complète</option>
              </select>
              <textarea rows="4" placeholder="Détails de votre projet" className="w-full border p-4 rounded-xl" required></textarea>
              <button disabled={status==='loading'} className="w-full bg-danger-600 text-white py-5 font-tech font-bold text-lg rounded-xl shadow-md hover:bg-danger-700 transition disabled:opacity-60">
                {status==='loading'?'ENVOI...':'DEMANDER MON DEVIS GRATUIT'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// ===================== PAGE LÉGAL =====================
const PageLegal = () => (
  <div className="pt-32 pb-20 bg-white">
    <div className="container mx-auto px-6 max-w-4xl">
      <FadeIn>
        <h1 className="text-4xl font-tech font-black text-gray-900 mb-6">Mentions légales</h1>
        <div className="font-body text-gray-700 space-y-4 mb-12">
          <p><strong>Alarm Vision</strong> – SAS au capital de 50 000€ – RCS Lyon 852 123 456</p>
          <p>Siège social : 123 avenue de la Sécurité, 69000 Lyon</p>
          <p>Directeur de publication : Marc Delacroix</p>
          <p>Hébergement : OVH Cloud, 2 rue Kellermann, 59100 Roubaix</p>
          <p>CNIL déclaration n° 2123456 – Conformité RGPD.</p>
          <p>Photos non contractuelles – © 2026 Alarm Vision Tous droits réservés.</p>
        </div>
      </FadeIn>
    </div>
  </div>
);

// ===================== APP =====================
function App() {
  const [page, setPage] = useState('home');
  useEffect(() => { window.scrollTo(0,0); }, [page]);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar setPage={setPage} currentPage={page}/>
      <main className="flex-grow">
        {page === 'home'     && <PageHome setPage={setPage}/>}
        {page === 'tech'     && <PageTech/>}
        {page === 'services' && <PageServices setPage={setPage}/>}
        {page === 'contact'  && <PageContact/>}
        {page === 'devis'    && <PageDevis/>}
        {page === 'legal'    && <PageLegal/>}
      </main>
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center gap-6 mb-4 text-sm font-body text-gray-500">
            <button onClick={() => setPage('legal')} className="hover:text-danger-500 transition">Mentions légales</button>
            <button onClick={() => setPage('contact')} className="hover:text-danger-500 transition">Contact</button>
          </div>
          <div className="flex justify-center gap-2 mb-1 opacity-70">
            <EyeIcon size={24} className="text-danger-500"/>
            <span className="font-tech font-black text-gray-800">ALARM<span className="text-danger-500">VISION</span></span>
          </div>
          <div className="text-danger-600 font-tech font-bold text-xs tracking-widest mb-2 uppercase">La sécurité nouvelle génération</div>
          <p className="text-gray-400 text-xs font-body font-bold uppercase tracking-widest">© 2026 Alarm Vision · Sécurité IA · Devis gratuit sous 48h</p>
        </div>
      </footer>
      <ChatbotWidget/>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
