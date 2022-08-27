import { Dialog, Transition } from '@headlessui/react'
import React from 'react'
import { Fragment, useContext } from 'react'
import { ModalContext } from '../context/ModalContext'
import { ContactDetail } from './ContactDetail'

export default function Modal() {
  let { isOpen, closeModal } = useContext(ModalContext);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-300/75 dark:bg-black/75" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="bg-standard outline outline-black dark:outline dark:outline-neutral-500 max-w-xl transform overflow-hidden rounded-2xl p-6 shadow-xl transition-all"
                >
                  <ContactDetail/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}