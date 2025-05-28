import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);

  function handleaAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleRemoveItem(id) {
    setItems((items) => items.filter((i) => i.id !== id));
    // console.log(items);
  }

  function handleUpdatePacked(id) {
    setItems((items) =>
      items.map((i) => {
        return i.id === id ? { ...i, packed: !i.packed } : i;
      })
    );
  }

  function handleClearItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleaAddItem} />
      <PackingList
        items={items}
        onRemoveItem={handleRemoveItem}
        onUpdatePacked={handleUpdatePacked}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}
