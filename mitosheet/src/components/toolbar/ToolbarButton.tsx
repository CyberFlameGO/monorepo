// Copyright (c) Mito

import React from 'react';
import { Action } from '../../types';
import { classNames } from '../../utils/classNames';
import { getToolbarItemIcon, ToolbarButtonType } from './utils';

/**
 * The ToolbarButton component is used to create each
 * button in the Toolbar. 
 */ 
const ToolbarButton = (
    props: {
        /** 
        * @param id - An option id to put on the element, so we can grab it elsewhere 
        */
        id?: string;
        /** 
        * @param toolbarButtonType - The toolbaryItemType is used to determine the correct icon to display. 
        */
        toolbarButtonType: ToolbarButtonType;

        /** 
        * @param action - The action to run when the toolbar button is clicked
        */
        action: Action;
        
        /**
        * @param [highlightToolbarButton] - Used to draw attention to the toolbar item. Defaults to False. 
        */ 
        highlightToolbarButton?: boolean; 

        /**
        * @param [children] - A dropdown opened by the toolbar button
        */
        children?: JSX.Element

        /**
        * @param [displayChildren] - If true, display the children prop, otherwise don't.
        */
        displayChildren?: boolean

    }): JSX.Element => {

    const highlightToobarItemClass = props.highlightToolbarButton === true ? 'toolbar-button-draw-attention' : ''

    return (
        <div 
            className='toolbar-button-container' 
            id={props.id}
            onClick={props.action.actionFunction}
        >
            <button 
                className={classNames('toolbar-button', 'vertical-align-content', highlightToobarItemClass)} 
                type="button"
            >
                {/* 
                    The spacing of this button relies on the height of the icon itself! Note that all of the icons 
                    that we use have consistent heights. We leave it this way to force ourselves to design consistent 
                    icons. 
                    
                    If the icons have different heights, the text won't line up. 
                */}
                <span title={props.action.tooltip}>
                    <div className='toolbar-button-icon-container'>
                        {getToolbarItemIcon(props.toolbarButtonType)}
                    </div>
                    <p className='toolbar-button-label'> 
                        {props.action.shortTitle}
                    </p>
                </span>
            </button>
            {props.displayChildren && props.children !== undefined && props.children}
        </div>
    );
}

export default ToolbarButton;