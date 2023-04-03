import './index.css';

export const Octal =(prop)=>{
    return( 
        <div className="box">
    <div className='oct'>
        Oct {prop.number.toString(8)}
    </div>
    </div>)

}