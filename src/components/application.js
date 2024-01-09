import { useState } from 'react';
import { connect } from 'react-redux';
import {
  createItem,
  filterItems,
  getInitialItems,
  removeItem,
  updateItem,
} from '../lib/items';
import Header from './header';
import ItemList from './item-list';
import MarkAllAsUnpacked from './mark-all-as-unpacked';
import NewItem from './new-item';
import { setLocalInput } from '../lib/reducer';

const Application = ({
  newItemName,
  setNewItemName,
}) => {
  const [items, setItems] = useState(getInitialItems());

  const add = (name) => {
    const item = createItem(name);
    setItems([...items, item]);
  };

  const update = (id, updates) => {
    setItems(updateItem(items, id, updates));
  };

  const remove = (id) => {
    setItems(removeItem(items, id));
  };

  const unpackedItems = filterItems(items, { packed: false });
  const packedItems = filterItems(items, { packed: true });

  const markAllAsUnpacked = () => {
    return setItems(items.map((item) => ({ ...item, packed: false })));
  };

  return (
    <main className="flex flex-col gap-8 p-8 mx-auto lg:max-w-4xl">
      <Header items={items} />
      <NewItem
        newItemName={newItemName}
        setNewItemName={setNewItemName}
        addItem={add}
      />
      <section className="flex flex-col gap-8 md:flex-row">
        <ItemList
          title="Unpacked Items"
          items={unpackedItems}
          update={update}
          remove={remove}
        />
        <ItemList
          title="Packed Items"
          items={packedItems}
          update={update}
          remove={remove}
        />
      </section>
      <MarkAllAsUnpacked onClick={markAllAsUnpacked} />
    </main>
  );
};

const mapStateToProps = (state) => ({
  newItemName: state.localState.newItemName,
});

const mapDispatchToProps = (dispatch) => ({
  setNewItemName: (value) => dispatch(setLocalInput(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);

