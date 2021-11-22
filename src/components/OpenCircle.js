import React from 'react';
import {Avatar} from '@material-ui/core';
import '../components/OpenCircle.css';


const OpenCircle = () => {

    return (

        <div className="circleRow">
            <div className="circleItem">
                <h3 >LGBTQ + SEATTLE</h3>
                <div className="circleBottom">
                    <Avatar  />
                    <div className="circleInfo">
                        <h3>@USERNAME  </h3>
                        <p>REQUESTED $100.00</p>
                        <button>Open Circle</button>
                    </div>
                    
                </div>
                    
            </div>
        </div>
            
   )
}

export default OpenCircle