export function getColorTheme(props) {
  if (props.color === 'primary') {
    return props?.theme?.primary;
  } else if (props.color === 'secondary') {
    return props?.theme?.secondary;
  } else {
    return props?.theme?.primary;
  }
}
