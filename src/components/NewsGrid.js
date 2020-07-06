import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from "react-router-dom";


function NewsGrid({ news, history }) {
    const { page, nbPages } = news.data;
    const prev = page - 1;
    const next = page + 1;
    const prevQuery = `/search?page=${prev}`;
    const nextQuery = `/search?page=${next}`;

    

    const hide = () => {
        console.log('hiding');
    }

    return (
        <div>
            <div className="gridContainer">
                <div className="row">
                    <div className="col">Comments</div>
                    <div className="col">Vote Count</div>
                    <div className="col">UpVote</div>
                    <div className="col">News Details</div>
                </div>
                <div className="body">
                    {
                        news.data.hits && news.data.hits.map((item) => {
                            return (
                                <div key={item.story_id} className="row">
                                    <div className="col">{item.num_comments || 0}</div>
                                    <div className="col">{item.points || 0}</div>
                                    <div className="col" ><button>upvote</button></div>
                                    <div className="col">
                                        {item.title || item.story_title}
                                        <span>({item.url || item.story_url}) by </span>
                                        <span>{item.author} </span>
                                        <span>{moment(item.created_at).fromNow()} </span>
                                        <button onClick={hide}>hide</button>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>

            {prev >= 0 && <a href={prevQuery} className="link">Previous</a>}
            {next <= nbPages && <a href={nextQuery} className="link">Next</a>}

        </div>
    )
}

export default connect((state) => {
    return {
        news: state.news
    }
})(NewsGrid);