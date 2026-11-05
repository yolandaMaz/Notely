import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LuNotebookPen } from 'react-icons/lu';
import { FiSearch, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

const TAGS = {
    Work: { card: 'bg-blue-100', chip: 'text-blue-900', dot: 'bg-blue-400'},
    Ideas: { card: 'bg-amber-100', chip: 'text-amber-900', dot: 'bg-amber-400'},
    Personal: { card: 'bg-green-100', chip: 'text-green-900', dot: 'bg-green-400'},
    Study: { card: 'bg-pink-100', chip: 'text-pink-900', dot: 'bg-pink-400'},
}

const START_NOTES = [
    { id: 1, title: 'Team meeting', text: 'Prepare the weekly update.', tag: 'Work', date: '05/11/2026'},
    { id: 2, title: 'App idea', text: 'A habit tracker with streaks.', tag: 'Ideas', date: '04/11/2026'},
]

const EMPTY_FORM = { title: '', text: '', tag: 'Work' }


function DashboardPage() {
    const [ notes, setNotes ] = useState(START_NOTES)
    const [ search, setSearch ] = useState('')
    const [ activeTag, setActiveTag ] = useState('ALL')
    const [ form, setForm ] = useState(EMPTY_FORM)
    const [ editingId, setEditingId ] = useState(null)

    const visibleNotes = notes.filter(
        (n) => (activeTag === 'All' || n.tag === activeTag) &&
        (n.title + n.text).toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )

    function resetForm() {
        setForm(EMPTY_FORM)
        setEditingId(null)
    }

    function handleSave(e) {
        e.preventDefault()
        if (editingId) {
            setNotes(notes.map((n) => (n.id === editingId ? { ...n, ...form } : n)))
        } else {
            const newNote = { id: Date.now(), ...form, date: new Date().toLocaleDateString()}
            setNotes([newNote, ...notes])
        }
        resetForm()
    }

    function startEdit(note) {
        setEditingId(note.id)
        setForm({ title: note.title, text: note.text, tag: note.tag })
    }

    function handleDelete(id) {
        setNotes(notes.filter((n) => n.id !== id))
        if (editingId === id) resetForm()
    }

    function navClass(name) {
        return `flex h-11 w-full items-center justify-between rounded-lg px-3 text-left text-sm font-medium ${activeTag === name ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800' }`
    }

    return(
        <div className='flex min-h-screen bg-slate-50'>
            {/* Sidebar (large screens only) */}
            <aside className='hidden w-60 shrink-0 flex-col ng-slate-900 p-4 lg:flex'>
                <div className='flex items-center gap-2 px-3 pb-5 text-xl font-extrabold text-white'>
                    <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600'>
                        <LuNotebookPen className='text-indigo-200' />
                    </span>
                    Notely
                </div>

                <button onClick={() => setActiveTag('All')} className={navClass('All')}>
                    <span>All notes</span>
                    <span className='text-xs opacity-80'>{notes.length}</span>
                </button>

                <p className='mb-1 mt-5 px-3 text-xs font-semibold tracking-wider text-slate-400'>TAGS</p>
                {Object.keys(TAGS).map((tag) => (
                    <button key={tag} onClick={() => setActiveTag(tag)} className={navClass(tag)}>
                        <span className='flex items-center gap-2'>
                            <span className={`h-2.5 w-2.5 rounded-full ${TAGS[tag].dot}`} />
                            {tag}
                        </span>
                    </button>
                ))}

                <div className='mt-auto flex items-center gap-3 rounded-xl bg-slate-800 p-3'>
                    <span className='flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white'>
                        U
                    </span>
                    <span className='flex-1 truncate text-sm font-medium text-white'>Your name</span>
                    <Link 
                    to="/"
                    className='flex h-11 items-center rounded-lg border border-slate-600 px-3 text-xs font-medium text-slate-200 hover:bg-slate-700'>
                        Logout
                    </Link>
                </div>
            </aside>

            <div className='flex min-w-0 flex-1 flex-col lg:flex-row'>
                {/* Main area */}
                <main className='min-w-0 flex-1 p-4 sm:p-7'>
                    {/* Top bar (small screens only) */}
                    <div className='mb-4 flex items-center justify-between lg:hidden'>
                        <span className='flex items-center gap-2 text-lg font-extrabold text-slate-900'>
                            <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600'>
                                <LuNotebookPen className='text-indigo-200' />
                            </span>
                            Notely
                        </span>
                        <Link t0="/" className='flex h-11 items-center rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-700'>
                        Logout
                        </Link>
                    </div>

                    {/* Search + new note */}
                    <div className='flex gap-3'>
                        <div className='relative flex-1'>
                            <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-500' />
                            <input 
                            type="search"
                            aria-label='Search notes'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search your notes'
                            className='h-12 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 outline-none focus:border-indigo-600' />
                        </div>
                        <button 
                        onClick={resetForm}
                        className='flex h-12 items-center gap-1 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-500'>
                            <FiPlus /> 
                            <span className='hidden sm:inline'>New note</span>
                        </button>
                    </div>

                    {/* Tag filter(small screens only) */}
                    <div className='mt-4 flex gap-2 overflow-x-auto lg:hidden'>
                        {[ 'All', ...Object.keys(TAGS)].map((tag) => (
                           <button 
                           key={tag}
                           onClick={() => setActiveTag(tag)} 
                           className={`h-11 shrink-0 rounded-full border px-4 text-sm font-medium ${
                            activeTag === tag ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white text-slate-700'
                           }`} >
                            {tag}
                           </button>
                         ))}
                    </div>

                    <h1 className='mt-6 text-2xl font-extrabold text-slate-900'>
                        {activeTag === 'All' ? 'All notes' : activeTag}
                    </h1>

                    {/* Notes grid */}
                    <div className='mt-4 grid gap-4 sm:grid-cols-2'>
                        {visibleNotes.map((note) => (
                            <div key={note.id} className={`flex flex-col gap-2 rounded-2xl p-4 ${TAGS[note.tag].card}`}>
                                <div className='flex items-center justify-between'>
                                    <span className={`rounded-full bg-white px-2.5 py-1 text-xs font-semibold ${TAGS[note.tag].chip}`}>
                                        {note.tag}
                                    </span>
                                    <span className='text-xs text-slate-700'>{note.date}</span>
                                </div>
                                <h2 className='text-lg font-bold text-slate-900'>{note.title}</h2>
                                <p className='line-clamp-3 text-sm text-slate-800'>{note.text}</p>
                                <div className='mt-1 flex gap-2'>
                                    <button 
                                    aria-label="Edit note"
                                    onClick={() => startEdit(note)}
                                    className='flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700'>
                                        <FiEdit2 />
                                    </button>
                                    <button 
                                    aria-label="Delete note"
                                    onClick={() => handleDelete(note.id)}
                                    className='flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-red-700'>
                                        <FiTrash2 />
                                    </button>
                                </div>
                                </div>
                        ))}
                    </div>

                    {visibleNotes.length === 0 && (
                        <p className='mt-6 text-slate-600'>No notes found. Write one in the form.</p>
                    )}
                </main>

                {/* Editor panel */}
                <aside className='w-full shrink-0 border-t border-slate-200 bg-white p-6 lg:w-80 lg:border-l lg:border-t-0'>
                    <h2 className='text-lg font-bold text-slate-900'>
                        {editingId ? 'Edit note' : 'New note'}
                    </h2>
                    <form onSubmit={handleSave} className='mt-4 flex flex-col gap-4'>
                        <div>
                            <label htmlFor="title" className='mb-1 block text-sm font-medium text-slate-700'>Title</label>
                            <input 
                            id="title"
                            required value={form.title}
                            onChange={(e) => setForm({...form, title: e.target.value})}
                            placeholder='Note title'
                            className='h-12 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-indigo-600' />
                        </div>
                        <div>
                            <label htmlFor="text" className='mb-1 block text-sm font-medium text-slate-700'>Note</label>
                            <textarea 
                            id="text"
                            required value={form.text}
                            onChange={(e) => setForm({ ...form, text: e.target.value})}
                            placeholder='Write something private...'
                            className='h-40 w-full resize-none rounded-lg border border-slate-300 p-3 outline-none focus:border-indigo-600' />
                        </div>
                        <div>
                            <label htmlFor="tag" className='mb-1 block text-sm font-medium text-slate-700'>Tag</label>
                            <select 
                            id="tag"
                            value={form.tag}
                            onChange={(e) => setForm({ ...form, tag: e.target.value})}
                            className='h-12 w-full rounded-lg border border-slate-300 bg-white px-3 outline-none focus:border-indigo-600'>
                                {Object.keys(TAGS).map((tag) => (
                                    <option key={tag}>{tag}</option>
                                ))}
                            </select>
                        </div>
                        <button 
                        type="submit"
                        className='h-12 rounded-lg bg-indigo-600 font-semibold text-white hover:bg-indigo-500'>
                            {editingId ? 'Save changes' : 'Add note'}
                        </button>
                    </form>
                </aside>
            </div>
        </div>
    )
} 

export default DashboardPage;