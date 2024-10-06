import './HappinessStats.css'
import { Line } from 'react-chartjs-2';
import {
    Chart,
    CategoryScale,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip
} from 'chart.js'
import dayjs from 'dayjs';

Chart.register(
    CategoryScale,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip
)

const today = dayjs().startOf('day');
const dates = 
    Array(31)
        .keys()
        .map(i => today.subtract(i, 'day').format('YYYY-MM-DD'))
        .toArray()
        .reverse();

const happinessData = dates.map(() => Math.floor(Math.random() * 5) * 25);

function HappinessStats() {
    const data = {
        labels: dates,
        datasets: [
            {
                data: happinessData,
                borderColor: 'lightblue'
            }
        ]
    };

    const options = {
        scales: {
            x: {
                ticks: {
                    major: {
                        enabled: true
                    },
                    // FIXME: for some reason, value and index give me the same value
                    // and ticks contains an array with the same label repeated over
                    // and over.
                    callback: (value, index, ticks) => dayjs(dates[index]).format('MM/DD')
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    title: (title) => dayjs(title[0].label).format('MM/DD/YYYY')
                }
            }
        }
    };

    return (
        <div id='happiness-stats'>
            <Line
                data={data}
                options={options}
            />
        </div>
    );
}

export default HappinessStats;