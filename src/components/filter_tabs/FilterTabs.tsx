import type { FC } from "react";
import { useState } from "react";
import clsx from "clsx";
import type { FilterTabProps } from "./FilterTabs.types";
import { FILTER_TABS, filterTabVariants } from "./FilterTabs.variants";

const FilterTabs: FC<FilterTabProps> = ({ tabs = FILTER_TABS, onChange, variant = "gray" }) => {
  const [active, setActive] = useState(tabs[0]?.value ?? "");

  const handleClick = (value: string) => {
    setActive(value);
    onChange?.(value);
  };

  return (
    <div className="flex overflow-x-auto whitespace-nowrap gap-2 p-5">
      {tabs.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => handleClick(value)}
          className={clsx(
            filterTabVariants[variant].base,
            "cursor-pointer",
            active === value
              ? filterTabVariants[variant].active
              : filterTabVariants[variant].inactive
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
