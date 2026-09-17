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
    eyebrow: "Visão geral",
    title: "Dashboard",
    short: "Acompanhe o dia do começo ao fim.",
    description: "Use esta tela para monitorar turnos de forma proativa. O botão Requer Ação chamará sua atenção para turnos prestes a começar ou atrasos, permitindo rápida resolução, check-in e encerramentos.",
    tone: "blue",
    icon: LayoutDashboard,
    route: "/",
    duration: "4 min",
    steps: ["Verifique o botão Requer Ação: ele acende quando há pendências urgentes.", "Clique no botão para filtrar rapidamente Atrasos e Próximos Inícios.", "Para seguir normalmente, busque a vaga, faça o Check-in e confirme a foto.", "No final, clique em Avaliar e Forçar encerramento."],
    tip: "Deixe o sistema atuar como seu co-piloto. Se houver o botão vermelho Requer Ação, trate essas urgências primeiro antes de verificar o restante da operação.",
    details: [
      { title: "Fluxo de Badges: Requer Ação", body: "Sempre que existirem trabalhadores pendentes (próximos do início ou atrasados), um botão vermelho no topo alertará você. As vagas específicas também recebem uma tag vermelha indicando os minutos de atraso." },
      { title: "Tratativa de Atrasos", body: "Ao clicar em Requer Ação, você verá uma tela limpa, categorizada. Lá, você pode contatar rapidamente o profissional ou registrar a Falta, o que pode bloquear o trabalhador por 15 dias." },
      { title: "Como terminar o turno", body: "Depois que o trabalho acabar, clique em Avaliar, dê uma nota de 1 a 5 com uma observação curta e confirme. Em seguida, clique em Forçar encerramento para fechar as horas." },
    ],
  },
  {
    id: "vagas",
    eyebrow: "Planejamento",
    title: "Vagas",
    short: "Cadastre os trabalhos disponíveis.",
    description: "Aqui você cria as vagas de trabalho e encontra uma vaga já cadastrada usando filtros simples, como função, horário e data.",
    tone: "lilac",
    icon: BriefcaseBusiness,
    route: "/vagas",
    duration: "7 min",
    steps: ["Clique em + Adicionar vaga.", "Escolha o Assistente para escrever o que precisa ou use o formulário padrão.", "Revise Função, Sexo, Período, Escalas e Quantidade e clique em Publicar vaga."],
    tip: "Você não precisa preencher todos os filtros. Comece pelo que você sabe, como a data ou o nome da função.",
    details: [
      { title: "Assistente ou formulário?", body: "No Assistente, escreva algo como: 'Preciso de 5 embaladores para domingo das 08h às 14h'. No formulário, escolha repetição, função, sexo, período, escala e quantidade." },
      { title: "Antes de publicar", body: "Confira principalmente data, horário, quantidade e função. Depois de revisar, clique em Publicar vaga para disponibilizar o trabalho." },
    ],
  },
  {
    id: "agendamentos",
    eyebrow: "Acompanhamento",
    title: "Agendamentos",
    short: "Veja quem foi marcado e bloqueie acessos quando necessário.",
    description: "Consulte as pessoas marcadas para trabalhar, acompanhe o histórico e, quando houver um problema de conduta ou desempenho, bloqueie o trabalhador.",
    tone: "mint",
    icon: ClipboardList,
    route: "/agendamentos",
    duration: "5 min",
    steps: ["Escolha a data de início e a data de fim.", "Busque pelo nome e abra o agendamento da pessoa.", "Leia o histórico e clique em Bloquear apenas quando necessário."],
    tip: "Bloquear é uma ação importante. Use somente quando houver orientação da gestão e uma ocorrência registrada.",
    details: [
      { title: "Os quatro indicadores", body: "Total de Agendamentos mostra o volume do período; Em andamento indica turnos ativos; Realizados mostra o que foi finalizado; Faltas registra ausências." },
      { title: "Como bloquear", body: "Busque o nome, abra o perfil ou agendamento e use Bloquear no final da tela. O bloqueio deve seguir a orientação da gestão." },
    ],
  },
  {
    id: "loja",
    eyebrow: "Contexto",
    title: "Troca de loja",
    short: "Escolha em qual loja você está trabalhando.",
    description: "Se você tiver acesso a mais de uma loja, escolha aqui qual delas quer consultar antes de criar ou alterar qualquer informação.",
    tone: "rose",
    icon: Store,
    route: "menu lateral",
    duration: "2 min",
    steps: ["Clique no nome da loja no menu à esquerda.", "Escolha a loja desejada na lista.", "Confira se o nome mudou antes de continuar."],
    tip: "Sempre confira o nome da loja. Uma troca de loja muda as informações que aparecem nas outras telas.",
    details: [
      { title: "Por que isso importa", body: "Cada loja pode ter vagas, pessoas e valores diferentes. Por isso, a plataforma sempre mostra o nome da loja escolhida." },
      { title: "Um hábito importante", body: "Olhe o nome da loja antes de adicionar uma vaga, consultar valores ou convidar alguém para acessar a plataforma." },
    ],
  },
  {
    id: "perfil",
    eyebrow: "Sua conta",
    title: "Perfil",
    short: "Cuide do acesso e da segurança.",
    description: "Confira seus dados pessoais, o tipo de usuário, a loja ativa e altere sua senha quando necessário.",
    tone: "ink",
    icon: UserRound,
    route: "/perfil",
    duration: "3 min",
    steps: ["Revise seus dados pessoais.", "Confirme seu tipo de usuário e loja.", "Use Alterar senha para manter o acesso protegido."],
    tip: "Nunca compartilhe sua senha. Ao finalizar em um dispositivo compartilhado, use Fazer logout.",
    details: [
      { title: "Informações pessoais", body: "O perfil reúne nome, e-mail, telefone, endereço, tipo de usuário e loja selecionada em uma única visão." },
      { title: "Segurança", body: "Altere sua senha sempre que houver suspeita de acesso indevido e encerre a sessão em equipamentos compartilhados." },
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
  const isJobs = module.id === "vagas";
  const isBookings = module.id === "agendamentos";
  const isProfile = module.id === "perfil";
  const isDashboard = module.id === "dashboard";
  const title = isJobs ? "Vagas" : isBookings ? "Agendamentos" : isProfile ? "Perfil" : module.title;
  return (
    <div className="real-screen-wrap">
      <div className="real-screen-bar"><span className="real-dot red" /><span className="real-dot yellow" /><span className="real-dot green" /><span className="real-address">dev-cliente.iwof.com.br{path}</span><a href={`https://dev-cliente.iwof.com.br${path}`} target="_blank" rel="noreferrer" aria-label="Abrir tela real em nova aba"><ExternalLink size={13} /></a></div>
      <div className="real-screen platform-capture">
        <aside className="capture-sidebar"><strong>iWof</strong><span className={isDashboard ? "capture-active" : ""}>⌂ Dashboard</span><span className={isJobs ? "capture-active" : ""}>▣ Vagas</span><span className={isBookings ? "capture-active" : ""}>▤ Agendamentos</span><i /><span>▱ iWof Loja 1　›</span><span className={isProfile ? "capture-active" : ""}>♙ Perfil</span></aside>
        <div className="capture-main"><div className="capture-top"><span>Hoje, 17 de setembro de 2026</span><b>BR</b></div><div className="capture-body"><div className="capture-title"><div><h4>{title}</h4><p>{isJobs ? "Gerencie todas as vagas da loja iWof Loja 1." : isBookings ? "Consulte e gerencie os agendamentos da loja iWof Loja 1." : isProfile ? "Gerencie suas informações pessoais e configurações da conta." : "Acompanhe as vagas e a presença da sua equipe."}</p></div>{isJobs && <b className="capture-add">＋ Adicionar vaga</b>}{isDashboard && <button className="flex items-center gap-1 bg-red-50 border border-red-200 text-red-600 font-bold px-2 py-1.5 rounded text-[8px] pointer-events-none" style={{ marginTop: '-4px' }}>Requer Ação<span className="bg-red-600 text-white rounded-full px-1.5 py-0.5 text-[6px] ml-1">2</span></button>}</div>
          {isProfile ? <div className="capture-profile"><div><small>INFORMAÇÕES PESSOAIS</small><strong>Nome completo<br /><em>Breno</em></strong><strong>E-mail<br /><em>breno@iwof.com.br</em></strong></div><div><small>SEGURANÇA</small><strong>Senha　••••••••••</strong><b className="capture-outline">Alterar senha</b></div></div> : <><div className="capture-filters"><span>{isJobs ? "⌕ Buscar por id" : "Início　 01/09/2026"}</span><span>{isJobs ? "Todas as funções" : "Fim　 26/09/2026"}</span><span>{isJobs ? "Horário da escala" : isBookings ? "Todas　 Função" : "Todas as funções"}</span></div><div className="capture-cards"><b><small>{isBookings ? "Total de Agendamentos" : isDashboard ? "Vagas do dia" : "Vagas disponíveis"}</small><strong>{isBookings ? "0" : isDashboard ? "67" : "2.486"}</strong></b><b><small>{isBookings ? "Em andamento" : isDashboard ? "Presentes" : "Vagas ocupadas"}</small><strong className={isDashboard ? "text-green-600" : ""}>{isBookings ? "0" : isDashboard ? "29" : "0"}</strong></b><b><small>{isBookings ? "Realizados" : isDashboard ? "Pendentes" : "Total de vagas"}</small><strong className={isDashboard ? "text-orange-500" : ""}>{isBookings ? "0" : isDashboard ? "38" : "0"}</strong></b></div>
          {isDashboard ? (
            <div className="mt-4 bg-white border border-slate-200 rounded overflow-hidden shadow-sm">
              <div className="grid grid-cols-4 gap-2 px-3 py-2 bg-slate-50 border-b border-slate-100 text-[6px] font-bold text-slate-400 uppercase tracking-wider"><div>Vaga / Horário</div><div className="text-center">Programados</div><div className="text-center">Presentes</div><div className="text-center">Pendentes</div></div>
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
            <div className="capture-table"><span>{isJobs ? "Vaga　 Sexo / Certificado　 Período　 Escalas　 Quantidade" : isBookings ? "Nome　 Função　 Data　 Horário　 Status" : "Resumo da operação da loja"}</span><i /><i /><i /><i /></div>
          )}
          </>}
        </div></div>
      </div>
      <div className="real-screen-fallback"><span>Esta é a tela da operação iWof. Os campos seguem a plataforma.</span><a href={`https://dev-cliente.iwof.com.br${path}`} target="_blank" rel="noreferrer">Abrir no sistema <ExternalLink size={13} /></a></div>
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
          <div className="sidebar-kicker"><BookOpen size={13} /> GUIA PARA COMEÇAR</div>
          <nav className="module-nav" aria-label="Módulos do manual">
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
            <div className="sidebar-note"><Sparkles size={16} /><div><strong>Está começando?</strong><p>Veja primeiro o Dashboard. Ele mostra onde você está.</p></div></div>
            <a className="platform-link" href="https://dev-cliente.iwof.com.br/" target="_blank" rel="noreferrer">Ir para a plataforma <ExternalLink size={14} /></a>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <div className="topbar">
          <div className="breadcrumbs"><span>iWof</span><span>/</span><strong>Manual interativo</strong></div>
          <div className="topbar-actions"><span className="last-updated">Atualizado para a experiência atual</span><div className="top-avatar">BR</div></div>
        </div>

        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> BOAS-VINDAS À OPERAÇÃO iWOF</div>
            <h1>Aprenda no seu ritmo.<br /><em>Sem complicação.</em></h1>
            <p className="hero-lede">Você não precisa conhecer a plataforma. Este guia explica cada tela passo a passo, com palavras simples e exemplos da rotina.</p>
            <div className="hero-cta-row"><button className="primary-button" onClick={() => selectModule("dashboard")}>Começar onboarding <ArrowRight size={17} /></button><span className="hero-meta"><Clock3 size={15} /> cerca de 32 min</span></div>
          </div>
          <div className="hero-art" aria-label="Ilustração abstrata do manual"><div className="art-circle circle-one" /><div className="art-circle circle-two" /><div className="art-square" /><div className="art-arc" /><div className="art-label">8 módulos<br /><strong>um só fluxo</strong></div><div className="art-caption">liberdade para operar<br />economia para quem precisa</div></div>
        </section>

        <section className="first-day-strip" aria-label="Primeiro dia na plataforma">
          <div className="first-day-intro"><span className="section-kicker">PRIMEIRO DIA</span><h2>Você vai aprender nesta ordem</h2><p>Não precisa abrir tudo de uma vez. Siga o caminho abaixo e avance quando se sentir seguro.</p></div>
          <div className="first-day-step"><span>01</span><strong>Entender</strong><p>O que aparece no sistema e onde fica cada coisa.</p></div>
          <div className="first-day-step"><span>02</span><strong>Praticar</strong><p>Como fazer check-in, registrar uma falta e acompanhar um agendamento.</p></div>
          <div className="first-day-step"><span>03</span><strong>Operar</strong><p>Como criar uma vaga, avaliar e encerrar um turno.</p></div>
        </section>

        <section className="progress-strip">
          <div className="progress-copy"><span className="progress-label">SEU PROGRESSO</span><strong>{completed.length} de {modules.length} etapas concluídas</strong></div>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div><span className="progress-number">{progress}%</span>
          <button className="reset-button" onClick={() => setCompleted([])}>reiniciar</button>
        </section>

        <section className="module-overview" id="modules">
          <div className="section-heading"><div><span className="section-kicker">COMECE POR AQUI</span><h2>O que você quer aprender?</h2><p className="section-intro">Escolha uma etapa abaixo. Se esta é sua primeira vez, comece pelo Dashboard.</p></div><div className="search-wrap"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Procurar uma etapa..." aria-label="Procurar uma etapa" /></div></div>
          <div className="module-grid">
            {filtered.map((item, index) => <button className={`module-card ${item.id === active.id ? "card-active" : ""}`} key={item.id} onClick={() => selectModule(item.id)}>
              <div className="card-top"><span className={`card-icon ${toneClass[item.tone]}`}><item.icon size={19} /></span><span className="card-number">{String(modules.indexOf(item) + 1).padStart(2, "0")}</span></div>
              <div className="card-body"><span className="card-eyebrow">{item.eyebrow}</span><h3>{item.title}</h3><p>{item.short}</p></div>
              <div className="card-bottom"><span>{item.duration}</span>{completed.includes(item.id) ? <span className="done-label"><CheckCircle2 size={15} /> concluído</span> : <ArrowRight size={16} />}</div>
            </button>)}
          </div>
          {filtered.length === 0 && <div className="empty-search"><Filter size={18} /> Nenhum módulo encontrado. Tente “vaga”, “perfil” ou “dashboard”.</div>}
        </section>

        <section className="detail-layout" id="module-detail">
          <div className="detail-main">
            <div className="detail-header"><div><span className="section-kicker">ETAPA {String(activeIndex + 1).padStart(2, "0")} · {active.eyebrow.toUpperCase()}</span><h2>{active.title}</h2><p>{active.description}</p></div><span className={`detail-icon ${toneClass[active.tone]}`}><active.icon size={24} /></span></div>
            <div className="screen-frame"><RealScreen module={active} /><div className="screen-label"><span>tela do sistema iWof</span><strong>{active.route}</strong></div></div>
            <div className="how-to"><div className="how-heading"><div><span className="section-kicker">PASSO A PASSO</span><h3>Faça assim</h3></div><span className="time-pill"><Clock3 size={14} /> leva {active.duration}</span></div>
              <div className="steps-list">{active.steps.map((step, index) => <div className="step-row" key={step}><span className={`step-num ${toneClass[active.tone]}`}>0{index + 1}</span><span>{step}</span><CheckCircle2 size={17} className="step-check" /></div>)}</div>
            </div>
            <div className="detail-accordions">{active.details.map((detail, index) => <div className={`accordion-item ${openDetail === index ? "accordion-open" : ""}`} key={detail.title}><button onClick={() => setOpenDetail(openDetail === index ? null : index)}><span>{detail.title}</span><ChevronDown size={18} /></button>{openDetail === index && <p>{detail.body}</p>}</div>)}</div>
            <div className="detail-actions"><button className={`complete-button ${completed.includes(active.id) ? "completed" : ""}`} onClick={toggleCompleted}>{completed.includes(active.id) ? <><CheckCircle2 size={17} /> Já aprendi esta etapa</> : <><Check size={17} /> Marcar como aprendida</>}</button><a className="secondary-button" href={`https://dev-cliente.iwof.com.br${active.route.startsWith("/") ? active.route : "/"}`} target="_blank" rel="noreferrer">Abrir esta tela <ExternalLink size={16} /></a></div>
          </div>
          <aside className="detail-aside">
            <div className={`tip-card ${toneClass[active.tone]}`}><div className="tip-icon"><Sparkles size={17} /></div><span className="section-kicker">{active.id === "dashboard" || active.id === "agendamentos" ? "ATENÇÃO" : "OLHO DE QUEM OPERA"}</span><p>{active.tip}</p></div>
            <div className="next-card"><span className="section-kicker">PRÓXIMO PASSO</span>{activeIndex < modules.length - 1 ? <><strong>{modules[activeIndex + 1].title}</strong><p>{modules[activeIndex + 1].short}</p><button onClick={nextModule}>Continuar <ArrowRight size={16} /></button></> : <><strong>Você chegou ao fim.</strong><p>Revise os módulos que quiser e volte sempre que precisar.</p><button onClick={() => selectModule("dashboard")}><ArrowLeft size={16} /> Voltar ao início</button></>}</div>
          </aside>
        </section>

        <footer className="footer"><AppLogo /><span>feito para a rotina ficar mais leve.</span><span className="footer-right">iWof · manual de operação</span></footer>
      </main>
    </div>
  );
}
