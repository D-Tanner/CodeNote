import React, { useState, useEffect } from "react";
import { useNoteContext } from "../../context/search";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';

import "./SearchBar.css";

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

  const bookmarkPage = window.location.href.includes('/bookmarked')
  const personalPage = window.location.href.includes('/personal')
  const globalPage = window.location.href.includes('/global')

  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState("");

  const userId = useSelector(state => state.session.user.id)


  // function focusSearchBar() {
  //   document.getElementById("searchModalInput").focus();
  // }



  const searchProjects = async (searchText) => {
    const response = await fetch("/api/projects/all");
    const allProjects = await response.json();
    let stringCheck = searchText.replace(/[[\]']+/g, "");
    stringCheck = stringCheck.replaceAll("\\", "");
    let projectMatches = allProjects.filter((project) => {
      const regex = new RegExp(`${stringCheck}`, "gi");

      return (
        project.name.match(regex) ||
        project.description.match(regex) ||
        project.user.username.match(regex) ||
        project.user.city.match(regex) ||
        project.user.state.match(regex)
      );
    });

    if (searchText.length === 0) {
      projectMatches = [];
    }

    setMatches(projectMatches);
  };

  // useEffect(() => {
  //   focusSearchBar();
  // });




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
            onChange={(e) => searchProjects(e.target.value)}
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
