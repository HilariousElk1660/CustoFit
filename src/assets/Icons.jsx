import React from "react";

const SparklesIcon = ({ size = 16, color, className = "" }) => {
  const themeColor =
    color ?? (document.body.className == "dark" ? "#3acaed" : "#7c3aed");

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={themeColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-sparkles ${className}`}
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
};

// MoonIcon.jsx
const MoonIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-moon h-5 w-5"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

// CartIcon.jsx
const CartIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-shopping-cart h-5 w-5"
  >
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

// UserIcon.jsx
const UserIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-user h-5 w-5"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// MenuIcon.jsx
const MenuIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-menu h-5 w-5"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const DownloadIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#000000"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M12 12V19M12 19L9.75 16.6667M12 19L14.25 16.6667M6.6 17.8333C4.61178 17.8333 3 16.1917 3 14.1667C3 12.498 4.09438 11.0897 5.59198 10.6457C5.65562 10.6268 5.7 10.5675 5.7 10.5C5.7 7.46243 8.11766 5 11.1 5C14.0823 5 16.5 7.46243 16.5 10.5C16.5 10.5582 16.5536 10.6014 16.6094 10.5887C16.8638 10.5306 17.1284 10.5 17.4 10.5C19.3882 10.5 21 12.1416 21 14.1667C21 16.1917 19.3882 17.8333 17.4 17.8333"
        stroke="#ffffff"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </g>
  </svg>
);

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 300 300"
    width="300"
    height="300"
    preserveAspectRatio="xMidYMid meet"
    style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px); content-visibility: visible;"
  >
    <defs>
      <clipPath id="__lottie_element_2">
        <rect width="300" height="300" x="0" y="0"></rect>
      </clipPath>
    </defs>
    <g clip-path="url(#__lottie_element_2)">
      <g
        transform="matrix(1,0,0,1,76.66199493408203,98.28499603271484)"
        opacity="1"
        style="display: block;"
      >
        <g
          opacity="1"
          transform="matrix(1,0,0,1,71.95899963378906,50.01100158691406)"
        >
          <path
            stroke-linecap="butt"
            stroke-linejoin="miter"
            fill-opacity="0"
            stroke-miterlimit="10"
            stroke="rgb(187,190,193)"
            stroke-opacity="1"
            stroke-width="3"
            d=" M60.01499938964844,6.980000019073486 C59.380001068115234,6.136000156402588 58.6870002746582,5.3379998207092285 57.939998626708984,4.593999862670898"
          ></path>
        </g>
        <g
          opacity="1"
          transform="matrix(1,0,0,1,71.95899963378906,50.01100158691406)"
        >
          <path
            stroke-linecap="butt"
            stroke-linejoin="miter"
            fill-opacity="0"
            stroke-miterlimit="10"
            stroke="rgb(187,190,193)"
            stroke-opacity="1"
            stroke-width="3"
            d=" M64.45999908447266,20.308000564575195 C64.45999908447266,15.803999900817871 63.11899948120117,11.61400032043457 60.81399917602539,8.11400032043457"
          ></path>
        </g>
        <g
          opacity="1"
          transform="matrix(1,0,0,1,70.82599639892578,65.26799774169922)"
        >
          <path
            stroke-linecap="butt"
            stroke-linejoin="miter"
            fill-opacity="0"
            stroke-miterlimit="10"
            stroke="rgb(187,190,193)"
            stroke-opacity="1"
            stroke-width="3"
            d="M0 0"
          ></path>
        </g>
        <g opacity="1" transform="matrix(1,0,0,1,0,0)">
          <path
            stroke-linecap="butt"
            stroke-linejoin="miter"
            fill-opacity="0"
            stroke-miterlimit="10"
            stroke="rgb(187,190,193)"
            stroke-opacity="1"
            stroke-width="3"
            d=" M70.82599639892578,112.94499969482422 C70.82599639892578,112.94499969482422 70.82599639892578,111.947998046875 70.82599639892578,110.22000122070312"
          ></path>
        </g>
      </g>
    </g>
  </svg>
);

export { SparklesIcon, MoonIcon, CartIcon, DownloadIcon, UploadIcon, UserIcon, MenuIcon };
