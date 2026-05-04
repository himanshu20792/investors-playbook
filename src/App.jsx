import { useState, useEffect } from "react";

const G = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#08080f;}
.app{min-height:100vh;background:#08080f;color:#e2ddd4;font-family:'Cormorant Garamond',Georgia,serif;}
.hdr{background:linear-gradient(160deg,#0c0c16,#10101a);border-bottom:1px solid #1c1c28;padding:24px 20px 16px;text-align:center;position:relative;}
.hdr::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 0%,rgba(212,175,55,.07),transparent);pointer-events:none;}
.hdr-eye{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.25em;color:#4a4a5e;text-transform:uppercase;margin-bottom:6px;}
.hdr-title{font-size:clamp(20px,5vw,36px);font-weight:300;letter-spacing:.06em;color:#e2ddd4;margin-bottom:12px;}
.hdr-title em{font-style:italic;color:#d4af37;}
.country-toggle{display:inline-flex;gap:0;background:#0a0a14;border:1px solid #252535;border-radius:24px;padding:3px;}
.cbtn{background:none;border:none;color:#5a5a6e;cursor:pointer;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.13em;padding:7px 14px;text-transform:uppercase;border-radius:20px;transition:all .15s;display:flex;align-items:center;gap:5px;}
.cbtn.on{background:#d4af37;color:#08080f;font-weight:500;}
.cbtn-flag{font-size:13px;line-height:1;}
.tabs{display:flex;background:#0b0b14;border-bottom:1px solid #181824;overflow-x:auto;}
.tab{background:none;border:none;border-bottom:2px solid transparent;color:#3e3e52;cursor:pointer;font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.12em;padding:14px 9px 12px;text-transform:uppercase;white-space:nowrap;transition:all .2s;flex:1;min-width:70px;}
.tab.on{border-bottom-color:#d4af37;color:#d4af37;}
.main{max-width:760px;margin:0 auto;padding:20px 14px 80px;}
.filterbar{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid #141420;}
.fbtn{background:#0d0d18;border:1px solid #1c1c28;border-radius:14px;color:#5a5a6e;cursor:pointer;font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.1em;padding:6px 11px;text-transform:uppercase;transition:all .15s;}
.fbtn:hover{border-color:#2e2e40;color:#8a8a9e;}
.fbtn.on{background:rgba(212,175,55,.1);border-color:rgba(212,175,55,.4);color:#d4af37;}
.cgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:9px;margin-bottom:18px;}
.ccard{background:#0f0f18;border:1px solid #1a1a26;border-radius:6px;padding:14px;cursor:pointer;transition:all .2s;position:relative;}
.ccard:hover{border-color:#2e2e40;}
.ccard.sel{border-color:rgba(212,175,55,.5);background:#121220;}
.ccard.unanalyzed{border-style:dashed;background:#0a0a14;}
.ctickrow{display:flex;justify-content:space-between;align-items:flex-start;gap:6px;margin-bottom:2px;}
.ctick{font-family:'DM Mono',monospace;font-size:16px;font-weight:500;color:#d4af37;}
.cstage{font-family:'DM Mono',monospace;font-size:6.5px;letter-spacing:.12em;padding:2px 6px;border-radius:8px;text-transform:uppercase;}
.stage-early{background:rgba(168,85,247,.15);color:#c084fc;}
.stage-growth{background:rgba(245,158,11,.15);color:#fbbf24;}
.stage-est{background:rgba(34,197,94,.15);color:#4ade80;}
.stage-pending{background:rgba(100,116,139,.15);color:#94a3b8;}
.cname{font-family:'DM Mono',monospace;font-size:7.5px;letter-spacing:.09em;color:#3e3e52;margin-bottom:7px;text-transform:uppercase;}
.cthesis{font-size:11.5px;color:#6a6680;line-height:1.45;margin-bottom:7px;}
.ctag{display:inline-block;font-family:'DM Mono',monospace;font-size:7px;padding:2px 6px;border-radius:2px;text-transform:uppercase;}
.tag-ai{background:rgba(99,102,241,.12);color:#818cf8;}
.tag-energy{background:rgba(16,185,129,.12);color:#34d399;}
.tag-health{background:rgba(236,72,153,.12);color:#f472b6;}
.tag-infra{background:rgba(245,158,11,.12);color:#fbbf24;}
.tag-fin{background:rgba(59,130,246,.12);color:#60a5fa;}
.tag-consumer{background:rgba(168,85,247,.12);color:#c084fc;}
.tag-space{background:rgba(20,184,166,.12);color:#5eead4;}
.tag-defense{background:rgba(244,114,182,.12);color:#f9a8d4;}
.tag-materials{background:rgba(180,83,9,.15);color:#fb923c;}
.tag-custom{background:rgba(100,116,139,.15);color:#94a3b8;}
.btn-gold{background:#d4af37;border:none;border-radius:4px;color:#08080f;cursor:pointer;font-family:'DM Mono',monospace;font-size:8.5px;font-weight:500;letter-spacing:.15em;padding:9px 16px;text-transform:uppercase;}
.btn-ghost{background:none;border:1px solid #252535;border-radius:4px;color:#4a4a5e;cursor:pointer;font-family:'DM Mono',monospace;font-size:8.5px;padding:9px 13px;text-transform:uppercase;}
.btn-danger{background:none;border:1px solid #5b1f1f;border-radius:4px;color:#ef4444;cursor:pointer;font-family:'DM Mono',monospace;font-size:8px;padding:6px 10px;text-transform:uppercase;letter-spacing:.13em;}
.infobtn{display:inline-flex;align-items:center;justify-content:center;width:14px;height:14px;border-radius:50%;background:rgba(212,175,55,.08);border:1px solid rgba(212,175,55,.25);color:#d4af37;font-family:'DM Mono',monospace;font-size:8px;font-weight:500;cursor:pointer;margin-left:6px;flex-shrink:0;transition:all .15s;vertical-align:middle;}
.infobtn:hover{background:rgba(212,175,55,.15);}
.tooltip-modal{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:100;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px);}
.tooltip-card{background:#0f0f1a;border:1px solid rgba(212,175,55,.3);border-radius:8px;padding:20px;max-width:380px;width:100%;}
.tt-eye{font-family:'DM Mono',monospace;font-size:7.5px;letter-spacing:.18em;color:#d4af37;text-transform:uppercase;margin-bottom:8px;}
.tt-title{font-size:18px;color:#e2ddd4;font-weight:400;margin-bottom:10px;}
.tt-body{font-family:'DM Mono',monospace;font-size:9.5px;color:#a8a4a0;line-height:1.75;letter-spacing:.02em;margin-bottom:14px;}
.tt-eg{font-family:'DM Mono',monospace;font-size:9px;color:#6e6e7e;line-height:1.7;font-style:italic;border-left:2px solid rgba(212,175,55,.2);padding-left:10px;margin-bottom:16px;}
.tt-close{background:#d4af37;border:none;border-radius:4px;color:#08080f;cursor:pointer;font-family:'DM Mono',monospace;font-size:8.5px;letter-spacing:.15em;padding:9px 16px;text-transform:uppercase;width:100%;}

/* Story mode toggle inside tooltip */
.tt-mode-toggle{display:flex;background:#0a0a14;border:1px solid #252535;border-radius:18px;padding:3px;margin-bottom:14px;}
.tt-mode-btn{flex:1;background:none;border:none;color:#5a5a6e;cursor:pointer;font-family:'DM Mono',monospace;font-size:8.5px;letter-spacing:.13em;padding:7px 10px;text-transform:uppercase;border-radius:14px;transition:all .15s;}
.tt-mode-btn.on{background:#d4af37;color:#08080f;font-weight:500;}
.tt-story-title{font-size:17px;font-style:italic;color:#d4af37;font-weight:400;margin-bottom:10px;line-height:1.3;}
.tt-story-body{font-size:14px;color:#c2beb4;line-height:1.7;margin-bottom:12px;white-space:pre-line;}
.tt-story-body em{color:#d4af37;font-style:italic;}
.tt-story-takeaway{background:rgba(212,175,55,.05);border-left:3px solid #d4af37;border-radius:4px;padding:10px 12px;margin-bottom:14px;}
.tt-takeaway-eye{font-family:'DM Mono',monospace;font-size:7px;letter-spacing:.18em;color:#d4af37;text-transform:uppercase;margin-bottom:5px;}
.tt-takeaway-text{font-family:'DM Mono',monospace;font-size:9px;color:#c2beb4;line-height:1.7;}

/* Stock narrative tab */
.narrative{background:linear-gradient(180deg,#0e0e1a,#0a0a14);border:1px solid rgba(212,175,55,.25);border-radius:10px;padding:20px 18px;margin-bottom:16px;}
.narr-eyebrow{font-family:'DM Mono',monospace;font-size:7.5px;letter-spacing:.22em;color:#d4af37;text-transform:uppercase;margin-bottom:6px;}
.narr-ticker{font-family:'DM Mono',monospace;font-size:22px;font-weight:500;color:#d4af37;margin-bottom:2px;}
.narr-name{font-family:'DM Mono',monospace;font-size:8.5px;letter-spacing:.1em;color:#5a5a6e;text-transform:uppercase;margin-bottom:20px;}
.narr-chapter{margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid #181826;}
.narr-chapter:last-of-type{margin-bottom:0;padding-bottom:0;border-bottom:none;}
.narr-ch-eye{font-family:'DM Mono',monospace;font-size:7.5px;letter-spacing:.18em;color:#d4af37;text-transform:uppercase;margin-bottom:6px;display:flex;align-items:center;gap:8px;}
.narr-ch-icon{font-size:13px;}
.narr-ch-title{font-size:18px;font-style:italic;color:#d4af37;font-weight:400;margin-bottom:11px;line-height:1.3;}
.narr-ch-body{font-size:14.5px;color:#c2beb4;line-height:1.75;white-space:pre-line;}
.narr-ch-body em{color:#d4af37;font-style:italic;}
.narr-bottom{background:rgba(212,175,55,.05);border-left:3px solid #d4af37;border-radius:4px;padding:12px 14px;margin-top:6px;}
.narr-bl-eye{font-family:'DM Mono',monospace;font-size:7.5px;letter-spacing:.2em;color:#d4af37;text-transform:uppercase;margin-bottom:6px;}
.narr-bl-text{font-family:'DM Mono',monospace;font-size:9.5px;color:#c2beb4;line-height:1.75;}
.narr-empty{background:rgba(245,158,11,.05);border:1px solid rgba(245,158,11,.2);border-radius:6px;padding:16px;}
.narr-empty-eye{font-family:'DM Mono',monospace;font-size:7.5px;letter-spacing:.18em;color:#fbbf24;text-transform:uppercase;margin-bottom:8px;}
.narr-empty-text{font-size:14px;color:#a8a49a;line-height:1.7;margin-bottom:12px;}
.narr-empty-cmd{background:#0a0a14;border:1px solid #1c1c28;border-radius:5px;padding:10px 12px;font-family:'DM Mono',monospace;font-size:9.5px;color:#d4af37;line-height:1.7;letter-spacing:.02em;}
.snap{background:#0d0d18;border:1px solid rgba(212,175,55,.2);border-radius:7px;padding:16px;margin-bottom:18px;}
.snap-lbl{font-family:'DM Mono',monospace;font-size:7.5px;letter-spacing:.2em;color:#d4af37;text-transform:uppercase;margin-bottom:12px;}
.sigbar{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:14px;}
.sigchip{background:#13131e;border-radius:4px;padding:5px 6px;display:flex;flex-direction:column;align-items:center;gap:2px;flex:1;min-width:54px;}
.siglbl{font-family:'DM Mono',monospace;font-size:6px;color:#3e3e52;text-align:center;line-height:1.3;}
.mgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:7px;}
.mcell{background:#0a0a14;border:1px solid #181826;border-radius:4px;padding:9px 11px;}
.mlbl{font-family:'DM Mono',monospace;font-size:6.5px;letter-spacing:.13em;color:#3e3e52;text-transform:uppercase;margin-bottom:3px;display:flex;align-items:center;}
.mval{font-size:12.5px;color:#c2beb4;line-height:1.4;}
.sbar-t{background:#141420;border-radius:2px;height:3px;margin:7px 0;}
.sbar-f{height:100%;border-radius:2px;transition:width .5s;}
.scard{border-radius:6px;margin-bottom:8px;overflow:hidden;}
.sc-top{padding:13px 15px;}
.sc-hdr{display:flex;align-items:center;gap:9px;}
.sc-num{font-family:'DM Mono',monospace;font-size:7.5px;color:#3a3a50;min-width:18px;}
.sc-lbl{font-size:14.5px;font-weight:400;color:#a8a4a0;flex:1;display:flex;align-items:center;}
.apill{border-radius:5px;padding:10px 12px;margin-top:9px;}
.asig{display:flex;align-items:center;gap:7px;margin-bottom:6px;}
.areason{font-family:'DM Mono',monospace;font-size:9px;line-height:1.7;letter-spacing:.02em;}
.sc-tog{display:flex;align-items:center;justify-content:space-between;padding:6px 15px;cursor:pointer;border-top:1px solid #131320;background:#09090f;}
.sc-tog-lbl{font-family:'DM Mono',monospace;font-size:7px;letter-spacing:.13em;color:#3a3a50;text-transform:uppercase;}
.sc-body{padding:13px 15px 15px;border-top:1px solid #131320;background:#0a0a13;}
.sq{font-size:13.5px;font-style:italic;color:#6a6676;margin-bottom:6px;line-height:1.5;}
.shint{font-family:'DM Mono',monospace;font-size:8px;color:#3a3a50;margin-bottom:12px;line-height:1.7;}
.optlbl{font-family:'DM Mono',monospace;font-size:7px;letter-spacing:.13em;color:#4a4a5e;text-transform:uppercase;margin-bottom:6px;}
.optrow{display:flex;flex-direction:column;gap:5px;margin-bottom:11px;}
.optbtn{border-radius:4px;cursor:pointer;font-family:'DM Mono',monospace;font-size:9px;padding:8px 11px;text-align:left;display:flex;justify-content:space-between;align-items:center;border:1px solid;transition:all .12s;}
.tip{background:rgba(212,175,55,.03);border-left:2px solid rgba(212,175,55,.2);padding:8px 10px;}
.tip-l{font-family:'DM Mono',monospace;font-size:7px;letter-spacing:.17em;color:#d4af37;text-transform:uppercase;margin-bottom:2px;}
.tip-t{font-family:'DM Mono',monospace;font-size:8px;color:#5a5a6e;line-height:1.7;}
.aipanel{background:#0f0f18;border:1px solid rgba(212,175,55,.18);border-radius:6px;padding:16px;margin-bottom:20px;}
.aiplbl{font-family:'DM Mono',monospace;font-size:7.5px;letter-spacing:.18em;color:#d4af37;text-transform:uppercase;margin-bottom:12px;}
.airow{margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid #141420;}
.airow:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0;}
.airlbl{font-family:'DM Mono',monospace;font-size:7px;letter-spacing:.13em;color:#4a4a5e;text-transform:uppercase;margin-bottom:4px;display:flex;align-items:center;}
.airval{font-size:13px;color:#a8a49a;line-height:1.6;}
.tcard{background:#0f0f18;border:1px solid #181824;border-radius:5px;padding:14px;display:grid;grid-template-columns:auto 1fr auto;gap:7px 11px;align-items:start;margin-bottom:8px;}
.tdot{width:6px;height:6px;border-radius:50%;margin-top:4px;}
.tnm{font-family:'DM Mono',monospace;font-size:7px;letter-spacing:.13em;color:#3e3e52;text-transform:uppercase;margin-bottom:2px;}
.tlb{font-size:15px;color:#c2beb4;margin-bottom:2px;}
.tex{font-family:'DM Mono',monospace;font-size:8px;color:#3e3e52;}
.tsz{font-family:'DM Mono',monospace;font-size:9px;color:#7a7a8e;text-align:right;grid-column:3;grid-row:1/3;align-self:center;}
.wstep{display:flex;gap:14px;margin-bottom:18px;padding-bottom:18px;border-bottom:1px solid #141420;}
.wstep:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0;}
.wico{color:#d4af37;min-width:16px;padding-top:2px;font-size:13px;}
.wlb{font-size:16px;color:#c2beb4;margin-bottom:5px;display:flex;align-items:center;}
.wdt{font-family:'DM Mono',monospace;font-size:8.5px;color:#4a4a5e;line-height:1.85;white-space:pre-line;}
.gbox{background:rgba(212,175,55,.03);border:1px solid rgba(212,175,55,.12);border-radius:5px;padding:14px;}
.gbox-l{font-family:'DM Mono',monospace;font-size:7.5px;letter-spacing:.16em;color:#d4af37;text-transform:uppercase;margin-bottom:7px;}
.gbox-t{font-size:14px;font-style:italic;color:#8a8690;line-height:1.6;}
.disc{font-family:'DM Mono',monospace;font-size:7.5px;color:#2e2e3e;line-height:1.8;text-align:center;margin-top:36px;padding:10px;border-top:1px solid #141420;}
.sec-t{font-size:23px;font-weight:300;color:#e2ddd4;margin-bottom:2px;}
.sec-s{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.16em;color:#3e3e52;text-transform:uppercase;margin-bottom:18px;}
.toprow{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:4px;gap:10px;}
.nostock{text-align:center;padding:55px 0;}
.ns-l{font-family:'DM Mono',monospace;font-size:8.5px;letter-spacing:.16em;color:#3e3e52;text-transform:uppercase;margin-bottom:12px;}
.ns-t{font-size:16px;color:#5a5a6e;margin-bottom:20px;}
.stage-banner{background:rgba(168,85,247,.06);border:1px solid rgba(168,85,247,.18);border-radius:5px;padding:10px 12px;margin-bottom:14px;display:flex;align-items:center;gap:8px;}
.stage-banner-txt{font-family:'DM Mono',monospace;font-size:9px;color:#a094b0;line-height:1.6;}
.ecard{background:#0f0f18;border:1px solid #1a1a26;border-radius:6px;padding:14px 15px;margin-bottom:8px;cursor:pointer;transition:all .15s;}
.ecard:hover{border-color:#2e2e40;}
.ecard.imminent{border-color:rgba(239,68,68,.4);background:rgba(239,68,68,.03);}
.ecard.soon{border-color:rgba(245,158,11,.3);}
.ecard.reported{opacity:.55;}
.erow{display:flex;align-items:center;gap:12px;}
.edate{flex-shrink:0;width:54px;text-align:center;border-right:1px solid #1c1c28;padding-right:10px;}
.edate-day{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:300;color:#d4af37;line-height:1;}
.edate-mo{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.15em;color:#5a5a6e;text-transform:uppercase;margin-top:3px;}
.einfo{flex:1;min-width:0;}
.etick{font-family:'DM Mono',monospace;font-size:13px;font-weight:500;color:#d4af37;margin-bottom:1px;}
.ename{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.06em;color:#5a5a6e;text-transform:uppercase;margin-bottom:4px;}
.edays{font-family:'DM Mono',monospace;font-size:7.5px;letter-spacing:.13em;text-transform:uppercase;}
.edays.imminent{color:#ef4444;}
.edays.soon{color:#f59e0b;}
.edays.future{color:#5a5a6e;}
.edays.past{color:#3a3a50;}
.eright{font-family:'DM Mono',monospace;font-size:8px;color:#3e3e52;text-align:right;flex-shrink:0;letter-spacing:.05em;}
.ecat-banner{background:#0d0d18;border:1px solid #1c1c28;border-radius:5px;padding:8px 12px;margin:14px 0 8px 0;font-family:'DM Mono',monospace;font-size:7.5px;letter-spacing:.18em;color:#5a5a6e;text-transform:uppercase;}
.eprep{background:#0d0d18;border:1px solid rgba(212,175,55,.18);border-radius:6px;padding:14px;margin-bottom:16px;}
.eprep-row{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #181826;}
.eprep-date{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:300;color:#d4af37;text-align:right;}
.eprep-when{font-family:'DM Mono',monospace;font-size:8px;color:#5a5a6e;letter-spacing:.1em;text-align:right;margin-top:2px;}
.eprep-block{margin-bottom:12px;}
.eprep-block:last-child{margin-bottom:0;}
.eprep-blbl{font-family:'DM Mono',monospace;font-size:7.5px;letter-spacing:.16em;color:#d4af37;text-transform:uppercase;margin-bottom:5px;display:flex;align-items:center;gap:6px;}
.eprep-blbl-icon{font-size:11px;}
.eprep-btxt{font-family:'DM Mono',monospace;font-size:9.5px;color:#a8a49a;line-height:1.75;letter-spacing:.02em;}

/* Custom watchlist add form */
.watchlist-form{background:#0d0d18;border:1px solid rgba(212,175,55,.18);border-radius:6px;padding:14px;margin-bottom:16px;}
.wf-title{font-family:'DM Mono',monospace;font-size:7.5px;letter-spacing:.18em;color:#d4af37;text-transform:uppercase;margin-bottom:10px;}
.wf-row{display:flex;flex-direction:column;gap:8px;margin-bottom:10px;}
.wf-input{background:rgba(255,255,255,.03);border:1px solid #1c1c28;border-radius:4px;color:#d4af37;font-family:'DM Mono',monospace;font-size:13px;letter-spacing:.1em;padding:9px 12px;outline:none;transition:border-color .2s;}
.wf-input:focus{border-color:#d4af37;}
.wf-input::placeholder{color:#3a3a50;}
.wf-input.full{font-family:'Cormorant Garamond',serif;font-size:14px;letter-spacing:.02em;color:#a8a49a;}
.wf-row-flex{flex-direction:row;gap:8px;align-items:center;flex-wrap:wrap;}
.wf-btnrow{display:flex;gap:8px;}
.wf-pending{background:rgba(245,158,11,.05);border:1px solid rgba(245,158,11,.2);border-radius:5px;padding:10px 12px;margin-top:10px;}
.wf-pending-l{font-family:'DM Mono',monospace;font-size:7px;letter-spacing:.16em;color:#fbbf24;text-transform:uppercase;margin-bottom:5px;}
.wf-pending-t{font-family:'DM Mono',monospace;font-size:8.5px;color:#a8a49a;line-height:1.6;}
.wf-toggle-btn{background:none;border:1px dashed #2e2e40;border-radius:6px;color:#5a5a6e;cursor:pointer;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.13em;padding:11px;text-transform:uppercase;width:100%;margin-bottom:10px;transition:all .15s;}
.wf-toggle-btn:hover{border-color:#d4af37;color:#d4af37;}
`;

// ── Glossary ──
const GLOSSARY = {
  "Risk Tier": { title:"Risk Tier", body:"How risky a stock is, on a 3-tier scale. Tier 1 = stable mega-caps (low risk). Tier 2 = quality growth stocks (medium risk). Tier 3 = early-stage or speculative (high risk).", eg:"VRT is Tier 2 because it's volatile but profitable. RKLB is Tier 3 — exciting but unproven." },
  "Position Size": { title:"Position Size", body:"What percentage of your investable money should go into one stock. Sizing protects against being wrong.", eg:"If you have $10,000, a 5% position is $500." },
  "Beta": { title:"Beta", body:"How much a stock moves relative to the overall market. Beta of 1.0 = moves with the market. Beta of 2.0 = swings twice as hard.", eg:"VRT has a beta of ~2.0 — when the S&P drops 10%, VRT typically drops 20%." },
  "Next Catalyst": { title:"Next Catalyst", body:"An upcoming event that could move the stock significantly. Earnings reports are most common.", eg:"If a stock reports earnings in 2 weeks, you might wait or buy ahead if confident." },
  "DCA Strategy": { title:"Dollar-Cost Averaging (DCA)", body:"Splitting your investment into multiple smaller purchases over time instead of buying all at once.", eg:"Instead of $3,000 today, buy $750 each month for 4 months." },
  "Entry Timing": { title:"Entry Timing", body:"When to start buying based on price action and market conditions.", eg:"VRT pulled back 15% from highs in late 2025 — that was a textbook entry zone." },
  "Exit Criteria": { title:"Exit Criteria", body:"Pre-defined conditions that trigger you to sell or trim. Setting these BEFORE you buy prevents emotional decisions.", eg:"'Sell half if VRT hits $350' or 'Exit fully if data center growth turns negative for two quarters.'" },
  "Top Risks": { title:"Top Risks", body:"The 2–3 things most likely to break your investment thesis.", eg:"For TSM: Taiwan-China tensions are the biggest risk." },
  "Sleep Test": { title:"The Sleep Test", body:"A gut check: if this stock dropped 30% tomorrow, would you panic-sell or hold calmly?", eg:"If a 30% drop in NVDA would ruin your week, cap NVDA at 3–4% of portfolio, not 10%." },
  "Forward P/E": { title:"Forward P/E Ratio", body:"Stock price divided by next year's expected earnings per share. Tells you how expensive the stock is relative to expected profits.", eg:"A P/E of 40x means investors are paying $40 for every $1 of next year's earnings." },
  "PEG Ratio": { title:"PEG Ratio", body:"Price/Earnings divided by Growth Rate. PEG below 1.0 = potentially undervalued. PEG above 2.0 = expensive.", eg:"VRT has PEG ~1.3 — premium but justified by 25%+ growth." },
  "Free Cash Flow (FCF)": { title:"Free Cash Flow (FCF)", body:"The actual cash a company generates after paying for operations and investments.", eg:"VRT's FCF doubled in a year — that's why the stock can sustain its premium valuation." },
  "Operating Margin": { title:"Operating Margin", body:"What percentage of revenue becomes operating profit before taxes and interest.", eg:"Mastercard's 55%+ operating margin is among the best in the world." },
  "Debt/Equity (D/E)": { title:"Debt-to-Equity Ratio", body:"Total debt divided by shareholder equity. D/E under 1.0 = conservative. Over 2.0 = aggressive leverage.", eg:"VRT's D/E is 0.82 — moderate debt that's manageable given strong cash generation." },
  "Insider Buying": { title:"Insider Buying", body:"When company executives buy their own stock with personal money. Strong bullish signal.", eg:"10 VRT executives bought stock in March 2026 — meaningful confidence signal." },
  "Earnings Date": { title:"Earnings Date", body:"The day a company reports its quarterly financial results. Stocks often move 5–20% on earnings.", eg:"VRT reports Q2 on Aug 5, 2026." },
  "Custom Watchlist": { title:"Custom Watchlist", body:"Stocks you've added yourself for tracking. They appear here without full analysis. To get the 8-step playbook for any custom stock, ask Claude in chat to analyze it — Claude will give you the data to add to your app.", eg:"You added $TSLA to your watchlist. Ask Claude: 'Add TSLA to my playbook with full analysis.' Then paste the new data into App.jsx." },
};

// ── CONCEPT STORIES — story-mode versions of glossary terms ──
const CONCEPT_STORIES = {
  "Risk Tier": { title:"Three Climbers on Different Mountains", body:"Three friends decide to go climbing. Sara picks a hill in the local park — beautiful views, almost no risk. Maya picks a real mountain — challenging but well-marked, with rangers nearby. Jake picks an unmapped peak in a remote range — could be the discovery of a lifetime, could end in disaster.\n\nEach is having a 'climbing experience' — but the gear they bring and how long they prepare are radically different. Sara wears sneakers. Maya brings ropes. Jake brings a satellite phone, a will, and three months of training.\n\nThat's Risk Tier. Tier 1 stocks are the park hill — Costco, Visa. Pack them heavily. Tier 2 are real mountains — VRT, NVDA. Worth the climb with proper gear (moderate sizing). Tier 3 are unmapped peaks — RKLB, ASTS. Tiny positions, only money you can afford to lose, detailed exit plans.", takeaway:"Match position size to tier. Tier 3 stocks at 10% of portfolio is bringing sneakers to climb K2." },
  "Position Size": { title:"The Buffet Plate", body:"Imagine your portfolio is a single dinner plate at a buffet. That's it — one plate. You can't go back for seconds.\n\nNow look at all the dishes. The roast chicken (boring index funds). The fancy lasagna (quality growth stocks). The exotic experiment (a hot biotech everyone's talking about).\n\nIf you pile half the plate with the experimental dish and it turns out terrible, you've ruined dinner. But if you take a small spoonful and it's amazing, you'll wish you had more — yet you've still eaten well from the rest of the plate.\n\nThat's position sizing. The exciting stuff goes in small portions. The reliable stuff fills the plate. You don't optimize for the best case — you optimize so even the worst case still leaves you fed.", takeaway:"Even the best ideas should be a small spoonful, not half the plate." },
  "Beta": { title:"Two Boats in the Same Storm", body:"You and a friend head out fishing on the same lake. You're in a sturdy trawler. Your friend is in a kayak. Same lake, same wind, same waves.\n\nWhen the lake is calm, you both glide along. But when a storm rolls in and the waves rise three feet, your trawler rocks gently. Your friend's kayak? Getting thrown around. Same storm, totally different ride.\n\nThat's beta. Some stocks are trawlers — beta around 1.0. Some are kayaks — beta of 2.0+. When the market sneezes, they catch a cold. When the market parties, they're loudest in the room.\n\nVRT has beta around 2.0. Market drops 10%, VRT typically drops 20%. Bigger waves both directions.", takeaway:"Before buying a high-beta stock, ask: am I prepared to be in the kayak when the storm hits? If not, size smaller." },
  "Next Catalyst": { title:"The Movie That's About to Drop", body:"You're considering buying tickets to a film. There are two ways. One: buy now, before anyone's seen it, based on the trailer — risky, the movie could flop. Two: wait two weeks until reviews come out, but pay higher prices if reviews are great.\n\nNow imagine you knew exactly when reviews would drop. You wouldn't randomly buy tickets the day before — you'd plan around that release date. Buy ahead, or wait for the verdict.\n\nThat's next catalyst. Earnings reports are like movie reviews — they tell you whether the story management has been telling is actually true. Knowing when one's coming lets you plan: am I confident enough to buy ahead, or do I want to see reviews first?", takeaway:"Always know the next earnings date before buying a stock. It frames whether you're buying the trailer or waiting for reviews." },
  "DCA Strategy": { title:"Filling the Bathtub", body:"You want a bath. You can fill the tub one of two ways: dump a giant bucket of hot water in all at once and hope the temperature is right, or run the tap steadily and adjust as you go.\n\nThe bucket is fast but it's a gamble. Too hot, scalded. Too cold, freezing. The tap takes longer but you're constantly adjusting.\n\nBuying a stock all at once is the bucket. Dollar-cost averaging is the tap. You commit a fixed amount each month, regardless of price. Some months the stock is cheap and your money buys more shares. Some months it's expensive and you buy fewer. Over time, your average cost smooths out.\n\nYou stop trying to be a hero who calls the perfect entry. You just keep filling the tub.", takeaway:"Trying to time the perfect entry is a guessing game. DCA replaces it with a discipline that works in your favor through volatility." },
  "Entry Timing": { title:"The House You Want to Buy", body:"You've found a house you love. It's listed at $800K but you think it's worth $700K. What do you do?\n\nYou don't make a desperate offer at full price. You also don't refuse to ever buy. You wait. You watch. You see if the seller drops the price. Maybe a few weeks pass. Maybe a few months. Then one day — a price cut to $720K. Close enough. You move.\n\nThat's entry timing. You've already decided this is a stock you want to own. The question is at what price. Pullbacks happen — broad market selloffs, earnings disappointments, sector rotations. Patient buyers get their entry at a price that gives them room to be wrong.\n\nTrying to grab the exact bottom is like catching a falling knife. But waiting for sensible discounts? That's just patience paying a dividend.", takeaway:"If a stock is on your shortlist, set a target price below current. When the market gives it to you, that's your entry. Don't chase." },
  "Exit Criteria": { title:"The Hike Plan", body:"Before a serious hike, smart hikers do something boring but essential: they decide in advance what would make them turn around. A specific weather change. A specific time of day. A specific injury.\n\nWhy? Because once you're on the trail, halfway up the mountain, exhausted and committed, your brain starts negotiating with itself. 'It's not THAT dark yet.' 'My ankle's only a little twisted.' 'We're so close.' That's how people end up on the news.\n\nInvesting has the same trap. Once you own a stock, your brain becomes its lawyer. Every drop has an excuse. Every red flag becomes a 'buying opportunity.'\n\nExit criteria is the deal you make with yourself before you're emotionally invested. 'I will sell half if it doubles.' 'I will exit if revenue declines two quarters in a row.' Pre-committed. No negotiation.", takeaway:"Write your exit conditions down before you click buy. The version of you that owns the stock is a worse decision-maker than the version that doesn't." },
  "Top Risks": { title:"The Job Interview, From the Other Side", body:"Picture you're hiring someone. The candidate walks in beaming, hands you a resume listing only their successes. 'I'm a great fit. Trust me.' Would you hire them?\n\nOf course not. You'd ask: 'What's been hard for you? Where have you struggled? Tell me about a time something went wrong.'\n\nYou ask because nobody's perfect — and the candidates who can't tell you about their weaknesses haven't really thought about themselves honestly.\n\nIt's the same when you research a stock. The bull case is everywhere — analyst reports, earnings calls, breathless headlines. Top risks is forcing yourself to interview the bear. To name out loud the 2-3 things that, if they happened, would actually break this. Because if you can't name them, you haven't researched enough.", takeaway:"If you can't articulate the bear case in your own words, you don't know the stock well enough yet. Naming risks doesn't kill the thesis — it makes you ready when one shows up." },
  "Sleep Test": { title:"3 a.m. on a Tuesday", body:"It's 3 a.m. You wake up to use the bathroom. Your phone is on the nightstand. You glance at it.\n\nBreaking news: tech stocks down 30% in after-hours trading. Your portfolio just lost a quarter of its value while you were sleeping.\n\nNow ask yourself, honestly: what do you do? Do you go back to sleep, knowing you'll deal with it in the morning? Or do you spend the next four hours refreshing your screen, drafting panic-sell orders, your stomach in knots?\n\nThat's the sleep test. If NVDA is 5% of your portfolio and drops 30%, you've lost 1.5% of your total. Annoying, survivable. If it's 25% and drops 30%, you've lost 7.5% — that's the difference between 'I'll review with coffee' and 'I need to do something RIGHT NOW.'\n\nMost bad investing decisions don't get made when things are calm. They get made at 3 a.m., in panic mode, after the position got too big to handle.", takeaway:"Run the 3 a.m. test before you size. If a 30% drop would have you frantically opening your trading app at midnight, the position is too big." },
  "Forward P/E": { title:"The Lemonade Stand You're Buying", body:"A kid offers to sell you their lemonade stand. It made $100 in profit last year and probably will next year. The kid wants $1,500.\n\nThat's a P/E of 15. You're paying $15 for every dollar of profit. The stand pays you back in 15 years. Reasonable for a steady business.\n\nNow another kid comes along. Same $100/year profit. Wants $5,000 for the stand. P/E of 50. Paid back in 50 years. Way too long, right?\n\nUnless. Unless the second kid has a plan to expand to 10 stands next year. And 100 the year after. Suddenly that $100 profit could be $10,000. The high P/E only makes sense if growth is real.\n\nThat's Forward P/E. A high number isn't automatically bad — but it's a promise. The company is saying, 'trust me, the profits are coming.' Your job is to decide if you believe them.", takeaway:"High P/E isn't expensive if growth is high. Low P/E isn't cheap if growth is dead. Always ask P/E relative to growth — that's where PEG comes in." },
  "PEG Ratio": { title:"Two Bakeries on the Same Block", body:"You're walking down Main Street and see two bakeries for sale.\n\nBakery A: 30 years old. $100K/year profit, steady. Owner wants $1M. That's 10x earnings.\n\nBakery B: opened two years ago. Also $100K/year now — but profits doubled last year and look set to double again. Owner wants $3M. That's 30x earnings.\n\nNaively, B looks expensive. But that ignores the most important thing: growth.\n\nThat's what PEG ratio fixes. Bakery A: 10x P/E ÷ 0% growth = infinity. Bakery B: 30x P/E ÷ 50% growth = PEG of 0.6. Despite the higher sticker price, B might be the bargain — the profits are about to catch up with what you paid.\n\nPEG below 1.0 means growth justifies the price. PEG above 2.0 means even the growth can't bail out the valuation.", takeaway:"A 'high P/E' stock isn't automatically expensive. PEG forces the real question: am I getting enough growth for what I'm paying?" },
  "Free Cash Flow (FCF)": { title:"Two Restaurants, Same Revenue, Very Different Stories", body:"You're considering buying a stake in one of two restaurants. Both made $1M in revenue. Both reported $200K in 'earnings' on paper. On the surface, identical.\n\nSo you ask each owner: 'How much actual cash do you have at year-end, after paying for everything?'\n\nRestaurant A: '$180K in the bank. We invested in some new ovens.'\n\nRestaurant B: 'Well, technically $200K on paper. But we owe suppliers, customers haven't paid us, the dishwasher needs replacing... my actual bank balance is up about $15K.'\n\nSame earnings. But A is generating real cash — money you could pay yourself, reinvest, or save. B's earnings exist mainly on a spreadsheet.\n\nThat's Free Cash Flow. Wall Street's oldest joke: 'Earnings are an opinion. Cash is a fact.'", takeaway:"Always check FCF, not just reported earnings. Growing FCF can pay dividends, fund growth, and survive recessions. Weak FCF is often a house of cards." },
  "Operating Margin": { title:"Two Shops on Different Floors of the Same Mall", body:"Picture two shops in the same mall. Both had $1M in sales. Walking by, they look equally successful.\n\nBut peek at the back office. Shop A — a software company — kept 40 cents of every dollar after paying staff and rent. Shop B — a grocery store — kept 3 cents of every dollar.\n\nBoth are 'profitable.' But they're playing entirely different games. The software company can absorb a bad month, invest aggressively, raise prices, weather a storm. The grocery store is one bad season from real trouble.\n\nThat's operating margin. It tells you how much breathing room a business has. High-margin businesses (software, payment networks, branded products) compound wealth. Low-margin businesses (grocery, airlines, contracting) live on a knife's edge.\n\nAnd the trend matters more than the level. Margin expansion = the business is getting stronger. Margin compression = something's getting harder.", takeaway:"High and expanding operating margin is one of the most reliable signs of a great business. Low and compressing? Be very careful." },
  "Debt/Equity (D/E)": { title:"Two Friends Buying Houses", body:"Two friends each buy a $500K house. Friend A puts $400K down and borrows $100K. Friend B puts $50K down and borrows $450K.\n\nFor a few years, everything's fine. Both make their payments, both enjoy their homes. From the outside, identical.\n\nThen a recession hits. Friend A loses their job temporarily. Annoying — but their mortgage is small relative to what they own. They can borrow against the house, sell it without losses, ride it out. Friend B loses their job too. But their mortgage is so big, every month without income is a panic. One missed payment and they're in trouble.\n\nThat's debt-to-equity. Same house, vastly different fragility. A little debt is fine — even useful, like leveraged returns when things go well. Too much debt and the company has no margin for error.\n\nD/E under 1.0 means the company owns more than it owes. D/E over 2.0 means it owes twice what it owns — fine in good times, dangerous when the cycle turns.", takeaway:"Cyclical businesses with high D/E are the most likely to break in recessions. Track it before things go wrong." },
  "Insider Buying": { title:"The Restaurant Owner Eating Their Own Cooking", body:"You're walking past a new restaurant. The chef is at the door, smiling, telling everyone how amazing the food is. Reviews are mixed. You're not sure.\n\nThen you peek through the window. The chef's family — wife, brother, teenage kids — sitting at a table, eating dinner there. With their own money. On a Tuesday night, when they could be anywhere.\n\nSuddenly the chef's marketing means a lot more. His family COULD eat anywhere. They chose to eat there. Putting their own money where their mouth is.\n\nThat's insider buying. When a CEO or CFO uses personal money — not stock awards, but cash from their bank account — to buy more shares, they're saying: 'I'd rather own more of this than hold cash.'\n\nOne asymmetry: insider SELLING doesn't reverse the signal. People sell for many reasons (house, college, divorce). But buying? There's really only one reason to buy more of your own stock with your own money.", takeaway:"Check SEC Form 4 filings or sites like OpenInsider for recent insider buying. CEO/CFO buying with personal money is one of the strongest bullish signals in investing." },
  "Earnings Date": { title:"Report Card Day", body:"Imagine you have a teenager. They go to school every day, do their homework, tell you about their classes. You're forming a picture of how they're doing — based on what they're telling you.\n\nFour times a year, the actual report card arrives. The teacher's view of reality, not the teenager's. Sometimes it confirms what you've been told. Sometimes it's a shock — both directions.\n\nThat's earnings day. All quarter long, the company has been telling its story — press releases, conferences, analyst meetings. Then the report card arrives. Real numbers. Audited. Compared to what was promised.\n\nStocks often move 5–20% on earnings days because months of assumptions get tested in 60 seconds of headlines. Knowing the date isn't optional. The week before is your prep window. The week after is when you adjust.", takeaway:"Never buy a stock without knowing when its next earnings are. The whole investment can re-rate in a single morning." },
};

// ── STOCK NARRATIVES — story-mode for individual stocks ──
// Each chapter has a story-first paragraph and a metric-second paragraph
const STOCK_NARRATIVES = {
  VRT: {
    chapters: [
      { num:"①", eye:"Who They Are", title:"The Plumbers of the AI Boom", story:"Every gold rush has two kinds of people who get rich: the miners, and the people selling the picks and shovels. Vertiv is selling shovels.\n\nWhen you hear 'AI data center,' you think NVIDIA chips. But those chips run hot — really hot — and they need massive amounts of electricity. Without specialized cooling and power systems, a data center full of NVIDIA GPUs is just a very expensive room full of melted plastic.\n\nThat's where Vertiv comes in. They make the cooling, the power management, the racks. The unsexy infrastructure that makes the sexy stuff possible. Every hyperscaler — Microsoft, Google, Amazon — is spending tens of billions building out AI data centers. Every dollar they spend, some of it flows to Vertiv." },
      { num:"②", eye:"The Growth Story", title:"The Boring Restaurant That Got Discovered", story:"Imagine a perfectly fine neighborhood restaurant. Same menu for 20 years. Same regulars. Steady, profitable, nothing exciting. Then one day a famous chef tweets about it, and overnight there's a line down the block.\n\nThe owner is the same. The kitchen is the same. The recipes are the same. What changed is that suddenly the world wants what they were quietly making the whole time.\n\nThat's Vertiv. Two years ago they were a perfectly fine industrial company. Then AI happened, and 'perfectly fine' turned into 'can't ship fast enough.' Q1 2026 came in at FORWARDPE_BEAT. Full-year guidance now implies major earnings growth.\n\nBut the most telling number is what's piling up in the back. Their FCF margin hit 31.6%, more than double the year before. That's not an accounting trick — that's actual cash, accumulating faster than they can spend it. The same kitchen, with a line out the door, suddenly counting money in a way they couldn't before." },
      { num:"③", eye:"What It Costs You", title:"The House Everyone Wants", story:"You know that house on the hill — the one with the view? It's been listed at $2 million for a month, and it just sold above asking. Was it overpriced?\n\nNaively, yes. Comparable houses in the neighborhood go for $1.2 million. But this one has the view, the renovated kitchen, and the school district everyone wants. The premium isn't crazy — it's the price of a thing other people also want badly.\n\nVRT is that house. Forward P/E of ~42x is roughly double the S&P 500 average. Expensive on the surface. But once you put growth in the equation — PEG of 1.33 — the math says you're paying premium for premium, not premium for ordinary.\n\nThe risk is straightforward: the moment the neighborhood loses its shine, the premium evaporates. If Vertiv's growth slows even a little, that 42x multiple gets ugly fast. If growth accelerates, you'll wish you'd bought more. You're not buying a bargain — you're buying a great house in a hot neighborhood, and betting the neighborhood stays hot." },
      { num:"④", eye:"Who Else Is Buying", title:"The Chef's Family at the Restaurant", story:"Picture a busy restaurant. The chef's marketing it hard, the reviews are good. You're considering reservations. Then one Tuesday night you walk past, and through the window you see the chef's wife and kids sitting at a corner table, eating dinner. With their own money. On a slow night, when they could be anywhere.\n\nYou'd take notice, right? They could eat anywhere — and they chose this place.\n\nIn March 2026, ten Vertiv executives — including the CEO and CFO — bought VRT stock with their own money. Not stock awards. Not bonus grants. Cash from their personal bank accounts. People who could have bought a beach house, an index fund, anything — and they chose more of their own company.\n\nThe Wall Street side confirms the picture: 22 of 25 analysts rate Buy, zero Sells. Unusual unanimity for a stock at this valuation. It's not a guarantee — insiders can be wrong, analysts even more so — but it's the strongest 'we believe what we're telling you' signal a company can send." },
      { num:"⑤", eye:"What Could Go Wrong", title:"The Kayak in the Storm", story:"Two boats head out in the same lake. One's a sturdy fishing trawler. The other's a kayak. When the lake is calm, both glide along just fine. When a storm rolls in, the trawler rocks — the kayak gets thrown around.\n\nVRT is the kayak. Its beta of ~2.05 means when the market drops 10%, VRT typically drops 20%. Anyone who bought at the October 2025 highs already lived this — the stock fell more than 30% in the early-2026 selloff before recovering. Same boat, much rougher ride.\n\nThere's a second crack in the hull worth knowing about. While Americas demand has been ferocious, APAC was -9.6% and EMEA was -8.2% in Q4 2025. The bull case assumes AI capex stays American-dominated. If global hyperscalers build their own ecosystems and Vertiv can't compete abroad, that's a real ceiling.\n\nAnd third: tariff and supply chain headwinds could compress margins. The whole story rests on those margins continuing to expand. If they reverse, the premium valuation evaporates fast." },
      { num:"⑥", eye:"How to Play It", title:"Patient at the Tap", story:"Given the high beta, this isn't a name to back the truck up on. Suggested sizing is 5–8% of portfolio for comfortable holders, less for conservative ones. Run the sleep test honestly — if a 30% drop would have you panicking, size to 3–4%.\n\nFor entry, fill the bathtub slowly. Split the position into 4 tranches over 3 months. Add aggressively on any 5%+ dips — VRT's volatility creates many of them.\n\nThe next major catalyst is Q2 earnings on August 5, 2026 (before market open). That's the next report card. Until then, the story is about whether the AI capex narrative from Microsoft, Google, Meta, and Amazon stays intact. Watch their earnings calls — what they say about data center spending essentially pre-announces what Vertiv will report." },
    ],
    bottomLine: "VRT is a high-quality picks-and-shovels play on AI infrastructure. Premium valuation backed by premium growth, strong insider conviction, and durable tailwinds. The main risk isn't the business — it's the price. Buy in tranches, size for the volatility, and watch hyperscaler capex like a hawk."
  },
  NVDA: {
    chapters: [
      { num:"①", eye:"Who They Are", title:"The Toll Booth on the AI Highway", story:"Imagine the entire AI industry is a massive new highway being built across the country. Every car, every truck, every delivery van — they all need to drive on it.\n\nNow imagine one company built and owns the only on-ramp. It doesn't matter if you're Microsoft, Google, OpenAI, or a tiny startup — you're paying NVIDIA at the toll booth before you can drive anywhere.\n\nNVIDIA designs the GPU chips that train and run virtually every AI model. But the real moat isn't just the chips — it's CUDA, their software platform that AI engineers spent the last 15 years learning. Switching away from NVIDIA isn't like switching brands of laundry detergent. It's like asking an entire industry to relearn how to drive. That's why even when competitors arrive, the migration is slow." },
      { num:"②", eye:"The Growth Story", title:"From a Gaming Company to the Most Important Company in Tech", story:"Five years ago, NVIDIA was mostly known for making graphics cards for video games. A nice business, a decent stock, nothing earth-shaking.\n\nThen the AI boom hit, and it turned out the same chips that rendered video game graphics were perfect for training AI models. Almost overnight, every tech giant on Earth needed as many NVIDIA chips as they could buy. The company couldn't make them fast enough.\n\nRevenue grew over 60% in fiscal 2025. Data center revenue alone roughly doubled. They generate over $60 billion in free cash flow per year — more than the entire revenue of most large companies. Operating margins above 60% are unheard of for a hardware business. This isn't a company anymore. It's a phenomenon." },
      { num:"③", eye:"What It Costs You", title:"The Most Crowded Restaurant in Town", story:"You walk past the hottest restaurant in the city. Two-month wait, glowing reviews, celebrity sightings. The owner is now selling small ownership stakes — but at a steep markup.\n\nForward P/E around 30x sounds expensive — and on absolute terms, it is. But here's the thing: when you factor in growth, the PEG ratio actually drops below 1.0. That means despite the premium, you're getting more growth per dollar than the average stock in the market.\n\nIn other words, NVIDIA is expensive in dollar terms but reasonable in growth-adjusted terms. The bet isn't whether you're paying a premium — you obviously are. The bet is whether AI demand stays this hot. If hyperscalers keep spending billions on data centers, the math works. If AI capex slows even modestly, the multiple compresses fast." },
      { num:"④", eye:"Who Else Is Buying", title:"When Wall Street Speaks With One Voice", story:"Imagine asking 30 different food critics to review a restaurant. Even the best places get a mix — some love it, a few don't.\n\nNow imagine almost every single critic gives it a glowing review. That's rare. It usually means either the place is genuinely exceptional, or the entire industry has gotten swept up in hype. Both are possible.\n\nThat's NVIDIA on Wall Street. The analyst consensus is overwhelmingly Buy with average price targets implying 15-20% upside. Insiders hold significant equity but recent transactions are mostly diversification — selling a little after their stock goes up 10x is healthy financial planning, not a warning sign. The unanimity is striking, but it's also a yellow flag worth knowing — when everyone agrees, surprises tend to come from unexpected directions." },
      { num:"⑤", eye:"What Could Go Wrong", title:"The Customers Building Their Own On-Ramp", story:"Imagine you own that toll booth on the highway. Business is incredible. Then you notice something: your biggest customers — Microsoft, Google, Amazon — are quietly building their own on-ramps next to yours.\n\nGoogle has TPU chips. AWS has Trainium. Microsoft has Maia. None of them match NVIDIA today. But each year they get closer. And these customers represent most of NVIDIA's revenue — the top four hyperscalers drive an enormous share. If even one of them succeeds in moving meaningful AI workloads off NVIDIA, the growth math changes overnight.\n\nThere's also China. Export restrictions have already cost NVIDIA billions in lost revenue, and the rules keep tightening. The total addressable market shrinks every time the geopolitical temperature rises.\n\nAnd then there's the simplest risk of all: AI capex itself. If hyperscalers ever decide they've built enough, NVIDIA's growth thesis goes from 'unstoppable' to 'normal' very quickly." },
      { num:"⑥", eye:"How to Play It", title:"Core Holding, Not a Trade", story:"NVIDIA isn't a stock to flip. It's a stock to own — and to size carefully because of how violently it moves on earnings days.\n\nSuggested sizing is 5-10% of portfolio for comfortable holders, 3-5% if a 10% earnings-day swing would shake you. Run the sleep test: NVDA can drop double digits in a single morning when earnings disappoint. If that would have you panicking, size down.\n\nFor entry, split into 3 tranches over 2 months. Buy a third now, a third on any 5% dip, and the final third after the next earnings release. NVDA tends to overshoot to the downside in tech selloffs — those are gifts.\n\nThe next major catalyst is Q1 FY27 earnings on May 20, 2026, after market close. Watch data center revenue (consensus around $78B Q1 guidance), Blackwell shipment commentary, China revenue, and any commentary on H2 Rubin/Vera platforms. NVIDIA earnings move the entire AI complex — even if you don't own it, you should be watching." },
    ],
    bottomLine: "NVIDIA is the toll booth on the AI highway. Reasonable valuation when adjusted for growth, fortress balance sheet, and a software moat (CUDA) that competitors can't easily breach. The risks are real — customer concentration, China, eventual capex normalization — but the position is unique. Size for the volatility, hold for years, and watch hyperscaler spending closely."
  },
  NBIS: {
    chapters: [
      { num:"①", eye:"Who They Are", title:"The Outsider Building a Power Plant", story:"Imagine a small power company in a town where everyone — every factory, every household — needs more electricity. Demand is exploding. The big incumbent utilities can't build new plants fast enough.\n\nA new entrant shows up. Not a household name. They came out of nowhere, but they've built specialized infrastructure exactly designed for the kind of demand exploding right now. And then something remarkable happens: the giants — the very utilities you'd expect to dominate — start signing massive long-term contracts to buy power from this newcomer.\n\nThat's Nebius. They build AI-specific cloud data centers (a 'neocloud'), purpose-engineered for the GPU workloads that train modern AI. Even Microsoft — which owns Azure, the world's second-largest cloud — is leasing GPU capacity from Nebius. When the giants outsource to you, that tells you something profound about how tight the supply is." },
      { num:"②", eye:"The Growth Story", title:"From Orphaned Asset to $50 Billion in Contracts", story:"Nebius emerged from the wreckage of Yandex's international assets after sanctions forced the Russian search giant to divest. What was left was a Finnish data center, some specialized teams, and a returning founder. Most people would have written them off.\n\nThen the contracts started landing. Microsoft: $19.4 billion over five years. Meta: $27 billion over five years. Total contracted backlog now approaches $50 billion. NVIDIA itself wrote a $2 billion equity check, naming Nebius as a strategic partner.\n\nThe numbers reflect this. Q1 2026 revenue of around $375 million is a sequential jump from $227 million in Q4. Full-year 2026 guidance is $3-3.4 billion versus just $530 million in 2025 — implying revenue will roughly 6x in a single year if execution holds. That's not growth, that's metamorphosis." },
      { num:"③", eye:"What It Costs You", title:"The Race Track Where the Stakes Are Already Sky-High", story:"Imagine a brand new race track. Day one, before the first race is run, ownership stakes are already trading at prices that imply this will be the most successful race track ever built. Maybe it will be. But there's no historical performance to point to — only the contracts and the promise.\n\nNebius trades at around 47x trailing sales, more than double what you'd pay for AI infrastructure peers. The stock is up 87% year-to-date and 434% over the past year. Bulls argue the contracted backlog justifies it — once that revenue actually shows up in earnings, the multiple will look sane.\n\nBears point out that 40% of the funding for the $16-20 billion 2026 capex plan still needs to be raised. The company has already issued $4.6 billion in convertibles. Dilution is built into the growth plan. And in three of the last four quarters, Nebius has missed revenue estimates. The race hasn't run yet. You're paying for the trophy in advance." },
      { num:"④", eye:"Who Else Is Buying", title:"The Mixed Signals at the Track", story:"You walk around the new race track trying to read the room. The food critics — the analysts — are unanimously bullish. Wedbush named NBIS their top AI infrastructure pick for 2026. Twelve analysts rate Strong Buy with an average price target of $163.\n\nBut peek behind the scenes. Some of the people closest to the operation — the executives — have been quietly selling around $14.7 million worth of their personal shares over the past 90 days. That's not a deal-breaker; insiders sell for many reasons after a 434% rally. But it's worth knowing.\n\nSo the signals are mixed: Wall Street is fully on board, NVIDIA voted with $2 billion of its own money, hyperscalers are signing massive contracts. But the insiders are taking some chips off the table. Both can be true at the same time. It just means: this isn't a quiet conviction trade. It's a story stock with a real story — and stories can break." },
      { num:"⑤", eye:"What Could Go Wrong", title:"The Plant That Has to Be Built Before the Power Bill Arrives", story:"Nebius has signed contracts to deliver $50 billion of power. But it doesn't have the plants yet. It needs to build them — fast, on budget, and on time. That's the central risk.\n\nThe $16-20 billion capex plan dwarfs the $3-3.4 billion in expected 2026 revenue. About 40% of that funding still needs to be raised. If financing markets tighten, if AI capex enthusiasm cools, if even one major customer renegotiates — the whole capital structure can strain quickly.\n\nThe customer concentration is also extreme. Meta and Microsoft alone account for the bulk of contracted backlog. These aren't small clients. If Meta decides to build more capacity in-house, or Microsoft renegotiates terms, the entire growth story shifts.\n\nAnd then there's the deployment risk on Vera Rubin — NVIDIA's next-generation platform that Nebius is set to deploy in H2 2026. New hardware platforms can be late, can underperform, can have unexpected issues. The bull case quietly assumes flawless execution on something that has never been done at this scale." },
      { num:"⑥", eye:"How to Play It", title:"Position for Asymmetry, Not Conviction", story:"NBIS isn't a position to size like a quality compounder. It's a position to size like a calculated bet — small enough that if things break, you're fine, large enough that if execution holds, it matters.\n\nSuggested sizing is 2-4% of portfolio. Run the sleep test honestly: NBIS routinely swings 20%+ on AI sentiment news. If that would have you frantically refreshing your phone, size to 1-2%.\n\nFor entry, build slowly. The stock just had a 33% weekly surge that pushed RSI into overbought territory. Don't chase. Split the position into 5-6 small tranches over 4-6 months. Add aggressively only on broad AI sentiment selloffs or post-earnings dips that don't reflect actual contract changes.\n\nThe key catalysts to watch: contract execution updates each quarter, the H2 2026 Vera Rubin deployment milestones, and any commentary from Meta or Microsoft about their own infrastructure plans. If those signals stay constructive, the story compounds. If any of them crack, exit aggressively — this isn't a stock to 'hope and hold.'" },
    ],
    bottomLine: "Nebius is a high-conviction speculation, not a quality investment. The $50 billion contracted backlog is real and validating. NVIDIA's $2 billion equity stake is real validation. But the execution risk, capital structure, and customer concentration mean this is a position you size small, watch closely, and exit decisively if the story breaks. Asymmetric upside if it works, real downside if it doesn't."
  },
};

const STEPS = [
  {id:1,label:"Business Clarity",   q:"Can you explain what this company does and why it makes money in 2 sentences?", hint:"If you can't explain it simply, don't buy it.",            tip:"Avoid businesses you don't understand. Clarity is a safety net.",                   opts:["✅ Crystal clear","⚠️ Somewhat clear","🚩 Confusing"]},
  {id:2,label:"Industry Tailwind",  q:"Is the industry growing, stable, or shrinking over the next 5+ years?",         hint:"Look for structural trends, not fads.",                    tip:"Secular trends (AI, aging population, clean energy) beat cyclical ones.",           opts:["✅ Strong tailwind","⚠️ Stable / mixed","🚩 Declining industry"]},
  {id:3,label:"Revenue Growth",     q:"Has revenue grown consistently at 10%+ annually for the last 2–3 years?",       hint:"Check Yahoo Finance or Macrotrends.",                       tip:"Accelerating growth matters more than high but decelerating growth.",               opts:["✅ >15% growth","⚠️ 5–15% growth","🚩 <5% or declining"]},
  {id:4,label:"Profitability & FCF",q:"Is free cash flow positive and growing? Is operating margin healthy?",          hint:"FCF = Operating Cash Flow minus CapEx.",                    tip:"Operating margin >15% and FCF margin >10% are solid benchmarks.",                  opts:["✅ Strong FCF & margins","⚠️ Breakeven / improving","🚩 Cash burn"], glossKey:"Free Cash Flow (FCF)"},
  {id:5,label:"Balance Sheet",      q:"Is debt manageable relative to cash and earnings?",                             hint:"Check Debt/Equity ratio.",                                  tip:"High debt isn't fatal if FCF covers it.",                                          opts:["✅ Net cash or low debt","⚠️ Moderate debt (D/E < 1)","🚩 High debt (D/E > 2)"], glossKey:"Debt/Equity (D/E)"},
  {id:6,label:"Valuation",          q:"Is the stock priced reasonably relative to its growth rate?",                   hint:"Use Forward P/E and PEG.",                                  tip:"High P/E can be justified by high growth.",                                         opts:["✅ Fair / undervalued (PEG < 1.5)","⚠️ Premium (PEG 1.5–2.5)","🚩 Expensive (PEG > 2.5)"], glossKey:"PEG Ratio"},
  {id:7,label:"Analyst & Insider",  q:"What do analysts and company insiders say?",                                    hint:"Check consensus + SEC Form 4.",                             tip:"Insider buying is a strong bullish signal.",                                         opts:["✅ Buy consensus + insider buying","⚠️ Mixed signals","🚩 Sell ratings or insider dumping"], glossKey:"Insider Buying"},
  {id:8,label:"Key Risks",          q:"Have you identified the 2–3 biggest things that could break this investment?",  hint:"Competition, regulation, concentration, macro.",            tip:"Write the bear case before you buy.",                                                opts:["✅ Risks identified & acceptable","⚠️ Some risks uncertain","🚩 Major unresolved risks"]},
];

const SCORE_LABELS=[{min:13,label:"Strong Buy Candidate",color:"#22c55e",desc:"Fundamentals compelling. Size appropriately and DCA in."},{min:9,label:"Watchlist Candidate",color:"#f59e0b",desc:"Promising but has notable risks."},{min:0,label:"Pass for Now",color:"#ef4444",desc:"Too many red flags."}];
const TIERS=[{tier:"Tier 1",label:"Core / Low Risk",examples:"Index funds, mega-caps",size:"Up to 20–30%",beta:"Beta < 0.8",color:"#22c55e"},{tier:"Tier 2",label:"Growth / Medium Risk",examples:"Quality growth stocks",size:"5–10%",beta:"Beta 0.8–1.5",color:"#f59e0b"},{tier:"Tier 3",label:"Speculative / High",examples:"Early-stage, unprofitable",size:"1–3% max",beta:"Beta > 1.5",color:"#ef4444"}];
const WHEN_STEPS=[{icon:"◈",label:"Dollar-Cost Average",glossKey:"DCA Strategy",detail:"Split into 3–4 tranches over 2–3 months."},{icon:"◈",label:"Catalyst Windows",glossKey:"Next Catalyst",detail:"Best entries:\n• Before earnings if confident\n• After 10–20% pullback\n• After strong earnings beat"},{icon:"◈",label:"Set a Price Alert",detail:"Alert 5% below current price."},{icon:"◈",label:"Define Exit First",glossKey:"Exit Criteria",detail:"Decide: profit target, stop-loss, review trigger."}];
const TAG_MAP={"AI & Tech":"tag-ai","Energy":"tag-energy","Healthcare":"tag-health","Infrastructure":"tag-infra","Financials":"tag-fin","Consumer":"tag-consumer","Space":"tag-space","Defense":"tag-defense","Materials":"tag-materials","Custom":"tag-custom"};

// ── COUNTRIES ──
const COUNTRIES = {
  US: { code:"US", flag:"🇺🇸", label:"USA", currency:"USD" },
  IN: { code:"IN", flag:"🇮🇳", label:"India", currency:"INR" },
  CA: { code:"CA", flag:"🇨🇦", label:"Canada", currency:"CAD" },
};

// ── EARNINGS DATA (US only, India/Canada have less standard quarterly cycles) ──
const EARNINGS = {
  HOOD:  {date:"2026-04-28",time:"After close",confirmed:true, watchPre:"Did crypto trading volumes pick up in Q1? Did Robinhood Gold subscribers continue 30%+ growth?",watchPost:"Q1 missed slightly. Watch if stock pulls back — could be a buying opportunity if thesis intact."},
  NBIS:  {date:"2026-04-29",time:"After close",confirmed:true, watchPre:"Q1 revenue is expected ~$375M (vs $227M in Q4). Watch contracted backlog updates, Vera Rubin deployment timeline for H2, and any new hyperscaler deals beyond Meta/Microsoft.",watchPost:"Stock has had history of missing revenue estimates 3 of past 4 quarters. Watch for capex commentary and any signs of customer concentration easing. Insider selling pattern is concerning — track for changes."},
  V:     {date:"2026-04-29",time:"After close",confirmed:true, watchPre:"US payment volume growth and cross-border trends. Visa Direct and B2B payments matter.",watchPost:"Visa rarely surprises. Focus on margin trajectory and revenue framework updates."},
  MA:    {date:"2026-04-30",time:"Before open",confirmed:true, watchPre:"Cross-border transaction volume growth (key indicator of consumer travel/spending).",watchPost:"Stock typically doesn't move much on results — focus on next quarter setup."},
  PLTR:  {date:"2026-05-04",time:"After close",confirmed:true, watchPre:"US Commercial revenue growth must exceed 70% YoY. AIP customer count and average deal size.",watchPost:"Even strong results may not move the stock if guidance is light — valuation is so extreme."},
  CCJ:   {date:"2026-05-05",time:"Before open",confirmed:true, watchPre:"Uranium realized price (track vs $84 spot). Westinghouse segment revenue and margin trends. Watch for any new long-term supply contracts beyond the recent India deal. Q1 EPS estimate has been cut 17% to $0.29 over past 60 days — bar is lower.",watchPost:"With Q3 2025 having missed badly ($0.07 vs $0.23), this report's volatility risk is high. Watch capex guidance, Westinghouse JV updates, and any commentary on uranium market tightness or new utility contract wins."},
  CELH:  {date:"2026-05-06",time:"Before open",confirmed:false,watchPre:"Revenue growth re-acceleration is THE thing to watch. Pepsi distribution scan data.",watchPost:"Even modest growth re-acceleration could trigger sharp rally given depressed sentiment."},
  AXON:  {date:"2026-05-06",time:"After close",confirmed:true, watchPre:"Software ARR growth (target: 35%+). AI software (Draft One, real-time translation) attach rates.",watchPost:"AXON rarely disappoints. Watch for guidance raise — that's the catalyst."},
  IONQ:  {date:"2026-05-07",time:"After close",confirmed:false,watchPre:"Bookings growth and qubit count milestones. Government contract wins.",watchPost:"Quantum stocks trade on milestones. Cash burn warnings = sharp drop."},
  RBLX:  {date:"2026-05-07",time:"Before open",confirmed:true, watchPre:"Daily active users (DAU) and bookings. Watch for 18+ user growth deceleration.",watchPost:"FCF conversion improving — watch margin expansion."},
  VST:   {date:"2026-05-07",time:"Before open",confirmed:true, watchPre:"Power price realizations (ERCOT spreads). New data center contract announcements.",watchPost:"Listen for nuclear plant operational updates and new hyperscaler PPAs."},
  RKLB:  {date:"2026-05-08",time:"After close",confirmed:false,watchPre:"Electron launch cadence (target: 20+ in 2026). Neutron progress.",watchPost:"Neutron timeline is the singular focus. Any delay = 20%+ drawdown."},
  HIMS:  {date:"2026-05-11",time:"After close",confirmed:true, watchPre:"GLP-1 revenue contribution. FDA shortage list status. Customer acquisition cost.",watchPost:"Stock often moves 20%+ post-earnings. Any FDA negative news = exit signal."},
  ASTS:  {date:"2026-05-12",time:"After close",confirmed:false,watchPre:"BlueBird satellite deployment progress. Carrier partnership commercial launch dates.",watchPost:"Pure binary stock — any delays = 30%+ drop."},
  CAVA:  {date:"2026-05-12",time:"After close",confirmed:true, watchPre:"Same-store sales growth (must stay above 5%). New unit openings and AUV trends.",watchPost:"CAVA is priced for perfection. Slight SSS deceleration = 30%+ drawdown risk."},
  CRWV:  {date:"2026-05-13",time:"After close",confirmed:false,watchPre:"Revenue growth (still triple digits?). Customer concentration.",watchPost:"Watch debt load and AI capex slowdown commentary from Microsoft, Meta."},
  ANRO:  {date:"2026-05-15",time:"TBD",        confirmed:false,watchPre:"Project pipeline. Cash position and equity raise hints.",watchPost:"Micro-cap — single news items move stock 20%+."},
  NVDA:  {date:"2026-05-20",time:"After close",confirmed:true, watchPre:"Data center revenue growth (consensus: $78B Q1 guidance). Hyperscaler capex commentary, Blackwell shipments.",watchPost:"NVDA earnings move the entire AI complex. Watch H2 commentary on Rubin/Vera platforms."},
  COST:  {date:"2026-05-29",time:"After close",confirmed:false,watchPre:"Comparable sales growth (especially traffic vs ticket). Membership renewal rates.",watchPost:"COST rarely disappoints. Watch SG&A trends and gross margin."},
  ENPH:  {date:"2026-07-30",time:"After close",confirmed:false,watchPre:"US residential solar demand stabilization. Battery attach rates. NEM 3.0 commentary.",watchPost:"Listen for Q3 guidance — recovery signals would trigger multi-quarter rally."},
  TSM:   {date:"2026-07-17",time:"Before open",confirmed:false,watchPre:"AI accelerator revenue mix (now 60%+ of total). 3nm and 2nm capacity utilization.",watchPost:"Capex guidance for 2027 fabs is the key signal."},
  GOOGL: {date:"2026-07-22",time:"After close",confirmed:false,watchPre:"Google Cloud growth (target: 30%+). Search ad growth amid AI competition.",watchPost:"Capex guidance critical — AI infrastructure spending pace."},
  LMT:   {date:"2026-07-22",time:"Before open",confirmed:false,watchPre:"F-35 deliveries and program margins. Missile demand commentary.",watchPost:"Defense names move slowly but consistently."},
  VRT:   {date:"2026-08-05",time:"Before open",confirmed:true, watchPre:"Q2 organic growth rate vs 27-29% full-year guidance. Backlog trend, AI customer concentration.",watchPost:"Compare to AI capex commentary from hyperscalers. Listen for guidance raise — that's the bull catalyst."},
};

// ── STOCK DATABASES BY COUNTRY ──
const STOCK_DB_US = {
  RKLB: {ticker:"RKLB",name:"Rocket Lab USA",tag:"Space",stage:"early",thesis:"Small-launch leader building Neutron rocket to compete with SpaceX.",companyName:"Rocket Lab USA Inc",oneLiner:"Rocket Lab launches small satellites and is developing the Neutron rocket — aiming to be the #2 player in commercial space.",riskTier:"Tier 3",positionSize:"1–3% of portfolio",beta:"~2.5",sleepTestVerdict:"RKLB is highly speculative — small position only.",nextCatalyst:"Neutron rocket first launch attempt, mid-2026",dcaStrategy:"Build very slowly with 6 small tranches over 6 months.",entryTiming:"Best entries are after launch failures or delays that create panic.",exitCriteria:"Exit if Neutron program faces major setback or 12+ month delay.",topRisks:["Neutron rocket development could fail or face years of delays","Stock trades on narrative — sentiment shifts cause violent moves","Burning cash heavily; could need dilutive equity raise"],steps:[{id:1,signal:"✅",reasoning:"Rocket Lab launches satellites for commercial and government customers, plus building Neutron. Simple business model."},{id:2,signal:"✅",reasoning:"Commercial space is one of the fastest-growing industries. Multi-decade tailwind from defense and commercial demand."},{id:3,signal:"✅",reasoning:"Revenue grew 50%+ in 2025 driven by Electron launches and HASTE missions."},{id:4,signal:"🚩",reasoning:"Still unprofitable with negative FCF. Profitability years away."},{id:5,signal:"⚠️",reasoning:"Cash position adequate but burns through it quickly."},{id:6,signal:"🚩",reasoning:"Trading at 25x+ sales with no profits — pure narrative valuation."},{id:7,signal:"⚠️",reasoning:"Mixed analyst views — bulls love Neutron opportunity, bears worry about execution risk."},{id:8,signal:"🚩",reasoning:"Neutron execution is the dominant risk."}]},
  IONQ: {ticker:"IONQ",name:"IonQ Inc",tag:"AI & Tech",stage:"early",thesis:"Pure-play quantum computing — could be massive if quantum hits commercial scale.",companyName:"IonQ Inc",oneLiner:"IonQ builds trapped-ion quantum computers — one of the few public ways to bet on quantum computing.",riskTier:"Tier 3",positionSize:"1–2% of portfolio",beta:"~3.0",sleepTestVerdict:"IONQ is highly speculative — only invest money you can afford to lose entirely.",nextCatalyst:"Quantum computing milestones; partnership announcements",dcaStrategy:"Tiny tranches over 12+ months. Quantum is a long-duration bet.",entryTiming:"Buy on big drawdowns of 40%+ from highs.",exitCriteria:"Exit if quantum advantage proves decades away rather than years.",topRisks:["Quantum computing might not achieve commercial usefulness for many years","Competition from much larger players (IBM, Google, Microsoft)","Stock highly sensitive to AI/tech sentiment swings"],steps:[{id:1,signal:"⚠️",reasoning:"Builds quantum computers using trapped ions. Business model still developing."},{id:2,signal:"✅",reasoning:"If quantum reaches commercial scale, addressable market is enormous. Timing highly uncertain."},{id:3,signal:"⚠️",reasoning:"Revenue growing fast but from very small base."},{id:4,signal:"🚩",reasoning:"Deeply unprofitable with significant cash burn."},{id:5,signal:"⚠️",reasoning:"Has cash but burns through it."},{id:6,signal:"🚩",reasoning:"Trading at extreme price-to-sales multiples."},{id:7,signal:"⚠️",reasoning:"Bullish analyst views but heavy insider selling."},{id:8,signal:"🚩",reasoning:"Quantum may not reach commercial scale for many years."}]},
  PLTR: {ticker:"PLTR",name:"Palantir Technologies",tag:"AI & Tech",stage:"growth",thesis:"AI Platform (AIP) is becoming the operating system for enterprise AI deployments.",companyName:"Palantir Technologies Inc",oneLiner:"Palantir builds data platforms (Foundry, Gotham, AIP) that help governments and enterprises deploy AI at scale.",riskTier:"Tier 3",positionSize:"2–4% of portfolio",beta:"~2.6",sleepTestVerdict:"PLTR is high-volatility and richly valued — small position even for believers.",nextCatalyst:"Q1 2026 earnings, May 2026",dcaStrategy:"Build slowly given extreme valuation. 5–6 small tranches over 4–6 months.",entryTiming:"Best entries are after earnings disappointments or broad tech selloffs.",exitCriteria:"Trim if commercial growth slows below 50%.",topRisks:["Trading at among the highest valuations in software","Government revenue concentration","Competition from Microsoft, Snowflake, Databricks intensifying"],steps:[{id:1,signal:"✅",reasoning:"Sells software platforms to governments and enterprises for AI workflows."},{id:2,signal:"✅",reasoning:"Enterprise AI adoption is a massive multi-year tailwind."},{id:3,signal:"✅",reasoning:"US commercial revenue growing over 70% YoY."},{id:4,signal:"✅",reasoning:"Recently became GAAP profitable with expanding margins."},{id:5,signal:"✅",reasoning:"Net cash position with minimal debt."},{id:6,signal:"🚩",reasoning:"Forward P/E above 100x. Pricing in many years of perfect execution."},{id:7,signal:"⚠️",reasoning:"Mixed analyst views. CEO occasionally makes large stock sales."},{id:8,signal:"🚩",reasoning:"Valuation is the dominant risk."}]},
  ASTS: {ticker:"ASTS",name:"AST SpaceMobile",tag:"Space",stage:"early",thesis:"Satellite-to-phone service — could disrupt cellular if technology works at scale.",companyName:"AST SpaceMobile Inc",oneLiner:"AST is building a constellation of satellites that connect directly to standard smartphones.",riskTier:"Tier 3",positionSize:"1–2% of portfolio",beta:"~3.5",sleepTestVerdict:"ASTS is binary — could be a 10x or could go to zero.",nextCatalyst:"Commercial service launch, expected late 2026 or 2027",dcaStrategy:"Tiny positions over 6+ months.",entryTiming:"Wait for satellite deployment milestones.",exitCriteria:"Exit if commercial service launch is delayed by 18+ months.",topRisks:["Technology may not scale economically","Competition from Starlink direct-to-cell","Cash burn requires repeated equity dilution"],steps:[{id:1,signal:"⚠️",reasoning:"Building satellite constellation for direct-to-phone connectivity."},{id:2,signal:"✅",reasoning:"Cellular dead zones are a major problem. Massive market if tech works."},{id:3,signal:"🚩",reasoning:"Negligible revenue today — purely pre-commercial."},{id:4,signal:"🚩",reasoning:"Heavy ongoing losses with no near-term path to profitability."},{id:5,signal:"🚩",reasoning:"High cash burn; will require multiple additional equity raises."},{id:6,signal:"🚩",reasoning:"Hard to value with no revenue."},{id:7,signal:"⚠️",reasoning:"Strong partnerships with Verizon, AT&T, Vodafone. Heavy insider selling has occurred."},{id:8,signal:"🚩",reasoning:"Technology execution risk is dominant."}]},
  CRWV: {ticker:"CRWV",name:"CoreWeave Inc",tag:"AI & Tech",stage:"early",thesis:"AI-native cloud provider — pure-play on AI compute demand.",companyName:"CoreWeave Inc",oneLiner:"CoreWeave provides cloud GPU services optimized for AI workloads.",riskTier:"Tier 3",positionSize:"1–3% of portfolio",beta:"~3.0",sleepTestVerdict:"CRWV is volatile and highly leveraged.",nextCatalyst:"Quarterly earnings; major customer contract announcements",dcaStrategy:"Small tranches over 4–6 months.",entryTiming:"Buy on broader AI sentiment pullbacks.",exitCriteria:"Exit if AI capex shows signs of slowing.",topRisks:["Heavy debt load — sensitive to interest rates","Customer concentration with Microsoft and Meta","Margins could compress as competition intensifies"],steps:[{id:1,signal:"✅",reasoning:"Operates GPU-based cloud infrastructure rented to AI companies."},{id:2,signal:"✅",reasoning:"AI compute demand is the most powerful tailwind in tech."},{id:3,signal:"✅",reasoning:"Revenue growing several hundred percent year-over-year."},{id:4,signal:"⚠️",reasoning:"Revenue scaling fast but profitability uncertain due to massive depreciation."},{id:5,signal:"🚩",reasoning:"Heavy debt load taken on to buy GPUs."},{id:6,signal:"🚩",reasoning:"Trading at high multiples that depend on continued AI capex."},{id:7,signal:"⚠️",reasoning:"Mixed analyst views."},{id:8,signal:"🚩",reasoning:"Customer concentration is concerning."}]},
  NBIS: {ticker:"NBIS",name:"Nebius Group",tag:"AI & Tech",stage:"early",thesis:"AI 'neocloud' with $50B contracted backlog from Meta, Microsoft, and Nvidia partnership.",companyName:"Nebius Group N.V.",oneLiner:"Nebius is an Amsterdam-based AI infrastructure 'neocloud' that emerged from Yandex's international assets — building purpose-built GPU data centers for hyperscaler AI workloads.",riskTier:"Tier 3",positionSize:"2–4% of portfolio",beta:"~2.8",sleepTestVerdict:"NBIS has run hard (up 87% YTD, 434% over the past year). High volatility — small position only, even for believers.",nextCatalyst:"Q1 2026 earnings reported April 29; H2 2026 Vera Rubin platform deployment",dcaStrategy:"Build slowly given the post-rally setup. 5–6 small tranches over 4–6 months. Expect 20%+ swings on AI sentiment news.",entryTiming:"Best entries are during AI-sector pullbacks or after profit-taking resets (RSI was overbought at 75 recently). Wait for consolidation rather than chasing breakouts.",exitCriteria:"Exit if Meta/Microsoft renegotiate or reduce contracted capacity. Trim aggressively if data center buildout falls behind schedule. Watch for any Vera Rubin deployment delays in H2 2026.",topRisks:["$16–20B 2026 capex against $3–3.4B revenue — significant financing risk; ~40% of funding still needs to be raised","Backlog depends on Meta/Microsoft not renegotiating; concentration is extreme","Premium valuation (~47x trailing sales, 53x P/S TTM); insider selling of ~$14.7M in past 90 days"],steps:[{id:1,signal:"✅",reasoning:"Full-stack AI infrastructure — large-scale GPU clusters and cloud platforms purpose-built for AI workloads. Plus smaller businesses (Toloka data, TripleTen edtech, Avride autonomous driving)."},{id:2,signal:"✅",reasoning:"AI compute demand is the most powerful tailwind in tech. Even Microsoft (which owns Azure) is leasing external GPU capacity from Nebius — that tells you everything about supply tightness."},{id:3,signal:"✅",reasoning:"Q1 2026 revenue ~$375M, sequential jump from $227M in Q4 2025. Full-year 2026 guidance of $3–3.4B vs $530M in 2025 — implying 6x revenue expansion if execution holds."},{id:4,signal:"🚩",reasoning:"Deeply unprofitable with massive losses. Q1 2026 expected loss of $0.81/share. Profitability years away as company prioritizes capacity buildout."},{id:5,signal:"🚩",reasoning:"Already issued $4.6B in convertibles. Has authorized ATM equity program — dilution is built into the growth plan. Capital structure is the central risk."},{id:6,signal:"🚩",reasoning:"Trading at ~47x trailing sales — premium even for AI infrastructure. Bull case requires flawless execution on $16–20B capex plan."},{id:7,signal:"✅",reasoning:"12 analysts rate Strong Buy with avg target ~$163. Wedbush named NBIS top AI infrastructure pick. But notable insider selling of ~$14.7M in past 90 days warrants caution."},{id:8,signal:"🚩",reasoning:"Execution risk on capex buildout is dominant. Backlog concentration with Meta/Microsoft creates renegotiation risk. Geopolitical overhang from Yandex origin still lingers."}]},
  HOOD: {ticker:"HOOD",name:"Robinhood Markets",tag:"Financials",stage:"growth",thesis:"Crypto resurgence + product expansion = re-rating opportunity.",companyName:"Robinhood Markets Inc",oneLiner:"Robinhood is a retail brokerage app — earning revenue from trading, interest, crypto, and premium subs.",riskTier:"Tier 2",positionSize:"3–5% of portfolio",beta:"~2.0",sleepTestVerdict:"HOOD swings hard with markets and crypto.",nextCatalyst:"Q1 2026 earnings, May 2026",dcaStrategy:"Build over 3–4 months.",entryTiming:"Best entries during crypto winters or market selloffs.",exitCriteria:"Trim if retail trading volumes collapse for two consecutive quarters.",topRisks:["Heavy revenue sensitivity to crypto cycles","Regulatory risk on payment-for-order-flow","Competition from established brokerages"],steps:[{id:1,signal:"✅",reasoning:"Retail brokerage app with multiple revenue streams."},{id:2,signal:"✅",reasoning:"Retail investing growth and crypto adoption are durable trends."},{id:3,signal:"✅",reasoning:"Revenue growing 30%+ YoY."},{id:4,signal:"✅",reasoning:"Recently became consistently profitable with expanding margins."},{id:5,signal:"✅",reasoning:"Net cash position."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 35x reflects optimistic expectations."},{id:7,signal:"✅",reasoning:"Buy consensus from most analysts."},{id:8,signal:"⚠️",reasoning:"Crypto market dependence is the dominant risk."}]},
  RBLX: {ticker:"RBLX",name:"Roblox Corporation",tag:"AI & Tech",stage:"growth",thesis:"Gaming platform that's become a default social network for kids globally.",companyName:"Roblox Corporation",oneLiner:"Roblox is an online gaming platform where users create and play games.",riskTier:"Tier 2",positionSize:"3–5% of portfolio",beta:"~2.0",sleepTestVerdict:"RBLX is high-beta but has clear network effects.",nextCatalyst:"Q1 2026 earnings, May 2026",dcaStrategy:"Build over 3–4 months. Add aggressively on 15%+ pullbacks.",entryTiming:"Best entries during periods of bookings deceleration that prove temporary.",exitCriteria:"Exit if daily active user growth turns negative for two quarters.",topRisks:["Heavy dependence on Apple/Google app store policies","Safety/moderation concerns with young user base","Heavy stock-based compensation dilutes shareholders"],steps:[{id:1,signal:"✅",reasoning:"Free-to-play gaming platform with virtual currency model."},{id:2,signal:"✅",reasoning:"Roblox has become a default social network for younger demographics."},{id:3,signal:"✅",reasoning:"Bookings growing 20%+."},{id:4,signal:"⚠️",reasoning:"Bookings strong but GAAP profits remain elusive due to SBC."},{id:5,signal:"✅",reasoning:"Net cash position."},{id:6,signal:"⚠️",reasoning:"Valuation rich on traditional metrics."},{id:7,signal:"⚠️",reasoning:"Mixed analyst views."},{id:8,signal:"⚠️",reasoning:"App store dependence is structural risk."}]},
  VRT: {ticker:"VRT",name:"Vertiv Holdings",tag:"Infrastructure",stage:"growth",thesis:"Powers AI data centers with cooling & power management.",companyName:"Vertiv Holdings Co",oneLiner:"Vertiv designs and services critical power and cooling infrastructure that every AI data center depends on.",riskTier:"Tier 2",positionSize:"5–8% of portfolio",beta:"~2.05 (high volatility)",sleepTestVerdict:"VRT is highly volatile — if a 30% drop would panic you, size to 3–4% max.",nextCatalyst:"Q2 2026 earnings, August 5, 2026",dcaStrategy:"Given VRT's high beta of 2.05, split position into 4 equal tranches over 3 months.",entryTiming:"Watch for pullbacks toward $230–240 support zone.",exitCriteria:"Trim if VRT trades above 60x forward earnings without guidance upgrades.",topRisks:["High beta of 2.05 means VRT falls harder than market","APAC and EMEA revenue declining","Tariff headwinds could compress margins"],steps:[{id:1,signal:"✅",reasoning:"Vertiv makes power and cooling gear for data centers — sells hardware plus recurring service contracts."},{id:2,signal:"✅",reasoning:"AI infrastructure buildout is a multi-year secular trend."},{id:3,signal:"✅",reasoning:"Q1 2026 EPS beat at $1.17 vs $1.01 estimate. Full-year 2026 guidance raised."},{id:4,signal:"✅",reasoning:"Q4 2025 free cash flow margin hit 31.6%."},{id:5,signal:"⚠️",reasoning:"Net debt of ~$1.4B. Manageable given $1.89B annual FCF."},{id:6,signal:"⚠️",reasoning:"Forward P/E of ~42x. PEG ratio of 1.33."},{id:7,signal:"✅",reasoning:"22 of 25 analysts rate VRT a Buy. 10 executives made equity purchases in March 2026."},{id:8,signal:"⚠️",reasoning:"Beta of 2.05 makes VRT very sensitive to market selloffs."}]},
  HIMS: {ticker:"HIMS",name:"Hims & Hers Health",tag:"Healthcare",stage:"growth",thesis:"Telehealth platform with strong GLP-1 tailwind.",companyName:"Hims & Hers Health Inc",oneLiner:"Hims runs a direct-to-consumer telehealth platform offering weight loss, hair loss, sexual health, and mental health treatments.",riskTier:"Tier 3",positionSize:"2–4% of portfolio",beta:"~2.5",sleepTestVerdict:"HIMS is extremely volatile — single news items move it 20%+.",nextCatalyst:"Q1 2026 earnings, May 11, 2026",dcaStrategy:"Build slowly given regulatory uncertainty.",entryTiming:"Best entries are after negative GLP-1 regulatory news creates dips.",exitCriteria:"Exit if FDA permanently bans compounded GLP-1 sales.",topRisks:["FDA could permanently ban compounded GLP-1 sales","Competition from Eli Lilly direct-to-consumer","Customer acquisition costs rising"],steps:[{id:1,signal:"✅",reasoning:"DTC telehealth platform — clear subscription business."},{id:2,signal:"✅",reasoning:"Telehealth and DTC healthcare are growing structurally."},{id:3,signal:"✅",reasoning:"Revenue growth exceeded 65% in 2024–2025."},{id:4,signal:"✅",reasoning:"Recently turned FCF positive with expanding margins."},{id:5,signal:"✅",reasoning:"Net cash position with minimal debt."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 35x prices in continued GLP-1 growth."},{id:7,signal:"⚠️",reasoning:"Analyst views split sharply. Insider selling has been notable."},{id:8,signal:"🚩",reasoning:"FDA regulatory action on compounded GLP-1s is the central risk."}]},
  AXON: {ticker:"AXON",name:"Axon Enterprise",tag:"AI & Tech",stage:"growth",thesis:"Taser & body cam monopoly expanding into AI software.",companyName:"Axon Enterprise Inc",oneLiner:"Axon makes Tasers, body cameras, and cloud software for law enforcement.",riskTier:"Tier 2",positionSize:"5–8% of portfolio",beta:"~1.0",sleepTestVerdict:"AXON is high quality but not cheap.",nextCatalyst:"Q1 2026 earnings, May 6, 2026",dcaStrategy:"AXON is a long-term compounder — DCA over 3 months in 3 tranches.",entryTiming:"AXON tends to be expensive. Best entries after broad market selloffs.",exitCriteria:"Trim if software ARR growth slows below 25%.",topRisks:["Premium valuation leaves little room for execution stumbles","Public sector budget pressure","Competition from emerging body camera vendors"],steps:[{id:1,signal:"✅",reasoning:"Hardware plus high-margin recurring software model."},{id:2,signal:"✅",reasoning:"Body camera adoption continues globally and AI software is expanding wallet share."},{id:3,signal:"✅",reasoning:"Revenue grew 30%+ in 2025 with software ARR growing 35%+."},{id:4,signal:"✅",reasoning:"Operating margins around 25% and expanding."},{id:5,signal:"✅",reasoning:"Net cash position."},{id:6,signal:"🚩",reasoning:"Forward P/E around 70x. PEG above 2.0."},{id:7,signal:"✅",reasoning:"Strong Buy consensus."},{id:8,signal:"⚠️",reasoning:"Valuation is the biggest risk."}]},
  CAVA: {ticker:"CAVA",name:"CAVA Group",tag:"Consumer",stage:"growth",thesis:"Mediterranean fast-casual growing like early Chipotle.",companyName:"CAVA Group Inc",oneLiner:"CAVA operates fast-casual Mediterranean restaurants with strong unit economics.",riskTier:"Tier 3",positionSize:"2–4% of portfolio",beta:"~2.1",sleepTestVerdict:"CAVA is a story stock — extremely volatile and richly valued.",nextCatalyst:"Q1 2026 earnings, May 12, 2026",dcaStrategy:"Build very slowly over 6 months in small tranches.",entryTiming:"Wait for pullbacks of 15%+ from highs.",exitCriteria:"Exit if same-store sales growth falls below 5% for two consecutive quarters.",topRisks:["Premium valuation requires flawless execution","SSS growth has decelerated","Restaurant industry is competitive"],steps:[{id:1,signal:"✅",reasoning:"CAVA operates Mediterranean fast-casual restaurants."},{id:2,signal:"✅",reasoning:"Fast-casual continues to take share. Mediterranean cuisine benefits from health trends."},{id:3,signal:"✅",reasoning:"Revenue growth above 30%."},{id:4,signal:"⚠️",reasoning:"Recently turned profitable."},{id:5,signal:"✅",reasoning:"Net cash position from IPO proceeds."},{id:6,signal:"🚩",reasoning:"Forward P/E above 100x."},{id:7,signal:"⚠️",reasoning:"Mixed analyst views."},{id:8,signal:"🚩",reasoning:"Valuation is the biggest risk."}]},
  CELH: {ticker:"CELH",name:"Celsius Holdings",tag:"Consumer",stage:"growth",thesis:"Fast-growing energy drink taking share from Monster.",companyName:"Celsius Holdings Inc",oneLiner:"Celsius makes functional energy drinks marketed as healthier alternatives, distributed through PepsiCo.",riskTier:"Tier 3",positionSize:"2–4% of portfolio",beta:"~1.8",sleepTestVerdict:"CELH has had massive drawdowns (50%+).",nextCatalyst:"Q1 2026 earnings, early May 2026",dcaStrategy:"Build slowly with 5–6 small tranches over 4 months.",entryTiming:"Wait for evidence of growth re-acceleration.",exitCriteria:"Exit if quarterly revenue growth falls below 10% for two consecutive quarters.",topRisks:["Growth has decelerated from 2023 peak","Pepsi distribution renegotiation could pressure margins","Competitive intensity from Monster and Red Bull"],steps:[{id:1,signal:"✅",reasoning:"Celsius sells energy drinks distributed via PepsiCo."},{id:2,signal:"✅",reasoning:"Energy drink category continues to grow."},{id:3,signal:"⚠️",reasoning:"Revenue growth has decelerated sharply."},{id:4,signal:"✅",reasoning:"Operating margins healthy at 20%+."},{id:5,signal:"✅",reasoning:"Net cash position."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 25x reflects expectations of growth re-acceleration."},{id:7,signal:"⚠️",reasoning:"Mixed analyst views."},{id:8,signal:"🚩",reasoning:"Growth deceleration is the biggest risk."}]},
  ENPH: {ticker:"ENPH",name:"Enphase Energy",tag:"Energy",stage:"growth",thesis:"Home solar microinverter leader in clean energy market.",companyName:"Enphase Energy Inc",oneLiner:"Enphase makes microinverters and battery storage for residential solar.",riskTier:"Tier 3",positionSize:"2–4% of portfolio",beta:"~2.0",sleepTestVerdict:"ENPH has been in a deep multi-year drawdown.",nextCatalyst:"Q2 2026 earnings, late July 2026",dcaStrategy:"DCA slowly given continued sector weakness.",entryTiming:"Wait for evidence of demand stabilization.",exitCriteria:"Exit if US residential solar installations decline another 20%+ in 2026.",topRisks:["High interest rates crushing residential solar demand","California NEM 3.0 policy reducing solar economics","Increased competition from Tesla Powerwall"],steps:[{id:1,signal:"✅",reasoning:"Enphase makes microinverters and batteries for home solar."},{id:2,signal:"⚠️",reasoning:"Long-term clean energy positive but residential solar near-term challenged."},{id:3,signal:"🚩",reasoning:"Revenue declined sharply in 2024 and 2025."},{id:4,signal:"⚠️",reasoning:"Margins compressed during downturn. Recovery in progress."},{id:5,signal:"⚠️",reasoning:"Carries some convertible debt."},{id:6,signal:"⚠️",reasoning:"Forward P/E hard to peg given depressed earnings."},{id:7,signal:"⚠️",reasoning:"Analyst views are mixed."},{id:8,signal:"🚩",reasoning:"Demand recovery is the central question."}]},
  VST: {ticker:"VST",name:"Vistra Energy",tag:"Energy",stage:"growth",thesis:"Power generator riding AI data center electricity surge.",companyName:"Vistra Corp",oneLiner:"Vistra is a Texas-based power generator with nuclear and gas assets.",riskTier:"Tier 2",positionSize:"4–7% of portfolio",beta:"~1.3",sleepTestVerdict:"VST has run hard but remains a real cash-flow story.",nextCatalyst:"Q1 2026 earnings, May 7, 2026",dcaStrategy:"DCA in 4 tranches over 3 months. Add aggressively only on 10%+ pullbacks.",entryTiming:"Wait for pullbacks given the strong rally.",exitCriteria:"Trim if power prices weaken materially.",topRisks:["Power price volatility — Texas (ERCOT) market","Nuclear plant operational issues","Stock has rerated significantly already"],steps:[{id:1,signal:"✅",reasoning:"Vistra generates and sells electricity from nuclear, gas, and coal plants."},{id:2,signal:"✅",reasoning:"AI data centers driving largest US electricity demand growth in decades."},{id:3,signal:"✅",reasoning:"Revenue growth accelerated with Energy Harbor acquisition."},{id:4,signal:"✅",reasoning:"FCF generation strong and growing."},{id:5,signal:"⚠️",reasoning:"Carries notable debt from Energy Harbor deal."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 25x is no longer cheap."},{id:7,signal:"✅",reasoning:"Strong Buy consensus."},{id:8,signal:"⚠️",reasoning:"Power price volatility is central risk."}]},
  NVDA: {ticker:"NVDA",name:"NVIDIA Corporation",tag:"AI & Tech",stage:"established",thesis:"Dominates AI chip supply — GPUs are the engine of AI.",companyName:"NVIDIA Corporation",oneLiner:"NVIDIA designs the GPUs and software (CUDA) that power virtually every AI training and inference workload globally.",riskTier:"Tier 2",positionSize:"5–10% of portfolio",beta:"~1.7",sleepTestVerdict:"NVDA can move 10%+ on earnings.",nextCatalyst:"Q1 FY27 earnings, May 20, 2026",dcaStrategy:"NVDA is a core AI holding but expensive. Split into 3 tranches over 2 months.",entryTiming:"Watch for entries on broader market pullbacks.",exitCriteria:"Trim if AI capex from hyperscalers shows signs of slowing.",topRisks:["Customer concentration — top 4 hyperscalers drive most revenue","Custom silicon competition (Google TPU, AWS Trainium)","China export restrictions"],steps:[{id:1,signal:"✅",reasoning:"NVIDIA designs GPUs that power AI workloads, plus CUDA software lock-in."},{id:2,signal:"✅",reasoning:"AI compute demand growing 50%+ annually."},{id:3,signal:"✅",reasoning:"Revenue grew over 60% in fiscal 2025."},{id:4,signal:"✅",reasoning:"Operating margins above 60% — extraordinary for hardware."},{id:5,signal:"✅",reasoning:"Net cash position with $40B+ in cash."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 30x. PEG under 1.0."},{id:7,signal:"✅",reasoning:"Overwhelming Buy consensus."},{id:8,signal:"⚠️",reasoning:"Customer concentration is the biggest risk."}]},
  TSM: {ticker:"TSM",name:"Taiwan Semiconductor",tag:"AI & Tech",stage:"established",thesis:"Manufactures chips for Apple, NVDA, AMD — irreplaceable.",companyName:"Taiwan Semiconductor Manufacturing",oneLiner:"TSMC manufactures the world's most advanced semiconductors.",riskTier:"Tier 2",positionSize:"5–10% of portfolio",beta:"~1.2",sleepTestVerdict:"TSM is high quality with one geopolitical wild card.",nextCatalyst:"Q2 2026 earnings, mid-July 2026",dcaStrategy:"TSM is a core compounder — DCA over 2 months in 3 tranches.",entryTiming:"Best entries during Taiwan Strait tension headlines.",exitCriteria:"Exit if there's credible evidence of imminent China-Taiwan military escalation.",topRisks:["Geopolitical risk — China-Taiwan tensions","Customer concentration with Apple and NVIDIA","Competition from Samsung and Intel"],steps:[{id:1,signal:"✅",reasoning:"TSMC manufactures chips designed by others. Pure-play foundry."},{id:2,signal:"✅",reasoning:"AI chip demand exploding and TSMC is the only company that can manufacture most advanced GPUs."},{id:3,signal:"✅",reasoning:"Revenue grew 30%+ in 2025."},{id:4,signal:"✅",reasoning:"Operating margins above 45%."},{id:5,signal:"✅",reasoning:"Net cash position."},{id:6,signal:"✅",reasoning:"Forward P/E around 22x is reasonable."},{id:7,signal:"✅",reasoning:"Strong Buy consensus globally."},{id:8,signal:"🚩",reasoning:"Geopolitical risk is the dominant concern."}]},
  MA: {ticker:"MA",name:"Mastercard",tag:"Financials",stage:"established",thesis:"Toll booth on global spending — wide moat, high margins.",companyName:"Mastercard Incorporated",oneLiner:"Mastercard operates the global payment network — earning a small fee on every transaction.",riskTier:"Tier 1",positionSize:"5–10% of portfolio",beta:"~1.1",sleepTestVerdict:"MA is a high-quality compounder.",nextCatalyst:"Q1 2026 earnings, April 30, 2026",dcaStrategy:"MA is a textbook DCA name.",entryTiming:"Best entries during broader market selloffs or recession fears.",exitCriteria:"MA is a long-term hold for most investors.",topRisks:["Regulatory pressure on interchange fees","Competitive threats from real-time payment systems","Recession risk"],steps:[{id:1,signal:"✅",reasoning:"Takes a fee on every transaction. Predictable business."},{id:2,signal:"✅",reasoning:"Cash-to-card conversion globally still has years of runway."},{id:3,signal:"✅",reasoning:"Revenue growth consistently in mid-to-high teens."},{id:4,signal:"✅",reasoning:"Operating margins above 55%."},{id:5,signal:"✅",reasoning:"Manageable debt with strong cash generation."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 30x reflects quality."},{id:7,signal:"✅",reasoning:"Strong Buy consensus."},{id:8,signal:"⚠️",reasoning:"Regulatory risk on interchange fees is persistent."}]},
  COST: {ticker:"COST",name:"Costco Wholesale",tag:"Consumer",stage:"established",thesis:"Membership flywheel + consistent execution = decade-long compounder.",companyName:"Costco Wholesale Corporation",oneLiner:"Costco runs membership warehouse stores.",riskTier:"Tier 1",positionSize:"5–15% of portfolio",beta:"~0.9",sleepTestVerdict:"COST is a sleep-well-at-night holding.",nextCatalyst:"Q3 FY26 earnings, late May 2026",dcaStrategy:"COST rarely gets cheap — DCA regularly.",entryTiming:"Best entries during broader retail selloffs.",exitCriteria:"COST is a long-term hold.",topRisks:["Forward P/E above 50x is historically expensive","Sensitivity to consumer spending","Potential disruption from Amazon Prime"],steps:[{id:1,signal:"✅",reasoning:"Membership warehouse retailer."},{id:2,signal:"✅",reasoning:"Membership-driven retail continues to outperform."},{id:3,signal:"✅",reasoning:"Revenue and comparable sales growing high single digits."},{id:4,signal:"✅",reasoning:"Operating margins thin by design but consistently profitable."},{id:5,signal:"✅",reasoning:"Net cash position."},{id:6,signal:"🚩",reasoning:"Forward P/E above 50x is historically expensive."},{id:7,signal:"✅",reasoning:"Strong Buy consensus consistently."},{id:8,signal:"⚠️",reasoning:"Valuation is the main concern."}]},
  V: {ticker:"V",name:"Visa Inc",tag:"Financials",stage:"established",thesis:"Global payments duopolist — same toll-booth model as Mastercard.",companyName:"Visa Inc",oneLiner:"Visa operates the world's largest payment network.",riskTier:"Tier 1",positionSize:"5–15% of portfolio",beta:"~1.0",sleepTestVerdict:"V is a top-quality compounder.",nextCatalyst:"Q2 FY26 earnings, April 29, 2026",dcaStrategy:"V is a classic DCA name.",entryTiming:"Best entries during recession fears or market selloffs.",exitCriteria:"V is a multi-decade hold for most investors.",topRisks:["Regulatory pressure on interchange fees","Competition from real-time payment systems","Recession risk"],steps:[{id:1,signal:"✅",reasoning:"Operates global payment network."},{id:2,signal:"✅",reasoning:"Cash-to-digital payment migration continues globally."},{id:3,signal:"✅",reasoning:"Revenue growing at low double digits consistently."},{id:4,signal:"✅",reasoning:"Operating margins above 65%."},{id:5,signal:"✅",reasoning:"Manageable debt with massive cash generation."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 28x reflects quality."},{id:7,signal:"✅",reasoning:"Strong Buy consensus."},{id:8,signal:"⚠️",reasoning:"Regulatory pressure on interchange is persistent."}]},
  GOOGL: {ticker:"GOOGL",name:"Alphabet Inc",tag:"AI & Tech",stage:"established",thesis:"AI-pivot underway with strong Cloud, YouTube, and Search moats.",companyName:"Alphabet Inc (Class A)",oneLiner:"Alphabet owns Google Search, YouTube, Android, Cloud, Waymo.",riskTier:"Tier 1",positionSize:"5–15% of portfolio",beta:"~1.1",sleepTestVerdict:"GOOGL is a high-quality core holding.",nextCatalyst:"Q2 2026 earnings, late July 2026",dcaStrategy:"GOOGL is a classic DCA name.",entryTiming:"Best entries during AI competition fears that prove overblown.",exitCriteria:"GOOGL is a long-term hold.",topRisks:["AI competition could disrupt Search","Antitrust action could force divestiture","Heavy capex on AI infrastructure"],steps:[{id:1,signal:"✅",reasoning:"Owns Search, YouTube, Cloud, Android, Waymo. Most revenue is advertising."},{id:2,signal:"✅",reasoning:"Digital advertising continues growing."},{id:3,signal:"✅",reasoning:"Revenue growing 12–15% consistently. Cloud growing 30%+."},{id:4,signal:"✅",reasoning:"Operating margins around 30% with massive FCF."},{id:5,signal:"✅",reasoning:"Net cash position with $100B+."},{id:6,signal:"✅",reasoning:"Forward P/E around 22x is reasonable."},{id:7,signal:"✅",reasoning:"Strong Buy consensus."},{id:8,signal:"⚠️",reasoning:"AI competition to Search is the dominant long-term risk."}]},
  ANRO: {ticker:"ANRO",name:"Anaergia Inc",tag:"Energy",stage:"early",thesis:"Renewable natural gas from food waste — small cap with big TAM.",companyName:"Anaergia Inc",oneLiner:"Anaergia builds plants that convert food waste into renewable natural gas.",riskTier:"Tier 3",positionSize:"1–2% of portfolio",beta:"~2.5",sleepTestVerdict:"Speculative micro-cap.",nextCatalyst:"Major project announcements; quarterly results",dcaStrategy:"Tiny tranches over 6+ months.",entryTiming:"Wait for project win announcements.",exitCriteria:"Exit if cash burn rate accelerates.",topRisks:["Cash burn requires repeated equity raises","Niche market","Stock illiquid"],steps:[{id:1,signal:"✅",reasoning:"Builds anaerobic digestion plants for renewable natural gas."},{id:2,signal:"✅",reasoning:"RNG demand growing as utilities pursue decarbonization."},{id:3,signal:"⚠️",reasoning:"Revenue growth lumpy and project-dependent."},{id:4,signal:"🚩",reasoning:"Operating losses with negative FCF."},{id:5,signal:"🚩",reasoning:"Carries significant debt for early-stage company."},{id:6,signal:"⚠️",reasoning:"Hard to value with no profits."},{id:7,signal:"⚠️",reasoning:"Limited analyst coverage."},{id:8,signal:"🚩",reasoning:"Funding/dilution risk is dominant."}]},
  LMT: {ticker:"LMT",name:"Lockheed Martin",tag:"Defense",stage:"established",thesis:"Defense spending tailwind with F-35 dominance.",companyName:"Lockheed Martin Corporation",oneLiner:"Lockheed Martin makes F-35 fighters, missile defense systems, and space technology.",riskTier:"Tier 1",positionSize:"5–10% of portfolio",beta:"~0.5",sleepTestVerdict:"LMT is a defensive holding.",nextCatalyst:"Q2 2026 earnings, July 2026",dcaStrategy:"LMT is a classic DCA name.",entryTiming:"Best entries when defense budget concerns create temporary weakness.",exitCriteria:"Trim if F-35 program faces major issues.",topRisks:["Defense budget cuts (low probability)","F-35 program concentration","ESG concerns from some investors"],steps:[{id:1,signal:"✅",reasoning:"Defense contractor with predictable customers."},{id:2,signal:"✅",reasoning:"Global defense spending rising."},{id:3,signal:"✅",reasoning:"Revenue growing high single digits."},{id:4,signal:"✅",reasoning:"Operating margins around 12% — typical for defense primes."},{id:5,signal:"✅",reasoning:"Manageable debt."},{id:6,signal:"✅",reasoning:"Forward P/E around 18x is attractive."},{id:7,signal:"✅",reasoning:"Strong Buy consensus."},{id:8,signal:"⚠️",reasoning:"F-35 program concentration is main operational risk."}]},
  CCJ: {ticker:"CCJ",name:"Cameco Corporation",tag:"Energy",stage:"growth",thesis:"World's #2 uranium miner riding the nuclear renaissance — AI data centers driving uranium demand.",companyName:"Cameco Corporation",oneLiner:"Cameco is the world's second-largest uranium producer (15% of global supply) plus a 49% owner of Westinghouse Electric — a vertically integrated bet on the nuclear power revival.",riskTier:"Tier 2",positionSize:"3–5% of portfolio",beta:"~1.4",sleepTestVerdict:"CCJ has rallied 200%+ in a year and 600%+ over 5 years. Premium valuation creates real downside risk if sentiment shifts.",nextCatalyst:"Q1 2026 earnings, May 5, 2026 (before open)",dcaStrategy:"Stock has run hard. DCA over 4–5 months in equal tranches. Add aggressively only on 15%+ pullbacks or uranium price weakness.",entryTiming:"Best entries during uranium spot price corrections or broader nuclear sentiment cooling. Patient buyers get rewarded — the stock cycles.",exitCriteria:"Trim if uranium spot price falls below $70/lb sustainably. Exit if AI data center power demand thesis breaks (e.g., efficiency gains reduce nuclear need).",topRisks:["Premium valuation — Forward P/E ~92x and P/S ~22x vs 5-year average of 9x, leaves little margin for error","Stock tightly correlated with volatile uranium spot price","Q3 2025 earnings missed badly ($0.07 vs $0.23 expected) — execution can stumble"],steps:[{id:1,signal:"✅",reasoning:"Three-segment business: uranium mining (high-grade Canadian assets), fuel services (conversion/refining), and 49% Westinghouse stake (nuclear reactor tech). Vertically integrated nuclear fuel cycle play."},{id:2,signal:"✅",reasoning:"Nuclear renaissance driven by AI data center power demand, decarbonization, and energy security. 75 reactors under construction globally with 120 more planned. Multi-decade tailwind."},{id:3,signal:"✅",reasoning:"2025 revenue grew 11% to $3.48B. Earnings up 243% to $589M. Just signed $2.6B/9-year India supply contract in March 2026. Analysts expect 47% EPS growth in 2026, 33% more in 2027."},{id:4,signal:"✅",reasoning:"16.9% profit margin. Strong cash generation as uranium prices stay elevated ($84+/lb spot, Citi sees $100–125 this year)."},{id:5,signal:"✅",reasoning:"Strong balance sheet supports the Westinghouse JV and ongoing capex. Mining is capital-intensive but Cameco runs it conservatively."},{id:6,signal:"🚩",reasoning:"Forward P/E ~92x and trailing P/E ~131x vs no meaningful 5-year average due to past losses. P/S of 22x vs 5-year avg of 9x. Among the most expensive ways to play nuclear."},{id:7,signal:"✅",reasoning:"Strong Buy consensus from 17+ analysts. Median price target ~$140 with high of $175. 20 Buy / 3 Hold / 0 Sell ratings."},{id:8,signal:"⚠️",reasoning:"Valuation is dominant risk after 600% 5-year run. Uranium spot price volatility can cause violent swings. Recent earnings miss shows execution isn't always smooth."}]},
};

// ── INDIA STOCK DATABASE ──
const STOCK_DB_IN = {
  IDEAFORGE: {ticker:"IDEAFORGE",name:"ideaForge Technology",tag:"Defense",stage:"early",thesis:"India's drone leader with 50% market share — direct beneficiary of defense indigenization.",companyName:"ideaForge Technology Ltd",oneLiner:"ideaForge designs and manufactures Unmanned Aircraft Systems (UAS) — India's #1 drone maker holding 50% domestic market share, ranked 3rd globally in dual-use drones.",riskTier:"Tier 3",positionSize:"1–2% of portfolio",beta:"~2.2",sleepTestVerdict:"ideaForge is highly speculative — small position only. Order execution can be lumpy quarter-to-quarter.",nextCatalyst:"FY27 order book updates; defense procurement contract announcements",dcaStrategy:"Build very slowly with 5–6 small tranches over 6 months. Order delays cause violent moves.",entryTiming:"Best entries are after order delays or earnings disappointments. Stock has been weak — patience required.",exitCriteria:"Exit if order pipeline materially weakens or if a credible competitor takes meaningful share. Reassess after each quarterly result.",topRisks:["Order execution is lumpy — quarterly results can swing dramatically","Heavy concentration in defense procurement; civilian drone market still nascent","Negative ROE recently (-2.23% over 3 years) — needs scale to drive profitability"],steps:[{id:1,signal:"✅",reasoning:"Manufactures drones (UAVs) for defense, surveying, and enterprise customers. Clear product company with India's leading market share."},{id:2,signal:"✅",reasoning:"Make in India defense push and improving drone regulatory framework create multi-year tailwind. Domestic supply was nearly nonexistent until recently."},{id:3,signal:"⚠️",reasoning:"FY26 order inflow was ₹530 crore — meaningful but lumpy. Q4 FY26 revenue ₹141 crore. Growth is real but quarterly volatility high."},{id:4,signal:"🚩",reasoning:"Negative ROE of -2.23% over 3 years. Earnings include ₹22.3 crore other income. Path to consistent profitability still unclear."},{id:5,signal:"⚠️",reasoning:"Low interest coverage ratio is a flag. High debtor days (204 days) — working capital intensive."},{id:6,signal:"🚩",reasoning:"Hard to value with negative ROE. Trading at premium based on order book and market position rather than current earnings."},{id:7,signal:"⚠️",reasoning:"Recent insider selling (QE Securities, Junomoneta sold large blocks at ₹540ish). Limited analyst coverage given size."},{id:8,signal:"🚩",reasoning:"Order execution and customer concentration are dominant risks. Defense procurement cycles can stretch."}]},
  DATAPATTNS: {ticker:"DATAPATTNS",name:"Data Patterns India",tag:"Defense",stage:"early",thesis:"Defense electronics specialist with deep moats — radar, avionics, embedded systems for Indian defense.",companyName:"Data Patterns (India) Ltd",oneLiner:"Data Patterns makes radar systems, avionics, and embedded electronics for India's defense platforms — high switching costs and multi-year certification cycles create durable moats.",riskTier:"Tier 3",positionSize:"2–3% of portfolio",beta:"~1.8",sleepTestVerdict:"Data Patterns has strong moats but defense order timing creates volatility.",nextCatalyst:"Quarterly results; defense order book additions",dcaStrategy:"Build slowly over 4–5 months. Defense small-caps swing on order news.",entryTiming:"Best entries during periods of order execution lulls that prove temporary.",exitCriteria:"Exit if defense procurement growth slows materially or if a major program contract is lost.",topRisks:["Heavy reliance on Indian defense procurement","Long sales cycles — quarterly earnings can be lumpy","Premium valuation requires execution"],steps:[{id:1,signal:"✅",reasoning:"Defense electronics — radar systems, avionics, embedded systems. Specialized products with high switching costs."},{id:2,signal:"✅",reasoning:"Make in India defense indigenization is a multi-year tailwind. Defense electronics one of the most attractive sub-sectors."},{id:3,signal:"✅",reasoning:"Revenue growing 25%+ with strong order book providing visibility. Operating leverage as scale grows."},{id:4,signal:"✅",reasoning:"Operating margins above 30% — best-in-class for defense electronics. Strong cash conversion."},{id:5,signal:"✅",reasoning:"Net cash position. Conservative balance sheet supports R&D investment."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 50x reflects defense rerating and quality premium. Limited margin of safety."},{id:7,signal:"✅",reasoning:"Buy consensus with strong analyst conviction on moat durability."},{id:8,signal:"⚠️",reasoning:"Defense procurement timing and execution risk are main concerns."}]},
  MAZDOCK: {ticker:"MAZDOCK",name:"Mazagon Dock Shipbuilders",tag:"Defense",stage:"early",thesis:"Virtual monopoly in conventional submarines and destroyers — strategic Indian Navy supplier.",companyName:"Mazagon Dock Shipbuilders Ltd",oneLiner:"Mazagon Dock builds submarines, destroyers, and stealth frigates for the Indian Navy — virtually monopolistic position with ₹237B+ order book.",riskTier:"Tier 3",positionSize:"2–3% of portfolio",beta:"~2.0",sleepTestVerdict:"Mazagon Dock has had a 50% drawdown from highs — speculative tier despite quality.",nextCatalyst:"Naval order book additions; greenfield shipyard progress",dcaStrategy:"Stock has corrected ~50% from highs. DCA in 4–5 tranches over 4 months as the down-cycle stabilizes.",entryTiming:"After the recent correction, stock is closer to value zone. But timing of recovery uncertain — be patient.",exitCriteria:"Exit if order book materially shrinks or if execution delays compound. Trim aggressively on rallies above ₹3500.",topRisks:["Stock is down nearly 50% from 52-week high — momentum is broken","Naval order timing creates lumpy quarterly results","Capex on greenfield shipyard (₹50B) and Colombo Dockyard acquisition pressure near-term FCF"],steps:[{id:1,signal:"✅",reasoning:"Government-owned shipbuilder with virtual monopoly in conventional submarines and destroyers for Indian Navy."},{id:2,signal:"✅",reasoning:"Indian defense indigenization, naval expansion, and global shipbuilding upcycle create multi-year tailwind."},{id:3,signal:"✅",reasoning:"Revenue growing 30%+ with ₹237B+ order book providing 4–5 years of visibility."},{id:4,signal:"✅",reasoning:"Operating margins above 20%. Strong FCF generation supports growth investments."},{id:5,signal:"✅",reasoning:"Net cash position. Conservative balance sheet despite capex plans."},{id:6,signal:"⚠️",reasoning:"After 50% correction, valuation more reasonable but still reflects defense premium."},{id:7,signal:"⚠️",reasoning:"Mixed analyst views after the correction. Bulls see value at current levels; bears worry about momentum."},{id:8,signal:"🚩",reasoning:"Stock momentum broken — 50% drawdown from highs. Naval procurement timing remains lumpy."}]},
  HDFCBANK: {ticker:"HDFCBANK",name:"HDFC Bank",tag:"Financials",stage:"established",thesis:"India's largest private bank with deep retail franchise post-merger.",companyName:"HDFC Bank Ltd",oneLiner:"HDFC Bank is India's largest private sector bank, operating 9,100+ branches with strong retail and corporate banking franchises.",riskTier:"Tier 1",positionSize:"10–15% of portfolio",beta:"~0.9",sleepTestVerdict:"HDFC Bank is a core Indian banking holding — comfortable to size 10–15% for long-term holders.",nextCatalyst:"Q4 FY26 earnings, May 2026",dcaStrategy:"HDFC Bank is a classic DCA name. Build over 3–4 months. Add aggressively on any post-merger integration concerns.",entryTiming:"Best entries during periods of margin compression worries from merger integration. Stock typically recovers within 1–2 quarters.",exitCriteria:"Trim only if NPA ratios deteriorate meaningfully or if forward P/B exceeds 4.5x.",topRisks:["Post-merger integration complexities pressuring margins","Indian economy slowdown could hurt loan growth","Rising NPAs in unsecured retail segment"],steps:[{id:1,signal:"✅",reasoning:"Universal bank — earns from retail loans, corporate banking, credit cards, and fee income. Simple, scalable model."},{id:2,signal:"✅",reasoning:"Indian banking benefits from credit growth, financial inclusion, and digital adoption — multi-decade tailwind."},{id:3,signal:"✅",reasoning:"Loan book growing 17%+ annually. Deposit franchise expanding rapidly post-merger."},{id:4,signal:"✅",reasoning:"Net interest margin around 3.5%. ROA above 1.8%, ROE around 15% — best-in-class profitability."},{id:5,signal:"✅",reasoning:"Capital adequacy ratio above 17%. NPA ratio under 1.3% — among the cleanest balance sheets in Indian banking."},{id:6,signal:"⚠️",reasoning:"Trading at ~3x forward book — premium to peers but justified by quality. PEG around 1.5."},{id:7,signal:"✅",reasoning:"Strong Buy consensus from most analysts. FII ownership stable despite recent outflows."},{id:8,signal:"⚠️",reasoning:"Merger integration risk and competition from new-age fintech are the main concerns."}]},
  ICICIBANK: {ticker:"ICICIBANK",name:"ICICI Bank",tag:"Financials",stage:"growth",thesis:"Best-in-class growth among large Indian banks with 40% profit CAGR.",companyName:"ICICI Bank Ltd",oneLiner:"ICICI Bank is a leading private sector bank with strong retail and corporate banking, transformed by digital-first strategy.",riskTier:"Tier 1",positionSize:"8–12% of portfolio",beta:"~1.0",sleepTestVerdict:"ICICI Bank is a high-quality compounder — sleep-well-at-night holding.",nextCatalyst:"Q4 FY26 earnings, late April 2026",dcaStrategy:"DCA over 2–3 months. ICICI is one of India's best long-term compounders.",entryTiming:"Best entries during broader Indian banking sector selloffs or rate cut concerns.",exitCriteria:"Trim if NPA cycle turns or if growth slows below 12%.",topRisks:["Asset quality deterioration in commercial loan book","Indian rate cycle compressing margins","Macro slowdown affecting credit demand"],steps:[{id:1,signal:"✅",reasoning:"Diversified private bank with strong retail, corporate, and treasury operations."},{id:2,signal:"✅",reasoning:"Indian banking secular growth tailwinds — formalization, digital adoption, credit penetration."},{id:3,signal:"✅",reasoning:"5-year profit CAGR of nearly 40%. Loan growth above 17%."},{id:4,signal:"✅",reasoning:"ROE above 18% — among highest in Indian banking. NIM around 4%."},{id:5,signal:"✅",reasoning:"Cleaned up legacy NPAs. Capital adequacy ratio strong at 16%+."},{id:6,signal:"✅",reasoning:"Forward P/B around 3x is reasonable for growth and quality."},{id:7,signal:"✅",reasoning:"Strong Buy consensus. Insider activity normal."},{id:8,signal:"⚠️",reasoning:"Asset quality cycle and macro slowdown are persistent concerns."}]},
  RELIANCE: {ticker:"RELIANCE",name:"Reliance Industries",tag:"Energy",stage:"growth",thesis:"Energy-to-tech conglomerate with Jio and Retail driving next decade of growth.",companyName:"Reliance Industries Ltd",oneLiner:"Reliance is India's largest conglomerate — operating petrochemicals (legacy), Jio telecom (digital), and Retail (commerce).",riskTier:"Tier 1",positionSize:"8–12% of portfolio",beta:"~1.0",sleepTestVerdict:"Reliance is a core Indian holding given diversified businesses.",nextCatalyst:"Q4 FY26 earnings, May 2026; Jio IPO speculation",dcaStrategy:"Build over 3–4 months. Add on broader market selloffs.",entryTiming:"Best entries during oil price weakness that pressures O2C earnings.",exitCriteria:"Long-term hold. Trim only if Jio or Retail growth meaningfully decelerates.",topRisks:["Oil price volatility affecting O2C earnings","Jio competition from Airtel intensifying","Capex cycle for green energy may pressure cash flows"],steps:[{id:1,signal:"✅",reasoning:"Three-segment business: oil-to-chemicals (legacy), Jio telecom, Retail. Each has clear unit economics."},{id:2,signal:"✅",reasoning:"Digital and Retail segments riding India's consumption boom. Green energy is multi-decade tailwind."},{id:3,signal:"✅",reasoning:"Consolidated revenue growing 12%+ driven by Jio (15%+) and Retail (20%+)."},{id:4,signal:"✅",reasoning:"EBITDA margins improving as digital mix grows. FCF generation strong."},{id:5,signal:"⚠️",reasoning:"Heavy capex for green energy and 5G. Net debt elevated but manageable given cash flows."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 25x reflects optimism on Jio/Retail. Valuation depends on segment SOTP."},{id:7,signal:"✅",reasoning:"Buy consensus. Promoter holding stable."},{id:8,signal:"⚠️",reasoning:"Oil price volatility and Jio competitive intensity are key risks."}]},
  BEL: {ticker:"BEL",name:"Bharat Electronics",tag:"Defense",stage:"growth",thesis:"Indian defense electronics monopoly riding Make in India tailwind.",companyName:"Bharat Electronics Ltd",oneLiner:"BEL is India's largest defense electronics company, supplying radars, communication systems, and avionics to the armed forces.",riskTier:"Tier 2",positionSize:"3–5% of portfolio",beta:"~1.4",sleepTestVerdict:"BEL is moderate volatility with defense tailwind support.",nextCatalyst:"Order book updates; quarterly results",dcaStrategy:"Build over 4 months. Add on any defense budget concerns or order delays.",entryTiming:"Best entries during periods of order execution slowdowns that prove temporary.",exitCriteria:"Trim if forward P/E exceeds 50x. Exit if defense budget growth meaningfully slows.",topRisks:["Heavy reliance on government orders — single customer concentration","Order execution delays can cause quarterly volatility","Stock has rerated significantly already"],steps:[{id:1,signal:"✅",reasoning:"Government-owned defense electronics supplier. Sells radars, comms, avionics to Indian armed forces."},{id:2,signal:"✅",reasoning:"Indian defense modernization is a multi-decade tailwind. Make in India boosts domestic procurement."},{id:3,signal:"✅",reasoning:"Revenue growing 15%+ with strong order book of ₹70,000+ crore."},{id:4,signal:"✅",reasoning:"Operating margins around 20%. ROE above 25%. Strong cash generation."},{id:5,signal:"✅",reasoning:"Net cash position. Conservative balance sheet — no debt concerns."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 40x reflects defense rerating. Premium but supported by growth."},{id:7,signal:"✅",reasoning:"Buy consensus. Government ownership provides stability."},{id:8,signal:"⚠️",reasoning:"Government order dependence and execution risk are main concerns."}]},
  TATAMOTORS: {ticker:"TATAMOTORS",name:"Tata Motors",tag:"Consumer",stage:"growth",thesis:"EV transition + JLR turnaround = multi-year story.",companyName:"Tata Motors Ltd",oneLiner:"Tata Motors makes commercial vehicles, passenger cars including EVs, and owns Jaguar Land Rover (JLR).",riskTier:"Tier 2",positionSize:"3–5% of portfolio",beta:"~1.6",sleepTestVerdict:"Tata Motors is volatile — JLR exposure adds uncertainty.",nextCatalyst:"Q4 FY26 earnings, May 2026; JLR demand updates",dcaStrategy:"Build slowly over 4–5 months. Stock can swing 15%+ on JLR news.",entryTiming:"Best entries during JLR demand concerns or auto cycle slowdowns.",exitCriteria:"Exit if JLR margins deteriorate meaningfully. Trim on rallies if EV losses continue.",topRisks:["JLR exposure to global luxury auto demand","EV transition costs pressuring margins","Competition in Indian passenger vehicle market"],steps:[{id:1,signal:"✅",reasoning:"Multi-segment auto company — commercial vehicles (India leader), passenger cars including EVs, JLR luxury."},{id:2,signal:"✅",reasoning:"Indian auto demand growing structurally. EV transition is long-term tailwind."},{id:3,signal:"✅",reasoning:"Revenue grew 15%+ in FY25 driven by domestic CV recovery and JLR mix."},{id:4,signal:"⚠️",reasoning:"Margins improving but EV losses continue. JLR profitability cyclical."},{id:5,signal:"⚠️",reasoning:"Net debt declining but still elevated. Working capital intensive."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 12x — reasonable but reflects cyclical concerns."},{id:7,signal:"⚠️",reasoning:"Mixed analyst views — bulls on JLR turnaround, bears on EV losses."},{id:8,signal:"⚠️",reasoning:"JLR demand and EV transition costs are main risks."}]},
  TCS: {ticker:"TCS",name:"Tata Consultancy Services",tag:"AI & Tech",stage:"established",thesis:"India's largest IT services firm pivoting to AI/cloud integration.",companyName:"Tata Consultancy Services Ltd",oneLiner:"TCS is India's largest IT services company, providing technology consulting, application development, and outsourcing globally.",riskTier:"Tier 1",positionSize:"5–10% of portfolio",beta:"~0.7",sleepTestVerdict:"TCS is a defensive Indian IT play with strong dividend.",nextCatalyst:"Q4 FY26 earnings, April 2026",dcaStrategy:"TCS is a classic DCA name with steady dividend.",entryTiming:"Best entries during global IT spending concerns that prove overblown.",exitCriteria:"Trim only on extreme valuation or if AI commoditizes IT services materially.",topRisks:["AI could automate traditional IT services","Global tech spending slowdown","Currency fluctuations affecting margins"],steps:[{id:1,signal:"✅",reasoning:"IT services and consulting business. Sells projects and managed services to global enterprises."},{id:2,signal:"✅",reasoning:"AI/cloud transformation creates new opportunities, but commoditization risk exists."},{id:3,signal:"⚠️",reasoning:"Revenue growth slowed to 5–8% as IT spending weakens. AI-related revenue accelerating."},{id:4,signal:"✅",reasoning:"Operating margins around 24%. ROE above 50% — among the world's most profitable IT firms."},{id:5,signal:"✅",reasoning:"Net cash position. Returns most cash via dividends and buybacks."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 28x is premium for slowing growth."},{id:7,signal:"⚠️",reasoning:"Mixed analyst views — bulls on AI tailwind, bears on growth deceleration."},{id:8,signal:"⚠️",reasoning:"AI disruption to traditional services is the long-term risk."}]},
  LT: {ticker:"LT",name:"Larsen & Toubro",tag:"Infrastructure",stage:"growth",thesis:"India infrastructure proxy with diversification into data centers and green hydrogen.",companyName:"Larsen & Toubro Ltd",oneLiner:"L&T is India's largest engineering and construction company, often called a proxy for India's infrastructure development.",riskTier:"Tier 1",positionSize:"5–10% of portfolio",beta:"~1.2",sleepTestVerdict:"L&T is a core Indian infra play with diversified risk profile.",nextCatalyst:"Q4 FY26 earnings, May 2026; order book updates",dcaStrategy:"DCA over 3–4 months. Add on infrastructure spending concerns.",entryTiming:"Best entries during budget execution concerns or rate hike cycles.",exitCriteria:"Trim if infrastructure spending decelerates or order book growth slows.",topRisks:["Government infra spending dependence","Execution delays on large projects","Margin pressure from raw material costs"],steps:[{id:1,signal:"✅",reasoning:"Diversified engineering company — construction, defense, technology services. Multi-segment exposure."},{id:2,signal:"✅",reasoning:"India's massive infrastructure push (railways, roads, defense, green energy) is a multi-decade tailwind."},{id:3,signal:"✅",reasoning:"Revenue growing 15%+ with record order book of ₹5+ lakh crore."},{id:4,signal:"✅",reasoning:"Operating margins around 11% with improving trajectory. ROE around 15%."},{id:5,signal:"⚠️",reasoning:"Working capital intensive. Net debt elevated but manageable."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 30x is premium for infrastructure peer group."},{id:7,signal:"✅",reasoning:"Strong Buy consensus."},{id:8,signal:"⚠️",reasoning:"Government infra spending dependence and execution risk."}]},
  ADANIPORTS: {ticker:"ADANIPORTS",name:"Adani Ports",tag:"Infrastructure",stage:"growth",thesis:"India's largest private port operator with international expansion.",companyName:"Adani Ports & SEZ Ltd",oneLiner:"Adani Ports operates India's largest network of commercial ports, handling roughly a quarter of India's cargo.",riskTier:"Tier 2",positionSize:"3–5% of portfolio",beta:"~1.5",sleepTestVerdict:"Adani Ports has had volatility from group-level news. Moderate position only.",nextCatalyst:"Q4 FY26 earnings, May 2026; international expansion updates",dcaStrategy:"Build slowly over 4–5 months. Stock can swing 20%+ on group news.",entryTiming:"Best entries during Adani group-related concerns that prove temporary.",exitCriteria:"Exit if cargo volumes decline materially or if group leverage concerns escalate.",topRisks:["Adani group governance and leverage concerns","Trade volume sensitivity to global economy","Currency and regulatory risks in international ports"],steps:[{id:1,signal:"✅",reasoning:"Operates ports and SEZ — earns revenue per ton of cargo handled. Simple infrastructure model."},{id:2,signal:"✅",reasoning:"India's trade growth and global port logistics demand. Multi-decade tailwind."},{id:3,signal:"✅",reasoning:"Cargo volumes growing 12%+ with international ports adding incremental growth."},{id:4,signal:"✅",reasoning:"EBITDA margins above 60% — excellent for infrastructure. ROE around 18%."},{id:5,signal:"⚠️",reasoning:"Net debt elevated. Group-level leverage concerns persist despite improvements."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 25x reflects growth but also group risk premium."},{id:7,signal:"⚠️",reasoning:"Mixed analyst views due to group concerns. Insider activity normal."},{id:8,signal:"🚩",reasoning:"Adani group governance concerns are the dominant risk factor."}]},
  ITC: {ticker:"ITC",name:"ITC Limited",tag:"Consumer",stage:"established",thesis:"Diversified FMCG conglomerate with cigarettes cash cow funding new businesses.",companyName:"ITC Limited",oneLiner:"ITC is a diversified conglomerate operating in cigarettes, FMCG, hotels, paper, and agriculture.",riskTier:"Tier 1",positionSize:"5–10% of portfolio",beta:"~0.8",sleepTestVerdict:"ITC is a defensive holding with strong dividend yield.",nextCatalyst:"Q4 FY26 earnings, May 2026; FMCG margin expansion",dcaStrategy:"DCA over 3 months. Strong dividend supports compounding.",entryTiming:"Best entries during cigarette regulatory concerns that prove overblown.",exitCriteria:"Long-term hold. Trim only if FMCG growth meaningfully decelerates.",topRisks:["Cigarette tax/regulation could reduce volumes","FMCG competitive intensity","Hotel cyclicality"],steps:[{id:1,signal:"✅",reasoning:"Multi-segment business — cigarettes (cash cow), FMCG (growth), hotels, paper, agri."},{id:2,signal:"✅",reasoning:"FMCG growing strongly as it scales. Cigarettes provide steady cash."},{id:3,signal:"✅",reasoning:"Revenue growing 8–10% with FMCG accelerating to 15%+."},{id:4,signal:"✅",reasoning:"Operating margins around 35% — best among Indian conglomerates. Strong FCF."},{id:5,signal:"✅",reasoning:"Net cash position. Pristine balance sheet."},{id:6,signal:"✅",reasoning:"Forward P/E around 25x with 3%+ dividend yield — attractive total return."},{id:7,signal:"✅",reasoning:"Buy consensus. Stable promoter holding."},{id:8,signal:"⚠️",reasoning:"Cigarette regulatory risk is persistent concern."}]},
  TRENT: {ticker:"TRENT",name:"Trent Limited",tag:"Consumer",stage:"growth",thesis:"India's fastest-growing fashion retailer with Zudio + Westside dual engine.",companyName:"Trent Limited (Tata Group)",oneLiner:"Trent operates Westside (department stores) and Zudio (value fashion) — two of India's fastest-growing retail formats.",riskTier:"Tier 3",positionSize:"2–4% of portfolio",beta:"~1.6",sleepTestVerdict:"Trent has run hard. Premium valuation creates volatility risk.",nextCatalyst:"Q4 FY26 earnings, May 2026; same-store sales updates",dcaStrategy:"Build slowly over 4–6 months. Stock has rerated significantly.",entryTiming:"Wait for pullbacks of 15%+. Premium valuation provides limited margin of safety.",exitCriteria:"Exit if Zudio store openings slow or SSS turns negative.",topRisks:["Premium valuation requires flawless execution","Fast fashion competition (Reliance, Aditya Birla)","Consumer spending slowdown"],steps:[{id:1,signal:"✅",reasoning:"Operates fashion retail through Westside and Zudio. Clear unit economics with strong brand."},{id:2,signal:"✅",reasoning:"Indian fashion retail growing 15%+ with formal sector taking share from unorganized."},{id:3,signal:"✅",reasoning:"Revenue grew 50%+ in FY25 driven by Zudio expansion and same-store sales growth."},{id:4,signal:"✅",reasoning:"Operating margins expanding rapidly with scale. Strong FCF generation."},{id:5,signal:"✅",reasoning:"Net cash position. Tata group backing provides flexibility."},{id:6,signal:"🚩",reasoning:"Forward P/E above 100x — among the highest in Indian markets. Pricing extreme growth."},{id:7,signal:"⚠️",reasoning:"Mixed analyst views — bulls love growth, bears worry about valuation."},{id:8,signal:"🚩",reasoning:"Valuation is the dominant risk."}]},
  TATAPOWER: {ticker:"TATAPOWER",name:"Tata Power",tag:"Energy",stage:"growth",thesis:"Renewable energy transition leader with EV charging infrastructure.",companyName:"Tata Power Company Ltd",oneLiner:"Tata Power is India's largest integrated power company with growing renewable energy and EV charging businesses.",riskTier:"Tier 2",positionSize:"3–5% of portfolio",beta:"~1.3",sleepTestVerdict:"Tata Power is moderate volatility with green energy tailwind.",nextCatalyst:"Q4 FY26 earnings, May 2026; renewable capacity additions",dcaStrategy:"Build over 4 months. Add on broader power sector concerns.",entryTiming:"Best entries during Indian power sector consolidation periods.",exitCriteria:"Trim if renewable capex slows or coal regulations tighten further.",topRisks:["Coal-to-renewable transition costs","Regulatory and tariff risks","Heavy capex requirements"],steps:[{id:1,signal:"✅",reasoning:"Integrated power utility — generation, transmission, distribution, plus growing renewables and EV charging."},{id:2,signal:"✅",reasoning:"Indian power demand growing with green transition tailwind. Multi-decade story."},{id:3,signal:"✅",reasoning:"Revenue growing 10%+ with renewable additions accelerating."},{id:4,signal:"⚠️",reasoning:"Margins improving as renewable mix grows. Capex intensive business."},{id:5,signal:"⚠️",reasoning:"Net debt elevated due to capex cycle. Manageable but warrants monitoring."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 30x reflects renewable transition optimism."},{id:7,signal:"✅",reasoning:"Buy consensus on renewable strategy."},{id:8,signal:"⚠️",reasoning:"Capex execution and regulatory risks are main concerns."}]},
  HAL: {ticker:"HAL",name:"Hindustan Aeronautics",tag:"Defense",stage:"growth",thesis:"Indian aerospace champion with growing defense exports.",companyName:"Hindustan Aeronautics Ltd",oneLiner:"HAL is India's largest aerospace and defense company, manufacturing fighter jets, helicopters, and aircraft components.",riskTier:"Tier 2",positionSize:"3–5% of portfolio",beta:"~1.5",sleepTestVerdict:"HAL is volatile but supported by strong defense tailwind.",nextCatalyst:"Q4 FY26 earnings, May 2026; export contract announcements",dcaStrategy:"Build over 4 months. Stock has rerated — patience pays.",entryTiming:"Best entries during defense order delays that prove temporary.",exitCriteria:"Trim if defense budget growth slows or export ambitions falter.",topRisks:["Heavy reliance on Indian government orders","Export ambitions unproven at scale","Stock has rerated significantly"],steps:[{id:1,signal:"✅",reasoning:"Government-owned aerospace company — manufactures and services aircraft for Indian armed forces."},{id:2,signal:"✅",reasoning:"Indian defense modernization plus export ambitions create multi-year tailwind."},{id:3,signal:"✅",reasoning:"Revenue growing 20%+ with strong order book and execution."},{id:4,signal:"✅",reasoning:"Operating margins around 25%. Strong FCF generation."},{id:5,signal:"✅",reasoning:"Net cash position. Conservative balance sheet."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 30x reflects defense rerating."},{id:7,signal:"✅",reasoning:"Buy consensus."},{id:8,signal:"⚠️",reasoning:"Government order dependence and export ambition risks."}]},
};

// ── CANADA STOCK DATABASE ──
const STOCK_DB_CA = {
  DCBO: {ticker:"DCBO",name:"Docebo Inc",tag:"AI & Tech",stage:"early",thesis:"AI-powered enterprise learning platform — clean SaaS economics at reasonable valuation.",companyName:"Docebo Inc",oneLiner:"Docebo sells AI-powered learning management software (LMS) to enterprises — used by Starbucks, Uber, Samsung, and 1,600+ others to train employees and customers.",riskTier:"Tier 3",positionSize:"2–4% of portfolio",beta:"~1.6",sleepTestVerdict:"DCBO is a quality SaaS at a reasonable price, but small-cap volatility persists.",nextCatalyst:"Q1 FY26 earnings, May 2026; preliminary results showed full-year guidance raise",dcaStrategy:"Build over 3–4 months. DCBO has had favorable setup with January 2026 substantial issuer bid and April 2026 guidance raise.",entryTiming:"Best entries during SaaS sector pullbacks. Stock recently raised full-year guidance — momentum is constructive.",exitCriteria:"Exit if revenue growth decelerates below 15% or if AI commoditizes LMS. Trim if forward P/E exceeds 30x without growth re-acceleration.",topRisks:["AI could commoditize LMS — competition from Microsoft, Google embedding training tools","SaaS multiples sensitive to interest rates","Customer concentration with large enterprises"],steps:[{id:1,signal:"✅",reasoning:"AI-powered LMS — sells subscription software to enterprises for training employees, customers, and partners. Clear recurring revenue model with 90%+ subscription mix."},{id:2,signal:"✅",reasoning:"AI is making corporate learning more important, not less. DCBO's AI features (curated content, adaptive learning) ride this wave."},{id:3,signal:"✅",reasoning:"2025 revenue grew to US$242.7M from US$216.9M (+12%). Recent April 2026 update raised full-year outlook on preliminary Q1 results."},{id:4,signal:"✅",reasoning:"2025 net income of US$26.9M ($0.93 EPS). Trailing P/E around 14.5x — profitable software at reasonable price. Gross margin 80%."},{id:5,signal:"✅",reasoning:"Net cash position. Strong balance sheet supports growth investment plus capital return (announced substantial issuer bid in January 2026)."},{id:6,signal:"✅",reasoning:"Trailing P/E ~14.5x for a profitable, growing SaaS is genuinely attractive. Among the best risk/reward setups in software."},{id:7,signal:"✅",reasoning:"Buy consensus from analysts. Capital return via issuer bid is a constructive signal."},{id:8,signal:"⚠️",reasoning:"AI commoditization of training is the main long-term risk. Customer concentration in large enterprises."}]},
  FTG: {ticker:"FTG",name:"Firan Technology Group",tag:"Defense",stage:"early",thesis:"Aerospace & defense electronics small-cap riding global defense spending surge.",companyName:"Firan Technology Group Corp",oneLiner:"Firan designs and manufactures aerospace and defense electronics — printed circuit boards and cockpit controls for military and commercial aircraft.",riskTier:"Tier 3",positionSize:"1–3% of portfolio",beta:"~1.5",sleepTestVerdict:"FTG is a niche defense small-cap with execution risk.",nextCatalyst:"Quarterly earnings; defense contract announcements",dcaStrategy:"Tiny tranches over 6 months. Small-cap defense names have lumpy results.",entryTiming:"Best entries during execution-driven dips. Defense tailwind supports thesis.",exitCriteria:"Exit if defense budget growth slows or if customer concentration concerns emerge.",topRisks:["Customer concentration in defense primes","Lumpy quarterly results from project-based revenue","Limited analyst coverage and liquidity"],steps:[{id:1,signal:"✅",reasoning:"Aerospace and defense electronics — printed circuit boards and cockpit controls for aircraft."},{id:2,signal:"✅",reasoning:"Global defense spending surge benefits FTG. NATO 2%+ defense GDP commitments support multi-year tailwind."},{id:3,signal:"✅",reasoning:"2024 revenue reached $160M, up 18% YoY. Strong order book momentum."},{id:4,signal:"⚠️",reasoning:"Margins improving but project-based revenue creates quarterly volatility."},{id:5,signal:"✅",reasoning:"Manageable balance sheet for the company size."},{id:6,signal:"⚠️",reasoning:"Hard to fully assess given limited analyst coverage. ~$300M market cap is genuine small-cap."},{id:7,signal:"⚠️",reasoning:"Limited analyst coverage at this size. Insider activity normal."},{id:8,signal:"⚠️",reasoning:"Customer concentration and project execution are the main risks."}]},
  VNP: {ticker:"VNP",name:"5N Plus Inc",tag:"Materials",stage:"early",thesis:"Specialty semiconductors and space solar cells — beneficiary of semiconductor reshoring + space buildout.",companyName:"5N Plus Inc",oneLiner:"5N Plus makes specialty semiconductors and performance materials used in renewable energy, space solar power, and industrial imaging applications.",riskTier:"Tier 3",positionSize:"2–3% of portfolio",beta:"~1.8",sleepTestVerdict:"VNP has run hard (140%+ in 2025) — niche but volatile.",nextCatalyst:"Quarterly results; capacity expansion updates",dcaStrategy:"Build slowly over 5 months. Stock has rerated significantly already.",entryTiming:"Wait for pullbacks given the run. Materials small-caps can swing on commodity pricing.",exitCriteria:"Exit if specialty semi demand softens or if pricing strength in bismuth fades.",topRisks:["Niche specialty materials — vulnerable to commodity pricing","Customer concentration in semiconductor and space markets","Stock has rerated — limited margin of safety"],steps:[{id:1,signal:"✅",reasoning:"Specialty semiconductors and performance materials. Niche but high-value applications in renewables, space solar, imaging, sensing."},{id:2,signal:"✅",reasoning:"Semiconductor reshoring (US$18.1M from US government in Jan 2026 to expand germanium capacity) plus space buildout create multi-year demand."},{id:3,signal:"✅",reasoning:"September 2025 quarter revenue rose 33% YoY to US$104.9M — strongest quarterly level in a decade."},{id:4,signal:"✅",reasoning:"Adjusted EBITDA rose 86% to US$29.1M in latest quarter. Margins expanding. Full-year 2025 EBITDA guidance raised to US$85–90M."},{id:5,signal:"⚠️",reasoning:"Conservative balance sheet relative to peers. Some debt but manageable."},{id:6,signal:"⚠️",reasoning:"Stock up 140%+ in 2025. Rerated — premium reflects specialty position but limits upside near-term."},{id:7,signal:"✅",reasoning:"Buy consensus on space solar and semiconductor reshoring tailwinds."},{id:8,signal:"⚠️",reasoning:"Customer concentration and commodity pricing in bismuth are key risks."}]},
  CLS: {ticker:"CLS",name:"Celestica Inc",tag:"AI & Tech",stage:"growth",thesis:"AI infrastructure beneficiary — supplying data center hardware to hyperscalers.",companyName:"Celestica Inc",oneLiner:"Celestica designs and manufactures advanced technology hardware for AI data centers, communications, and industrial markets.",riskTier:"Tier 2",positionSize:"4–6% of portfolio",beta:"~1.7",sleepTestVerdict:"CLS has run hard but remains tied to AI capex demand.",nextCatalyst:"Q1 FY26 earnings, late April 2026",dcaStrategy:"Stock has had a massive run (2,645% in 3 years). DCA over 3–4 months.",entryTiming:"Wait for pullbacks given the rally. Best entries during broader AI selloffs.",exitCriteria:"Exit if AI capex shows signs of slowing. Trim on extreme valuation.",topRisks:["Heavy reliance on AI data center capex sustaining","Customer concentration in hyperscaler segment","Margin compression risk as competition intensifies"],steps:[{id:1,signal:"✅",reasoning:"Manufactures advanced technology hardware — servers, networking, storage. Clear contract manufacturing model."},{id:2,signal:"✅",reasoning:"AI infrastructure buildout is a powerful multi-year tailwind. Celestica is well-positioned."},{id:3,signal:"✅",reasoning:"Revenue accelerating with AI-related demand. Strong organic growth."},{id:4,signal:"✅",reasoning:"Operating margins expanding as AI mix grows. Strong FCF generation."},{id:5,signal:"✅",reasoning:"Net cash position. Strong balance sheet."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 25x after the rally. Multiple expansion has been significant."},{id:7,signal:"✅",reasoning:"Buy consensus. Insider activity mixed but no major selling."},{id:8,signal:"⚠️",reasoning:"AI capex sustainability is the central concern."}]},
  ATZ: {ticker:"ATZ",name:"Aritzia Inc",tag:"Consumer",stage:"growth",thesis:"Premium fashion retailer expanding aggressively in US — Lululemon-like trajectory.",companyName:"Aritzia Inc",oneLiner:"Aritzia designs and sells premium women's apparel through boutiques and online channels across North America.",riskTier:"Tier 2",positionSize:"3–5% of portfolio",beta:"~1.8",sleepTestVerdict:"Aritzia is volatile retail but proven execution.",nextCatalyst:"Q4 FY26 earnings, May 2026; US expansion updates",dcaStrategy:"Build over 4 months. Add on retail sector concerns.",entryTiming:"Best entries during retail sector selloffs or US recession fears.",exitCriteria:"Trim if same-store sales decelerate meaningfully or if US expansion stalls.",topRisks:["US consumer spending slowdown","Premium positioning vulnerable in recession","Retail competitive intensity"],steps:[{id:1,signal:"✅",reasoning:"Sells premium women's apparel through Westside-style boutiques and online. Clear retail unit economics."},{id:2,signal:"✅",reasoning:"Premium fashion retail in North America. Strong brand with US expansion runway."},{id:3,signal:"✅",reasoning:"Revenue grew 32% YoY in recent quarter. Strong same-store sales plus US store count growth."},{id:4,signal:"✅",reasoning:"Operating margins around 12% with leverage as US scales. FCF positive."},{id:5,signal:"✅",reasoning:"Net cash position. Strong balance sheet supports expansion."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 30x reflects growth optimism. Premium but supported by execution."},{id:7,signal:"✅",reasoning:"Buy consensus from analysts."},{id:8,signal:"⚠️",reasoning:"US consumer cyclicality and retail competition are main risks."}]},
  WELL: {ticker:"WELL",name:"WELL Health Technologies",tag:"Healthcare",stage:"growth",thesis:"Canada's largest outpatient clinic operator with growing tech platform.",companyName:"WELL Health Technologies Corp",oneLiner:"WELL Health is the largest owner-operator of outpatient clinics in Canada, expanding through acquisitions and digital health platform.",riskTier:"Tier 3",positionSize:"2–4% of portfolio",beta:"~1.7",sleepTestVerdict:"WELL is moderate volatility with healthcare defensiveness.",nextCatalyst:"Q1 FY26 earnings, May 2026; clinic count updates",dcaStrategy:"Build over 4 months. Healthcare provides defensive growth profile.",entryTiming:"Best entries during clinic acquisition slowdowns or integration concerns.",exitCriteria:"Trim if same-clinic revenue decelerates or if leverage rises further.",topRisks:["Acquisition-driven growth strategy carries integration risks","Healthcare regulatory changes","Debt levels rising with acquisitions"],steps:[{id:1,signal:"✅",reasoning:"Operates outpatient clinics in Canada plus growing digital health platform. Clear healthcare model."},{id:2,signal:"✅",reasoning:"Healthcare demand is recession-resilient. Aging population creates multi-decade tailwind."},{id:3,signal:"✅",reasoning:"Revenue growing 30%+ driven by clinic acquisitions and same-clinic growth."},{id:4,signal:"⚠️",reasoning:"Margins improving but acquisition costs pressure near-term profitability."},{id:5,signal:"⚠️",reasoning:"Debt rising with acquisitions. Manageable but worth monitoring."},{id:6,signal:"⚠️",reasoning:"Forward valuation reflects acquisition-driven growth premium."},{id:7,signal:"✅",reasoning:"Buy consensus on consolidation strategy."},{id:8,signal:"⚠️",reasoning:"Acquisition integration and leverage are main concerns."}]},
  GSY: {ticker:"GSY",name:"goeasy Ltd",tag:"Financials",stage:"growth",thesis:"Canada's leading non-prime lender with consistent 25%+ EPS growth at low multiple.",companyName:"goeasy Ltd",oneLiner:"goeasy is Canada's leading specialty finance company in alternative lending, serving non-prime customers.",riskTier:"Tier 2",positionSize:"4–6% of portfolio",beta:"~1.5",sleepTestVerdict:"goeasy is reasonably valued for the growth — moderate position works.",nextCatalyst:"Q1 FY26 earnings, May 2026; loan book updates",dcaStrategy:"GSY is one of the cheapest growth stories. DCA over 2–3 months.",entryTiming:"Best entries during recession concerns that hurt non-prime lending sentiment.",exitCriteria:"Exit if loan losses spike materially or if regulatory restrictions tighten.",topRisks:["Recession could increase loan losses meaningfully","Regulatory pressure on consumer lending","Funding cost increases compressing margins"],steps:[{id:1,signal:"✅",reasoning:"Non-prime lender — earns interest income from consumer and home equity loans. Simple lending model."},{id:2,signal:"✅",reasoning:"Non-prime credit demand is durable. goeasy is taking share in underserved segments."},{id:3,signal:"✅",reasoning:"Revenue growing 12%+ with EPS growing 25%+ as scale benefits flow through."},{id:4,signal:"✅",reasoning:"Strong ROE above 25%. Loan book growing with controlled credit losses."},{id:5,signal:"⚠️",reasoning:"Leveraged business model by design. Funding costs and credit cycle matter."},{id:6,signal:"✅",reasoning:"Forward P/E around 7x — among the cheapest growth stories. PEG well below 1.0."},{id:7,signal:"✅",reasoning:"Buy consensus. Yield around 4.4% adds to returns."},{id:8,signal:"⚠️",reasoning:"Recession credit losses and regulatory risks are main concerns."}]},
  DOL: {ticker:"DOL",name:"Dollarama Inc",tag:"Consumer",stage:"established",thesis:"Recession-resilient discount retailer with consistent execution.",companyName:"Dollarama Inc",oneLiner:"Dollarama is Canada's largest dollar store chain, offering everyday items at fixed price points across 1,500+ stores.",riskTier:"Tier 1",positionSize:"5–10% of portfolio",beta:"~0.8",sleepTestVerdict:"Dollarama is a defensive growth holding — sleep-well-at-night.",nextCatalyst:"Q1 FY27 earnings, June 2026",dcaStrategy:"DOL is a classic DCA name with consistent execution.",entryTiming:"Best entries during retail sector selloffs. Stock rarely has prolonged weakness.",exitCriteria:"Long-term hold. Trim only on extreme valuations.",topRisks:["Discount retail competition (Amazon, Walmart)","Margin pressure from cost inflation","Slowing same-store sales trends"],steps:[{id:1,signal:"✅",reasoning:"Discount retailer with fixed price points. Simple retail unit economics."},{id:2,signal:"✅",reasoning:"Discount retail benefits during inflation and recession. Recession-resilient model."},{id:3,signal:"✅",reasoning:"Revenue and same-store sales growing 12%+ consistently. Store count expanding."},{id:4,signal:"✅",reasoning:"Operating margins above 25% — best-in-class for discount retail. Strong FCF."},{id:5,signal:"⚠️",reasoning:"Some debt on the books but manageable given cash generation."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 28x reflects quality premium."},{id:7,signal:"✅",reasoning:"Strong Buy consensus."},{id:8,signal:"⚠️",reasoning:"Competition and inflation are persistent concerns."}]},
  PRL: {ticker:"PRL",name:"Propel Holdings",tag:"Financials",stage:"growth",thesis:"AI-powered fintech lender expanding across Canada, US, UK.",companyName:"Propel Holdings Inc",oneLiner:"Propel is a fintech/AI lending company serving consumers traditional lenders overlook, expanding across multiple geographies.",riskTier:"Tier 3",positionSize:"2–4% of portfolio",beta:"~2.0",sleepTestVerdict:"PRL is a high-growth fintech with credit cycle risk.",nextCatalyst:"Q1 FY26 earnings, May 2026; loan book updates",dcaStrategy:"Build over 5 months in small tranches. Fintech can move 20%+ on results.",entryTiming:"Best entries during fintech sentiment selloffs or recession concerns.",exitCriteria:"Exit if loan losses spike or international expansion stalls.",topRisks:["Recession-driven loan losses","Regulatory pressure on consumer lending","International expansion execution risk"],steps:[{id:1,signal:"✅",reasoning:"AI-powered consumer lender — uses tech to underwrite non-prime loans efficiently."},{id:2,signal:"✅",reasoning:"Non-prime credit demand is durable. Fintech lenders taking share from traditional banks."},{id:3,signal:"✅",reasoning:"Revenue growing 30%+ with international expansion adding incremental growth."},{id:4,signal:"✅",reasoning:"Strong ROE with operating leverage as scale grows."},{id:5,signal:"⚠️",reasoning:"Leveraged business model by design. Credit cycle matters."},{id:6,signal:"✅",reasoning:"Reasonable valuation relative to growth. PEG below 1.5."},{id:7,signal:"✅",reasoning:"Buy consensus from analysts."},{id:8,signal:"⚠️",reasoning:"Credit cycle and regulatory risks are main concerns."}]},
  MDA: {ticker:"MDA",name:"MDA Space",tag:"Space",stage:"growth",thesis:"Canadian space technology leader with growing satellite and robotics businesses.",companyName:"MDA Space Ltd",oneLiner:"MDA Space is a Canadian space technology company providing satellite systems, robotics, and geointelligence services.",riskTier:"Tier 3",positionSize:"2–4% of portfolio",beta:"~2.0",sleepTestVerdict:"MDA is volatile but riding the space sector tailwind.",nextCatalyst:"Q1 FY26 earnings, May 2026; satellite contract announcements",dcaStrategy:"Build over 4–5 months. Space stocks can swing on contract news.",entryTiming:"Best entries during periods of space sector volatility or contract delays.",exitCriteria:"Exit if backlog growth turns negative or major contracts get cancelled.",topRisks:["Lumpy revenue from project-based business","Government contract dependence","Competition from US space primes"],steps:[{id:1,signal:"✅",reasoning:"Space technology — satellites, robotics, geointelligence. Project-based revenue model."},{id:2,signal:"✅",reasoning:"Commercial and defense space spending growing rapidly. Multi-year tailwind."},{id:3,signal:"✅",reasoning:"Revenue growing 20%+ with strong contract backlog providing visibility."},{id:4,signal:"⚠️",reasoning:"Margins improving but project-based business has lumpy quarters."},{id:5,signal:"✅",reasoning:"Manageable balance sheet."},{id:6,signal:"⚠️",reasoning:"Valuation reflects space sector premium."},{id:7,signal:"✅",reasoning:"Buy consensus on space tailwind."},{id:8,signal:"⚠️",reasoning:"Project execution and customer concentration are main risks."}]},
  EIF: {ticker:"EIF",name:"Exchange Income Corp",tag:"Infrastructure",stage:"growth",thesis:"Diversified industrial acquirer with double-digit growth and 7% dividend.",companyName:"Exchange Income Corporation",oneLiner:"Exchange Income is a diversified industrial company that acquires niche aviation and manufacturing businesses with strong moats.",riskTier:"Tier 2",positionSize:"4–6% of portfolio",beta:"~1.0",sleepTestVerdict:"EIF offers growth plus dividend — moderate position works.",nextCatalyst:"Q1 FY26 earnings, May 2026; acquisition announcements",dcaStrategy:"DCA with monthly dividend reinvestment. Add on acquisition integration concerns.",entryTiming:"Best entries during periods when EIF trades below 22x earnings.",exitCriteria:"Trim if acquisition pipeline slows or if leverage rises meaningfully.",topRisks:["Acquisition-driven growth requires deal flow","Aviation cyclicality","Rising debt levels with acquisitions"],steps:[{id:1,signal:"✅",reasoning:"Acquires profitable niche aviation and manufacturing businesses with competitive moats."},{id:2,signal:"✅",reasoning:"Defense spending growth supports aviation segment. Niche manufacturing is durable."},{id:3,signal:"✅",reasoning:"Revenue and EBITDA growing double-digits over the past 5 years consistently."},{id:4,signal:"✅",reasoning:"Strong cash flow generation. Operating leverage from owned businesses."},{id:5,signal:"⚠️",reasoning:"Net debt elevated due to acquisition strategy. Manageable but warrants monitoring."},{id:6,signal:"✅",reasoning:"Forward P/E around 25x with PEG at or below 1.0. Plus 7% dividend yield."},{id:7,signal:"✅",reasoning:"Buy consensus from analysts."},{id:8,signal:"⚠️",reasoning:"Acquisition deal flow and aviation cyclicality are main risks."}]},
};

const STOCK_DBS = { US: STOCK_DB_US, IN: STOCK_DB_IN, CA: STOCK_DB_CA };

const STAGE_LABELS = {
  early: { label: "Early Stage", banner: "🚀 Early-stage stocks have 10–100x upside potential — but also significant risk of loss. Size positions small (1–3% max).", className: "stage-early" },
  growth: { label: "Growth Stage", banner: "📈 Growth-stage stocks balance proven business models with strong upside. Moderate position sizes (3–8%).", className: "stage-growth" },
  established: { label: "Established", banner: "🏛️ Established compounders deliver steady returns over years. Suitable for larger positions (5–15%).", className: "stage-est" },
  pending: { label: "Custom", banner: "📌 Your custom watchlist — stocks you've added to track. To get the full 8-step playbook for these, ask Claude in chat to analyze them.", className: "stage-pending" },
};

function sigC(s){ if(!s) return "#3a3a50"; if(s.startsWith("✅")) return "#22c55e"; if(s.startsWith("⚠️")) return "#f59e0b"; if(s.startsWith("🚩")) return "#ef4444"; return "#3a3a50"; }

const TODAY = new Date("2026-04-29");
const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
function daysUntil(d){return Math.round((new Date(d)-TODAY)/(1000*60*60*24));}
function formatDate(d){const x=new Date(d);return{day:x.getDate(),month:MONTHS[x.getMonth()],year:x.getFullYear()};}
function formatDateLong(d){const x=new Date(d);return`${MONTHS[x.getMonth()]} ${x.getDate()}, ${x.getFullYear()}`;}
function getEarningsStatus(d){const days=daysUntil(d);if(days<0)return{type:"past",label:`${Math.abs(days)}d ago`};if(days===0)return{type:"imminent",label:"TODAY"};if(days<=7)return{type:"imminent",label:`In ${days}d`};if(days<=30)return{type:"soon",label:`In ${days}d`};return{type:"future",label:`In ${days}d`};}

function InfoButton({ glossKey, onClick }) {
  if (!GLOSSARY[glossKey]) return null;
  return (<span className="infobtn" onClick={(e) => { e.stopPropagation(); onClick(glossKey); }}>i</span>);
}

export default function App() {
  const [country,setCountry]    = useState("US");
  const [tab,setTab]            = useState("discover");
  const [selected,setSelected]  = useState(null);
  const [ticker,setTicker]      = useState("");
  const [analysis,setAnalysis]  = useState(null);
  const [expanded,setExpanded]  = useState(null);
  const [overrides,setOverrides]= useState({});
  const [stageFilter,setStageFilter] = useState("all");
  const [tooltip,setTooltip]    = useState(null);
  const [tooltipMode,setTooltipMode] = useState("def");
  const [showAddForm,setShowAddForm] = useState(false);
  const [newTicker,setNewTicker] = useState("");
  const [newName,setNewName] = useState("");
  const [newThesis,setNewThesis] = useState("");
  const [customStocks,setCustomStocks] = useState({US:[],IN:[],CA:[]});

  // Load custom stocks from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("playbook-custom-stocks");
      if (saved) setCustomStocks(JSON.parse(saved));
    } catch(e) { /* ignore */ }
  }, []);

  // Persist custom stocks to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem("playbook-custom-stocks", JSON.stringify(customStocks));
    } catch(e) { /* ignore */ }
  }, [customStocks]);

  const currentDB = STOCK_DBS[country];
  const currentCustom = customStocks[country] || [];

  // Combined seeds for current country
  const SEEDS = [
    ...Object.values(currentDB).map(s => ({ticker:s.ticker,name:s.name,thesis:s.thesis,tag:s.tag,stage:s.stage,isCustom:false})),
    ...currentCustom.map(c => ({...c,stage:"pending",isCustom:true})),
  ];

  function getAns(stepId) {
    if (overrides[stepId]) return overrides[stepId];
    if (!analysis?.steps) return null;
    const aiStep = analysis.steps.find(s => s.id === stepId);
    if (!aiStep) return null;
    const step = STEPS.find(s => s.id === stepId);
    return step.opts.find(o => o.startsWith(aiStep.signal)) ?? null;
  }

  const SW = {"✅":2,"⚠️":1,"🚩":0};
  const allAns = STEPS.map(s => getAns(s.id));
  const answered = allAns.filter(Boolean);
  const score = answered.reduce((sum,a) => {
    const k = Object.keys(SW).find(k => a?.startsWith(k));
    return sum + (k ? SW[k] : 0);
  }, 0);
  const maxScore = STEPS.length * 2;
  const pct = answered.length ? Math.round((score / maxScore) * 100) : 0;
  const scoreLabel = SCORE_LABELS.find(s => score >= s.min);

  function pickStock(c) {
    setSelected(c);
    setTicker(c.ticker);
    if (c.isCustom) {
      setAnalysis(null); // Custom stocks don't have analysis yet
    } else {
      setAnalysis(currentDB[c.ticker] || null);
    }
    setOverrides({});
    setExpanded(null);
    setTab("playbook");
  }

  function changeCountry(newCountry) {
    setCountry(newCountry);
    setSelected(null);
    setTicker("");
    setAnalysis(null);
    setOverrides({});
    setExpanded(null);
    setStageFilter("all");
    setTab("discover");
  }

  function addCustomStock() {
    if (!newTicker.trim() || !newName.trim()) return;
    const stock = {
      ticker: newTicker.trim().toUpperCase(),
      name: newName.trim(),
      thesis: newThesis.trim() || "Custom watchlist stock — analyze in chat to populate.",
      tag: "Custom",
    };
    setCustomStocks(prev => ({
      ...prev,
      [country]: [...(prev[country]||[]), stock]
    }));
    setNewTicker("");
    setNewName("");
    setNewThesis("");
    setShowAddForm(false);
  }

  function removeCustomStock(tkr) {
    setCustomStocks(prev => ({
      ...prev,
      [country]: (prev[country]||[]).filter(s => s.ticker !== tkr)
    }));
    if (ticker === tkr) {
      setTicker(""); setSelected(null); setAnalysis(null);
    }
  }

  // Earnings — only for US
  const sortedByEarnings = country === "US" ? Object.keys(currentDB)
    .filter(t => EARNINGS[t])
    .map(t => ({ ticker: t, stock: currentDB[t], earnings: EARNINGS[t] }))
    .sort((a, b) => {
      const aDays = daysUntil(a.earnings.date);
      const bDays = daysUntil(b.earnings.date);
      if (aDays >= 0 && bDays >= 0) return aDays - bDays;
      if (aDays < 0 && bDays < 0) return bDays - aDays;
      return bDays - aDays;
    }) : [];

  const upcomingEarnings = sortedByEarnings.filter(e => daysUntil(e.earnings.date) >= 0);
  const pastEarnings = sortedByEarnings.filter(e => daysUntil(e.earnings.date) < 0);

  const filteredSeeds = stageFilter === "all" ? SEEDS : SEEDS.filter(s => s.stage === stageFilter);
  const stageBanner = stageFilter !== "all" ? STAGE_LABELS[stageFilter] : null;

  const selectedEarnings = (ticker && country === "US") ? EARNINGS[ticker] : null;

  return (
    <div className="app">
      <style>{G}</style>
      <div className="hdr">
        <div className="hdr-eye">For Educational Use Only</div>
        <div className="hdr-title">The <em>Investor's</em> Playbook</div>
        <div className="country-toggle">
          {Object.values(COUNTRIES).map(c => (
            <button key={c.code} className={`cbtn ${country===c.code?"on":""}`} onClick={()=>changeCountry(c.code)}>
              <span className="cbtn-flag">{c.flag}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="tabs">
        {[
          {k:"discover",l:"I · Discover"},
          ...(country==="US" ? [{k:"earnings",l:"📅 Earnings"}] : []),
          {k:"playbook",l:"II · Analyze"},
          {k:"story",   l:"📖 Story"},
          {k:"size",    l:"III · Size"},
          {k:"when",    l:"IV · When?"},
        ].map(t=>(
          <button key={t.k} className={`tab ${tab===t.k?"on":""}`} onClick={()=>setTab(t.k)}>{t.l}</button>
        ))}
      </div>

      {tooltip && GLOSSARY[tooltip] && (
        <div className="tooltip-modal" onClick={() => setTooltip(null)}>
          <div className="tooltip-card" onClick={(e) => e.stopPropagation()}>
            {CONCEPT_STORIES[tooltip] ? (
              <>
                <div className="tt-mode-toggle">
                  <button className={`tt-mode-btn ${tooltipMode==="def"?"on":""}`} onClick={()=>setTooltipMode("def")}>📘 Definition</button>
                  <button className={`tt-mode-btn ${tooltipMode==="story"?"on":""}`} onClick={()=>setTooltipMode("story")}>📖 Story</button>
                </div>
                {tooltipMode === "def" ? (
                  <>
                    <div className="tt-eye">Glossary</div>
                    <div className="tt-title">{GLOSSARY[tooltip].title}</div>
                    <div className="tt-body">{GLOSSARY[tooltip].body}</div>
                    {GLOSSARY[tooltip].eg && <div className="tt-eg">Example: {GLOSSARY[tooltip].eg}</div>}
                  </>
                ) : (
                  <>
                    <div className="tt-eye">📖 The Story</div>
                    <div className="tt-story-title">{CONCEPT_STORIES[tooltip].title}</div>
                    <div className="tt-story-body">{CONCEPT_STORIES[tooltip].body}</div>
                    {CONCEPT_STORIES[tooltip].takeaway && (
                      <div className="tt-story-takeaway">
                        <div className="tt-takeaway-eye">⚓ Why It Matters</div>
                        <div className="tt-takeaway-text">{CONCEPT_STORIES[tooltip].takeaway}</div>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <div className="tt-eye">Glossary</div>
                <div className="tt-title">{GLOSSARY[tooltip].title}</div>
                <div className="tt-body">{GLOSSARY[tooltip].body}</div>
                {GLOSSARY[tooltip].eg && <div className="tt-eg">Example: {GLOSSARY[tooltip].eg}</div>}
              </>
            )}
            <button className="tt-close" onClick={() => setTooltip(null)}>Got it</button>
          </div>
        </div>
      )}

      <div className="main">
        {/* ── DISCOVER ── */}
        {tab==="discover" && (
          <div>
            <div className="toprow">
              <div>
                <div className="sec-t">{COUNTRIES[country].flag} {COUNTRIES[country].label} Candidates</div>
                <div className="sec-s">{filteredSeeds.length} stocks · Tap any to analyze</div>
              </div>
            </div>
            <div className="filterbar">
              {[
                {k:"all",l:"All"},
                {k:"early",l:"🚀 Early"},
                {k:"growth",l:"📈 Growth"},
                {k:"established",l:"🏛️ Established"},
                ...(currentCustom.length>0 ? [{k:"pending",l:"📌 Custom"}] : []),
              ].map(f => (
                <button key={f.k} className={`fbtn ${stageFilter===f.k?"on":""}`} onClick={()=>setStageFilter(f.k)}>{f.l}</button>
              ))}
            </div>
            {stageBanner && <div className="stage-banner"><div className="stage-banner-txt">{stageBanner.banner}</div></div>}

            {/* Add custom stock form */}
            {!showAddForm ? (
              <button className="wf-toggle-btn" onClick={()=>setShowAddForm(true)}>＋ Add Custom Stock to Watchlist</button>
            ) : (
              <div className="watchlist-form">
                <div className="wf-title">Add to {COUNTRIES[country].label} Watchlist</div>
                <div className="wf-row">
                  <input className="wf-input" placeholder="TICKER (e.g. TSLA)" value={newTicker} onChange={e=>setNewTicker(e.target.value.toUpperCase())} maxLength={10}/>
                  <input className="wf-input full" placeholder="Company name" value={newName} onChange={e=>setNewName(e.target.value)}/>
                  <input className="wf-input full" placeholder="Why interesting? (one sentence, optional)" value={newThesis} onChange={e=>setNewThesis(e.target.value)}/>
                </div>
                <div className="wf-btnrow">
                  <button className="btn-gold" onClick={addCustomStock}>Add</button>
                  <button className="btn-ghost" onClick={()=>{setShowAddForm(false);setNewTicker("");setNewName("");setNewThesis("");}}>Cancel</button>
                </div>
                <div className="wf-pending">
                  <div className="wf-pending-l">📌 Note</div>
                  <div className="wf-pending-t">Custom stocks appear in your watchlist without full analysis. To get the 8-step playbook for any custom stock, ask Claude in chat: "Add [TICKER] to my playbook with full analysis." Claude will give you the database entry to paste into your App.jsx file.</div>
                </div>
              </div>
            )}

            <div className="cgrid">
              {filteredSeeds.map(c=>{
                const stageInfo = STAGE_LABELS[c.stage];
                return (
                  <div key={c.ticker} className={`ccard ${selected?.ticker===c.ticker?"sel":""} ${c.isCustom?"unanalyzed":""}`} onClick={()=>pickStock(c)}>
                    <div className="ctickrow">
                      <div className="ctick">${c.ticker}</div>
                      <div className={`cstage ${stageInfo.className}`}>{stageInfo.label.split(" ")[0]}</div>
                    </div>
                    <div className="cname">{c.name}</div>
                    <div className="cthesis">{c.thesis}</div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:7}}>
                      <div className={`ctag ${TAG_MAP[c.tag]||"tag-ai"}`}>{c.tag}</div>
                      {c.isCustom && (
                        <button className="btn-danger" onClick={(e)=>{e.stopPropagation();removeCustomStock(c.ticker);}}>Remove</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── EARNINGS — US only ── */}
        {tab==="earnings" && country==="US" && (
          <div>
            <div className="toprow">
              <div>
                <div className="sec-t">Earnings Calendar</div>
                <div className="sec-s">US stocks · Sorted by date</div>
              </div>
            </div>
            <div className="ecat-banner">↑ Upcoming · {upcomingEarnings.length} stocks</div>
            {upcomingEarnings.map(({ticker:t, stock, earnings})=>{
              const status = getEarningsStatus(earnings.date);
              const d = formatDate(earnings.date);
              const cardClass = status.type === "imminent" ? "imminent" : status.type === "soon" ? "soon" : "";
              return (
                <div key={t} className={`ecard ${cardClass}`} onClick={()=>pickStock({ticker:t,name:stock.name,thesis:stock.thesis,tag:stock.tag,stage:stock.stage})}>
                  <div className="erow">
                    <div className="edate"><div className="edate-day">{d.day}</div><div className="edate-mo">{d.month}</div></div>
                    <div className="einfo">
                      <div className="etick">${t}</div>
                      <div className="ename">{stock.name}</div>
                      <div className={`edays ${status.type}`}>● {status.label} · {earnings.time}</div>
                    </div>
                    <div className="eright">{earnings.confirmed?"✓ Confirmed":"~ Estimated"}</div>
                  </div>
                </div>
              );
            })}
            {pastEarnings.length > 0 && (
              <>
                <div className="ecat-banner">↓ Recently Reported · {pastEarnings.length} stocks</div>
                {pastEarnings.map(({ticker:t, stock, earnings})=>{
                  const status = getEarningsStatus(earnings.date);
                  const d = formatDate(earnings.date);
                  return (
                    <div key={t} className="ecard reported" onClick={()=>pickStock({ticker:t,name:stock.name,thesis:stock.thesis,tag:stock.tag,stage:stock.stage})}>
                      <div className="erow">
                        <div className="edate"><div className="edate-day">{d.day}</div><div className="edate-mo">{d.month}</div></div>
                        <div className="einfo">
                          <div className="etick">${t}</div>
                          <div className="ename">{stock.name}</div>
                          <div className={`edays ${status.type}`}>○ {status.label} · {earnings.time}</div>
                        </div>
                        <div className="eright">REPORTED</div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}

        {/* ── ANALYZE ── */}
        {tab==="playbook" && (
          <div>
            {!analysis && !selected && (
              <div className="nostock">
                <div className="ns-l">No stock selected</div>
                <div className="ns-t">Pick a stock from the Discover tab</div>
                <button className="btn-gold" onClick={()=>setTab("discover")}>← Discover Stocks</button>
              </div>
            )}

            {selected?.isCustom && !analysis && (
              <div>
                <div className="toprow" style={{marginBottom:14}}>
                  <div>
                    <div className="sec-t">{selected.name}</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:"8.5px",color:"#5a5a6e",marginTop:3,lineHeight:1.6}}>{selected.thesis}</div>
                  </div>
                  <button className="btn-ghost" onClick={()=>{setSelected(null);setTicker("");setAnalysis(null);setTab("discover");}}>← New</button>
                </div>
                <div className="aipanel" style={{borderColor:"rgba(245,158,11,.3)"}}>
                  <div className="aiplbl" style={{color:"#fbbf24"}}>📌 Custom Watchlist Stock — ${ticker}</div>
                  <div style={{fontSize:"14px",color:"#a8a49a",lineHeight:1.7,marginBottom:14}}>
                    This stock is in your watchlist but doesn't have analysis yet. To get the full 8-step playbook with all signals, reasoning, and earnings prep:
                  </div>
                  <div style={{background:"#0a0a14",border:"1px solid #1c1c28",borderRadius:5,padding:12,fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#d4af37",lineHeight:1.7,letterSpacing:".02em"}}>
                    Ask Claude in chat:<br/>
                    <span style={{color:"#a8a49a"}}>"Add ${ticker} ({selected.name}) to my playbook with full analysis"</span>
                  </div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:"#5a5a6e",lineHeight:1.7,marginTop:14}}>
                    Claude will return a database entry to paste into your App.jsx file. Then commit to GitHub and Vercel will rebuild your app — your custom stock will show up with the full playbook.
                  </div>
                </div>
              </div>
            )}

            {analysis && (
              <>
                <div className="toprow" style={{marginBottom:14}}>
                  <div>
                    <div className="sec-t">{analysis.companyName}</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:"8.5px",color:"#5a5a6e",marginTop:3,lineHeight:1.6}}>{analysis.oneLiner}</div>
                  </div>
                  <button className="btn-ghost" onClick={()=>{setSelected(null);setTicker("");setAnalysis(null);setOverrides({});setTab("discover");}}>← New</button>
                </div>

                {selectedEarnings && (() => {
                  const status = getEarningsStatus(selectedEarnings.date);
                  const isPast = status.type === "past";
                  return (
                    <div className="eprep">
                      <div className="eprep-row">
                        <div>
                          <div className="aiplbl" style={{marginBottom:6}}>📅 Earnings · ${ticker}</div>
                          <div className={`edays ${status.type}`}>{isPast?"○":"●"} {status.label}{selectedEarnings.confirmed?" · Confirmed":" · Estimated"}</div>
                        </div>
                        <div>
                          <div className="eprep-date">{formatDateLong(selectedEarnings.date)}</div>
                          <div className="eprep-when">{selectedEarnings.time}</div>
                        </div>
                      </div>
                      {!isPast && (<div className="eprep-block"><div className="eprep-blbl"><span className="eprep-blbl-icon">🎯</span>What to watch BEFORE</div><div className="eprep-btxt">{selectedEarnings.watchPre}</div></div>)}
                      <div className="eprep-block"><div className="eprep-blbl"><span className="eprep-blbl-icon">{isPast?"📊":"🔮"}</span>{isPast?"Post-earnings game plan":"What to watch AFTER"}</div><div className="eprep-btxt">{selectedEarnings.watchPost}</div></div>
                    </div>
                  );
                })()}

                <div className="snap">
                  <div className="snap-lbl">Snapshot — ${ticker}</div>
                  <div className="sigbar">
                    {STEPS.map(step => {
                      const aiStep = analysis.steps.find(s => s.id === step.id);
                      const sig = aiStep?.signal || "—";
                      const c = sigC(sig);
                      return (<div key={step.id} className="sigchip" style={{border:`1px solid ${c}33`}}><div style={{fontSize:"13px",lineHeight:1}}>{sig}</div><div className="siglbl">{step.label.split(" ")[0]}</div></div>);
                    })}
                  </div>
                  <div className="mgrid">
                    {[{l:"Risk Tier",v:analysis.riskTier,g:"Risk Tier"},{l:"Position Size",v:analysis.positionSize,g:"Position Size"},{l:"Beta",v:analysis.beta,g:"Beta"},{l:"Next Catalyst",v:analysis.nextCatalyst,g:"Next Catalyst"}].map(m=>(
                      <div key={m.l} className="mcell"><div className="mlbl">{m.l}<InfoButton glossKey={m.g} onClick={setTooltip} /></div><div className="mval">{m.v}</div></div>
                    ))}
                  </div>
                  {answered.length > 0 && (
                    <div style={{marginTop:13,paddingTop:13,borderTop:"1px solid #181826"}}>
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div style={{fontFamily:"'DM Mono',monospace",fontSize:"7.5px",letterSpacing:".13em",color:"#3e3e52",textTransform:"uppercase"}}>Overall Score</div>
                        <div style={{fontFamily:"'DM Mono',monospace",fontSize:"8.5px",color:scoreLabel?.color}}>{score}/{maxScore}</div>
                      </div>
                      <div className="sbar-t"><div className="sbar-f" style={{width:`${pct}%`,background:scoreLabel?.color}}/></div>
                      <div style={{fontSize:"15px",fontWeight:300,color:scoreLabel?.color}}>{scoreLabel?.label}</div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:"8.5px",color:"#4a4a5e",marginTop:3,lineHeight:1.6}}>{scoreLabel?.desc}</div>
                    </div>
                  )}
                </div>

                <div style={{fontFamily:"'DM Mono',monospace",fontSize:"7.5px",letterSpacing:".16em",color:"#3e3e52",textTransform:"uppercase",marginBottom:9}}>Detailed Analysis — tap any step to override</div>

                {STEPS.map(step => {
                  const aiStep = analysis.steps.find(s => s.id === step.id);
                  const ans = getAns(step.id);
                  const color = sigC(ans);
                  const isOpen = expanded === step.id;
                  const ansLabel = ans ? ans.replace(/^[✅⚠️🚩]\s*/,"") : null;
                  const rColor = color==="#22c55e"?"#5a8a6a": color==="#f59e0b"?"#8a7a4a":"#8a5a5a";
                  return (
                    <div key={step.id} className="scard" style={{border:`1px solid ${ans?color+"44":"#181824"}`,background:"#0c0c15"}}>
                      <div className="sc-top">
                        <div className="sc-hdr">
                          <span className="sc-num">0{step.id}</span>
                          <span className="sc-lbl">{step.label}{step.glossKey && <InfoButton glossKey={step.glossKey} onClick={setTooltip} />}</span>
                        </div>
                        {ans && aiStep && (
                          <div className="apill" style={{background:`${color}0e`,border:`1px solid ${color}33`}}>
                            <div className="asig">
                              <span style={{fontSize:"16px"}}>{ans.startsWith("✅")?"✅":ans.startsWith("⚠️")?"⚠️":"🚩"}</span>
                              <span style={{fontSize:"13.5px",color:color,fontFamily:"'Cormorant Garamond',serif"}}>{ansLabel}</span>
                            </div>
                            <div className="areason" style={{color:rColor}}>{aiStep.reasoning}</div>
                          </div>
                        )}
                      </div>
                      <div className="sc-tog" onClick={()=>setExpanded(isOpen?null:step.id)}>
                        <span className="sc-tog-lbl">{isOpen?"Close":"Override · Pro Tip"}</span>
                        <span style={{color:"#3a3a50",fontSize:"8px",transform:isOpen?"rotate(180deg)":"none",transition:"transform .2s"}}>▼</span>
                      </div>
                      {isOpen && (
                        <div className="sc-body">
                          <div className="sq">{step.q}</div>
                          <div className="shint">→ {step.hint}</div>
                          <div className="optlbl">Override AI signal:</div>
                          <div className="optrow">
                            {step.opts.map(opt => {
                              const isSel = ans === opt;
                              const oc = sigC(opt);
                              return (
                                <button key={opt} className="optbtn" style={{background:isSel?`${oc}12`:"rgba(255,255,255,.015)",borderColor:isSel?`${oc}55`:"#1e1e2a",color:isSel?oc:"#4a4a5e"}} onClick={()=>setOverrides(p=>({...p,[step.id]:opt}))}>
                                  <span>{opt}</span>{isSel&&<span style={{fontSize:"7.5px",opacity:.6}}>← selected</span>}
                                </button>
                              );
                            })}
                          </div>
                          <div className="tip"><div className="tip-l">Pro Tip</div><div className="tip-t">{step.tip}</div></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}

        {/* ── STORY ── */}
        {tab==="story" && (
          <div>
            <div className="sec-t">📖 Stock Story</div>
            <div className="sec-s">{ticker ? `Narrative — $${ticker}` : "Pick a stock to read its story"}</div>

            {!ticker && (
              <div className="nostock" style={{padding:"40px 0"}}>
                <div className="ns-l">No stock selected</div>
                <div className="ns-t" style={{marginBottom:16}}>Pick a stock from Discover to read its story</div>
                <button className="btn-gold" onClick={()=>setTab("discover")}>← Discover Stocks</button>
              </div>
            )}

            {ticker && STOCK_NARRATIVES[ticker] && (
              <div className="narrative">
                <div className="narr-eyebrow">📖 The Story of</div>
                <div className="narr-ticker">${ticker}</div>
                <div className="narr-name">{analysis?.companyName || selected?.name || ""}</div>
                {STOCK_NARRATIVES[ticker].chapters.map((ch,i)=>(
                  <div key={i} className="narr-chapter">
                    <div className="narr-ch-eye"><span className="narr-ch-icon">{ch.num}</span>{ch.eye}</div>
                    <div className="narr-ch-title">{ch.title}</div>
                    <div className="narr-ch-body">{ch.story}</div>
                  </div>
                ))}
                <div className="narr-bottom">
                  <div className="narr-bl-eye">📌 Bottom Line</div>
                  <div className="narr-bl-text">{STOCK_NARRATIVES[ticker].bottomLine}</div>
                </div>
              </div>
            )}

            {ticker && !STOCK_NARRATIVES[ticker] && (
              <div className="narr-empty">
                <div className="narr-empty-eye">📌 Story Not Yet Written</div>
                <div className="narr-empty-text">${ticker} doesn't have a story narrative yet. Each story is hand-crafted with a metaphor that fits the company. To get one for this stock, ask Claude in chat:</div>
                <div className="narr-empty-cmd">"Write the story narrative for ${ticker} in my playbook"</div>
                <div className="narr-empty-text" style={{marginTop:12,fontSize:12,color:"#5a5a6e"}}>Claude will return a STOCK_NARRATIVES entry to paste into App.jsx. Then commit to GitHub and Vercel auto-rebuilds.</div>
              </div>
            )}
          </div>
        )}

        {/* ── SIZE ── */}
        {tab==="size" && (
          <div>
            <div className="sec-t">Position Sizing</div>
            <div className="sec-s">How much to invest</div>
            {analysis ? (
              <div className="aipanel">
                <div className="aiplbl">Sizing — ${ticker}</div>
                {[{l:"Risk Tier",v:analysis.riskTier,g:"Risk Tier"},{l:"Suggested Size",v:analysis.positionSize,g:"Position Size"},{l:"Beta / Volatility",v:analysis.beta,g:"Beta"},{l:"Sleep Test",v:analysis.sleepTestVerdict,g:"Sleep Test"}].map(m=>(
                  <div key={m.l} className="airow"><div className="airlbl">{m.l}<InfoButton glossKey={m.g} onClick={setTooltip} /></div><div className="airval">{m.v}</div></div>
                ))}
              </div>
            ) : (
              <div className="nostock" style={{padding:"28px 0"}}>
                <div className="ns-l">No stock analyzed yet</div>
                <div className="ns-t" style={{marginBottom:16}}>Pick a stock first</div>
                <button className="btn-gold" onClick={()=>setTab("discover")}>← Pick a Stock</button>
              </div>
            )}
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:"7.5px",letterSpacing:".16em",color:"#3e3e52",textTransform:"uppercase",marginBottom:10}}>General Framework</div>
            {TIERS.map(t=>(
              <div key={t.tier} className="tcard" style={analysis?.riskTier===t.tier?{borderColor:"rgba(212,175,55,.3)"}:{}}>
                <div className="tdot" style={{background:t.color}}/>
                <div>
                  <div className="tnm">{t.tier} · {t.beta}{analysis?.riskTier===t.tier?" ← this stock":""}</div>
                  <div className="tlb">{t.label}</div>
                  <div className="tex">{t.examples}</div>
                </div>
                <div className="tsz">{t.size}</div>
              </div>
            ))}
            <div className="tip" style={{marginTop:12}}><div className="tip-l">Golden Rule</div><div className="tip-t">Never put more than 10% of your portfolio in a single stock regardless of conviction.</div></div>
          </div>
        )}

        {/* ── WHEN ── */}
        {tab==="when" && (
          <div>
            <div className="sec-t">When to Buy</div>
            <div className="sec-s">Entry & exit strategy</div>
            {analysis ? (
              <div className="aipanel">
                <div className="aiplbl">Entry Plan — ${ticker}</div>
                {[{l:"DCA Strategy",v:analysis.dcaStrategy,g:"DCA Strategy"},{l:"Entry Timing",v:analysis.entryTiming,g:"Entry Timing"},{l:"Exit Criteria",v:analysis.exitCriteria,g:"Exit Criteria"},{l:"Next Catalyst",v:analysis.nextCatalyst,g:"Next Catalyst"}].map(m=>(
                  <div key={m.l} className="airow"><div className="airlbl">{m.l}<InfoButton glossKey={m.g} onClick={setTooltip} /></div><div className="airval">{m.v}</div></div>
                ))}
                {analysis.topRisks?.length > 0 && (
                  <div className="airow" style={{marginBottom:0,paddingBottom:0,borderBottom:"none"}}>
                    <div className="airlbl">Top Risks<InfoButton glossKey="Top Risks" onClick={setTooltip} /></div>
                    {analysis.topRisks.map((r,i)=>(<div key={i} style={{display:"flex",gap:7,marginBottom:4,alignItems:"flex-start"}}><span style={{color:"#d4af37",fontSize:"9px",marginTop:1}}>🚩</span><span style={{fontFamily:"'DM Mono',monospace",fontSize:"8.5px",color:"#5a5a6e",lineHeight:1.7}}>{r}</span></div>))}
                  </div>
                )}
              </div>
            ) : (
              <div className="nostock" style={{padding:"28px 0"}}>
                <div className="ns-l">No stock analyzed yet</div>
                <div className="ns-t" style={{marginBottom:16}}>Pick a stock first</div>
                <button className="btn-gold" onClick={()=>setTab("discover")}>← Pick a Stock</button>
              </div>
            )}
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:"7.5px",letterSpacing:".16em",color:"#3e3e52",textTransform:"uppercase",marginBottom:12}}>General Principles</div>
            {WHEN_STEPS.map((s,i)=>(
              <div key={i} className="wstep">
                <div className="wico">{s.icon}</div>
                <div><div className="wlb">{i+1}. {s.label}{s.glossKey && <InfoButton glossKey={s.glossKey} onClick={setTooltip} />}</div><div className="wdt">{s.detail}</div></div>
              </div>
            ))}
            <div className="gbox" style={{marginTop:14}}><div className="gbox-l">The One Rule</div><div className="gbox-t">"Time in the market beats timing the market — but entry price still matters."</div></div>
          </div>
        )}

        <div className="disc">Educational purposes only · Not financial advice · Consult a qualified financial advisor before investing</div>
      </div>
    </div>
  );
}
