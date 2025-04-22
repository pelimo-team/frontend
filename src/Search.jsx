import React, { useState, useEffect } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";

export default function AdvancedSearch() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([""
  ]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(storedHistory);
  }, []);  

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      e.preventDefault();
  
      const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  
      // اضافه کردن به تاریخچه فقط اگر تکراری نباشه
      const updatedHistory = storedHistory.includes(searchTerm)
        ? storedHistory
        : [searchTerm, ...storedHistory];
  
      // ذخیره مستقیم در localStorage
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      setSearchHistory(updatedHistory);
  
      setSearchTerm("");
      navigate("/advanced-search");
    }
  };  

  const removeFromHistory = (item) => {
    const updatedHistory = searchHistory.filter((term) => term !== item);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };
  

  return (
    <div className="container-search">
      {/* <div className="search-box-search">
        <img src="magnifying-glass-solid.svg" alt="search"
             style={{width: "20px", marginLeft: "10px"}} 
             className="magnifying-icon"/>
        <input
        type="text"
        placeholder="Search ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
        className="input-field-search"
        />
      </div> */}
      
      <div className="history-title-search">
        <span style={{ marginRight: 5 }}>
            <img src="public/clock-regular.svg" alt="clock" style={{width: "16px"}}></img>
        </span>
        <span>your search history</span>
      </div>

      <div className="history-list-search">
        {searchHistory.map((item, index) => (
          <div key={index} className="history-item-search">
            <button onClick={() => removeFromHistory(item)} className="close-btn-search">×</button>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
