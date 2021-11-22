import React from 'react';
import {Avatar} from '@material-ui/core';
import '../components/TrendingCircle.css';
import { SearchOutlined } from '@material-ui/icons';


const TrendingCircle = () => {

    return (

        <div className="tredningCircleRow">
            
            <div className="search">
                <div className="searchContainer">
                    <input placeholder="ENTER A CIRCLE NAME OR ID" type="text"/>
                    <SearchOutlined />
                </div>
            </div>
            
            <div className="trendingCircleItem">
                <h3 >BLACK LIVES MATTER, CA</h3>
                <div className="trendingCircleBottom">
                    <Avatar  />
                    <div className="trendingCircleInfo">
                        <p>Amount - $200</p>
                        <p>Term - Weekly</p>
                        <p>Members - 80</p>
                        <button>JOIN</button>&nbsp; 
                        <button>DONATE</button>
                    </div>
                    
                </div>
                    
            </div>

        </div>

        
            
   )
}

export default TrendingCircle