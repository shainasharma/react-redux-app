import React from "react";

interface Props {
  data: any[];
  columns: string[]; // Table Headers
  keys: string[]; // Keys matching data fields
}

const DataTable: React.FC<Props> = ({ data, columns, keys }) => {
  return (
    <table width="100%">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {keys.map((key, colIndex) => (
                <td key={colIndex}>{item[key]}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} style={{ textAlign: "center" }}>
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
