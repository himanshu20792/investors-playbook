import { useState } from "react";

const G = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#08080f;}
.app{min-height:100vh;background:#08080f;color:#e2ddd4;font-family:'Cormorant Garamond',Georgia,serif;}
.hdr{background:linear-gradient(160deg,#0c0c16,#10101a);border-bottom:1px solid #1c1c28;padding:30px 20px 20px;text-align:center;position:relative;}
.hdr::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 0%,rgba(212,175,55,.07),transparent);pointer-events:none;}
.hdr-eye{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.25em;color:#4a4a5e;text-transform:uppercase;margin-bottom:8px;}
.hdr-title{font-size:clamp(22px,5vw,40px);font-weight:300;letter-spacing:.06em;color:#e2ddd4;}
.hdr-title em{font-style:italic;color:#d4af37;}
.tabs{display:flex;background:#0b0b14;border-bottom:1px solid #181824;overflow-x:auto;}
.tab{background:none;border:none;border-bottom:2px solid transparent;color:#3e3e52;cursor:pointer;font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.13em;padding:14px 11px 12px;text-transform:uppercase;white-space:nowrap;transition:all .2s;flex:1;min-width:80px;}
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
.ctickrow{display:flex;justify-content:space-between;align-items:flex-start;gap:6px;margin-bottom:2px;}
.ctick{font-family:'DM Mono',monospace;font-size:16px;font-weight:500;color:#d4af37;}
.cstage{font-family:'DM Mono',monospace;font-size:6.5px;letter-spacing:.12em;padding:2px 6px;border-radius:8px;text-transform:uppercase;}
.stage-early{background:rgba(168,85,247,.15);color:#c084fc;}
.stage-growth{background:rgba(245,158,11,.15);color:#fbbf24;}
.stage-est{background:rgba(34,197,94,.15);color:#4ade80;}
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
.btn-gold{background:#d4af37;border:none;border-radius:4px;color:#08080f;cursor:pointer;font-family:'DM Mono',monospace;font-size:8.5px;font-weight:500;letter-spacing:.15em;padding:9px 16px;text-transform:uppercase;}
.btn-ghost{background:none;border:1px solid #252535;border-radius:4px;color:#4a4a5e;cursor:pointer;font-family:'DM Mono',monospace;font-size:8.5px;padding:9px 13px;text-transform:uppercase;}
.infobtn{display:inline-flex;align-items:center;justify-content:center;width:14px;height:14px;border-radius:50%;background:rgba(212,175,55,.08);border:1px solid rgba(212,175,55,.25);color:#d4af37;font-family:'DM Mono',monospace;font-size:8px;font-weight:500;cursor:pointer;margin-left:6px;flex-shrink:0;transition:all .15s;vertical-align:middle;}
.infobtn:hover{background:rgba(212,175,55,.15);}
.tooltip-modal{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:100;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px);}
.tooltip-card{background:#0f0f1a;border:1px solid rgba(212,175,55,.3);border-radius:8px;padding:20px;max-width:380px;width:100%;}
.tt-eye{font-family:'DM Mono',monospace;font-size:7.5px;letter-spacing:.18em;color:#d4af37;text-transform:uppercase;margin-bottom:8px;}
.tt-title{font-size:18px;color:#e2ddd4;font-weight:400;margin-bottom:10px;}
.tt-body{font-family:'DM Mono',monospace;font-size:9.5px;color:#a8a4a0;line-height:1.75;letter-spacing:.02em;margin-bottom:14px;}
.tt-eg{font-family:'DM Mono',monospace;font-size:9px;color:#6e6e7e;line-height:1.7;font-style:italic;border-left:2px solid rgba(212,175,55,.2);padding-left:10px;margin-bottom:16px;}
.tt-close{background:#d4af37;border:none;border-radius:4px;color:#08080f;cursor:pointer;font-family:'DM Mono',monospace;font-size:8.5px;letter-spacing:.15em;padding:9px 16px;text-transform:uppercase;width:100%;}
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
.toprow{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:4px;}
.nostock{text-align:center;padding:55px 0;}
.ns-l{font-family:'DM Mono',monospace;font-size:8.5px;letter-spacing:.16em;color:#3e3e52;text-transform:uppercase;margin-bottom:12px;}
.ns-t{font-size:16px;color:#5a5a6e;margin-bottom:20px;}
.stage-banner{background:rgba(168,85,247,.06);border:1px solid rgba(168,85,247,.18);border-radius:5px;padding:10px 12px;margin-bottom:14px;display:flex;align-items:center;gap:8px;}
.stage-banner-txt{font-family:'DM Mono',monospace;font-size:9px;color:#a094b0;line-height:1.6;}

/* Earnings Calendar styles */
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
.eprep-tkr{font-family:'DM Mono',monospace;font-size:18px;font-weight:500;color:#d4af37;}
.eprep-name{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.08em;color:#3e3e52;text-transform:uppercase;margin-top:2px;}
.eprep-date{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:300;color:#d4af37;text-align:right;}
.eprep-when{font-family:'DM Mono',monospace;font-size:8px;color:#5a5a6e;letter-spacing:.1em;text-align:right;margin-top:2px;}
.eprep-block{margin-bottom:12px;}
.eprep-block:last-child{margin-bottom:0;}
.eprep-blbl{font-family:'DM Mono',monospace;font-size:7.5px;letter-spacing:.16em;color:#d4af37;text-transform:uppercase;margin-bottom:5px;display:flex;align-items:center;gap:6px;}
.eprep-blbl-icon{font-size:11px;}
.eprep-btxt{font-family:'DM Mono',monospace;font-size:9.5px;color:#a8a49a;line-height:1.75;letter-spacing:.02em;}
`;

// ── Glossary of terms ────────────────────────────────────────────────────────
const GLOSSARY = {
  "Risk Tier": { title:"Risk Tier", body:"How risky a stock is, on a 3-tier scale. Tier 1 = stable mega-caps (low risk). Tier 2 = quality growth stocks (medium risk). Tier 3 = early-stage or speculative (high risk). Lower tiers can hold larger positions; higher tiers should be small bets.", eg:"VRT is Tier 2 because it's volatile but profitable. RKLB is Tier 3 — exciting but unproven." },
  "Position Size": { title:"Position Size", body:"What percentage of your investable money should go into one stock. Sizing protects against being wrong — even strong convictions deserve limits. Mega-caps can be 10–20%; speculative bets should be 1–3%.", eg:"If you have $10,000, a 5% position is $500 — small enough to survive a 50% drop without losing sleep." },
  "Beta": { title:"Beta", body:"How much a stock moves relative to the overall market. Beta of 1.0 = moves with the market. Beta of 2.0 = swings twice as hard in both directions. High-beta stocks are higher risk but offer bigger upside in bull markets.", eg:"VRT has a beta of ~2.0 — when the S&P drops 10%, VRT typically drops 20%. The reverse is also true." },
  "Next Catalyst": { title:"Next Catalyst", body:"An upcoming event that could move the stock significantly. Earnings reports are the most common. Product launches, FDA decisions, and Fed meetings also matter. Knowing what's coming helps you time entries and avoid surprises.", eg:"If a stock reports earnings in 2 weeks, you might wait to see results before buying — or buy ahead if you're confident." },
  "DCA Strategy": { title:"Dollar-Cost Averaging (DCA)", body:"Splitting your investment into multiple smaller purchases over time instead of buying all at once. This protects you from buying right before a dip and lowers your average cost over time.", eg:"Instead of $3,000 today, buy $750 each month for 4 months. Some months you'll buy high, some low — averaging out." },
  "Entry Timing": { title:"Entry Timing", body:"When to start buying based on price action and market conditions. Best entries often come after pullbacks, broad selloffs, or after earnings beats confirm the thesis. Patience beats trying to time the exact bottom.", eg:"VRT pulled back 15% from highs in late 2025 — that was a textbook entry zone for patient buyers." },
  "Exit Criteria": { title:"Exit Criteria", body:"Pre-defined conditions that trigger you to sell or trim. Setting these BEFORE you buy prevents emotional decisions later. Examples: a profit target, valuation ceiling, or breakdown of the original thesis.", eg:"'Sell half if VRT hits $350' or 'Exit fully if data center growth turns negative for two quarters.'" },
  "Top Risks": { title:"Top Risks", body:"The 2–3 things most likely to break your investment thesis. Writing these down forces you to face the bear case honestly — and gives you specific things to monitor over time.", eg:"For TSM: Taiwan-China tensions are the biggest risk. If escalation happens, you exit immediately." },
  "Sleep Test": { title:"The Sleep Test", body:"A gut check: if this stock dropped 30% tomorrow, would you panic-sell or hold calmly? If you'd panic, your position is too big. The right size is one that lets you sleep through volatility.", eg:"If a 30% drop in NVDA would ruin your week, cap NVDA at 3–4% of portfolio, not 10%." },
  "Forward P/E": { title:"Forward P/E Ratio", body:"Stock price divided by next year's expected earnings per share. Tells you how expensive the stock is relative to expected profits. Lower = cheaper. 15x is average, 30x is premium, 50x+ requires strong growth to justify.", eg:"A P/E of 40x means investors are paying $40 for every $1 of next year's earnings — they expect big growth." },
  "PEG Ratio": { title:"PEG Ratio", body:"Price/Earnings divided by Growth Rate. A way to compare valuation across companies with different growth rates. PEG below 1.0 = potentially undervalued. PEG above 2.0 = expensive even for the growth.", eg:"VRT has PEG ~1.3 — premium but justified by 25%+ growth. CAVA has PEG ~3.0 — priced for perfection." },
  "Free Cash Flow (FCF)": { title:"Free Cash Flow (FCF)", body:"The actual cash a company generates after paying for operations and investments. More honest than reported earnings because it can't be manipulated as easily. Positive and growing FCF is the strongest sign of a healthy business.", eg:"VRT's FCF doubled in a year — that's why the stock can sustain its premium valuation." },
  "Operating Margin": { title:"Operating Margin", body:"What percentage of revenue becomes operating profit (before taxes and interest). Higher margins = more efficient business. Software companies often have 30%+; retailers may have 5%. Track expansion over time.", eg:"Mastercard's 55%+ operating margin is among the best in the world — every $1 of revenue produces 55¢ of profit." },
  "Debt/Equity (D/E)": { title:"Debt-to-Equity Ratio", body:"Total debt divided by shareholder equity. Measures financial leverage. D/E under 1.0 = conservative. D/E over 2.0 = aggressive leverage — fine for some industries (utilities), risky for others (cyclical companies).", eg:"VRT's D/E is 0.82 — moderate debt that's manageable given strong cash generation." },
  "Insider Buying": { title:"Insider Buying", body:"When company executives buy their own stock with personal money (not stock awards). Strong bullish signal — insiders know the business better than anyone. Mass insider selling is more ambiguous (could just be diversification).", eg:"10 VRT executives bought stock in March 2026 — including CEO and CFO. That's a meaningful confidence signal." },
  "Earnings Date": { title:"Earnings Date", body:"The day a company reports its quarterly financial results. Stocks often move 5–20% in either direction on earnings. The week before is your prep window — research, decide on plan. The week after is when you adjust based on what was announced.", eg:"VRT reports Q2 on Aug 5, 2026. Bulls watch for guidance raise; bears watch for AI capex slowdown signals." },
};

const STEPS = [
  {id:1,label:"Business Clarity",   q:"Can you explain what this company does and why it makes money in 2 sentences?", hint:"If you can't explain it simply, don't buy it.",            tip:"Avoid businesses you don't understand. Clarity is a safety net.",                   opts:["✅ Crystal clear","⚠️ Somewhat clear","🚩 Confusing"]},
  {id:2,label:"Industry Tailwind",  q:"Is the industry growing, stable, or shrinking over the next 5+ years?",         hint:"Look for structural trends, not fads.",                    tip:"Secular trends (AI, aging population, clean energy) beat cyclical ones.",           opts:["✅ Strong tailwind","⚠️ Stable / mixed","🚩 Declining industry"]},
  {id:3,label:"Revenue Growth",     q:"Has revenue grown consistently at 10%+ annually for the last 2–3 years?",       hint:"Check Yahoo Finance or Macrotrends.",                       tip:"Accelerating growth matters more than high but decelerating growth.",               opts:["✅ >15% growth","⚠️ 5–15% growth","🚩 <5% or declining"]},
  {id:4,label:"Profitability & FCF",q:"Is free cash flow positive and growing? Is operating margin healthy?",          hint:"FCF = Operating Cash Flow minus CapEx.",                    tip:"Operating margin >15% and FCF margin >10% are solid benchmarks.",                  opts:["✅ Strong FCF & margins","⚠️ Breakeven / improving","🚩 Cash burn"], glossKey:"Free Cash Flow (FCF)"},
  {id:5,label:"Balance Sheet",      q:"Is debt manageable relative to cash and earnings?",                             hint:"Check Debt/Equity ratio.",                                  tip:"High debt isn't fatal if FCF covers it. Check interest coverage ratio.",            opts:["✅ Net cash or low debt","⚠️ Moderate debt (D/E < 1)","🚩 High debt (D/E > 2)"], glossKey:"Debt/Equity (D/E)"},
  {id:6,label:"Valuation",          q:"Is the stock priced reasonably relative to its growth rate?",                   hint:"Use Forward P/E and PEG ratio.",                            tip:"High P/E can be justified by high growth. Always compare within sector.",           opts:["✅ Fair / undervalued (PEG < 1.5)","⚠️ Premium (PEG 1.5–2.5)","🚩 Expensive (PEG > 2.5)"], glossKey:"PEG Ratio"},
  {id:7,label:"Analyst & Insider",  q:"What do analysts and company insiders say?",                                    hint:"Check consensus on Yahoo Finance + SEC Form 4 filings.",   tip:"Insider buying is a strong bullish signal. Mass selling is less telling.",          opts:["✅ Buy consensus + insider buying","⚠️ Mixed signals","🚩 Sell ratings or insider dumping"], glossKey:"Insider Buying"},
  {id:8,label:"Key Risks",          q:"Have you identified the 2–3 biggest things that could break this investment?",  hint:"Think: competition, regulation, concentration, macro.",     tip:"Write the bear case before you buy. Know your exit condition.",                     opts:["✅ Risks identified & acceptable","⚠️ Some risks uncertain","🚩 Major unresolved risks"]},
];

const SCORE_LABELS=[
  {min:13,label:"Strong Buy Candidate",color:"#22c55e",desc:"Fundamentals compelling. Size appropriately and DCA in."},
  {min:9, label:"Watchlist Candidate", color:"#f59e0b",desc:"Promising but has notable risks. Consider a small starter position."},
  {min:0, label:"Pass for Now",        color:"#ef4444",desc:"Too many red flags. Keep researching or look elsewhere."},
];
const TIERS=[
  {tier:"Tier 1",label:"Core / Low Risk",     examples:"Index funds, mega-caps (AAPL, MSFT)",size:"Up to 20–30%",beta:"Beta < 0.8",  color:"#22c55e"},
  {tier:"Tier 2",label:"Growth / Medium Risk",examples:"Quality growth stocks (VRT, NVDA)",  size:"5–10%",       beta:"Beta 0.8–1.5",color:"#f59e0b"},
  {tier:"Tier 3",label:"Speculative / High",  examples:"Early-stage, unprofitable",          size:"1–3% max",    beta:"Beta > 1.5",  color:"#ef4444"},
];
const WHEN_STEPS=[
  {icon:"◈",label:"Dollar-Cost Average",  glossKey:"DCA Strategy",  detail:"Split into 3–4 tranches over 2–3 months.\nExample: $3,000 total → $750/month × 4."},
  {icon:"◈",label:"Catalyst Windows",     glossKey:"Next Catalyst", detail:"Good entries:\n• Before earnings if confident\n• After a 10–20% pullback\n• After a strong earnings beat"},
  {icon:"◈",label:"Set a Price Alert",    detail:"Alert 5% below current price. Volatile stocks often dip shortly after your decision."},
  {icon:"◈",label:"Define Exit First",    glossKey:"Exit Criteria", detail:"Before buying decide:\n• Profit target (when to trim)\n• Stop-loss (thesis broken)\n• Review trigger: every earnings"},
];
const TAG_MAP={"AI & Tech":"tag-ai","Energy":"tag-energy","Healthcare":"tag-health","Infrastructure":"tag-infra","Financials":"tag-fin","Consumer":"tag-consumer","Space":"tag-space","Defense":"tag-defense"};

// ── EARNINGS DATA — confirmed dates as of late April 2026 ────────────────────
const EARNINGS = {
  HOOD:  {date:"2026-04-28", time:"After close", confirmed:true,  watchPre:"Did crypto trading volumes pick up in Q1? Did Robinhood Gold subscribers continue 30%+ growth? Trump Accounts uptake will be a key new metric.", watchPost:"Q1 missed slightly ($0.38 vs $0.39 est). Watch if stock pulls back — could be a buying opportunity if thesis intact. Check Q2 guidance for crypto and trading volume trends."},
  V:     {date:"2026-04-29", time:"After close", confirmed:true,  watchPre:"US payment volume growth and cross-border trends. Watch commentary on Visa Direct and B2B payments — these are the next-gen growth vectors.", watchPost:"Visa rarely surprises. Focus on margin trajectory and any updates to long-term revenue framework."},
  MA:    {date:"2026-04-30", time:"Before open", confirmed:true,  watchPre:"Cross-border transaction volume growth (key indicator of consumer travel/spending). Switched volume trends. Watch any commentary on real-time payment threats.", watchPost:"Stock typically doesn't move much on results — focus on next quarter setup. Cross-border has remained strong."},
  PLTR:  {date:"2026-05-04", time:"After close", confirmed:true,  watchPre:"US Commercial revenue growth must exceed 70% YoY to justify valuation. AIP customer count and average deal size matter. Watch margin trends and SBC dilution rate.", watchPost:"Even strong results may not move the stock if guidance is light — valuation is so extreme. A miss could trigger 20%+ drawdown. Listen for international commercial color."},
  CELH:  {date:"2026-05-06", time:"Before open", confirmed:false, watchPre:"Revenue growth re-acceleration is THE thing to watch. Pepsi distribution scan data has been mixed. International expansion progress matters.", watchPost:"Even modest growth re-acceleration could trigger sharp rally given depressed sentiment. Conversely, another miss = thesis broken."},
  AXON:  {date:"2026-05-06", time:"After close", confirmed:true,  watchPre:"Software ARR growth (target: 35%+) is the key metric. Watch international expansion trends and AI software (Draft One, real-time translation) attach rates.", watchPost:"AXON rarely disappoints. Watch for guidance raise — that's the catalyst. Listen for federal contract wins or commentary on public sector budgets."},
  IONQ:  {date:"2026-05-07", time:"After close", confirmed:false, watchPre:"Bookings growth and qubit count milestones. Watch government contract wins and commercial customer additions. Cash burn is critical.", watchPost:"Quantum stocks trade entirely on milestones and sentiment. Any technical milestones announcement = rally; cash burn warnings = sharp drop."},
  RBLX:  {date:"2026-05-07", time:"Before open", confirmed:true,  watchPre:"Daily active users (DAU) and bookings are key. Watch for any deceleration in 18+ user growth. Advertising revenue update matters — that's the big new growth driver.", watchPost:"FCF conversion is improving — watch if margins continue expanding. Listen for app store fee commentary (Apple/Google relationship updates)."},
  VST:   {date:"2026-05-07", time:"Before open", confirmed:true,  watchPre:"Power price realizations (ERCOT spreads) are the swing factor. Watch for new data center contract announcements — these directly drive bull thesis.", watchPost:"Listen for nuclear plant operational updates and any new hyperscaler power purchase agreements. ERCOT pricing trends matter most for forward earnings."},
  RKLB:  {date:"2026-05-08", time:"After close", confirmed:false, watchPre:"Electron launch cadence (target: 20+ in 2026). Neutron progress and timeline updates. Space Systems revenue from satellite components.", watchPost:"Neutron timeline is the singular focus. Any delay = 20%+ drawdown. Successful test = 30%+ rally. Cash burn rate also matters."},
  HIMS:  {date:"2026-05-11", time:"After close", confirmed:true,  watchPre:"GLP-1 revenue contribution and sub trends are critical. FDA shortage list status affects compounded GLP-1 access. Watch customer acquisition cost trends.", watchPost:"Stock often moves 20%+ post-earnings. If GLP-1 revenue holds up despite FDA pressure, expect a rally. Any FDA negative news in commentary = exit signal."},
  ASTS:  {date:"2026-05-12", time:"After close", confirmed:false, watchPre:"BlueBird satellite deployment progress. Carrier partnership commercial launch dates. Cash position and dilution risk.", watchPost:"Pure binary stock — listen for service launch commitment dates. Any delays = 30%+ drop. Successful service launch = potential 50%+ rally."},
  CAVA:  {date:"2026-05-12", time:"After close", confirmed:true,  watchPre:"Same-store sales growth (must stay above 5% to justify valuation). New unit openings and AUV (average unit volume) trends. Watch traffic vs. price-driven growth.", watchPost:"CAVA is priced for perfection. Even slight SSS deceleration = 30%+ drawdown risk. Listen for full-year guidance updates."},
  CRWV:  {date:"2026-05-13", time:"After close", confirmed:false, watchPre:"Revenue growth (still triple digits?). Customer concentration trends. GPU capacity utilization and pricing dynamics.", watchPost:"Watch debt load and refinancing commentary. AI capex slowdown commentary from customers (Microsoft, Meta) is the bear catalyst."},
  ANRO:  {date:"2026-05-15", time:"TBD",         confirmed:false, watchPre:"Project pipeline and any new RNG offtake agreement announcements. Cash position and any equity raise hints.", watchPost:"Micro-cap with low volume — single news items move the stock 20%+. Cash burn is the dominant concern."},
  NVDA:  {date:"2026-05-20", time:"After close", confirmed:true,  watchPre:"Data center revenue growth (consensus: $78B Q1 guidance). Hyperscaler capex commentary, Blackwell shipments, China revenue contribution. Margin trajectory.", watchPost:"NVDA earnings move the entire AI complex. Watch H2 commentary on Rubin/Vera platforms. China commentary critical given export restrictions."},
  COST:  {date:"2026-05-29", time:"After close", confirmed:false, watchPre:"Comparable sales growth (especially traffic vs ticket). Membership renewal rates (currently 90%+). Watch for any membership fee hike announcement.", watchPost:"COST rarely disappoints. Watch SG&A trends and gross margin (declining gross margin is by design but worth tracking)."},
  ENPH:  {date:"2026-07-30", time:"After close", confirmed:false, watchPre:"US residential solar demand stabilization is the bull thesis. Battery attach rates, IQ8/IQ9 microinverter shipments. Watch California NEM 3.0 commentary.", watchPost:"Listen for Q3 guidance — if it shows recovery, multi-quarter rally possible. Any further demand decline = thesis-breaking event."},
  TSM:   {date:"2026-07-17", time:"Before open", confirmed:false, watchPre:"AI accelerator revenue mix (now 60%+ of total). 3nm and 2nm capacity utilization. Watch for any Apple iPhone-related commentary on consumer demand.", watchPost:"Capex guidance for 2027 fabs is the key signal — higher = more confidence in AI demand. Watch margin trajectory and Arizona fab progress."},
  GOOGL: {date:"2026-07-22", time:"After close", confirmed:false, watchPre:"Google Cloud growth (target: 30%+) is most important. Search ad growth must stay positive amid AI competition. YouTube and subscription revenue trends.", watchPost:"Capex guidance critical — AI infrastructure spending pace tells you GOOG's confidence. Any Search revenue concerns = stock could drop sharply."},
  LMT:   {date:"2026-07-22", time:"Before open", confirmed:false, watchPre:"F-35 deliveries and program margins. Missile demand commentary. Watch backlog growth (currently $176B+) and free cash flow guidance.", watchPost:"Defense names move slowly but consistently. Watch any commentary on European defense spending and hypersonics programs."},
  VRT:   {date:"2026-08-05", time:"Before open", confirmed:true,  watchPre:"Track Q2 organic growth rate vs 27-29% full-year guidance. Watch backlog trend, AI customer concentration commentary, and any margin compression signals from tariffs.", watchPost:"Compare actual results to AI capex commentary from hyperscalers (MSFT, GOOG, META, AMZN). Listen for guidance raise — that's the bull catalyst. Geographic recovery in APAC/EMEA matters."},
};

// ── STOCK DATABASE ──
const STOCK_DB = {
  RKLB: {ticker:"RKLB",name:"Rocket Lab USA",tag:"Space",stage:"early",thesis:"Small-launch leader building Neutron rocket to compete with SpaceX.",companyName:"Rocket Lab USA Inc",oneLiner:"Rocket Lab launches small satellites and is developing the Neutron rocket — aiming to be the #2 player in commercial space behind SpaceX.",riskTier:"Tier 3",positionSize:"1–3% of portfolio",beta:"~2.5",sleepTestVerdict:"RKLB is highly speculative — small position only, and only money you can afford to lose.",nextCatalyst:"Neutron rocket first launch attempt, expected mid-2026",dcaStrategy:"Build very slowly with 6 small tranches over 6 months. Major catalysts can move RKLB 30%+ in either direction.",entryTiming:"Best entries are after launch failures or delays that create panic. The long-term thesis depends on Neutron success.",exitCriteria:"Exit if Neutron program faces a major setback or 12+ month delay. Trim aggressively on rallies above 30x sales.",topRisks:["Neutron rocket development could fail or face years of delays","Stock trades on narrative — sentiment shifts cause violent moves","Burning cash heavily; could need dilutive equity raise"],steps:[{id:1,signal:"✅",reasoning:"Rocket Lab launches satellites for commercial and government customers, plus building the larger Neutron rocket. Simple business model — sell launches, sell satellite components."},{id:2,signal:"✅",reasoning:"Commercial space is one of the fastest-growing industries. Satellite constellations need launches and components — a multi-decade tailwind from defense and commercial demand."},{id:3,signal:"✅",reasoning:"Revenue grew 50%+ in 2025 driven by Electron launches and HASTE missions. Neutron success would dramatically accelerate growth."},{id:4,signal:"🚩",reasoning:"Still unprofitable with negative FCF as company invests heavily in Neutron. Profitability years away — typical of early-stage hardware company."},{id:5,signal:"⚠️",reasoning:"Cash position adequate but burns through it quickly. Could need to raise additional equity, diluting existing shareholders."},{id:6,signal:"🚩",reasoning:"Trading at 25x+ sales with no profits — pure narrative valuation. Bull case requires Neutron success and major share gains."},{id:7,signal:"⚠️",reasoning:"Mixed analyst views — bulls love the Neutron opportunity, bears worry about execution risk and valuation. Insider activity is mixed."},{id:8,signal:"🚩",reasoning:"Neutron execution is the dominant risk. If the rocket fails to deliver on time or budget, the entire bull thesis breaks."}]},
  IONQ: {ticker:"IONQ",name:"IonQ Inc",tag:"AI & Tech",stage:"early",thesis:"Pure-play quantum computing — could be massive if quantum hits commercial scale.",companyName:"IonQ Inc",oneLiner:"IonQ builds trapped-ion quantum computers — one of the few public ways to bet on quantum computing reaching commercial usefulness.",riskTier:"Tier 3",positionSize:"1–2% of portfolio",beta:"~3.0",sleepTestVerdict:"IONQ is highly speculative — only invest money you can afford to lose entirely.",nextCatalyst:"Quantum computing milestones; partnership announcements",dcaStrategy:"Tiny tranches over 12+ months. Quantum is a long-duration bet — patience required.",entryTiming:"Buy on big drawdowns of 40%+ from highs. Market cycles between quantum hype and disillusionment.",exitCriteria:"Exit if quantum advantage proves decades away rather than years. Trim aggressively on hype-driven rallies.",topRisks:["Quantum computing might not achieve commercial usefulness for many years","Competition from much larger players (IBM, Google, Microsoft)","Stock highly sensitive to AI/tech sentiment swings"],steps:[{id:1,signal:"⚠️",reasoning:"Builds quantum computers using trapped ions. Business model still developing — currently sells access via cloud and direct hardware. Plenty of complexity."},{id:2,signal:"✅",reasoning:"If quantum computing achieves commercial scale, the addressable market is enormous. But timing is highly uncertain."},{id:3,signal:"⚠️",reasoning:"Revenue growing fast but from a very small base. Growth quality questionable — much from research grants and partnerships."},{id:4,signal:"🚩",reasoning:"Deeply unprofitable with significant cash burn. Profitability years or decades away depending on quantum maturation."},{id:5,signal:"⚠️",reasoning:"Has cash but burns through it. Will likely need additional equity raises, diluting shareholders."},{id:6,signal:"🚩",reasoning:"Trading at extreme price-to-sales multiples on speculation about quantum future. Hard to value rationally."},{id:7,signal:"⚠️",reasoning:"Bullish analyst views but heavy insider selling has been a concerning pattern. Watch for changes here."},{id:8,signal:"🚩",reasoning:"Quantum may not reach commercial scale for many years. Competition from much better-funded tech giants is intense."}]},
  PLTR: {ticker:"PLTR",name:"Palantir Technologies",tag:"AI & Tech",stage:"growth",thesis:"AI Platform (AIP) is becoming the operating system for enterprise AI deployments.",companyName:"Palantir Technologies Inc",oneLiner:"Palantir builds data platforms (Foundry, Gotham, AIP) that help governments and enterprises deploy AI at scale across complex operations.",riskTier:"Tier 3",positionSize:"2–4% of portfolio",beta:"~2.6",sleepTestVerdict:"PLTR is high-volatility and richly valued — small position even for believers.",nextCatalyst:"Q1 2026 earnings, May 2026; major commercial deal announcements",dcaStrategy:"Build slowly given extreme valuation. 5–6 small tranches over 4–6 months.",entryTiming:"Best entries are after earnings disappointments or broad tech selloffs. PLTR overshoots in both directions.",exitCriteria:"Trim if commercial growth slows below 50%. Exit on any sign that AIP is being matched by competitors.",topRisks:["Trading at among the highest valuations in software — multiple compression risk","Government revenue concentration adds political/budget risk","Competition from Microsoft, Snowflake, and Databricks intensifying"],steps:[{id:1,signal:"✅",reasoning:"Sells software platforms to governments and enterprises for handling complex data and AI workflows. Subscription model with strong customer retention."},{id:2,signal:"✅",reasoning:"Enterprise AI adoption is a massive multi-year tailwind. AIP positions Palantir as critical infrastructure for AI deployment."},{id:3,signal:"✅",reasoning:"US commercial revenue growing over 70% YoY. Total revenue growth above 30% with accelerating commercial momentum."},{id:4,signal:"✅",reasoning:"Recently became GAAP profitable with expanding margins. Generating positive free cash flow consistently."},{id:5,signal:"✅",reasoning:"Net cash position with minimal debt. Strong balance sheet — no financing risk."},{id:6,signal:"🚩",reasoning:"Forward P/E above 100x and price-to-sales above 50x. Among the most expensive stocks in markets — pricing in many years of perfect execution."},{id:7,signal:"⚠️",reasoning:"Mixed analyst views — many price targets well below current levels. CEO occasionally makes large stock sales."},{id:8,signal:"🚩",reasoning:"Valuation is the dominant risk — any growth deceleration could cause sharp multiple compression. Heavy reliance on government contracts."}]},
  ASTS: {ticker:"ASTS",name:"AST SpaceMobile",tag:"Space",stage:"early",thesis:"Satellite-to-phone service — could disrupt cellular if technology works at scale.",companyName:"AST SpaceMobile Inc",oneLiner:"AST is building a constellation of satellites that connect directly to standard smartphones, providing cellular service from space.",riskTier:"Tier 3",positionSize:"1–2% of portfolio",beta:"~3.5",sleepTestVerdict:"ASTS is binary — could be a 10x or could go to zero. Tiny position only.",nextCatalyst:"Commercial service launch, expected late 2026 or 2027",dcaStrategy:"Tiny positions over 6+ months. Single news items can move stock 50%+.",entryTiming:"Wait for satellite deployment milestones. Stock trades purely on execution and milestone catalysts.",exitCriteria:"Exit if commercial service launch is delayed by 18+ months. Trim aggressively on hype-driven rallies above $50.",topRisks:["Technology may not scale economically — capex requirements are enormous","Competition from Starlink direct-to-cell could cap upside","Cash burn rate requires repeated equity dilution"],steps:[{id:1,signal:"⚠️",reasoning:"Building satellite constellation for direct-to-phone connectivity. Concept is clear but business model unproven at scale."},{id:2,signal:"✅",reasoning:"Cellular dead zones and rural connectivity are major problems. Satellite-to-phone could be a massive market if tech works."},{id:3,signal:"🚩",reasoning:"Negligible revenue today — purely pre-commercial. Revenue inflection requires successful satellite deployment."},{id:4,signal:"🚩",reasoning:"Heavy ongoing losses with no near-term path to profitability. Capex requirements are enormous."},{id:5,signal:"🚩",reasoning:"Cash burn rate is high; will require multiple additional equity raises. Significant dilution likely."},{id:6,signal:"🚩",reasoning:"Hard to value with no revenue. Trades on hopes and partner endorsements rather than fundamentals."},{id:7,signal:"⚠️",reasoning:"Strong partnerships with Verizon, AT&T, Vodafone are bullish signals. But heavy insider selling has occurred."},{id:8,signal:"🚩",reasoning:"Technology execution risk is dominant — satellites might not work at scale economically. Starlink is a major competitive threat."}]},
  CRWV: {ticker:"CRWV",name:"CoreWeave Inc",tag:"AI & Tech",stage:"early",thesis:"AI-native cloud provider — pure-play on AI compute demand.",companyName:"CoreWeave Inc",oneLiner:"CoreWeave provides cloud GPU services optimized for AI workloads — growing rapidly as AI labs and enterprises rent compute.",riskTier:"Tier 3",positionSize:"1–3% of portfolio",beta:"~3.0",sleepTestVerdict:"CRWV is volatile and highly leveraged — only suitable for high-risk-tolerance investors.",nextCatalyst:"Quarterly earnings; major customer contract announcements",dcaStrategy:"Small tranches over 4–6 months. The stock can move 20%+ on single news items.",entryTiming:"Buy on broader AI sentiment pullbacks. CoreWeave overshoots in both directions on AI news cycles.",exitCriteria:"Exit if AI capex shows signs of slowing. Trim aggressively if customer concentration concerns emerge.",topRisks:["Heavy debt load — sensitive to interest rates and AI demand sustaining","Customer concentration with Microsoft and Meta","Margins could compress as competition intensifies"],steps:[{id:1,signal:"✅",reasoning:"Operates GPU-based cloud infrastructure rented to AI companies. Simple model — buy GPUs, rent them out at margin."},{id:2,signal:"✅",reasoning:"AI compute demand is the most powerful tailwind in tech. CoreWeave is positioned at the heart of it."},{id:3,signal:"✅",reasoning:"Revenue growing several hundred percent year-over-year as AI capex flows in. Among the fastest-growing tech companies anywhere."},{id:4,signal:"⚠️",reasoning:"Revenue scaling fast but profitability uncertain due to massive depreciation from GPU purchases. Cash flow profile is complex."},{id:5,signal:"🚩",reasoning:"Heavy debt load taken on to buy GPUs. Highly leveraged business model — sensitive to rates and demand."},{id:6,signal:"🚩",reasoning:"Trading at high multiples that depend on continued AI capex growth. Multiple compression risk if capex slows."},{id:7,signal:"⚠️",reasoning:"Mixed analyst views — some bullish on AI exposure, others worried about debt and customer concentration."},{id:8,signal:"🚩",reasoning:"Customer concentration (Microsoft, Meta) is concerning. AI capex slowdown would hit CoreWeave harder than diversified peers."}]},
  HOOD: {ticker:"HOOD",name:"Robinhood Markets",tag:"Financials",stage:"growth",thesis:"Crypto resurgence + product expansion = re-rating opportunity.",companyName:"Robinhood Markets Inc",oneLiner:"Robinhood is a retail brokerage app — earning revenue from trading, interest, and crypto, with growing premium subscription business.",riskTier:"Tier 2",positionSize:"3–5% of portfolio",beta:"~2.0",sleepTestVerdict:"HOOD swings hard with markets and crypto — moderate position only.",nextCatalyst:"Q1 2026 earnings, May 2026; crypto market activity",dcaStrategy:"Build over 3–4 months. Stock is sensitive to retail trading activity and crypto cycles.",entryTiming:"Best entries during crypto winters or market selloffs that hurt retail trading. Counter-cyclical buying works.",exitCriteria:"Trim if retail trading volumes collapse for two consecutive quarters. Take profits on crypto-driven rallies above 50x earnings.",topRisks:["Heavy revenue sensitivity to crypto cycles and market sentiment","Regulatory risk on payment-for-order-flow business model","Competition from established brokerages (Schwab, Fidelity)"],steps:[{id:1,signal:"✅",reasoning:"Retail brokerage app with revenue from trading commissions (now zero), payment for order flow, interest on cash, and crypto trading. Clear business model."},{id:2,signal:"✅",reasoning:"Retail investing growth and crypto adoption are durable trends. Younger generations defaulting to digital-first brokerages."},{id:3,signal:"✅",reasoning:"Revenue growing 30%+ YoY driven by crypto trading and growing user base. Premium subscription business growing fast."},{id:4,signal:"✅",reasoning:"Recently became consistently profitable with expanding margins. Operating leverage kicking in as user base grows."},{id:5,signal:"✅",reasoning:"Net cash position with significant balance sheet strength. No financing risk."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 35x reflects optimistic crypto and trading expectations. Multiple compression possible if crypto cools."},{id:7,signal:"✅",reasoning:"Buy consensus from most analysts. Insider activity has been muted — no major selling pressure."},{id:8,signal:"⚠️",reasoning:"Crypto market dependence is the dominant risk. Regulatory action on PFOF could materially impact economics."}]},
  RBLX: {ticker:"RBLX",name:"Roblox Corporation",tag:"AI & Tech",stage:"growth",thesis:"Gaming platform that's become a default social network for kids globally.",companyName:"Roblox Corporation",oneLiner:"Roblox is an online gaming platform where users create and play games — generating revenue through in-game purchases (Robux).",riskTier:"Tier 2",positionSize:"3–5% of portfolio",beta:"~2.0",sleepTestVerdict:"RBLX is high-beta but has clear network effects — moderate position for long-term holders.",nextCatalyst:"Q1 2026 earnings, May 2026; advertising business updates",dcaStrategy:"Build over 3–4 months in equal tranches. Add aggressively on 15%+ pullbacks.",entryTiming:"Best entries during periods of bookings deceleration that prove temporary. RBLX has powerful network effects worth being patient for.",exitCriteria:"Exit if daily active user growth turns negative for two quarters. Trim if free cash flow conversion deteriorates.",topRisks:["Heavy dependence on Apple/Google app store policies","Safety/moderation concerns with young user base","Heavy stock-based compensation dilutes shareholders"],steps:[{id:1,signal:"✅",reasoning:"Free-to-play gaming platform where users buy virtual currency (Robux) for in-game items. Simple consumer software business."},{id:2,signal:"✅",reasoning:"Gaming and virtual experiences continue to grow globally. Roblox has become a default social network for younger demographics."},{id:3,signal:"✅",reasoning:"Bookings growing 20%+ with daily active users continuing to expand internationally. Strong engagement metrics."},{id:4,signal:"⚠️",reasoning:"Bookings strong but GAAP profits remain elusive due to heavy stock-based compensation. FCF generation is improving."},{id:5,signal:"✅",reasoning:"Net cash position with manageable convertible debt. Strong balance sheet supports continued investment."},{id:6,signal:"⚠️",reasoning:"Valuation rich on traditional metrics but hard to assess given losses. Bull case requires margin expansion to materialize."},{id:7,signal:"⚠️",reasoning:"Mixed analyst views — bulls love network effects, bears worry about path to profitability and dilution."},{id:8,signal:"⚠️",reasoning:"App store dependence is structural risk. Safety/moderation issues with young users create regulatory and PR risk."}]},
  VRT: {ticker:"VRT",name:"Vertiv Holdings",tag:"Infrastructure",stage:"growth",thesis:"Powers AI data centers with cooling & power management.",companyName:"Vertiv Holdings Co",oneLiner:"Vertiv designs and services critical power and cooling infrastructure that every AI data center depends on.",riskTier:"Tier 2",positionSize:"5–8% of portfolio",beta:"~2.05 (high volatility)",sleepTestVerdict:"VRT is highly volatile — if a 30% drop would panic you, size to 3–4% max.",nextCatalyst:"Q2 2026 earnings, August 5, 2026",dcaStrategy:"Given VRT's high beta of 2.05, split your position into 4 equal tranches over 3 months. Start with 25% immediately and add on any 5%+ dips to smooth out entry.",entryTiming:"Watch for pullbacks toward $230–240 support zone for ideal entry. Current price reflects fair value given growth, but volatility means patient buying is rewarded.",exitCriteria:"Trim if VRT trades above 60x forward earnings without guidance upgrades. Exit fully if data center capex growth turns negative for two consecutive quarters.",topRisks:["High beta of 2.05 means VRT falls harder than market in selloffs","APAC (-9.6%) and EMEA (-8.2%) revenue declining — geographic concentration risk","Tariff headwinds could compress margins by 100+ basis points"],steps:[{id:1,signal:"✅",reasoning:"Vertiv makes power and cooling gear for data centers — sells hardware plus recurring service contracts. Revenue streams are easy to understand and track."},{id:2,signal:"✅",reasoning:"AI infrastructure buildout is a multi-year secular trend. Every hyperscaler (Microsoft, Google, AWS) is spending heavily on data centers, directly driving Vertiv demand."},{id:3,signal:"✅",reasoning:"Q1 2026 EPS beat at $1.17 vs $1.01 estimate. Full-year 2026 guidance raised — adjusted EPS of $6.30–$6.40 implies 51% growth."},{id:4,signal:"✅",reasoning:"Q4 2025 free cash flow margin hit 31.6%, up from 15.4% a year prior. Operating margin is 20%+. The business is becoming more profitable as it scales."},{id:5,signal:"⚠️",reasoning:"Vertiv carries $3.23B in debt against $1.85B cash — net debt of ~$1.4B. Manageable given $1.89B annual FCF, but D/E ratio of 0.82 warrants monitoring."},{id:6,signal:"⚠️",reasoning:"Forward P/E of ~42x and trailing P/E of ~76x are premium valuations. PEG ratio of 1.33 is acceptable for growth rate but leaves little room for disappointment."},{id:7,signal:"✅",reasoning:"22 of 25 analysts rate VRT a Buy with zero Sells — median price target $280. In March 2026, 10 executives including CEO and CFO made equity purchases — strong insider confidence."},{id:8,signal:"⚠️",reasoning:"Beta of 2.05 makes VRT very sensitive to market selloffs. Geographic weakness in APAC and EMEA in Q4 2025 shows concentration risk outside Americas."}]},
  HIMS: {ticker:"HIMS",name:"Hims & Hers Health",tag:"Healthcare",stage:"growth",thesis:"Telehealth platform with strong GLP-1 tailwind.",companyName:"Hims & Hers Health Inc",oneLiner:"Hims runs a direct-to-consumer telehealth platform offering weight loss (GLP-1), hair loss, sexual health, and mental health treatments.",riskTier:"Tier 3",positionSize:"2–4% of portfolio",beta:"~2.5",sleepTestVerdict:"HIMS is extremely volatile — single news items move it 20%+. Cap exposure tightly.",nextCatalyst:"Q1 2026 earnings, May 11, 2026; FDA shortage list updates",dcaStrategy:"Build slowly given regulatory uncertainty. 5–6 tranches over 4 months, with capacity to add on regulatory clarity.",entryTiming:"Best entries are after negative GLP-1 regulatory news creates dips. The stock overreacts in both directions to FDA-related headlines.",exitCriteria:"Exit if FDA permanently bans compounded GLP-1 sales. Trim if growth slows below 30% YoY without GLP-1 contribution.",topRisks:["FDA could permanently ban compounded GLP-1 sales — this is a major part of the bull thesis","Direct competition from Eli Lilly direct-to-consumer offerings","Customer acquisition costs rising in telehealth"],steps:[{id:1,signal:"✅",reasoning:"Hims is a DTC telehealth platform — patients consult, get prescriptions, and receive medications shipped directly. Clear subscription-based business model."},{id:2,signal:"✅",reasoning:"Telehealth and DTC healthcare are growing structurally. GLP-1 weight loss demand is enormous and DTC is filling supply gaps from branded drugs."},{id:3,signal:"✅",reasoning:"Revenue growth exceeded 65% in 2024–2025, driven heavily by GLP-1 weight loss offerings. One of the fastest-growing healthcare names."},{id:4,signal:"✅",reasoning:"Recently turned FCF positive with expanding margins. Adjusted EBITDA growing faster than revenue — operating leverage kicking in."},{id:5,signal:"✅",reasoning:"Net cash position with minimal debt. Strong balance sheet provides flexibility to invest in growth."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 35x prices in continued GLP-1 growth. Multiple compression risk if regulatory action removes GLP-1 from the offering."},{id:7,signal:"⚠️",reasoning:"Analyst views split sharply — bulls love growth, bears worry about GLP-1 regulatory risk. Insider selling has been notable from early backers."},{id:8,signal:"🚩",reasoning:"FDA regulatory action on compounded GLP-1s is the central risk — could materially shrink the addressable market overnight."}]},
  AXON: {ticker:"AXON",name:"Axon Enterprise",tag:"AI & Tech",stage:"growth",thesis:"Taser & body cam monopoly expanding into AI software.",companyName:"Axon Enterprise Inc",oneLiner:"Axon makes Tasers, body cameras, and cloud software for law enforcement — increasingly an AI software company at its core.",riskTier:"Tier 2",positionSize:"5–8% of portfolio",beta:"~1.0",sleepTestVerdict:"AXON is high quality but not cheap — comfortable holders can size 6–8%, conservatives 4–5%.",nextCatalyst:"Q1 2026 earnings, May 6, 2026",dcaStrategy:"AXON is a long-term compounder — DCA over 3 months in 3 tranches works well. Add on any 10%+ pullback.",entryTiming:"AXON tends to be expensive and rarely cheap. Best entries are after broad market selloffs that take it down with everything else.",exitCriteria:"Trim if software ARR growth slows below 25%. Exit only if a credible competitor emerges (none exist today).",topRisks:["Premium valuation leaves little room for execution stumbles","Public sector budget pressure could slow new agency adoption","Competition from emerging body camera vendors at lower price points"],steps:[{id:1,signal:"✅",reasoning:"Axon sells Tasers, body cameras, and Evidence.com cloud platform to police agencies. Hardware plus high-margin recurring software model."},{id:2,signal:"✅",reasoning:"Body camera adoption continues globally and AI-powered software (auto-redaction, transcription) is expanding the wallet share. Strong tailwind."},{id:3,signal:"✅",reasoning:"Revenue grew 30%+ in 2025 with software ARR growing 35%+. Best-in-class growth rate for a profitable, established company."},{id:4,signal:"✅",reasoning:"Operating margins around 25% and expanding as software mix grows. Strong FCF generation funds R&D and selective M&A."},{id:5,signal:"✅",reasoning:"Net cash position with minimal debt. Strong balance sheet supports growth investments and occasional acquisitions."},{id:6,signal:"🚩",reasoning:"Forward P/E around 70x is one of the highest in software. PEG above 2.0 reflects extreme premium — significant multiple compression risk."},{id:7,signal:"✅",reasoning:"Strong Buy consensus with high price targets. Insiders are long-term holders with limited recent selling."},{id:8,signal:"⚠️",reasoning:"Valuation is the biggest risk — execution must remain flawless to justify the multiple. Public sector budget cycles can cause lumpy results."}]},
  CAVA: {ticker:"CAVA",name:"CAVA Group",tag:"Consumer",stage:"growth",thesis:"Mediterranean fast-casual growing like early Chipotle.",companyName:"CAVA Group Inc",oneLiner:"CAVA operates fast-casual Mediterranean restaurants — building out nationally with strong unit economics.",riskTier:"Tier 3",positionSize:"2–4% of portfolio",beta:"~2.1",sleepTestVerdict:"CAVA is a story stock — extremely volatile and richly valued. Small position only.",nextCatalyst:"Q1 2026 earnings, May 12, 2026",dcaStrategy:"Build very slowly over 6 months in small tranches. CAVA's volatility creates many entry opportunities.",entryTiming:"Wait for pullbacks of 15%+ from highs. Stock trades on sentiment as much as fundamentals.",exitCriteria:"Exit if same-store sales growth falls below 5% for two consecutive quarters. Trim aggressively on rallies above 80x forward earnings.",topRisks:["Premium valuation requires flawless execution","Same-store sales growth has decelerated from peak levels","Restaurant industry is competitive and trends shift quickly"],steps:[{id:1,signal:"✅",reasoning:"CAVA operates Mediterranean fast-casual restaurants — simple unit economics with menu, locations, and traffic driving revenue."},{id:2,signal:"✅",reasoning:"Fast-casual continues to take share from quick-service. Mediterranean cuisine is benefiting from health trends — favorable category positioning."},{id:3,signal:"✅",reasoning:"Revenue growth above 30% driven by new unit openings plus solid same-store sales growth. Comparable to early-stage Chipotle trajectory."},{id:4,signal:"⚠️",reasoning:"Recently turned profitable with expanding margins, but margin levels still below mature restaurant peers. FCF generation modest at current scale."},{id:5,signal:"✅",reasoning:"Net cash position from IPO proceeds — clean balance sheet supports unit growth without need for external financing."},{id:6,signal:"🚩",reasoning:"Forward P/E above 100x is among the highest in restaurants. Pricing in years of perfect execution — significant multiple compression risk."},{id:7,signal:"⚠️",reasoning:"Mixed analyst views — growth bulls vs valuation bears. Insider selling has been notable from pre-IPO holders."},{id:8,signal:"🚩",reasoning:"Valuation is the biggest risk — any same-store sales miss could trigger 30%+ drawdowns. Restaurant trends can shift quickly."}]},
  CELH: {ticker:"CELH",name:"Celsius Holdings",tag:"Consumer",stage:"growth",thesis:"Fast-growing energy drink taking share from Monster.",companyName:"Celsius Holdings Inc",oneLiner:"Celsius makes functional energy drinks marketed as healthier alternatives — distributed nationally through PepsiCo's network.",riskTier:"Tier 3",positionSize:"2–4% of portfolio",beta:"~1.8",sleepTestVerdict:"CELH has had massive drawdowns (50%+) — only size up if you can stomach extreme volatility.",nextCatalyst:"Q1 2026 earnings, early May 2026",dcaStrategy:"Build slowly with 5–6 small tranches over 4 months. CELH has had violent drawdowns, so patience pays.",entryTiming:"Wait for evidence of growth re-acceleration in quarterly reports. Recent quarters have shown decelerating growth — confirmation needed before sizing up.",exitCriteria:"Exit if quarterly revenue growth falls below 10% for two consecutive quarters. Take profits if stock recovers to forward P/E above 35x.",topRisks:["Growth has decelerated significantly from 2023 peak","Pepsi distribution renegotiation could pressure margins","Competitive intensity from Monster and Red Bull responding"],steps:[{id:1,signal:"✅",reasoning:"Celsius sells energy drinks branded as healthier alternatives, distributed via PepsiCo. Simple consumer products business with clear unit economics."},{id:2,signal:"✅",reasoning:"Energy drink category continues to grow as functional beverages take share from soda. Health-positioned brands like Celsius capture disproportionate growth."},{id:3,signal:"⚠️",reasoning:"Revenue growth has decelerated sharply from over 100% in 2023 to single digits more recently. Inventory destocking and tougher comps have pressured the topline."},{id:4,signal:"✅",reasoning:"Operating margins are healthy at 20%+ and FCF generation is solid. Despite growth slowdown, profitability remains strong."},{id:5,signal:"✅",reasoning:"Net cash position with minimal debt — pristine balance sheet. Provides flexibility to weather growth slowdown."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 25x reflects expectations of growth re-acceleration. If growth stays muted, multiple compression risk is significant."},{id:7,signal:"⚠️",reasoning:"Mixed analyst views — some bulls remain on long-term thesis, others downgraded after growth slowdown. Insider activity is muted."},{id:8,signal:"🚩",reasoning:"Growth deceleration is the biggest risk — if it continues, the entire bull thesis breaks. Pepsi relationship and competitive response add additional uncertainty."}]},
  ENPH: {ticker:"ENPH",name:"Enphase Energy",tag:"Energy",stage:"growth",thesis:"Home solar microinverter leader in clean energy market.",companyName:"Enphase Energy Inc",oneLiner:"Enphase makes microinverters and battery storage systems for residential solar — the brain of home solar installations.",riskTier:"Tier 3",positionSize:"2–4% of portfolio",beta:"~2.0",sleepTestVerdict:"ENPH has been in a deep multi-year drawdown. Only buy if you have high conviction and long time horizon.",nextCatalyst:"Q2 2026 earnings, late July 2026",dcaStrategy:"DCA slowly given continued sector weakness. 5–6 small tranches over 6+ months — don't rush in.",entryTiming:"Wait for evidence of demand stabilization in US residential solar. Interest rate cuts are a key catalyst — track Fed policy closely.",exitCriteria:"Exit if US residential solar installations decline another 20%+ in 2026. Trim aggressively on any rally above $100.",topRisks:["High interest rates crushing residential solar demand","California NEM 3.0 policy reducing solar economics","Increased competition from Tesla Powerwall and other entrants"],steps:[{id:1,signal:"✅",reasoning:"Enphase makes microinverters and batteries for home solar. Hardware + software business with clear value proposition for installers and homeowners."},{id:2,signal:"⚠️",reasoning:"Long-term clean energy transition is positive, but residential solar near-term is challenged by high interest rates and policy changes (California NEM 3.0)."},{id:3,signal:"🚩",reasoning:"Revenue declined sharply in 2024 and 2025 as residential solar demand collapsed. A recovery is anticipated but not yet confirmed."},{id:4,signal:"⚠️",reasoning:"Margins compressed significantly during the downturn. FCF turned positive again but well below historical highs. Recovery in progress but uneven."},{id:5,signal:"⚠️",reasoning:"Carries some convertible debt but maintains adequate cash. Balance sheet is OK but not pristine — needs revenue recovery to deleverage."},{id:6,signal:"⚠️",reasoning:"Forward P/E hard to peg given depressed earnings. On a recovery basis, valuation looks attractive, but you're betting on the recovery happening."},{id:7,signal:"⚠️",reasoning:"Analyst views are mixed — bulls see recovery story, bears see structural challenges. Insider activity has been muted."},{id:8,signal:"🚩",reasoning:"Demand recovery is the central question. If high rates persist or solar policy worsens further, the recovery thesis breaks."}]},
  VST: {ticker:"VST",name:"Vistra Energy",tag:"Energy",stage:"growth",thesis:"Power generator riding AI data center electricity surge.",companyName:"Vistra Corp",oneLiner:"Vistra is a Texas-based power generator with nuclear and gas assets — directly benefiting from surging electricity demand from AI data centers.",riskTier:"Tier 2",positionSize:"4–7% of portfolio",beta:"~1.3",sleepTestVerdict:"VST has run hard but remains a real cash-flow story — moderate position size for moderate risk tolerance.",nextCatalyst:"Q1 2026 earnings, May 7, 2026; data center deal announcements",dcaStrategy:"Stock has run hard already — DCA in 4 tranches over 3 months. Add aggressively only on 10%+ pullbacks.",entryTiming:"Wait for pullbacks given the strong rally. Power demand thesis is intact but a lot is priced in already.",exitCriteria:"Trim if power prices weaken materially. Exit if AI data center buildout shows signs of slowing.",topRisks:["Power price volatility — Texas (ERCOT) market can swing dramatically","Nuclear plant operational issues could materially impact earnings","Stock has rerated significantly already — multiple compression risk"],steps:[{id:1,signal:"✅",reasoning:"Vistra generates and sells electricity from nuclear, gas, and coal plants. Simple business — produce power, sell it. Increasingly tied to AI data center demand."},{id:2,signal:"✅",reasoning:"AI data centers are driving the largest US electricity demand growth in decades. Vistra's nuclear assets are particularly valuable for round-the-clock clean baseload."},{id:3,signal:"✅",reasoning:"Revenue growth has accelerated significantly with the Energy Harbor acquisition adding nuclear capacity. Forward growth tied to power price strength."},{id:4,signal:"✅",reasoning:"FCF generation is strong and growing. Operating leverage from higher power prices flows directly to the bottom line."},{id:5,signal:"⚠️",reasoning:"Carries notable debt from the Energy Harbor deal. Manageable given strong FCF, but D/E above 1.0 warrants monitoring."},{id:6,signal:"⚠️",reasoning:"Stock has rerated significantly — forward P/E around 25x is no longer cheap. PEG ratio reflects expectations of continued power price strength."},{id:7,signal:"✅",reasoning:"Strong Buy consensus — analysts have repeatedly raised targets. Insider activity has been mixed but no significant selling."},{id:8,signal:"⚠️",reasoning:"Power price volatility is the central risk — ERCOT prices can swing dramatically. Nuclear operational risk is low-probability but high-impact."}]},
  NVDA: {ticker:"NVDA",name:"NVIDIA Corporation",tag:"AI & Tech",stage:"established",thesis:"Dominates AI chip supply — GPUs are the engine of AI.",companyName:"NVIDIA Corporation",oneLiner:"NVIDIA designs the GPUs and software (CUDA) that power virtually every AI training and inference workload globally.",riskTier:"Tier 2",positionSize:"5–10% of portfolio",beta:"~1.7",sleepTestVerdict:"NVDA can move 10%+ on earnings — comfortable holders can size to 8–10%, others should cap at 5%.",nextCatalyst:"Q1 FY27 earnings, May 20, 2026",dcaStrategy:"NVDA is a core AI holding but expensive. Split into 3 tranches over 2 months — buy 1/3 now, 1/3 on any 5% dip, final 1/3 after next earnings.",entryTiming:"Watch for entries on broader market pullbacks. NVDA tends to overshoot to the downside in tech selloffs, creating opportunities.",exitCriteria:"Trim if AI capex from hyperscalers shows signs of slowing. Exit if a credible competitor (custom silicon from Google, AWS) takes meaningful share.",topRisks:["Customer concentration — top 4 hyperscalers drive most revenue","Custom silicon competition from Google TPU, AWS Trainium, Microsoft Maia","China export restrictions limiting addressable market"],steps:[{id:1,signal:"✅",reasoning:"NVIDIA designs GPUs that power AI training and inference. Sells chips plus the CUDA software platform that locks customers in — clear monopoly-like position."},{id:2,signal:"✅",reasoning:"AI compute demand growing 50%+ annually as enterprises move from experimentation to production. Multi-year capex cycle from hyperscalers shows no signs of slowing."},{id:3,signal:"✅",reasoning:"Revenue grew over 60% in fiscal 2025, with data center revenue up nearly 100%. One of the fastest-growing mega-caps in market history."},{id:4,signal:"✅",reasoning:"Operating margins above 60% — extraordinary for a hardware company. FCF generation of $60B+ annually funds aggressive R&D and buybacks."},{id:5,signal:"✅",reasoning:"Net cash position with $40B+ in cash and minimal debt. Balance sheet is fortress-strong, providing flexibility for M&A and capital returns."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 30x is high but reasonable given growth. PEG ratio under 1.0 suggests fair value if growth sustains, but multiple compression risk if AI spending slows."},{id:7,signal:"✅",reasoning:"Overwhelming Buy consensus with average price targets implying 15–20% upside. Insiders hold significant equity but recent transactions are mostly diversification, not warning signs."},{id:8,signal:"⚠️",reasoning:"Customer concentration is the biggest risk — top customers comprise much of revenue. Custom silicon from cloud providers (TPU, Trainium) is a multi-year threat."}]},
  TSM: {ticker:"TSM",name:"Taiwan Semiconductor",tag:"AI & Tech",stage:"established",thesis:"Manufactures chips for Apple, NVDA, AMD — irreplaceable.",companyName:"Taiwan Semiconductor Manufacturing",oneLiner:"TSMC manufactures the world's most advanced semiconductors — Apple, NVIDIA, AMD, Qualcomm all depend on its fabs.",riskTier:"Tier 2",positionSize:"5–10% of portfolio",beta:"~1.2",sleepTestVerdict:"TSM is high quality with one geopolitical wild card (Taiwan/China) — comfortable holders can size 8–10%.",nextCatalyst:"Q2 2026 earnings, mid-July 2026",dcaStrategy:"TSM is a core compounder — DCA over 2 months in 3 tranches. Add aggressively on any China/Taiwan-related dips that don't reflect actual escalation.",entryTiming:"Best entries come during Taiwan Strait tension headlines that don't reflect actual escalation. AI capex visibility supports near-term growth.",exitCriteria:"Exit if there's credible evidence of imminent China-Taiwan military escalation. Trim only if AI demand falls off a cliff.",topRisks:["Geopolitical risk — China-Taiwan tensions could disrupt operations dramatically","Customer concentration with Apple and NVIDIA as huge revenue percentages","Competition from Samsung and Intel in advanced nodes"],steps:[{id:1,signal:"✅",reasoning:"TSMC manufactures chips designed by others — Apple, NVIDIA, AMD, Qualcomm. Pure-play foundry with technology leadership at advanced nodes."},{id:2,signal:"✅",reasoning:"AI chip demand is exploding and TSMC is the only company that can manufacture the most advanced GPUs. Multi-year secular tailwind from AI."},{id:3,signal:"✅",reasoning:"Revenue grew 30%+ in 2025 with AI accelerator chips driving outsized growth. Guidance points to continued strong growth into 2026."},{id:4,signal:"✅",reasoning:"Operating margins above 45% — extraordinary for capital-intensive manufacturing. FCF generation funds aggressive capex and dividends."},{id:5,signal:"✅",reasoning:"Net cash position with manageable debt. Balance sheet supports massive ongoing capex investment in next-generation fabs."},{id:6,signal:"✅",reasoning:"Forward P/E around 22x is reasonable for the growth and quality. Among the most attractively valued AI plays available."},{id:7,signal:"✅",reasoning:"Strong Buy consensus globally. Insider transactions are limited but no concerning activity."},{id:8,signal:"🚩",reasoning:"Geopolitical risk is the dominant concern — China-Taiwan tensions create binary risk. Customer concentration adds operational risk."}]},
  MA: {ticker:"MA",name:"Mastercard",tag:"Financials",stage:"established",thesis:"Toll booth on global spending — wide moat, high margins.",companyName:"Mastercard Incorporated",oneLiner:"Mastercard operates the global payment network — earning a small fee on every transaction across its network of cards, banks, and merchants.",riskTier:"Tier 1",positionSize:"5–10% of portfolio",beta:"~1.1",sleepTestVerdict:"MA is a high-quality compounder — comfortable to hold through volatility, can size 8–10% for long-term holders.",nextCatalyst:"Q1 2026 earnings, April 30, 2026",dcaStrategy:"MA is a textbook DCA name — buy regularly over 3–4 months. The stock rarely gets cheap so don't wait too long.",entryTiming:"Best entries come during broader market selloffs or recession fears. MA tends to be resilient but trades down with the market.",exitCriteria:"MA is a long-term hold for most investors. Trim only if forward P/E exceeds 35x or if cross-border transaction growth structurally slows.",topRisks:["Regulatory pressure on interchange fees in multiple geographies","Competitive threats from real-time payment systems (FedNow, UPI in India)","Recession risk would slow consumer spending and travel"],steps:[{id:1,signal:"✅",reasoning:"Mastercard takes a tiny fee on every transaction processed through its network. Among the simplest and most predictable business models in markets."},{id:2,signal:"✅",reasoning:"Cash-to-card conversion globally still has years of runway, especially in emerging markets. Cross-border travel and digital commerce add growth layers."},{id:3,signal:"✅",reasoning:"Revenue growth consistently in the mid-to-high teens annually. Growth is durable and predictable — rare combination at this scale."},{id:4,signal:"✅",reasoning:"Operating margins above 55% — among the best in the world. FCF generation is enormous and growing."},{id:5,signal:"✅",reasoning:"Manageable debt with strong cash generation. Returns capital aggressively via buybacks and dividends."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 30x reflects quality and growth. Not cheap, but rarely is — PEG ratio around 2.0 is fair for the durability."},{id:7,signal:"✅",reasoning:"Strong Buy consensus with steadily rising price targets. Limited insider selling, mostly diversification-related."},{id:8,signal:"⚠️",reasoning:"Regulatory risk on interchange fees is the persistent concern. Real-time payment systems in some markets bypass card networks entirely — long-term threat."}]},
  COST: {ticker:"COST",name:"Costco Wholesale",tag:"Consumer",stage:"established",thesis:"Membership flywheel + consistent execution = decade-long compounder.",companyName:"Costco Wholesale Corporation",oneLiner:"Costco runs membership warehouse stores — earning most profits from $130+ annual memberships rather than retail margins.",riskTier:"Tier 1",positionSize:"5–15% of portfolio",beta:"~0.9",sleepTestVerdict:"COST is a sleep-well-at-night holding — can size 10–15% for buy-and-hold investors.",nextCatalyst:"Q3 FY26 earnings, late May 2026",dcaStrategy:"COST rarely gets cheap — DCA regularly over 3–4 months without trying to time. Buy and hold for years.",entryTiming:"Best entries are during broader retail selloffs that catch COST in the downdraft. The stock rarely has prolonged weakness.",exitCriteria:"COST is a long-term hold. Trim only if membership renewal rates decline meaningfully or forward P/E exceeds 50x.",topRisks:["Forward P/E above 50x is historically expensive","Sensitivity to consumer spending in recessions","Potential disruption from Amazon Prime in some categories"],steps:[{id:1,signal:"✅",reasoning:"Membership warehouse retailer — earns most profits from membership fees, not product margins. Crystal-clear value proposition."},{id:2,signal:"✅",reasoning:"Membership-driven retail continues to outperform. Costco's value proposition strengthens during inflation and remains sticky."},{id:3,signal:"✅",reasoning:"Revenue and comparable sales growing high single digits consistently. International expansion provides incremental growth runway."},{id:4,signal:"✅",reasoning:"Operating margins thin by design but consistently profitable. FCF generation is steady and predictable."},{id:5,signal:"✅",reasoning:"Net cash position. Conservative balance sheet supports steady capital returns via buybacks and special dividends."},{id:6,signal:"🚩",reasoning:"Forward P/E above 50x is the highest in retail history — significant premium that requires continued perfect execution."},{id:7,signal:"✅",reasoning:"Strong Buy consensus consistently. Insiders are long-term holders with limited selling activity."},{id:8,signal:"⚠️",reasoning:"Valuation is the main concern — COST is priced for perfection. Recession sensitivity exists despite the membership model."}]},
  V: {ticker:"V",name:"Visa Inc",tag:"Financials",stage:"established",thesis:"Global payments duopolist — same toll-booth model as Mastercard.",companyName:"Visa Inc",oneLiner:"Visa operates the world's largest payment network, processing $15+ trillion annually across cards, debits, and digital payments.",riskTier:"Tier 1",positionSize:"5–15% of portfolio",beta:"~1.0",sleepTestVerdict:"V is a top-quality compounder — can size 10–15% as a portfolio cornerstone.",nextCatalyst:"Q2 FY26 earnings, April 29, 2026",dcaStrategy:"V is a classic DCA name — buy regularly over 3–4 months. Add aggressively on broader market drawdowns.",entryTiming:"Best entries during recession fears or market selloffs. V tends to recover quickly when consumer spending stabilizes.",exitCriteria:"V is a multi-decade hold for most investors. Trim only on extreme valuations (forward P/E >35x) or structural disruption.",topRisks:["Regulatory pressure on interchange fees","Competition from real-time payment systems globally","Recession risk impacting consumer spending"],steps:[{id:1,signal:"✅",reasoning:"Operates global payment network — collects fees on every transaction. Predictable, scalable business model."},{id:2,signal:"✅",reasoning:"Cash-to-digital payment migration continues globally. Cross-border payments and B2B remain large growth opportunities."},{id:3,signal:"✅",reasoning:"Revenue growing at low double digits consistently. Predictable growth driven by transaction volume and yield expansion."},{id:4,signal:"✅",reasoning:"Operating margins above 65% — among the highest of any large company. FCF generation is enormous."},{id:5,signal:"✅",reasoning:"Manageable debt with massive cash generation. Returns most FCF via buybacks and dividends."},{id:6,signal:"⚠️",reasoning:"Forward P/E around 28x reflects quality. Not cheap, but reasonable for the durability and predictability of growth."},{id:7,signal:"✅",reasoning:"Strong Buy consensus. Insider activity is normal — no concerning selling patterns."},{id:8,signal:"⚠️",reasoning:"Regulatory pressure on interchange is persistent. Long-term threat from real-time payments and stablecoins."}]},
  GOOGL: {ticker:"GOOGL",name:"Alphabet Inc",tag:"AI & Tech",stage:"established",thesis:"AI-pivot underway with strong Cloud, YouTube, and Search moats.",companyName:"Alphabet Inc (Class A)",oneLiner:"Alphabet owns Google Search, YouTube, Android, Google Cloud, Waymo, and many AI initiatives — earning most revenue from advertising.",riskTier:"Tier 1",positionSize:"5–15% of portfolio",beta:"~1.1",sleepTestVerdict:"GOOGL is a high-quality core holding — can size 10–15% as a portfolio anchor.",nextCatalyst:"Q2 2026 earnings, late July 2026",dcaStrategy:"GOOGL is a classic DCA name — accumulate over 3 months. Add aggressively on any AI-related selloffs.",entryTiming:"Best entries are during periods of AI competition fears that prove overblown. Search remains durable.",exitCriteria:"GOOGL is a long-term hold. Trim only if Search revenue starts declining or AI competitive position weakens dramatically.",topRisks:["AI competition (ChatGPT, Perplexity) could disrupt Search","Antitrust action could force divestiture of YouTube or Chrome","Heavy capex on AI infrastructure could pressure margins near-term"],steps:[{id:1,signal:"✅",reasoning:"Owns Search (advertising), YouTube (advertising + subscriptions), Cloud, Android, Waymo. Most revenue is advertising — clear business model."},{id:2,signal:"✅",reasoning:"Digital advertising continues growing globally. Cloud is taking share in enterprise AI workloads. Multiple growth vectors."},{id:3,signal:"✅",reasoning:"Revenue growing 12–15% consistently. Cloud growing fastest at 30%+. Strong overall growth at scale."},{id:4,signal:"✅",reasoning:"Operating margins around 30% with massive FCF generation. Returns capital aggressively via buybacks."},{id:5,signal:"✅",reasoning:"Net cash position with $100B+ in cash and modest debt. One of the strongest balance sheets in markets."},{id:6,signal:"✅",reasoning:"Forward P/E around 22x is reasonable given growth and quality. Among the most attractively valued mega-caps."},{id:7,signal:"✅",reasoning:"Strong Buy consensus. Limited insider selling, mostly diversification-related."},{id:8,signal:"⚠️",reasoning:"AI competition to Search is the dominant long-term risk. Antitrust action could force structural changes."}]},
  ANRO: {ticker:"ANRO",name:"Anaergia Inc",tag:"Energy",stage:"early",thesis:"Renewable natural gas from food waste — small cap with big TAM.",companyName:"Anaergia Inc",oneLiner:"Anaergia builds and operates plants that convert food waste into renewable natural gas — early stage but growing.",riskTier:"Tier 3",positionSize:"1–2% of portfolio",beta:"~2.5",sleepTestVerdict:"Speculative micro-cap — only suitable for high-risk-tolerance investors.",nextCatalyst:"Major project announcements; quarterly results",dcaStrategy:"Tiny tranches over 6+ months. Micro-caps are illiquid and volatile.",entryTiming:"Wait for project win announcements. RNG is a niche market with lumpy news flow.",exitCriteria:"Exit if cash burn rate accelerates or RNG demand softens. Trim aggressively on news-driven rallies.",topRisks:["Cash burn requires repeated equity raises and dilution","Niche market — limited number of large RNG buyers","Stock illiquid and prone to violent moves"],steps:[{id:1,signal:"✅",reasoning:"Builds anaerobic digestion plants that turn organic waste into renewable natural gas. Clear business model — sell RNG to utilities and industrial users."},{id:2,signal:"✅",reasoning:"RNG demand growing as utilities pursue decarbonization. Long-term tailwind from regulations and corporate ESG commitments."},{id:3,signal:"⚠️",reasoning:"Revenue growth is lumpy and project-dependent. Strong overall trend but quarterly volatility is high."},{id:4,signal:"🚩",reasoning:"Operating losses continue with negative FCF as company invests in new projects. Profitability years away."},{id:5,signal:"🚩",reasoning:"Carries significant debt for an early-stage company. Cash burn rate creates dilution risk."},{id:6,signal:"⚠️",reasoning:"Hard to value with no profits. Trading on the promise of project pipeline materializing."},{id:7,signal:"⚠️",reasoning:"Limited analyst coverage given small size. Insider transactions limited."},{id:8,signal:"🚩",reasoning:"Funding/dilution risk is dominant — micro-cap that needs to raise capital. Project execution uncertainty is high."}]},
  LMT: {ticker:"LMT",name:"Lockheed Martin",tag:"Defense",stage:"established",thesis:"Defense spending tailwind with F-35 dominance.",companyName:"Lockheed Martin Corporation",oneLiner:"Lockheed Martin makes F-35 fighters, missile defense systems, and space technology — primary contractor for Western militaries.",riskTier:"Tier 1",positionSize:"5–10% of portfolio",beta:"~0.5",sleepTestVerdict:"LMT is a defensive holding — low beta and steady dividends. Can size 8–10% for income-oriented portfolios.",nextCatalyst:"Q2 2026 earnings, July 2026; defense budget appropriations",dcaStrategy:"LMT is a classic DCA name — buy regularly over 3–4 months. Stable performance with dividend income.",entryTiming:"Best entries when defense budget concerns create temporary weakness. Geopolitical tensions support long-term thesis.",exitCriteria:"Trim if F-35 program faces major issues or defense budgets actually decline. Otherwise a multi-decade hold.",topRisks:["Defense budget cuts could slow growth (low probability)","F-35 program concentration — issues here would be material","Reputational and ESG concerns from some institutional investors"],steps:[{id:1,signal:"✅",reasoning:"Defense contractor — sells weapons systems, mostly to US government and allies. Predictable customers and contract revenue."},{id:2,signal:"✅",reasoning:"Global defense spending rising due to geopolitical tensions. Western militaries are restocking and modernizing."},{id:3,signal:"✅",reasoning:"Revenue growing high single digits driven by F-35 production and missile demand. Multi-year backlog provides visibility."},{id:4,signal:"✅",reasoning:"Operating margins around 12% — typical for defense primes. Strong FCF generation funds dividends and buybacks."},{id:5,signal:"✅",reasoning:"Manageable debt with strong cash generation. Returns significant capital via dividends (3%+ yield) and buybacks."},{id:6,signal:"✅",reasoning:"Forward P/E around 18x is attractive for the steady growth and dividend yield. Defense names trade at discount to broader market."},{id:7,signal:"✅",reasoning:"Strong Buy consensus. Insider activity is normal."},{id:8,signal:"⚠️",reasoning:"F-35 program concentration is the main operational risk. Defense budget changes are the main political risk."}]},
};

const SEEDS = Object.values(STOCK_DB).map(s => ({ticker:s.ticker,name:s.name,thesis:s.thesis,tag:s.tag,stage:s.stage}));

const STAGE_LABELS = {
  early: { label: "Early Stage", banner: "🚀 Early-stage stocks have 10–100x upside potential — but also significant risk of loss. Size positions small (1–3% max).", className: "stage-early" },
  growth: { label: "Growth Stage", banner: "📈 Growth-stage stocks balance proven business models with strong upside. Moderate position sizes (3–8%).", className: "stage-growth" },
  established: { label: "Established", banner: "🏛️ Established compounders deliver steady returns over years. Suitable for larger positions (5–15%).", className: "stage-est" },
};

function sigC(s){
  if(!s) return "#3a3a50";
  if(s.startsWith("✅")) return "#22c55e";
  if(s.startsWith("⚠️")) return "#f59e0b";
  if(s.startsWith("🚩")) return "#ef4444";
  return "#3a3a50";
}

// ── Earnings calendar helpers ────────────────────────────────────────────────
const TODAY = new Date("2026-04-29"); // App is current as of this date
const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

function daysUntil(dateStr) {
  const target = new Date(dateStr);
  const diff = Math.round((target - TODAY) / (1000 * 60 * 60 * 24));
  return diff;
}
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return { day: d.getDate(), month: MONTHS[d.getMonth()], year: d.getFullYear() };
}
function formatDateLong(dateStr) {
  const d = new Date(dateStr);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
function getEarningsStatus(dateStr) {
  const days = daysUntil(dateStr);
  if (days < 0) return { type:"past", label:`${Math.abs(days)}d ago` };
  if (days === 0) return { type:"imminent", label:"TODAY" };
  if (days <= 7) return { type:"imminent", label:`In ${days}d` };
  if (days <= 30) return { type:"soon", label:`In ${days}d` };
  return { type:"future", label:`In ${days}d` };
}

function InfoButton({ glossKey, onClick }) {
  if (!GLOSSARY[glossKey]) return null;
  return (<span className="infobtn" onClick={(e) => { e.stopPropagation(); onClick(glossKey); }}>i</span>);
}

export default function App() {
  const [tab,setTab]            = useState("discover");
  const [selected,setSelected]  = useState(null);
  const [ticker,setTicker]      = useState("");
  const [analysis,setAnalysis]  = useState(null);
  const [expanded,setExpanded]  = useState(null);
  const [overrides,setOverrides]= useState({});
  const [stageFilter,setStageFilter] = useState("all");
  const [tooltip,setTooltip]    = useState(null);

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
    setAnalysis(STOCK_DB[c.ticker]);
    setOverrides({});
    setExpanded(null);
    setTab("playbook");
  }

  // sort all stocks by earnings date — soonest first (upcoming), then past
  const sortedByEarnings = Object.keys(STOCK_DB)
    .filter(t => EARNINGS[t])
    .map(t => ({ ticker: t, stock: STOCK_DB[t], earnings: EARNINGS[t] }))
    .sort((a, b) => {
      const aDays = daysUntil(a.earnings.date);
      const bDays = daysUntil(b.earnings.date);
      // upcoming first (positive days), then past (negative days, more recent first)
      if (aDays >= 0 && bDays >= 0) return aDays - bDays;
      if (aDays < 0 && bDays < 0) return bDays - aDays;
      return bDays - aDays; // upcoming before past
    });

  const upcomingEarnings = sortedByEarnings.filter(e => daysUntil(e.earnings.date) >= 0);
  const pastEarnings = sortedByEarnings.filter(e => daysUntil(e.earnings.date) < 0);

  const filteredSeeds = stageFilter === "all" ? SEEDS : SEEDS.filter(s => s.stage === stageFilter);
  const stageBanner = stageFilter !== "all" ? STAGE_LABELS[stageFilter] : null;

  // Get earnings info for the currently-selected stock
  const selectedEarnings = ticker ? EARNINGS[ticker] : null;

  return (
    <div className="app">
      <style>{G}</style>
      <div className="hdr">
        <div className="hdr-eye">For Educational Use Only</div>
        <div className="hdr-title">The <em>Investor's</em> Playbook</div>
      </div>
      <div className="tabs">
        {[
          {k:"discover",l:"I · Discover"},
          {k:"earnings",l:"📅 Earnings"},
          {k:"playbook",l:"II · Analyze"},
          {k:"size",    l:"III · Size"},
          {k:"when",    l:"IV · When?"},
        ].map(t=>(
          <button key={t.k} className={`tab ${tab===t.k?"on":""}`} onClick={()=>setTab(t.k)}>{t.l}</button>
        ))}
      </div>

      {tooltip && GLOSSARY[tooltip] && (
        <div className="tooltip-modal" onClick={() => setTooltip(null)}>
          <div className="tooltip-card" onClick={(e) => e.stopPropagation()}>
            <div className="tt-eye">Glossary</div>
            <div className="tt-title">{GLOSSARY[tooltip].title}</div>
            <div className="tt-body">{GLOSSARY[tooltip].body}</div>
            {GLOSSARY[tooltip].eg && <div className="tt-eg">Example: {GLOSSARY[tooltip].eg}</div>}
            <button className="tt-close" onClick={() => setTooltip(null)}>Got it</button>
          </div>
        </div>
      )}

      <div className="main">

        {/* ── I DISCOVER ── */}
        {tab==="discover" && (
          <div>
            <div className="toprow">
              <div><div className="sec-t">Stock Candidates</div><div className="sec-s">{filteredSeeds.length} stocks · Tap any to analyze</div></div>
            </div>
            <div className="filterbar">
              {[{k:"all",l:"All Stages"},{k:"early",l:"🚀 Early"},{k:"growth",l:"📈 Growth"},{k:"established",l:"🏛️ Established"}].map(f => (
                <button key={f.k} className={`fbtn ${stageFilter===f.k?"on":""}`} onClick={()=>setStageFilter(f.k)}>{f.l}</button>
              ))}
            </div>
            {stageBanner && <div className="stage-banner"><div className="stage-banner-txt">{stageBanner.banner}</div></div>}
            <div className="cgrid">
              {filteredSeeds.map(c=>{
                const stageInfo = STAGE_LABELS[c.stage];
                return (
                  <div key={c.ticker} className={`ccard ${selected?.ticker===c.ticker?"sel":""}`} onClick={()=>pickStock(c)}>
                    <div className="ctickrow">
                      <div className="ctick">${c.ticker}</div>
                      <div className={`cstage ${stageInfo.className}`}>{stageInfo.label.split(" ")[0]}</div>
                    </div>
                    <div className="cname">{c.name}</div>
                    <div className="cthesis">{c.thesis}</div>
                    <div className={`ctag ${TAG_MAP[c.tag]||"tag-ai"}`}>{c.tag}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── EARNINGS CALENDAR (NEW) ── */}
        {tab==="earnings" && (
          <div>
            <div className="toprow">
              <div>
                <div className="sec-t">Earnings Calendar</div>
                <div className="sec-s">Sorted by date · Tap to see prep notes</div>
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
                    <div className="edate">
                      <div className="edate-day">{d.day}</div>
                      <div className="edate-mo">{d.month}</div>
                    </div>
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
                        <div className="edate">
                          <div className="edate-day">{d.day}</div>
                          <div className="edate-mo">{d.month}</div>
                        </div>
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

        {/* ── II ANALYZE ── */}
        {tab==="playbook" && (
          <div>
            {!analysis && (
              <div className="nostock">
                <div className="ns-l">No stock selected</div>
                <div className="ns-t">Pick a stock from the Discover tab</div>
                <button className="btn-gold" onClick={()=>setTab("discover")}>← Discover Stocks</button>
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

                {/* ── EARNINGS PREP CARD (NEW) ── */}
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

                      {!isPast && (
                        <div className="eprep-block">
                          <div className="eprep-blbl"><span className="eprep-blbl-icon">🎯</span>What to watch BEFORE</div>
                          <div className="eprep-btxt">{selectedEarnings.watchPre}</div>
                        </div>
                      )}

                      <div className="eprep-block">
                        <div className="eprep-blbl"><span className="eprep-blbl-icon">{isPast?"📊":"🔮"}</span>{isPast?"Post-earnings game plan":"What to watch AFTER"}</div>
                        <div className="eprep-btxt">{selectedEarnings.watchPost}</div>
                      </div>
                    </div>
                  );
                })()}

                {/* Snapshot */}
                <div className="snap">
                  <div className="snap-lbl">Snapshot — ${ticker}</div>
                  <div className="sigbar">
                    {STEPS.map(step => {
                      const aiStep = analysis.steps.find(s => s.id === step.id);
                      const sig = aiStep?.signal || "—";
                      const c = sigC(sig);
                      return (
                        <div key={step.id} className="sigchip" style={{border:`1px solid ${c}33`}}>
                          <div style={{fontSize:"13px",lineHeight:1}}>{sig}</div>
                          <div className="siglbl">{step.label.split(" ")[0]}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mgrid">
                    {[
                      {l:"Risk Tier",    v:analysis.riskTier,    g:"Risk Tier"},
                      {l:"Position Size",v:analysis.positionSize,g:"Position Size"},
                      {l:"Beta",         v:analysis.beta,        g:"Beta"},
                      {l:"Next Catalyst",v:analysis.nextCatalyst,g:"Next Catalyst"},
                    ].map(m=>(
                      <div key={m.l} className="mcell">
                        <div className="mlbl">{m.l}<InfoButton glossKey={m.g} onClick={setTooltip} /></div>
                        <div className="mval">{m.v}</div>
                      </div>
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

                <div style={{fontFamily:"'DM Mono',monospace",fontSize:"7.5px",letterSpacing:".16em",color:"#3e3e52",textTransform:"uppercase",marginBottom:9}}>
                  Detailed Analysis — tap any step to override
                </div>

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
                          <span className="sc-lbl">
                            {step.label}
                            {step.glossKey && <InfoButton glossKey={step.glossKey} onClick={setTooltip} />}
                          </span>
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
                                <button key={opt} className="optbtn"
                                  style={{background:isSel?`${oc}12`:"rgba(255,255,255,.015)",borderColor:isSel?`${oc}55`:"#1e1e2a",color:isSel?oc:"#4a4a5e"}}
                                  onClick={()=>setOverrides(p=>({...p,[step.id]:opt}))}>
                                  <span>{opt}</span>
                                  {isSel&&<span style={{fontSize:"7.5px",opacity:.6}}>← selected</span>}
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

        {/* ── III HOW MUCH ── */}
        {tab==="size" && (
          <div>
            <div className="sec-t">Position Sizing</div>
            <div className="sec-s">How much to invest</div>
            {analysis ? (
              <div className="aipanel">
                <div className="aiplbl">Sizing — ${ticker}</div>
                {[
                  {l:"Risk Tier",         v:analysis.riskTier,         g:"Risk Tier"},
                  {l:"Suggested Size",    v:analysis.positionSize,     g:"Position Size"},
                  {l:"Beta / Volatility", v:analysis.beta,             g:"Beta"},
                  {l:"Sleep Test",        v:analysis.sleepTestVerdict, g:"Sleep Test"},
                ].map(m=>(
                  <div key={m.l} className="airow">
                    <div className="airlbl">{m.l}<InfoButton glossKey={m.g} onClick={setTooltip} /></div>
                    <div className="airval">{m.v}</div>
                  </div>
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
            <div className="tip" style={{marginTop:12}}>
              <div className="tip-l">Golden Rule</div>
              <div className="tip-t">Never put more than 10% of your portfolio in a single stock regardless of conviction. Diversification is free insurance.</div>
            </div>
          </div>
        )}

        {/* ── IV WHEN ── */}
        {tab==="when" && (
          <div>
            <div className="sec-t">When to Buy</div>
            <div className="sec-s">Entry & exit strategy</div>
            {analysis ? (
              <div className="aipanel">
                <div className="aiplbl">Entry Plan — ${ticker}</div>
                {[
                  {l:"DCA Strategy",  v:analysis.dcaStrategy,  g:"DCA Strategy"},
                  {l:"Entry Timing",  v:analysis.entryTiming,  g:"Entry Timing"},
                  {l:"Exit Criteria", v:analysis.exitCriteria, g:"Exit Criteria"},
                  {l:"Next Catalyst", v:analysis.nextCatalyst, g:"Next Catalyst"},
                ].map(m=>(
                  <div key={m.l} className="airow">
                    <div className="airlbl">{m.l}<InfoButton glossKey={m.g} onClick={setTooltip} /></div>
                    <div className="airval">{m.v}</div>
                  </div>
                ))}
                {analysis.topRisks?.length > 0 && (
                  <div className="airow" style={{marginBottom:0,paddingBottom:0,borderBottom:"none"}}>
                    <div className="airlbl">Top Risks<InfoButton glossKey="Top Risks" onClick={setTooltip} /></div>
                    {analysis.topRisks.map((r,i)=>(
                      <div key={i} style={{display:"flex",gap:7,marginBottom:4,alignItems:"flex-start"}}>
                        <span style={{color:"#d4af37",fontSize:"9px",marginTop:1}}>🚩</span>
                        <span style={{fontFamily:"'DM Mono',monospace",fontSize:"8.5px",color:"#5a5a6e",lineHeight:1.7}}>{r}</span>
                      </div>
                    ))}
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
                <div>
                  <div className="wlb">{i+1}. {s.label}{s.glossKey && <InfoButton glossKey={s.glossKey} onClick={setTooltip} />}</div>
                  <div className="wdt">{s.detail}</div>
                </div>
              </div>
            ))}
            <div className="gbox" style={{marginTop:14}}>
              <div className="gbox-l">The One Rule</div>
              <div className="gbox-t">"Time in the market beats timing the market — but entry price still matters. DCA removes the pressure to be right on any single day."</div>
            </div>
          </div>
        )}

        <div className="disc">Educational purposes only · Not financial advice · Consult a qualified financial advisor before investing</div>
      </div>
    </div>
  );
}
