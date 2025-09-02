import React from "react";
import "./NotFound.css";
import Image from "./assets/flying-saucer.avif";

export const CloudIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={62}
    height={45}
    fill="none"
    className="cloud-icon"
  >
    <path
      fill="url(#cloudGradient)"
      d="M12.861 17.514c-6.32.865-10.97 6.5-10.518 12.955.47 6.731 6.309 11.806 13.04 11.336l.032-.003h.02l31.953-2.235.02-.002.031-.002c6.731-.47 11.806-6.309 11.336-13.04-.415-5.929-4.994-10.573-10.68-11.274-.799-7.336-7.263-12.789-14.69-12.27-4.95.347-9.103 3.261-11.257 7.344a8.936 8.936 0 0 0-9.287 7.19"
    />
    <g clipPath="url(#cloudClip)" data-figma-skip-parse="true">
      <foreignObject
        width={3684.64}
        height={3684.64}
        x={-1842.32}
        y={-1842.32}
        transform="matrix(-.01588 .02226 -.02601 -.01856 47.133 16.124)"
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            background: `conic-gradient(from 90deg, rgba(255, 255, 255, 0) 0deg, #fff 60deg, rgba(255, 255, 255, 0) 120deg, #fff 180deg, rgba(255, 255, 255, 0) 240deg, #fff 300deg, rgba(255, 255, 255, 0) 360deg)`,
            height: "100%",
            width: "100%",
            opacity: 0.2,
          }}
        />
      </foreignObject>
    </g>
    <path
      stroke="#fff"
      strokeLinejoin="round"
      strokeWidth={4.62}
      d="M12.861 17.514c-6.32.865-10.97 6.5-10.518 12.955.47 6.731 6.309 11.806 13.04 11.336l.032-.003h.02l31.953-2.235.02-.002.031-.002c6.731-.47 11.806-6.309 11.336-13.04-.415-5.929-4.994-10.573-10.68-11.274-.799-7.336-7.263-12.789-14.69-12.27-4.95.347-9.103 3.261-11.257 7.344a8.936 8.936 0 0 0-9.287 7.19Z"
    />
    <defs>
      <radialGradient
        id="cloudGradient"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(3.38532 48.41228 -76.55197 5.35304 28.133 -6.192)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFC97E" />
        <stop offset="0.333" stopColor="#FCA2E1" />
        <stop offset="0.667" stopColor="#7D6BF9" />
        <stop offset="1" stopColor="#8BD8FC" />
      </radialGradient>
      <clipPath id="cloudClip">
        <path
          d="M12.861 17.514c-6.32.865-10.97 6.5-10.518 12.955.47 6.731 6.309 11.806 13.04 11.336l.032-.003h.02l31.953-2.235.02-.002.031-.002c6.731-.47 11.806-6.309 11.336-13.04-.415-5.929-4.994-10.573-10.68-11.274-.799-7.336-7.263-12.789-14.69-12.27-4.95.347-9.103 3.261-11.257 7.344a8.936 8.936 0 0 0-9.287 7.19"
          style={{ mixBlendMode: "plus-lighter" }}
        />
      </clipPath>
    </defs>
  </svg>
);

export const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={89}
    height={84}
    fill="none"
    className="heart-icon"
  >
    <g filter="url(#heartFilter)">
      <path
        fill="url(#heartGradient)"
        d="M46.494 57.368 25.57 39.212c-5.303-4.601-5.864-12.624-1.253-17.918 4.611-5.295 12.648-5.857 17.95-1.256l1.721 1.493 1.496-1.717c4.61-5.295 12.648-5.857 17.95-1.256 5.304 4.602 5.865 12.624 1.254 17.919z"
      />
      <g clipPath="url(#heartClip)" data-figma-skip-parse="true">
        <foreignObject
          width={1363.05}
          height={1363.05}
          x={-681.525}
          y={-681.525}
          transform="matrix(.00427 .0611 -.05109 .00357 43.875 19.916)"
        >
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              background: `conic-gradient(from 90deg, rgba(255,255,255,0) 0deg, #fff 60deg, rgba(255,255,255,0) 120deg, #fff 180deg, rgba(255,255,255,0) 240deg, #fff 300deg, rgba(255,255,255,0) 360deg)`,
              height: "100%",
              width: "100%",
              opacity: 0.2,
            }}
          />
        </foreignObject>
      </g>
      <path
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth={4.2}
        d="M45.118 58.954a2.1 2.1 0 0 0 2.96-.207L66.27 37.856c5.374-6.17 4.72-15.521-1.46-20.884-6.178-5.36-15.54-4.706-20.91 1.462l-.12.137-.137-.119c-6.178-5.36-15.539-4.706-20.91 1.462-5.374 6.17-4.72 15.522 1.46 20.884z"
      />
    </g>
    <defs>
      <radialGradient
        id="heartGradient"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(4.25088 60.79046 -68.76748 4.80869 42.58 1.4)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFC97E" />
        <stop offset="0.333" stopColor="#FCA2E1" />
        <stop offset="0.667" stopColor="#7D6BF9" />
        <stop offset="1" stopColor="#8BD8FC" />
      </radialGradient>
      <clipPath id="heartClip">
        <path
          d="M46.494 57.368 25.57 39.212c-5.303-4.601-5.864-12.624-1.253-17.918 4.611-5.295 12.648-5.857 17.95-1.256l1.721 1.493 1.496-1.717c4.61-5.295 12.648-5.857 17.95-1.256 5.304 4.602 5.865 12.624 1.254 17.919z"
          style={{ mixBlendMode: "plus-lighter" }}
        />
      </clipPath>
      <filter
        id="heartFilter"
        width={87.957}
        height={83.265}
        x={0.526}
        y={0.263}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={0.343} />
        <feGaussianBlur stdDeviation={0.172} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feOffset dy={1.029} />
        <feGaussianBlur stdDeviation={0.515} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
        <feBlend in2="effect1_dropShadow" result="effect2_dropShadow" />
        <feOffset dy={2.059} />
        <feGaussianBlur stdDeviation={1.029} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0" />
        <feBlend in2="effect2_dropShadow" result="effect3_dropShadow" />
        <feOffset dy={5.49} />
        <feGaussianBlur stdDeviation={8.235} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
        <feBlend in2="effect3_dropShadow" result="effect4_dropShadow" />
        <feBlend in="SourceGraphic" in2="effect4_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

