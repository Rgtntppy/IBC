import React, { useState } from 'react';
import { initialData, ShipmentData } from '../data/initialData';

const ShipmentTable: React.FC = () => {
  const [data, setData] = useState<ShipmentData[]>(initialData);

  const handleChange = (index: number, key: 'today' | 'tomorrow', diff: number) => {
    const newData = [...data];
    newData[index][key] = Math.max(0, newData[index][key] + diff);
    setData(newData);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>便名</th>
          <th>当日分</th>
          <th></th>
          <th></th>
          <th>翌日分</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.bin}>
            <td>{row.bin}</td>
            <td>{row.today}</td>
            <td>
              <button onClick={() => handleChange(index, 'today', 1)}>▲</button>
            </td>
            <td>
              <button onClick={() => handleChange(index, 'today', -1)}>▼</button>
            </td>
            <td>{row.tomorrow}</td>
            <td>
              <button onClick={() => handleChange(index, 'tomorrow', 1)}>▲</button>
            </td>
            <td>
              <button onClick={() => handleChange(index, 'tomorrow', -1)}>▼</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShipmentTable;
