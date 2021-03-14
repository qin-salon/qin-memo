import clsx from "clsx";
import type { VFC } from "react";

type Props = {
  className?: string;
  size?: "large" | "small";
};
export const LogoIcon: VFC<Props> = (props) => {
  const classes = clsx([
    {
      "w-52 h-12": props.size === "large",
      "w-32 h-6": props.size === "small",
    },
    props.className,
  ]);
  return (
    <svg className={classes} viewBox="0 0 189 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M33.5657 28.9323C28.5744 33.4843 22.3254 28.9323 22.2555 28.9323C14.0199 22.9428 7.68105 28.3832 7.62116 28.4332C7.58115 28.4787 7.55908 28.5372 7.55908 28.5979C7.55908 28.6585 7.58115 28.717 7.62116 28.7626C7.65073 28.8152 7.69838 28.8554 7.75528 28.8755C7.81218 28.8957 7.87448 28.8946 7.93061 28.8724C13.3411 26.7461 20.0693 33.3445 20.1492 33.4244C21.633 34.9404 23.6229 35.8572 25.7394 35.9999C26.1657 35.9986 26.5907 35.9517 27.0072 35.8601C31.3795 34.9318 33.8651 29.5113 33.9949 29.2817C34.0196 29.2263 34.0241 29.1641 34.0077 29.1057C33.9913 29.0474 33.955 28.9966 33.9051 28.9622C33.8616 28.9171 33.8033 28.8893 33.741 28.8838C33.6786 28.8783 33.6163 28.8955 33.5657 28.9323Z"
        fill="#070417"
      />
      <path
        d="M43.3083 9.67627H37.219C37.0757 9.67627 36.9595 9.79247 36.9595 9.93581V32.8456C36.9595 32.989 37.0757 33.1052 37.219 33.1052H43.3083C43.4517 33.1052 43.5679 32.989 43.5679 32.8456V9.93581C43.5679 9.79247 43.4517 9.67627 43.3083 9.67627Z"
        fill="#070417"
      />
      <path
        d="M68.5141 15.6556C67.9599 14.3994 67.1704 13.2609 66.1882 12.3014C65.1912 11.3409 64.023 10.5757 62.7442 10.0454C61.412 9.49484 59.983 9.21652 58.5416 9.22684C57.1786 9.21949 55.8257 9.45963 54.5486 9.9356C53.3865 10.3696 52.3064 10.9974 51.3542 11.7923L49.5274 9.79584C49.4772 9.74518 49.409 9.71647 49.3377 9.71598H47.9202C47.853 9.71593 47.7885 9.7419 47.7401 9.78844C47.6917 9.83497 47.6632 9.89845 47.6606 9.96554V32.9253C47.6606 32.9941 47.688 33.0601 47.7367 33.1088C47.7853 33.1575 47.8514 33.1848 47.9202 33.1848H53.9696C54.0384 33.1848 54.1044 33.1575 54.1531 33.1088C54.2018 33.0601 54.2291 32.9941 54.2291 32.9253V19.7484C54.2279 19.199 54.34 18.6553 54.5586 18.1512C55.004 17.1425 55.8289 16.3499 56.8545 15.9451C57.9314 15.5161 59.1317 15.5161 60.2086 15.9451C60.7139 16.1515 61.1748 16.4532 61.5663 16.8335C61.9546 17.2093 62.2665 17.6568 62.4847 18.1512C62.7032 18.6553 62.8153 19.199 62.8141 19.7484V32.8454C62.8141 32.9142 62.8414 32.9803 62.8901 33.0289C62.9388 33.0776 63.0048 33.105 63.0736 33.105H69.123C69.1919 33.105 69.2579 33.0776 69.3065 33.0289C69.3552 32.9803 69.3826 32.9142 69.3826 32.8454V19.7484C69.3854 18.3381 69.0894 16.9432 68.5141 15.6556Z"
        fill="#070417"
      />
      <path
        d="M47.9205 2.78818C47.9407 2.73784 47.9457 2.68272 47.9351 2.62954C47.9245 2.57637 47.8986 2.52744 47.8606 2.48871C47.8178 2.45996 47.7674 2.4446 47.7159 2.4446C47.6643 2.4446 47.6139 2.45996 47.5711 2.48871L47.2816 2.62846C45.7443 3.4071 44.3867 2.3789 43.079 1.38065C42.2381 0.653404 41.1912 0.20672 40.0843 0.102894C39.6591 0.0999173 39.2357 0.15705 38.8265 0.272596H38.7666C38.1611 0.439664 37.5877 0.706165 37.0696 1.06121C37.0353 1.08434 37.0074 1.1156 36.9882 1.15219C36.9691 1.18877 36.9593 1.22955 36.9598 1.27085V7.57978C36.9574 7.62764 36.9695 7.6751 36.9944 7.71602C37.0193 7.75695 37.0559 7.78947 37.0995 7.80938H37.2093C37.2683 7.81067 37.3255 7.78922 37.369 7.74948L37.5587 7.59975H37.6286C37.6533 7.58517 37.6739 7.56456 37.6885 7.53985C38.0478 7.26034 38.3673 7.03074 38.6867 6.84108C39.4388 6.33321 40.336 6.08439 41.2422 6.13232H41.372H41.941C43.4565 6.36508 45.0035 6.0078 46.2634 5.13407L46.4531 5.05421C46.5737 4.94528 46.6871 4.82857 46.7925 4.70482H46.8524L47.0221 4.48521C47.3373 4.04194 47.5987 3.56274 47.8007 3.05771L47.9205 2.78818Z"
        fill="#070417"
      />
      <path
        d="M8.56938 23.0228C8.57823 22.9832 8.57834 22.9421 8.56973 22.9025C8.56111 22.8628 8.54396 22.8255 8.51947 22.7932C6.94213 20.9272 6.10391 18.5475 6.1636 16.1049C6.19975 14.4501 6.64193 12.8296 7.45127 11.3857C8.26061 9.94192 9.41231 8.71908 10.8051 7.82477C12.1979 6.93045 13.789 6.39205 15.4387 6.25692C17.0884 6.12179 18.746 6.39406 20.2657 7.04979C21.7855 7.70553 23.1208 8.72464 24.1543 10.0175C25.1878 11.3103 25.8879 12.8373 26.1928 14.4642C26.4978 16.091 26.3983 17.7679 25.9032 19.3473C25.4081 20.9267 24.5325 22.3603 23.3535 23.5219C23.3279 23.548 23.3084 23.5794 23.2963 23.6139C23.2842 23.6484 23.2799 23.6852 23.2836 23.7215C23.2835 23.7589 23.2926 23.7957 23.31 23.8287C23.3274 23.8618 23.3526 23.8901 23.3834 23.9112L23.9424 24.3205C25.4351 25.3525 27.1411 26.0349 28.9337 26.317C28.9733 26.3206 29.0133 26.3143 29.0499 26.2986C29.0865 26.2829 29.1186 26.2584 29.1433 26.2271C30.7191 24.19 31.7889 21.8078 32.2645 19.2766C32.7402 16.7453 32.6082 14.1373 31.8794 11.6671C31.1506 9.19678 29.8458 6.9348 28.0723 5.06714C26.2988 3.19948 24.1073 1.77949 21.678 0.923949C19.2487 0.0684112 16.651 -0.198234 14.0986 0.145943C11.5461 0.490119 9.11187 1.43529 6.99594 2.90371C4.88001 4.37213 3.14289 6.32187 1.92743 8.59257C0.71197 10.8633 0.0528951 13.3901 0.00440775 15.9651C-0.0761259 19.4157 0.948731 22.8015 2.92928 25.6282C2.96579 25.6815 3.02157 25.7186 3.08487 25.7316C3.14818 25.7447 3.21407 25.7326 3.26868 25.6981C4.89393 24.7016 6.61238 23.8658 8.39968 23.2025C8.43985 23.1875 8.47605 23.1635 8.50547 23.1324C8.5349 23.1012 8.55677 23.0637 8.56938 23.0228Z"
        fill="#070417"
      />
      <path
        d="M98.7606 0.438301C98.8857 0.188093 99.1047 0.0629883 99.4174 0.0629883H104.859C105.016 0.0629883 105.141 0.125541 105.235 0.250645C105.36 0.344473 105.422 0.469576 105.422 0.625956V32.3397C105.422 32.4961 105.36 32.6369 105.235 32.762C105.141 32.8558 105.016 32.9027 104.859 32.9027H99.3705C99.2141 32.9027 99.0734 32.8558 98.9483 32.762C98.8545 32.6369 98.8076 32.4961 98.8076 32.3397V11.51C98.8076 11.3849 98.7763 11.3223 98.7137 11.3223C98.6512 11.291 98.5886 11.3223 98.5261 11.4161L94.21 18.5471C94.0849 18.7973 93.866 18.9224 93.5532 18.9224H92.4742C92.1614 18.9224 91.9425 18.7973 91.8174 18.5471L87.5013 11.4161C87.4388 11.3223 87.3762 11.291 87.3137 11.3223C87.2511 11.3223 87.2198 11.3849 87.2198 11.51V32.3397C87.2198 32.4961 87.1573 32.6369 87.0322 32.762C86.9384 32.8558 86.8132 32.9027 86.6569 32.9027H81.1679C81.0116 32.9027 80.8708 32.8558 80.7457 32.762C80.6519 32.6369 80.605 32.4961 80.605 32.3397V0.625956C80.605 0.469576 80.6519 0.344473 80.7457 0.250645C80.8708 0.125541 81.0116 0.0629883 81.1679 0.0629883H86.61C86.9227 0.0629883 87.1416 0.188093 87.2667 0.438301L92.8964 9.68034C92.9902 9.86799 93.0841 9.86799 93.1779 9.68034L98.7606 0.438301Z"
        fill="#3B82F6"
      />
      <path
        d="M129.295 17.1866C129.389 18.2187 129.436 19.3602 129.436 20.6113L129.389 22.4409C129.389 22.8162 129.201 23.0039 128.826 23.0039H116.394C116.237 23.0039 116.159 23.0821 116.159 23.2385C116.222 23.9578 116.284 24.4895 116.347 24.8335C116.503 25.7092 116.878 26.3973 117.473 26.8977C118.098 27.3981 118.864 27.6484 119.771 27.6484C121.304 27.6171 122.367 26.9134 122.962 25.5372C123.118 25.2245 123.353 25.0994 123.665 25.1619L128.638 26.1471C129.013 26.2409 129.139 26.4755 129.013 26.8508C128.325 28.915 127.184 30.5101 125.589 31.636C124.025 32.7307 122.086 33.278 119.771 33.278C116.988 33.278 114.767 32.6525 113.11 31.4015C111.483 30.1192 110.42 28.2895 109.92 25.9125C109.638 24.6302 109.497 22.6755 109.497 20.0483C109.497 18.5471 109.591 17.2804 109.779 16.2483C110.123 13.8713 111.155 11.9791 112.875 10.5717C114.595 9.13301 116.769 8.41366 119.396 8.41366C122.242 8.41366 124.557 9.22684 126.339 10.8532C128.122 12.4483 129.107 14.5594 129.295 17.1866ZM119.443 14.0902C118.599 14.0902 117.895 14.3404 117.332 14.8409C116.8 15.3413 116.456 16.0293 116.3 16.9051C116.206 17.468 116.159 18.0623 116.159 18.6878C116.159 18.8442 116.237 18.9224 116.394 18.9224H122.492C122.649 18.9224 122.727 18.8442 122.727 18.6878C122.727 18.0623 122.68 17.468 122.586 16.9051C122.461 16.0606 122.117 15.3882 121.554 14.8878C120.991 14.3561 120.288 14.0902 119.443 14.0902Z"
        fill="#3B82F6"
      />
      <path
        d="M157.358 8.41366C159.641 8.41366 161.377 9.14865 162.566 10.6186C163.785 12.0573 164.395 14.0902 164.395 16.7174V32.3397C164.395 32.4961 164.333 32.6369 164.208 32.762C164.114 32.8558 163.989 32.9027 163.832 32.9027H158.39C158.234 32.9027 158.093 32.8558 157.968 32.762C157.874 32.6369 157.827 32.4961 157.827 32.3397V17.6557C157.827 16.561 157.562 15.701 157.03 15.0754C156.529 14.4186 155.841 14.0902 154.966 14.0902C154.059 14.0902 153.339 14.4186 152.808 15.0754C152.276 15.701 152.01 16.5454 152.01 17.6088V32.3397C152.01 32.4961 151.948 32.6369 151.822 32.762C151.729 32.8558 151.604 32.9027 151.447 32.9027H146.005C145.849 32.9027 145.708 32.8558 145.583 32.762C145.489 32.6369 145.442 32.4961 145.442 32.3397V17.6557C145.442 16.561 145.176 15.701 144.645 15.0754C144.113 14.4186 143.409 14.0902 142.533 14.0902C141.626 14.0902 140.907 14.4186 140.375 15.0754C139.844 15.701 139.578 16.5454 139.578 17.6088V32.3397C139.578 32.4961 139.515 32.6369 139.39 32.762C139.296 32.8558 139.171 32.9027 139.015 32.9027H133.573C133.417 32.9027 133.276 32.8558 133.151 32.762C133.057 32.6369 133.01 32.4961 133.01 32.3397V9.35194C133.01 9.19556 133.057 9.07045 133.151 8.97663C133.276 8.85152 133.417 8.78897 133.573 8.78897H139.015C139.171 8.78897 139.296 8.85152 139.39 8.97663C139.515 9.07045 139.578 9.19556 139.578 9.35194V10.5717C139.578 10.6655 139.609 10.7281 139.672 10.7594C139.734 10.7906 139.797 10.7594 139.859 10.6655C140.516 9.88363 141.282 9.32066 142.158 8.97663C143.034 8.60132 143.972 8.41366 144.973 8.41366C146.38 8.41366 147.585 8.71078 148.585 9.30503C149.617 9.86799 150.415 10.6968 150.978 11.7915C151.009 11.854 151.056 11.8853 151.119 11.8853C151.181 11.854 151.244 11.7915 151.306 11.6976C151.994 10.5404 152.87 9.71161 153.934 9.2112C154.997 8.67951 156.139 8.41366 157.358 8.41366Z"
        fill="#3B82F6"
      />
      <path
        d="M178.09 33.278C175.369 33.278 173.133 32.6056 171.381 31.2607C169.661 29.8846 168.629 28.008 168.285 25.6311C168.035 24.1924 167.909 22.5817 167.909 20.7989C167.909 18.9849 168.035 17.3742 168.285 15.9668C168.629 13.6524 169.661 11.8227 171.381 10.4779C173.133 9.10173 175.369 8.41366 178.09 8.41366C180.78 8.41366 182.969 9.10173 184.658 10.4779C186.378 11.8227 187.426 13.6524 187.801 15.9668C188.051 17.3742 188.176 18.9849 188.176 20.7989C188.176 22.5504 188.051 24.1455 187.801 25.5841C187.457 27.9924 186.425 29.8846 184.705 31.2607C183.016 32.6056 180.811 33.278 178.09 33.278ZM178.09 27.6014C178.903 27.6014 179.591 27.3356 180.154 26.8039C180.748 26.2722 181.139 25.5529 181.327 24.6459C181.483 23.3323 181.561 22.05 181.561 20.7989C181.561 19.5166 181.483 18.2499 181.327 16.9989C181.17 16.0919 180.795 15.3882 180.201 14.8878C179.638 14.3561 178.919 14.0902 178.043 14.0902C177.198 14.0902 176.479 14.3561 175.885 14.8878C175.322 15.3882 174.962 16.0919 174.806 16.9989C174.649 17.9372 174.571 19.2039 174.571 20.7989C174.571 22.3627 174.634 23.645 174.759 24.6459C174.947 25.5529 175.338 26.2722 175.932 26.8039C176.526 27.3356 177.245 27.6014 178.09 27.6014Z"
        fill="#3B82F6"
      />
    </svg>
  );
};

// Propsのデフォルト値
LogoIcon.defaultProps = {
  className: "",
  size: "small",
};
