import React from 'react';
import {Button} from 'react-bootstrap';
import './LoaderButton.css';
require('webpack-icons-installer');

export default ({isLoading, 
                text, 
                loadingText, 
                className = "", 
                disabled = false,
                 ...props}) =>
                            <Button className={`LoaderButton ${className}`} disabled={disabled || isLoading} {...props}>
                              {isLoading && <i className="glyphicon glyphicon-refresh"></i>}
                              {!isLoading ? text : loadingText}
                            </Button>