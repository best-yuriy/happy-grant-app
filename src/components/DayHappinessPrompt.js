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
import { setHappinessLevel, getHappinessLevel } from '../services/HappinessLevelRepo'

function HappinessLevel({ percent, alt, src, selected, onClick }) {
    return (
        <img
            key={`happiness-level-${percent}`}
            className={`choice flex-column-main${selected ? ' selected' : ''}`}
            src={src}
            alt={alt}
            onClick={onClick}
        />
        
    );
}

function DayHappinessPrompt() {

    const [state, setState] = useState({ date: dayjs().startOf('day'), value: null });

    function changeDays(numDays) {
        const newDate = state.date.add(numDays, 'day');
        const happinessLevel = getHappinessLevel(newDate) || {};
        if (!dayjs().startOf('day').isBefore(newDate)) {
            setState({ value: happinessLevel, date: newDate });
        }
    }

    function toggleHappinessLevel(value) {
        const newValue = state.value === value ? null : value
        setState({ ...state, value: newValue });
    }

    function happinessLevel(value, src, alt) {
        function onClick() {
            setHappinessLevel(state.date, state.value === value ? null : value);
            toggleHappinessLevel(value);
        }
        return (
            <HappinessLevel
                percent={value}
                selected={state.value === value}
                src={src}
                altText={alt}
                onClick={onClick}
            />
        )
    }

    return (
        <div id='day-happiness-prompt' className='flex-column'>
            <div className='header flex-column-fixed'>
                {state.date.format('MMM DD YYYY')}
            </div>
            <div className='main flex-column-main flex-row'>
                <img
                    className='shift-day-button flex-row-fixed'
                    src={chevronBackward}
                    alt='back'
                    onClick={() => changeDays(-1)}
                />
                <div className='flex-row-main flex-column'>
                    <div className='vertical-spacer'/>
                    <div className='flex-column-main flex-row'>
                        <div className='mood-selection flex-column'>
                            {happinessLevel(100, ecstatic,   'ecstatic'  )}
                            {happinessLevel(75,  happy,      'happy'     )}
                            {happinessLevel(50,  thoughtful, 'thoughtful')}
                            {happinessLevel(25,  sad,        'sad'       )}
                            {happinessLevel(0,   crying,     'crying'    )}
                        </div>
                        <div className='mood-slider'>
                            <div className='slider'></div>
                        </div>
                    </div>
                    <div className='vertical-spacer'/>
                </div>
                <img
                    className='shift-day-button flex-row-fixed'
                    src={chevronForward}
                    alt='forward'
                    onClick={() => changeDays(1)}
                />
            </div>
        </div>
    );
}

export default DayHappinessPrompt;