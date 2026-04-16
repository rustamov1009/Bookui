import { useEffect, useState } from "react";
import img1 from "../assets/slider-icon.svg";
import img2 from "../assets/slider-icon2.svg";
import img3 from "../assets/slider-icon3.svg";

const Slider = () => {
  const images = [img1, img2, img3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-80 w-full max-w-317.5 overflow-hidden rounded-[28px]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      ></div>

      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 flex h-full items-center px-17.5">
        <div className="max-w-95">
          <h1 className="text-[58px] leading-[0.9] font-light text-[#d7b08a]">
            TEMURIYLAR
            <br />
            DAVRI
            <br />
            ADABIYOTI
          </h1>

          <div className="mt-5 flex gap-3">
            {images.map((_, index) => (
              <span
                key={index}
                className={`h-0.75 w-11 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-white" : "bg-white/30"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
