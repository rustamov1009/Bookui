import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ProfileHeader from "../components/profile-tab/ProfileHeader";

const Profile = () => {
  useEffect(() => {
    document.body.style.background = "#F8FAFC";

    return () => {
      document.body.style.background = "#191919";
    };
  }, []);

  return (
    <div className="min-h-screen">
      <ProfileHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Profile;
