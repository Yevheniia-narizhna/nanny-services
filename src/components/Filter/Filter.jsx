import { useState } from "react";
import Select from "react-select";
import s from "./Filter.module.css";
import { IoIosArrowDown } from "react-icons/io";

export const filterOptions = [
  { value: "alphabet-asc", label: "A to Z" },
  { value: "alphabet-desc", label: "Z to A" },
  { value: "rating-asc", label: "Not popular" },
  { value: "rating-desc", label: "Popular" },
  { value: "price-less", label: "Less than 10$" },
  { value: "price-greater", label: "Greater than 10$" },
  { value: "show-all", label: "Show all" },
];

const Filter = ({ selectedFilter, onFilterChange }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleFilterChange = (selectedOption) => {
    onFilterChange(selectedOption);
  };

  const toggleSelectOpen = () => {
    setIsSelectOpen((prev) => !prev);
  };

  return (
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
            display: "none",
          }),
          option: (base, { isSelected }) => ({
            ...base,
            backgroundColor: "transparent",
            color: isSelected ? "##11101C" : "#11101C4D",
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
  );
};

export default Filter;
