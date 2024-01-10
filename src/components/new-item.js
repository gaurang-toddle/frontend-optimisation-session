import { useState } from "react";

const NewItem = ({ children, addItem }) => {
  const [newItemName, setNewItemName] = useState('');
  return (
    <>
      <form
        id="new-item"
        onSubmit={(e) => {
          e.preventDefault();
          addItem(newItemName);
          setNewItemName('');
        }}
      >
        <label htmlFor="new-item-name" className="font-semibold">
          New Item Name
        </label>
        <div className="flex my-2">
          <input
            id="new-item-name"
            className="w-full"
            type="search"
            placeholder="New Item"
            value={newItemName}
            autoFocus
            onChange={event => setNewItemName(event.target.value)}
          />
          <button
            id="new-item-submit"
            className="border-l-0 whitespace-nowrap bg-primary-300"
            aria-label={`Add ${newItemName}`}
            type="submit"
          >
            ➕ Add New Item
          </button>
        </div>
      </form>
      {children}
      <div className="px-4 py-2 font-bold text-center bg-blue-400 border border-red-700 animate-pulse">
        ✚ You can add item from above ✚
      </div>
    </>
  );
};

export default NewItem;
