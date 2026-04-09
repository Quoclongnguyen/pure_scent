import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

const Pagination = ({ page, pages, setPage }) => {
    if (pages <= 1) return null //Nếu chỉ có 1 trang thì không hiện thanh phân trang
    return (
        <div className='flex justify-center items-center gap-8 pt-16 border-t border-gray-100 mt-12 text-[10px] tracking-[0.2rem] font-bold'>
            <button onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className={`transition-colors cursor-pointer ${page === 1 ? 'text-gray-100' : 'text-gray-300 hover:text-black'}`}>
                <ChevronLeft size={20} strokeWidth={1.5} />
            </button>

            <div className='flex gap-6'>
                {[...Array(pages).keys()].map((x) => (
                    <span
                        key={x + 1}
                        onClick={() => setPage(x + 1)}
                        className={`cursor-pointer transition-colors pb-1 \
                        ${page === x + 1
                                ? 'text-black border-b border-black'
                                : 'text-gray-400 hover:text-black'
                            } 
                        `}>
                        {(x + 1).toString().padStart(2, '0')}
                    </span>
                ))}
            </div>
            <button
                onClick={() => setPage(Math.min(pages, page + 1))}
                disabled={page === pages}
                className={`transition-colors cursor-pointer ${page === pages ? 'text-gray-100' : 'text-gray-300 hover:text-black'}`}
            >
                <ChevronRight size={20} strokeWidth={1.5} />
            </button>
        </div>
    )
}

export default Pagination