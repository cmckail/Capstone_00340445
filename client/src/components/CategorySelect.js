import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CategorySelect({ handleChange, defaultVal = null }) {
    const [categories, setCategories] = useState([])
    const [selected, setSelected] = useState(null);
    const [fetched, setFetched] = useState(false);
    useEffect(() => {
        if (!fetched) {
            axios.get('https://tadoo-backend-p9hgk.ondigitalocean.app/api/categories')
                .then((resp) => resp.data)
                .then((data) => setCategories(data))
                .then(() => setFetched(true))
                .catch((err) => console.log('error'))
        }
        setSelected(defaultVal);
    }, [])

    useEffect(() => {
        console.log(selected)
    }, [selected])

    const onChange = (e) => {
        setSelected(e.target.value)
        handleChange(e.target.value)
    }

    return (
        <div className="form-group">
            <label htmlFor="Categories">Categories</label>
            <select
                name='category'
                onChange={onChange}
                value={selected}
                className="form-control"
            >
                <option ></option>
                {categories.map((c) => <option value={c?.id}>{c?.name}</option>)}
            </select>
        </div>
    )
}
