import React from 'react';
import HelpIcon from '@material-ui/icons/Help';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import SettingsIcon from '@material-ui/icons/Settings';
import '../components/CircleHomePageTop.css';

const CircleHomePageTop = () => {

    return (
        <div className="CircleHomePageTop">
            <HelpIcon color="disabled" />&nbsp;
            <ChatBubbleIcon color="disabled" />
        </div>
       

    )
}

export default CircleHomePageTop