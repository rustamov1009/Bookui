import { NavLink } from "react-router-dom";

const tabs = [
  {
    step: "1",
    title: "My account",
    description: "",
    to: "/profile/account",
  },
  {
    step: "2",
    title: "Security",
    description: "",
    to: "/profile/security",
  },
  {
    step: "3",
    title: "Make Payment",
    description: "Add Payment Options",
    to: "/profile/settings",
  },
];

const ProfileHeader = () => {
  return (
    <div className="border-b border-[#E5E7EB] bg-[#F7F7F7]">
      <div className="mx-auto flex max-w-[1160px] flex-col md:flex-row">
        {tabs.map((tab) => (
          <NavLink
            key={tab.title}
            to={tab.to}
            className={({ isActive }) =>
              `flex min-h-[72px] flex-1 items-center gap-4 border-r border-[#E5E7EB] px-6 py-4 transition-colors last:border-r-0 ${
                isActive ? "bg-white" : "bg-[#F7F7F7]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-[6px] text-sm font-semibold ${
                    isActive
                      ? "bg-[#1F2A44] text-white"
                      : "bg-[#EEF2F7] text-[#3B82F6]"
                  }`}
                >
                  {tab.step}
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-[#1F2937]">
                    {tab.title}
                  </p>
                  {tab.description ? (
                    <p className="text-sm text-[#6B7280]">{tab.description}</p>
                  ) : null}
                </div>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ProfileHeader;
