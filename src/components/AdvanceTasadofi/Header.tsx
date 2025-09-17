import React from "react";

const Header: React.FC = () => {
  return (
    <header className="tasadofi-header">
      <button className="tasadofi-profile">
        <img src="/gg_profile.png" alt="profile" />
      </button>
      <img src="/Group 13 (1).png" alt="logo" />
      <button className="tasadofi-menu">
        <img src="/material-symbols_menu-rounded.png" alt="menu" />
      </button>
    </header>
  );
};

export default Header; 