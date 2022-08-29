import React, { useState } from 'react'

const Finder = ({ list }) => {

    const [first, setFirst] = useState("");
    const [second, setSecond] = useState("");
    const [val, setVal] = useState (false);
    const [array, setArray] = useState([]);
    let q = [];


    const handleFindChange = (e) => {
        setFirst(e.target.value.toUpperCase());
    }

    const handleFinderChange = (e) => {
        setSecond(e.target.value.toUpperCase());
    }

    const handleReset = () => {
        setFirst("");
        setSecond("");
        setVal(!val);
        setArray([]);
    }


    const handleSearch = (e) => {
        e.preventDefault();

       function dfs(first, visited = new Set()){
            visited.add(first);

            const destinantions = list.get(first);
             for(const destinantion of destinantions) {

                if(destinantion === second){
                    console.log(visited);
                    visited.forEach((value) => { 
                            q.push(value);
                    });
                    setArray(q);
                    setVal(!val);
                    console.log(q);
                    return;
                }


                    if(!visited.has(destinantion)){
                        dfs(destinantion, visited);
                    }

             }

        }

        dfs(first);  


    }
    


    return (
        <div className='max-w-[800px]  w-full mb-[-300px] mt-[200px] mx-auto text-center flex flex-col justify-center'>
             <div className='flex flex-col justify-center '>
             <h1 className='text-[#00df9a] font-bold p-2 md:text-5xl sm:text-3xl text-2xl md:py-6'>FIND THE DEGREE OF SEPARATION</h1>

            <form>
            <div className=' flex flex-col  mt-[20px] mb-[50px]'>
                <input className='bg-white w-[400px]  h-[50px] rounded-md m-5 text-black mx-auto' type="text" value={second} placeholder="First Person" onChange={handleFinderChange} />
                <input className='bg-white mx-auto w-[400px]  h-[50px] m-5 rounded-md text-black' type="text" value={first} placeholder="Second Person" onChange={handleFindChange} />
                <button className='bg-[#00df9a] w-[200px] rounded-md font-medium mt-4 py-3 text-black mx-auto' onClick={handleSearch}>Find</button>
                </div>
            </form>
            </div>
            <div className='flex flex-row mx-auto justify-center space-x-2'>
                {val && array.map((v) =>( 
                <h1 className='text-white'>{v} - </h1>
                )
                )}
                {val && <h1 className='text-white'> {second} </h1> }
             </div>   
             <div>
                { !val && <h1 className='text-white mt-[-20px]'>Your degree of separation will display here. If there is no connection nothing will change.</h1> }
             </div>

             <button className='bg-[#00df9a] w-[200px] rounded-md font-medium mt-6 py-3 text-black mx-auto' onClick={handleReset}>Reset</button>

        </div>
    )
}

export default Finder