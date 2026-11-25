import Image from "next/image";
import type { CSSProperties } from "react";
import { cars, type Car } from "./cars";
import s from "./road.module.css";

const asset = (f: string) => `/gentra-fx/${f}`;

// Кузов с колёсами; размеры колёс — в долях длины кузова (cqw самой машины).
export function CarBody({ car, className, sizes }: { car: Car; className?: string; sizes: string }) {
  const [rearX, frontX, wheelY, wheelR] = car.wheels;
  return (
    <div className={`${s.car} ${className ?? ""}`} style={{ aspectRatio: 1 / car.ratio }}>
      <Image src={asset(car.file)} alt="" fill sizes={sizes} />
      {[rearX, frontX].map((x) => (
        <Image
          key={x}
          src={asset("wheel.png")}
          alt=""
          width={128}
          height={128}
          className={s.wheel}
          style={{ left: `${(x - wheelR) * 100}cqw`, bottom: `${(wheelY - wheelR) * 100}cqw`, width: `${wheelR * 200}cqw` }}
        />
      ))}
    </div>
  );
}

// Полосы и поток как в RoadView.cpp: laneY = 200 + 60·(0.8 + полоса), масштаб 0.8 + 0.06·полоса, длина 150.
// Секунды на проезд экрана: правая полоса самая медленная.
const laneSeconds = [30, 24, 19, 40];

export default function Road() {
  return (
    <div className={s.scene} aria-hidden>
      <div className={`${s.strip} ${s.mountains}`} />
      <div className={`${s.strip} ${s.skyline}`} />
      <div className={`${s.strip} ${s.road}`} />
      <div className={`${s.strip} ${s.props}`} />
      <div className={`${s.strip} ${s.lamps}`}>
        {/* ponytail: 12 фонарей хватает на ~3300 единиц ширины (экран 21:9), шире — добавить */}
        {Array.from({ length: 12 }, (_, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={asset("lamp.png")} alt="" />
        ))}
      </div>
      {laneSeconds.map((sec, lane) =>
        [0, 1, 2].map((i) => {
          const car = cars[lane * 3 + i];
          const style = {
            "--lane-y": 200 + 60 * (0.8 + lane),
            "--len": 150 * (0.8 + 0.06 * lane),
            animationDuration: `${sec}s`,
            animationDelay: `${-sec * (i / 3 + lane * 0.13)}s`,
          } as CSSProperties;
          return (
            <div key={car.file} className={s.lane} style={style}>
              <CarBody car={car} sizes="240px" />
            </div>
          );
        }),
      )}
    </div>
  );
}
