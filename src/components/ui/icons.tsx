import { LucideProps } from 'lucide-react';

export const Icons = {
  Facebook: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="2500"
      height="2500"
      viewBox="126.445 2.281 589 589"
      id="facebook"
    >
      <circle cx="420.945" cy="296.781" r="294.5" fill="#3c5a9a"></circle>
      <path
        fill="#fff"
        d="M516.704 92.677h-65.239c-38.715 0-81.777 16.283-81.777 72.402.189 19.554 0 38.281 0 59.357H324.9v71.271h46.174v205.177h84.847V294.353h56.002l5.067-70.117h-62.531s.14-31.191 0-40.249c0-22.177 23.076-20.907 24.464-20.907 10.981 0 32.332.032 37.813 0V92.677h-.032z"
      ></path>
    </svg>
  ),
  Twitter: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 512 512"
      id="twitter"
    >
      <g clipPath="url(#clip0_84_15698)">
        <rect width="512" height="512" fill="#fff" rx="60"></rect>
        <path
          fill="#000"
          d="M355.904 100H408.832L293.2 232.16L429.232 412H322.72L239.296 302.928L143.84 412H90.8805L214.56 270.64L84.0645 100H193.28L268.688 199.696L355.904 100ZM337.328 380.32H366.656L177.344 130.016H145.872L337.328 380.32Z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_84_15698">
          <rect width="512" height="512" fill="#fff"></rect>
        </clipPath>
      </defs>
    </svg>
  ),
  LinkedIn: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28.87 28.87"
      id="linkedin"
    >
      <g data-name="Layer 2">
        <g data-name="Layer 1">
          <rect
            width="28.87"
            height="28.87"
            fill="#0b86ca"
            rx="6.48"
            ry="6.48"
          ></rect>
          <path
            fill="#fff"
            d="M8 12h3v9.68H8zm1.53-4.81a1.74 1.74 0 11-1.74 1.75 1.74 1.74 0 011.74-1.75M12.92 12h2.89v1.32a3.16 3.16 0 012.85-1.56c3 0 3.61 2 3.61 4.61v5.31h-3V17c0-1.12 0-2.57-1.56-2.57s-1.8 1.22-1.8 2.48v4.79h-3z"
          ></path>
        </g>
      </g>
    </svg>
  ),
  Instagram: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      id="instagram"
    >
      <linearGradient
        id="a"
        x1="1.464"
        x2="14.536"
        y1="14.536"
        y2="1.464"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#FFC107"></stop>
        <stop offset=".507" stopColor="#F44336"></stop>
        <stop offset=".99" stopColor="#9C27B0"></stop>
      </linearGradient>
      <path
        fill="url(#a)"
        d="M11 0H5a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zm3.5 11c0 1.93-1.57 3.5-3.5 3.5H5c-1.93 0-3.5-1.57-3.5-3.5V5c0-1.93 1.57-3.5 3.5-3.5h6c1.93 0 3.5 1.57 3.5 3.5v6z"
      ></path>
      <linearGradient
        id="b"
        x1="5.172"
        x2="10.828"
        y1="10.828"
        y2="5.172"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#FFC107"></stop>
        <stop offset=".507" stopColor="#F44336"></stop>
        <stop offset=".99" stopColor="#9C27B0"></stop>
      </linearGradient>
      <path
        fill="url(#b)"
        d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.5A2.503 2.503 0 0 1 5.5 8c0-1.379 1.122-2.5 2.5-2.5s2.5 1.121 2.5 2.5c0 1.378-1.122 2.5-2.5 2.5z"
      ></path>
      <linearGradient
        id="c"
        x1="11.923"
        x2="12.677"
        y1="4.077"
        y2="3.323"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#FFC107"></stop>
        <stop offset=".507" stopColor="#F44336"></stop>
        <stop offset=".99" stopColor="#9C27B0"></stop>
      </linearGradient>
      <circle cx="12.3" cy="3.7" r=".533" fill="url(#c)"></circle>
    </svg>
  ),
};
