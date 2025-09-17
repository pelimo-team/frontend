import { useState, FormEvent } from "react";
import { City, SearchMode } from "../components/CitySearch/types";
import SearchModeSelector from "../components/CitySearch/SearchModeSelector";
import NormalSearchForm from "../components/CitySearch/NormalSearchForm";
import AdvancedSearchForm from "../components/CitySearch/AdvancedSearchForm";
import SearchResults from "../components/CitySearch/SearchResults";

function CitySearch() {
  const [searchMode, setSearchMode] = useState<SearchMode>("normal");
  const [q, setQ] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [ordering, setOrdering] = useState<string>("");
  const [results, setResults] = useState<City[]>([]);

  const handleModeChange = (mode: SearchMode): void => {
    setSearchMode(mode);
    setQ("");
    setName("");
    setProvince("");
    setOrdering("");
    setResults([]);
  };

  const doNormalSearch = async (): Promise<void> => {
    try {
      const resp = await fetch(
        `http://127.0.0.1:8000/api/pages/cities/search/?q=${encodeURIComponent(q)}`
      );
      const data = await resp.json();
      setResults(data);
    } catch (err) {
      console.error("Normal search error:", err);
    }
  };

  const doAdvancedSearch = async (): Promise<void> => {
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
      if (data.results) {
        setResults(data.results);
      } else {
        setResults(data);
      }
    } catch (err) {
      console.error("Advanced search error:", err);
    }
  };

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
      
      <SearchModeSelector
        currentMode={searchMode}
        onModeChange={handleModeChange}
      />

      {searchMode === "normal" && (
        <NormalSearchForm
          q={q}
          onQChange={setQ}
          onSubmit={handleSubmit}
        />
      )}

      {searchMode === "advanced" && (
        <AdvancedSearchForm
          name={name}
          province={province}
          ordering={ordering}
          onNameChange={setName}
          onProvinceChange={setProvince}
          onOrderingChange={setOrdering}
          onSubmit={handleSubmit}
        />
      )}

      <SearchResults results={results} />
    </div>
  );
}

export default CitySearch;
