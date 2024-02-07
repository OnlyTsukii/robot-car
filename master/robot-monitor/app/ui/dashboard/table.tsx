import { Device } from "@/app/lib/definitions";
import { LinkIcon } from "@heroicons/react/24/outline";
import { ConnectRequest } from "@/app/lib/websocket";
import ControlPanel from "@/app/ui/dashboard/control_panel"

export default function DeviceList({
  devices,
  loading,
  setLoading,
  sendMessage,
  selectedItem,
  connectStatus,
}: {
  devices: Device[];
  loading: boolean;
  setLoading: Function;
  sendMessage: Function;
  selectedItem: number;
  connectStatus: boolean;
}) {

  function handleConnect(index: number) {
    setLoading(true)
    sendMessage(JSON.stringify({
      deviceType: selectedItem,
      requestType: ConnectRequest,
      requestBody: {
        connectDevice: devices[index].address
      }
    }))
  }

  if (connectStatus) {
    return loading ? (
      <div className="w-full grid justify-items-center">
        <div
          className="mt-8 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
        </div>
      </div>
    ) : (
      <ControlPanel sendMessage={sendMessage} selectedItem={selectedItem}></ControlPanel>
    );
  }

  if (devices.length === 0) {
    return loading ? (
      <div className="w-full grid justify-items-center">
        <div
          className="mt-8 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
        </div>
      </div>
    ) : (
      <div className="text-center mt-8">
        <p className="text-gray-500">No devices found.</p>
      </div>
    );
  }

  return (
    loading ? (
      <div className="w-full grid justify-items-center">
        <div
          className="mt-8 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
        </div>
      </div>
    ) : (<ul role="list" className="divide-y divide-gray-100">
      {devices.map((device, index) => (
        <li key={device.name} className="flex grid grid-cols-4 py-5">
          <div className="flex min-w-0 gap-x-4 items-start col-span-2">
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={device.icon} alt="" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{device.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{device.address}</p>
            </div>
          </div>
          <div className="flex col-span-1 items-center hidden sm:flex sm:flex-col">
            <p className="text-sm leading-6 text-gray-900">{device.type}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{device.rssi}dBm</p>
          </div>
          <div className="flex grid place-content-end col-span-1">
            <button
              type="button"
              onClick={() => handleConnect(index)}
              className="mb-1 h-9 inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <LinkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              <div className='whitespace-nowrap'>Connect</div>
            </button>
          </div>
        </li>
      ))}
    </ul>)
  )
}
