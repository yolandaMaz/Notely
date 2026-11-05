import { useState } from "react";
import { Link } from 'react-router-dom'

function LoginPage() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        console.log({ email, password })
    }

    return(
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
                <p className="mt-1 text-sm text-slate-600">Log in to see your notes.</p>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input 
                        id="email"
                        type="email"
                        required value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="h-12 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-indigo-600" />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
                            Password
                        </label>
                        <input 
                        id="password"
                        type="password"
                        required value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your password"
                        className="h-12 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-indigo-600" />
                    </div>

                    <button
                    type="submit"
                    className="h-12 rounded-lg bg-indigo-600 font-semibold text-white hover:bg-indigo-500">
                        Log in
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-slate-600">
                    New here?{''}
                    <Link to="/register" className="font-semibold text-indigo-600 underline">
                    Create an account
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage;