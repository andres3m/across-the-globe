import React from 'react'
import './ObjectItem.css'

export function ObjectItem(props) {
    return (
        <div className="item-container">
            <img alt="examples" src={props.example}></img>

            <div className="item-text">
                <div className="titleDiv">
                    <h2 className="titles">{props.title}</h2>
                    <h2 className="titles">{props.englishTitle}</h2>
                    
                </div>

                <p className='week'>Week {props.week}</p>

                <p>{props.definition}</p>

                <div className="linksDiv">
                    <a href={props.links}>{props.links}</a>
                </div>
                
                <div className="buttonDiv">
                    <button className="buttons" onClick={props.handleDelete}>Delete  🗑</button>
                    <button className="buttons" onClick={props.handleEdit}>Edit  📝</button>
                    <button className="buttons" onClick={props.handleFavourite}>Favourite ⭐️</button>
                </div>
            </div>
        </div>
    )
}