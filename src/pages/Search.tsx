import { BiSolidTv } from "react-icons/bi";
import { FaShoppingBag } from "react-icons/fa";
import { useState } from "react";
import SearchFunction from "../components/search/SearchFunction";
import SearchTypes from "../components/search/SearchTypes";
import SearchImages from "../components/search/SearchImages";
export const searchTypes = [
  { icon: <BiSolidTv />, title: "IGTV" },
  { icon: <FaShoppingBag />, title: "Shop" },
  { title: "Style" },
  { title: "Sports" },
  { title: "Auto" },
];
const Search = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchTerm(query);
    setSelectedType("");
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setSearchTerm("");
  };

  return (
    <div style={{ marginTop: "45px" }} className="flex flex-col gap-2">
      <SearchFunction
        query={query}
        onSearch={handleInputSearch}
        onSearchSubmit={handleSearchSubmit}
      />
      <SearchTypes onTypeSelect={handleTypeSelect} />
      <SearchImages selectedType={selectedType} query={searchTerm} />
    </div>
  );
};
export default Search;
