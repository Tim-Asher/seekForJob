import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaRegUser, FaUserCircle } from "react-icons/fa";
import PageContext from "../../context/pagesContext";
import { useContext, useEffect, useState } from "react"; // Import useState
import { useLocation, useNavigate } from "react-router-dom";
import {
  useDeleteNotificationsMutation,
  useGetNotificationsQuery,
  useLogoutUserMutation,
  useValidateTokenMutation,
  useMarkNotificationAsReadMutation,
  useGetUserDataQuery, // Import the new mutation
} from "../../slices/userApiSlice";
import LoginRegisterModal from "../auth/LoginRegisterModal";
import { formatDistanceToNow } from "date-fns";

// Helper function to concatenate class names
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Main menu component
export default function NewMainMenu() {
  const {
    openLogRegModal,
    setOpenLogRegModal,
    isLogin,
    setIsLogin,
    selectedLoginType,
    setSelectedLoginType,
    getCookie,
    userData,
    setUserData,
  } = useContext(PageContext);

  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;

  // Navigation data array
  const navigation = [
    { name: "Job Seek", href: "/", current: currentUrl === "/" },
    {
      name: "מאגר מעסיקים",
      href: "/employer-page",
      current: currentUrl === "/employer-page",
    },
    {
      name: "חיפוש עבודה",
      href: "/all-jobs",
      current: currentUrl === "/all-jobs",
    },
    {
      name: "קורות חיים",
      href: "/resume-builder",
      current: currentUrl === "/resume-builder",
    },
  ];

  // State to track notification count
  const [notificationCount, setNotificationCount] = useState(0);
  const [profilePicture, setProfilePicture] = useState("");
  const [notifications, setNotifications] = useState([]);

  // API hooks from RTK Query
  const [logoutUser] = useLogoutUserMutation();
  const [validateToken] = useValidateTokenMutation();
  const [deleteNotifications] = useDeleteNotificationsMutation();
  const [markNotificationAsRead] = useMarkNotificationAsReadMutation(); // Add this

  // Sign out handler
  const handleSignoutBtn = async () => {
    await logoutUser().unwrap();
    setUserData([]);
    setIsLogin(false);
    navigate("/");
  };

  // use effect for profile picture logo
  useEffect(() => {
    if (userData) {
      setProfilePicture(
        userData.companyLogo ? userData.companyLogo : userData.profilePicture
      );
      setNotificationCount(userData.newNotifications);
      setNotifications(userData.notifications);
    }
  }, [isLogin, userData]);

  // Effect to handle authentication validation
  useEffect(() => {
    const jwt = getCookie("jwt");
    if (jwt) {
      validateToken().then((res) => {
        setUserData(res.data.data);
        setIsLogin(true);
        if (res.data.employer) {
          setSelectedLoginType("employer");
        } else {
          setSelectedLoginType("employee");
        }
      });
    }
  }, []);

  // Clear all notifications with confirmation
  const handleClearAllNotifications = async () => {
    if (window.confirm("האם אתה בטוח שאתה רוצה למחוק את ההתראות?")) {
      await deleteNotifications().unwrap();
      setNotifications([]);
      // refetch();
      setNotificationCount(0); // Reset count after clearing
    }
  };

  // Mark notification as read
  const handleMarkAsRead = async (notificationId) => {
    const res = await markNotificationAsRead({ notificationId }).unwrap();
    // const tempNotification = userData.notifications.find((item) => {
    //   if (item._id === notificationId) return item;
    // });
    // (tempNotification);

    const updatedNotifications = notifications.map(
      (notification) =>
        notification._id === notificationId
          ? { ...notification, read: true } // Update this notification
          : notification // Keep other notifications unchanged
    );

    setNotifications(updatedNotifications);
    setNotificationCount(res.data);
  };

  // Render the menu with the notification dropdown and login management
  return (
    <Disclosure as="nav" className="bg-orange-jobseek sticky top-0 z-50">
      <LoginRegisterModal />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-yellow-jobseek hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <div
                onClick={() => {
                  navigate("/");
                }}
              >
                <img
                  alt="Job Seek"
                  src="/images/jobSeekLogoNew.png"
                  className="h-16 w-auto"
                />
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <button
                    onClick={() => {
                      navigate(item.href);
                    }}
                    key={item.name}
                    className={classNames(
                      item.current
                        ? "bg-yellow-jobseek text-black"
                        : "text-gray-600 hover:bg-orange-light-jobseek hover:text-black",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLogin && (
              <Menu as="div" className="relative ml-3">
                <MenuButton
                  type="button"
                  className="relative rounded-full bg-orenge-light-jobseek p-1 text-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                  {notificationCount > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <div className="relative">
                      <div
                        className="absolute right-0 w-72 bg-white shadow-lg mt-2 rounded-lg overflow-hidden"
                        style={{ maxHeight: "300px" }}
                      >
                        <div
                          className="overflow-y-auto scrollbar-hide"
                          style={{ maxHeight: "250px" }}
                        >
                          {notifications?.length === 0 && (
                            <div>אין התראות להציג</div>
                          )}
                          {notifications
                            ?.slice()
                            .reverse()
                            .map((notification, index) => (
                              <div
                                key={index}
                                onClick={() =>
                                  handleMarkAsRead(notification._id)
                                }
                                className={`flex justify-between items-start p-4 border-b border-gray-300 cursor-pointer ${
                                  notification.read ? "bg-gray-200" : "bg-white"
                                }`}
                              >
                                <div>
                                  <p className="text-sm font-semibold text-gray-700">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {formatDistanceToNow(
                                      new Date(notification.dueDate)
                                    )}
                                    <span> ago</span>
                                  </p>
                                </div>
                                {!notification.read && (
                                  <span className="h-2 w-2 bg-orange-500 rounded-full"></span>
                                )}
                              </div>
                            ))}
                        </div>
                        {notifications?.length > 0 && (
                          <button
                            className="w-full text-white bg-blue-500 hover:bg-blue-600 py-2 text-sm font-semibold"
                            onClick={handleClearAllNotifications}
                          >
                            Clear All Notifications
                          </button>
                        )}
                      </div>
                    </div>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton
                  onClick={() => {
                    isLogin ? null : setOpenLogRegModal(!openLogRegModal);
                  }}
                  className="relative flex rounded-full text-sm active:outline-none active:ring-2 active:ring-white active:ring-offset-2 active:ring-offset-gray-800"
                >
                  {isLogin ? (
                    profilePicture ? (
                      <img
                        src={profilePicture}
                        alt="Company Logo"
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <FaUserCircle className="h-8 w-8 p-1 rounded-full bg-orenge-light-jobseek" />
                    )
                  ) : (
                    <FaRegUser className="h-8 w-8 p-1 rounded-full bg-orange-light-jobseek" />
                  )}
                </MenuButton>
              </div>
              {isLogin && (
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <button
                      onClick={() => {
                        selectedLoginType === "employee"
                          ? navigate("profile")
                          : navigate("employer-profile");
                      }}
                      className="block w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Your Profile
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={handleSignoutBtn}
                      className="block w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              )}
            </Menu>
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="button"
              onClick={() => navigate(item.href)}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-yellow-jobseek text-black"
                  : "text-gray-600 hover:bg-orange-light-jobseek hover:text-black",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
