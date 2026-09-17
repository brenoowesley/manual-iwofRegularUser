import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  Clock3,
  ExternalLink,
  Filter,
  Grid2X2,
  Landmark,
  LayoutDashboard,
  LifeBuoy,
  Menu,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Store,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

type Module = {
  id: string;
  eyebrow: string;
  title: string;
  short: string;
  description: string;
  tone: string;
  icon: typeof LayoutDashboard;
  route: string;
  duration: string;
  steps: string[];
  tip: string;
  details: { title: string; body: string }[];
};

const modules: Module[] = [
  {
    id: "dashboard",
    eyebrow: "VisÃ£o geral",
    title: "Dashboard",
    short: "Acompanhe o dia do comeÃ§o ao fim.",
    description: "Use esta tela para monitorar turnos de forma proativa. O botÃ£o Requer AÃ§Ã£o chamarÃ¡ sua atenÃ§Ã£o para turnos prestes a comeÃ§ar ou atrasos, permitindo rÃ¡pida resoluÃ§Ã£o, check-in e encerramentos.",
    tone: "blue",
    icon: LayoutDashboard,
    route: "/",
    duration: "4 min",
    steps: ["Verifique o botÃ£o Requer AÃ§Ã£o: ele acende quando hÃ¡ pendÃªncias urgentes.", "Clique no botÃ£o para filtrar rapidamente Atrasos e PrÃ³ximos InÃ­cios.", "Para seguir normalmente, busque a vaga, faÃ§a o Check-in e confirme a foto.", "No final, clique em Avaliar e ForÃ§ar encerramento."],
    tip: "Deixe o sistema atuar como seu co-piloto. Se houver o botÃ£o vermelho Requer AÃ§Ã£o, trate essas urgÃªncias primeiro antes de verificar o restante da operaÃ§Ã£o.",
    details: [
      { title: "Fluxo de Badges: Requer AÃ§Ã£o", body: "Sempre que existirem trabalhadores pendentes (prÃ³ximos do inÃ­cio ou atrasados), um botÃ£o vermelho no topo alertarÃ¡ vocÃª. As vagas especÃ­ficas tambÃ©m recebem uma tag vermelha indicando os minutos de atraso." },
      { title: "Tratativa de Atrasos", body: "Ao clicar em Requer AÃ§Ã£o, vocÃª verÃ¡ uma tela limpa, categorizada. LÃ¡, vocÃª pode contatar rapidamente o profissional ou registrar a Falta, o que pode bloquear o trabalhador por 15 dias." },
      { title: "Como terminar o turno", body: "Depois que o trabalho acabar, clique em Avaliar, dÃª uma nota de 1 a 5 com uma observaÃ§Ã£o curta e confirme. Em seguida, clique em ForÃ§ar encerramento para fechar as horas." },
    ],
  },

  {
    id: "agendamentos",
    eyebrow: "Acompanhamento",
    title: "Agendamentos",
    short: "Veja quem foi marcado e bloqueie acessos quando necessÃ¡rio.",
    description: "Consulte as pessoas marcadas para trabalhar, acompanhe o histÃ³rico e, quando houver um problema de conduta ou desempenho, bloqueie o trabalhador.",
    tone: "mint",
    icon: ClipboardList,
    route: "/agendamentos",
    duration: "5 min",
    steps: ["Escolha a data de inÃ­cio e a data de fim.", "Busque pelo nome e abra o agendamento da pessoa.", "Leia o histÃ³rico e clique em Bloquear apenas quando necessÃ¡rio."],
    tip: "Bloquear Ã© uma aÃ§Ã£o importante. Use somente quando houver orientaÃ§Ã£o da gestÃ£o e uma ocorrÃªncia registrada.",
    details: [
      { title: "Os quatro indicadores", body: "Total de Agendamentos mostra o volume do perÃ­odo; Em andamento indica turnos ativos; Realizados mostra o que foi finalizado; Faltas registra ausÃªncias." },
      { title: "Como bloquear", body: "Busque o nome, abra o perfil ou agendamento e use Bloquear no final da tela. O bloqueio deve seguir a orientaÃ§Ã£o da gestÃ£o." },
    ],
  },
  {
    id: "loja",
    eyebrow: "Contexto",
    title: "Troca de loja",
    short: "Escolha em qual loja vocÃª estÃ¡ trabalhando.",
    description: "Se vocÃª tiver acesso a mais de uma loja, escolha aqui qual delas quer consultar antes de criar ou alterar qualquer informaÃ§Ã£o.",
    tone: "rose",
    icon: Store,
    route: "menu lateral",
    duration: "2 min",
    steps: ["Clique no nome da loja no menu Ã  esquerda.", "Escolha a loja desejada na lista.", "Confira se o nome mudou antes de continuar."],
    tip: "Sempre confira o nome da loja. Uma troca de loja muda as informaÃ§Ãµes que aparecem nas outras telas.",
    details: [
      { title: "Por que isso importa", body: "Cada loja pode ter vagas, pessoas e valores diferentes. Por isso, a plataforma sempre mostra o nome da loja escolhida." },
      { title: "Um hÃ¡bito importante", body: "Olhe o nome da loja antes de adicionar uma vaga, consultar valores ou convidar alguÃ©m para acessar a plataforma." },
    ],
  },
  {
    id: "perfil",
    eyebrow: "Sua conta",
    title: "Perfil",
    short: "Cuide do acesso e da seguranÃ§a.",
    description: "Confira seus dados pessoais, o tipo de usuÃ¡rio, a loja ativa e altere sua senha quando necessÃ¡rio.",
    tone: "ink",
    icon: UserRound,
    route: "/perfil",
    duration: "3 min",
    steps: ["Revise seus dados pessoais.", "Confirme seu tipo de usuÃ¡rio e loja.", "Use Alterar senha para manter o acesso protegido."],
    tip: "Nunca compartilhe sua senha. Ao finalizar em um dispositivo compartilhado, use Fazer logout.",
    details: [
      { title: "InformaÃ§Ãµes pessoais", body: "O perfil reÃºne nome, e-mail, telefone, endereÃ§o, tipo de usuÃ¡rio e loja selecionada em uma Ãºnica visÃ£o." },
      { title: "SeguranÃ§a", body: "Altere sua senha sempre que houver suspeita de acesso indevido e encerre a sessÃ£o em equipamentos compartilhados." },
    ],
  },
];

