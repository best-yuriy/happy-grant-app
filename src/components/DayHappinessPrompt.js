import './DayHappinessPrompt.css'
import chevronBackward from '../assets/chevron-backward.svg'
import chevronForward from '../assets/chevron-forward.svg'
import ecstatic from '../assets/ecstatic.png'
import happy from '../assets/happy.png'
import thoughtful from '../assets/thoughtful.png'
import sad from '../assets/sad.png'
import crying from '../assets/crying.png'
import { useState } from 'react'
import dayjs from 'dayjs'

function HappinessLevel({ percent, altText, src, selected }) {
    const onClick = () => console.log(`happiness level: ${percent}`);
    return (
        <img
            key={`happiness-level-${percent}`}
            className={`happiness-level${selected ? ' selected' : ''}`}
            src={src}
            onClick={onClick}
            alt={altText}
        />
    );
}

function DayHappinessPrompt() {
    function newState() {
        return { 
            date: dayjs().startOf('day'),
            value: 25
        };
    }

    const [state, setActiveDate] = useState(newState());

    function addDays(numDays) {
        const newDate = state.date.add(numDays, 'day');
        if (!dayjs().startOf('day').isBefore(newDate)) {
            setActiveDate({ ...state, date: newDate });
        }
    }
    return (
        <div id='day-happiness-prompt'>
            <div id='day-happiness-prompt-header'>{state.date.format('MMM DD YYYY')}</div>
            <div id='day-happiness-prompt-body'>
                <img id='day-happiness-prompt-left'
                    src={chevronBackward}
                    alt='back'
                    onClick={() => addDays(-1)}
                />
                <div id='happiness-level-prompt'>
                    {
                        [
                            { percent: 100, src: ecstatic, altText: 'ecstatic', selected: state.value === 100 },
                            { percent: 75, src: happy, altText: 'happy', selected: state.value === 75 },
                            { percent: 50, src: thoughtful, altText: 'thoughtful', selected: state.value === 50 },
                            { percent: 25, src: sad, altText: 'sad', selected: state.value === 25 },
                            { percent: 0, src: crying, altText: 'crying', selected: state.value === 0 }
                        ].map(props => HappinessLevel(props))
                    }
                </div>
                <img id='day-happiness-prompt-right'
                    src={chevronForward}
                    alt='forward'
                    onClick={() => addDays(1)}
                />
            </div>
        </div>
    );
}

export default DayHappinessPrompt;