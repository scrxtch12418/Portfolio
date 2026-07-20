import React, { useEffect, useRef } from 'react';
import './index.css';


export default function App() {
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      const script = document.createElement('script');
      script.src = '/sarvasva_portfolio_v2.js';
      script.async = true;
      document.body.appendChild(script);
      initialized.current = true;
    }
  }, []);

  return (
    <div className="app-container boot-wrapper">
      <div>
        {/* BOOT SEQUENCE: removed from the accessibility tree after the site is revealed */}
        <div id="bootSequence" role="status" aria-label="Loading portfolio">
          <canvas id="bootRain" aria-hidden="true" />
          <div className="boot-grid" aria-hidden="true" />
          <div className="boot-interface">
            <div className="boot-kicker">SARVASVA.EXE // INITIALIZING</div>
            <div className="boot-title" data-text="SIGNAL INCOMING">SIGNAL INCOMING</div>
            <div className="boot-meter"><span id="bootMeter" /></div>
            <div className="boot-readout">
              <span id="bootStatus">DECODING VISUAL SYSTEM</span>
              <span id="bootPercent">000%</span>
            </div>
          </div>
          <div className="boot-corner boot-corner-tl">[ BOOT_01 ]</div>
          <div className="boot-corner boot-corner-br">MEMORY // 0xFF04</div>
        </div>
        {/* POSTER FRAME COORDINATE ANCHORS */}
        <div className="poster-frame-elements">
          <div style={{ position: 'fixed', top: 28, left: 28, zIndex: 9999, fontSize: 8, opacity: '0.35', color: 'var(--paper)' }}>
            SYS_LOCK // SECURE</div>
          <div style={{ position: 'fixed', top: 28, right: 28, zIndex: 9999, fontSize: 8, opacity: '0.35', color: 'var(--paper)' }}>[
            C-137 ]</div>
          <div style={{ position: 'fixed', bottom: 42, left: 28, zIndex: 9999, fontSize: 8, opacity: '0.35', color: 'var(--paper)' }}>
            SARVASVA.EXE_V2</div>
          <div style={{ position: 'fixed', bottom: 42, right: 28, zIndex: 9999, fontSize: 8, opacity: '0.35', color: 'var(--paper)' }}>?
            DETECTED</div>
        </div>
        <button id="perfToggle" onClick={(e) => { window.event = e; eval('togglePerfMode()') }}>PERF_MODE: OFF</button>
        <canvas id="cursorTrailCanvas" />
        <div id="cDot" />
        <div id="cRing" />
        <canvas id="noiseCanvas" />
        <div id="scanlines" />
        <div id="rollingLine" />
        <div id="vignette" />
        <div id="centerGlow" />
        <div id="flickerEl" />
        {/* GLOW BLOBS — repositioned to the right side (white paper background side) */}
        <div className="glow-blob" style={{ width: 340, height: 230, background: '#ff0040', '--dur': '4s', '--del': '0s', '--op': '.1', right: '15%', top: '10%' }} />
        <div className="glow-blob" style={{ width: 280, height: 210, background: '#d4ff00', '--dur': '5s', '--del': '1.5s', '--op': '.08', right: '25%', top: '45%' }} />
        <div className="glow-blob" style={{ width: 220, height: 220, background: '#00ffea', '--dur': '6s', '--del': '3s', '--op': '.08', right: '5%', bottom: '10%' }} />
        <div className="glow-blob" style={{ width: 250, height: 170, background: '#bf00ff', '--dur': '4.5s', '--del': '2s', '--op': '.1', right: '8%', top: '20%' }} />
        <div className="glow-blob" style={{ width: 200, height: 180, background: '#ff00aa', '--dur': '5.5s', '--del': '0.8s', '--op': '.08', left: '65%', top: '5%' }} />
        {/* KONAMI GAMING ARENA MODAL */}
        <div id="konami">
          <div className="k-big">ARCADE HACKER</div>
          <div className="k-sub">USE SPACEBAR OR TOUCH THE GAMEPAD TO JUMP OVER THE FIREWALLS.<br />SYS_TELEMETRY: EVADE NETWORK
            SPAM SHIELD</div>
          <div style={{ background: '#000', border: '3px solid var(--acid)', padding: 10, position: 'relative', boxShadow: '0 0 30px rgba(212,255,0,0.25)', marginBottom: 18, maxWidth: '100%', width: 640, borderRadius: 4, transform: 'rotate(-0.5deg)' }}>
            <canvas id="gameCanvas" width={600} height={200} style={{ display: 'block', background: '#050505', maxWidth: '100%', height: 'auto', margin: '0 auto', cursor: 'pointer' }} />
            <div id="gameOverScreen" style={{ position: 'absolute', inset: 0, background: 'var(--ink-rgba-92)', display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, zIndex: 100 }}>
              <div style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: 36, color: 'var(--hot)', letterSpacing: 4, textShadow: '0 0 20px var(--hot)' }}>
                SYSTEM CRASHED</div>
              <div id="finalScore" style={{ fontSize: 11, color: 'var(--paper)', letterSpacing: 1 }}>DATA PACKETS EXFILTRATED: 0
              </div>
              <button className="k-close" onClick={(e) => { window.event = e; eval('startGame()') }} style={{ fontSize: 12, padding: '6px 14px', marginTop: 5, borderColor: 'var(--acid)', color: 'var(--acid)', boxShadow: '3px 3px 0 var(--acid)' }}>REBOOT_HACK.EXE</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="k-close" onClick={(e) => { window.event = e; eval('startGame()') }} style={{ borderColor: 'var(--cyan)', color: 'var(--cyan)', boxShadow: '3px 3px 0 var(--cyan)' }}>RUN GAME</button>
            <button className="k-close" onClick={(e) => { window.event = e; eval('closeGame()') }}>CLOSE CONSOLE</button>
          </div>
        </div>
        {/* TICKER */}
        <div id="ticker">
          <div className="tick-inner">
            &nbsp;&nbsp;? SARVASVA.EXE &nbsp;|&nbsp; PENTESTER · FULL STACK · GRAPHICS DESIGNER · QUIZ HOST · PUBLIC SPEAKER
            &nbsp;|&nbsp; ???????? BA ? SECRET &nbsp;|&nbsp; WELCOME TO MY DIMENSION &nbsp;|&nbsp;
            SCROLL TO EXPLORE &nbsp;|&nbsp; ? SARVASVA.EXE &nbsp;|&nbsp; PENTESTER · FULL STACK · GRAPHICS DESIGNER · QUIZ
            HOST ·
            PUBLIC SPEAKER &nbsp;|&nbsp; ???????? BA ? SECRET &nbsp;|&nbsp; WELCOME TO MY DIMENSION
            &nbsp;|&nbsp; SCROLL TO EXPLORE &nbsp;|&nbsp;
          </div>
        </div>
        {/* NAV DOTS (right side) */}
        <div id="navDots">
          <div className="ndot active" data-lbl="HOME" onClick={(e) => { window.event = e; eval('goSec(0)') }} />
          <div className="ndot" data-lbl="ABOUT" onClick={(e) => { window.event = e; eval('goSec(1)') }} />
          <div className="ndot" data-lbl="SKILLS" onClick={(e) => { window.event = e; eval('goSec(2)') }} />
          <div className="ndot" data-lbl="PROJECTS" onClick={(e) => { window.event = e; eval('goSec(3)') }} />
          <div className="ndot" data-lbl="DESIGN" onClick={(e) => { window.event = e; eval('goSec(4)') }} />
          <div className="ndot" data-lbl="SPEAKING" onClick={(e) => { window.event = e; eval('goSec(5)') }} />
          <div className="ndot" data-lbl="QUIZ" onClick={(e) => { window.event = e; eval('goSec(6)') }} />
        </div>
        {/* NAV STRIP (bottom) */}
        <div id="navStrip">
          <button className="nsb active" onClick={(e) => { window.event = e; eval('goSec(0);setActive(this)') }}>HOME</button>
          <button className="nsb" onClick={(e) => { window.event = e; eval('goSec(1);setActive(this)') }}>ABOUT</button>
          <button className="nsb" onClick={(e) => { window.event = e; eval('goSec(2);setActive(this)') }}>SKILLS</button>
          <button className="nsb" onClick={(e) => { window.event = e; eval('goSec(3);setActive(this)') }}>PROJECTS</button>
          <button className="nsb" onClick={(e) => { window.event = e; eval('goSec(4);setActive(this)') }}>DESIGN</button>
          <button className="nsb" onClick={(e) => { window.event = e; eval('goSec(5);setActive(this)') }}>SPEAKING</button>
          <button className="nsb" onClick={(e) => { window.event = e; eval('goSec(6);setActive(this);initQ()') }}>QUIZ</button>
        </div>
        <div id="scroller">
          {/* S0: HERO (HOME) */}
          <section className="snap-sec" id="s0">
            <div className="hero-grid" style={{ flex: 1, minHeight: 0 }}>
              <div className="hero-left">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 24 }}>
                  <div className="h-name rv">
                    <span className="outline">SARVASVA</span>
                  </div>
                  <div className="h-sub rv" style={{ transitionDelay: '.1s', fontSize: 20 }}>
                    I AM A <span id="typedPosition" style={{ color: '#80ff00' }} /><span className="typing-cursor">|</span>
                  </div>
                  {/* DYNAMIC CYBER INDEX (TABLE OF CONTENTS) */}
                  <div className="toc-box rv" style={{ transitionDelay: '.18s', marginTop: 10 }}>
                    <div style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: 12, letterSpacing: 2, color: 'var(--cyan)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>¦</span> INDEX // MY DIRECTORIES
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px', fontSize: 18 }}>
                      <a href="javascript:goSec(0)"><span style={{ color: 'var(--cyan)' }}>01 //</span> HOME</a>
                      <a href="javascript:goSec(1)"><span style={{ color: 'var(--cyan)' }}>02 //</span> ABOUT</a>
                      <a href="javascript:goSec(2)"><span style={{ color: 'var(--cyan)' }}>03 //</span> SKILL</a>
                      <a href="javascript:goSec(3)"><span style={{ color: 'var(--cyan)' }}>04 //</span> PROJECTS</a>
                      <a href="javascript:goSec(4)"><span style={{ color: 'var(--cyan)' }}>05 //</span> DESIGN_GALLERY</a>
                      <a href="javascript:goSec(5)"><span style={{ color: 'var(--cyan)' }}>06 //</span> SPEAKING_HOST</a>
                      <a href="javascript:goSec(6)"><span style={{ color: 'var(--cyan)' }}>07 //</span> QUIZ_ARENA</a>
                    </div>
                  </div>
                </div>
              </div>
              {/* HERO RIGHT — PROFILE PHOTO SURROUNDED BY DYNAMIC TERMINAL DIAGNOSTIC LOGS */}
              <div className="hero-right">
                {/* Top Terminal Diagnostics */}
                <div className="term rv" style={{ margin: 0, fontSize: 8, lineHeight: '1.5', borderColor: 'var(--ink-rgba-10)', background: 'var(--ink-rgba-03)' }} data-title="Terminal Diagnostics" data-info="Diagnostic logs displaying core academic targets, active club roles, and developer traits.">
                  <div><span className="p" style={{ color: 'var(--hot)' }}>C:\SARVASVA&gt;</span> whoami</div>
                  <div className="o" style={{ color: 'var(--ink-rgba-70)' }}>? A chill dude who loves talking</div>
                  <div className="o" style={{ color: 'var(--ink-rgba-70)' }}>? Cybersec + Full-Stack + Designer</div>
                </div>
                {/* Center Photo Zone */}
                <div className="photo-zone">
                  {/* Orbiting rings */}
                  <div className="photo-decor-ring ring-outer" />
                  <div className="photo-decor-ring ring-mid" />
                  <div className="photo-decor-ring ring-inner" />
                  {/* Corner Brackets */}
                  <div className="photo-bracket bracket-tl" />
                  <div className="photo-bracket bracket-tr" />
                  <div className="photo-bracket bracket-bl" />
                  <div className="photo-bracket bracket-br" />
                  {/* Cyber Telemetry overlays */}
                  <div className="photo-telemetry tel-top-left">SYS_STATUS: ENGAGED<br />GRID_COORD: 42.88.99</div>
                  <div className="photo-telemetry tel-top-right">TRAJECTORY: STABLE<br />OPERATOR_ID: SRX_12</div>
                  <div className="photo-telemetry tel-bottom-left">CORE_TEMP: NOMINAL<br />RECEPTOR: ACTIVE</div>
                  <div className="photo-telemetry tel-bottom-right">HZ_FREQ: 2.45 GHz<br />ENCRYPTION: SHIELDED</div>
                  {/* Clickable Photo Container */}
                  <div id="profilePhotoContainer" className="photo-container rv sr" style={{ transitionDelay: '.22s', width: 300, height: 300, borderRadius: '50%', overflow: 'hidden', border: '4px solid #000', boxShadow: '4px 4px 0 var(--hot)', position: 'relative', zIndex: 2, cursor: 'pointer', margin: '0 auto' }} data-title="Personal Profile Photo" data-info="Sarvasva's verified operator portrait. Click to interact!">
                    <img src="/public/images/user_profile.png" alt="Sarvasva Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '50%' }} />
                  </div>
                  {/* Dialogue bubble */}
                  <div id="pokeDialog" className="poke-bubble" style={{ top: 20, left: '52%' }}>STOP IT!!</div>
                </div>
                {/* Bottom Terminal Diagnostics */}
                <div className="term rv" style={{ margin: 0, fontSize: 8, lineHeight: '1.5', borderColor: 'var(--ink-rgba-10)', background: 'var(--ink-rgba-03)' }} data-title="Mission Telemetry" data-info="Hacking targets, club records, and software metrics.">
                  <div><span className="p" style={{ color: 'var(--hot)' }}>C:\SARVASVA&gt;</span> cat mission.txt</div>
                  <div className="o" style={{ color: 'var(--ink-rgba-70)' }}>? Learn more, Build more, Help more :)</div>
                  <div><span className="p" style={{ color: 'var(--hot)' }}>C:\SARVASVA&gt;</span> ls ./hobbies/</div>
                  <div className="o" style={{ color: 'var(--ink-rgba-70)' }}>? Gameesss &nbsp;|&nbsp; Music &nbsp;|&nbsp; Coding
                  </div>
                </div>
                {/* Bar Stats */}
                <div className="poster-bar" style={{ background: '#000', borderTop: '2px solid var(--hot)', padding: '6px 12px' }}>
                  <div className="pb-quote rv" style={{ transitionDelay: '.3s', color: '#fff' }} data-title="Rick Sanchez Quote" data-info="Active console broadcast node.">"I'M DEVELOPER, RICK! (rick and morty fan, yes)"</div>
                  <div className="pb-right">
                    <span className="pb-hp-label">HP</span>
                    <div className="pb-track">
                      <div className="pb-fill" />
                    </div>
                    <span id="clk">00:00:00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="scroll-hint">scroll to explore <span className="sh-arr">?</span></div>
          </section>
          {/* S1: PLAYER STATS (ABOUT ME RIGHT AFTER HOME) */}
          <section className="snap-sec" id="s1">
            <div className="sec-hdr">
              <div className="sec-num">01</div>
              <div className="sec-title rv sl">PLAYER <em>STATS</em></div>
            </div>
            <div className="sec-body" style={{ padding: 3, position: 'relative' }}>
              {/* Cyber Sticker stamp */}
              <svg className="cyber-badge" style={{ top: '-22px', right: 55, transform: 'rotate(14deg)' }} viewBox="0 0 100 100" data-title="System Operator Certified Sticker" data-info="Hacker credentials initialized. System integrity check operating at 100% efficiency.">
                <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="var(--ink)" stroke="var(--acid)" strokeWidth={4} />
                <circle cx={50} cy={50} r={28} fill="none" stroke="var(--acid)" strokeDasharray="3 3" strokeWidth={2} />
                <text x={50} y={46} fontFamily="'Space Grotesk'" fontSize={10} fontWeight="bold" fill="var(--acid)" textAnchor="middle" letterSpacing={1}>SYS_OP</text>
                <text x={50} y={62} fontFamily="'Space Grotesk'" fontSize={10} fontWeight="bold" fill="var(--acid)" textAnchor="middle" letterSpacing={1}>ACTIVE</text>
              </svg>
              <div className="asplit">
                <div className="aleft">
                  {/* BRAND PERSONAL INTRODUCTION */}
                  <div className="h-intro" style={{ marginBottom: 12, fontSize: 16, lineHeight: '1.6', color: 'var(--paper-rgba-85)', background: 'var(--ink-rgba-20)', padding: '8px 12px', borderLeft: '3px solid var(--hot)' }}>
                    I am a cybersecurity enthusiast and full-stack software engineer pursuing my BE in Computer Science. I
                    specialize in penetration testing, building security tools, and automating tasks. Beyond code,
                    I build high-impact poster grids, make attractive and flashy posters for club events, and design user
                    interfaces for web applications.
                    When I am not doing those, I host quizzes and flashmobs, join debates, and connect with my peers.
                    Along with that I also enjoy playing video games, listening to music, and listening to podcasts.
                  </div>
                  <div className="statg rv">
                    <div className="stc" data-title="Graduation Quest" data-info="On track to finalize CS engineering degree layers in 2028."><span className="stbig">2028</span><span className="stsm">Graduation</span></div>
                    <div className="stc" data-title="Hacking Activity" data-info="Regularly auditing platforms and executing capture-the-flag network challenges."><span className="stbig">Goofy</span><span className="stsm">Active</span></div>
                    <div className="stc" data-title="Credentials Block" data-info="4+ global security and framework certifications acquired and validated."><span className="stbig">Thinking</span><span className="stsm">100%</span></div>
                    <div className="stc" data-title="Curiosity Curve" data-info="Hacking deep hardware loops and styling interfaces forever."><span className="stbig">8</span><span className="stsm">Curiosity</span></div>
                  </div>
                  <div style={{ height: 3, background: 'var(--paper-rgba-08)', margin: '3px 0' }} />
                  <div className="term rv" style={{ transitionDelay: '.1s' }} data-title="Clubs & Affiliations" data-info="Clubs, committees, and publicity networks.">
                    <div><span className="p">C:\SARVASVA&gt;</span> ls ./hobbies/</div>
                    <div className="o">? Gaming &nbsp;·&nbsp; Music &nbsp;·&nbsp; Coding</div>
                    <div><span className="p">C:\SARVASVA&gt;</span> whoami</div>
                    <div className="o">? A Cybersecurity Enthusiast and Full-Stack Software Engineer, pursuing my BE in
                      Computer Science.</div>
                  </div>
                  <div className="term rv" style={{ transitionDelay: '.15s' }} data-title="Professional Logs" data-info="System history: Asynchronous hardware development and prompt framework designs.">
                    <div><span className="p">C:\SARVASVA&gt;</span> cat experience.txt</div>
                    <div className="o">? DevSecOps Intern - Torsecure Cyber LLP</div>
                    <div className="o">? Jun–Aug 2026 · Penetration Testing + Framework Development + Web Design</div>
                    <div className="o">? Software Dev Intern — AIC NITTE Incubation Center</div>
                    <div className="o">? Jun–Aug 2024 · Hardware + Arduino + Prompt Engineering</div>
                  </div>
                </div>
                <div className="aright">
                  <div style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: 12, letterSpacing: 4, color: 'var(--paper-rgba-28)', marginBottom: 10 }}>
                    CERTIFICATES UNLOCKED</div>
                  <div className="certs rv">
                    <div className="cert" data-title="Google Credential" data-info="Google Cybersecurity Professional Certification. Network defense, incident response, and Unix logging.">
                      Google: Cybersecurity Foundations</div>
                    <div className="cert" data-title="TryHackMe Rank" data-info="TryHackMe Cybersecurity 101. Auditing web injection layers, active scans, and cryptos.">
                      TryHackMe: Cybersecurity 101</div>
                    <div className="cert" data-title="Hacking Badge" data-info="Ethical Hacking course by ZSecurity. Sockets, reverse proxies, and trojans.">ZSecurity:
                      Ethical Hacking From Scratch</div>
                    <div className="cert" data-title="UE5 Engine Developer" data-info="Unreal Engine Blueprint Developer certification. Compiling virtual physics nodes and 3D visual environments.">
                      Unreal Engine Blueprint Developer</div>
                  </div>
                  <div style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: 12, letterSpacing: 4, color: 'var(--paper-rgba-28)', margin: '11px 0 9px' }}>
                    OPEN TO COLLABORATE</div>
                  <div className="cbtns rv" style={{ transitionDelay: '.12s' }}>
                    <a href="mailto:sarvasva5758@gmail.com" className="cbtn" data-title="Direct Mail Connection" data-info="Send a secure connection request directly to sarvasva5758@gmail.com.">?
                      &nbsp;sarvasva5758@gmail.com<span className="arr">?</span></a>
                    <a href="https://linkedin.com/in/sarvasva-s-4470562b4" className="cbtn" target="_blank" rel="noopener" data-title="LinkedIn Hub" data-info="Connect via professional profile pathways on LinkedIn.">?
                      &nbsp;LinkedIn<span className="arr">?</span></a>
                    <a href="https://github.com/scrxtch12418" className="cbtn" target="_blank" rel="noopener" data-title="GitHub Matrix" data-info="Browse active code blocks, AI libraries, and retro script modules on GitHub.">? &nbsp;GitHub
                      / scrxtch12418<span className="arr">?</span></a>
                    <a href="tel:+918618971296" className="cbtn" data-title="Mobile Shell Direct" data-info="Dial the direct operator mobile voice pipeline at +91 861 897 1296.">? &nbsp;+91 861 897
                      1296<span className="arr">?</span></a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* S2: SKILLS */}
          <section className="snap-sec" id="s2">
            <div className="sec-hdr">
              <div className="sec-num">02</div>
              <div className="sec-title rv sl">SKILL <em>TREE</em></div>
            </div>
            <div className="sec-body">
              <div className="sg">
                <div className="sk rv" style={{ transitionDelay: '.05s' }}>
                  <div className="sk-title">CYBER / OFFENSE</div>
                  <div className="sk-list">
                    <div className="sk-item">Penetration Testing <span style={{ color: 'var(--hot)' }}>[READY]</span></div>
                    <div className="sk-item">Red Teaming <span style={{ color: 'var(--hot)' }}>[READY]</span></div>
                    <div className="sk-item">Network Engineering <span style={{ color: 'var(--hot)' }}>[READY]</span></div>
                    <div className="sk-item">LLM Security <span style={{ color: 'var(--hot)' }}>[READY]</span></div>
                    <div className="sk-item">Vulnerability Analysis <span style={{ color: 'var(--hot)' }}>[READY]</span></div>
                  </div>
                  <div className="brow">
                    <span className="badge" data-title="Exploitation Suite" data-info="Metasploit: Premier active cyber vulnerability execution framework.">TESTING</span>
                    <span className="badge" data-title="Cyber OS Platform" data-info="Kali Linux: Offensive platform for auditing hardware and software endpoints.">Kali
                      Linux</span>
                    <span className="badge" data-title="Security Standard" data-info="OWASP: Top 10 vulnerabilities auditor tracking web data breaches.">OWASP</span>
                    <span className="badge" data-title="Packet Analyzer" data-info="Wireshark: Analyzing deep network streams, protocol packets, and frame handshakes.">OSINT</span>
                  </div>
                </div>
                <div className="sk rv" style={{ transitionDelay: '.1s' }}>
                  <div className="sk-title">LANGUAGES</div>
                  <div className="sk-list">
                    <div className="sk-item">Python <span style={{ color: 'var(--acid)' }}>[READY]</span></div>
                    <div className="sk-item">JavaScript <span style={{ color: 'var(--acid)' }}>[READY]</span></div>
                    <div className="sk-item">Java <span style={{ color: 'var(--acid)' }}>[READY]</span></div>
                    <div className="sk-item">C <span style={{ color: 'var(--acid)' }}>[READY]</span></div>
                    <div className="sk-item">C# <span style={{ color: 'var(--acid)' }}>[READY]</span></div>
                  </div>
                  <div className="brow">
                    <span className="badge" data-title="Backend JS" data-info="Node.js: High-performance V8 runtime executing scalable backend servers.">REACH.JS</span>
                    <span className="badge" data-title="Server Router" data-info="Express: Clean routing architecture handling client APIs and REST requests.">EXPRESS</span>
                    <span className="badge" data-title="API Architecture" data-info="REST API: Building standard JSON endpoints for instant network data delivery.">REST
                      API</span>
                  </div>
                </div>
                <div className="sk rv" style={{ transitionDelay: '.15s' }}>
                  <div className="sk-title">DESIGN</div>
                  <div className="sk-list">
                    <div className="sk-item">Canva <span style={{ color: 'var(--cyan)' }}>[READY]</span></div>
                    <div className="sk-item">Lightroom <span style={{ color: 'var(--cyan)' }}>[READY]</span></div>
                    <div className="sk-item">Content Writing <span style={{ color: 'var(--cyan)' }}>[READY]</span></div>
                    <div className="sk-item">Typography <span style={{ color: 'var(--cyan)' }}>[READY]</span></div>
                  </div>
                  <div className="brow">
                    <span className="badge" data-title="Creative Agency" data-info="Grey Matter QDC: Leading graphic campaigns and orchestrating massive stage quizzes.">UI
                      DESIGNING</span>
                    <span className="badge" data-title="National Tech Fest" data-info="Incridea '26: Designing the visual identity pack and co-hosting major stage tracks.">POSTER
                      DESIGNING</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* S3: PROJECTS (QUEST LOG WITH GITHUB REDIRECTS) */}
          <section className="snap-sec" id="s3">
            <div className="sec-hdr">
              <div className="sec-num">03</div>
              <div className="sec-title rv sl">QUEST <em>LOG</em></div>
            </div>
            <div className="sec-body" style={{ position: 'relative' }}>
              {/* Cyber Stamp sticker */}
              <svg className="cyber-badge" style={{ top: '-24px', right: 50, transform: 'rotate(-8deg)' }} viewBox="0 0 100 100" data-title="Code exfiltrator badge" data-info="Quest Log verified blocks. 100% of repositories successfully deployed and compiled.">
                <circle cx={50} cy={50} r={42} fill="var(--ink)" stroke="var(--cyan)" strokeWidth={4} />
                <polygon points="50,15 85,78 15,78" fill="none" stroke="var(--cyan)" strokeWidth={2} />
                <text x={50} y={52} fontFamily="'Space Grotesk'" fontSize={10} fontWeight="bold" fill="var(--cyan)" textAnchor="middle">CODE</text>
                <text x={50} y={66} fontFamily="'Space Grotesk'" fontSize={10} fontWeight="bold" fill="var(--cyan)" textAnchor="middle">DEPLOY</text>
              </svg>
              <div className="pg">
                <a href="https://github.com/scrxtch12418/Projects/tree/main/Prompt%20Injection%20Checker" target="_blank" rel="noopener" className="pc-link">
                  <div className="pc rv" data-n={"01"} data-title="LLM Security Framework" data-info="Click to view Github repository. Prevent prompt injections, scan PII keys, and secure API layers.">
                    <div className="p-rarity epic">? EPIC RARITY</div>
                    <div className="p-title">LLM SECURITY FRAMEWORK</div>
                    <div className="p-desc">Red-teaming framework with input/output validation pipelines. Detects prompt injection
                      across 11 categories — API keys, SSNs, JWT tokens. Confidence scoring + severity classification. Full
                      CLI tool with test suite.</div>
                    <div className="ptags"><span className="ptag">Python</span><span className="ptag">OWASP</span><span className="ptag">Regex</span><span className="ptag">Red Team</span></div>
                  </div>
                </a>
                <a href="https://github.com/scrxtch12418/rat-research" target="_blank" rel="noopener" className="pc-link">
                  <div className="pc rv" data-n={"01"} style={{ transitionDelay: '.08s' }} data-title="RAT - Cyber Lab Research" data-info="Click to view Github repository. Testing socket client connections and reverse terminal telemetry.">
                    <div className="p-rarity rare">? RARE RARITY</div>
                    <div className="p-title">RAT — ETHICAL RESEARCH</div>
                    <div className="p-desc">Python Remote Access Trojan in a controlled lab — reverse shell, remote command
                      execution, file exfiltration. Documented threat-model analysis. For ethical use only.</div>
                    <div className="ptags"><span className="ptag">Python</span><span className="ptag">Sockets</span><span className="ptag">Ethical Hacking</span><span className="ptag">Threat Modeling</span></div>
                  </div>
                </a>
                <a href="https://github.com/scrxtch12418/Projects/tree/main/Focus%20Extension" target="_blank" rel="noopener" className="pc-link">
                  <div className="pc rv" data-n={"03"} style={{ transitionDelay: '.16s' }} data-title="ADHD Focus Node" data-info="Click to view Github repository. Persistent storage timers, tab limiting, and domain blockades.">
                    <div className="p-rarity uncommon">? UNCOMMON</div>
                    <div className="p-title">ADHD FOCUS EXTENSION</div>
                    <div className="p-desc">Published Chrome extension — focus timers, site-blocking, task reminders. Chrome
                      Extensions API for persistent storage and tab management.</div>
                    <div className="ptags"><span className="ptag">HTML/CSS</span><span className="ptag">JavaScript</span><span className="ptag">Chrome API</span><span className="ptag">UX Design</span></div>
                  </div>
                </a>
              </div>
              <div style={{ background: 'var(--hot)', padding: '12px 18px', marginTop: 12 }} data-title="Rick's Wisdom Broadcast" data-info="Wubba Lubba Dub Dub! Make sure to take the side quests; they have the most interesting code.">
                <span style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: 17, letterSpacing: 3, color: '#fff' }}>"Noting belongs
                  anywhere, one day everything ends, so come watch TV"</span>
              </div>
            </div>
          </section>
          {/* S4: DESIGN GALLERY */}
          <section className="snap-sec" id="s4">
            <div className="design-sticky">
              <div className="sec-hdr">
                <div className="sec-num">04</div>
                <div className="sec-title rv sl">DESIGN <em>GALLERY</em></div>
              </div>
              <div className="sec-body">
                <div className="design-info-bar">
                  <span>Poster Design &nbsp;·&nbsp; Graphic Designing &nbsp;·&nbsp; Event Design</span>
                  <span style={{ color: 'var(--paper-rgba-25)' }}>Scroll the spiral &amp; click to expand</span>
                </div>
                <div className="design-spiral-stage">
                  <div className="spiral-orbit" aria-hidden="true" />
                  <div className="spiral-axis" aria-hidden="true" />
                  <div className="spiral-progress" aria-hidden="true">
                    <span id="spiralCurrent">01</span>
                    <i />
                    <span id="spiralTotal">11</span>
                  </div>
                  <div className="spiral-scroll-hint" aria-hidden="true">SCROLL // ROTATE</div>
                  <div className="dg-grid">
                    <div className="di rv" style={{ transitionDelay: '.04s' }}>
                      <img className="di-img" src="/public/images/motley_crew_quiz.png" alt="The Motley Crew Quiz" />
                      <div className="di-ov">
                        <div className="di-ov-title">THE MOTLEY CREW QUIZ</div>
                        <div className="di-ov-sub">Grey Matter Presents · 11th April · 9:30 AM</div>
                      </div>
                    </div>
                    <div className="di rv" style={{ transitionDelay: '.08s' }}>
                      <img className="di-img" src="/public/images/nutella_quiz.png" alt="The Nutella Quiz" />
                      <div className="di-ov">
                        <div className="di-ov-title">THE NUTELLA QUIZ</div>
                        <div className="di-ov-sub">Grey Matter Presents · Chocolate Trivia</div>
                      </div>
                    </div>
                    <div className="di rv" style={{ transitionDelay: '.12s' }}>
                      <img className="di-img" src="/public/images/dia_de_muertos_quiz.png" alt="Día de Muertos Quiz" />
                      <div className="di-ov">
                        <div className="di-ov-title">DÍA DE MUERTOS QUIZ</div>
                        <div className="di-ov-sub">Grey Matter Presents · Minis #18</div>
                      </div>
                    </div>
                    <div className="di rv" style={{ transitionDelay: '.16s' }}>
                      <img className="di-img" src="/public/images/starter_quiz.png" alt="The Starter Quiz" />
                      <div className="di-ov">
                        <div className="di-ov-title">THE STARTER QUIZ</div>
                        <div className="di-ov-sub">Grey Matter Presents · 11th April · 9:30 AM</div>
                      </div>
                    </div>
                    <div className="di rv" style={{ transitionDelay: '.2s' }}>
                      <img className="di-img" src="/public/images/kbk_quiz.png" alt="Kaun Banega Khiladi?" />
                      <div className="di-ov">
                        <div className="di-ov-title">KAUN BANEGA KHILADI?</div>
                        <div className="di-ov-sub">Sports &amp; Strategy Collage Quiz</div>
                      </div>
                    </div>
                    <div className="di rv" style={{ transitionDelay: '.24s' }}>
                      <img className="di-img" src="/public/images/rewind_quiz.png" alt="Rewind Quiz Poster" />
                      <div className="di-ov">
                        <div className="di-ov-title">REWIND QUIZ</div>
                        <div className="di-ov-sub">Grey Matter Presents · Pop Culture Trivia</div>
                      </div>
                    </div>
                    <div className="di rv" style={{ transitionDelay: '.28s' }}>
                      <img className="di-img" src="/public/images/studio99.png" alt="Studio 99 Salon Poster" />
                      <div className="di-ov">
                        <div className="di-ov-title">STUDIO 99</div>
                        <div className="di-ov-sub">Unisex Salon · Identity Graphics</div>
                      </div>
                    </div>
                    <div className="di rv" style={{ transitionDelay: '.32s' }}>
                      <img className="di-img" src="/public/images/videogames_quiz.png" alt="Video Games Quiz Poster" />
                      <div className="di-ov">
                        <div className="di-ov-title">VIDEO GAMES QUIZ</div>
                        <div className="di-ov-sub">Grey Matter Presents · Minis #11</div>
                      </div>
                    </div>
                    <div className="di rv" style={{ transitionDelay: '.36s' }}>
                      <img className="di-img" src="/public/images/theoffice_quiz.png" alt="The Office Quiz Poster" />
                      <div className="di-ov">
                        <div className="di-ov-title">THE OFFICE QUIZ</div>
                        <div className="di-ov-sub">Grey Matter Presents · Dunder Mifflin Trivia</div>
                      </div>
                    </div>
                    <div className="di rv" style={{ transitionDelay: '.4s' }}>
                      <img className="di-img" src="/public/images/join_us_liquid.png" alt="Grey Matter Recruitment Liquid Poster" />
                      <div className="di-ov">
                        <div className="di-ov-title">GREY MATTER RECRUITMENT</div>
                        <div className="di-ov-sub">Join Us ·</div>
                      </div>
                    </div>
                    <div className="di rv" style={{ transitionDelay: '.44s' }}>
                      <img className="di-img" src="/public/images/join_us_waves.png" alt="Grey Matter Recruitment Waves Poster" />
                      <div className="di-ov">
                        <div className="di-ov-title">GREY MATTER RECRUITMENT</div>
                        <div className="di-ov-sub">Join Us ·</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* S5: SPEAKING & HOSTING (WITH EXPANDABLE PHOTO GRIDS) */}
          <section className="snap-sec" id="s5">
            <div className="sec-hdr">
              <div className="sec-num">05</div>
              <div className="sec-title rv sl">SPEAKING <em>&amp; HOSTING</em></div>
            </div>
            <div className="sec-body" style={{ position: 'relative' }}>
              {/* Megaphone / Stage Badge */}
              <svg className="cyber-badge" style={{ top: '-24px', right: 50, transform: 'rotate(12deg)' }} viewBox="0 0 100 100" data-title="Stage Master certified sticker" data-info="Hosted Grey Matter QDC and Incridea. Engaging national crowds and managing real-time stages.">
                <circle cx={50} cy={50} r={42} fill="var(--ink)" stroke="var(--pink)" strokeWidth={4} />
                <path d="M30,42 L42,42 L54,30 L54,70 L42,58 L30,58 Z" fill="none" stroke="var(--pink)" strokeWidth={3} />
                <path d="M62,40 C68,45 68,55 62,60" fill="none" stroke="var(--pink)" strokeWidth={3} strokeLinecap="round" />
                <text x={50} y={86} fontFamily="'Space Grotesk'" fontSize={8} fontWeight="bold" fill="var(--pink)" textAnchor="middle" letterSpacing={1}>STAGE OK</text>
              </svg>
              <div style={{ background: 'rgba(0,255,234,.06)', borderLeft: '4px solid var(--cyan)', padding: '8px 14px', marginBottom: 12 }} data-title="Stage Metrics" data-info="Audience metrics: 500+ attendees engaged across various public hosting and technical demonstration modules.">
                <span style={{ fontFamily: '"Space Mono",monospace', fontSize: 9, letterSpacing: 2, color: 'rgba(0,255,234,.5)', textTransform: 'uppercase' }}>Public
                  speaking &nbsp;·&nbsp; Event hosting &nbsp;·&nbsp; Quiz mastering &nbsp;·&nbsp; Stage
                  presence</span>
              </div>
              <div className="speak-grid">
                <div className="speak-card rv" data-icon="??" style={{ transitionDelay: '.05s' }} data-title="Grey Matter QDC Quiz Nights" data-info="Commanded the spotlight as Quiz Master, directing real-time score grids and managing team dynamics.">
                  <div className="speak-type">Quiz Master</div>
                  <div className="speak-title">GREY MATTER QDC &amp; HOSTING</div>
                  <div className="speak-meta">Grey Matter QDC &nbsp;·&nbsp; NMAM Institute &nbsp;·&nbsp; Ongoing</div>
                  <div className="speak-desc">Hosted multiple national-level, inter-college, and intra-college events and quizzes.
                    Wrote questions, managed rounds, kept audience energy high, and coordinated live stage flows.</div>
                  <div className="speak-tags"><span className="speak-tag">Quiz Master</span><span className="speak-tag">Audience
                    Mgmt</span><span className="speak-tag">Stage Presence</span></div>
                </div>
                {/* QDC PHOTO 1 */}
                <div className="speak-card rv speak-photo-single" data-icon="??" style={{ transitionDelay: '.07s' }} data-title="Event Hosting" data-info="Sarvasva hosting the cultural fest Aikya on the main stage. Click to zoom.">
                  <div className="speak-type">Stage Action</div>
                  <div className="speak-img-single-wrapper">
                    <img src="/public/images/speaking_aikya.jpeg" alt="Sarvasva hosting Aikya on main stage" />
                  </div>
                  <div className="speak-photo-caption">Hosting Aikya on Main Stage</div>
                </div>
                {/* QDC PHOTO 2 */}
                <div className="speak-card rv speak-photo-single" data-icon="??" style={{ transitionDelay: '.09s' }} data-title="Event Hosting" data-info="Engaging a dynamic student crowd during an outdoor open-mic event. Click to zoom.">
                  <div className="speak-type">Outdoor Stage</div>
                  <div className="speak-img-single-wrapper">
                    <img src="/public/images/speaking_sac_1.jpeg" alt="Sarvasva outdoor open-mic hosting" />
                  </div>
                  <div className="speak-photo-caption">Outdoor Open-Mic Hosting</div>
                </div>
                {/* QDC PHOTO 3 */}
                <div className="speak-card rv speak-photo-single" data-icon="??" style={{ transitionDelay: '.11s' }} data-title="Student Activity Centre" data-info="Addressing NMAMIT students during an outdoor SAC presentation. Click to zoom.">
                  <div className="speak-type">SAC Hosting</div>
                  <div className="speak-img-single-wrapper">
                    <img src="/public/images/speaking_sac_2.jpeg" alt="Sarvasva speaking at SAC outdoor stage" />
                  </div>
                  <div className="speak-photo-caption">SAC Outdoor Presentation</div>
                </div>
                {/* QDC PHOTO 4 */}
                <div className="speak-card rv speak-photo-single" data-icon="??" style={{ transitionDelay: '.13s' }} data-title="Stage Setup" data-info="Configuring systems and stage cues from the host panel. Click to zoom.">
                  <div className="speak-type">Tech Desk</div>
                  <div className="speak-img-single-wrapper">
                    <img src="/public/images/speaking_stage_laptop.jpeg" alt="Sarvasva at stage control panel" />
                  </div>
                  <div className="speak-photo-caption">Stage Technical Coordination</div>
                </div>
                {/* MUN / DEBATES INFO */}
                <div className="speak-card rv" data-icon="??" style={{ transitionDelay: '.15s' }} data-title="Debates & Lecturing" data-info="Participated in multiple Model United Nations debates and delivered technical presentations to student assemblies.">
                  <div className="speak-type">Public Speaker</div>
                  <div className="speak-title">DEBATES, LECTURES &amp; MUN</div>
                  <div className="speak-meta">Model United Nations &nbsp;·&nbsp; NMAMIT &nbsp;·&nbsp; Ongoing</div>
                  <div className="speak-desc">Argued complex delegate briefs and policy resolutions at Model United Nations.
                    Presented technical seminar briefs, lectured student assemblies, and coordinated open student debates.</div>
                  <div className="speak-tags"><span className="speak-tag">Delegate</span><span className="speak-tag">MUN Debate</span><span className="speak-tag">Presentation</span></div>
                </div>
                {/* MUN PHOTO 1 */}
                <div className="speak-card rv speak-photo-single" data-icon="??" style={{ transitionDelay: '.17s' }} data-title="Technical Presentation" data-info="Delivering a technical assembly presentation with a slide deck. Click to zoom.">
                  <div className="speak-type">Lecture Hall</div>
                  <div className="speak-img-single-wrapper">
                    <img src="/public/images/speaking_lecture.jpeg" alt="Sarvasva giving classroom lecture" />
                  </div>
                  <div className="speak-photo-caption">Lecturing Student Assemblies</div>
                </div>
                {/* MUN PHOTO 2 */}
                <div className="speak-card rv speak-photo-single" data-icon="??" style={{ transitionDelay: '.19s' }} data-title="Model United Nations" data-info="Presenting critical delegate resolutions at the KMC Model United Nations. Click to zoom.">
                  <div className="speak-type">MUN Arena</div>
                  <div className="speak-img-single-wrapper">
                    <img src="/public/images/speaking_mun_1.jpeg" alt="Sarvasva speaking at KMC MUN" />
                  </div>
                  <div className="speak-photo-caption">Presenting MUN Resolutions</div>
                </div>
                {/* MUN PHOTO 3 */}
                <div className="speak-card rv speak-photo-single" data-icon="??" style={{ transitionDelay: '.21s' }} data-title="MUN Debate" data-info="Arguing delegate briefs and addressing the assembly floor during MUN rounds. Click to zoom.">
                  <div className="speak-type">Debate Floor</div>
                  <div className="speak-img-single-wrapper">
                    <img src="/public/images/speaking_mun_2.jpeg" alt="Sarvasva addressing MUN delegate floor" />
                  </div>
                  <div className="speak-photo-caption">Addressing MUN Assembly Floor</div>
                </div>
              </div>
            </div>
          </section>
          {/* S6: QUIZ */}
          <section className="snap-sec" id="s6">
            <div className="sec-hdr">
              <div className="sec-num">06</div>
              <div className="sec-title rv sl">QUIZ <em>ARENA</em></div>
            </div>
            <div className="qwrap">
              <div id="qgame">
                <div className="qmeta">
                  <div style={{ fontFamily: '"Space Mono",monospace', fontSize: 9, letterSpacing: 2, color: 'var(--paper-rgba-30)' }}>
                    CAN YOU BEAT THE QUIZ MASTER?</div>
                  <div className="qscore">SCORE: <span id="sv">0</span>/<span id="st">8</span></div>
                </div>
                <div className="qpips" id="qpips" />
                <div style={{ height: 13 }} />
                <div className="qtxt" id="qtxt" />
                <div className="qopts" id="qopts" />
                <div className="qfb" id="qfb" />
                <button className="qnxt" id="qnxt" onClick={(e) => { window.event = e; eval('nextQ()') }}>NEXT QUESTION ?</button>
              </div>
              <div className="qres" id="qres">
                <span className="rlabel">FINAL SCORE</span>
                <span className="rscore" id="rsc">0</span>
                <div className="rmsg" id="rmsg" />
                <button className="rbtn" onClick={(e) => { window.event = e; eval('initQ()') }}>? PLAY AGAIN</button>
              </div>
            </div>
          </section>
        </div>{/* /scroller */}
        {/* LIGHTBOX MODAL FOR DESIGNS */}
        <div id="designModal">
          <button id="modalClose">CLOSE [ESC]</button>
          <img id="modalImg" src alt="Full Design View" />
          <div id="modalCap" />
        </div>
      </div>


    </div>
  );
}





