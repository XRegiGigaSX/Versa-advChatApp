import React from 'react'

export default function Login(props) {
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col md:flex-row flex-wrap w-full justify-center text-center">
                <div className="max-w-full w-1/1 md:w-1/3 p-4">
                    <p className="underline mb-3">Enter your username</p>
                    <input
                        className="rounded-lg p-2 text-slate-800 max-w-full"
                        type="text"
                        placeholder="Your Name..."
                        onChange={(event) => {
                            props.setUsername(event.target.value);
                        }}
                    />
                </div>
                <div className="max-w-full w-1/1 md:w-1/3 p-4">
                    <p className="underline mb-3">{props.login ? "Enter ": "Create a "}unique room ID</p>
                    <input
                        className="rounded-lg p-2 text-slate-800 max-w-full"
                        type="text"
                        placeholder="Room ID..."
                        onChange={(event) => {
                            props.setRoom(event.target.value);
                        }}
                    />
                </div>
                <div className="w-full md:w-1/3 p-4">
                    <p className="underline mb-3 max-w-full">{props.login ? "Enter ": "Create a "}room password</p>
                    <input
                        className="rounded-lg p-2 text-slate-800 max-w-full"
                        type="text"
                        placeholder="Password..."
                        onChange={(event) => {
                            props.setPassword(event.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-row w-full md:w-2/3 justify-evenly items-center">
                    <button className="mt-4 block mx-auto rounded-full p-2 shadow-lg imp-button text-xs md:text-lg" onClick={() => {props.login? props.joinRoom(): props.createRoom()}} >Join room</button>
                    <button className="mt-4 block mx-auto rounded-full text-xs md:text-lg  bg-gradient-to-r from-slate-500 to-slate-700  hover:from-slate-700 hover:to-slate-500 p-2 shadow-lg" onClick={() => props.handlePrevious()}>Go Back</button>
            </div>
        </div>
    )
}
