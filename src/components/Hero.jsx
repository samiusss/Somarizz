import React from 'react'
//hero section of the website
import {logo} from '../assets';
const Hero = () => {
    return (
        <header className="w-full flex justify-center items-center flex-col">
            <nav className="flex justify-between items-center w-full mb-10 pt-3">
                <img src={logo}  alt="sumarizz logo" className="w-28 object-contain"/>
                <button
                    type="button"
                    onClick={() => window.open('https://github.com/samiusss/Somarizz')}
                    className="black_btn"
                > Github
                </button>
            </nav>

            <h1 className="head_text">
                <span className="underline">Somarizz</span> articles with <br className="max-md:hidden" />
                <span className="orange_gradient">Artificial Intelligence</span>
            </h1>
            <h2 className="desc">
                Summarize articles with the power of AI. <br className="max-md:hidden" />
                Copy and paste your article below and get a summary in seconds.
            </h2>
        </header>
    )
}
export default Hero
