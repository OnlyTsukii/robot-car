import React from 'react';
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon
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
  ControlRequest
} from "@/app/lib/websocket"

export default function ControlPanel({
  sendMessage,
  selectedItem
}: {
  sendMessage: Function;
  selectedItem: number
}) {

  function handleClick(param: number) {
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
              onClick={() => handleClick(MoveLeftForward)}
              className="bg-gradient-to-tl from-blue-500 to-indigo-600 hover:from-green-500 hover:to-blue-600 rounded-tl-3xl grid place-items-center w-full h-28 inline-flex flex rounded-md text-white"
            >
              <ChevronDoubleUpIcon className="transition ease-in-out active:-translate-x-1 active:-translate-y-1 active:scale-110 duration-200 h-12 w-12 -rotate-45" aria-hidden="true" />
            </button>
          </div>
          <div className='col-span-1 '>
            <button
              type="button"
              onClick={() => handleClick(MoveForward)}
              className="bg-gradient-to-t from-blue-500 to-indigo-600 hover:from-green-500 hover:to-blue-600 grid place-items-center w-full h-28 inline-flex flex rounded-md bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <ChevronDoubleUpIcon className="transition ease-in-out active:-translate-y-1 active:scale-110 duration-200 h-12 w-12" aria-hidden="true" />
            </button>
          </div>
          <div className='col-span-1 '>
            <button
              type="button"
              onClick={() => handleClick(MoveRightForward)}
              className="bg-gradient-to-tr from-blue-500 to-indigo-600 hover:from-green-500 hover:to-blue-600 rounded-tr-3xl grid place-items-center w-full h-28 inline-flex flex rounded-md bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <ChevronDoubleUpIcon className="transition ease-in-out active:translate-x-1 active:-translate-y-1 active:scale-110 duration-200 h-12 w-12 rotate-45" aria-hidden="true" />
            </button>
          </div>
          <div className='col-span-1 '>
            <button
              type="button"
              onClick={() => handleClick(MoveLeft)}
              className="bg-gradient-to-l from-blue-500 to-indigo-600 hover:from-green-500 hover:to-blue-600 grid place-items-center w-full h-28 inline-flex flex rounded-md bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <ChevronDoubleLeftIcon className="transition ease-in-out active:-translate-x-1 active:scale-110 duration-200 h-12 w-12" aria-hidden="true" />
            </button>
          </div>
          <div className='col-span-1  grid grid-rows-3 pt-1'>
            <button
              type="button"
              onClick={() => handleClick(SpeedUp)}
              className="bg-blue-500 hover:bg-indigo-600 text-sm font-semibold grid row-span-1 place-items-center w-full h-8 inline-flex flex rounded-md text-white shadow-sm"
            >
              SPEED UP
            </button>
            <button
              type="button"
              onClick={() => handleClick(Pause)}
              className="bg-blue-500 hover:bg-indigo-600 text-sm font-semibold grid row-span-1 place-items-center w-full h-8 inline-flex flex rounded-md text-white shadow-sm"
            >
              PAUSE
            </button>
            <button
              type="button"
              onClick={() => handleClick(SlowDown)}
              className="bg-blue-500 hover:bg-indigo-600 text-sm font-semibold grid row-span-1 place-items-center w-full h-8 inline-flex flex rounded-md text-white shadow-sm">
              SLOW DOWN
            </button>
          </div>
          <div className='col-span-1 '>
            <button
              type="button"
              onClick={() => handleClick(MoveRight)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-green-500 hover:to-blue-600 grid place-items-center w-full h-28 inline-flex flex rounded-md bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <ChevronDoubleRightIcon className="transition ease-in-out active:translate-x-1 active:scale-110 duration-200 h-12 w-12" aria-hidden="true" />
            </button>
          </div>
          <div className='col-span-1 '>
            <button
              type="button"
              onClick={() => handleClick(MoveLeftBackward)}
              className="bg-gradient-to-bl from-blue-500 to-indigo-600 hover:from-green-500 hover:to-blue-600 rounded-bl-3xl grid place-items-center w-full h-28 inline-flex flex rounded-md bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <ChevronDoubleDownIcon className="transition ease-in-out active:-translate-x-1 active:translate-y-1 active:scale-110 duration-200 h-12 w-12 rotate-45" aria-hidden="true" />
            </button>
          </div>
          <div className='col-span-1 '>
            <button
              type="button"
              onClick={() => handleClick(MoveBackward)}
              className="bg-gradient-to-b from-blue-500 to-indigo-600 hover:from-green-500 hover:to-blue-600 grid place-items-center w-full h-28 inline-flex flex rounded-md bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <ChevronDoubleDownIcon className="transition ease-in-out active:translate-y-1 active:scale-110 duration-200 h-12 w-12 " aria-hidden="true" />
            </button>
          </div>
          <div className='col-span-1 '>
            <button
              type="button"
              onClick={() => handleClick(MoveRightBackward)}
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
