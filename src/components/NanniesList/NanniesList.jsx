import { useEffect, useState } from "react";
import s from "./NanniesList.module.css";
import NannyCard from "../NannyCard/NannyCard";
import { fetchNannies } from "../../utils/nannies";
import Filter, { filterOptions } from "../Filter/Filter";

const NanniesList = () => {
  const [nannies, setNannies] = useState([]);
  const [filteredNannies, setFilteredNannies] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0].value);
  const [visibleCount, setVisibleCount] = useState(3);

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

  return (
    <div className={s.listCont}>
      <div className={s.filter}>
        <Filter
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className={s.listContBtn}>
        {filteredNannies.length === 0 ? (
          <p className={s.noResults}>Nothing found</p>
        ) : (
          <ul className={s.list}>
            {filteredNannies
              .slice(0, visibleCount)
              .filter((nanny) => typeof nanny === "object")
              .map((nanny) => (
                <li key={nanny.name}>
                  <NannyCard nanny={nanny} />
                </li>
              ))}
          </ul>
        )}
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
