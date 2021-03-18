import React, { useState, useEffect } from "react";
import { useNoteContext } from "../../context/search";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import { getGlobalNotes, getPersonalNotes, getBookmarked, filterSearchedNotes } from "../../store/notes"

import "./SearchBar.css";
import HomePage from "../HomePage";

const useStyles = makeStyles((theme) => ({

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '90%',
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(1),
    //   width: 'auto',
    // },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    color: 'white',
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'white',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    // transition: theme.transitions.create('width'),
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   width: '12ch',
    //   '&:focus': {
    //     width: '20ch',
    //   },
    // },
  },
}));


const SearchBar = () => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const bookmarkPage = window.location.href.includes('/bookmarked')
  const personalPage = window.location.href.includes('/personal')
  const globalPage = window.location.href.includes('/global')

  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState("");

  const userId = useSelector(state => state.session.user.id)
  const user = useSelector(state => state.notes.notes)
  const searchProjects = async (searchText) => {
    let response;
    let stringCheck = searchText.replace(/[[\]']+/g, "");
    stringCheck = stringCheck.replaceAll("\\", "");

    if (globalPage) {
      response = await fetch("/api/notes/global")
    }
    if (personalPage) {
      response = await fetch(`/api/notes/${userId}/personal`)
    }
    if (bookmarkPage) {
      response = await fetch(`/api/notes/${userId}/bookmarked`)
    }

    const allNotes = await response.json();

    let projectMatches = allNotes.filter((note) => {
      const regex = new RegExp(`${stringCheck}`, "gi");
      if (note.title) {
        return (
          note.title.match(regex) ||
          note.content.match(regex)
        );
      } else {
        return (
          note.Note.title.match(regex) ||
          note.Note.content.match(regex)
        )
      }


    });

    if (searchText.length === 0) {
      projectMatches = [];
    }

    setMatches(projectMatches);

  };

  useEffect(() => {

    if (!search && globalPage) dispatch(getGlobalNotes())
    if (!search && personalPage) dispatch(getPersonalNotes(userId))
    if (!search && bookmarkPage) dispatch(getBookmarked(userId))
    // if (search) {
    //   searchProjects(search)
    //   dispatch(filterSearchedNotes(matches))
    // }

  }, [search, globalPage, personalPage, bookmarkPage]);

  useEffect(() => {
    if (search && matches) {
      dispatch(filterSearchedNotes(matches))
    }
    console.log(matches)
  }, [matches])


  return (
    <>
      {userId &&
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon className="search-icon" />
          </div>
          <InputBase
            placeholder="Search…"
            id="no-border"
            onKeyUp={(e) => {
              setSearch(e.target.value)
              searchProjects(e.target.value)
            }}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />

        </div>
      }
    </>
  );
};

export default SearchBar;
