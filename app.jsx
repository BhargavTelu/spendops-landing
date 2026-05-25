const { useState, useEffect, useRef } = React;

// ─── Icons ─────────────────────────────────────────────────────────
const I = {
  arrow: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  q: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-1 .8-1.5 1.3-1.5 2.3"/><path d="M12 17h.01"/></svg>,
  breakdown: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><rect x="7" y="13" width="3" height="5"/><rect x="12" y="9" width="3" height="9"/><rect x="17" y="5" width="3" height="13"/></svg>,
  alert: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>,
  report: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="14" y2="17"/></svg>,
  smallX: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 6l12 12M18 6l-12 12"/></svg>,
};

// ─── Brand mark ────────────────────────────────────────────────────
const Brand = () => (
  <div className="brand">
    <span className="brand-mark">S</span>
    <span>SpendOps AI</span>
  </div>
);

// ─── Missing-layer visual ──────────────────────────────────────────
const StackVisual = () => (
  <div className="stack" aria-hidden="true">
    <div className="stack-row">
      <div className="l">
        <span className="ix">01</span>
        <span className="nm">Total spend</span>
      </div>
      <div className="l">
        <span className="v">$31,520</span>
        <span className="ok">{I.check}</span>
      </div>
    </div>
    <div className="stack-row">
      <div className="l">
        <span className="ix">02</span>
        <span className="nm">By model</span>
      </div>
      <div className="l">
        <span className="v">openai · anthropic</span>
        <span className="ok">{I.check}</span>
      </div>
    </div>
    <div className="stack-row missing">
      <div className="l">
        <span className="ix">03</span>
        <span className="nm">By feature, team, or customer</span>
      </div>
      <div className="l">
        <span className="v">???</span>
        <span className="ok">?</span>
      </div>
    </div>
  </div>
);

// ─── Form ──────────────────────────────────────────────────────────
function Form({ count }) {
  const [submitted, setSubmitted] = useState(false);
  const [pos, setPos] = useState(0);
  const [form, setForm] = useState({ email: '', name: '', company: '', provider: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email) return;
    await fetch('https://formspree.io/f/xgoqloqd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email: form.email, name: form.name, company: form.company, provider: form.provider }),
    });
    setPos(count + Math.floor(Math.random() * 6) + 1);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="success">
        <div className="check">{I.check}</div>
        <h3>You're on the list.</h3>
        <p>You're on the list. We'll email you first when we launch.</p>
        <div className="pos">position #{pos.toLocaleString()} · founding-member perks locked in</div>
      </div>
    );
  }

  return (
    <form id="reserve-form" className="form-card" onSubmit={onSubmit}>
      <p className="title">Reserve your spot</p>
      <p className="desc">Get early access and founding-member perks when we launch.</p>

      <div className="field">
        <label htmlFor="email">Email <span className="req">*</span></label>
        <input
          id="email" type="email" required autoComplete="email"
          className="input" placeholder="cto@yourstartup.com"
          value={form.email} onChange={e => setForm({...form, email: e.target.value})}
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="name">First name<span className="opt">optional</span></label>
          <input id="name" type="text" className="input" placeholder="Alex"
            value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
        </div>
        <div className="field">
          <label htmlFor="company">Company<span className="opt">optional</span></label>
          <input id="company" type="text" className="input" placeholder="Neon AI"
            value={form.company} onChange={e => setForm({...form, company: e.target.value})}/>
        </div>
      </div>

      <div className="field">
        <label htmlFor="provider">Which provider? <span className="req">*</span></label>
        <select id="provider" className="select"
          value={form.provider} onChange={e => setForm({...form, provider: e.target.value})}>
          <option value="">Select one…</option>
          <option>OpenAI</option>
          <option>Anthropic</option>
          <option>Both</option>
          <option>Multiple (incl. Gemini, open-source)</option>
          <option>Not sure yet</option>
        </select>
      </div>

      <button type="submit" className="submit">
        Reserve your spot {I.arrow}
      </button>

      <div className="form-foot">
        No spam. Unsubscribe anytime.<br/>
        <span className="accent-badge">▲ First 50 get founding-member perks</span>
      </div>
    </form>
  );
}

// ─── Social proof strip ────────────────────────────────────────────
const Proof = ({ count }) => (
  <div className="proof" aria-label="waitlist social proof">
    <div className="avatars">
      {[
        ['SC','#2563eb'], ['MR','#7c3aed'], ['JT','#f97316'], ['AK','#16a34a'], ['LP','#0ea5e9']
      ].map(([s, c], i) => (
        <div key={i} className="a" style={{ background: c }}>{s}</div>
      ))}
    </div>
    <div className="count-text">
      <b>{count.toLocaleString()}</b> CTOs and founders are already on the waitlist
    </div>
    <span className="live">+12 today</span>
  </div>
);

