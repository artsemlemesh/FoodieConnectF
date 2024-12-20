import React from 'react';

const TableComponent = ({ data, columns, onEdit, onDelete }) => {
  console.log('DATA', data)
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };
  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.field} className="py-2 px-4 border-b">
              {col.header}
            </th>
          ))}
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="hover:bg-gray-100">
            {columns.map((col) => (
              <td key={col.field} className="py-2 px-4 border-b text-center">
                {/* Directly accessing row[col.field] */}
                {col.field === 'date_joined' || col.field === 'created_at' 
                  ? formatDate(row[col.field]) // Format date_joined
                  :col.field.includes('.') 
                  ? col.field.split('.').reduce((acc, part) => acc?.[part], row) // for nested fields like user.username
                  : row[col.field] // for flat fields
                }
              </td>
            ))}
            <td className="py-2 px-4 border-b text-center">
              <button
                onClick={() => onDelete(row.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;