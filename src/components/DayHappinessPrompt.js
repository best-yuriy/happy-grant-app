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

function HappinessLevel({ percent, altText, src }) {
    const onClick = () => console.log(`happiness level: ${percent}`);
    return <img className="happiness-level" src={src} onClick={onClick} alt={altText}/>;
}

function DayHappinessPrompt() {
    const [activeDate, setActiveDate] = useState(dayjs().startOf('day'));
    function addDays(numDays) {
        const newDate = activeDate.add(numDays, 'day');
        if (dayjs().startOf('day').isAfter(newDate)) {
            setActiveDate(newDate);
        }
    }
    return (
        <div id='day-happiness-prompt'>
            <div id='day-happiness-prompt-header'>{activeDate.format('MMM DD YYYY')}</div>
            <div id='day-happiness-prompt-body'>
                <img id='day-happiness-prompt-left'
                    src={chevronBackward}
                    alt='back'
                    onClick={() => addDays(-1)}
                />
                <div id='happiness-level-prompt'>
                    <HappinessLevel percent={100} src={ecstatic} altText={":D"}/>
                    <HappinessLevel percent={75} src={happy} altText={":)"}/>
                    <HappinessLevel percent={50} src={thoughtful} altText={":/"}/>
                    <HappinessLevel percent={25} src={sad} altText={":("}/>
                    <HappinessLevel percent={0} src={crying} altText={";("}/>
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