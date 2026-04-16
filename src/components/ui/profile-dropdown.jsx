import { useState, useRef, useEffect } from "react";
import ProfileIcon from "../../assets/profile-icon.svg";
const menuItems = [
  {
    label: "Profil",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    ),
  },
  {
    label: "Sozlamalar",
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </>
    ),
  },
  {
    label: "To'lov usullari",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    ),
  },
  {
    label: "Yordam",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
];

const SvgIcon = ({ children }) => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    {children}
  </svg>
);

export default function ProfileDropdown({
  user = {
    name: "Asilbek Karimov",
    email: "asilbek@example.com",
    avatar: ProfileIcon,
  },
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-3 cursor-pointer focus:outline-none"
      >
        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-zinc-600">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-zinc-500 flex items-center justify-center text-white text-sm font-semibold">
              {user.name.charAt(0)}
            </div>
          )}
        </div>

        <svg
          className={`w-4 h-4 text-white transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-3 w-64 rounded-2xl shadow-2xl overflow-hidden
          bg-zinc-800 border border-zinc-700 z-50
          transition-all duration-200 origin-top-right
          ${isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        {/* User info */}
        <div className="px-4 py-4 border-b border-zinc-700 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-600 shrink-0">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-zinc-500 flex items-center justify-center text-white text-sm font-semibold">
                {user.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <p className="text-white text-sm font-semibold">{user.name}</p>
            <p className="text-zinc-400 text-xs">{user.email}</p>
          </div>
        </div>

        {/* Menu items */}
        <div className="py-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors text-sm text-left"
            >
              <SvgIcon>{item.icon}</SvgIcon>
              {item.label}
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="border-t border-zinc-700 py-2">
          <button
            onClick={() => {
              setIsOpen(false);
              // logout logicni shu yerga yozing
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-zinc-700 hover:text-red-300 transition-colors text-sm"
          >
            <SvgIcon>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </SvgIcon>
            Chiqish
          </button>
        </div>
      </div>
    </div>
  );
}
