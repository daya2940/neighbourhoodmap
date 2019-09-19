import React, { Component } from 'react';
import Item from './itemList'
import './App.css';

class Sidebar extends Component {
    render(){
        const {map} = this.props;
        return (
            <div className="sidebar" aria-label="Sidebar Navigation" aria-modal="true">
                <label htmlFor="search">Enter the Mall Name</label>
                <input id="search" tabIndex="0" aria-label="Search Malls"  placeholder="Search Malls"
                value={this.props.query}
                onChange={(event) => this.props.updateResult(event.target.value, map)}
                />
                <ul className="location-list">
                {this.props.searchedPlaces.map((marker) => (
                    <Item
                        key={marker.name}
                        className=""
                        map={map}
                        marker={marker}
                        tips = {this.props.tips}
                        toggleSidebar={this.props.toggleSidebar}
                        openInfoBox = {this.props.openInfoBox}/>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Sidebar;