// ─── Problem section ───────────────────────────────────────────────
const Problem = () => (
  <section className="block">
    <div className="h-num">01 / The problem</div>
    <h2>The pain is real - and shared.</h2>
    <blockquote className="pull">
      <q>I have no idea which AI feature is costing us what.</q>
      <cite>- common complaint from CTOs we talked to in the last 90 days</cite>
    </blockquote>
    <p>You can see your total LLM spend. You can see it broken down by model. But the moment your CFO asks <strong>which feature, team, or customer is driving it - you're guessing.</strong> And costs keep growing 40% month over month.</p>

    <div className="callouts">
      <div className="callout">
        <div className="ico">{I.smallX}</div>
        <div>
          <b>No feature breakdown</b>
          <span>Spend by model. Never by what shipped.</span>
        </div>
      </div>
      <div className="callout">
        <div className="ico">{I.smallX}</div>
        <div>
          <b>Manual finance reports</b>
          <span>Spreadsheets every month-end.</span>
        </div>
      </div>
      <div className="callout">
        <div className="ico">{I.smallX}</div>
        <div>
          <b>No budget alerts</b>
          <span>You notice when the invoice arrives.</span>
        </div>
      </div>
    </div>
  </section>
);

// ─── Solution section ──────────────────────────────────────────────
const Solution = () => (
  <section className="block">
    <div className="h-num">02 / What you'll be able to do</div>
    <h2>Three things, no fluff.</h2>

    <div className="solutions">
      <div className="sol">
        <div className="s-ico">{I.breakdown}</div>
        <div>
          <b>See which feature costs what</b>
          <span>Connect your API keys. We show spend by feature, team, and customer. No manual tagging required.</span>
        </div>
      </div>
      <div className="sol">
        <div className="s-ico">{I.alert}</div>
        <div>
          <b>Get alerts before bills spike</b>
          <span>Real-time anomaly detection. Slack + email. Catch cost overruns before finance does.</span>
        </div>
      </div>
      <div className="sol">
        <div className="s-ico">{I.report}</div>
        <div>
          <b>Report to your CFO automatically</b>
          <span>Monthly board-ready PDFs. Finance gets what they need. You stop scrambling at month-end.</span>
        </div>
      </div>
    </div>
  </section>
);

// ─── How It Works section ──────────────────────────────────────────
const How = () => (
  <section className="block">
    <div className="h-num">03 / How it works</div>
    <h2>From signup to insight in 5 minutes.</h2>

    <div className="steps">
      <div className="step">
        <div className="n">1</div>
        <div>
          <b>Connect</b>
          <span>Paste your OpenAI, Anthropic, or Gemini API key - read-only billing scope.</span>
        </div>
      </div>
      <div className="step">
        <div className="n">2</div>
        <div>
          <b>Auto-tag</b>
          <span>We detect your setup and auto-tag API calls by feature, team, and customer.</span>
        </div>
      </div>
      <div className="step">
        <div className="n">3</div>
        <div>
          <b>See the breakdown</b>
          <span>Dashboard shows spend by feature, model, customer, and date. Export to CSV.</span>
        </div>
      </div>
      <div className="step">
        <div className="n">4</div>
        <div>
          <b>Set budgets</b>
          <span>Define limits per feature or customer. Get Slack alerts the moment you hit threshold.</span>
        </div>
      </div>
    </div>
  </section>
);

// ─── FAQ ───────────────────────────────────────────────────────────
const FAQ = () => (
  <section className="block">
    <div className="h-num">04 / Questions</div>
    <h2>Common questions.</h2>
    <div className="faq">
      <details open>
        <summary>When are you launching?<span className="plus"></span></summary>
        <p>About 4 weeks from now. Waitlist members get early access roughly two weeks before public launch.</p>
      </details>
      <details>
        <summary>What if I use multiple providers?<span className="plus"></span></summary>
        <p>OpenAI and Anthropic at launch. Gemini, Bedrock, and Azure OpenAI follow within 30 days. Tell us your stack in the form and we'll prioritize it.</p>
      </details>
      <details>
        <summary>Will there be a free tier?<span className="plus"></span></summary>
        <p>We're still finalizing the plan structure. Waitlist members get first access and founding-member perks when we ship - details land in your inbox at launch.</p>
      </details>
      <details>
        <summary>What happens to my API keys?<span className="plus"></span></summary>
        <p>Your keys never touch our servers. We use read-only billing tokens via each provider's API. SOC 2 Type I in progress; full details in our privacy policy.</p>
      </details>
      <details>
        <summary>Why should I join the waitlist?<span className="plus"></span></summary>
        <p>First access at launch, founding-member perks, and a direct line to the founding team during the beta - your feedback shapes what we build.</p>
      </details>
    </div>
  </section>
);

// ─── End CTA ───────────────────────────────────────────────────────
const EndCTA = () => (
  <div className="end-cta">
    <h3>Don't miss the <span className="accent">launch</span>.</h3>
    <p>We'll email you first with early access and founding-member perks. No spam.</p>
    <a href="#reserve-form" className="btn" onClick={(e) => {
      e.preventDefault();
      const el = document.getElementById('reserve-form');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 24;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setTimeout(() => document.getElementById('email')?.focus(), 400);
      }
    }}>
      Reserve your spot {I.arrow}
    </a>
  </div>
);

