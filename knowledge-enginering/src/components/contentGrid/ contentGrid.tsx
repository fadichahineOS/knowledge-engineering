import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

interface GridItem {
  id: string;
  content: string;
  colSpan: number;
}

interface GridRow {
  id: string;
  items: GridItem[];
}

const ContentGrid: React.FC = () => {
  const [rows, setRows] = useState<GridRow[]>([]);

  const addRow = () => {
    const newRow: GridRow = {
      id: `row-${Date.now()}`,
      items: [{
        id: `item-${Date.now()}`,
        content: 'New Full-Width Item',
        colSpan: 12
      }],
    };
    setRows([...rows, newRow]);
  };

  const addItemToRow = (rowId: string) => {
    setRows(rows.map(row => {
      if (row.id === rowId) {
        const availableSpace = 12 - row.items.reduce((acc, item) => acc + item.colSpan, 0);
        const newColSpan = Math.min(availableSpace, 6);
        if (newColSpan > 0) {
          const newItem: GridItem = {
            id: `item-${Date.now()}`,
            content: 'New Item',
            colSpan: newColSpan,
          };
          return { ...row, items: [...row.items, newItem] };
        }
      }
      return row;
    }));
  };

  const updateItemColSpan = (rowId: string, itemId: string, newColSpan: number) => {
    setRows(rows.map(row => {
      if (row.id === rowId) {
        const totalSpan = row.items.reduce((acc, item) => 
          item.id === itemId ? acc + newColSpan : acc + item.colSpan, 0
        );
        if (totalSpan <= 12) {
          const updatedItems = row.items.map(item => 
            item.id === itemId ? { ...item, colSpan: newColSpan } : item
          );
          return { ...row, items: updatedItems };
        }
      }
      return row;
    }));
  };

  const deleteItem = (rowId: string, itemId: string) => {
    setRows(rows.map(row => {
      if (row.id === rowId) {
        return { ...row, items: row.items.filter(item => item.id !== itemId) };
      }
      return row;
    }));
  };

  return (
    <div className="w-[90vw] mx-auto bg-gray-100 p-4">
      {rows.map(row => (
        <div key={row.id} className="mb-4">
          <div className="grid grid-cols-12 gap-4">
            {row.items.map(item => (
              <div 
                key={item.id} 
                className={`bg-white p-4 shadow rounded col-span-${item.colSpan} flex flex-col`}
              >
                <div className="flex justify-between items-center mb-2">
                  <select 
                    value={item.colSpan} 
                    onChange={(e) => updateItemColSpan(row.id, item.id, Number(e.target.value))}
                    className="border rounded"
                  >
                    {[1, 2, 3, 4, 6, 12].map(span => (
                      <option key={span} value={span}>{span} column{span > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                  <button 
                    onClick={() => deleteItem(row.id, item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="flex-grow">
                  {item.content}
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => addItemToRow(row.id)}
            className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
          >
            Add Column to Row
          </button>
        </div>
      ))}
      <button 
        onClick={addRow}
        className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center justify-center w-full"
      >
        <PlusCircle size={20} className="mr-2" />
        Add New Row
      </button>
    </div>
  );
};

export default ContentGrid;