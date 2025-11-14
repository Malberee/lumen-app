import Svg, { Path, type SvgProps } from 'react-native-svg'

export const GaugeIcon = (props: SvgProps) => {
  return (
    <Svg width="14" height="14" viewBox="0 0 12 12" fill="none" {...props}>
      <Path
        d="M6 7L8 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.67 9.49998C1.23111 8.73988 1.00003 7.87765 1 6.99995C0.999967 6.12224 1.23098 5.25999 1.66981 4.49987C2.10864 3.73974 2.73984 3.10852 3.49994 2.66966C4.26005 2.2308 5.1223 1.99976 6 1.99976C6.8777 1.99976 7.73995 2.2308 8.50006 2.66966C9.26016 3.10852 9.89136 3.73974 10.3302 4.49987C10.769 5.25999 11 6.12224 11 6.99995C11 7.87765 10.7689 8.73988 10.33 9.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