// ─── Sticky mobile CTA ─────────────────────────────────────────────
function StickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const form = document.getElementById('reserve-form');
      if (!form) return;
      const r = form.getBoundingClientRect();
      const past = r.bottom < 0;
      const far = window.scrollY > 700;
      setShow(past || far);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const scrollToForm = () => {
    const el = document.getElementById('reserve-form');
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setTimeout(() => document.getElementById('email')?.focus(), 400);
  };
  return (
    <button type="button" className={show ? 'sticky-cta show' : 'sticky-cta'} onClick={scrollToForm}>
      <span>Skip the LLM bill mystery →</span>
      <span className="pill-btn">Reserve {I.arrow}</span>
    </button>
  );
}

// ─── Tweaks (design-tool only, invisible in production) ────────────
function Tweaks({ t, setTweak }) {
  if (typeof TweaksPanel === 'undefined') return null;
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Color">
        <TweakColor label="Brand"
          value={t.brandColor}
          onChange={v => setTweak('brandColor', v)}
          options={['#2563eb','#0a0a0a','#16a34a','#f97316','#7c3aed']}/>
      </TweakSection>
      <TweakSection label="Hero">
        <TweakRadio label="Headline"
          value={t.headlineStyle}
          onChange={v => setTweak('headlineStyle', v)}
          options={[
            {value:'italic', label:'Italic accent'},
            {value:'plain', label:'Plain'},
          ]}/>
      </TweakSection>
      <TweakSection label="Form">
        <TweakRadio label="Style"
          value={t.formStyle}
          onChange={v => setTweak('formStyle', v)}
          options={[
            {value:'card', label:'Card'},
            {value:'soft', label:'Soft'},
            {value:'flat', label:'Flat'},
          ]}/>
        <TweakNumber label="Waitlist count" min={0} max={9999} step={1}
          value={t.waitlistCount} onChange={v => setTweak('waitlistCount', v)}/>
      </TweakSection>
      <TweakSection label="Sections">
        <TweakToggle label="Dark end-CTA"
          value={t.darkCta} onChange={v => setTweak('darkCta', v)}/>
      </TweakSection>
    </TweaksPanel>
  );
}

// ─── App ───────────────────────────────────────────────────────────
function App() {
  const [t, setTweakState] = useTweaks(window.__TWEAK_DEFAULTS__);

  useEffect(() => {
    document.body.dataset.form = t.formStyle;
    document.body.dataset.darkcta = t.darkCta ? 'true' : 'false';
    document.documentElement.style.setProperty('--brand', t.brandColor);
    document.documentElement.style.setProperty('--brand-ink', shade(t.brandColor, -0.18));
    document.documentElement.style.setProperty('--brand-soft', tint(t.brandColor, 0.88));
  }, [t.formStyle, t.darkCta, t.brandColor]);

  const headline = t.headlineStyle === 'italic'
    ? (<>Your LLM bill is a <span className="accent">black box</span>.</>)
    : (<>Your LLM bill is a black box.</>);

  return (
    <>
      <div className="page" id="top">
        <header className="nav">
          <Brand/>
          <span className="pill"><span className="dot"></span>waitlist open</span>
        </header>

        <section className="hero">
          <div className="eyebrow">finops for ai companies · launching in 4 weeks</div>
          <h1 className="headline">{headline}</h1>
          <p className="sub">
            You see total spend. You see model spend. But <strong>"which feature is burning money"</strong> - a mystery. We're building the first finance-first cost platform for AI companies.
          </p>

          <StackVisual/>

          <Form count={t.waitlistCount}/>
          <Proof count={t.waitlistCount}/>
        </section>

        <Problem/>
        <Solution/>
        <How/>
        <FAQ/>
        <EndCTA/>

        <footer className="foot">
          <div>© 2026 SpendOps AI</div>
          <div className="right">
            <a href="#">privacy</a>
            <a href="#">terms</a>
          </div>
        </footer>
      </div>

      <StickyCTA/>
      <Tweaks t={t} setTweak={setTweakState}/>
    </>
  );
}

// ─── Color helpers ─────────────────────────────────────────────────
function hexToRgb(h) {
  const x = h.replace('#','');
  const v = x.length === 3 ? x.split('').map(c => c+c).join('') : x;
  return [parseInt(v.slice(0,2),16), parseInt(v.slice(2,4),16), parseInt(v.slice(4,6),16)];
}
function rgbToHex(r,g,b){
  return '#' + [r,g,b].map(v => Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
}
function shade(hex, amt){
  const [r,g,b] = hexToRgb(hex);
  return amt < 0
    ? rgbToHex(r*(1+amt), g*(1+amt), b*(1+amt))
    : rgbToHex(r + (255-r)*amt, g + (255-g)*amt, b + (255-b)*amt);
}
function tint(hex, amt){ return shade(hex, amt); }

ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
