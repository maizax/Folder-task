import classes from "./App.module.css";
import React, { useState } from "react";
import Context from "./context";
import List from "./List";
import Item from "./Item";

function App() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [children, setChildren] = useState([]);
  const [isExpandedApp, setIsExpandedApp] = useState(false);
  const [activatedApp, setActivatedApp] = useState(false);

  const onClick = (item) => {
    setIsExpandedApp(!isExpandedApp);
    setActivatedApp(!activatedApp);
    setName(item.name);
    setType(item.type);
    item.type === "folder"
      ? setChildren(
          item.children
            .sort(function (a, b) {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              return 0;
            })
            .map((x) => <Item key={x.id} item={x} />)
        )
      : setChildren("");
  };

  const providerValue = {
    setChildren,
    onClick,
    isExpandedApp,
    activatedApp,
  };

  return (
    <Context.Provider value={providerValue}>
      <header>
        <h2>Assignment</h2>
      </header>

      <section>
        <nav>
          <List />
        </nav>

        {!children && (
          <div className={classes.preview}>
            <h1>Preview</h1>
            <p>Name: {name}</p>
            <p>Type: {type}</p>
          </div>
        )}

        {children && (
          <div className={classes.folderIsActive}>
            <>
              {children.map((x) =>
                x.props.item.type !== "folder" ? (
                  <ul key={x.props.item.id} className={classes.centering}>
                    <ul
                      className={classes.oneLetter}
                      onClick={() => onClick(x.props.item)}
                    >
                      {x.props.item.name.charAt(0)}
                    </ul>
                    {x.props.item.name}
                  </ul>
                ) : (
                  <ul key={x.props.item.id} className={classes.centering}>
                    <ul
                      className={classes.greyFolder}
                      onClick={() => onClick(x.props.item)}
                    ></ul>
                    {x.props.item.name}
                  </ul>
                )
              )}
            </>
          </div>
        )}
      </section>
    </Context.Provider>
  );
}

export default App;
