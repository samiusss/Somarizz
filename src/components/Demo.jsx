import React, {useState} from 'react'
import {useEffect} from "react";
import {copy, linkIcon, tick, loader} from '../assets';
import {useLazyGetSummaryQuery} from "../services/article";
//show the summary part of the article
const Demo = () => {

    const [article, setArticle] = useState({
        url: "",
        summary: "",
    });

    const [copied, setCopied] = useState("")

    const handleCopy = (copyUrl) => {
        setCopied(copyUrl)
        navigator.clipboard.writeText(copyUrl);
        setTimeout(()=> {setCopied(false)}, 3000);
    }

    const [allArticles, setAllArticles] = useState([]);

    const [getSummary, {error, isFetching }] = useLazyGetSummaryQuery();

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles"));

        if (articlesFromLocalStorage) {
            setAllArticles(articlesFromLocalStorage);
        }

    }, []);
    const handleSubmit = async(event) => {
        event.preventDefault();

        const {data} = await getSummary({articleUrl: article.url});

        if (data?.summary) {
            const newArticle = { ...article, summary: data.summary};

            const updatedAllArticles = [newArticle, ...allArticles];
            setArticle(newArticle);
            setAllArticles(updatedAllArticles);
            localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
            console.log(newArticle);
        }

        if (error) {
            console.error(error);
        }
    }

    return (
        <section className="mt-16 w-full max-w-xl">
            {/*Search bar*/}
            <div className="flex flex-col w-full gap-2">
                <form className="relative flex justify-center item-center" onSubmit={handleSubmit}>
                    <img
                        src={linkIcon}
                        alt="link icon"
                        className="absolute left-0 my-2.5 ml-3 w-5"
                    />
                    <input
                        type="url"
                        placeholder="Enter a URL"
                        value={article.url}
                        onChange={(event) => {setArticle({
                            article, url: event.target.value
                        })}}
                        required
                        className="url_input peer"
                    />
                    <button
                        type="submit"
                        className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
                    >
                        Submit
                    </button>
                </form>

                <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                    {allArticles.map((item, index) => (
                        <div
                        key={`link-${index}`}
                        onClick={() => setArticle(item)}
                        className="link_card"
                        >
                            <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                                <img
                                    src={copied === item.url ? tick : copy}
                                    alt="copy icon"
                                    className="w-[40%] h-[40%] object-contain"
                                />
                            </div>
                            <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                                {item.url}
                            </p>
                        </div>
                    ))}
                </div>

                <span className="my-10 max-w-full flex juftify-center items-center">
                    {isFetching ? (
                        <img
                            src={loader}
                            alt="loading"
                            className="w-20 h-20 object-contain justify-center items-center"
                        />
                    ): error ? (
                        <p className="font-inter font-bold text-center text-black">
                            Sorry, no results were found for this URL...
                            <span className="font-satoshi font-normal text-gray-700">{error?.data?.error}</span>
                        </p>
                    ) : (
                        article.summary && (
                            <div className="flex flex-col gap-3">
                                <h2 className="blue_gradient">
                                    <span className="blue_gradient">Summary</span>
                                </h2>
                                <div className="summary_box">
                                    <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
                                </div>
                            </div>
                        )
                    )}
                </span>
                </div>
        </section>
    )
}
export default Demo