const toneClass: Record<string, string> = {
  blue: "tone-blue",
  lilac: "tone-lilac",
  mint: "tone-mint",
  peach: "tone-peach",
  rose: "tone-rose",
  navy: "tone-navy",
  ink: "tone-ink",
  sky: "tone-sky",
};

function RealScreen({ module }: { module: Module }) {
  const path = module.route.startsWith("/") ? module.route : "/";
  const isBookings = module.id === "agendamentos";
  const isProfile = module.id === "perfil";
  const isDashboard = module.id === "dashboard";
  const title = isBookings ? "Agendamentos" : isProfile ? "Perfil" : module.title;
  return (
    <div className="real-screen-wrap">
      <div className="real-screen-bar"><span className="real-dot red" /><span className="real-dot yellow" /><span className="real-dot green" /><span className="real-address">cliente.iwof.com.br{path}</span><a href={`https://cliente.iwof.com.br${path}`} target="_blank" rel="noreferrer" aria-label="Abrir tela real em nova aba"><ExternalLink size={13} /></a></div>
      <div className="real-screen platform-capture">
        <aside className="capture-sidebar"><strong>iWof</strong><span className={isDashboard ? "capture-active" : ""}>âŒ‚ Dashboard</span><span className={isBookings ? "capture-active" : ""}>â–¤ Agendamentos</span><i /><span>â–± iWof Loja 1ã€€â€º</span><span className={isProfile ? "capture-active" : ""}>â™™ Perfil</span></aside>
        <div className="capture-main"><div className="capture-top"><span>Hoje, 17 de setembro de 2026</span><b>BR</b></div><div className="capture-body"><div className="capture-title"><div><h4>{title}</h4><p>{isBookings ? "Consulte e gerencie os agendamentos da loja iWof Loja 1." : isProfile ? "Gerencie suas informaÃ§Ãµes pessoais e configuraÃ§Ãµes da conta." : "Acompanhe as vagas e a presenÃ§a da sua equipe."}</p></div>{isDashboard && <button className="flex items-center gap-1 bg-red-50 border border-red-200 text-red-600 font-bold px-2 py-1.5 rounded text-[8px] pointer-events-none" style={{ marginTop: '-4px' }}>Requer AÃ§Ã£o<span className="bg-red-600 text-white rounded-full px-1.5 py-0.5 text-[6px] ml-1">2</span></button>}</div>
          {isProfile ? <div className="capture-profile"><div><small>INFORMAÃ‡Ã•ES PESSOAIS</small><strong>Nome completo<br /><em>Breno</em></strong><strong>E-mail<br /><em>breno@iwof.com.br</em></strong></div><div><small>SEGURANÃ‡A</small><strong>Senhaã€€â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢</strong><b className="capture-outline">Alterar senha</b></div></div> : <><div className="capture-filters"><span>InÃ­cioã€€ 01/09/2026</span><span>Fimã€€ 26/09/2026</span><span>{isBookings ? "Todasã€€ FunÃ§Ã£o" : "Todas as funÃ§Ãµes"}</span></div><div className="capture-cards"><b><small>{isBookings ? "Total de Agendamentos" : isDashboard ? "Vagas do dia" : "Vagas disponÃ­veis"}</small><strong>{isBookings ? "0" : isDashboard ? "67" : "2.486"}</strong></b><b><small>{isBookings ? "Em andamento" : isDashboard ? "Presentes" : "Vagas ocupadas"}</small><strong className={isDashboard ? "text-green-600" : ""}>{isBookings ? "0" : isDashboard ? "29" : "0"}</strong></b><b><small>{isBookings ? "Realizados" : isDashboard ? "Pendentes" : "Total de vagas"}</small><strong className={isDashboard ? "text-orange-500" : ""}>{isBookings ? "0" : isDashboard ? "38" : "0"}</strong></b></div>
          {isDashboard ? (
            <div className="mt-4 bg-white border border-slate-200 rounded overflow-hidden shadow-sm">
              <div className="grid grid-cols-4 gap-2 px-3 py-2 bg-slate-50 border-b border-slate-100 text-[6px] font-bold text-slate-400 uppercase tracking-wider"><div>Vaga / HorÃ¡rio</div><div className="text-center">Programados</div><div className="text-center">Presentes</div><div className="text-center">Pendentes</div></div>
              <div className="grid grid-cols-4 gap-2 px-3 py-2 border-b border-slate-100 items-center hover:bg-slate-50 transition-colors">
                <div><div className="font-bold text-slate-700 text-[7.5px]">Balconista de Frios</div><div className="text-[6px] text-slate-500 mt-0.5">08:00 - 14:00</div></div>
                <div className="text-center font-bold text-[7px] text-slate-600">2</div><div className="text-center font-bold text-[7px] text-green-500">2</div><div className="text-center font-bold text-[7px] text-orange-400">0</div>
              </div>
              <div className="grid grid-cols-4 gap-2 px-3 py-2 border-b border-slate-100 items-center bg-red-50/50 hover:bg-red-50 transition-colors">
                <div>
                  <div className="font-bold text-slate-700 text-[7.5px]">Repositor</div>
                  <div className="text-[6px] text-slate-500 mt-0.5">08:00 - 14:00</div>
                  <div className="text-[6px] text-red-600 mt-1 font-bold flex items-center gap-0.5"><svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Atrasado (240 min)</div>
                </div>
                <div className="text-center font-bold text-[7px] text-slate-600">4</div><div className="text-center font-bold text-[7px] text-green-500">3</div><div className="text-center font-bold text-[7px] text-orange-400">1</div>
              </div>
            </div>
          ) : (
            <div className="capture-table"><span>{isBookings ? "Nomeã€€ FunÃ§Ã£oã€€ Dataã€€ HorÃ¡rioã€€ Status" : "Resumo da operaÃ§Ã£o da loja"}</span><i /><i /><i /><i /></div>
          )}
          </>}
        </div></div>
      </div>
      <div className="real-screen-fallback"><span>Esta Ã© a tela da operaÃ§Ã£o iWof. Os campos seguem a plataforma.</span><a href={`https://cliente.iwof.com.br${path}`} target="_blank" rel="noreferrer">Abrir no sistema <ExternalLink size={13} /></a></div>
    </div>
  );
}

