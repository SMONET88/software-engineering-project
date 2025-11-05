import {  useState } from 'react'

const BetButton = ({ label }) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    };

    return (
        <>
            <button
                onClick={handleClick}
                style={{
                    backgroundColor: clicked ? '#39D353' : '#150145',
                    color: clicked ? '#150145' : '#39D353',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                }}
            >
                {label}
            </button>
        </>
    )
}

export default BetButton;