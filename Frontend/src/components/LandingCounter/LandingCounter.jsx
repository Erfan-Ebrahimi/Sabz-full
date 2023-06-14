import { useState, useEffect } from "react";

const LandingCounter = ({ limitCount }) => {

    const [counter, setCounter] = useState(0)

    useEffect(() => {
        let interval = setInterval(() => {
            setCounter(prevCount => prevCount + 1)
        }, 0.001)

        if (counter === limitCount) {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [counter])



    return (
        <span className="landing-status__count">
            {counter}
        </span>
    )
}

export default LandingCounter;