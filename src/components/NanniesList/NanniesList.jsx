import { useEffect, useState } from "react";
import s from "./NanniesList.module.css";
import NannyCard from "../NannyCard/NannyCard";
import { fetchNannies } from "../../utils/nannies";
import { IoIosArrowDown } from "react-icons/io";
import Select from "react-select";

const NanniesList = () => {
  const [nannies, setNannies] = useState([]);
  const [filteredNannies, setFilteredNannies] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(3); // Початково показуємо 3 нянь
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  useEffect(() => {
    fetchNannies((data) => {
      setNannies(data);
      setFilteredNannies(data);
    }, console.error);
  }, []);

  // Опції для react-select
  const filterOptions = [
    { value: "alphabet-asc", label: "A → Z" },
    { value: "alphabet-desc", label: "Z → A" },
    { value: "rating-asc", label: "Rating ⬆" },
    { value: "rating-desc", label: "Rating ⬇" },
    { value: "price-less", label: "Less than 10$" },
    { value: "price-greater", label: "Greater than 10$" },
    { value: "show-all", label: "Show All" },
  ];

  const handleFilterChange = (selectedOption) => {
    let updatedNannies = [...nannies];

    if (selectedOption.value === "alphabet-asc") {
      updatedNannies.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedOption.value === "alphabet-desc") {
      updatedNannies.sort((a, b) => b.name.localeCompare(a.name));
    } else if (selectedOption.value === "rating-asc") {
      updatedNannies.sort((a, b) => a.rating - b.rating);
    } else if (selectedOption.value === "rating-desc") {
      updatedNannies.sort((a, b) => b.rating - a.rating);
    } else if (selectedOption.value === "price-less") {
      updatedNannies = updatedNannies.filter(
        (nanny) => nanny.price_per_hour < 10
      );
    } else if (selectedOption.value === "price-greater") {
      updatedNannies = updatedNannies.filter(
        (nanny) => nanny.price_per_hour >= 10
      );
    } else {
      updatedNannies = nannies;
    }

    setFilteredNannies(updatedNannies);
    setSelectedFilter(selectedOption.value);
    setVisibleCount(3);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const toggleSelectOpen = () => {
    setIsSelectOpen((prev) => !prev);
  };

  return (
    <div className={s.listCont}>
      <div className={s.filter}>
        <p>Filter</p>
        <Select
          options={filterOptions}
          onChange={handleFilterChange}
          value={filterOptions.find(
            (option) => option.value === selectedFilter
          )}
          className={s.reactSelect}
          menuIsOpen={isSelectOpen} // Прив'язка до стану відкриття
          onMenuOpen={() => setIsSelectOpen(true)} // Відкривається список
          onMenuClose={() => setIsSelectOpen(false)} // Закривається список
        />
        <IoIosArrowDown className={s.filterIcon} onClick={toggleSelectOpen} />
      </div>
      <ul className={s.list}>
        {filteredNannies.slice(0, visibleCount).map((nanny) => (
          <li key={nanny.name}>
            <NannyCard nanny={nanny} />
          </li>
        ))}
      </ul>

      {visibleCount < filteredNannies.length && (
        <button onClick={loadMore} className={s.loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default NanniesList;
