import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brand, chapters, FRAME_COUNT, HERO_FROM } from './content.js';
import { reducedMotion, scrollToY } from './scroll.js';

const frameSrc = (i) =>
  `${import.meta.env.BASE_URL}frames/frame_${String(i).padStart(4, '0')}.webp`;

const stops = chapters.filter((c) => c.stop);

// ترتيب التحميل: الإطار الأول، ثم إطار كل ١٦، ثم ٨، ٤، ٢، ثم الباقي.
// بهذا يظهر الفيلم كاملًا بسرعة بدقة زمنية قليلة ثم يكتمل.
function loadOrder(step) {
  const seen = new Set();
  const order = [];
  const push = (i) => {
    if (i >= 1 && i <= FRAME_COUNT && !seen.has(i)) { seen.add(i); order.push(i); }
  };
  push(1);
  push(FRAME_COUNT);
  for (const s of [16, 8, 4, 2, 1]) {
    if (s < step) break;
    for (let i = 1; i <= FRAME_COUNT; i += s) push(i);
  }
  return order;
}

export default function Intro({ onHero }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const fillRef = useRef(null);
  const heroRef = useRef(null);
  const [active, setActive] = useState(0);
  const [reached, setReached] = useState(0); // عدد المحطات التي وصلها الفيلم
  const [done, setDone] = useState(false);
  const [firstReady, setFirstReady] = useState(false);
  const [isStatic] = useState(reducedMotion);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const images = new Array(FRAME_COUNT + 1);
    const loaded = new Uint8Array(FRAME_COUNT + 1);
    const state = { frame: isStatic ? FRAME_COUNT : 1 };
    let drawn = -1;
    let alive = true;
    let lastActive = -1;
    let lastHero = null;
    let lastReached = -1;

    // على الشاشات الصغيرة أو الأجهزة قليلة الذاكرة نحمّل نصف الإطارات.
    const light = window.innerWidth < 768 || (navigator.deviceMemory || 8) <= 4;
    const step = light ? 2 : 1;

    const nearest = (i) => {
      for (let d = 0; d < FRAME_COUNT; d++) {
        if (i - d >= 1 && loaded[i - d]) return i - d;
        if (i + d <= FRAME_COUNT && loaded[i + d]) return i + d;
      }
      return 0;
    };

    const draw = (force) => {
      const want = Math.min(FRAME_COUNT, Math.max(1, Math.round(state.frame)));
      const idx = nearest(want);
      if (!idx || (idx === drawn && !force)) return;
      const img = images[idx];
      const cw = canvas.width, ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale, h = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      drawn = idx;
    };

    const sync = () => {
      const f = state.frame;
      draw(false);
      if (fillRef.current) {
        const p = Math.min(1, Math.max(0, (f - stops[0].from) / (HERO_FROM - stops[0].from)));
        fillRef.current.style.transform = `scaleY(${p})`;
      }
      let a = -1;
      for (let i = 0; i < chapters.length; i++) {
        if (f >= chapters[i].from && f <= chapters[i].to) a = i;
      }
      if (a !== lastActive) { lastActive = a; setActive(a); }
      let r = 0;
      for (const st of stops) if (f >= st.from) r++;
      if (r !== lastReached) { lastReached = r; setReached(r); }
      const heroP = Math.min(1, Math.max(0, (f - HERO_FROM) / 24));
      if (heroRef.current) {
        heroRef.current.style.opacity = heroP;
        heroRef.current.style.pointerEvents = heroP > 0.6 ? 'auto' : 'none';
        heroRef.current.style.transform = `translateY(${(1 - heroP) * 16}px)`;
      }
      const hero = heroP > 0.3;
      if (hero !== lastHero) { lastHero = hero; setDone(hero); onHero?.(hero); }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      draw(true);
    };

    // تحميل الإطارات بثمانية طلبات متوازية
    const queue = isStatic ? [FRAME_COUNT] : loadOrder(step);
    let cursor = 0;
    const next = () => {
      if (!alive || cursor >= queue.length) return;
      const i = queue[cursor++];
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        if (!alive) return;
        images[i] = img;
        loaded[i] = 1;
        if (i === queue[0]) setFirstReady(true);
        if (Math.abs(i - state.frame) < 16) draw(true);
        next();
      };
      img.onerror = next; // إطار ناقص: يُعرض أقرب إطار محمَّل بدلًا منه
      img.src = frameSrc(i);
    };
    for (let k = 0; k < 8; k++) next();

    resize();
    window.addEventListener('resize', resize);

    let tween;
    if (isStatic) {
      sync();
    } else {
      tween = gsap.to(state, {
        frame: FRAME_COUNT,
        ease: 'none',
        onUpdate: sync,
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });
      sync();
    }

    return () => {
      alive = false;
      window.removeEventListener('resize', resize);
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [isStatic, onHero]);

  const skip = () => {
    const el = wrapRef.current;
    scrollToY(el.offsetTop + el.offsetHeight - window.innerHeight);
  };


  return (
    <section
      ref={wrapRef}
      className={`intro${isStatic ? ' intro--static' : ''}${done ? ' is-done' : ''}`}
      aria-label="رحلة البن من الشجرة إلى الكيس"
    >
      <div className="intro__stage">
        <canvas
          ref={canvasRef}
          className="intro__canvas"
          role="img"
          aria-label="فيلم مرسوم يتقدم مع التمرير: شجرة البن، القطف، الغسيل، التجفيف، التقشير، التذوق، التحميص، ثم كيس البن."
        />
        {!firstReady && <p className="intro__loading">جارٍ تحميل الفيلم…</p>}

        {!isStatic && (
          <>
            <ol className="route" aria-hidden="true">
              <span className="route__fill" ref={fillRef} />
              {stops.map((s, i) => (
                <li
                  key={s.title}
                  className={
                    i === reached - 1 && !done ? 'route__stop is-active'
                    : i < reached ? 'route__stop is-done'
                    : 'route__stop'
                  }
                >
                  <span className="route__dot" />
                  <span className="route__name">{s.title}</span>
                </li>
              ))}
            </ol>

            <div className="captions">
              {chapters.map((c, i) => (
                <div key={c.title} className={i === active ? 'caption is-active' : 'caption'} aria-hidden={i !== active}>
                  {c.stop && (
                    <span className="caption__count">
                      {(stops.indexOf(c) + 1).toLocaleString('ar-EG')} من {stops.length.toLocaleString('ar-EG')}
                    </span>
                  )}
                  <h2 className="caption__title">{c.title}</h2>
                  <p className="caption__text">{c.text}</p>
                </div>
              ))}
            </div>

            <button type="button" className="skip" onClick={skip}>تخطَّ المقدمة</button>
          </>
        )}

        <div className="hero" ref={heroRef}>
          <div className="hero__brand">
            <h1 className="hero__name">{brand.name}</h1>
            <p className="hero__tag">{brand.tagline}</p>
          </div>
          <div className="hero__side">
            <p>{brand.intro}</p>
            <a className="btn" href="#shop">تسوّق البن</a>
          </div>
        </div>
      </div>
    </section>
  );
}
