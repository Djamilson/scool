import { shade } from 'polished';
import styled from 'styled-components';

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-items: center;

  img {
    width: 146px;
    height: 146px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    bottom: 0;
    right: 0;
    border-radius: 50%;
    background: #ff9000;
    border: 0;
    transition: background-color 0.2s;

    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
