import fetch from "isomorphic-fetch";
import { getNewsSuccess, getNews } from "../actions";

export const fetchNewsApi = (query) => (dispatch) => {
    let url = 'http://hn.algolia.com/api/v1/search_by_date';
    if (query) {
        const qs = Object.keys(query).map((key) => {
            return `${key}=${query[key]}`;
        }).join('&&');
        url = `${url}?${qs}`
    }
    return fetch(url)
        .then(res => res.json())
        .then(res => dispatch(getNewsSuccess(res)));
}
