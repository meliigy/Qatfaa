import { useCallback, useEffect, useState } from 'react';
import Intro from './Intro.jsx';
import { brand, mosaic, products, timeline, methods } from './content.js';
import { initSmoothScroll } from './scroll.js';

const num = (n) => n.toLocaleString('ar-EG');

export default function App() {
  const [navOn, setNavOn] = useState(false);
  const [cart, setCart] = useState([]);
  const onHero = useCallback((v) => setNavOn(v), []);

  useEffect(() => initSmoothScroll(), []);

  const add = (id) => setCart((c) => [...c, id]);

  return (
    <>
      <header className={navOn ? 'nav is-on' : 'nav'} inert={navOn ? undefined : ''}>
        <a className="nav__logo" href="#top">{brand.name}</a>
        <nav aria-label="الأقسام">
          <a href="#shop">المتجر</a>
          <a href="#history">تاريخ القهوة</a>
          <a href="#brew">طرق التحضير</a>
        </nav>
        <a className="nav__cart" href="#shop" aria-live="polite">
          السلة <span>{num(cart.length)}</span>
        </a>
      </header>

      <div id="top" />
      <Intro onHero={onHero} />

      <main>
        <section className="about">
          <div className="about__grid">
            {mosaic.map((m, i) => (
              <img key={m.alt} className={`tile tile--${i + 1}`} src={m.src} alt={m.alt} loading="lazy" />
            ))}
            <div className="about__text">
              <h2>ما رأيته للتو هو ما نفعله</h2>
              <p>
                نشتري المحصول من مزارع نعرف أصحابها، ونتذوق كل دفعة قبل أن نعتمدها.
                نحمّص بكميات صغيرة مرة كل أسبوع، ونكتب تاريخ التحميص على كل كيس.
              </p>
              <p>لا شيء على الرف أقدم من ثلاثة أسابيع.</p>
            </div>
          </div>
        </section>

        <section className="shop" id="shop">
          <div className="section-head">
            <h2>المتجر</h2>
            <p>أربعة أصناف، وكلها من تحميص هذا الأسبوع.</p>
          </div>
          <ul className="products">
            {products.map((p) => {
              const count = cart.filter((id) => id === p.id).length;
              return (
                <li key={p.id} className="product">
                  <img src={p.img} alt="" loading="lazy" />
                  <div className="product__body">
                    <h3>{p.name}</h3>
                    <p>{p.note}</p>
                    <div className="product__row">
                      <span className="product__price">{num(p.price)} ج.م <small>/ {p.weight}</small></span>
                      <button type="button" className="btn btn--small" onClick={() => add(p.id)}>
                        {count ? `في السلة (${num(count)})` : 'أضف إلى السلة'}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="history" id="history">
          <div className="section-head">
            <h2>من ماعز كالدي إلى فنجانك</h2>
            <p>أحد عشر قرنًا في سبع محطات.</p>
          </div>
          <ol className="timeline">
            {timeline.map((t) => (
              <li key={t.when}>
                <span className="timeline__when">{t.when}</span>
                <div>
                  <h3>{t.where}</h3>
                  <p>{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="brew" id="brew">
          <div className="section-head">
            <h2>طرق التحضير</h2>
            <p>البن نفسه يعطي فنجانًا مختلفًا مع كل طريقة. الفرق في الطحن والوقت.</p>
          </div>
          <div className="brew__scroll">
            <table>
              <thead>
                <tr><th scope="col">الطريقة</th><th scope="col">الطحن</th><th scope="col">الوقت</th><th scope="col">كيف</th></tr>
              </thead>
              <tbody>
                {methods.map((m) => (
                  <tr key={m.name}>
                    <th scope="row">{m.name}</th>
                    <td>{m.grind}</td>
                    <td>{m.time}</td>
                    <td>{m.how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footer__name" aria-hidden="true">{brand.name}</p>
        <div className="footer__row">
          <p>{brand.tagline}</p>
          <nav aria-label="روابط التذييل">
            <a href="#shop">المتجر</a>
            <a href="#history">تاريخ القهوة</a>
            <a href="#brew">طرق التحضير</a>
            <a href="#top">عُد إلى أول الرحلة</a>
          </nav>
        </div>
        <p className="footer__note">مشروع عرض. العلامة والمنتجات والأسعار غير حقيقية.</p>
      </footer>
    </>
  );
}
