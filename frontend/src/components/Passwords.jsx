import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPass, copyPass, deletePass, updatePass, ToastContainerComponent, scrollToBottom, scrollToTop } from "./PassUtils";
import { CopyIcon, EditIcon, DeleteIcon, CheckIcon, CrossIcon, ArrowUpIcon, ArrowDownIcon } from '../assets/Icons';

const Passwords = () => {
    const [passArray, setPassArray] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editablePass, setEditablePass] = useState({ username: '', site: '', password: '' });
    const [isScrollable, setIsScrollable] = useState(false);
    const [scrollPos, setScrollPos] = useState(0);

    useEffect(() => {
        const fetchPasswords = async () => {
            const pass = await getPass();
            setPassArray(Array.isArray(pass) ? pass : []); // Ensure pass is an array
        };

        fetchPasswords();
    }, []);

    useEffect(() => {
        const tableContainer = document.querySelector('.table-container');

        const handleScroll = () => {
            setScrollPos(tableContainer.scrollTop);
        };

        const checkScrollable = () => {
            setIsScrollable(tableContainer.scrollHeight > tableContainer.clientHeight || tableContainer.scrollWidth > tableContainer.clientWidth);
        };

        if (tableContainer) {
            tableContainer.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', checkScrollable);
            checkScrollable();
        }

        return () => {
            if (tableContainer) {
                tableContainer.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', checkScrollable);
            }
        };
    }, [passArray]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditablePass(prev => ({ ...prev, [name]: value }));
    };

    const handleEdited = async () => {
        const updatePassword = { ...editablePass, id: editId };
        const updatedPasswords = await updatePass(updatePassword);
        setPassArray(updatedPasswords);
        setEditId(null);
        setEditablePass({ username: '', site: '', password: '' });
        toast.success("Password Edited Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            transition: Bounce,
        });
    };

    const cancelEdit = () => {
        setEditId(null);
        toast.error("Error: Password Edit Request Cancelled", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            transition: Bounce,
        });
    };

    const handleEdit = (pass) => {
        setEditId(pass.id);
        setEditablePass({ username: pass.username, site: pass.site, password: pass.password });
    };

    const handleDelete = async (id) => {
        const updatedPasswords = await deletePass(id);
        setPassArray(updatedPasswords);
    };

    return (
        <div className="passwords relative">
            <ToastContainerComponent />
            {passArray.length === 0 && (
                <h2 className="text-center mt-40 mb-16 text-white text-4xl">
                    No Saved Passwords To Show
                    <p className="text-center mt-1 text-white text-base">First you have to save passwords to save them here.</p>
                </h2>
            )}
            {passArray.length !== 0 && (
                <>
                    <h2 className="text-center m-4 mb-7 text-white text-2xl">Your Saved Passwords Here</h2>
                    <div className="relative max-w-full flex justify-center m-10 mt-0">
                        <div className="relative w-[95%] md:w-[80%] sm:w-[70%] h-[20rem] overflow-y-auto md:overflow-x-auto sm:overflow-x-auto shadow-md scrollbar-none rounded-2xl table-container">
                            <table className="w-full text-left text-gray-100 dark:text-gray-400">
                                <thead className="sticky top-0 z-10 text-sm text-gray-100 uppercase bg-blue-800">
                                    <tr>
                                        <th scope="col" className="px-4 md:px-8 py-3">Username</th>
                                        <th scope="col" className="px-4 md:px-8 py-3">Site</th>
                                        <th scope="col" className="px-4 md:px-8 py-3">Password</th>
                                        <th scope="col" className="py-3 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {passArray.map((pass, index) => (
                                        <tr key={index} className="text-[13px] odd:bg-gray-800 even:bg-gray-900">
                                            {editId === pass.id ? (
                                                <>
                                                    <td className="px-2 py-2">
                                                        <input
                                                            type="text"
                                                            name="site"
                                                            value={editablePass.site}
                                                            onChange={handleChange}
                                                            className="text-gray-100 bg-gray-700 rounded py-1.5 text-center w-full"
                                                        />
                                                    </td>
                                                    <td className="px-2 py-2">
                                                        <input
                                                            type="text"
                                                            name="username"
                                                            value={editablePass.username}
                                                            onChange={handleChange}
                                                            className="text-gray-100 bg-gray-700 rounded py-1.5 text-center w-full"
                                                        />
                                                    </td>
                                                    <td className="px-2 py-2">
                                                        <input
                                                            type="text"
                                                            name="password"
                                                            value={editablePass.password}
                                                            onChange={handleChange}
                                                            className="text-gray-100 bg-gray-700 rounded py-1.5 text-center w-full"
                                                        />
                                                    </td>
                                                    <td className="flex gap-6 py-5 justify-center">
                                                        <button onClick={handleEdited} className="flex items-center text-green-600 hover:text-green-500 font-bold">
                                                            <CheckIcon className="mr-2" /> Save
                                                        </button>
                                                        <button onClick={cancelEdit} className="flex items-center text-red-600 hover:text-red-500 font-bold">
                                                            <CrossIcon className="mr-2" /> Cancel
                                                        </button>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="px-4 md:px-8 py-2 font-medium text-gray-100 whitespace-nowrap dark:text-white">
                                                        <a className="overflow-clip" href={pass.site} target="_blank" rel="noopener noreferrer">{pass.site}</a>
                                                    </td>
                                                    <td className="px-4 md:px-8 py-2">{pass.username}</td>
                                                    <td className="px-4 md:px-8 py-2">{pass.password}</td>
                                                    <td className="flex gap-4 py-2 justify-center">
                                                        <CopyIcon onClick={() => copyPass(pass)} />
                                                        <EditIcon onClick={() => handleEdit(pass)} />
                                                        <DeleteIcon onClick={() => handleDelete(pass.id)} />
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {isScrollable && (
                        <div className="absolute right-2 lg:right-20 md:right-16 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
                            {scrollPos > 0 && <ArrowUpIcon onClick={scrollToTop} className="cursor-pointer text-white" />}
                            {scrollPos + document.querySelector('.table-container')?.clientHeight < document.querySelector('.table-container')?.scrollHeight && (
                                <ArrowDownIcon onClick={scrollToBottom} className="cursor-pointer text-white" />
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Passwords;
