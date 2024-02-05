import getApps from "@/utils/api";
import { useUser } from "@auth0/nextjs-auth0/client"
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion'


export default function Home() {
    const { user, isLoading } = useUser();
    const router = useRouter();
    const [apps, setApps] = useState([]);
    const [page, setPage] = useState(1)
    const [offset, setOffset] = useState(0)
    const [per_page, setPer_page] = useState(12)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    function nextPage() {
        setLoading(true);
        setApps([])
        setPage(page + 1)
        getApps(page + 1, per_page, search).then((res) => {
            console.log(res)
            setLoading(false)
            setApps(res.items)
        })

    }
    function prevPage() {
        if (page > 0) {
            setLoading(true);
            setApps([])
            setPage(page - 1)
            setOffset(offset - per_page)
            getApps(page - 1, per_page, search).then((res) => {
                console.log(res)
                setLoading(false)
                setApps(res.items)
            })
        }
    }
    function searchApps() {
        setApps([])
        getApps(1, 12, 0, search).then((res) => {
            console.log(res)
            setApps(res.items)
        });
        scrollToElement();
    }

    useEffect(() => {
        setApps([])
        if (!isLoading && !user) {
            router.push("/")
        }

        getApps(1, 12, 0, search).then((res) => {
            console.log(res)
            setApps(res.items)
        })
    }, [user])

    const divRef = useRef();

    const scrollToElement = () => {
        const { current } = divRef
        if (current !== null) {
            current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
        }
    }





    return (
        <div>
            <div className="bg-cover h-screen bg-[url('/brown_grey.png')] justify-center flex flex-col ">
                <div className="overflow-hidden overflow-y-auto">
                    <div className="py-24 sm:py-32 lg:pb-40 justify-center flex">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8 justify-center flex">
                            <div className="mx-auto max-w-2xl text-center">
                                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-6xl">
                                    Discover what vision pro can do for you.
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-50">
                                    {/* We&lsquo;re here to help you leverage Vision Pro and find the best Spatial reality tools. */}
                                    Explore the possibilities of spatial computing from your web browser!
                                </p>
                                <div className="mt-2 flex flex-row">
                                    <input
                                        value={search}
                                        onChange={(e) => { setSearch(e.target.value) }}
                                        type="search"
                                        name="search"
                                        id="search"
                                        className="pl-3 block w-full bg-opacity-15 rounded-md border-0 py-1.5 text-slate-50 shadow-sm bg-slate-50 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blacksm:text-sm sm:leading-6"
                                        placeholder="Search for a tool or use case..."
                                    />
                                    <br/>
                                    <button className=" hover:text-[#9d9d9d] hover:backdrop-blur-lg text-slate-50 shadow-lg overflow-hidden rounded-md border  px-4 ml-2 backdrop-blur-md" onClick={searchApps}>
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <motion.div
                    
                        className="flex justify-center mb-40">
                        <motion.div  onClick={prevPage} whileTap={{ scale: 0.9 }} className="w-2 self-center cursor-pointer bg-white mx-5 p-2 rounded-lg bg-opacity-20 hover:bg-opacity-40 backdrop-blur-md shadow-lg h-20">
                        </motion.div>
                        <div ref={divRef} className="flex flex-col">
                            <div className="bg-white max-w-[1000px] min-w-[1000px] min-h-[750px] p-10 rounded-lg bg-opacity-20 backdrop-blur-md shadow-lg">
                                <ul role="list" className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                                    {apps.map((file) => (
                                        <motion.div  onClick={() => { window.open(file.url) }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} key={file.thumbnail} className="col-span-1 rounded-lg cursor-pointer">
                                            <Image width={440} height={440} src={file.thumbnail} alt="" className="rounded-md w-44 h-44 pointer-events-none object-cover group-hover:opacity-75" />
                                            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-white">{file.name}</p>
                                        </motion.div>
                                    ))}
                                </ul>
                            </div>
                            <motion.div whileTap={{ scale: 0.9 }} className="w-60 self-center cursor-pointer bg-white my-5 p-2 rounded-lg bg-opacity-20 hover:bg-opacity-40 backdrop-blur-md shadow-lg h-2">
                            </motion.div>
                        </div>
                        <motion.div onClick={nextPage} whileTap={{ scale: 0.9 }} className="w-2 self-center cursor-pointer bg-white mx-5 p-2 rounded-lg bg-opacity-20 hover:bg-opacity-40 backdrop-blur-md shadow-lg h-20">
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}