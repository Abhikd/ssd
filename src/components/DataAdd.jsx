import React, { useState } from 'react'
import Finder from './Finder';

const DataAdd = () => {


    const [newPerson, setNewPerson] = useState("");
    const [friend, setFriend] = useState("");
    const [friendsList, setFriendsList] = useState([]);
    const [personList, setPersonList] = useState([]);
    const [valid, setValid] = useState(0);
    const [mapState, setMapState] = useState();
    const[nameVal, setNameVal] = useState (false);
    const[friendVal, setFriendVal] = useState(false);
    const[tempFriend, setTempFriend] = useState("");


    const list = new Map();

    const handlenewPersonChange = (e) => {
        setNewPerson(e.target.value.toUpperCase());
    }

    const handleFriendChange = (e) => {
        setFriend(e.target.value.toUpperCase());
    }

    const handleNewChange = (e) => {
        e.preventDefault();
        setPersonList([...personList, newPerson]);
        setNameVal(true);

        // console.log(personList);

    }

    const handleNewFriendChange = (e) => {

        e.preventDefault();
        setFriendsList([...friendsList, [newPerson, friend]]);
        setFriendVal(true);
        setTempFriend(friend);
        setFriend("");
    }

    const handleSubmit = () => {
        setNameVal(false);
        setFriendVal(false);
        setValid(valid + 1);
        setNewPerson("");

        const addEdge = (one, two) => {
            let x = list.get(one) || [];
            list.set(one, [...x, two]);

            let y = list.get(two) || [];
            list.set(two, [...y, one]);

        }

        friendsList.forEach(f => addEdge(...f));
        console.log(list);
        setMapState(list);
    }

    return (
        <div className='max-w-[800px]  w-full h-[-100px] mb-[500px]  mx-auto text-center flex flex-col justify-center'>
            <div className='flex flex-col justify-center '>
            <h1 className='text-[#00df9a] font-bold p-2 md:text-5xl sm:text-3xl text-2xl md:py-6'>ADD NEW PEOPLE</h1>
                <div className='flex flex-col justify-cente mt-[20px] mb-[50px]'>
                <form className=''>
                    <input className='bg-white w-[400px]  h-[50px] rounded-md text-black mx-3' type="text" value={newPerson} placeholder="Add Name" onChange={handlenewPersonChange} />
                    <button className='bg-[#00df9a] w-[50px] rounded-md font-medium mx-auto py-3 text-black' onClick={handleNewChange}>+</button>
                </form>
                { nameVal && <h1 className='text-white mt-2'>You added {newPerson}. Now add {newPerson}'s friends and submit.</h1>}
                </div>
                <div className='flex flex-col justify-center mt-[20px] mb-[50px]'>
                <form>
                    <input className='bg-white w-[400px]  h-[50px] rounded-md text-black mx-3' type="text" value={friend} placeholder="Add Friends" onChange={handleFriendChange} />
                    <button className='bg-[#00df9a] w-[50px] rounded-md font-medium mx-auto py-3 text-black' onClick={handleNewFriendChange}>+</button>
                </form>
                { friendVal && <h1 className='text-white mt-2'>You added {tempFriend} to {newPerson}'s list. Add more if you want or submit.</h1>}
                </div>

                <button className='bg-[#00df9a] w-[200px] rounded-md font-medium mx-auto py-3 text-black' onClick={handleSubmit}>Submit</button>

            </div>

            <Finder list={mapState} />

        </div>
    )
}

export default DataAdd