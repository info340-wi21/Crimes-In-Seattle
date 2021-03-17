import React from 'react';
import { useParams } from 'react-router';
import RESOURCES from './resources.json';
import _ from 'lodash';

export function About(props) {
    let { resourceId } = useParams();
    let resource =  _.find(RESOURCES, {resource: resourceId});

    if(!resource) return <h2>No resource specified</h2>

    return (
      <div>
        <h1>{resource.resource}</h1>
        <p>{resource.description}</p>
        <img src={resource.img} alt={resource.resource + " image"}/>
        <a href={resource.link}>Click me to visit the Resource webpage</a>
      </div>
    )
}

export default About;