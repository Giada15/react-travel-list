import { useState } from "react";

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

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleaAddItem} />
      <PackingList
        items={items}
        onRemoveItem={handleRemoveItem}
        onUpdatePacked={handleUpdatePacked}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away🌴</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <div className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <form>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button>Add</button>
      </form>
    </div>
  );
}

function PackingList({ items, onRemoveItem, onUpdatePacked }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onRemoveItem={onRemoveItem}
            onUpdatePacked={onUpdatePacked}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onRemoveItem, onUpdatePacked }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onUpdatePacked(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onRemoveItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list and you already packed X (X%)</em>
    </footer>
  );
}
