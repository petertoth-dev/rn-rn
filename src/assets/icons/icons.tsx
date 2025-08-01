import Svg, { Path } from 'react-native-svg';
import { Theme } from '@src/themes/theme.context.tsx';

/**
 * Interface for icon component props
 */
export interface IconProps {
  /** The height of the icon (default: 28) */
  height?: number;
  /** The width of the icon (default: 28) */
  width?: number;
  /** The color of the icon (default: current theme's text color) */
  color?: string;
  /** Any additional props to pass to the SVG component */
  [key: string]: any;
}

/**
 * Icon components for the application.
 * 
 * This file contains SVG-based icon components that can be used throughout the application.
 * Each icon component accepts an object of props (IconProps):
 * 
 * @param {IconProps} props - The props object containing:
 *   - height: number - The height of the icon (default: 28)
 *   - width: number - The width of the icon (default: 28)
 *   - color: string - The color of the icon (default: current theme's text color)
 *   - ...restProps: any - Any additional props to pass to the SVG component
 * 
 * Usage example:
 * ```tsx
 * import { ChevronLeftIcon } from '@src/assets/icons/icons';
 * 
 * // With default props
 * <ChevronLeftIcon />
 * 
 * // With custom props
 * <ChevronLeftIcon height={24} width={24} color="#FF0000" />
 * ```
 * 
 * To add a new icon:
 * 1. Import the SVG paths or elements
 * 2. Create a new component following the pattern of existing icons
 * 3. Export the component with appropriate default props
 */

export const ChevronLeftIcon = ({height = 28, width = 28, color = Theme().colors.text, ...restProps}: IconProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...restProps}
    viewBox="0 0 24 24"
  >
    <Path
      d="M9.52491 12L16.8749 4.65C17.1249 4.4 17.2459 4.104 17.2379 3.762C17.2299 3.42 17.1006 3.12433 16.8499 2.875C16.5999 2.625 16.3039 2.5 15.9619 2.5C15.6199 2.5 15.3242 2.625 15.0749 2.875L7.39991 10.575C7.19991 10.775 7.04991 11 6.94991 11.25C6.84991 11.5 6.79991 11.75 6.79991 12C6.79991 12.25 6.84991 12.5 6.94991 12.75C7.04991 13 7.19991 13.225 7.39991 13.425L15.0999 21.125C15.3499 21.375 15.6416 21.496 15.9749 21.488C16.3082 21.48 16.5999 21.3507 16.8499 21.1C17.0999 20.85 17.2249 20.554 17.2249 20.212C17.2249 19.87 17.0999 19.5743 16.8499 19.325L9.52491 12Z"
      fill={color}
    />
  </Svg>
);

export const ChevronRightIcon = ({height = 28, width = 28, color = Theme().colors.text, ...restProps}: IconProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    style={{transform: [{rotateY: '180deg'}]}}
    {...restProps}
    viewBox="0 0 28 28"
  >
    <Path
      d="M9.52491 12L16.8749 4.65C17.1249 4.4 17.2459 4.104 17.2379 3.762C17.2299 3.42 17.1006 3.12433 16.8499 2.875C16.5999 2.625 16.3039 2.5 15.9619 2.5C15.6199 2.5 15.3242 2.625 15.0749 2.875L7.39991 10.575C7.19991 10.775 7.04991 11 6.94991 11.25C6.84991 11.5 6.79991 11.75 6.79991 12C6.79991 12.25 6.84991 12.5 6.94991 12.75C7.04991 13 7.19991 13.225 7.39991 13.425L15.0999 21.125C15.3499 21.375 15.6416 21.496 15.9749 21.488C16.3082 21.48 16.5999 21.3507 16.8499 21.1C17.0999 20.85 17.2249 20.554 17.2249 20.212C17.2249 19.87 17.0999 19.5743 16.8499 19.325L9.52491 12Z"
      fill={color}
    />
  </Svg>
);

export const ChevronDownIcon = ({height = 28, width = 28, color = Theme().colors.text, ...restProps}: IconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...restProps}
  >
    <Path
      d="M12 14.4751L4.65 7.12509C4.4 6.87509 4.104 6.75409 3.762 6.76209C3.42 6.77009 3.12433 6.89942 2.875 7.15009C2.625 7.40009 2.5 7.69609 2.5 8.03809C2.5 8.38009 2.625 8.67576 2.875 8.92509L10.575 16.6001C10.775 16.8001 11 16.9501 11.25 17.0501C11.5 17.1501 11.75 17.2001 12 17.2001C12.25 17.2001 12.5 17.1501 12.75 17.0501C13 16.9501 13.225 16.8001 13.425 16.6001L21.125 8.90009C21.375 8.65009 21.496 8.35842 21.488 8.02509C21.48 7.69176 21.3507 7.40009 21.1 7.15009C20.85 6.90009 20.554 6.77509 20.212 6.77509C19.87 6.77509 19.5743 6.90009 19.325 7.15009L12 14.4751Z"
      fill={color}
    />
  </Svg>
);

export const ChevronUpIcon = ({height = 28, width = 28, color = Theme().colors.text, ...restProps}: IconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...restProps}
  >
    <Path
      d="M7.99935 2.93742L14.1243 9.06242C14.3327 9.27076 14.5793 9.37159 14.8643 9.36492C15.1493 9.35826 15.3957 9.25048 15.6035 9.04159C15.8118 8.83326 15.916 8.58659 15.916 8.30159C15.916 8.01659 15.8118 7.7702 15.6035 7.56242L9.18685 1.16659C9.02018 0.999923 8.83268 0.874924 8.62435 0.791591C8.41602 0.708258 8.20768 0.66659 7.99935 0.66659C7.79102 0.66659 7.58268 0.708258 7.37435 0.791591C7.16602 0.874924 6.97852 0.999923 6.81185 1.16659L0.395183 7.58326C0.18685 7.79159 0.0860157 8.03465 0.0926819 8.31242C0.099349 8.5902 0.207127 8.83326 0.416016 9.04159C0.624349 9.24992 0.871017 9.35409 1.15602 9.35409C1.44102 9.35409 1.6874 9.24992 1.89518 9.04159L7.99935 2.93742Z"
      fill={color}
    />
  </Svg>
);
