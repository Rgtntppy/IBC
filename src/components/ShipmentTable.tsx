import React, { useState } from 'react';
import { initialData, ShipmentData } from '../data/initialData';
import './ShipmentDesign.scss';

const ShipmentTable: React.FC = () => {
  const [data, setData] = useState<ShipmentData[]>(initialData);

  const handleChange = (index: number, key: 'today' | 'tomorrow', diff: number) => {
    const newData = [...data];
    newData[index][key] = Math.max(0, newData[index][key] + diff);
    setData(newData);
  };

  return (
    <table className='binTable'>
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
          <tr key={row.bin} className='binBlock'>
            <td className='binName'>{row.bin}</td>
            <td className='todayCells'>{row.today}</td>
            <td className='controlButtonCells'>
              <button className='countUpButton' onClick={() => handleChange(index, 'today', 1)}>▲</button>
            </td>
            <td className='controlButtonCells'>
              <button className='countDownButton' onClick={() => handleChange(index, 'today', -1)}>▼</button>
            </td>

            <td className='cellSpacer'></td>

            <td className='nextDayCells'>{row.tomorrow}</td>
            <td className='controlButtonCells'>
              <button className='countUpButton' onClick={() => handleChange(index, 'tomorrow', 1)}>▲</button>
            </td>
            <td className='controlButtonCells'>
              <button className='countDownButton' onClick={() => handleChange(index, 'tomorrow', -1)}>▼</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShipmentTable;
