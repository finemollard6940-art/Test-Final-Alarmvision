<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Alarm Vision - Sécurité Intelligente par IA</title>
<script src="https://cdn.tailwindcss.com"></script>
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<!-- Leaflet -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<script>
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
  }
</script>

<style>
  body {
    background-color: #ffffff;
    color: #111827;
    font-family: 'Rajdhani', sans-serif;
    overflow-x: hidden;
  }
  .glow-red-light { box-shadow: 0 8px 25px rgba(220, 38, 38, 0.12); }
  .menu-overlay { transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out; }
  .burger-btn:active { transform: scale(0.96); }
  .mobile-nav-item {
    transition: all 0.2s ease;
    border-bottom: 2px solid transparent;
  }
  .mobile-nav-item:hover { color: #DC2626; border-bottom-color: #DC2626; }
  .mobile-menu-container {
    background-color: #ffffff !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    opacity: 1 !important;
  }

  /* ---- CHATBOT ---- */
  .chatbot-widget {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
  }
  .chatbot-btn {
    width: 62px;
    height: 62px;
    border-radius: 50%;
    background: linear-gradient(135deg, #DC2626, #991B1B);
    border: none;
    cursor: pointer;
    box-shadow: 0 6px 24px rgba(220,38,38,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
  }
  .chatbot-btn:hover { transform: scale(1.07); box-shadow: 0 8px 32px rgba(220,38,38,0.55); }
  .chatbot-btn-pulse::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px solid rgba(220,38,38,0.4);
    animation: pulse-ring 2s ease-out infinite;
  }
  @keyframes pulse-ring {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(1.5); opacity: 0; }
  }
  .chatbot-window {
    width: 360px;
    max-height: 520px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 16px 60px rgba(0,0,0,0.18);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    animation: slideUp 0.25s ease;
    border: 1px solid #f0f0f0;
  }
  @media (max-width: 480px) {
    .chatbot-window { width: calc(100vw - 24px); }
    .chatbot-widget { right: 12px; bottom: 12px; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .chatbot-header {
    background: linear-gradient(135deg, #DC2626, #991B1B);
    padding: 16px 18px;
    color: white;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .chatbot-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #fafafa;
  }
  .msg-bot {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px 12px 12px 2px;
    padding: 10px 14px;
    font-size: 14px;
    max-width: 85%;
    align-self: flex-start;
    color: #111;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 500;
    line-height: 1.4;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  }
  .msg-user {
    background: linear-gradient(135deg, #DC2626, #B91C1C);
    color: white;
    border-radius: 12px 12px 2px 12px;
    padding: 10px 14px;
    font-size: 14px;
    max-width: 85%;
    align-self: flex-end;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
  }
  .chatbot-choices {
    padding: 10px 16px 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: #fafafa;
    border-top: 1px solid #f0f0f0;
  }
  .choice-btn {
    background: #fff;
    border: 1.5px solid #DC2626;
    color: #DC2626;
    padding: 9px 14px;
    border-radius: 10px;
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    text-align: left;
    transition: all 0.15s;
    letter-spacing: 0.05em;
  }
  .choice-btn:hover { background: #DC2626; color: white; }
  .choice-action {
    background: #DC2626;
    color: white;
    padding: 11px 14px;
    border-radius: 10px;
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: 800;
    cursor: pointer;
    text-align: center;
    transition: all 0.15s;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-decoration: none;
  }
  .choice-action:hover { background: #991B1B; }
  .choice-action-alt {
    background: #fff;
    color: #111;
    border: 1.5px solid #d1d5db;
    padding: 11px 14px;
    border-radius: 10px;
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    text-align: center;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-decoration: none;
  }
  .choice-action-alt:hover { background: #f3f4f6; }
  .typing-indicator { display: flex; gap: 4px; align-items: center; padding: 8px 10px; }
  .typing-indicator span {
    width: 7px; height: 7px; background: #ccc; border-radius: 50%;
    animation: bounce-dot 1.2s ease infinite;
  }
  .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
  .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes bounce-dot {
    0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
    40% { transform: scale(1); opacity: 1; }
  }

  /* ---- FRANCE MAP LEAFLET ---- */
  .leaflet-map-container {
    height: 420px;
    width: 100%;
    border-radius: 16px;
    z-index: 1;
  }
  .leaflet-container { border-radius: 16px; }
  .leaflet-popup-content-wrapper {
    font-family: 'Orbitron', sans-serif !important;
    font-size: 11px !important;
    font-weight: 700;
    border-radius: 10px !important;
    border: 1px solid rgba(220,38,38,0.3);
    box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important;
  }
  .leaflet-popup-content { margin: 10px 14px !important; color: #111; }
  .leaflet-popup-tip { background: white !important; }
  .av-marker-icon {
    width: 32px; height: 32px;
    background: #DC2626;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    border: 3px solid white;
    box-shadow: 0 3px 12px rgba(220,38,38,0.5);
  }
  .av-marker-inner {
    width: 10px; height: 10px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }

  /* ---- HERO SPLIT LAYOUT ---- */
  .hero-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    min-height: 100vh;
    align-items: center;
  }
  @media (max-width: 900px) {
    .hero-split { grid-template-columns: 1fr; min-height: auto; }
    .hero-right { order: -1; }
  }

  /* Eye → CTA guidance animation sequence */
  /* 1. Eye pulses and "looks right" */
  @keyframes eye-look-right {
    0%   { filter: drop-shadow(0 0 8px rgba(220,38,38,0.4)); transform: translateX(0) scale(1); }
    30%  { filter: drop-shadow(6px 0 18px rgba(220,38,38,0.9)); transform: translateX(6px) scale(1.06); }
    60%  { filter: drop-shadow(12px 0 28px rgba(220,38,38,0.7)); transform: translateX(8px) scale(1.04); }
    100% { filter: drop-shadow(0 0 10px rgba(220,38,38,0.5)); transform: translateX(0) scale(1); }
  }
  /* 2. Arrow beam travelling right */
  @keyframes beam-travel {
    0%   { opacity: 0; transform: scaleX(0) translateX(-30px); }
    20%  { opacity: 1; transform: scaleX(0.4) translateX(0); }
    70%  { opacity: 1; transform: scaleX(1) translateX(0); }
    100% { opacity: 0; transform: scaleX(1) translateX(10px); }
  }
  /* 3. CTA button flash / pulse on attention */
  @keyframes cta-flash {
    0%   { box-shadow: 0 6px 20px rgba(220,38,38,0.35); transform: scale(1); }
    50%  { box-shadow: 0 0 0 10px rgba(220,38,38,0.18), 0 10px 40px rgba(220,38,38,0.6); transform: scale(1.04); }
    100% { box-shadow: 0 6px 20px rgba(220,38,38,0.35); transform: scale(1); }
  }

  .eye-animated {
    animation: eye-look-right 3.2s ease-in-out infinite;
    transform-origin: center;
    display: block;
  }

  /* Beam line between eye and CTA */
  .gaze-beam {
    position: absolute;
    top: 50%;
    left: calc(50% + 30px);
    right: -40px;
    height: 2px;
    background: linear-gradient(90deg, rgba(220,38,38,0.7), rgba(220,38,38,0));
    transform-origin: left center;
    pointer-events: none;
    animation: beam-travel 3.2s ease-in-out infinite;
  }

  .cta-primary-hero {
    animation: cta-flash 3.2s ease-in-out infinite;
    animation-delay: 1.6s;
  }
  .cta-primary-hero:hover {
    animation: none;
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 12px 40px rgba(220,38,38,0.55) !important;
  }

  /* Proof badges */
  .proof-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 100px;
    padding: 5px 12px;
    font-size: 12px;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    color: #374151;
  }
  .proof-badge .dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; }

  /* Urgency ribbon */
  .urgency-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(220,38,38,0.08);
    border: 1px solid rgba(220,38,38,0.25);
    border-radius: 100px;
    padding: 4px 12px;
    font-size: 11px;
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    color: #DC2626;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* eye glow animation (navbar logo) */
  @keyframes eye-pulse {
    0%, 100% { filter: drop-shadow(0 0 8px rgba(220,38,38,0.5)); }
    50% { filter: drop-shadow(0 0 24px rgba(220,38,38,0.9)); }
  }

  /* badge notification */
  .notif-badge {
    position: absolute;
    top: -3px; right: -3px;
    width: 18px; height: 18px;
    background: #DC2626;
    border-radius: 50%;
    border: 2px solid white;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 800; color: white;
    animation: notif-bounce 1s ease infinite alternate;
  }
  @keyframes notif-bounce {
    from { transform: scale(0.9); }
    to { transform: scale(1.1); }
  }
</style>
</head>
<body>
<div id="root"></div>

<script type="text/babel">
const { useState, useEffect, useRef } = React;

// --- ICÔNES ---
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
    <path d="M18 8c0-3.3-2.7-6-6-6"/>
    <path d="M18 8c0-3.3-2.7-6-6-6" transform="rotate(180 12 8)"/>
  </svg>
);

// Composant animation au scroll
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
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {children}
    </div>
  );
};

// ===================== CHATBOT SAV =====================
/* ── SAV MODAL AVEC ENVOI EMAIL ── */
const SavModal = ({isOpen,onClose}) => {
  const [mode,setMode] = useState('menu');
  const [phone,setPhone] = useState('');
  const [description,setDescription] = useState('');
  const [chatPhone,setChatPhone] = useState('');
  const [urgent,setUrgent] = useState(false);
  const [chatMessages,setChatMessages] = useState([{sender:'bot',text:"Bonjour ! Je suis l'assistant Alarm Vision. Comment puis-je vous aider aujourd'hui ?"}]);
  const [inputMsg,setInputMsg] = useState('');
  const [isTyping,setIsTyping] = useState(false);
  const [sending,setSending] = useState(false);
  const [emailError,setEmailError] = useState('');
  const chatEndRef = useRef(null);

  const reset = () => {
    setMode('menu'); setPhone(''); setDescription(''); setChatPhone(''); setUrgent(false);
    setChatMessages([{sender:'bot',text:"Bonjour ! Je suis l'assistant Alarm Vision. Comment puis-je vous aider aujourd'hui ?"}]);
    setInputMsg(''); setEmailError(''); setSending(false);
    onClose();
  };

  useEffect(()=>{ if(chatEndRef.current) chatEndRef.current.scrollIntoView({behavior:'smooth'}); },[chatMessages,isTyping]);

  const botRespond = (userMsg,idx) => {
    setIsTyping(true);
    setTimeout(()=>{
      setIsTyping(false);
      const emailLink = "contact@alarmvision.fr";
      let reply = `Je transmets votre demande à notre équipe. Pour toute assistance, écrivez-nous directement à ${emailLink} — notre équipe vous répond sous 24h.`;
      const m = userMsg.toLowerCase();
      if(idx===0 || m.includes('systeme') || m.includes('centrale') || m.includes('defectueux') || m.includes('fonctionne'))
        reply = `Je comprends votre problème. Pour qu'un technicien traite votre demande rapidement, contactez-nous par email à ${emailLink} en décrivant votre situation. Nous vous répondons sous 24h et pouvons planifier une intervention sur site.`;
      else if(idx===1 || m.includes('camera') || m.includes('image') || m.includes('floue') || m.includes('noire'))
        reply = `Problème caméra identifié. Écrivez-nous à ${emailLink} en précisant votre modèle de caméra et la nature du problème (image floue, noire, déconnectée...). Un technicien spécialisé vous recontactera rapidement.`;
      else if(idx===2 || m.includes('connexion') || m.includes('application') || m.includes('wifi') || m.includes('reseau'))
        reply = `Perte de connexion détectée. Pour un diagnostic précis, envoyez-nous un email à ${emailLink} en indiquant votre type d'installation et votre opérateur internet. Nous trouverons une solution avec vous.`;
      else if(idx===3 || m.includes('autre') || m.includes('probleme'))
        reply = `Pas de souci ! Décrivez votre problème par email à ${emailLink} — soyez aussi précis que possible (référence équipement, symptômes observés). Notre équipe technique vous prend en charge rapidement.`;
      else if(m.includes('prix') || m.includes('tarif') || m.includes('cout'))
        reply = `Pour un devis personnalisé, contactez-nous à ${emailLink}. Notre audit sécurité démarre à partir de 150 € dans le Rhône. Réponse sous 24h, sans engagement.`;
      else if(m.includes('garantie'))
        reply = `Tous nos équipements bénéficient d'une garantie légale. Pour toute question relative à votre garantie, écrivez-nous à ${emailLink} avec votre numéro de contrat.`;
      else if(m.includes('installation') || m.includes('delai'))
        reply = `L'installation est réalisée par nos techniciens certifiés. Pour planifier une intervention ou obtenir des informations sur les délais, contactez-nous à ${emailLink}.`;
      setChatMessages(prev=>[...prev,{sender:'bot',text:reply}]);
    },1200);
  };

  const handleBotMsg = e => {
    e.preventDefault();
    if(!inputMsg.trim()) return;
    const msg = inputMsg;
    setChatMessages(prev=>[...prev,{sender:'user',text:msg}]);
    setInputMsg('');
    botRespond(msg,-1);
  };

  const handleQuickBtn = (btn,idx) => {
    setChatMessages(prev=>[...prev,{sender:'user',text:btn.msg}]);
    botRespond(btn.msg,idx);
  };

  // Nouvelle fonction d'envoi d'email pour le rappel
  const handleCallSubmit = async () => {
    if(!phone.trim()) return;
    setSending(true);
    setEmailError('');
    try {
      await emailjs.send(
        'service_2rm7vom',          // votre Service ID (identique à contact/devis)
        'template_wioslbr',         // NOUVEAU TEMPLATE pour SAV
        {
          telephone: phone,
          message: description.trim() || "Aucune description fournie"
        },
        'MFZW0V06es17giiT8'         // votre Public Key
      );
      // Succès : on passe en mode confirmation
      setMode('callConfirm');
    } catch(err) {
      const msg = err?.text || err?.message || JSON.stringify(err);
      setEmailError('Erreur lors de l’envoi : ' + msg);
      console.error('EmailJS SAV error:', err);
    } finally {
      setSending(false);
    }
  };

  if(!isOpen) return null;

  const quickBtns = [
    {icon:'🔧',label:'Système défectueux',msg:'Mon système de sécurité ne fonctionne plus.'},
    {icon:'📷',label:'Caméra défectueuse',msg:"Ma caméra ne s'affiche plus ou l'image est floue."},
    {icon:'📡',label:'Perte de connexion',msg:'Mon alarme a perdu la connexion réseau.'},
    {icon:'🆘',label:'Autre problème',msg:'J\'ai un autre problème technique à signaler.'}
  ];

  return h('div',{className:"fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm",onClick:reset},
    h('div',{className:"bg-white w-full sm:max-w-lg sm:rounded-2xl shadow-2xl overflow-hidden",style:{maxHeight:'95vh'},onClick:e=>e.stopPropagation()},
      h('div',{className:"bg-black text-white px-5 py-4 flex items-center justify-between"},
        h('div',{className:"flex items-center gap-3"},
          h('div',{className:"w-9 h-9 bg-red-600 rounded-full flex items-center justify-center"},
            h(ShieldIcon,{size:18,stroke:'#fff'})),
          h('div',null,
            h('p',{className:"font-bold text-sm leading-tight"},"Service Après-Vente"),
            h('div',{className:"flex items-center gap-1.5 mt-0.5"},
              h('div',{className:"w-2 h-2 bg-green-400 rounded-full pulse-dot"}),
              h('span',{className:"text-xs text-gray-300"},"Disponible 24h/24 - 7j/7")))),
        h('button',{onClick:reset,className:"text-gray-400 hover:text-white text-2xl leading-none"},"×")),
      h('div',{className:"overflow-y-auto",style:{maxHeight:'calc(95vh - 140px)'}},
        mode==='menu' && h('div',{className:"p-5"},
          h('p',{className:"text-gray-600 text-sm mb-5"},"Comment souhaitez-vous être assisté ?"),
          h('div',{className:"space-y-3"},
            h('button',{onClick:()=>setMode('callForm'),className:"w-full flex items-center gap-4 bg-red-600 hover:bg-black text-white px-5 py-4 rounded-2xl transition group"},
              h('div',{className:"w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0"},h(PhoneIcon,{size:18})),
              h('div',{className:"text-left"},
                h('p',{className:"font-semibold text-sm"},"Appel immédiat"),
                h('p',{className:"text-xs opacity-75"},"Un technicien vous rappelle sous 2 min"))),
            h('button',{onClick:()=>setMode('chatbot'),className:"w-full flex items-center gap-4 border-2 border-gray-200 hover:border-black bg-white px-5 py-4 rounded-2xl transition"},
              h('div',{className:"w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0"},h(BotIcon,{size:18})),
              h('div',{className:"text-left"},
                h('p',{className:"font-semibold text-sm"},"Assistant IA (chat automatique)"),
                h('p',{className:"text-xs text-gray-500"},"Réponse instantanée, disponible 24/7")))),
          h('div',{className:"mt-5 p-4 bg-gray-50 rounded-xl"},
            h('p',{className:"text-xs text-gray-500 text-center"},"Toutes les demandes urgentes sont traitées en priorité. Satisfaction garantie."))),

        mode==='callForm' && h('div',{className:"p-5"},
          h('div',{className:"flex items-center gap-3 mb-4"},
            h('button',{onClick:()=>setMode('menu'),className:"text-gray-400 hover:text-black text-lg"},"←"),
            h('h4',{className:"font-bold"},"Rappel immédiat")),
          h('div',{className:"bg-red-50 border border-red-200 rounded-xl p-4 mb-5"},
            h('p',{className:"text-sm text-red-800 font-medium"},"Un technicien certifié vous rappelle sous 2 minutes"),
            h('p',{className:"text-xs text-red-600 mt-1"},"Service disponible 7j/7 incluant jours fériés")),
          h('div',{className:"space-y-3"},
            h('div',null,
              h('label',{className:"text-xs font-medium text-gray-700 mb-1 block"},"Votre numéro de téléphone *"),
              h('input',{type:"tel",placeholder:"06 12 34 56 78",required:true,value:phone,onChange:e=>setPhone(e.target.value),className:"w-full border-2 border-gray-200 focus:border-black rounded-xl px-4 py-3 outline-none text-sm"})),
            h('div',null,
              h('label',{className:"text-xs font-medium text-gray-700 mb-1 block"},"Description rapide du problème (optionnel)"),
              h('textarea',{placeholder:"Ex: Mon alarme sonne en permanence...",rows:"2",value:description,onChange:e=>setDescription(e.target.value),className:"w-full border-2 border-gray-200 focus:border-black rounded-xl px-4 py-3 outline-none text-sm resize-none"}))),
          emailError && h('p',{className:"text-sm text-red-600 bg-red-50 p-3 rounded-xl mt-3"},emailError),
          h('div',{className:"flex gap-3 mt-5"},
            h('button',{onClick:handleCallSubmit,disabled:sending,className:`flex-1 bg-red-600 hover:bg-black text-white py-3 rounded-xl font-semibold text-sm transition ${sending?'opacity-60 cursor-not-allowed':''}`},
              sending ? "Envoi en cours..." : "Confirmer le rappel"),
            h('button',{onClick:()=>setMode('menu'),className:"border-2 border-gray-200 px-4 py-3 rounded-xl text-sm"},"Retour"))),

        mode==='callConfirm' && h('div',{className:"p-5"},
          h('div',{className:"text-center py-6"},
            h('div',{className:"w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"},
              h('svg',{xmlns:"http://www.w3.org/2000/svg",width:32,height:32,viewBox:"0 0 24 24",fill:"none",stroke:"#16a34a",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"},h('polyline',{points:"20 6 9 17 4 12"}))),
            h('p',{className:"text-green-700 font-bold text-lg"},"Demande enregistrée !"),
            h('p',{className:"text-gray-500 text-sm mt-2"},"Un technicien vous appelera au"),
            h('p',{className:"font-bold text-lg mt-1"},phone),
            h('p',{className:"text-gray-500 text-sm"},"dans moins de 2 minutes."),
            h('div',{className:"mt-4 p-3 bg-gray-50 rounded-xl"},
              h('p',{className:"text-xs text-gray-500"},"Restez disponible sur ce numéro. Si vous ne décrochez pas, nous essaierons 3 fois.")),
            h('button',{onClick:reset,className:"mt-5 bg-black text-white px-8 py-2.5 rounded-full text-sm"},"Fermer"))),

        mode==='chatbot' && h('div',{className:"flex flex-col"},
          h('div',{className:"px-4 pt-4 pb-2 space-y-3",style:{minHeight:'200px'}},
            chatMessages.map((msg,i)=>h('div',{key:i,className:`flex ${msg.sender==='user'?'justify-end':'justify-start'}`},
              h('div',{className:`max-w-xs sm:max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.sender==='user'?'bg-red-600 text-white rounded-br-sm':'bg-gray-100 text-gray-800 rounded-bl-sm'}`},msg.text))),
            isTyping && h('div',{className:"flex justify-start"},
              h('div',{className:"bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm"},
                h('div',{className:"typing"},h('span'),h('span'),h('span')))),
            h('div',{ref:chatEndRef})),
          chatMessages.length <= 2 && h('div',{className:"px-4 pb-3"},
            h('p',{className:"text-xs text-gray-400 font-medium uppercase tracking-wide mb-2"},"Sujets fréquents :"),
            h('div',{className:"grid grid-cols-2 gap-2"},
              quickBtns.map((btn,i)=>h('button',{key:i,onClick:()=>handleQuickBtn(btn,i),className:"flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 text-gray-700 text-xs font-medium px-3 py-2.5 rounded-xl text-left transition"},
                h('span',{style:{fontSize:'16px'}},btn.icon),h('span',null,btn.label))))),
          h('div',{className:"border-t px-4 py-3"},
            h('form',{onSubmit:handleBotMsg,className:"flex gap-2"},
              h('input',{type:"text",placeholder:"Écrivez votre question...",value:inputMsg,onChange:e=>setInputMsg(e.target.value),className:"flex-1 border-2 border-gray-200 focus:border-black rounded-full px-4 py-2 text-sm outline-none"}),
              h('button',{type:"submit",className:"bg-black hover:bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition"},
                h('svg',{xmlns:"http://www.w3.org/2000/svg",width:16,height:16,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},h('line',{x1:22,y1:2,x2:11,y2:13}),h('polygon',{points:"22 2 15 22 11 13 2 9 22 2"})))),
            h('button',{onClick:()=>setMode('menu'),className:"mt-2 text-xs text-gray-400 hover:text-gray-700 underline w-full text-center"},"← Retour au menu SAV")))
      )
    )
  );
};
// ===================== FRANCE MAP — Leaflet =====================
const FranceMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  const locations = [
    { lat: 48.8566, lng: 2.3522,  name: "Paris",     label: "Showroom Paris",     clients: "320 clients" },
    { lat: 45.7640, lng: 4.8357,  name: "Lyon",      label: "Siège Lyon",         clients: "410 clients" },
    { lat: 43.2965, lng: 5.3698,  name: "Marseille", label: "Agence Marseille",   clients: "280 clients" },
    { lat: 44.8378, lng: -0.5792, name: "Bordeaux",  label: "Agence Bordeaux",    clients: "195 clients" },
    { lat: 50.6292, lng: 3.0573,  name: "Lille",     label: "Agence Lille",       clients: "210 clients" },
    { lat: 43.6047, lng: 1.4442,  name: "Toulouse",  label: "Agence Toulouse",    clients: "235 clients" },
    { lat: 47.2184, lng: -1.5536, name: "Nantes",    label: "Agence Nantes",      clients: "165 clients" },
    { lat: 48.5734, lng: 7.7521,  name: "Strasbourg",label: "Agence Strasbourg",  clients: "188 clients" },
  ];

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Init map
    const map = L.map(mapRef.current, { zoomControl: true, scrollWheelZoom: false })
                 .setView([46.6, 2.3], 5);

    // Tiles CartoDB light — cohérent avec le thème blanc du site
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 18
    }).addTo(map);

    // Custom markers rouges cohérents avec le design
    locations.forEach(loc => {
      const icon = L.divIcon({
        className: '',
        html: `<div style="
          width:28px;height:28px;
          background:#DC2626;
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          border:3px solid white;
          box-shadow:0 3px 14px rgba(220,38,38,0.55);
          position:relative;
        "><div style="
          width:9px;height:9px;
          background:white;border-radius:50%;
          position:absolute;top:50%;left:50%;
          transform:translate(-50%,-50%)rotate(45deg);
        "></div></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -30]
      });

      L.marker([loc.lat, loc.lng], { icon })
       .addTo(map)
       .bindPopup(`
         <div style="font-family:'Orbitron',sans-serif;font-weight:800;font-size:12px;color:#111;margin-bottom:2px;">${loc.label}</div>
         <div style="font-family:'Rajdhani',sans-serif;font-weight:600;font-size:12px;color:#DC2626;">${loc.clients}</div>
       `, { maxWidth: 200 });
    });

    mapInstance.current = map;

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <h3 className="text-danger-500 font-tech font-bold tracking-widest text-sm mb-2">COUVERTURE NATIONALE</h3>
            <h2 className="text-4xl md:text-5xl font-tech font-black text-gray-900">
              PRÉSENTS DANS TOUTE <span className="text-danger-500">LA FRANCE</span>
            </h2>
            <div className="w-24 h-0.5 bg-danger-500 mx-auto mt-3"></div>
            <p className="text-gray-600 font-body text-lg mt-4 max-w-xl mx-auto">
              Cliquez sur un marqueur pour découvrir notre agence locale.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
          {/* Carte Leaflet — 2/3 */}
          <div className="md:col-span-2">
            <FadeIn>
              <div style={{
                borderRadius: 20,
                overflow: 'hidden',
                border: '2px solid #fecaca',
                boxShadow: '0 8px 32px rgba(220,38,38,0.08)',
                background: 'white'
              }}>
                <div ref={mapRef} className="leaflet-map-container" />
              </div>
              <p className="text-xs text-gray-400 font-body mt-3 text-center tracking-wider">
                📍 8 agences · Paris · Lyon · Marseille · Bordeaux · Lille · Toulouse · Nantes · Strasbourg
              </p>
            </FadeIn>
          </div>

          {/* Stats — 1/3 */}
          <div className="space-y-4">
            <FadeIn delay={100}>
              <div className="bg-white border-2 border-danger-200 p-6 rounded-2xl shadow-sm">
                <div className="text-5xl font-tech font-black text-danger-500 mb-1">8</div>
                <div className="font-tech font-bold text-gray-700 text-sm">Agences en France</div>
              </div>
            </FadeIn>
            <FadeIn delay={160}>
              <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl shadow-sm">
                <div className="text-5xl font-tech font-black text-danger-500 mb-1">2 580+</div>
                <div className="font-tech font-bold text-gray-700 text-sm">Clients protégés</div>
              </div>
            </FadeIn>
            <FadeIn delay={220}>
              <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl shadow-sm">
                <div className="text-5xl font-tech font-black text-danger-500 mb-1">&lt;2h</div>
                <div className="font-tech font-bold text-gray-700 text-sm">Délai d'intervention max</div>
              </div>
            </FadeIn>
            <FadeIn delay={280}>
              <div className="bg-danger-600 text-white p-5 rounded-2xl flex items-center gap-3 shadow-md">
                <div style={{fontSize:22}}>📍</div>
                <div>
                  <div className="font-tech font-bold text-xs mb-1">Zone non couverte ?</div>
                  <div className="font-body text-xs opacity-80">Contactez-nous, nous étudions votre secteur.</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- NAVBAR ----------
const Navbar = ({ setPage, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { id: 'home', label: 'ACCUEIL' },
    { id: 'tech', label: 'TECHNOLOGIE' },
    { id: 'services', label: 'SERVICES' },
    { id: 'contact', label: 'CONTACT' },
  ];
  const handleNav = (id) => { setPage(id); setIsOpen(false); window.scrollTo(0, 0); };
  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; document.body.style.position = 'fixed'; document.body.style.width = '100%'; }
    else { document.body.style.overflow = 'auto'; document.body.style.position = ''; document.body.style.width = ''; }
    return () => { document.body.style.overflow = 'auto'; document.body.style.position = ''; };
  }, [isOpen]);

  return (
    <nav className="fixed w-full z-[100] bg-white border-b border-gray-200 shadow-md" style={{backgroundColor:'#FFFFFF',backdropFilter:'none'}}>
      <div className="container mx-auto px-5 md:px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer z-[110]" onClick={() => handleNav('home')}>
          <EyeIcon className="text-danger-500" size={30} />
          <span className="text-xl font-tech font-black tracking-tighter text-gray-900">ALARM<span className="text-danger-500">VISION</span></span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map(item => (
            <button key={item.id} onClick={() => handleNav(item.id)} className={`text-sm font-tech font-bold tracking-widest hover:text-danger-500 transition-colors ${currentPage === item.id ? 'text-danger-500' : 'text-gray-700'}`}>
              {item.label}
            </button>
          ))}
          <button onClick={() => handleNav('devis')} className="bg-danger-600 text-white px-5 py-2.5 font-tech font-bold text-xs tracking-wider hover:bg-danger-700 transition-all rounded-md shadow-md">
            DEVIS GRATUIT
          </button>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden z-[110] flex items-center justify-center bg-white border-2 border-gray-300 w-12 h-12 rounded-xl shadow-md active:scale-95 transition-all duration-200 burger-btn" aria-label="Menu" style={{backgroundColor:'#FFFFFF'}}>
          {isOpen ? <CloseIcon className="text-danger-600" size={28} /> : <MenuIcon className="text-gray-800" size={28} />}
        </button>
        <div className={`fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-6 menu-overlay mobile-menu-container ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`} style={{backgroundColor:'#FFFFFF',backdropFilter:'none',WebkitBackdropFilter:'none'}}>
          <div className="flex flex-col items-center gap-6 w-full max-w-sm">
            {navItems.map(item => (
              <button key={item.id} onClick={() => handleNav(item.id)} className={`mobile-nav-item text-4xl font-tech font-black tracking-wider py-3 w-full text-center ${currentPage === item.id ? 'text-danger-600 border-b-2 border-danger-600' : 'text-gray-900'}`}>{item.label}</button>
            ))}
            <button onClick={() => handleNav('devis')} className="w-full bg-danger-600 text-white py-5 font-tech font-bold text-xl rounded-xl shadow-lg mt-6 active:scale-95 transition-transform">DEVIS GRATUIT</button>
          </div>
          <div className="absolute bottom-10 text-center text-gray-500 text-sm font-body font-bold uppercase tracking-[0.2em]">Protection IA Haute Précision</div>
        </div>
      </div>
    </nav>
  );
};

// ---------- PAGE ACCUEIL ----------
const PageHome = ({ setPage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const companies = [
    { name: "TechGuard", logo: "🛡️", sector: "Sécurité IT" },
    { name: "SecureHome", logo: "🏠", sector: "Domotique" },
    { name: "BankSafe", logo: "🏦", sector: "Banque" },
    { name: "LogiTrack", logo: "🚚", sector: "Logistique" },
    { name: "MediProtect", logo: "🏥", sector: "Santé" },
    { name: "RetailSec", logo: "🛍️", sector: "Grande distribution" },
    { name: "CitySurv", logo: "🏙️", sector: "Collectivités" },
    { name: "DataLock", logo: "🔒", sector: "Data center" },
    { name: "EduSafe", logo: "🎓", sector: "Éducation" },
    { name: "HotelShield", logo: "🏨", sector: "Hôtellerie" },
    { name: "IndusGuard", logo: "🏭", sector: "Industrie" },
    { name: "SmartOffice", logo: "💼", sector: "Bureaux" },
    { name: "TransportSec", logo: "🚆", sector: "Transport" },
    { name: "EventSafe", logo: "🎪", sector: "Événementiel" },
    { name: "EcoSecure", logo: "🌿", sector: "Énergie" }
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
  const prevSlide = () => setCurrentIndex(p => Math.max(0, p - 1));
  const nextSlide = () => setCurrentIndex(p => Math.min(maxIndex, p + 1));

  return (
    <div>
      {/* ===================== HERO — SPLIT LAYOUT ===================== */}
      <header className="relative overflow-hidden" style={{minHeight:"100vh",display:"flex",alignItems:"stretch"}}>
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" className="w-full h-full object-cover" alt="Securite IA"/>
          {/* Left: white / Right: dark */}
          <div className="absolute inset-0" style={{background:"linear-gradient(96deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.96) 49%, rgba(8,10,16,0.83) 49%, rgba(4,5,10,0.92) 100%)"}}/>
        </div>

        {/* Two-column grid */}
        <div className="relative z-10 w-full mx-auto px-6 md:px-14 pt-28 pb-16 md:pt-36 md:pb-20"
             style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0",alignItems:"center",maxWidth:1400}}>

          {/* ===== GAUCHE — Texte + Typical Route ===== */}
          <div style={{paddingRight:"clamp(0px, 6vw, 80px)", paddingTop:16, paddingBottom:16}}>

            {/* Tag urgence (signal live) */}
            <div className="mb-5">
              <span className="urgency-tag">
                <span style={{width:7,height:7,borderRadius:"50%",background:"#DC2626",display:"inline-block",animation:"eye-pulse 1.5s ease-in-out infinite"}}/>
                Surveillance active 24h/24 — 7j/7
              </span>
            </div>

            {/* H1 : Quoi / Pour qui / Bénéfice */}
            <h1 className="font-tech font-black text-gray-900 mb-5 tracking-tight"
                style={{fontSize:"clamp(2rem, 4vw, 4rem)", lineHeight:1.06}}>
              Protégez votre<br/>
              <span className="text-danger-500">maison &amp; entreprise</span><br/>
              par l'IA — 24h/24
            </h1>

            {/* Sous-phrase descriptive */}
            <p className="text-gray-600 font-body font-medium mb-8 leading-relaxed"
               style={{fontSize:"clamp(0.95rem, 1.5vw, 1.18rem)", maxWidth:460}}>
              Alarm Vision détecte les intrusions{" "}
              <strong className="text-gray-800">avant qu'elles n'arrivent</strong>.
              Analyse comportementale IA, zéro fausse alerte,
              intervention sous 2h en France entière.
            </p>

            {/* Preuve sociale — Typical Route */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="proof-badge"><span className="dot"/>2 580+ clients protégés</span>
              <span className="proof-badge"><span className="dot"/>99% intrusions avortées</span>
              <span className="proof-badge"><span className="dot"/>Certifié NF &amp; A2P</span>
            </div>

            {/* Réassurance financière */}
            <div className="flex items-center gap-3 mb-10">
              <div style={{width:34,height:34,borderRadius:"50%",background:"#f0fdf4",border:"1.5px solid #86efac",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <CheckIcon size={15} className="text-green-600"/>
              </div>
              <p className="text-gray-500 font-body text-sm">
                <strong className="text-gray-700">Devis gratuit sous 48h</strong> · Sans engagement · Installation incluse
              </p>
            </div>

            {/* Lien Typical Route secondaire */}
            <button onClick={() => setPage('tech')} className="font-tech font-bold text-sm text-gray-400 hover:text-danger-500 transition-colors flex items-center gap-2">
              <span style={{fontSize:17}}>→</span> Découvrir la technologie IA
            </button>
          </div>

          {/* ===== DROITE — CTA Golden Route ===== */}
          <div className="flex flex-col items-center justify-center" style={{paddingLeft:"clamp(0px, 4vw, 60px)"}}>

            {/* Slogan */}
            <span className="font-tech font-bold text-white text-xs tracking-[0.28em] uppercase mb-5 opacity-75">
              La sécurité nouvelle génération
            </span>

            {/* Œil animé qui guide le regard VERS le CTA (vers le bas) */}
            <div style={{position:"relative",display:"inline-flex",flexDirection:"column",alignItems:"center",marginBottom:8}}>
              <EyeIcon size={118} className="text-danger-500 eye-animated"/>
              {/* Beam vertical œil → bouton */}
              <div style={{
                width:2, height:36,
                background:"linear-gradient(180deg,rgba(220,38,38,0.75) 0%,rgba(220,38,38,0) 100%)",
                marginTop:4,
                animation:"beam-travel 3.2s ease-in-out infinite"
              }}/>
            </div>

            {/* CTA principal — Golden Route, friction zéro */}
            <button
              onClick={() => setPage('devis')}
              className="cta-primary-hero font-tech font-black text-white rounded-2xl transition-all"
              style={{
                background:"linear-gradient(135deg,#DC2626 0%,#991B1B 100%)",
                padding:"20px 44px",
                fontSize:"clamp(0.9rem,1.4vw,1.1rem)",
                letterSpacing:"0.07em",
                width:"100%",
                maxWidth:340,
                boxShadow:"0 6px 20px rgba(220,38,38,0.38)",
                border:"none",
                cursor:"pointer",
                marginBottom:10
              }}
            >
              DEVIS GRATUIT SOUS 48H
            </button>

            {/* Micro-réassurance */}
            <p style={{color:"rgba(255,255,255,0.5)",fontSize:11,fontFamily:"Rajdhani,sans-serif",textAlign:"center",marginBottom:22,maxWidth:270}}>
              ✓ Rappel sous 2h · ✓ Sans engagement · ✓ Étude gratuite
            </p>

            {/* Diviseur */}
            <div style={{width:280,height:1,background:"rgba(255,255,255,0.1)",marginBottom:22}}/>

            {/* Urgence téléphone — second CTA */}
            <a href="tel:0800123456" style={{
              display:"flex",alignItems:"center",justifyContent:"center",gap:12,
              background:"rgba(255,255,255,0.06)",
              border:"1px solid rgba(255,255,255,0.16)",
              borderRadius:14,
              padding:"13px 28px",
              width:"100%",
              maxWidth:340,
              textDecoration:"none",
              transition:"background 0.18s",
              cursor:"pointer"
            }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.12)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.76a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <div>
                <div className="font-tech font-black text-white" style={{fontSize:15,lineHeight:1.1}}>0800 123 456</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",fontFamily:"Rajdhani,sans-serif"}}>Urgence 24h/24 — Appel gratuit</div>
              </div>
            </a>
          </div>
        </div>

        {/* Mobile responsive override */}
        <style>{`
          @media (max-width: 880px) {
            .hero-responsive-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </header>

      {/* STATISTIQUES */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <ShieldAlert size={42} className="text-danger-500 mx-auto mb-3" />
              <h2 className="text-4xl font-tech font-bold text-gray-900">LA MENACE EST RÉELLE</h2>
              <div className="w-24 h-0.5 bg-danger-500 mx-auto mt-3"></div>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { label: "Un cambriolage toutes les", val: "90s", src: "Ministère de l'Intérieur 2024" },
              { label: "Proportion des entreprises volées déposent bilan sous 2 ans", val: "80%", src: "Observatoire de la Sécurité" },
              { label: "Temps moyen d'une intrusion réussie", val: "14s", src: "Étude Européenne" }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx*100}>
                <div className="bg-white border-2 border-danger-200 p-8 text-center rounded-2xl shadow-md hover:shadow-danger-500/10 hover:border-danger-400 transition-all">
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
            {[
              { stat: "99%", title: "Tentatives d'Intrusion Avortées", desc: "L'IA détecte comportements suspects avant l'effraction. Dissuasion record." },
              { stat: "<10s", title: "Temps de Réaction IA", desc: "Alerte sonore + notification + télésurveillance simultanées." },
              { stat: "24/7", title: "Surveillance Continue", desc: "Centres certifiés NF & A2P." },
              { stat: "0", title: "Fausses Alertes", desc: "Reconnaissance humaine/animal, zéro déclenchement intempestif." }
            ].map((item, i) => (
              <FadeIn key={i} delay={i*120}>
                <div className="bg-white border border-gray-200 p-8 rounded-2xl hover:border-danger-300 transition-all shadow-sm hover:shadow-md">
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

      {/* CARTE FRANCE INTERACTIVE — sur la page d'accueil */}
      <FranceMap />

      {/* PARTENARIAT */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-50 to-white border-2 border-danger-200 rounded-2xl p-8 text-center shadow-md">
              <h3 className="text-2xl font-tech font-bold text-gray-800 mb-2">🤝 Devenir partenaire</h3>
              <p className="text-gray-600 font-body mb-4">Intégrez nos solutions de sécurité IA dans votre offre. Formations, support technique et remises partenaires.</p>
              <button onClick={() => window.location.href = 'mailto:partenariat@alarmvision.fr'} className="bg-danger-600 text-white px-6 py-2 font-tech font-bold rounded-lg hover:bg-danger-700 transition">Nous contacter</button>
            </div>
          </FadeIn>
        </div>
      </section>

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
              <div className="flex transition-transform duration-500 ease-out gap-6 md:gap-8" style={{transform:`translateX(-${currentIndex*(100/visibleCount)}%)`}}>
                {companies.map((company, idx) => (
                  <div key={idx} className="flex-shrink-0 w-[calc(50%-12px)] sm:w-[calc(33.333%-16px)] md:w-[calc(20%-20px)] bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center hover:shadow-lg hover:border-danger-300 transition-all">
                    <div className="w-20 h-20 mb-3 flex items-center justify-center bg-gray-50 rounded-full border border-gray-100 text-4xl">{company.logo}</div>
                    <p className="font-tech font-bold text-gray-800 text-center text-sm">{company.name}</p>
                    <p className="text-xs text-gray-400 font-body">{company.sector}</p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={prevSlide} className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 w-10 h-10 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center hover:bg-danger-50 hover:border-danger-400 transition-all ${currentIndex===0?"opacity-40 cursor-not-allowed":""}`} disabled={currentIndex===0}>❮</button>
            <button onClick={nextSlide} className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 w-10 h-10 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center hover:bg-danger-50 hover:border-danger-400 transition-all ${currentIndex>=maxIndex?"opacity-40 cursor-not-allowed":""}`} disabled={currentIndex>=maxIndex}>❯</button>
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

// ---------- TECHNOLOGIE IA ----------
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
        { title: "Reconnaissance Faciale Avancée", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", points: ["128 points biométriques","Détection de masques","Base locale RGPD"], desc: "Analyse instantanée des visages autorisés, alerte immédiate si présence inconnue." },
        { title: "Analyse Comportementale", img: "https://images.unsplash.com/photo-1563906267088-b029e7101114?auto=format&fit=crop&w=800&q=80", points: ["Zones paramétrables","Détection de rôdeur","Analyse nocturne"], desc: "Détecte les mouvements suspects, les tentatives de repérage avant intrusion." },
        { title: "Distinction Humain / Animal", img: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=800&q=80", points: ["Classification multi","Immunité météo","Filtrage intelligent"], desc: "Fini les fausses alertes : différenciation chirurgicale humain / animal / véhicule." }
      ].map((tech, idx) => (
        <div key={idx} className={`mb-20 ${idx%2===1?'md:flex-row-reverse':''}`}>
          <FadeIn delay={idx*100}>
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="rounded-2xl overflow-hidden border-2 border-danger-100 shadow-lg">
                <img src={tech.img} alt={tech.title} className="w-full h-80 object-cover" />
              </div>
              <div>
                <h4 className="text-3xl font-tech font-black text-gray-900 mb-4"><span className="text-danger-500">0{idx+1}.</span> {tech.title}</h4>
                <p className="text-gray-600 font-body text-lg mb-6">{tech.desc}</p>
                <ul className="space-y-3">
                  {tech.points.map((pt, i) => (
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

// ---------- SERVICES ----------
const PageServices = ({ setPage }) => (
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
          { icon: Camera, title: "Vidéo surveillance", desc: "Caméras 4K, vision nocturne thermique, analyse IA en temps réel. Accès mobile et stockage cloud sécurisé.", price: "À partir de 1 490€" },
          { icon: Lock, title: "Contrôle d'accès", desc: "Lecteurs biométriques, badges RFID anti-clonage, gestion par plages horaires et traçabilité complète.", price: "Sur devis" },
          { icon: ClipboardCheck, title: "Audit sécurité", desc: "Diagnostic complet de vos installations, analyse des vulnérabilités, préconisations et mise en conformité.", price: "Dès 390€" },
          { icon: BellRing, title: "Alarme intrusion", desc: "Centrale anti-brouillage, détecteurs volumétriques, sirène 120dB, notification immédiate et télésurveillance.", price: "À partir de 890€" }
        ].map((service, idx) => (
          <FadeIn key={idx} delay={idx*100}>
            <div className="bg-white border-2 border-gray-200 p-8 rounded-2xl hover:border-danger-400 transition-all group hover:shadow-xl">
              <service.icon className="text-danger-500 mb-4 group-hover:scale-105 transition" size={44} />
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

// ---------- PAGE CONTACT (sans carte) ----------
const PageContact = () => {
  const [status, setStatus] = useState('idle');
  const handleSubmit = (e) => {
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
                  <input type="text" placeholder="Nom" className="w-full border border-gray-300 p-3 rounded-xl font-body" required />
                  <input type="text" placeholder="Prénom" className="w-full border border-gray-300 p-3 rounded-xl font-body" required />
                  <input type="email" placeholder="Email" className="w-full border border-gray-300 p-3 rounded-xl font-body" required />
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

// ---------- PAGE DEVIS ----------
const PageDevis = () => {
  const [status, setStatus] = useState('idle');
  const [clientType, setClientType] = useState('particulier');
  const handleSubmit = (e) => {
    e.preventDefault(); setStatus('loading');
    setTimeout(() => { setStatus('success'); e.target.reset(); setTimeout(() => setStatus('idle'), 4000); }, 600);
  };
  return (
    <div className="pt-32 pb-20 bg-white flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <FadeIn>
            <EyeIcon size={52} className="text-danger-500 mx-auto mb-4" />
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
              <input type="hidden" name="client_type" value={clientType} />
              {clientType==='entreprise' && <input type="text" name="company" placeholder="Raison Sociale" className="w-full border border-gray-300 p-4 rounded-xl font-body" required />}
              <div className="grid md:grid-cols-2 gap-5">
                <input type="text" name="name" placeholder="Nom" required className="border p-4 rounded-xl" />
                <input type="text" name="firstname" placeholder="Prénom" required className="border p-4 rounded-xl" />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <input type="email" name="email" placeholder="Email" required className="border p-4 rounded-xl" />
                <input type="tel" name="phone" placeholder="Téléphone" required className="border p-4 rounded-xl" />
              </div>
              <select name="service" className="w-full border p-4 rounded-xl bg-white">
                <option>Vidéo surveillance</option><option>Contrôle d'accès</option><option>Audit sécurité</option><option>Alarme intrusion</option><option>Solution complète</option>
              </select>
              {clientType==='entreprise' && <input type="text" name="sector" placeholder="Secteur d'activité" className="border p-4 rounded-xl" />}
              <textarea name="message" rows="4" placeholder="Détails de votre projet" className="w-full border p-4 rounded-xl" required></textarea>
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

// ---------- PAGE MENTIONS LÉGALES ----------
const PageLegal = () => {
  const [status, setStatus] = useState('idle');
  const handleSubmit = (e) => {
    e.preventDefault(); setStatus('loading');
    setTimeout(() => { setStatus('success'); e.target.reset(); setTimeout(() => setStatus('idle'), 4000); }, 600);
  };
  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <FadeIn>
          <h1 className="text-4xl font-tech font-black text-gray-900 mb-6">Mentions légales</h1>
          <div className="prose prose-gray font-body text-gray-700 space-y-4 mb-12">
            <p><strong>Alarm Vision</strong> – SAS au capital de 50 000€ – RCS Lyon 852 123 456</p>
            <p>Siège social : 123 avenue de la Sécurité, 69000 Lyon</p>
            <p>Directeur de publication : Marc Delacroix</p>
            <p>Hébergement : OVH Cloud, 2 rue Kellermann, 59100 Roubaix</p>
            <p>CNIL déclaration n° 2123456 – Conformité RGPD.</p>
            <p>Photos non contractuelles – © 2026 Alarm Vision Tous droits réservés.</p>
          </div>
          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-3xl font-tech font-black text-gray-900 mb-6">Contact & assistance</h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                  <h3 className="font-tech font-bold text-xl text-danger-600 mb-3">🚨 Service urgence 24h/24 - 7j/7</h3>
                  <p className="text-gray-700 font-body mb-2">Assistance prioritaire, intervention rapide.</p>
                  <p className="text-2xl font-tech font-black text-gray-900">0800 123 456</p>
                  <p className="text-xs text-gray-500 mt-2">Appel gratuit, disponible 24h/24</p>
                </div>
              </div>
              <div>
                {status === 'success' ? (
                  <div className="bg-green-50 p-6 rounded-2xl text-center"><CheckIcon className="mx-auto text-green-600 mb-2" size={40}/><p className="font-body">Message envoyé !</p></div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 bg-white p-2">
                    <h3 className="font-tech font-bold text-gray-800 text-lg">Envoyez-nous un message</h3>
                    <input type="text" placeholder="Nom" className="w-full border border-gray-300 p-3 rounded-xl font-body" required />
                    <input type="text" placeholder="Prénom" className="w-full border border-gray-300 p-3 rounded-xl font-body" required />
                    <input type="email" placeholder="Email" className="w-full border border-gray-300 p-3 rounded-xl font-body" required />
                    <textarea rows="3" placeholder="Votre message" className="w-full border border-gray-300 p-3 rounded-xl font-body" required></textarea>
                    <button type="submit" className="bg-danger-600 text-white w-full py-3 font-tech font-bold rounded-xl hover:bg-danger-700 transition">ENVOYER</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

// ---------- APP PRINCIPALE ----------
function App() {
  const [page, setPage] = useState('home');
  useEffect(() => { window.scrollTo(0, 0); }, [page]);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar setPage={setPage} currentPage={page} />
      <main className="flex-grow">
        {page === 'home' && <PageHome setPage={setPage} />}
        {page === 'tech' && <PageTech />}
        {page === 'services' && <PageServices setPage={setPage} />}
        {page === 'contact' && <PageContact />}
        {page === 'devis' && <PageDevis />}
        {page === 'legal' && <PageLegal />}
      </main>
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center gap-6 mb-4 text-sm font-body text-gray-500">
            <button onClick={() => setPage('legal')} className="hover:text-danger-500 transition">Mentions légales</button>
            <button onClick={() => setPage('contact')} className="hover:text-danger-500 transition">Contact</button>
            <a href="#" className="hover:text-danger-500">Partenariat</a>
          </div>
          <div className="flex justify-center gap-2 mb-1 opacity-70">
            <EyeIcon size={24} className="text-danger-500" />
            <span className="font-tech font-black text-gray-800">ALARM<span className="text-danger-500">VISION</span></span>
          </div>
          <div className="text-danger-600 font-tech font-bold text-xs tracking-widest mb-2 uppercase">La sécurité nouvelle génération</div>
          <p className="text-gray-400 text-xs font-body font-bold uppercase tracking-widest">© 2026 Alarm Vision · Sécurité IA · Devis gratuit sous 48h</p>
        </div>
      </footer>

      {/* CHATBOT SAV — persistant sur toutes les pages */}
      <SAVChatbotWrapper />
    </div>
  );
}

// Wrapper pour éviter les conflits de nommage
const SAVChatbotWrapper = () => <ChatbotWidget />;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
</script>
</body>
</html>
