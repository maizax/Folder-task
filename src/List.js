import React, { useEffect, useState } from "react";
import Item from "./Item";

export default function List() {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson.response);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <ul>
      {data
        .sort(function (a, b) {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          return 0;
        })
        .map((x) => {
          return <Item key={x.id} item={x} />;
        })}
    </ul>
  );
}
