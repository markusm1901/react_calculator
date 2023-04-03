import './index.css';

export const Binary =(prop)=>{
    return( 
        <div className="box">
        <div className='bin'>
        BIN {prop.number.toString(2)}
        </div>
        </div>)
}