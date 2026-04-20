/* ── ALARM VISION — Application React Complète ── */
(function(){
  const {useState,useEffect,useRef,createElement:h,Fragment} = React;

  /* ══════════════════════════════════════════
     ROUTING : détecte la page depuis data-page
  ══════════════════════════════════════════ */
  const PAGE_FROM_HTML = document.documentElement.dataset.page || 'home';

  /* Navigation multi-fichiers */
  const NAV_LINKS = {
    home:    'index.html',
    tech:    'technologie.html',
    services:'services.html',
    contact: 'contact.html',
    devis:   'devis.html',
    legal:   'mentions-legales.html',
    cgv:     'cgv.html'
  };

  const goTo = (id) => {
    window.location.href = NAV_LINKS[id] || 'index.html';
  };

  /* ── ICONS ── */
  const EyeIcon = ({size=24,className=""}) => h('svg',{xmlns:"http://www.w3.org/2000/svg",width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",className},
    h('path',{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"}),h('circle',{cx:12,cy:12,r:3}));

  const CheckIcon = ({size=18,color="currentColor"}) => h('svg',{xmlns:"http://www.w3.org/2000/svg",width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:color,strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"},
    h('polyline',{points:"20 6 9 17 4 12"}));

  const ShieldIcon = ({size=24,stroke="#ffffff",fill="none"}) => h('svg',{xmlns:"http://www.w3.org/2000/svg",width:size,height:size,viewBox:"0 0 24 24",fill:fill,stroke:stroke,strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"},
    h('path',{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}));

  const PhoneIcon = ({size=18}) => h('svg',{xmlns:"http://www.w3.org/2000/svg",width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},
    h('path',{d:"M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"}));

  const BotIcon = ({size=18}) => h('svg',{xmlns:"http://www.w3.org/2000/svg",width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},
    h('rect',{x:3,y:11,width:18,height:10,rx:2}),h('circle',{cx:12,cy:5,r:2}),h('path',{d:"M12 7v4"}),h('line',{x1:8,y1:16,x2:8,y2:16}),h('line',{x1:16,y1:16,x2:16,y2:16}));

  /* ── FADE IN ── */
  const FadeIn = ({children,delay=0}) => {
    const [vis,setVis] = useState(false);
    const ref = useRef(null);
    useEffect(()=>{
      const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true)},{threshold:0.1});
      if(ref.current) obs.observe(ref.current);
      return ()=>{if(ref.current) obs.unobserve(ref.current);};
    },[]);
    return h('div',{ref,style:{transitionDelay:`${delay}ms`},className:`transition-all duration-700 ease-out ${vis?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`},children);
  };

  /* ── MAP ── */
  const FranceMap = () => {
    const mapRef = useRef(null);
    useEffect(()=>{
      if(mapRef.current && !mapRef.current._leaflet_id){
        const map = L.map(mapRef.current).setView([45.764, 4.8357], 12);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{attribution:'&copy; OpenStreetMap'}).addTo(map);
        L.marker([45.764, 4.8357]).addTo(map).bindPopup('Lyon - Siège');
      }
    },[]);
    return h('div',{ref:mapRef,style:{height:'300px',width:'100%',borderRadius:'1rem'}});
  };

  /* ── SAV MODAL ── */
  const SavModal = ({isOpen,onClose}) => {
    const [mode,setMode] = useState('menu');
    const [phone,setPhone] = useState('');
    const [chatPhone,setChatPhone] = useState('');
    const [urgent,setUrgent] = useState(false);
    const [chatMessages,setChatMessages] = useState([{sender:'bot',text:"Bonjour ! Je suis l'assistant Alarm Vision. Comment puis-je vous aider aujourd'hui ?"}]);
    const [inputMsg,setInputMsg] = useState('');
    const [isTyping,setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const reset = () => {
      setMode('menu'); setPhone(''); setChatPhone(''); setUrgent(false);
      setChatMessages([{sender:'bot',text:"Bonjour ! Je suis l'assistant Alarm Vision. Comment puis-je vous aider aujourd'hui ?"}]);
      setInputMsg(''); onClose();
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
                h('textarea',{placeholder:"Ex: Mon alarme sonne en permanence...",rows:"2",className:"w-full border-2 border-gray-200 focus:border-black rounded-xl px-4 py-3 outline-none text-sm resize-none"}))),
            h('div',{className:"flex gap-3 mt-5"},
              h('button',{onClick:()=>{if(phone.trim())setMode('callConfirm');},className:"flex-1 bg-red-600 hover:bg-black text-white py-3 rounded-xl font-semibold text-sm transition"},"Confirmer le rappel"),
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

  /* ── SAV BADGE ── */
  const SavBadge = () => {
    const [open,setOpen] = useState(false);
    return h(Fragment,null,
      h('div',{onClick:()=>setOpen(true),className:"fixed bottom-24 right-6 z-40 bg-red-600 hover:bg-black text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-3 cursor-pointer transition"},
        h('div',{className:"w-2.5 h-2.5 rounded-full bg-green-400 pulse-dot"}),
        h('span',{className:"text-sm font-bold tracking-wide"},"SAV 24h/24 7j/7")),
      h(SavModal,{isOpen:open,onClose:()=>setOpen(false)}));
  };

  /* ── NAVBAR ── */
  const Navbar = () => {
    const currentPage = PAGE_FROM_HTML;
    const items = [
      {id:'home',label:'Accueil'},
      {id:'tech',label:'Technologie'},
      {id:'services',label:'Services'},
      {id:'contact',label:'Contact'},
      {id:'devis',label:'Devis'}
    ];
    return h('nav',{className:"fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-black/5 py-2"},
      h('div',{className:"max-w-7xl mx-auto px-4 flex items-center justify-between"},
        h('a',{href:"index.html",className:"flex items-center gap-1.5 cursor-pointer shrink-0 no-underline"},
          h(EyeIcon,{size:30,className:"text-red-600"}),
          h('div',{className:"flex flex-col leading-tight"},
            h('span',{className:"text-xl font-black tracking-tight"},"ALARM",h('span',{className:"text-red-600"},"VISION")))),
        h('div',{className:"flex items-center gap-0.5 md:gap-4 flex-wrap justify-end"},
          items.map(it=>h('a',{key:it.id,href:NAV_LINKS[it.id],className:`hidden sm:block text-xs md:text-sm font-medium px-1.5 md:px-2 py-1 no-underline ${currentPage===it.id?'text-red-600 border-b-2 border-red-600':'text-gray-700 hover:text-black'}`},it.label)),
          h('a',{href:"devis.html",className:"bg-black text-white px-3 md:px-5 py-2 text-xs md:text-sm font-medium rounded-full hover:bg-red-600 transition no-underline"},"Devis gratuit"))));
  };

  /* ── FOOTER ── */
  const Footer = () => h('footer',{className:"border-t py-8 bg-white"},
    h('div',{className:"max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4"},
      h('a',{href:"index.html",className:"flex items-center gap-2 no-underline"},
        h(EyeIcon,{size:18,className:"text-red-600"}),
        h('span',{className:"font-black text-sm"},"ALARM",h('span',{className:"text-red-600"},"VISION"))),
      h('div',{className:"flex flex-wrap gap-4 text-xs text-gray-400 justify-center"},
        h('a',{href:"mentions-legales.html",className:"hover:text-black no-underline"},"Mentions légales"),
        h('a',{href:"cgv.html",className:"hover:text-black no-underline"},"CGV"),
        h('a',{href:"contact.html",className:"hover:text-black no-underline"},"Contact")),
      h('p',{className:"text-xs text-gray-400"},"© 2026 Alarm Vision")));

  /* ── BOTTOM NAV MOBILE ── */
  const BottomNav = () => {
    const currentPage = PAGE_FROM_HTML;
    const items = [
      {id:'home',label:'Accueil',icon:'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z'},
      {id:'tech',label:'Techno',icon:'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2'},
      {id:'services',label:'Services',icon:'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2'},
      {id:'contact',label:'Contact',icon:'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'},
      {id:'devis',label:'Devis',icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'}
    ];
    return h('nav',{className:"sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 flex justify-around py-2"},
      items.map(item=>h('a',{key:item.id,href:NAV_LINKS[item.id],className:`flex flex-col items-center gap-0.5 px-2 py-1 no-underline ${currentPage===item.id?'text-red-600':'text-gray-400'}`},
        h('svg',{xmlns:"http://www.w3.org/2000/svg",width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},
          h('path',{d:item.icon})),
        h('span',{className:"text-[9px] font-medium"},item.label))));
  };

  /* ── PARTNER SLIDER ── */
  const PartnerSlider = () => {
    return h('div',{className:"max-w-6xl mx-auto px-6"},
      h('div',{className:"grid grid-cols-1 gap-4 mt-8 justify-items-center"},
        h('div',{className:"group flex flex-col items-center gap-3 p-5 rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-300"},
          h('img',{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU0_NMgC4pZ_zLeu4nrp1twl74gbrwIO7Fzg&s",alt:"SOS Pneus 69",className:"w-20 h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"}),
          h('p',{className:"text-xs font-bold text-gray-800"},"SOS Pneus 69"),
          h('p',{className:"text-[10px] text-gray-400"},"Automobile"))));
  };

  /* ══════════════════════════
     PAGE : ACCUEIL (home)
  ══════════════════════════ */
  const HomePage = () => {
    const certs = [
      {name:"CE",desc:"Conformité Européenne"},
      {name:"EN 62676",desc:"Norme vidéosurveillance IP"},
      {name:"CNPP",desc:"Certification CNPP"},
      {name:"APSAD R82",desc:"Vidéosurveillance"},
      {name:"NF APSAD",desc:"Service certifié NF"},
      {name:"NFA2P",desc:"Alarme anti-intrusion"},
      {name:"APSAD D32",desc:"Maintenance des systèmes"}
    ];

    return h('div',null,
      /* HERO */
      h('section',{className:"bg-hero min-h-screen flex items-center relative"},
        h('div',{className:"absolute inset-0 bg-black/50"}),
        h('div',{className:"relative z-10 max-w-6xl mx-auto px-6 py-20 text-center"},
          h(FadeIn,null,
            h('div',{className:"flex justify-center mb-6"},
              h(EyeIcon,{size:180,className:"text-red-500 drop-shadow-2xl"})),
            h('h1',{className:"text-5xl md:text-7xl text-white leading-tight mb-4 font-black tracking-tight"},
              "L'Œil qui ne dort jamais"),
            h('p',{className:"text-gray-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto"},
              "Détection intelligente, zéro fausse alerte. Pour les particuliers et les professionnels."),
            h('div',{className:"flex flex-wrap gap-4 justify-center"},
              h('a',{href:"devis.html",className:"bg-red-600 hover:bg-white hover:text-black text-white px-8 py-4 rounded-full font-bold text-sm transition no-underline"},"Obtenir un devis gratuit"),
              h('a',{href:"services.html",className:"border-2 border-white/60 hover:border-white text-white px-8 py-4 rounded-full font-medium text-sm transition no-underline"},"Nos solutions")))),
        h('div',{className:"absolute bottom-8 left-0 right-0"},
          h('div',{className:"max-w-6xl mx-auto px-6"},
            h('div',{className:"flex flex-wrap gap-6 justify-center"},
              [{val:"+2 000",label:"clients protégés"},{val:"99,7%",label:"précision IA"},{val:"24h/24",label:"SAV disponible"}].map((s,i)=>
                h('div',{key:i,className:"text-white text-center"},
                  h('div',{className:"text-2xl font-black"},s.val),
                  h('div',{className:"text-xs text-gray-300"},s.label))))))),

      /* CARTE FRANCE */
      h('section',{className:"py-16 px-6 bg-gray-50"},
        h('div',{className:"max-w-6xl mx-auto text-center"},
          h('h2',{className:"text-3xl font-bold mb-8"},"Installation partout en France"),
          h(FadeIn,null,h(FranceMap)),
          h('p',{className:"text-gray-600 mt-5"},"Agence à Lyon – Intervention possible dans toute la France métropolitaine."))),

      /* CERTIFICATIONS */
      h('section',{className:"py-16 px-6 bg-white border-t"},
        h('div',{className:"max-w-6xl mx-auto text-center"},
          h('h2',{className:"text-3xl font-bold mb-3"},"Nos certifications"),
          h('div',{className:"w-16 h-0.5 bg-red-500 mx-auto mb-10"}),
          h('div',{className:"grid grid-cols-2 md:grid-cols-4 gap-6"},
            certs.map((cert,i)=>
              h(FadeIn,{key:i,delay:i*80},
                h('div',{className:"bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm"},
                  h('div',{className:"text-2xl font-black text-red-600"},cert.name),
                  h('p',{className:"text-xs text-gray-500 mt-1"},cert.desc))))))),

      /* CTA SHIELD */
      h('section',{className:"py-20 bg-black text-white"},
        h('div',{className:"max-w-4xl mx-auto px-6 text-center"},
          h(FadeIn,null,
            h('div',{className:"flex flex-col items-center justify-center gap-6 mb-6"},
              h('div',{className:"relative shrink-0"},
                h('div',{className:"absolute inset-0 rounded-full bg-white/10 blur-2xl scale-150"}),
                h(ShieldIcon,{size:110,stroke:"#ffffff",fill:"rgba(255,255,255,0.08)"})),
              h('h2',{className:"text-3xl md:text-5xl font-black leading-tight text-center"},"Protégez ce qui compte vraiment")),
            h('p',{className:"text-gray-300 text-lg mb-2 text-center"},"Devis gratuit sous 24h*. Sans engagement."),
            h('p',{className:"text-gray-500 text-xs mb-8 text-center"},"* jours ouvrés"),
            h('a',{href:"devis.html",className:"bg-white text-black px-10 py-4 rounded-full hover:bg-red-600 hover:text-white transition font-bold no-underline"},"Je demande mon devis")))),

      /* PARTENAIRE / CONTACT */
      h('section',{className:"py-16 px-6 bg-white"},
        h('div',{className:"max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"},
          h(FadeIn,null,
            h('div',{className:"bg-gray-50 p-8 rounded-3xl flex flex-col gap-4 h-full"},
              h('div',{className:"w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-2"},
                h('svg',{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"#fff",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},
                  h('path',{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),
                  h('circle',{cx:9,cy:7,r:4}),
                  h('path',{d:"M23 21v-2a4 4 0 0 0-3-3.87"}),
                  h('path',{d:"M16 3.13a4 4 0 0 1 0 7.75"}))),
              h('h3',{className:"text-2xl font-bold"},"Devenir partenaire"),
              h('p',{className:"text-gray-600 text-sm leading-relaxed flex-1"},"Vous êtes installateur, agence immobilière, gestionnaire de biens ou acteur de la construction ? Rejoignez notre réseau de partenaires certifiés. Bénéficiez de tarifs préférentiels, d'un support technique dédié et d'outils de vente exclusifs pour proposer nos solutions à vos clients."),
              h('a',{href:"contact.html",className:"bg-black text-white px-6 py-3 rounded-full w-fit hover:bg-red-600 transition font-medium no-underline"},"Nous contacter"))),
          h(FadeIn,{delay:100},
            h('div',{className:"bg-red-50 p-8 rounded-3xl flex flex-col gap-4 h-full"},
              h('div',{className:"w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-2"},
                h('svg',{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"#fff",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},
                  h('circle',{cx:12,cy:12,r:10}),
                  h('path',{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}),
                  h('line',{x1:12,y1:17,x2:12.01,y2:17}))),
              h('h3',{className:"text-2xl font-bold"},"Une question ?"),
              h('p',{className:"text-gray-600 text-sm leading-relaxed flex-1"},"Besoin d'un conseil avant de vous décider ? Notre équipe d'experts est disponible pour répondre à toutes vos questions : choix de la solution, contraintes techniques, compatibilité avec votre installation existante. Nous vous répondons sous 24h, sans engagement."),
              h('a',{href:"contact.html",className:"bg-red-600 text-white px-6 py-3 rounded-full w-fit hover:bg-black transition font-medium no-underline"},"Écrire à nos experts"))))),

      /* PARTENAIRES */
      h('section',{className:"py-12 border-t bg-white"},
        h('div',{className:"max-w-6xl mx-auto text-center"},
          h('h2',{className:"text-2xl font-bold mb-1"},"Ils nous font déjà confiance"),
          h('p',{className:"text-xs text-gray-400 mb-4"},"Plus de 500 clients entreprises et particuliers"),
          h(PartnerSlider))),

      h(Footer)
    );
  };

  /* ══════════════════════════
     PAGE : TECHNOLOGIE (tech)
  ══════════════════════════ */
  const TechPage = () => {
    const features = [
      {title:"Détection IA en temps réel",badge:"Deep Learning",desc:"Notre moteur d'intelligence artificielle analyse chaque image à 30 fps. Il distingue instantanément une silhouette humaine d'un animal, d'une ombre ou d'un mouvement de végétation. Résultat : zéro fausse alerte, uniquement des menaces réelles.",stats:[{val:"99,7%",label:"de précision"},{val:"<0,3s",label:"temps de détection"},{val:"0",label:"fausse alerte"}],img:"https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=80",accent:"#dc2626"},
      {title:"Vision nocturne 4K ultra HD",badge:"Infrarouge actif",desc:"Nos caméras voient dans l'obscurité totale jusqu'à 50 mètres avec une résolution 4K. L'infrarouge actif s'adapte automatiquement aux conditions lumineuses. Jour et nuit, chaque détail est capturé avec une précision chirurgicale.",stats:[{val:"50m",label:"portée nocturne"},{val:"4K",label:"résolution"},{val:"140°",label:"angle de vue"}],img:"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",accent:"#1d4ed8"},
      {title:"Contrôle d'accès biométrique",badge:"Reconnaissance faciale",desc:"128 points biométriques analysés en 0,2 seconde. Notre système reconnaît les visages même masqués partiellement, détecte les tentatives de fraude par photo ou vidéo, et alerte instantanément en cas d'intrusion non autorisée.",stats:[{val:"128",label:"points analysés"},{val:"0,2s",label:"identification"},{val:"2 ans",label:"garantie légale"}],img:"https://img.freepik.com/photos-gratuite/concept-collage-reconnaissance-faciale_23-2150038886.jpg?semt=ais_hybrid&w=740&q=80",accent:"#059669"},
      {title:"Stockage 100% local et sécurisé",badge:"Données en local",desc:"Toutes vos données vidéo sont enregistrées directement sur vos équipements, chez vous. Aucun cloud, aucun serveur externe, aucune dépendance à une connexion internet. Vous êtes seul maître de vos enregistrements, en toute confidentialité.",stats:[{val:"100%",label:"données locales"},{val:"0",label:"serveur externe"},{val:"RGPD",label:"conforme"}],img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",accent:"#7c3aed"}
    ];
    return h('div',{className:"pt-28 pb-20 px-6 bg-white"},
      h('div',{className:"max-w-6xl mx-auto"},
        h('div',{className:"text-center mb-16"},
          h('span',{className:"inline-block bg-red-100 text-red-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest"},"Technologie de pointe"),
          h('h2',{className:"text-4xl md:text-5xl font-black mb-4"},"L'IA au service de ",h('span',{className:"text-red-600"},"votre sécurité")),
          h('p',{className:"text-lg text-gray-500 max-w-2xl mx-auto"},"Des algorithmes entraînés sur des millions de situations réelles pour une protection qui ne laisse rien au hasard.")),
        features.map((item,idx)=>
          h(FadeIn,{key:idx,delay:idx*100},
            h('div',{className:"grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20"},
              h('div',{className:idx%2===1?'md:order-last':''},
                h('div',{className:"relative"},
                  h('img',{src:item.img,className:"rounded-2xl shadow-xl w-full h-80 object-cover",onError:e=>{e.target.src='https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Image+non+disponible';}}),
                  h('div',{className:"absolute top-4 left-4 px-3 py-1.5 rounded-full text-white text-xs font-bold",style:{background:item.accent}},item.badge))),
              h('div',null,
                h('h3',{className:"text-2xl md:text-3xl font-black mb-3"},item.title),
                h('p',{className:"text-gray-600 leading-relaxed mb-6"},item.desc),
                h('div',{className:"grid grid-cols-3 gap-4"},
                  item.stats.map((s,i)=>
                    h('div',{key:i,className:"text-center p-3 bg-gray-50 rounded-xl"},
                      h('div',{className:"text-xl font-black",style:{color:item.accent}},s.val),
                      h('div',{className:"text-xs text-gray-500 mt-0.5"},s.label)))))))),
        h('div',{className:"mt-4 p-8 bg-black rounded-3xl text-white text-center"},
          h('p',{className:"text-lg font-bold mb-1"},"Certification & conformité"),
          h('p',{className:"text-gray-400 text-sm"},"Tous nos systèmes sont certifiés CE, EN 62676, APSAD R82 et conformes RGPD. Vos données ne quittent jamais vos locaux."))),
      h(Footer));
  };

  /* ══════════════════════════
     PAGE : SERVICES
  ══════════════════════════ */
  const ServicesPage = () => {
    const SearchIcon = () => h('svg',{xmlns:"http://www.w3.org/2000/svg",width:28,height:28,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"},h('circle',{cx:11,cy:11,r:8}),h('line',{x1:21,y1:21,x2:16.65,y2:16.65}));

    const auditSteps = [
      {num:"01",title:"Prise de contact",desc:"Échange téléphonique ou visio pour comprendre vos enjeux, votre environnement et vos contraintes spécifiques."},
      {num:"02",title:"Repérage sur site",desc:"Un de nos experts se rend physiquement sur place. Il analyse chaque angle mort, point d'entrée vulnérable, zone de passage et espace à risque."},
      {num:"03",title:"Analyse & rapport",desc:"Nous rédigeons un rapport détaillé avec photos, cartographie des risques et cotation de chaque vulnérabilité identifiée."},
      {num:"04",title:"Recommandations",desc:"Nous vous présentons un plan d'action priorisé : solutions adaptées à votre budget, délais d'intervention et retour sur investissement estimé."},
      {num:"05",title:"Suivi optionnel",desc:"Mise en place des solutions recommandées par nos équipes, puis contrôle qualité 30 jours après installation."}
    ];

    return h('div',{className:"pt-28 pb-20 px-6 bg-gray-50"},
      h('div',{className:"max-w-6xl mx-auto"},
        h('div',{className:"text-center mb-14"},
          h('h2',{className:"text-4xl font-bold mb-3"},"Nos services"),
          h('p',{className:"text-gray-500 max-w-2xl mx-auto"},"Solutions sur mesure pour particuliers et professionnels. Installation, maintenance et support assurés par nos techniciens certifiés.")),
        h(FadeIn,{delay:0},
          h('div',{className:"bg-black text-white rounded-3xl overflow-hidden mb-10"},
            h('div',{className:"p-8 md:p-10"},
              h('div',{className:"flex flex-col md:flex-row gap-8"},
                h('div',{className:"md:w-1/2"},
                  h('div',{className:"w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-5"},h(SearchIcon)),
                  h('div',{className:"inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3"},"Service phare"),
                  h('h3',{className:"text-2xl md:text-3xl font-black mb-3"},"Audit sécurité"),
                  h('p',{className:"text-gray-300 text-sm leading-relaxed mb-6"},"Avant d'installer quoi que ce soit, nous venons chez vous. Nos experts analysent votre environnement en détail pour vous proposer uniquement ce dont vous avez réellement besoin — ni plus, ni moins."),
                  h('div',{className:"text-white font-bold text-lg mb-1"},"Dès 150 € *"),
                  h('p',{className:"text-gray-400 text-xs mb-1"},"Offert si vous passez commande suite à l'audit"),
                  h('p',{className:"text-gray-500 text-xs mb-6"},"* Tarif applicable uniquement dans le Rhône (69)"),
                  h('a',{href:"devis.html",className:"bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-full font-medium transition text-sm no-underline"},"Planifier mon audit")),
                h('div',{className:"md:w-1/2"},
                  h('p',{className:"text-gray-400 text-xs font-bold uppercase tracking-widest mb-4"},"Comment ça se passe ?"),
                  h('div',{className:"space-y-4"},
                    auditSteps.map((step,i)=>
                      h('div',{key:i,className:"flex gap-4"},
                        h('div',{className:"w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-black text-red-400 shrink-0"},step.num),
                        h('div',null,
                          h('p',{className:"font-semibold text-sm"},step.title),
                          h('p',{className:"text-gray-400 text-xs leading-relaxed"},step.desc)))))))))),
        h('div',{className:"text-center"},
          h('a',{href:"devis.html",className:"bg-black text-white px-8 py-4 rounded-full hover:bg-red-600 transition font-medium no-underline"},"Demander un devis personnalisé"))),
      h(Footer));
  };

  /* ══════════════════════════
     PAGE : CONTACT
  ══════════════════════════ */
  const ContactPage = () => {
    const [sent,setSent] = useState(false);
    const [sending,setSending] = useState(false);
    const [error,setError] = useState('');
    const [form,setForm] = useState({prenom:'',nom:'',tel:'',email:'',sujet:'',message:''});
    const setField = (k,v) => setForm(f=>({...f,[k]:v}));

    const handleContactSubmit = async (e) => {
      e.preventDefault();
      setSending(true);
      setError('');
      try {
        // Remplacez les valeurs ci-dessous par vos identifiants EmailJS
        await emailjs.send(
          'service_2rm7vom',
          'template_0lnqb8s',
          {
            from_name:   form.prenom + ' ' + form.nom,
            reply_email: form.email,
            subject:     form.sujet || 'Contact – Alarm Vision',
            message:     `Téléphone : ${form.tel}\n\n${form.message}`,
          },
          'MFZW0V06es17giiT8'
        );
        setSent(true);
      } catch(err) {
        const msg = err?.text || err?.message || JSON.stringify(err);
        setError('Erreur EmailJS : ' + msg);
        console.error('EmailJS error:', err);
      } finally {
        setSending(false);
      }
    };

    return h('div',{className:"pt-28 pb-20 max-w-5xl mx-auto px-6"},
      h('div',{className:"mb-12 text-center"},
        h('span',{className:"inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-red-600 bg-red-50 border border-red-100 px-4 py-1.5 rounded-full mb-5"},
          h('span',{className:"w-1.5 h-1.5 bg-red-600 rounded-full"}),"Assistance client"),
        h('h2',{className:"text-4xl md:text-5xl font-black tracking-tight mb-3"},"Contactez-nous"),
        h('p',{className:"text-gray-500 text-base max-w-md mx-auto font-light"},"Notre équipe vous répond sous 24h ouvrés. Pour toute urgence, le SAV est disponible 24h/24.")),
      h('a',{href:"tel:+33482531234",className:"flex items-center justify-between gap-4 bg-black text-white rounded-2xl px-6 py-5 mb-8 hover:bg-red-700 transition group no-underline"},
        h('div',{className:"flex items-center gap-4"},
          h('div',{className:"w-11 h-11 bg-red-600 rounded-xl flex items-center justify-center shrink-0"},
            h('svg',{xmlns:"http://www.w3.org/2000/svg",width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"#fff",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},
              h('path',{d:"M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"}))),
          h('div',null,
            h('p',{className:"text-xs text-red-400 font-semibold tracking-widest uppercase mb-0.5"},"SAV & Urgences — Disponible maintenant"),
            h('p',{className:"text-xl font-black tracking-wide"},"Non Disponible"))),
        h('div',{className:"text-xs text-gray-400 text-right shrink-0"},
          h('p',null,"Techniciens"),
          h('p',{className:"font-bold text-white"},"24h / 7j"))),
      h('div',{className:"grid grid-cols-1 md:grid-cols-2 gap-8"},
        h('div',{className:"space-y-4"},
          h('div',{className:"bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-5"},
            h('p',{className:"text-xs font-bold tracking-widest uppercase text-gray-400"},"Coordonnées"),
            h('div',{className:"flex items-start gap-3"},
              h('div',{className:"w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center shrink-0"},
                h('svg',{xmlns:"http://www.w3.org/2000/svg",width:15,height:15,viewBox:"0 0 24 24",fill:"none",stroke:"#dc2626",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},
                  h('path',{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}),h('circle',{cx:12,cy:10,r:3}))),
              h('div',null,
                h('p',{className:"font-semibold text-sm"},"39 Rue Louis Saillant"),
                h('p',{className:"text-gray-500 text-sm"},"69120 Vaulx-en-Velin"))),
            h('div',{className:"flex items-start gap-3"},
              h('div',{className:"w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center shrink-0"},
                h('svg',{xmlns:"http://www.w3.org/2000/svg",width:15,height:15,viewBox:"0 0 24 24",fill:"none",stroke:"#dc2626",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},
                  h('rect',{x:2,y:4,width:20,height:16,rx:2}),h('path',{d:"M22 7l-10 7L2 7"}))),
              h('div',null,
                h('p',{className:"font-semibold text-sm"},"contact@alarmvision.fr"),
                h('p',{className:"text-gray-500 text-sm"},"Réponse sous 24h ouvrés")))),
          h('div',{className:"bg-gray-50 rounded-2xl border border-gray-100 p-6"},
            h('p',{className:"text-xs font-bold tracking-widest uppercase text-gray-400 mb-4"},"Horaires d'ouverture"),
            h('div',{className:"space-y-3"},
              h('div',{className:"flex justify-between items-center py-2 border-b border-dashed border-gray-200"},
                h('span',{className:"text-sm text-gray-500"},"Lundi – Vendredi"),
                h('span',{className:"text-sm font-semibold font-mono"},"08h – 20h")),
              h('div',{className:"flex justify-between items-center py-2 border-b border-dashed border-gray-200"},
                h('span',{className:"text-sm text-gray-500"},"Samedi"),
                h('span',{className:"text-sm font-semibold"},"Sur rendez-vous")),
              h('div',{className:"flex justify-between items-center py-2"},
                h('span',{className:"text-sm text-gray-500"},"SAV Urgences"),
                h('span',{className:"text-xs font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full"},"24h / 7j")))),
          h('div',{className:"grid grid-cols-2 gap-3"},
            h('div',{className:"bg-black text-white rounded-2xl p-4 text-center"},
              h('p',{className:"text-2xl font-black"},"+2 000"),
              h('p',{className:"text-xs text-gray-400 mt-0.5"},"clients protégés")),
            h('div',{className:"bg-red-600 text-white rounded-2xl p-4 text-center"},
              h('p',{className:"text-2xl font-black"},"< 2h"),
              h('p',{className:"text-xs text-red-200 mt-0.5"},"délai intervention")))),
        h('div',null,
          sent
            ? h('div',{className:"bg-green-50 border border-green-100 rounded-2xl p-10 text-center flex flex-col items-center gap-3 h-full justify-center"},
                h('div',{className:"w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2"},
                  h('svg',{xmlns:"http://www.w3.org/2000/svg",width:32,height:32,viewBox:"0 0 24 24",fill:"none",stroke:"#16a34a",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},
                    h('path',{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),h('polyline',{points:"22 4 12 14.01 9 11.01"}))),
                h('p',{className:"text-xl font-black text-green-800"},"Message envoyé !"),
                h('p',{className:"text-sm text-gray-500 font-light"},"Nous vous répondons sous 24h ouvrés."))
            : h('form',{onSubmit:handleContactSubmit,className:"bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4"},
                h('p',{className:"text-xs font-bold tracking-widest uppercase text-gray-400 mb-2"},"Envoyer un message"),
                h('div',{className:"grid grid-cols-2 gap-3"},
                  h('input',{type:"text",placeholder:"Prénom",required:true,value:form.prenom,onChange:e=>setField('prenom',e.target.value),className:"border-2 border-gray-200 focus:border-black p-3 rounded-xl outline-none text-sm w-full"}),
                  h('input',{type:"text",placeholder:"Nom",required:true,value:form.nom,onChange:e=>setField('nom',e.target.value),className:"border-2 border-gray-200 focus:border-black p-3 rounded-xl outline-none text-sm w-full"})),
                h('input',{type:"tel",placeholder:"+33 6 00 00 00 00",value:form.tel,onChange:e=>setField('tel',e.target.value),className:"w-full border-2 border-gray-200 focus:border-black p-3 rounded-xl outline-none text-sm"}),
                h('input',{type:"email",placeholder:"Email",required:true,value:form.email,onChange:e=>setField('email',e.target.value),className:"w-full border-2 border-gray-200 focus:border-black p-3 rounded-xl outline-none text-sm"}),
                h('select',{value:form.sujet,onChange:e=>setField('sujet',e.target.value),className:"w-full border-2 border-gray-200 focus:border-black p-3 rounded-xl outline-none text-sm bg-white text-gray-500"},
                  h('option',{value:""},"Sujet de votre demande"),
                  h('option',null,"Demande d'information"),
                  h('option',null,"SAV / Maintenance"),
                  h('option',null,"Demande de devis"),
                  h('option',null,"Autre")),
                h('textarea',{rows:"4",placeholder:"Votre message...",required:true,value:form.message,onChange:e=>setField('message',e.target.value),className:"w-full border-2 border-gray-200 focus:border-black p-3 rounded-xl outline-none text-sm resize-none"}),
                error && h('p',{className:"text-sm text-red-600 bg-red-50 p-3 rounded-xl"},error),
                h('button',{type:"submit",disabled:sending,className:`bg-black text-white w-full py-3.5 rounded-full hover:bg-red-600 transition font-semibold text-sm flex items-center justify-center gap-2 ${sending?'opacity-60 cursor-not-allowed':''}`},
                  sending
                    ? h('span',null,"Envoi en cours...")
                    : h(Fragment,null,
                        h('svg',{xmlns:"http://www.w3.org/2000/svg",width:15,height:15,viewBox:"0 0 24 24",fill:"none",stroke:"#fff",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},
                          h('line',{x1:"22",y1:"2",x2:"11",y2:"13"}),h('polygon',{points:"22 2 15 22 11 13 2 9 22 2"})),
                        "Envoyer le message")),
                h('p',{className:"text-xs text-gray-400 text-center"},"* Réponse garantie sous 24h ouvrés")))),
      h(Footer));
  };

  /* ══════════════════════════
     PAGE : DEVIS
  ══════════════════════════ */
  const DevisPage = () => {
    const [type,setType] = useState('particulier');
    const [service,setService] = useState('');
    const [sent,setSent] = useState(false);
    const [sending,setSending] = useState(false);
    const [error,setError] = useState('');
    const [form,setForm] = useState({prenom:'',nom:'',raisonSociale:'',siret:'',adresse:'',email:'',tel:'',infos:''});
    const setField = (k,v) => setForm(f=>({...f,[k]:v}));

    const handleDevisSubmit = async (e) => {
      e.preventDefault();
      setSending(true);
      setError('');
      try {
        // Remplacez les valeurs ci-dessous par vos identifiants EmailJS
        await emailjs.send(
          'service_2rm7vom',
          'template_0lnqb8s',
          {
            from_name:   type === 'particulier'
                           ? form.prenom + ' ' + form.nom
                           : form.raisonSociale + (form.siret ? ' – SIRET : ' + form.siret : ''),
            reply_email: form.email,
            subject:     'Demande de devis – ' + (service || 'Audit sécurité'),
            message:     `Type client : ${type}\nAdresse du site : ${form.adresse}\nTéléphone : ${form.tel}${form.infos ? '\n\nInformations complémentaires :\n' + form.infos : ''}`,
          },
          'MFZW0V06es17giiT8'
        );
        setSent(true);
      } catch(err) {
        const msg = err?.text || err?.message || JSON.stringify(err);
        setError('Erreur EmailJS : ' + msg);
        console.error('EmailJS error:', err);
      } finally {
        setSending(false);
      }
    };
    return h('div',{className:"pt-28 pb-20 max-w-5xl mx-auto px-6"},
      h('div',{className:"mb-10 text-center"},
        h('span',{className:"inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-red-600 bg-red-50 border border-red-100 px-4 py-1.5 rounded-full mb-5"},
          h('span',{className:"w-1.5 h-1.5 bg-red-600 rounded-full"}),"Sans engagement"),
        h('h2',{className:"text-4xl md:text-5xl font-black tracking-tight mb-3"},"Votre devis gratuit"),
        h('p',{className:"text-gray-500 text-base max-w-md mx-auto font-light"},"Étude personnalisée sous 24h ouvrés par votre conseiller dédié.")),
      h('div',{className:"grid grid-cols-1 md:grid-cols-5 gap-8 items-start"},
        h('div',{className:"md:col-span-2 space-y-4"},
          h('div',{className:"space-y-3"},
            [{icon:h('path',{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}),title:"Installation certifiée NF",sub:"Techniciens qualifiés, matériel homologué"},
             {icon:h('path',{d:"M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"}),title:"SAV réactif 24h/24",sub:"Hotline et techniciens disponibles 7j/7"},
             {icon:[h('circle',{cx:12,cy:12,r:10}),h('polyline',{points:"12 6 12 12 16 14"})],title:"Réponse sous 24h",sub:"Devis personnalisé et chiffrage transparent"}
            ].map((item,i)=>
              h('div',{key:i,className:"flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-2xl p-4"},
                h('div',{className:"w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center shrink-0 mt-0.5"},
                  h('svg',{xmlns:"http://www.w3.org/2000/svg",width:15,height:15,viewBox:"0 0 24 24",fill:"none",stroke:"#dc2626",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},item.icon)),
                h('div',null,
                  h('p',{className:"font-semibold text-sm"},item.title),
                  h('p',{className:"text-gray-500 text-xs mt-0.5"},item.sub))))),
          h('a',{href:"tel:+33482531234",className:"flex items-center gap-3 bg-black text-white rounded-2xl px-5 py-4 hover:bg-red-700 transition no-underline"},
            h('div',{className:"w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center shrink-0"},
              h('svg',{xmlns:"http://www.w3.org/2000/svg",width:15,height:15,viewBox:"0 0 24 24",fill:"none",stroke:"#fff",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},
                h('path',{d:"M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"}))),
            h('div',null,
              h('p',{className:"text-xs text-gray-400 font-medium"},"Besoin urgent ?"),
              h('p',{className:"font-black text-base tracking-wide"},"Non Disponible")))),
        h('div',{className:"md:col-span-3"},
          sent
            ? h('div',{className:"bg-green-50 border border-green-100 rounded-2xl p-12 text-center flex flex-col items-center gap-3"},
                h('div',{className:"w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2"},
                  h('svg',{xmlns:"http://www.w3.org/2000/svg",width:32,height:32,viewBox:"0 0 24 24",fill:"none",stroke:"#16a34a",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},
                    h('path',{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),h('polyline',{points:"22 4 12 14.01 9 11.01"}))),
                h('p',{className:"text-xl font-black text-green-800"},"Demande envoyée !"),
                h('p',{className:"text-sm text-gray-500 font-light"},"Votre conseiller vous contacte sous 24h ouvrés."))
            : h('form',{onSubmit:handleDevisSubmit,className:"bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4"},
                h('div',{className:"flex bg-gray-100 rounded-full p-1 gap-1 mb-2"},
                  h('button',{type:"button",onClick:()=>setType('particulier'),className:`flex-1 py-2.5 rounded-full text-sm font-semibold transition ${type==='particulier'?'bg-white shadow-sm text-black':'text-gray-500'}`},"Particulier"),
                  h('button',{type:"button",onClick:()=>setType('entreprise'),className:`flex-1 py-2.5 rounded-full text-sm font-semibold transition ${type==='entreprise'?'bg-white shadow-sm text-black':'text-gray-500'}`},"Entreprise / Pro")),
                type==='particulier'
                  ? h('div',{className:"grid grid-cols-2 gap-3"},
                      h('input',{type:"text",placeholder:"Prénom",required:true,value:form.prenom,onChange:e=>setField('prenom',e.target.value),className:"border-2 border-gray-200 focus:border-black p-3 rounded-xl outline-none text-sm w-full"}),
                      h('input',{type:"text",placeholder:"Nom",required:true,value:form.nom,onChange:e=>setField('nom',e.target.value),className:"border-2 border-gray-200 focus:border-black p-3 rounded-xl outline-none text-sm w-full"}))
                  : h(Fragment,null,
                      h('input',{type:"text",placeholder:"Raison sociale",required:true,value:form.raisonSociale,onChange:e=>setField('raisonSociale',e.target.value),className:"w-full border-2 border-gray-200 focus:border-black p-3 rounded-xl outline-none text-sm"}),
                      h('input',{type:"text",placeholder:"SIRET — 000 000 000 00000",value:form.siret,onChange:e=>setField('siret',e.target.value),className:"w-full border-2 border-gray-200 focus:border-black p-3 rounded-xl outline-none text-sm"})),
                h('input',{type:"text",placeholder:"Adresse du site à sécuriser",required:true,value:form.adresse,onChange:e=>setField('adresse',e.target.value),className:"w-full border-2 border-gray-200 focus:border-black p-3 rounded-xl outline-none text-sm"}),
                h('div',{className:"grid grid-cols-2 gap-3"},
                  h('input',{type:"email",placeholder:"Email",required:true,value:form.email,onChange:e=>setField('email',e.target.value),className:"border-2 border-gray-200 focus:border-black p-3 rounded-xl outline-none text-sm w-full"}),
                  h('input',{type:"tel",placeholder:"+33 6 00 00 00 00",required:true,value:form.tel,onChange:e=>setField('tel',e.target.value),className:"border-2 border-gray-200 focus:border-black p-3 rounded-xl outline-none text-sm w-full"})),
                h('div',null,
                  h('p',{className:"text-xs font-bold tracking-widest uppercase text-gray-400 mb-2"},"Service souhaité"),
                  h('div',{className:"grid grid-cols-1 gap-2"},
                    ['Audit sécurité'].map(s=>
                      h('button',{key:s,type:"button",onClick:()=>setService(s),className:`text-sm text-left px-4 py-3 rounded-xl border-2 font-medium transition ${service===s?'border-red-600 bg-red-50 text-red-700':'border-gray-200 text-gray-600 hover:border-gray-400'}`},s)))),
                h('textarea',{rows:"3",placeholder:"Informations complémentaires (surface, nb caméras, délai...)",value:form.infos,onChange:e=>setField('infos',e.target.value),className:"w-full border-2 border-gray-200 focus:border-black p-3 rounded-xl outline-none text-sm resize-none"}),
                error && h('p',{className:"text-sm text-red-600 bg-red-50 p-3 rounded-xl"},error),
                h('button',{type:"submit",disabled:sending,className:`w-full bg-red-600 hover:bg-black text-white py-4 rounded-full font-semibold transition text-sm flex items-center justify-center gap-2 ${sending?'opacity-60 cursor-not-allowed':''}`},
                  sending
                    ? h('span',null,"Envoi en cours...")
                    : h(Fragment,null,
                        h('svg',{xmlns:"http://www.w3.org/2000/svg",width:15,height:15,viewBox:"0 0 24 24",fill:"none",stroke:"#fff",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},
                          h('line',{x1:"22",y1:"2",x2:"11",y2:"13"}),h('polygon',{points:"22 2 15 22 11 13 2 9 22 2"})),
                        "Recevoir mon devis gratuit")),
                h('p',{className:"text-xs text-gray-400 text-center"},"Sans engagement — Étude personnalisée offerte")))),
      h(Footer));
  };

  /* ══════════════════════════
     PAGE : MENTIONS LÉGALES
  ══════════════════════════ */
  const LegalPage = () => {
    const Section = ({title, children}) => h('div', {className: "mb-10"},
      h('h2', {className: "text-xl font-bold mb-3 pb-2 border-b border-gray-200"}, title),
      h('div', {className: "text-gray-600 leading-relaxed space-y-2"}, children)
    );
    return h('div', null,
      h('div', {className: "pt-28 pb-20 max-w-3xl mx-auto px-6"},
        h('h1', {className: "text-3xl font-bold mb-2"}, "Mentions légales – Alarmvision"),
        h('p', {className: "text-gray-400 text-sm mb-10"}, "Dernière mise à jour : janvier 2026"),
        h(Section, {title: "1. Éditeur du site"},
          h('p', null, "Le présent site internet ", h('a', {href: "http://www.alarmvision.fr", className: "text-red-600 hover:underline"}, "www.alarmvision.fr"), " est édité par ", h('strong', null, "Alarmvision"), ", entreprise spécialisée dans l'installation de systèmes de vidéosurveillance, alarmes et solutions de sécurité pour particuliers et professionnels."),
          h('p', null, "Email : ", h('a', {href: "mailto:contact@alarmvision.fr", className: "text-red-600 hover:underline"}, "contact@alarmvision.fr"))),
        h(Section, {title: "2. Hébergement"},
          h('p', null, "Le site est hébergé par :"),
          h('p', null, h('strong', null, "OVH SAS"), " – 2 rue Kellermann, 59100 Roubaix, France"),
          h('p', null, "Site internet : ", h('a', {href: "http://www.ovhcloud.com", className: "text-red-600 hover:underline"}, "www.ovhcloud.com"))),
        h(Section, {title: "3. Propriété intellectuelle"},
          h('p', null, "Le site internet ", h('a', {href: "http://www.alarmvision.fr", className: "text-red-600 hover:underline"}, "www.alarmvision.fr"), " ainsi que l'ensemble de ses contenus sont protégés par les dispositions du Code de la Propriété Intellectuelle."),
          h('p', null, "Sauf mention contraire, ces éléments sont la propriété exclusive de ", h('strong', null, "Alarmvision"), " ou font l'objet d'un droit d'utilisation autorisé."),
          h('p', null, "Toute reproduction, représentation, diffusion, modification, adaptation ou exploitation totale ou partielle, sans autorisation écrite préalable, est strictement interdite.")),
        h(Section, {title: "4. Responsabilité"},
          h('p', null, h('strong', null, "Alarmvision"), " met tout en œuvre pour assurer l'exactitude et la mise à jour des informations diffusées sur ce site."),
          h('p', null, "Toutefois, l'entreprise ne saurait garantir l'absence d'erreurs, d'omissions ou d'indisponibilité temporaire du site."),
          h('p', null, "L'utilisateur reconnaît utiliser les informations du site sous sa responsabilité exclusive.")),
        h(Section, {title: "5. Données personnelles & RGPD"},
          h('p', null, "Les données à caractère personnel collectées sur ce site font l'objet d'un traitement informatique réalisé par ", h('strong', null, "Alarmvision"), "."),
          h('p', null, "Conformément au Règlement Général sur la Protection des Données (RGPD – UE 2016/679) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et de portabilité de vos données."),
          h('p', null, "Pour exercer ces droits, contactez-nous : ", h('a', {href: "mailto:contact@alarmvision.fr", className: "text-red-600 hover:underline"}, "contact@alarmvision.fr"))),
        h(Section, {title: "6. Cookies"},
          h('p', null, "Ce site peut utiliser des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire ou de traçage tiers n'est installé sans votre consentement."),
          h('p', null, "En continuant à naviguer sur ce site, vous acceptez l'utilisation de ces cookies techniques.")),
        h(Section, {title: "7. Droit applicable"},
          h('p', null, "Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents."))),
      h(Footer));
  };

  /* ══════════════════════════
     PAGE : CGV
  ══════════════════════════ */
  const CGVPage = () => {
    const Section = ({title, children}) => h('div', {className: "mb-10"},
      h('h2', {className: "text-xl font-bold mb-3 pb-2 border-b border-gray-200"}, title),
      h('div', {className: "text-gray-600 leading-relaxed space-y-2"}, children)
    );
    return h('div', null,
      h('div', {className: "pt-28 pb-20 max-w-3xl mx-auto px-6"},
        h('h1', {className: "text-3xl font-bold mb-2"}, "Conditions Générales de Vente"),
        h('p', {className: "text-gray-400 text-sm mb-10"}, "Dernière mise à jour : janvier 2026"),
        h(Section, {title: "1. Objet"},
          h('p', null, "Les présentes Conditions Générales de Vente (CGV) s'appliquent à toutes les prestations de services et ventes de produits réalisées par ", h('strong', null, "Alarmvision"), " auprès de ses clients."),
          h('p', null, "Toute commande implique l'acceptation sans réserve des présentes CGV.")),
        h(Section, {title: "2. Prestations"},
          h('p', null, "Alarmvision propose notamment :"),
          h('ul', {className: "list-disc pl-6 space-y-1 mt-1"},
            h('li', null, "audit sécurité ;"),
            h('li', null, "installation de systèmes de vidéosurveillance ;"),
            h('li', null, "installation d'alarmes anti-intrusion ;"),
            h('li', null, "contrôle d'accès ;"),
            h('li', null, "maintenance et SAV."))),
        h(Section, {title: "3. Devis et commande"},
          h('p', null, "Tout devis est établi gratuitement et reste valable 30 jours à compter de sa date d'émission."),
          h('p', null, "La commande est ferme à réception du devis signé avec la mention « Bon pour accord ».")),
        h(Section, {title: "4. Tarifs"},
          h('p', null, "Les prix sont indiqués en euros TTC. Alarmvision se réserve le droit de modifier ses tarifs à tout moment."),
          h('p', null, "Le prix définitif est celui figurant sur le devis signé par le client.")),
        h(Section, {title: "5. Modalités de paiement"},
          h('p', null, "Sauf accord contraire mentionné sur le devis :"),
          h('ul', {className: "list-disc pl-6 space-y-1 mt-1"},
            h('li', null, "30 % à la signature du devis ;"),
            h('li', null, "solde à la livraison / fin d'installation.")),
          h('p', null, "En cas de retard de paiement, des pénalités de retard seront appliquées conformément à la réglementation en vigueur.")),
        h(Section, {title: "6. Conditions d'intervention"},
          h('p', null, "Le client s'engage à fournir un accès libre et sécurisé aux zones d'intervention à la date et à l'heure convenues."),
          h('p', null, "Si l'intervention est rendue impossible du fait du client (absence, accès impossible, installation électrique défaillante, refus de dernière minute), des frais de déplacement ou de reprogrammation pourront être facturés.")),
        h(Section, {title: "7. Délais d'installation"},
          h('p', null, "Les délais communiqués sont donnés à titre indicatif. Alarmvision ne pourra être tenue responsable d'un retard lié notamment à :"),
          h('ul', {className: "list-disc pl-6 space-y-1 mt-1"},
            h('li', null, "indisponibilité du client ;"),
            h('li', null, "rupture fournisseur ;"),
            h('li', null, "intempéries ;"),
            h('li', null, "panne technique ;"),
            h('li', null, "force majeure ;"),
            h('li', null, "difficulté imprévue sur site."))),
        h(Section, {title: "8. Droit de rétractation (clients particuliers)"},
          h('p', null, "Lorsque le contrat est conclu à distance (internet, téléphone) ou hors établissement, le client particulier dispose, sauf exception légale, d'un délai de ", h('strong', null, "14 jours"), " pour exercer son droit de rétractation.")),
        h(Section, {title: "9. Annulation / Report"},
          h('p', null, "Toute annulation moins de ", h('strong', null, "48 heures"), " avant le rendez-vous peut entraîner la facturation de frais de déplacement ou d'organisation.")),
        h(Section, {title: "10. Garantie et matériel"},
          h('p', null, "Le matériel fourni bénéficie de la garantie légale applicable ainsi que, le cas échéant, de la garantie fabricant."),
          h('p', null, "La garantie ne couvre pas : casse volontaire ou accidentelle, mauvaise utilisation, modification par un tiers, surtension électrique, dégâts liés à l'humidité, incendie, vol ou catastrophe.")),
        h(Section, {title: "11. Responsabilité"},
          h('p', null, "Alarmvision est tenue à une obligation de moyens et non de résultat absolu. La responsabilité de Alarmvision est limitée au montant de la prestation facturée, sauf faute lourde ou disposition légale contraire.")),
        h(Section, {title: "12. Maintenance / SAV"},
          h('p', null, "Toute demande de dépannage ou de maintenance postérieure à l'installation pourra faire l'objet d'un devis, d'un contrat d'entretien, ou d'une facturation au forfait / heure. Les déplacements SAV hors garantie peuvent être facturés.")),
        h(Section, {title: "13. Données personnelles"},
          h('p', null, "Les informations collectées sont utilisées uniquement pour établir les devis, gérer les rendez-vous, assurer le suivi client, répondre aux demandes."),
          h('p', null, "Les données sont traitées conformément à la réglementation RGPD."),
          h('p', null, "Contact : ", h('a', {href: "mailto:contact@alarmvision.fr", className: "text-red-600 hover:underline"}, "contact@alarmvision.fr"))),
        h(Section, {title: "14. Force majeure"},
          h('p', null, "Alarmvision ne pourra être tenue responsable d'un manquement causé par un événement imprévisible et extérieur.")),
        h(Section, {title: "15. Litiges et droit applicable"},
          h('p', null, "Les présentes CGV sont soumises au droit français. En cas de litige, les parties rechercheront une solution amiable prioritairement.")),
        h(Section, {title: "16. Acceptation"},
          h('p', null, "Toute signature de devis, validation écrite ou commande vaut acceptation sans réserve des présentes Conditions Générales de Vente."))),
      h(Footer));
  };

  /* ══════════════════════════
     APP ROUTER
  ══════════════════════════ */
  function App(){
    const page = PAGE_FROM_HTML;
    return h(Fragment,null,
      h(Navbar),
      h('main',null,
        page==='home'     && h(HomePage),
        page==='tech'     && h(TechPage),
        page==='services' && h(ServicesPage),
        page==='contact'  && h(ContactPage),
        page==='devis'    && h(DevisPage),
        page==='legal'    && h(LegalPage),
        page==='cgv'      && h(CGVPage)),
      h(SavBadge),
      h(BottomNav));
  }

  ReactDOM.createRoot(document.getElementById('root')).render(h(App));
})();
