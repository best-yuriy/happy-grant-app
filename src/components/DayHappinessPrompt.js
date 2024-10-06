import './DayHappinessPrompt.css'
import chevronBackward from '../assets/chevron-backward.svg'
import chevronForward from '../assets/chevron-forward.svg'
import ecstatic from '../assets/ecstatic.png'
import happy from '../assets/happy.png'
import thoughtful from '../assets/thoughtful.png'
import sad from '../assets/sad.png'
import crying from '../assets/crying.png'

function HappinessLevel({ percent, altText, src }) {
    const onClick = () => console.log(`happiness level: ${percent}`);
    return <img className="happiness-level" src={src} onClick={onClick} alt={altText} />;
    // return <div className='happiness-level'>{altText}</div>
}

function DayHappinessPrompt() {
    return (
        <div id='day-happiness-prompt'>
            <div id='day-happiness-prompt-header'>Oct 6 2024</div>
            <div id='day-happiness-prompt-body'>
                <img id='day-happiness-prompt-left' src={chevronBackward} alt='back'/>
                <div id='happiness-level-prompt'>
                    <HappinessLevel percent={100} src={ecstatic} altText={":D"}/>
                    <HappinessLevel percent={75} src={happy} altText={":)"}/>
                    <HappinessLevel percent={50} src={thoughtful} altText={":/"}/>
                    <HappinessLevel percent={25} src={sad} altText={":("}/>
                    <HappinessLevel percent={0} src={crying} altText={";("}/>
                    {/* <p>content</p> */}
                </div>
                <img id='day-happiness-prompt-right' src={chevronForward} alt='forward'/>
            </div>
        </div>
    );
}

export default DayHappinessPrompt;