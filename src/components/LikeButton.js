import React, { useEffect, useRef } from "react";

const LikeButton = (props) => {
  const localStorageName = "paris_event_asj";
  const checkboxRef = useRef(null);

  useEffect(() => {
    updateCheckboxState();
  }, []);

  /**
   * @function storeFavorite
   * @description store id of a track in localStorage
   */
  function storeFavorite() {
    let checkboxId = checkboxRef.current.id;
    // Get data in localStorage and convert from JSON
    const storedList = localStorage.getItem(localStorageName);
    let storageArray = [];
    if (storedList) {
      storageArray = JSON.parse(storedList);
    }
    // Boolean : checkboxId is in localStotage
    const isFavorite = storageArray.includes(checkboxId);

    if (checkboxRef.current.checked) {
      if (!isFavorite) {
        storageArray.push(checkboxId);
        localStorage.setItem(localStorageName, JSON.stringify(storageArray));
      }
    }
    if (!checkboxRef.current.checked) {
      if (isFavorite) {
        storageArray.splice(storageArray.indexOf(checkboxId), 1);
        localStorage.setItem(localStorageName, JSON.stringify(storageArray));
      }
    }
    //console.log(storedList);
  }

  /**
   * @function updateCheckboxState
   * @description checks if a event is liked and displays it as liked
   */
  function updateCheckboxState() {
    const storedList = localStorage.getItem(localStorageName);
    let storageArray = [];
    if (storedList) {
      storageArray = JSON.parse(storedList);
      for (var i = 0; i < storageArray.length; i++) {
        const id = storageArray[i];
        if (document.getElementById(id)) {
          document.getElementById(id).setAttribute("checked", "checked");
        }
      }
    }
  }

  return (
    <label className="like-btn" htmlFor={props.id}>
      <input
        type="checkbox"
        id={props.id}
        onClick={storeFavorite}
        ref={checkboxRef}
      />
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="bookmark"
        className="svg-inline--fa fa-bookmark fa-w-12"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path
          fill="currentColor"
          d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"
        ></path>
      </svg>
    </label>
  );
};

export default LikeButton;
