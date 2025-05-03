import React, { useState, useEffect, FormEvent } from "react";

interface City {
  id: number;
  name: string;
  province: string;
}

type SearchMode = "normal" | "advanced";

function CitySearch() {
  // برای انتخاب حالت جست‌وجو (Normal یا Advanced)
  const [searchMode, setSearchMode] = useState<SearchMode>("normal");

  // فیلدهای جست‌وجو
  const [q, setQ] = useState<string>(""); // برای جست‌وجوی ساده
  const [name, setName] = useState<string>(""); // برای جست‌وجوی پیشرفته
  const [province, setProvince] = useState<string>("");
  const [ordering, setOrdering] = useState<string>(""); // مثلاً "name", "-name", "province", ...

  // نتایج
  const [results, setResults] = useState<City[]>([]);

  // هندلر جابجایی حالت جست‌وجو
  const handleModeChange = (mode: SearchMode): void => {
    setSearchMode(mode);
    // ریست فیلدها
    setQ("");
    setName("");
    setProvince("");
    setOrdering("");
    setResults([]);
  };

  // جست‌وجوی ساده
  const doNormalSearch = async (): Promise<void> => {
    try {
      const resp = await fetch(
        `http://127.0.0.1:8000/api/pages/cities/search/?q=${encodeURIComponent(
          q
        )}`
      );
      const data = await resp.json();
      setResults(data); // data آرایهٔ شهرهاست
    } catch (err) {
      console.error("Normal search error:", err);
    }
  };

  // جست‌وجوی پیشرفته
  const doAdvancedSearch = async (): Promise<void> => {
    // ساختن QueryString
    let qs = [];
    if (name) qs.push(`name=${encodeURIComponent(name)}`);
    if (province) qs.push(`province=${encodeURIComponent(province)}`);
    if (ordering) qs.push(`ordering=${encodeURIComponent(ordering)}`);
    const queryString = qs.length > 0 ? "?" + qs.join("&") : "";

    try {
      const resp = await fetch(
        `http://127.0.0.1:8000/api/pages/cities/advanced_search/${queryString}`
      );
      const data = await resp.json();
      // اگر از صفحه‌بندی DRF استفاده می‌کنید، data ممکن است شامل {count, next, previous, results} باشد
      // در اینجا فرض می‌کنیم فقط results را می‌خواهیم:
      if (data.results) {
        setResults(data.results);
      } else {
        // اگر بدون صفحه‌بندی برگردد، خودش آرایه است
        setResults(data);
      }
    } catch (err) {
      console.error("Advanced search error:", err);
    }
  };

  // تابع ارسال فرم
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchMode === "normal") {
      doNormalSearch();
    } else {
      doAdvancedSearch();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>City Search</h2>
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() => handleModeChange("normal")}
          disabled={searchMode === "normal"}
        >
          Normal search
        </button>
        <button
          onClick={() => handleModeChange("advanced")}
          disabled={searchMode === "advanced"}
        >
          Advanced search
        </button>
      </div>

      {searchMode === "normal" && (
        <form onSubmit={handleSubmit}>
          <label>Search (name): </label>
          <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      )}

      {searchMode === "advanced" && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Province: </label>
            <input
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            />
          </div>
          <div>
            <label>Ordering: </label>
            <select
              value={ordering}
              onChange={(e) => setOrdering(e.target.value)}
            >
              <option value="">(default: name ascending)</option>
              <option value="name">name ASC</option>
              <option value="-name">name DESC</option>
              <option value="province">province ASC</option>
              <option value="-province">province DESC</option>
            </select>
          </div>
          <button type="submit">Search Advanced</button>
        </form>
      )}

      <hr />
      <h3>Results:</h3>
      <ul>
        {results.map((city) => (
          <li key={city.id}>
            {city.name} ({city.province})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CitySearch;
