import Svg, {
  SvgProps,
  G,
  Path,
  Mask,
  Circle,
  Rect,
  Defs,
  ClipPath,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const NotificationSvg = (props: SvgProps) => (
  <Svg width={244} height={244} viewBox="0 0 244 244" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#32393E"
        d="M122 244c67.379 0 122-54.621 122-122C244 54.621 189.379 0 122 0 54.621 0 0 54.621 0 122c0 67.379 54.621 122 122 122Z"
      />
      <Mask
        id="b"
        width={244}
        height={244}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
      >
        <Path
          fill="#EA9292"
          d="M122 244c67.379 0 122-54.621 122-122C244 54.621 189.379 0 122 0 54.621 0 0 54.621 0 122c0 67.379 54.621 122 122 122Z"
        />
      </Mask>
      <G mask="url(#b)">
        <Path
          fill="#F9F9F9"
          d="M37 84c0-19.882 16.118-36 36-36h98c19.882 0 36 16.118 36 36v160H37V84Z"
        />
        <Path
          fill="#1A1C29"
          fillRule="evenodd"
          d="M37 244h7V84c0-16.016 12.984-29 29-29h98c16.016 0 29 12.984 29 29v160h7V84c0-19.882-16.118-36-36-36H73c-19.882 0-36 16.118-36 36v160Z"
          clipRule="evenodd"
        />
      </G>
      <G filter="url(#c)">
        <Path
          fill="#fff"
          d="M207 103H36c-8.837 0-16 6.669-16 14.897v24.206C20 150.331 27.163 157 36 157h171c8.837 0 16-6.669 16-14.897v-24.206c0-8.228-7.163-14.897-16-14.897Z"
        />
      </G>
      <G fill="#CAE7CB">
        <Circle cx={39} cy={126} r={9} />
        <Rect width={49} height={9} x={55} y={117} rx={4.5} />
        <Rect width={149} height={9} x={55} y={133} rx={4.5} />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h244v244H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export { NotificationSvg };
