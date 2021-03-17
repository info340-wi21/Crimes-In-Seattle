import React from 'react';
import { useParams } from 'react-router';
import RESOURCES from './resources.json';
import _ from 'lodash';

export function About(props) {
    let { resourceName } = useParams();   
    let resource =  _.find(RESOURCES, {resource: resourceName});

    if(!resource) return <h2>No resource specified</h2>

    return (
      <div><p>test</p></div>
    )
}

export default About;