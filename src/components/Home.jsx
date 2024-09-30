import React, { useRef, useState } from 'react'
import styles from '../styles'
import underweightImg from "../assets/underweight.png"
import normalWeightImg from "../assets/normal-weight.png"
import overweightImg from "../assets/overweight.png"
import obesityImg from "../assets/obesity.png"
import overObesity from "../assets/over-obesity.png"

function Home() {
    const weightImages = {
        "Underweight": underweightImg,
        "Normal weight": normalWeightImg,
        "Overweight": overweightImg,
        "Obesity": obesityImg,
        "Over obesity": overObesity
    }
    const [userWeight, setUserWeight] = useState()
    const [userHeight, setUserHeight] = useState()
    const [userBMI, setUserBMI] = useState()
    const [userBMICategory, setUserBMICategory] = useState("")
    const [normalWeightRange, setNormalWeightRange] = useState({ min: 0, max: 0 });

    const calculateBMI = () => {
        if (userWeight && userHeight) {
            const heightInMeters = userHeight / 100;
            const calculatedBmi = userWeight / (heightInMeters * heightInMeters);
            setUserBMI(calculatedBmi.toFixed(2));
            setUserBMICategory(getBMICategory(calculatedBmi));
        }
    };

    const getBMICategory = (userBMI) => {
        if (userBMI < 18.5) {
            return 'Underweight';
        } else if (userBMI >= 18.5 && userBMI < 24.9) {
            return 'Normal weight';
        } else if (userBMI >= 25 && userBMI < 29.9) {
            return 'Overweight';
        } else if (userBMI >= 30 && userBMI < 34.9) {
            return 'Obesity';
        } else {
            return 'Over obesity';
        }
    };

    const calculateNormalWeight = () => {
        const minWeight = (18.5 * ((userHeight / 100) ** 2)).toFixed(2);
        const maxWeight = (24.9 * ((userHeight / 100) ** 2)).toFixed(2);
        setNormalWeightRange({ min: minWeight, max: maxWeight });
    }


    const calculateButtonEvent = () => {
        calculateBMI()
        calculateNormalWeight()
    }

    return (
        <main className={`${styles.outerWrapper}`}>
            <div className={`${styles.wrapper} max-w-[500px] flex flex-col justify-center gap-4 px-4 `}>
                <h1 className={`${styles.heading2} text-center`}>BMI Calculator</h1>
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-2 '>
                        <input required onChange={(e) => setUserWeight(e.target.value)} type="text" placeholder="Your Weight" className="input input-bordered w-full max-w-xs" />
                        <input required onChange={(e) => setUserHeight(e.target.value)} type="text" placeholder="Your Height" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <button onClick={calculateButtonEvent} className='btn btn-primary text-lg'>Calculate</button>
                </div>

                <div className={`${userBMI ? "flex" : "hidden"} mt-10 flex-col gap-4`}>
                    <h2 className={`${styles.heading3}`}>Result</h2>
                    <div>
                        <p className={`${styles.paragraph1} text-lg`}>Your BMI is: {userBMI}</p>
                        <p className={`${styles.paragraph1} text-lg`}>Your normal weight should be between: {normalWeightRange.min} and {normalWeightRange.max}</p>
                    </div>

                    <div className='bg-primary-content w-fit p-4 flex flex-col items-center rounded-md gap-2'>
                        <div>
                            <img className='max-h-[240px]' src={weightImages[userBMICategory]} alt="" />
                        </div>
                        <p className={`${styles.paragraph1} text-lg`}>{userBMICategory}</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home