function NotFound() {
  return (
    <section className="not-found-container">
      <p className="not-found-text">Page not found</p>
      <div className="not-found-image">
        <CloudIcon />
        <h1 className="oops-text">Ooops! You seem lost</h1>
        <HeartIcon />
      </div>
      <h2 className="not-found-paragraph-text">
        Looks like you’ve drifted off course. No worries, we’ve got a way back.
        Head home, check out our products, or learn a little bit about us.
      </h2>
      <div className="ufo-image-container">
        <div className="sparkles-gradient"></div>
        <img
          src={Image}
          className="ufo-image"
          alt="Flying saucer illustration"
        />
      </div>
      <div className="return-links">
        <a href="/" className="return-link">
          <div className="left-icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              className="home_icon icon-left"
            >
              <path
                fill="currentColor"
                d="M11.513 1.956a2.29 2.29 0 0 0-3.026 0L3.28 6.533A2.3 2.3 0 0 0 2.5 8.254v6.954A2.29 2.29 0 0 0 4.792 17.5H6.8c.806 0 1.459-.653 1.459-1.458v-1.875c0-.92.746-1.667 1.666-1.667H10c.92 0 1.667.746 1.667 1.667v1.875c0 .805.653 1.458 1.458 1.458h2.083a2.29 2.29 0 0 0 2.292-2.292V8.254c0-.659-.284-1.286-.779-1.721z"
              ></path>
            </svg>
          </div>
          <div className="page-route-text">
            <p className="main">Home Page</p>
            <p className="sub">There's no place like home...</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="navigate-arrow-icon"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.25"
              d="m8.334 13.333 2.744-2.744a.833.833 0 0 0 0-1.178L8.334 6.667"
            ></path>
          </svg>
        </a>
        <a className="return-link">
          <div className="left-icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              className="icon-left"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M18.488 8.956c-2.103-3.69-5.252-5.623-8.485-5.623S3.622 5.266 1.52 8.956a2.11 2.11 0 0 0 0 2.088c2.103 3.69 5.252 5.623 8.484 5.623s6.382-1.933 8.485-5.623a2.11 2.11 0 0 0 0-2.088M9.629 7.412l-.676 1.353a.4.4 0 0 1-.186.186l-1.353.676a.417.417 0 0 0 0 .746l1.353.676c.08.04.146.106.186.186l.676 1.353a.417.417 0 0 0 .746 0l.676-1.353a.4.4 0 0 1 .186-.186l1.353-.676a.417.417 0 0 0 0-.746l-1.353-.676a.4.4 0 0 1-.186-.186l-.676-1.353a.417.417 0 0 0-.746 0"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="page-route-text">
            <p className="main">Contact</p>
            <p className="sub">Where we talk the talk</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="navigate-arrow-icon"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.25"
              d="m8.334 13.333 2.744-2.744a.833.833 0 0 0 0-1.178L8.334 6.667"
            ></path>
          </svg>
        </a>
        <a className="return-link">
          <div className="left-icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              className="icon-left"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M2.5 4.792A2.29 2.29 0 0 1 4.792 2.5h10.416A2.29 2.29 0 0 1 17.5 4.792v10.416a2.29 2.29 0 0 1-2.292 2.292H4.792A2.29 2.29 0 0 1 2.5 15.208zm4.167 6.875c0-.345.28-.625.625-.625h3.75a.625.625 0 0 1 0 1.25h-3.75a.625.625 0 0 1-.625-.625m.625-3.959a.625.625 0 0 0 0 1.25h5.416a.625.625 0 1 0 0-1.25z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="page-route-text">
            <p className="main">Why CustoFit</p>
            <p className="sub">For the hesitant bunch</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="navigate-arrow-icon"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.25"
              d="m8.334 13.333 2.744-2.744a.833.833 0 0 0 0-1.178L8.334 6.667"
            ></path>
          </svg>
        </a>
      </div>
    </section>
  );
}

export default NotFound;
