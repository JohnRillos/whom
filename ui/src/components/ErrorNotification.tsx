import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import CloseButton from './buttons/CloseButton';

export default function ErrorNotification(): JSX.Element | null {
  const { errorMessage, dismissError } = useContext(AppContext);
  if (!errorMessage) {
    return null;
  }
  return (
    <>
    <Transition appear show={!!errorMessage} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={dismissError}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 -bottom-10'
          enterTo='opacity-100 bottom-4'
        >
          <div className='fixed bottom-4 left-4 max-w-xs'>
            <div className='flex flex-row items-start space-x-2 bg-red-200 text-red-800 outline outline-red-800 rounded-md p-2 shadow-xl'>
              <div>Error: {errorMessage}</div>
              <CloseButton onClick={dismissError}/>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  </>
  );
}
