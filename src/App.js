import "./styles.css";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";

export default function App() {
  const [fetchData, setFetchData] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchItem().then((data) => {
      setFetchData(data);
      setCategory(getAllCategories(data));
      setIsLoading(false);
    });
  }, []);

  function filter(newCategory) {
    console.log(newCategory);
    if (activeFilter.includes(newCategory)) {
      setActiveFilter((prevFilters) =>
        prevFilters.filter((item) => item !== newCategory)
      );
    } else {
      setActiveFilter((prevFilters) => [...prevFilters, newCategory]);
    }
  }

  const displayData = activeFilter.length
    ? fetchData.filter((item) => activeFilter.includes(item.category))
    : fetchData;

  return (
    <div className="App">
      {!isLoading && (
        <>
          <div className="categories">
            {category.map((category) => (
              <Filter
                isActive={activeFilter.includes(category)}
                key={category}
                category={category}
                handleClick={() => filter(category)}
              >
                {category}
              </Filter>
            ))}
          </div>

          <div className="items">
            {displayData.map((item) => (
              <div key={item.id} className="item">
                <>{item.title}</>
                <img src={item.image} alt={item.title} width="100px" />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function getAllCategories(array) {
  if (array) {
    let categories = array.reduce(
      (set, item) => set.add(item.category),
      new Set()
    );
    return Array.from(categories);
  }
}

async function fetchItem() {
  try {
    const response = await fetch("https://fakestoreapi.com/products/");
    const items = await response.json();
    console.log(items);
    return items;
  } catch (e) {
    console.log(e);
  }
}
