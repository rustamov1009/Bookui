import { Link, useLocation } from "react-router-dom";
import Icon from "./shared/icon.jsx";
import ProfileDropdown from "./ui/profile-dropdown.jsx";

const navs = [
  { id: 1, title: "Bosh sahifa", link: "/" },
  { id: 2, title: "Nasr", link: "/nasr" },
  { id: 3, title: "Nazm", link: "/nazm" },
  { id: 4, title: "Maqolalar", link: "/maqolalar" },
  { id: 5, title: "Forum", link: "/forum" },
];

const Header = () => {
  const { pathname } = useLocation();
  return (
    <header className="py-6 border-[rgb(255,255,255,0.1)] border-b-2">
      <div className="container">
        <div className="navbar flex justify-between items-center">
          <a href="">
            <Icon.logo />
          </a>
          <nav className="flex items-center w-full max-w-[50%] justify-between">
            <ul className="flex gap-x-6">
              {navs.map((nav) => {
                return (
                  <li
                    key={nav.id}
                    className={`${pathname === nav.link ? "border-white transition-all border-b-2" : ""}`}
                  >
                    <Link
                      to={nav.link}
                      className="text-white text-[16px] font-light"
                    >
                      {nav.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ProfileDropdown />
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;
