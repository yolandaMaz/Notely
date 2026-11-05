import Navbar from '../components/Navbar'
import { LuNotebookPen } from 'react-icons/lu';

function WelcomePage() {
    return(
        <div className='flex min-h-screen flex-col bg-slate-900'>
            <Navbar />
            <main className='flex flex-1 flex-col items-center justify-center gap-2 px-4 text-center'>
                <span className='mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 sm:h-20 sm:w-20'>
                    <LuNotebookPen className='text-3xl text-indigo-200 sm:text-4xl' />
                </span>
                <h1 className='text-5xl font-extrabold text-white sm:text-6xl md:text-7xl'>
                    Notely
                </h1>
                <p className='text-base text-slate-300 sm:text-lg md:text-xl'>
                    Your private notes app
                </p>
            </main>
        </div>
    )
}

export default WelcomePage;