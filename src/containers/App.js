import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';
import '../style/App.css';

const App = () =>{

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [robot, setRobot] = useState([]);

    const onSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() =>  {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                setRobot(users)
            })
            .catch((error) => {
            console.error(error);
        });
    }, [])

    useEffect(() => {
        let filteredRobots = robot.filter(robots => {
            return(
                robots.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setSearchResults(filteredRobots);
    }, [searchTerm,robot])

    const newRobot = searchResults;

    return(
        <div className="tc">
            <Scroll>
                <h1 className="f2">RoboFriends</h1>
                <SearchBox SearchChange={ onSearchChange }/>
            </Scroll>
                {
                    searchTerm === "" ? <CardList robots={ robot }/> : <CardList robots={ newRobot }/>
                }
        </div>
    );
}

export default App;