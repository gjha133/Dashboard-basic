import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import { useDispatch, useSelector } from 'react-redux'
import { setHorizontal, setVertical } from '../../features/toggleSlice'
import { ColorRing } from 'react-loader-spinner'
import { BsFillGrid3X2GapFill, BsList } from 'react-icons/bs'
import { changeSearch, searchUser, sortUser } from '../../features/userDetailSlice'
import { AiOutlineSearch } from 'react-icons/ai'

const User = () => {

    const { users, loading, searchData } = useSelector(store => store.app)
    const { toggle } = useSelector(store => store.toggle)
    const [select, setSelect] = useState('name')
    const [sorted, setSorted] = useState('')
    const [sortOrder, setSortOrder] = useState('asc')
    const dispatch = useDispatch()

    // const [currentPage, setCurrentPage] = useState(1);
    // const [usersPerPage] = useState(20);

    // const paginate = (array, page_size, page_number) => {
    //     return array.slice((page_number - 1) * page_size, page_number * page_size);
    // };

    useEffect(() => {
        if (sorted) dispatch(sortUser({ sortBy: sorted, order: sortOrder }))
    }, [sortOrder])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(searchUser({ searchData, select }))
    }

    if (loading) {
        return <div className='absolute left-[35%] top-[30%] sm:left-[45%] sm:top-[35%] lg:left-[47.5%] xl:left-[50%] xl:top-[40%]'>
            <ColorRing
                visible={true}
                height="150"
                width="150"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </div>
    }

    // const totalPages = Math.ceil(users.length / usersPerPage);

    // // Handle previous page click
    // const goToPreviousPage = () => {
    //     setCurrentPage((prevPage) => prevPage - 1);
    // };

    // // Handle next page click
    // const goToNextPage = () => {
    //     setCurrentPage((prevPage) => prevPage + 1);
    // };

    return (
        <div className=''>
            <div className='flex justify-between shadow-md mb-4'>
                <div className='px-3 m-3 w-[70vw] lg:w-[80vw] xl:w-[60vw] flex justify-evenly'>
                    <form
                        onSubmit={handleSubmit}
                        className='flex flex-col lg:flex-row w-full justify-evenly items-center'
                    >
                        <div className='flex justify-start'>
                            <input
                                type="search"
                                className='w-32 shadow-lg border rounded-lg px-2 sm:w-60 xl:py-1'
                                placeholder='Search...'
                                value={searchData}
                                onChange={(e) => dispatch(changeSearch(e.target.value))}
                            />
                            <button type='submit' className='px-1 shadow-lg border rounded-lg hover:bg-[#050505] hover:text-white'>
                                <AiOutlineSearch />
                            </button>
                        </div>
                        <div className='flex items-center'>
                            <label htmlFor="search" className='text-sm m-2 xl:text-base xl:m-3'>Search By: </label>
                            <select name="search" className='h-6 text-sm xl:text-base outline outline-1 rounded-lg cursor-pointer xl:h-8'
                                value={select}
                                onChange={(e) => setSelect(e.target.value)}
                            >
                                <option value='name' className='text-sm xl:text-base'>Name</option>
                                <option value='email' className='text-sm xl:text-base'>Email</option>
                                <option value='role' className='text-sm xl:text-base'>Role</option>
                            </select>
                        </div>
                        <div className='flex items-center'>
                            <label htmlFor="sort" className='text-sm m-2 xl:text-base xl:m-3'>Sort By: </label>
                            <select name="sort" className='h-6 text-sm xl:text-base outline outline-1 rounded-lg cursor-pointer xl:h-8'
                                value={sorted}
                                onChange={(e) => {
                                    setSorted(e.target.value);
                                    dispatch(sortUser({ sortBy: e.target.value, order: sortOrder }));
                                }}
                            >
                                <option value='' className='text-sm xl:text-base'>Options</option>
                                <option value='name' className='text-sm xl:text-base'>Name</option>
                                <option value='role' className='text-sm xl:text-base'>Role</option>
                            </select>
                        </div>
                        <div className='flex items-center text-sm xl:text-base justify-start mt-1 lg:flex-col lg:items-start'>
                            <label htmlFor="asc" className='mx-1'>
                                <input
                                    type="radio"
                                    name="asc"
                                    value="asc"
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    checked={sortOrder === 'asc'}
                                    className='mx-1'
                                />
                                Ascending
                            </label>
                            <label htmlFor="desc" className='mx-1'>
                                <input
                                    type="radio"
                                    name="desc"
                                    value="desc"
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    checked={sortOrder === 'desc'}
                                    className='mx-1'
                                />
                                Descending
                            </label>
                        </div>
                    </form>
                </div>
                <div className='hidden xl:flex items-center sm:flex mx-2'>
                    <button
                        className={`p-2 rounded-sm border-2 xl:mr-2 lg:mr-1 sm:mr-1 hover:bg-slate-900 hover:text-white ${toggle === 'horizontal' ? 'text-white bg-[#050505]' : ''}`}
                        onClick={() => dispatch(setHorizontal())}
                    >
                        <BsFillGrid3X2GapFill />
                    </button>
                    <button
                        className={`p-2 rounded-sm border-2 xl:mr-16 lg:mr-4 sm:mr-2 hover:bg-slate-900 hover:text-white ${toggle === 'vertical' ? 'text-white bg-[#050505]' : ''}`}
                        onClick={() => dispatch(setVertical())}
                    >
                        <BsList />
                    </button>
                </div>
            </div>
            <table className={`${toggle === 'vertical' ? 'flex flex-col': 'flex flex-row flex-wrap' }`}>
                {
                    toggle === 'vertical' ? (
                        <table className='shadow-md border p-3 w-[80vw]'>
                            <thead className='grid grid-cols-4 gap-4 text-center'>
                                <tr className='font-bold text-xl py-2'>Name</tr>
                                <tr className='font-bold text-xl py-2'>Email</tr>
                                <tr className='font-bold text-xl py-2'>Role</tr>
                                <tr className='font-bold text-xl py-2'>Actions</tr>
                            </thead>
                            <tbody>
                                {
                                    users?.map(user => <UserCard key={user.id} user={user} />)
                                }
                            </tbody>
                        </table>
                    )
                        : users?.map(user => <UserCard key={user.id} user={user} />)
                }
                {/* {
                    toggle === "vertical" ? (
                        <table className="border-brown-400 border-2 p-3 w-[80vw]">
                            <thead className="flex justify-evenly">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginate(users, usersPerPage, currentPage).map((user) => (
                                    <UserCard key={user.id} user={user} />
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        paginate(users, usersPerPage, currentPage).map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))
                    )
                }
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md border-2 m-2"
                >
                    {`<`}
                </button>
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md border-2 m-2"
                >
                    {`>`}
                </button>
            </div> */}
            </table>
        </div>
    )
}

export default User