import Svg, { Path, type SvgProps } from 'react-native-svg'

export const PowerIcon = (props: SvgProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 2V12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.3998 6.59998C19.6564 7.85708 20.5127 9.45815 20.8606 11.2013C21.2085 12.9444 21.0325 14.7515 20.3547 16.3947C19.6769 18.0378 18.5277 19.4435 17.052 20.4345C15.5764 21.4254 13.8403 21.9572 12.0629 21.9627C10.2854 21.9683 8.54605 21.4474 7.06422 20.4657C5.58239 19.4841 4.42443 18.0856 3.73635 16.4467C3.04828 14.8078 2.86091 13.0018 3.19788 11.2566C3.53485 9.51133 4.38106 7.90493 5.6298 6.63998"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
