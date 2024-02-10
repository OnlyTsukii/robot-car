import React from 'react';
import {
    ChevronDoubleDownIcon,
    ChevronDoubleUpIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ArrowUturnLeftIcon,
    ArrowUturnRightIcon
} from '@heroicons/react/24/outline';

import {
    ConnectRequest,
    MoveForward,
    MoveBackward,
    MoveLeft,
    MoveRight,
    MoveLeftForward,
    MoveRightForward,
    MoveLeftBackward,
    MoveRightBackward,
    SpeedUp,
    SlowDown,
    Pause,
    ControlRequest,
    ClockwiseSpin,
    CounterClockwiseSpin
} from "@/app/lib/websocket"

export default function ControlPanel({
    sendMessage,
    selectedItem
}: {
    sendMessage: Function;
    selectedItem: number
}) {

    function handleEvent(param: number) {
        sendMessage(JSON.stringify({
            deviceType: selectedItem,
            requestType: ControlRequest,
            requestBody: {
                controlParam: param
            }
        }))
    }

    return (
        <>
            <div className='w-full flex justify-center mt-20'>
                <div className='w-96 grid grid-cols-3 gap-4'>
                    <div className='col-span-1'>
                        <button
                            type="button"
                            onMouseDown={() => handleEvent(MoveLeftForward)}
                            onMouseUp={() => handleEvent(Pause)}
                            className="bg-gradient-to-tl from-blue-500 to-indigo-600 hover:from-green-500 hover:to-blue-600 rounded-tl-3xl grid place-items-center w-full h-28 inline-flex flex rounded-md text-white"
                        >
                            <ChevronDoubleUpIcon className="transition ease-in-out active:-translate-x-1 active:-translate-y-1 active:scale-110 duration-200 h-12 w-12 -rotate-45" aria-hidden="true" />
                        </button>
                    </div>
                    <div className='col-span-1 '>
                        <button
                            type="button"
                            onMouseDown={() => handleEvent(MoveForward)}
                            onMouseUp={() => handleEvent(Pause)}
                            className="bg-gradient-to-t from-blue-500 to-indigo-600 hover:from-green-500 hover:to-blue-600 grid place-items-center w-full h-28 inline-flex flex rounded-md bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <ChevronDoubleUpIcon className="transition ease-in-out active:-translate-y-1 active:scale-110 duration-200 h-12 w-12" aria-hidden="true" />
                        </button>
                    </div>
                    <div className='col-span-1 '>
                        <button
                            type="button"
                            onMouseDown={() => handleEvent(MoveRightForward)}
                            onMouseUp={() => handleEvent(Pause)}
                            className="bg-gradient-to-tr from-blue-500 to-indigo-600 hover:from-green-500 hover:to-blue-600 rounded-tr-3xl grid place-items-center w-full h-28 inline-flex flex rounded-md bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <ChevronDoubleUpIcon className="transition ease-in-out active:translate-x-1 active:-translate-y-1 active:scale-110 duration-200 h-12 w-12 rotate-45" aria-hidden="true" />
                        </button>
                    </div>
                    <div className='col-span-1 '>
                        <button
                            type="button"
                            onMouseDown={() => handleEvent(MoveLeft)}
                            onMouseUp={() => handleEvent(Pause)}
                            className="bg-gradient-to-l from-blue-500 to-indigo-600 hover:from-green-500 hover:to-blue-600 grid place-items-center w-full h-28 inline-flex flex rounded-md bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <ChevronDoubleLeftIcon className="transition ease-in-out active:-translate-x-1 active:scale-110 duration-200 h-12 w-12" aria-hidden="true" />
                        </button>
                    </div>
                    <div className='col-span-1 grid grid-rows-2 pt-1'>
                        <button
                            type="button"
                            onClick={() => handleEvent(SpeedUp)}
                            className="bg-blue-500 hover:bg-indigo-600 text-sm font-semibold grid row-span-1 place-items-center w-full h-8 inline-flex flex rounded-md text-white shadow-sm"
                        >
                            SPEED UP
                        </button>
                        <div className='row-span-1 grid grid-cols-2 gap-1'>
                            <button
                                type="button"
                                onMouseDown={() => handleEvent(ClockwiseSpin)}
                                onMouseUp={() => handleEvent(Pause)}
                                className="bg-blue-500 hover:bg-indigo-600 text-sm grid col-span-1 place-items-center w-full h-8 inline-flex flex rounded-md text-white shadow-sm">
                                <ArrowUturnLeftIcon className="font-semibold transition ease-in-out active:-translate-x-1 active:translate-y-1 active:scale-110 duration-200 h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                onMouseDown={() => handleEvent(CounterClockwiseSpin)}
                                onMouseUp={() => handleEvent(Pause)}
                                className="bg-blue-500 hover:bg-indigo-600 text-sm font-semibold grid col-span-1 place-items-center w-full h-8 inline-flex flex rounded-md text-white shadow-sm">
                                <ArrowUturnRightIcon className="font-semibold transition ease-in-out active:-translate-x-1 active:translate-y-1 active:scale-110 duration-200 h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleEvent(SlowDown)}
                            className="bg-blue-500 hover:bg-indigo-600 text-sm font-semibold grid row-span-1 place-items-center w-full h-8 inline-flex flex rounded-md text-white shadow-sm">
                            SLOW DOWN
                        </button>
                    </div>
                    <div className='col-span-1 '>
                        <button
                            type="button"
                            onMouseDown={() => handleEvent(MoveRight)}
                            onMouseUp={() => handleEvent(Pause)}
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-green-500 hover:to-blue-600 grid place-items-center w-full h-28 inline-flex flex rounded-md bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <ChevronDoubleRightIcon className="transition ease-in-out active:translate-x-1 active:scale-110 duration-200 h-12 w-12" aria-hidden="true" />
                        </button>
                    </div>
                    <div className='col-span-1 '>
                        <button
                            type="button"
                            onMouseDown={() => handleEvent(MoveLeftBackward)}
                            onMouseUp={() => handleEvent(Pause)}
                            className="bg-gradient-to-bl from-blue-500 to-indigo-600 hover:from-green-500 hover:to-blue-600 rounded-bl-3xl grid place-items-center w-full h-28 inline-flex flex rounded-md bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <ChevronDoubleDownIcon className="transition ease-in-out active:-translate-x-1 active:translate-y-1 active:scale-110 duration-200 h-12 w-12 rotate-45" aria-hidden="true" />
                        </button>
                    </div>
                    <div className='col-span-1 '>
                        <button
                            type="button"
                            onMouseDown={() => handleEvent(MoveBackward)}
                            onMouseUp={() => handleEvent(Pause)}
                            className="bg-gradient-to-b from-blue-500 to-indigo-600 hover:from-green-500 hover:to-blue-600 grid place-items-center w-full h-28 inline-flex flex rounded-md bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <ChevronDoubleDownIcon className="transition ease-in-out active:translate-y-1 active:scale-110 duration-200 h-12 w-12 " aria-hidden="true" />
                        </button>
                    </div>
                    <div className='col-span-1 '>
                        <button
                            type="button"
                            onMouseDown={() => handleEvent(MoveRightBackward)}
                            onMouseUp={() => handleEvent(Pause)}
                            className="bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-green-500 hover:to-blue-600 rounded-br-3xl grid place-items-center w-full h-28 inline-flex flex rounded-md bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <ChevronDoubleDownIcon className="transition ease-in-out active:translate-x-1 active:translate-y-1 active:scale-110 duration-200 h-12 w-12 -rotate-45" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
