import loginBackground from '../assets/loginBackground.png'
import styled from "styled-components";

export const LoginBackground = styled.div`
  width: 100%;
  flex: 1;
  // height: calc(100vh);
  // overflow: auto;
  background-size: cover;
  background-position: center;
  background-image: url(${loginBackground});
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  min-width: 50%;
  width: 600px;
  max-width: 100%;
  height: calc(100vh);
  text-align: center;
  background: linear-gradient(180deg, #118869 0%, #062F57 59.93%);
  overflow: auto;
  // @media only screen and (max-width: 600px) {
  //   min-width: unset;
  //   width:100vh;
  // }
`

export const Logo = styled.img`
  width: 700px;
  max-width: 100%;
`

export const loginButtonStyle = {
  color: '#878787',
  background: 'white',
  borderRadius: '20px',
  padding: '16px 28px',
}