import './index.css';

export const Keypad =(prop)=>{
    const operations=["(",")","%","/","+","-","*","7","8","9","4","5","6","1","2","3","0","="];
    // const operations=["(",")","/","%","7","9","8","*","5","4","6","1","-","2","+","3","0","="];
    return(
        <div className="box">
        <div className="center">
            { operations.map((el, index)=>{
                if(index===6){
                return(<div><button type="button" onClick={() => prop.res()} value={el}>{el}</button> <br></br> </div>) 
                }
                if(el==='='){
                return(<button type="button" onClick={() => prop.res()} value={el}>{el}</button>)
                }
                return(<button type="button" onClick={() => prop.fnc(el)} value={el}>{el}</button>)
            })}            
    </div>
    </div>)
}
