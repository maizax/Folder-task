import React, { useState, useContext } from "react";
import classes from "./App.module.css";
import Context from "./context";

export default function Item({ item }) {
  const [isExpandedItem, setIsExpandedItem] = useState(false);
  const [activatedItem, setActivatedItem] = useState(false);

  const { onClick, isExpandedApp, activatedApp } = useContext(Context);

  const setValues = () => {
    setIsExpandedItem(isExpandedApp);
    setActivatedItem(activatedApp);
  };

  const onItemClick = () => {
    onClick(item);
    setValues();
  };

  return (
    <ul>
      <li
        tabIndex="0"
        className={activatedItem ? classes.active : classes.notActive}
        onClick={onItemClick}
      >
        {item.type === "folder" && (
          <i
            className={isExpandedItem ? classes.arrowDown : classes.arrowRight}
          />
        )}
        {item.name}
        {item}
      </li>

      {isExpandedItem && item.children && (
        <ul>
          {item.children
            .sort(function (a, b) {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              return 0;
            })
            .map((x) => (
              <Item key={x.id} item={x} />
            ))}
        </ul>
      )}
    </ul>
  );
}
