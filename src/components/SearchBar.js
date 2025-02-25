import React, { useState, useRef, useEffect } from "react";
import data from '../chesser/data.json';
import { levenshteinDistance } from "./levenshtein";
import './SearchBar.css';

function SearchBar({ final, setFinal }) {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const searchBarRef = useRef(null);

    const dataArray = Object.keys(data).map(key => ({
        name: key,
        fen: data[key]
    }));

    const handleSearchChange = (event) => {
        const val = event.target.value;
        setSearch(val);

        const filteredResults = dataArray
            .map(item => ({
                name: item.name,
                priority: item.name.toLowerCase().startsWith(val) ? 0 : 1,
                distance: levenshteinDistance(val, item.name.toLowerCase())
            }))
            .sort((a, b) => a.priority - b.priority || a.distance - b.distance)
            .slice(0, 5);

        setResults(filteredResults.map(r => r.name));
    };

    const setAll = (item) => {
        setFinal(item);
        setSearch(item);
    };

    const handleClickOutside = (event) => {
        if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
            setResults([]);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="parent" ref={searchBarRef}>
            <input placeholder={"Search..."} value={search} onChange={handleSearchChange}></input>
            <div className="white-list">
                {results.map((item, index) => (
                    <div className="white" onClick={() => setAll(`${item}`)} key={index}>{item}</div>
                ))}
            </div>
        </div>
    );
}

export default SearchBar;