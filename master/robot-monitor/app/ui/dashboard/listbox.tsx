'use client'

import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, MagnifyingGlassIcon, LinkIcon } from '@heroicons/react/20/solid'
import { 
  ScanRequest,
  DisconnectRequest 
} from '../../lib/websocket';
import { ReadyState } from 'react-use-websocket';
import { interfaces } from '@/app/lib/data';
import clsx from 'clsx';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ListBox({
  setLoading,
  sendMessage,
  readyState,
  showAlert,
  loading,
  setSelectedItem,
  connectStatus,
  setDevices,
}: {
  setLoading: Function;
  sendMessage: Function;
  readyState: number;
  showAlert: Function;
  loading: boolean;
  setSelectedItem: Function;
  connectStatus: boolean;
  setDevices: Function;
}) {
  const [selected, setSelected] = useState(interfaces[0])

  useEffect(() => {
    setSelectedItem(selected.id)
    setDevices([])
  }, [selected])

  function searchDevice() {
    if (readyState != ReadyState.OPEN) {
      const temp = {
        alertType: "warning",
        open: true,
        alertMsg: "Connection is not established !"
      };
      showAlert(temp)
      return
    }
    setLoading(true)
    sendMessage(JSON.stringify({
      deviceType: selected.id,
      requestType: ScanRequest
    }))
  }

  function handleDisconnect() {
    setLoading(true)
    sendMessage(JSON.stringify({
      deviceType: selected.id,
      requestType: DisconnectRequest
    }))
  }

  return (
    <div className='grid grid-cols-4'>
      <div className='col-span-2'>
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              {/* <Listbox.Label className="block text-base mr-4 font-medium leading-6 text-gray-900 flex items-center">Switch to</Listbox.Label> */}
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                  <span className="flex items-center">
                    <img src={selected.icon} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                    <span className="ml-3 block truncate">{selected.name}</span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {interfaces.map((person) => (
                      <Listbox.Option
                        key={person.id}
                        className={({ active }) =>
                          classNames(
                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                            'relative cursor-default select-none py-2 pl-3 pr-9'
                          )
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <img src={person.icon} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                              <span
                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                              >
                                {person.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
      <div className='flex col-span-2 grid justify-items-end'>
        <button
          type="button"
          disabled={selected.id > 1 || loading}
          onClick={searchDevice}
          className={clsx(
            "inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
            {
              'hidden': connectStatus == true
            }
          )}
        >
          <MagnifyingGlassIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          <div className='whitespace-nowrap'>Search Devices</div>
        </button>
        <button
          type="button"
          onClick={handleDisconnect}
          className={
            clsx(
              "inline-flex rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
              {
                'hidden': connectStatus == false
              }
            )
          }
        >
          <LinkIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          <div className='whitespace-nowrap'>Disconnect</div>
        </button>
      </div>
    </div>
  )
}