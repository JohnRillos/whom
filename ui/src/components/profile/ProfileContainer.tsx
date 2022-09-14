import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import ProfileView from './ProfileView';

export default function ProfileContainer(props: { isOpen: boolean, close: () => void }): JSX.Element {
  return (
    <>
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={props.close}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 -top-full'
          enterTo='opacity-100 top-0'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 top-0'
          leaveTo='opacity-0 -top-full'
        >
          <div className='fixed inset-0 overflow-y-auto bg-standard'>
            <ProfileView closeContainer={props.close}/>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  </>
  );
}