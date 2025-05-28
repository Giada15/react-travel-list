export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list</em>
      </p>
    );

  const numItems = items.length;
  let numpackedItems = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].packed === true) numpackedItems += 1;
  }
  const percentage = Math.round((numpackedItems / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : `You have ${numItems} items on your list and you already packed ${numpackedItems} (${percentage}%)`}
      </em>
    </footer>
  );
}
