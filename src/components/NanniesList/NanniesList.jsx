import { useEffect, useState } from "react";
import s from "./NanniesList.module.css";
import NannyCard from "../NannyCard/NannyCard";
import { fetchNannies } from "../../utils/nannies";
import { IoIosArrowDown } from "react-icons/io";
import Select from "react-select";

const filterOptions = [
  { value: "alphabet-asc", label: "A to Z" },
  { value: "alphabet-desc", label: "Z to A" },
  { value: "rating-asc", label: "Not popular" },
  { value: "rating-desc", label: "Popular" },
  { value: "price-less", label: "Less than 10$" },
  { value: "price-greater", label: "Greater than 10$" },
  { value: "show-all", label: "Show all" },
];

const NanniesList = () => {
  const [nannies, setNannies] = useState([]);
  const [filteredNannies, setFilteredNannies] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0].value);
  const [visibleCount, setVisibleCount] = useState(3); // Початково показуємо 3 нянь
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    fetchNannies((data) => {
      setNannies(data);
      setFilteredNannies(data);
    }, console.error);
  }, []);

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
    setSelectedFilter(selectedOption ? selectedOption.value : null);
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
          value={
            filterOptions.find((option) => option.value === selectedFilter) ||
            null
          }
          menuIsOpen={isSelectOpen}
          onMenuOpen={() => setIsSelectOpen(true)}
          onMenuClose={() => setIsSelectOpen(false)}
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#103931",
              borderRadius: "14px",
              border: "none",
              padding: "5px",
              boxShadow: "none",
              borderColor: "transparent",
            }),
            singleValue: (base) => ({
              ...base,
              color: "#FBFBFB",
            }),
            indicatorsContainer: (base) => ({
              ...base,
              display: "none", // Прибирає стрілку
            }),
            option: (base, { isSelected }) => ({
              ...base,
              backgroundColor: "transparent",
              color: isSelected
                ? "##11101C" // Колір тексту для вибраного елемента
                : "#11101C4D", // Колір тексту для звичайного стану
              cursor: "pointer",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#FFFFFF",
              borderRadius: "14px",
              marginTop: "8px",
            }),
          }}
        />
        <IoIosArrowDown className={s.filterIcon} onClick={toggleSelectOpen} />
      </div>
      <div className={s.listContBtn}>
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
    </div>
  );
};

export default NanniesList;
