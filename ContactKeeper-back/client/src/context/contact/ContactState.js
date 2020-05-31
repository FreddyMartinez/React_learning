import React, { useReducer } from "react";
import uuid from "uuid";
import contactContext from "./ContactContext";
import contactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Pepito Perez",
        email: "pepe@mail",
        phone: "23543",
        type: "professional"
      },
      {
        id: 2,
        name: "Sara Conor",
        email: "sara@terminator",
        phone: "123456",
        type: "personal"
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact

  // Delete contact

  // Set currente

  // Clear current

  // update contact

  // filter

  // clear filter

  // delete contact

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
