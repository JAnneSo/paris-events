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
    } else {
      if (isFavorite) {
        storageArray.splice(storageArray.indexOf(checkboxId), 1);
        localStorage.setItem(localStorageName, JSON.stringify(storageArray));
      }
    }
    console.log(storedList);
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
    <label className="like-btn">
      <input
        type="checkbox"
        id={props.id}
        onChange={storeFavorite}
        ref={checkboxRef}
      />
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="bookmark"
        class="svg-inline--fa fa-bookmark fa-w-12"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path
          fill="currentColor"
          d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"
        ></path>
      </svg>
      {/* <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.4134 4.84977C19.3781 3.72787 17.9575 3.10999 16.413 3.10999C15.2585 3.10999 14.2012 3.47465 13.2704 4.19377C12.8008 4.55676 12.3752 5.00085 12 5.51919C11.6249 5.001 11.1992 4.55676 10.7294 4.19377C9.79877 3.47465 8.74149 3.10999 7.58701 3.10999C6.04251 3.10999 4.62177 3.72787 3.58646 4.84977C2.56351 5.95856 2 7.47333 2 9.11524C2 10.8052 2.63034 12.3521 3.98364 13.9837C5.19427 15.4431 6.93423 16.9246 8.94916 18.6402C9.63718 19.226 10.4171 19.8901 11.2268 20.5975C11.4408 20.7847 11.7153 20.8878 12 20.8878C12.2846 20.8878 12.5592 20.7847 12.7729 20.5978C13.5826 19.8903 14.363 19.2259 15.0513 18.6397C17.0659 16.9245 18.8059 15.4431 20.0165 13.9835C21.3698 12.3521 22 10.8052 22 9.11508C22 7.47333 21.4365 5.95856 20.4134 4.84977Z"
          fill="white"
        />
      </svg> */}
    </label>
  );
};

export default LikeButton;
