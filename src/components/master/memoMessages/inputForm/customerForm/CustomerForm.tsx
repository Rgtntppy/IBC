import React from 'react';
import { CustomerFormProps } from './customerFormInterface';

export const CustomerForm: React.FC<CustomerFormProps> = ({
    title,
    required,
    date,bin,destination,item,size,slipNo,
    onDate,onBin,onDestination,onItem,onSize,onSlip
}) => {
    const handleDate = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const v = e.target.value.replace(/\D/g,'').slice(0,4);

        if(v.length>=2){
        const m = +v.slice(0,2);
        if(m<1||m>12) return;
        }
        if(v.length===4){
        const d = +v.slice(2,4);
        if(d<1||d>31) return;
        }
        onDate(v);
    };

    return(
        <div className="customerBlock">
          <h4>{title}{required && " *"}</h4>
    
          <label>
            <span>
                日付
            </span>
            <input
                value={date}
                onChange={handleDate}
                placeholder='MMDD'
                maxLength={4}
            />
          </label>
    
          <label>
            <span>
                便
            </span>
            <input 
                value={bin}
                onChange={e=>onBin(e.target.value)}
                placeholder='AM99'
                maxLength={10}
            />
          </label>
    
          <label>
            <span>
                行先
            </span>
            <input
                value={destination}
                onChange={e=>onDestination(e.target.value)}
                placeholder='○○産業××(営)'
                maxLength={50}    
            />
          </label>
    
          <label>
            <span>
                物・数量
            </span>
            <input
                value={item}
                onChange={e=>onItem(e.target.value)}
                placeholder='CV3.5x3c300m'
                maxLength={300}
            />
          </label>

        <label>
            <span>
                サイズ
            </span>
            <input
                value={size}
                onChange={e=>onSize(e.target.value)}
                placeholder='3-5'
                maxLength={10}
            />
        </label>

        <label>
            <span>
                伝票番号
            </span>
            <input
                value={slipNo}
                onChange={e=>onSlip(e.target.value)}
                placeholder='000-00000'
                maxLength={50}
            />
        </label>

        </div>
    );
};