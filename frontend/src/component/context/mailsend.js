import React, { createContext, useState, useContext } from "react";
import {
  OfflineNodesMail,
  criticalpowerMail,
} from "../Services/emailservice";

const Mailcontext = createContext();

const useMailsend = () => useContext(Mailcontext);

export const MailProvider = ({ children }) => {
  const [mailstatus, setmailstatus] = useState("sendlow");

  const Currentmailstatus = (errorMessage) => {
    setmailstatus(errorMessage);
  };

  // const sendmail = async (data) => {
  //   try {
  //     console.log(data, "in context");
      
  //     const power = data;
  //     if (data >= 0.35) {
  //       const resp = await criticalpowerMail(data);
  //       return resp;
  //     }
  //     return null;
  //   } catch (error) {
  //     console.error("Error in sendmail:", error);
  //     throw error; // You can decide how to handle the error, either log it or rethrow
  //   }
  // };
  const sendme=(data)=>{
    try {
      console.log(data);
      
    } catch (error) {
      
    }
  }
  

  const SendMailNodes = async (data) => {
    const resp = await OfflineNodesMail(data);
  };

  const clearmailstatus = () => {
    setmailstatus(null);
  };

  return (
    <Mailcontext.Provider
      value={{
        // sendmail,
        sendme,
        mailstatus,
        Currentmailstatus,
        clearmailstatus,
        SendMailNodes,
      }}
    >
      {children}
    </Mailcontext.Provider>
  );
};

export default useMailsend;
