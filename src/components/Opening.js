import {useState} from "react";
import './Opening.css'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from "./SearchBar";

function Opening({opening, setOpening, depth, setDepth}) {

  return (
    <div className="Opening">
        <div className="Opening-title">Select Options</div>
        <div className="Opening-mid">
            <div className="Opening-left">
                <div className="Opening-depth">
                    <div>Depth of Your Opening Puzzles</div>
                    <div className="small-text">In this context, depth refers to the maximum number of turns a puzzle can extend from its starting point, indicating how far it can progress before reaching a conclusion.</div>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {depth}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        {Array.from({ length: 10 }, (_, i) => (
                            <Dropdown.Item onClick={()=>setDepth(`${i + 1}`)}>{i + 1}</Dropdown.Item>
                        ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="Opening-select">
                <div>Select Start Position</div>
                <SearchBar final={opening} setFinal={setOpening}></SearchBar>
            </div>
        </div>
    </div>
  );
}

export default Opening;
