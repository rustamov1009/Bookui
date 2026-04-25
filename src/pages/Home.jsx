import { useState } from "react";
import Slider from "../components/Slider";
import Search from "../components/ui/Search";
import Cards from "../components/ui/Cards";
import Ornament from "../assets/ornament.svg";
import Kategoriya from "../assets/Kategoriyalar.svg";
import Avloniy from "../assets/avloniy.svg";
import Avloniy2 from "../assets/avloniy2.svg";
import Rahmonberdi from "../assets/rahmonberdi.svg";
import Hamza from "../assets/hamza.svg";
import Abdulhamid from "../assets/abdulhamid.svg";
import Abdurauf from "../assets/abdurauf.svg";
import Abdulmajid from "../assets/abdulmajid.svg";
import Munavvarqori from "../assets/munavvarqori.svg";
import Qodiriy from "../assets/qodiriy.svg";
import Mahmudhoja from "../assets/mahmudhoja.svg";
import Hoji from "../assets/hoji.svg";

const categories = [
  "Temuriylar davri",
  "Jadid adabiyoti",
  "Sovet davri",
  "Mustaqillik davri",
];

const booksByCategory = {
  "Temuriylar davri": [],
  "Jadid adabiyoti": [],
  "Sovet davri": [],
  "Mustaqillik davri": [],
};

const writers = [
  {
    id: 1,
    img: Avloniy,
    name: "Abdulla Avloniy",
    year: "1878-1934",
    soni: 34,
    daqiqa: 13,
  },
  {
    id: 2,
    img: Avloniy2,
    name: "Nusrat Rahmat",
    year: "1878-1934",
    soni: 34,
    daqiqa: 13,
  },
  {
    id: 3,
    img: Rahmonberdi,
    name: "Rahmonberdi Madazimov",
    year: "1878-1934",
    soni: 34,
    daqiqa: 13,
  },
  {
    id: 4,
    img: Hamza,
    name: "Hamza Hakimzoda Niyoziy",
    year: "1878-1934",
    soni: 34,
    daqiqa: 13,
  },
  {
    id: 5,
    img: Abdulhamid,
    name: "Abdulhamid Cho'lpon",
    year: "1878-1934",
    soni: 34,
    daqiqa: 13,
  },
  {
    id: 6,
    img: Abdurauf,
    name: "Abdurauf Fitrat",
    year: "1878-1934",
    soni: 34,
    daqiqa: 13,
  },
  {
    id: 7,
    img: Abdulmajid,
    name: "Abdulmajid Qodiriy",
    year: "1878-1934",
    soni: 34,
    daqiqa: 13,
  },
  {
    id: 8,
    img: Munavvarqori,
    name: "Munavvarqori Abdurashidxonov",
    year: "1878-1934",
    soni: 34,
    daqiqa: 13,
  },
  {
    id: 9,
    img: Qodiriy,
    name: "Abdulla Qodiriy",
    year: "1894-1938",
    soni: 34,
    daqiqa: 13,
  },
  {
    id: 10,
    img: Mahmudhoja,
    name: "Mahmuxoja Behbudiy",
    year: "1875-1919",
    soni: 34,
    daqiqa: 13,
  },
  {
    id: 11,
    img: Hoji,
    name: "Hoji Muin",
    year: "1883-1942",
    soni: 34,
    daqiqa: 13,
  },
];

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const selectedBooks = booksByCategory[activeCategory];

  return (
    <section className="relative z-0">
      <img
        src={Ornament}
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div className="relative z-10 mb-28">
        <Slider />
        <Search />
      </div>

      <div className="relative z-10 mt-42.5">
        <img className="m-auto" src={Kategoriya} alt="Kategoriyalar" />

        <div className="mt-6.25 flex justify-center gap-15 font-normal">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`cursor-pointer text-[20px] transition-colors ${
                activeCategory === category ? "text-[#C9AC8C]" : "text-white/60"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          {selectedBooks.length === 0 ? (
            <p className="text-[20px] text-white/60">
              Bu yerda hali kitoblar yo&apos;q
            </p>
          ) : (
            <div className="flex flex-wrap justify-center gap-9.25">
              {selectedBooks.map((book) => (
                <Cards
                  key={book.id}
                  img={book.img}
                  name={book.name}
                  year={book.year}
                  soni={book.soni}
                  daqiqa={book.daqiqa}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-9.25">
          {writers.map((writer) => (
            <Cards
              key={writer.id}
              img={writer.img}
              name={writer.name}
              year={writer.year}
              soni={writer.soni}
              daqiqa={writer.daqiqa}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
