import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { useAuth } from '../services/AuthStateContext'
import clsx from 'clsx'
import Link from "next/link"
import { useNotifications } from '../services/NotificationsContext'
import { useCable } from '../services/ActionCableContext'
import Notification from "./Notification"
import { NotificationType } from '../src/notification'
import Button from './Button'

interface NotificationProps {
  data: NotificationDataProps
  attributes: NotificationAttributesProps
}

interface NotificationDataProps {
  id: string,
  type: string
}

interface NotificationAttributesProps {
  message: string,
  status: string
}

export default function Navbar() {
  const [user, dispatch] = useAuth();
  const [notifications, notificationsDispatch] = useNotifications();
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [cable, cableDispatch] = useCable();

  useEffect(() => {
    if (!cable?.subscriptions || !user['id']) {
      return;
    }

    // TODO: Have this be done in the dispatch?
    cable.subscriptions.create(
      { channel: "NotificationsChannel" },
      {
        received: (message: NotificationProps) => {
          notificationsDispatch({ type: "addNotification", payload: message.data })
        }
      }
    )
  }, [cable, user])

  useEffect(() => {
    const unread = notifications.filter(
      (n: NotificationType) => {
        return n.attributes.status === "unread"
      })
    setUnreadNotifications(unread)
  }, [notifications])

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    />
                  </Link>
                  <Link href="/">
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                      alt="Workflow"
                    />
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <span className="sr-only">View notifications</span>
                {user['id'] && (

                  <Menu as="div">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            {unreadNotifications.length > -1 && (
                              <div className="bg-red-500 text-white rounded-lg">
                                {unreadNotifications.length}
                              </div>
                            )}
                            <BellIcon className="h-7 w-6" aria-hidden="true" />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-101"
                          enterFrom="transform opacity-1 scale-95"
                          enterTo="transform opacity-101 scale-100"
                          leave="transition ease-in duration-76"
                          leaveFrom="transform opacity-101 scale-100"
                          leaveTo="transform opacity-1 scale-95"
                        >
                          <Menu.Items
                            static
                            className="p-2 origin-top-right absolute right-1 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {notifications.map((notification: NotificationType) => {
                              return (
                                <Disclosure key={notification.id}>
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button>
                                        <div className="flex flex-row items-center">
                                          Show Message
                                          <ChevronRightIcon
                                            className={clsx("h-6",
                                              open ? "transform rotate-90" : "")}
                                          />
                                        </div>
                                      </Disclosure.Button>
                                      <Disclosure.Panel>
                                        <Notification
                                          {...notification}
                                          active={true}
                                          open={open}
                                        />
                                      </Disclosure.Panel>
                                    </>
                                  )
                                  }
                                </Disclosure>
                              )
                            })}
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                )}

                {user['id'] ? (
                  < Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/logout"
                                  className={clsx(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>) :
                  (
                    <div className="space-x-2">
                      <Button primary={true} label="Login" disabled={false} href="/login" type="link" />
                      <Button label="Sign up" disabled={false} href="/signup" type="link" />
                    </div>
                  )
                }

              </div>
            </div>
          </div>
        </>
      )
      }
    </Disclosure >
  )
}
