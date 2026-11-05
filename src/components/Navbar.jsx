import { Link } from 'react-router-dom'
import { LuNotebookPen } from 'react-icons/lu'
import { FiUserPlus, FiUser } from 'react-icons/fi'

function Navbar() {
    return(
        <nav className='flex items-center justify-between px-4 py-4 sm:px-6 md:px-16'>
            <Link
            to="/"
            className='flex items-center gap-2 text-lg font-extrabold text-white sm:text-xl'>
                <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600'>
                    <LuNotebookPen className="text-indigo-200" />
                </span>
                Notely
            </Link>

            <div className='flex items-center gap-2 sm:gap-3'>
                <Link
                to="/login"
                className='hidden px-4 py-2 text-sm font-medium text-slate-200 hover:text-white sm:block'>
                    Log in
                </Link>
                <Link 
                to="/register"
                aria-label="Create account"
                className='flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 sm:px-4'>
                    <FiUserPlus size={18} />
                    <span className='hidden sm:inline'>Create account</span>
                </Link>
                <Link 
                to="/login"
                aria-label="Profile"
                className='flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 bg-slate-800 text-slate-200'>
                    <FiUser size={18} />
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;