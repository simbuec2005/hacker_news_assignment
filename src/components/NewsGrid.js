import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from "react-router-dom";
import LineChart from './LineChart';


function NewsGrid({ news, history }) {
    const { page, nbPages, hits } = news.data;
    const prev = page - 1;
    const next = page + 1;
    const prevQuery = `/search?page=${prev}`;
    const nextQuery = `/search?page=${next}`;

    const [tableData, setTableData] = useState(hits || []);

    useEffect(() => {
        updateData();
    }, [])



    const hide = (storyId) => {
        localStorage.setItem(`hidden_${storyId}`, true);
        updateData();
    }

    const upvote = (storyId) => {
        localStorage.setItem(`voted_${storyId}`, true);
        updateData();
    }

    const unvote = (storyId) => {
        localStorage.removeItem(`voted_${storyId}`);
        updateData();
    }


    const updateData = () => {
        const updated = [...tableData].filter(item => {
            const id = item.story_id || item.objectID;
            return !localStorage.getItem(`hidden_${id}`);
        }).map(item => {
            const id = item.story_id || item.objectID;
            if (localStorage.getItem(`voted_${id}`)) {
                return {
                    ...item,
                    voted: true
                }
            }

            return {
                ...item,
                voted: false
            }
        });
        setTableData(updated);
    }

    return (
        <div>
            <div className="gridContainer">
                <div className="header">
                    <div className="col">Comments</div>
                    <div className="col">Vote Count</div>
                    <div className="col">UpVote</div>
                    <div className="col">News Details</div>
                </div>

                {
                    tableData.map((item) => {
                        return (
                            <div key={item.story_id} className="row">
                                <div className="col">{item.num_comments || 0}</div>
                                <div className="col">{item.points || 0}</div>
                                <div className="col" >
                                    {!item.voted && <button className="upvote" onClick={() => { upvote(item.story_id || item.objectID) }}></button>}
                                </div>
                                <div className="col">
                                    <span className="title">{item.title || item.story_title}</span>
                                    <span className="light">({item.url || item.story_url}) by </span>
                                    <span>{item.author} </span>
                                    <span className="light">{moment(item.created_at).fromNow()} </span>
                                    <span className="actions">
                                        {item.voted && <button className="splitter" onClick={() => { unvote(item.story_id || item.objectID) }}>unvote</button>}
                                        <button onClick={() => { hide(item.story_id || item.objectID) }}>hide</button>
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }


            </div>
            <div className="pagination">
                {prev >= 0 && <a href={prevQuery} className="splitter">Previous</a>}
                {next <= nbPages && <a href={nextQuery} className="next">Next</a>}
            </div>

            <LineChart hits={news.data.hits || []} />
        </div>
    )
}

export default connect((state) => {
    return {
        news: state.news
    }
})(NewsGrid);