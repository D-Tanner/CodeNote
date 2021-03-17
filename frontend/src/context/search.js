import React, {
  createContext,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";

import ReactDOM from "react-dom";

const NoteContext = createContext();

export const useNoteContext = () => useContext(NoteContext)

export const NoteProvider = ({ children }) => {
  const noteRef = useRef();

  const [value, setValue] = useState();
  const [searchResults, setSearchResults] = useState()

  useEffect(() => {
    setValue(noteRef.current);
  }, []);

  return (
    <>
      <NoteContext.Provider
        value={{
          value,
          searchResults,
          setSearchResults
        }}>
        {children}
      </NoteContext.Provider>
      <div ref={noteRef} />
    </>
  )
}
