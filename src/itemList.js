import React, { Component } from 'react';
import $ from 'jquery';

class Item extends Component{

    componentDidMount(){
        const {marker} = this.props;
        //add active class when listItem is click
        $('.location-list li').click(function () {
            $('.location-list .active').removeClass('active');
            $(this).addClass('active');
        })
        marker.addListener("click", function() {
            $('.location-list .active').removeClass('active');
        });
        //Add Interactivity for Enter Key to improve a11y
        $('.location-list li').keypress(function(event) {
            if (event.which === 13) {
                $(event.target).click();
                return false;
            }
        });
    }

    render(){
        const {marker} = this.props;
        return(
                <li tabIndex="0" role="button" onClick={() => this.props.openInfoBox(marker)}>{marker.name}</li>
        )
    }
}

export default Item;
