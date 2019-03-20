import React from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import './LoaderButton.css';

export default ({isLoading, 
                text, 
                loadingText, 
                className = "", 
                disabled = false,
                 ...props}) =>
                            <Button className={`LoaderButton ${className}`} disabled={disabled || isLoading} {...props}>
                              {isLoading && <Glyphicon glyph="refresh" className="spinning" />} 
                              {isLoading && <span><Glyphicon glyph="refresh" className="spinning" /></span> } 
                              {!isLoading ? text : loadingText}
                            </Button>