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
import { Direction, Range } from "react-range";

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

function SliderComponent({ value, setValue }) {
    return (
        <Range
            label="Select your value"
            step={5}
            min={0}
            max={100}
            values={[value]}
            onChange={(values) => setValue(values[0])}
            direction={Direction.Up}
            renderTrack={({ props, children }) => (
                <div className='slider-track' {...props} style={props.style}>
                    <div className='middle'/>
                    {children}
                </div>
            )}
            renderThumb={({ props }) => (
                <div className='slider-thumb' {...props} style={props.style} key={props.key}>
                    <div className='slider-thumb-label'>
                        {value}
                    </div>
                </div>
            )}
        />
    );
}

function DayHappinessPrompt() {

    const [state, setState] = useState({
        date: dayjs().startOf('day'),
        value: getHappinessLevel(dayjs().startOf('day')) || 50
    });

    function changeDays(numDays) {
        const newDate = state.date.add(numDays, 'day');
        const happinessLevel = getHappinessLevel(newDate);
        if (!dayjs().startOf('day').isBefore(newDate)) {
            setState({ value: happinessLevel, date: newDate });
        }
    }

    function setHappinessLevelState(value) {
        setState({ ...state, value });
    }

    function toggleHappinessLevel(value) {
        const newValue = state.value === value ? null : value
        setState({ ...state, value: newValue });
    }

    function happinessLevel(minValue, maxValue, src, alt) {
        function onClick() {
            setHappinessLevel(state.date, state.value === minValue ? null : minValue);
            toggleHappinessLevel(minValue);
        }
        return (
            <HappinessLevel
                percent={minValue}
                selected={state.value >= minValue && state.value < maxValue}
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
                    <div className='mood-controls flex-column-main flex-row'>
                        <div className='mood-selection flex-column'>
                            {happinessLevel(80, 101, ecstatic,   'ecstatic'  )}
                            {happinessLevel(60, 80,  happy,      'happy'     )}
                            {happinessLevel(40, 60,  thoughtful, 'thoughtful')}
                            {happinessLevel(20, 40,  sad,        'sad'       )}
                            {happinessLevel(0, 20,   crying,     'crying'    )}
                        </div>
                        <SliderComponent
                            className='mood-slider'
                            value={state.value}
                            setValue={setHappinessLevelState}
                        />
                    </div>
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