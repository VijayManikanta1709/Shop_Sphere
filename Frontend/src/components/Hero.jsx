import React from 'react'
import { Link } from 'react-router-dom'

import Naruto from '../img/Naruto.png';
import bgImg from '../img/download.jpg';

function Hero() {
    return (
        <section
            className="bg-red-100 h-[519px] bg-cover bg-center bg-no-repeat  bg-cover bg-center  py-24 flex justify-end items-center px-6 lg:px-0 overflow-hidden"
            style={{ backgroundImage: `url(${bgImg})` }}
        >

            <div className="container mx-auto flex justify-around h-full ">
                <div className="flex flex-col justify-center items-start max-w-lg">
                    <div className="font-semibold text-lg mb-2 flex items-center gap-3 uppercase">
                        <div className="w-10 h-[4px] rounded" style={{ background: "#8A1538" }}></div>New Trend

                    </div>
                    <h1 className='text-[70px] leadingg-[1.1] mb-4' style={{
                        fontWeight: "bolder"
                    }}>ANIME  STREET STYLE
                        <br />

                        <span
                            style={{
                                fontFamily: "'Fleur De Leah', cursive",
                                fontSize: "3rem",
                                letterSpacing: "2px",
                                fontStyle: "normal",
                                fontWeight: "590",
                            }}
                        >
                            Men / Women Special
                        </span>

                    </h1>
                    <Link to={'/'} className='self-start uppercase font-semibold  border-b-2 border-black ' style={{textDecoration:"none",  color:"black"}}>Discover More</Link>
                </div>


            </div>


            <img
                src={Naruto}
                alt="Naruto"
                style={{ filter: "drop-shadow(0px 4px 12px rgba(172, 55, 1, 1))" }}
                className='hidden lg:block'
            />

        </section>
    )
}

export default Hero
