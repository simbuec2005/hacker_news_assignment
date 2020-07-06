import React, { useEffect, useState } from 'react'
import { Chart } from 'react-charts'

function LineChart({ hits }) {
    const [points, setPoints] = useState([
        {
            label: 'Series 1',
            data: [],
        }
    ]);
    const axes = React.useMemo(
        () => [
            { primary: true, type: 'ordinal', position: 'bottom' },
            { type: 'linear', position: 'left' },
        ],
        []
    )
    useEffect(() => {
        const points = hits.map((item) => { return [item.story_id || item.objectID, item.points || 0] });
        console.log(points)
        setPoints([
            {
                label: 'Series 1',
                data: points,
            }
        ])
    }, [])

    const lineChart = (
        // A react-chart hyper-responsively and continuously fills the available
        // space of its parent element automatically
        <div
            style={{
                width: '80vw',
                height: '300px',
            }}
        >
            <Chart data={points} axes={axes} />
        </div>
    );

    return lineChart;
}
export default LineChart;