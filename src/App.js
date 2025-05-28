import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleaAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleRemoveItem(itemId) {
    setItems((items) => items.filter((i) => i.id !== itemId));
    console.log(items);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleaAddItem} />
      <PackingList items={items} onRemoveItem={handleRemoveItem} />
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

function PackingList({ items, onRemoveItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onRemoveItem={onRemoveItem} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onRemoveItem }) {
  return (
    <li>
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
