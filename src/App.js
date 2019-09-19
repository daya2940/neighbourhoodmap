import React, { Component } from 'react';
import './App.css';
import Map from './map.js';
import $ from 'jquery';

class App extends Component {
    state = {
        sidebar : 'closed'
    }

    componentDidMount(){
        //Add Interactivity for Enter Key to improve a11y
        $('#hamburger-icon').keydown((event) => {
            if (event.which === 13) {
                $(event.target).click();
                return false;
            }
        });
        // ESC key closes the sidebar
        $('.sidebar').keydown((e) => {
            if (e.which === 27 && this.state.sidebar === 'open'){
                this.toggleSidebar();
            }
        });
    }

    focusTrap = () => {
        if(this.state.sidebar === 'closed'){
            //alert('Sidebar Trap Started');
            let firstTabbable = $('#hamburger-icon');
            let lastTabbable = $('.location-list li:last-child');
            lastTabbable.keydown(function(e){
                if ((e.which === 9 && !e.shiftKey)) {
                    e.preventDefault();
                    firstTabbable.focus();
                }
            });
            firstTabbable.keydown(function(e){
                if ((e.which === 9 && e.shiftKey)) {
                    e.preventDefault();
                    lastTabbable.focus();
                }
            });
        }
   }

    toggleSidebar = () => {
        //Open and close sidebar function
        if(this.state.sidebar === 'open'){
            this.setState({sidebar: 'closed'});
            $('.sidebar').removeClass('showSidebar');
            $('#hamburger-icon').removeClass("change");
            $('#hamburger-icon').attr('aria-label','Open Sidebar Menu');
        }else{
            this.setState({sidebar: 'open'}, this.focusTrap());
            $('.sidebar').addClass('showSidebar');
            $('#hamburger-icon').addClass("change");
            $('#hamburger-icon').attr('aria-label','Close Sidebar Menu');
        }
    }

    render() {
        return(
            <div className="app">
                <header className="header">
                    <div className="logo">Hyderabad Malls</div>
                </header>
                <div id="hamburger-icon" tabIndex="0" aria-label="Open Sidebar Menu" onClick={this.toggleSidebar}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <Map google={this.props.google} toggleSidebar={this.toggleSidebar} sidebar = {this.state.sidebar}/>
            </div>
        );
    }
}

export default App;
