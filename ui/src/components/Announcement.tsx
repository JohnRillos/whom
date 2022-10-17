import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { getUnreadAnnouncement, markAnnouncementRead } from '../util/AnnouncementUtil';

export default function Announcement(): JSX.Element | null {
  const [ announcement, setAnnouncement ] = useState<string | null>(getUnreadAnnouncement());
  if (!announcement) {
    return null;
  }

  function dismiss() {
    markAnnouncementRead();
    setAnnouncement(null);
  }

  return (
    <>
    <Transition appear show={!!announcement} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 -bottom-10'
          enterTo='opacity-100 bottom-4'
        >
          <div className='fixed bottom-4 left-4 right-4 xs:max-w-xs'>
            <div className='flex flex-col space-y-2 bg-sky-200 text-black outline outline-sky-800 rounded-md p-2 shadow-xl'>
              <h1 className='text-center font-bold'>Announcement</h1>
              <div>{announcement}</div>
              <button
                className='block bg-sky-800 text-white rounded-md p-1'
                onClick={dismiss}
              >
                Mark as read
              </button>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  </>
  );
}
