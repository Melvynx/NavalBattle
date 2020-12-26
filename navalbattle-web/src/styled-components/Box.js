import styled from 'styled-components';

/*
  Flex component!

  For all simple element use flexBox.
*/
const Box = styled.div(
  {
    display: 'flex',
  },
  (props) => ({
    alignItems: props.alignItems || null,
  }),
  (props) => ({
    flexDirection: props.flexDirection || null,
  }),
  (props) => ({
    justifyContent: props.justifyContent || null,
  }),
  (props) => ({
    margin: props.margin || null,
  }),
  (props) => ({
    alignItems: props.alignItems || null,
  })
);

Box.displayName = 'FlexBox';

export default Box;
