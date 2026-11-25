import type { Metadata } from "next";
import Image from "next/image";
import { cars } from "./cars";
import Road, { CarBody } from "./Road";
import s from "./page.module.css";

// Все надписи на сайте — с маленькой буквы и с иронией.

// Пустой адрес — «скоро»: строка видна, но не кликается (как aboutLinks в плагине).
const downloadUrl = "";
const links: [name: string, url: string][] = [
  ["telegram", ""],
  ["youtube", ""],
  ["github", ""],
];

const version = "1.0.0";

export const metadata: Metadata = {
  title: "sauce gentra fx",
  description: "тачки с дорог ташкента специально для твоей поеботы. VST3 и AU.",
  openGraph: { images: "/gentra-fx/shot-garage.jpg", locale: "ru_RU" },
};

const details: [title: string, text: string][] = [
  ["трясёт под бит", "дорога ловит доли из DAW: сильная бьёт сильнее. на стопе трясёт от баса — соседи снизу подтвердят."],
  ["шашки", "тачки перестраиваются, моргают дальним тем, кто тащится, и уступают. скорость каждой зависит от силы эффекта, а не от понтов."],
  ["вход и выход", "±24 дБ, индикаторы пика L/R и лампа перегруза. двойной клик — ноль. как бортовой компьютер, только работает."],
  ["окно 60–200%", "тянется за угол и остаётся чётким на любом масштабе. размер один на все проекты — запомнил и больше не спрашивает."],
  ["бит в бит", "ручка на нуле или тачка в гараже — звук не тронут вообще. это проверяет тест, а не честное слово."],
  ["честно с хостом", "без аллокаций и локов в аудиопотоке, хвосты дилея и реверба хост видит. pluginval strictness 10 пройден — техосмотр без взятки."],
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

function Platforms() {
  return (
    <p className={s.platforms}>
      <svg viewBox="0 0 24 24" role="img" aria-label="windows">
        <path d="M0 3.4 9.8 2v9.4H0zM11 1.8 24 0v11.3H11zM0 12.6h9.8V22L0 20.6zM11 12.6h13V24l-13-1.8z" />
      </svg>
      <svg viewBox="0 0 24 24" role="img" aria-label="macOS">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
      </svg>
    </p>
  );
}

export default function GentraFX() {
  return (
    <main>
      <section className={s.hero}>
        <div className={s.sky} />
        <header className={s.intro}>
          <p className={s.presents}>твой новый любимый плагин</p>
          <h1 className={s.badge}>
            <span className="visually-hidden">sauce gentra fx</span>
            <Image src="/gentra-fx/plate.png" alt="" width={380} height={72} priority />
          </h1>
          <p className={s.tagline}>«воой акя бу малибу ики турбоми??»</p>
          <p className={s.lead}>тачки с дорог ташкента специально для твоей поеботы</p>
          <div className={s.cta}>
            <Soon url={downloadUrl} className={`plate ${s.button}`}>
              скачать
            </Soon>
            <Platforms />
          </div>
        </header>
        <Road />
      </section>

      <section className={s.section}>
        <h2>шашки по чиланзару</h2>
        <p className={s.sub}>
          каждая тачка - эффект. это корыто без музыки не тронется, так что чем сильнее крутишь тем быстрее едет
        </p>
        <figure className={s.shot}>
          <Image src="/gentra-fx/shot-garage.jpg" alt="окно плагина: дорога с тачками и открытый гараж" width={1800} height={1120} sizes="(max-width: 1100px) 100vw, 1100px" />
        </figure>
      </section>

      <section className={s.section} id="cars">
        <h2>12 невероятно оригинальных эффектов</h2>
        <p className={s.sub}>
          мега очевидное расположение функциональных крутилок в форме колёс машины поможет инклюзивным реперам продолжать писать свой трап
        </p>
        <ol className={s.grid}>
          {cars.map((car, i) => (
            <li key={car.file} className={`plate ${s.card}`}>
              <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
              <CarBody car={car} className={s.cardCar} sizes="280px" />
              <h3 className={s.tag}>{car.effect}</h3>
              <p className={s.model}>{car.model}</p>
              <dl>
                <dt>заднее колесо</dt>
                <dd>{car.rear}</dd>
                <dt>табличка</dt>
                <dd>{car.extras}</dd>
                <dt>на дороге</dt>
                <dd>{car.tell}</dd>
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${s.section} ${s.split}`}>
        <div>
          <h2>гараж = цепочка (и парковка бесплатная)</h2>
          <ul className={s.bullets}>
            <li>сверху вниз — порядок эффектов. перетащил строчку — поменялся звук. продавать тачку не надо.</li>
            <li>тумблер: на дороге или в гараже. загнал — эффект спит, выгнал — проснулся как был.</li>
            <li>новый экземпляр — чистый лист: на дороге одна чёрная gentra на нуле, остальные ждут в гараже, как родня на свадьбу.</li>
            <li>порядок, гараж и всё остальное сохраняется в пресете. гаишник не придерётся.</li>
          </ul>
        </div>
        <figure className={s.shot}>
          <Image src="/gentra-fx/shot-eq.jpg" alt="открытая нексия: эквалайзер с графиком на экране магнитолы" width={1800} height={1120} sizes="(max-width: 900px) 100vw, 560px" />
          <figcaption>нексия с эквалайзером. да, в нексии есть экран магнитолы, и точки на нём тянутся мышкой.</figcaption>
        </figure>
      </section>

      <section className={s.section}>
        <h2>мелочи, за которые не стыдно</h2>
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
          <h2>скачать</h2>
          <p>VST3, AU и standalone. собирается быстрее, чем растаможивается BYD.</p>
          <Soon url={downloadUrl} className={`plate ${s.button}`}>
            {`sauce gentra fx ${version}`}
          </Soon>
          <Platforms />
        </div>
      </section>

      <footer className={s.footer}>
        <p className={s.brand}>secret sauce</p>
        <nav className={s.links}>
          {links.map(([name, url]) => (
            <Soon key={name} url={url}>
              {name}
            </Soon>
          ))}
        </nav>
        <p>© 2026 lunnaholy</p>
        <p className={s.fine}>шрифт PT sans narrow — paratype free font license. сделано на JUCE, без запчастей с авторынка.</p>
      </footer>
    </main>
  );
}
