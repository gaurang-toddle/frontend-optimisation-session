import { createAction } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { createItem, removeItem, updateItem } from './items';

export const add = createAction('items/add', (name: string) => ({
  payload: { name },
}));

export const update = createAction(
  'items/update',
  (id: string, properties: Partial<Item>) => {
    return { payload: { id, ...properties } };
  },
);

export const remove = createAction('items/remove', (id: string) => ({
  payload: { id },
}));

export const markAllAsUnpacked = createAction('items/mark-all-as-unpacked');

export type Action =
  | ReturnType<typeof add>
  | ReturnType<typeof update>
  | ReturnType<typeof remove>
  | ReturnType<typeof markAllAsUnpacked>;

export const reducer = (items: Item[] = [], action: Action) => {
  if (action.type === add.type) {
    const item = createItem(action.payload.name);
    return [...items, item];
  }

  if (action.type === update.type) {
    const { id, ...properties } = action.payload;
    return updateItem(items, id, properties);
  }

  if (action.type === remove.type) {
    return removeItem(items, action.payload.id);
  }

  if (action.type === markAllAsUnpacked.type) {
    return items.map((item) => ({ ...item, packed: false }));
  }

  return items;
};

export const setLocalInput = createAction('localState/setInput', (newItemName: string) => ({
  payload: { newItemName },
}));

export type LocalStateAction = ReturnType<typeof setLocalInput>;

export const localStateReducer = (localState: { newItemName: string } = { newItemName: '' }, action: LocalStateAction) => {
  if (action.type === setLocalInput.type) {
    return { newItemName: action.payload.newItemName };
  }

  return localState;
};

export const rootReducer = combineReducers({
  items: reducer,
  localState: localStateReducer,
});

// The root state type including both items and localState
export type RootState = ReturnType<typeof rootReducer>;