function AppLogo() {
  return <div className="brand-lockup"><div className="brand-mark">i<span>W</span>of</div><span className="brand-rule">manual interativo</span></div>;
}

export default function Home() {
  const [activeId, setActiveId] = useState("dashboard");
  const [completed, setCompleted] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState<number | null>(0);

  const active = modules.find((item) => item.id === activeId) ?? modules[0];
  const activeIndex = modules.findIndex((item) => item.id === active.id);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return modules;
    return modules.filter((item) => `${item.title} ${item.short} ${item.description} ${item.eyebrow}`.toLowerCase().includes(normalized));
  }, [query]);
  const progress = Math.round((completed.length / modules.length) * 100);

  const selectModule = (id: string) => {
    setActiveId(id);
    setOpenDetail(0);
    setMobileOpen(false);
    window.setTimeout(() => document.getElementById("module-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  };

  const toggleCompleted = () => {
    setCompleted((current) => current.includes(active.id) ? current.filter((id) => id !== active.id) : [...current, active.id]);
  };

  const nextModule = () => {
    if (activeIndex < modules.length - 1) selectModule(modules[activeIndex + 1].id);
  };

  return (
    <div className="manual-shell">
      <header className="mobile-header">
        <AppLogo />
        <button className="icon-button" onClick={() => setMobileOpen((value) => !value)} aria-label="Abrir menu"><Menu size={20} /></button>
      </header>

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-inner">
          <div className="sidebar-head"><AppLogo /><button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Fechar menu"><X size={18} /></button></div>
          <div className="sidebar-kicker"><BookOpen size={13} /> GUIA PARA COMEÃ‡AR</div>
          <nav className="module-nav" aria-label="MÃ³dulos do manual">
            {modules.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.id === active.id;
              const isDone = completed.includes(item.id);
              return <button key={item.id} className={`nav-item ${isActive ? "nav-active" : ""}`} onClick={() => selectModule(item.id)}>
                <span className="nav-index">{isDone ? <Check size={13} /> : String(index + 1).padStart(2, "0")}</span>
                <Icon size={16} strokeWidth={isActive ? 2.4 : 1.8} />
                <span>{item.title}</span>
                {isActive && <span className="nav-pip" />}
              </button>;
            })}
          </nav>
          <div className="sidebar-bottom">
            <div className="sidebar-note"><Sparkles size={16} /><div><strong>EstÃ¡ comeÃ§ando?</strong><p>Veja primeiro o Dashboard. Ele mostra onde vocÃª estÃ¡.</p></div></div>
            <a className="platform-link" href="https://cliente.iwof.com.br/" target="_blank" rel="noreferrer">Ir para a plataforma <ExternalLink size={14} /></a>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <div className="topbar">
          <div className="breadcrumbs"><span>iWof</span><span>/</span><strong>Manual interativo</strong></div>
          <div className="topbar-actions"><span className="last-updated">Atualizado para a experiÃªncia atual</span><div className="top-avatar">BR</div></div>
        </div>

        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> BOAS-VINDAS Ã€ OPERAÃ‡ÃƒO iWOF</div>
            <h1>Aprenda no seu ritmo.<br /><em>Sem complicaÃ§Ã£o.</em></h1>
            <p className="hero-lede">VocÃª nÃ£o precisa conhecer a plataforma. Este guia explica cada tela passo a passo, com palavras simples e exemplos da rotina.</p>
            <div className="hero-cta-row"><button className="primary-button" onClick={() => selectModule("dashboard")}>ComeÃ§ar onboarding <ArrowRight size={17} /></button><span className="hero-meta"><Clock3 size={15} /> cerca de 32 min</span></div>
          </div>
          <div className="hero-art" aria-label="IlustraÃ§Ã£o abstrata do manual"><div className="art-circle circle-one" /><div className="art-circle circle-two" /><div className="art-square" /><div className="art-arc" /><div className="art-label">8 mÃ³dulos<br /><strong>um sÃ³ fluxo</strong></div><div className="art-caption">liberdade para operar<br />economia para quem precisa</div></div>
        </section>

        <section className="first-day-strip" aria-label="Primeiro dia na plataforma">
          <div className="first-day-intro"><span className="section-kicker">PRIMEIRO DIA</span><h2>VocÃª vai aprender nesta ordem</h2><p>NÃ£o precisa abrir tudo de uma vez. Siga o caminho abaixo e avance quando se sentir seguro.</p></div>
          <div className="first-day-step"><span>01</span><strong>Entender</strong><p>O que aparece no sistema e onde fica cada coisa.</p></div>
          <div className="first-day-step"><span>02</span><strong>Praticar</strong><p>Como fazer check-in, registrar uma falta e acompanhar um agendamento.</p></div>
          <div className="first-day-step"><span>03</span><strong>Operar</strong><p>Como avaliar e encerrar um turno.</p></div>
        </section>

        <section className="progress-strip">
          <div className="progress-copy"><span className="progress-label">SEU PROGRESSO</span><strong>{completed.length} de {modules.length} etapas concluÃ­das</strong></div>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div><span className="progress-number">{progress}%</span>
          <button className="reset-button" onClick={() => setCompleted([])}>reiniciar</button>
        </section>

        <section className="module-overview" id="modules">
          <div className="section-heading"><div><span className="section-kicker">COMECE POR AQUI</span><h2>O que vocÃª quer aprender?</h2><p className="section-intro">Escolha uma etapa abaixo. Se esta Ã© sua primeira vez, comece pelo Dashboard.</p></div><div className="search-wrap"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Procurar uma etapa..." aria-label="Procurar uma etapa" /></div></div>
          <div className="module-grid">
            {filtered.map((item, index) => <button className={`module-card ${item.id === active.id ? "card-active" : ""}`} key={item.id} onClick={() => selectModule(item.id)}>
              <div className="card-top"><span className={`card-icon ${toneClass[item.tone]}`}><item.icon size={19} /></span><span className="card-number">{String(modules.indexOf(item) + 1).padStart(2, "0")}</span></div>
              <div className="card-body"><span className="card-eyebrow">{item.eyebrow}</span><h3>{item.title}</h3><p>{item.short}</p></div>
              <div className="card-bottom"><span>{item.duration}</span>{completed.includes(item.id) ? <span className="done-label"><CheckCircle2 size={15} /> concluÃ­do</span> : <ArrowRight size={16} />}</div>
            </button>)}
          </div>
          {filtered.length === 0 && <div className="empty-search"><Filter size={18} /> Nenhum mÃ³dulo encontrado. Tente â€œperfilâ€ ou â€œdashboardâ€.</div>}
        </section>

        <section className="detail-layout" id="module-detail">
          <div className="detail-main">
            <div className="detail-header"><div><span className="section-kicker">ETAPA {String(activeIndex + 1).padStart(2, "0")} Â· {active.eyebrow.toUpperCase()}</span><h2>{active.title}</h2><p>{active.description}</p></div><span className={`detail-icon ${toneClass[active.tone]}`}><active.icon size={24} /></span></div>
            <div className="screen-frame"><RealScreen module={active} /><div className="screen-label"><span>tela do sistema iWof</span><strong>{active.route}</strong></div></div>
            <div className="how-to"><div className="how-heading"><div><span className="section-kicker">PASSO A PASSO</span><h3>FaÃ§a assim</h3></div><span className="time-pill"><Clock3 size={14} /> leva {active.duration}</span></div>
              <div className="steps-list">{active.steps.map((step, index) => <div className="step-row" key={step}><span className={`step-num ${toneClass[active.tone]}`}>0{index + 1}</span><span>{step}</span><CheckCircle2 size={17} className="step-check" /></div>)}</div>
            </div>
            <div className="detail-accordions">{active.details.map((detail, index) => <div className={`accordion-item ${openDetail === index ? "accordion-open" : ""}`} key={detail.title}><button onClick={() => setOpenDetail(openDetail === index ? null : index)}><span>{detail.title}</span><ChevronDown size={18} /></button>{openDetail === index && <p>{detail.body}</p>}</div>)}</div>
            <div className="detail-actions"><button className={`complete-button ${completed.includes(active.id) ? "completed" : ""}`} onClick={toggleCompleted}>{completed.includes(active.id) ? <><CheckCircle2 size={17} /> JÃ¡ aprendi esta etapa</> : <><Check size={17} /> Marcar como aprendida</>}</button><a className="secondary-button" href={`https://cliente.iwof.com.br${active.route.startsWith("/") ? active.route : "/"}`} target="_blank" rel="noreferrer">Abrir esta tela <ExternalLink size={16} /></a></div>
          </div>
          <aside className="detail-aside">
            <div className={`tip-card ${toneClass[active.tone]}`}><div className="tip-icon"><Sparkles size={17} /></div><span className="section-kicker">{active.id === "dashboard" || active.id === "agendamentos" ? "ATENÃ‡ÃƒO" : "OLHO DE QUEM OPERA"}</span><p>{active.tip}</p></div>
            <div className="next-card"><span className="section-kicker">PRÃ“XIMO PASSO</span>{activeIndex < modules.length - 1 ? <><strong>{modules[activeIndex + 1].title}</strong><p>{modules[activeIndex + 1].short}</p><button onClick={nextModule}>Continuar <ArrowRight size={16} /></button></> : <><strong>VocÃª chegou ao fim.</strong><p>Revise os mÃ³dulos que quiser e volte sempre que precisar.</p><button onClick={() => selectModule("dashboard")}><ArrowLeft size={16} /> Voltar ao inÃ­cio</button></>}</div>
          </aside>
        </section>

        <footer className="footer"><AppLogo /><span>feito para a rotina ficar mais leve.</span><span className="footer-right">iWof Â· manual de operaÃ§Ã£o</span></footer>
      </main>
    </div>
  );
}
