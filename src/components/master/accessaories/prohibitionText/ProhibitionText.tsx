import './prohibition.scss';

export const ProhititionText = () =>{
    return (
        <div>
            <p
                className='prohibitionText'
            >
                引当情報確認からの
            <br/>
                切断の指定外は
            <span
                className='prohibition'
            >
                禁止
            </span>
            </p>
        </div>
    )
}