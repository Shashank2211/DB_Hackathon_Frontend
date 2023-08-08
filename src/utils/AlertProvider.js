import { createContext, useContext, useRef } from "react";
import NotificationAlert from "react-notification-alert";
const AlertContext = createContext({});

export const AlertProvider = ({ children }) => {
  const notificationAlertRef = useRef(null);

  const showAlert = (message, color) => {
    console.log(message, color);
    const options = {
      place: "tc",
      message: (
        <div>
          <div>{message}</div>
        </div>
      ),
      type: color,
      icon: "ni ni-like-2",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      <NotificationAlert
        ref={notificationAlertRef}
        zIndex={9999}
        onClick={() => console.log("hey")}
      />
      {children}
    </AlertContext.Provider>
  );
};

// return (
//   <UncontrolledAlert color={color} fade={false}>
//     <span className='alert-inner--icon'>
//       <i className='ni ni-like-2' />
//     </span>{" "}
//     <span className='alert-inner--text'>{children}</span>
//   </UncontrolledAlert>
// );

export const useAlert = () => {
  return useContext(AlertContext);
};
