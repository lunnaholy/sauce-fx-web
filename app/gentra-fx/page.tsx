import type { Metadata } from "next";
import Image from "next/image";
import { cars } from "./cars";
import Road, { CarBody } from "./Road";
import s from "./page.module.css";

// Пустой адрес — «скоро»: строка видна, но не кликается (как aboutLinks в плагине).
const downloadUrl = "";
const links: [name: string, url: string][] = [
  ["Telegram", ""],
  ["YouTube", ""],
  ["GitHub", ""],
];

const version = "1.0.0";
const formats = "VST3 · AU · Standalone";

export const metadata: Metadata = {
  title: "Sauce Gentra FX",
  description: "Плагин-пробка: 12 машин из Ташкента — 12 эффектов. Колёса — ручки, дорога — цепочка. VST3 и AU для macOS.",
  openGraph: { images: "/gentra-fx/shot-garage.jpg", locale: "ru_RU" },
};

const details: [title: string, text: string][] = [
  ["Трясёт под бит", "Дорога ловит доли из DAW: сильная бьёт сильнее, сила — от низа. На стопе трясёт от пиков баса."],
  ["Шашки", "Машины перестраиваются, моргают дальним медленным и уступают — у каждой своя скорость, и она зависит от силы эффекта."],
  ["Вход и выход", "±24 дБ с индикаторами пика L/R и лампой перегруза. Двойной клик — ноль."],
  ["Окно 60–200%", "Тянется за угол, сцена рисуется сразу в окно — чёткая на любом масштабе. Размер один на все проекты."],
  ["Бит в бит", "Ручка на нуле или машина в гараже — звук не трогается вообще. Это проверяет тест."],
  ["Честно с хостом", "Без аллокаций и локов в аудиопотоке, хвосты дилея и реверба отдаются хосту. pluginval strictness 10 — VST3 и AU."],
];

function Soon({ url, children, className }: { url: string; children: string; className?: string }) {
  return url ? (
    <a href={url} className={className}>
      {children}
    </a>
  ) : (
    <span className={`${className ?? ""} ${s.soon}`} aria-disabled>
      {children} — скоро
    </span>
  );
}

export default function GentraFX() {
  return (
    <main>
      <section className={s.hero}>
        <div className={s.sky} />
        <header className={s.intro}>
          <h1 className={s.badge}>
            <span className="visually-hidden">Sauce Gentra FX</span>
            <Image src="/gentra-fx/plate.png" alt="" width={380} height={72} priority />
          </h1>
          <p className={s.tagline}>«воой акя бу малибу ики турбоми??»</p>
          <p className={s.lead}>
            12 машин из Ташкента — 12 эффектов. Колёса — ручки, дорога — цепочка, гараж — порядок.
          </p>
          <div className={s.cta}>
            <Soon url={downloadUrl} className={`plate ${s.button}`}>
              Скачать
            </Soon>
            <small>
              {formats} · macOS 11+ · Apple Silicon · v{version}
            </small>
          </div>
        </header>
        <Road />
      </section>

      <section className={s.section}>
        <h2>Это не интерфейс, это пробка</h2>
        <p className={s.sub}>
          Каждая машина на дороге — эффект. Чем сильнее крутите, тем быстрее она едет и тем заметнее светится, дымит
          или приседает.
        </p>
        <figure className={s.shot}>
          <Image src="/gentra-fx/shot-garage.jpg" alt="Окно плагина: дорога с машинами и открытый гараж" width={1800} height={1120} sizes="(max-width: 1100px) 100vw, 1100px" />
        </figure>
      </section>

      <section className={s.section} id="cars">
        <h2>12 машин — 12 эффектов</h2>
        <p className={s.sub}>
          Клик по машине — она подъезжает ближе. Заднее колесо — главная ручка, переднее — Mix, остальное — на табличке.
          Ниже — в порядке цепочки по умолчанию.
        </p>
        <ol className={s.grid}>
          {cars.map((car, i) => (
            <li key={car.file} className={`plate ${s.card}`}>
              <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
              <CarBody car={car} className={s.cardCar} sizes="280px" />
              <h3 className={s.tag}>{car.effect}</h3>
              <p className={s.model}>{car.model}</p>
              <dl>
                <dt>Заднее колесо</dt>
                <dd>{car.rear}</dd>
                <dt>Табличка</dt>
                <dd>{car.extras}</dd>
                <dt>На дороге</dt>
                <dd>{car.tell}</dd>
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${s.section} ${s.split}`}>
        <div>
          <h2>Гараж = цепочка</h2>
          <ul className={s.bullets}>
            <li>Сверху вниз — порядок эффектов. Перетащили строку — поменялся звук.</li>
            <li>Тумблер — на дороге или в гараже. Загнали машину — эффект выключен, вернули — в прежнем состоянии.</li>
            <li>Новый экземпляр — чистый лист: на дороге одна чёрная Gentra на нуле.</li>
            <li>Всё, включая порядок и гараж, сохраняется в пресете.</li>
          </ul>
        </div>
        <figure className={s.shot}>
          <Image src="/gentra-fx/shot-eq.jpg" alt="Открытая Нексия: эквалайзер с графиком на экране магнитолы" width={1800} height={1120} sizes="(max-width: 900px) 100vw, 560px" />
          <figcaption>Нексия: эквалайзер, точки на экране магнитолы тянутся мышью.</figcaption>
        </figure>
      </section>

      <section className={s.section}>
        <h2>Мелочи, которые приятно знать</h2>
        <ul className={s.details}>
          {details.map(([title, text]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={s.section} id="download">
        <div className={`plate ${s.download}`}>
          <h2>Скачать</h2>
          <p>
            {formats}. macOS 11 и новее, Apple Silicon. Windows — позже.
          </p>
          <Soon url={downloadUrl} className={`plate ${s.button}`}>
            {`Sauce Gentra FX ${version}`}
          </Soon>
        </div>
      </section>

      <footer className={s.footer}>
        <p className={s.brand}>Secret Sauce</p>
        <nav className={s.links}>
          {links.map(([name, url]) => (
            <Soon key={name} url={url}>
              {name}
            </Soon>
          ))}
        </nav>
        <p>© 2026 lunnaholy</p>
        <p className={s.fine}>Шрифт PT Sans Narrow — ParaType Free Font License. Сделано на JUCE.</p>
      </footer>
    </main>
  );
}
