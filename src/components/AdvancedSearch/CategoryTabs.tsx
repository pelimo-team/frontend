import React, { useContext, useRef, useEffect, useState} from 'react';
import { AuthContext } from "../../pages/AuthContext";
import {  categories } from './types';

// interface CategoryTabsProps {
//   activeTab: CategoryType;
//   setActiveTab: (tab: CategoryType) => void;
// }


const CategoryTabs: React.FC = () => {
  const { activeTab, setActiveTab } = useContext(AuthContext); // ✅ Read directly from context
  const [underlineStyle, setUnderlineStyle] = useState<{ width: string; left: string }>({
    width: "0px",
    left: "0px",
  });


  
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = categories.indexOf(activeTab);
    const currentTab = tabsRef.current[activeIndex];
    if (currentTab) {
      setUnderlineStyle({
        width: currentTab.offsetWidth + "px",
        left: currentTab.offsetLeft + "px",
      });
    }
  }, [activeTab]);

  return (
    <div className="category-tabs-container-advanced-search">
      <div className="category-tabs-advanced-search">
        {categories.map((cat, i) => (
          <button
            key={cat}
            ref={(el) => {
              if (el) {
                tabsRef.current[i] = el;
              }
            }}
            onClick={() => setActiveTab(cat)}
            className={`category-tab-advanced-search ${
              activeTab === cat ? "active" : ""
            }`}
          >
            {cat}
          </button>
        ))}
        <span
          className="underline-advanced-search"
          style={underlineStyle}
        ></span>
      </div>
    </div>
  );
};

export default CategoryTabs; 