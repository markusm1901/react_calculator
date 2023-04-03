import './index.css';

export const Hexadecimal =(prop)=>{
    return( 
        <div className="box">
    <div className='hex'>
        HEX {prop.number.toString(16)}
    </div>
    </div>)
}