import { shade } from 'polished';
import styled from 'styled-components';

import { colors } from '../../styles';

export const Container = styled.div`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: 'Varela Round', sans-serif;

  .modal-confirm {
    color: #636363;
    width: 400px;
  }

  .modal-confirm .modal-content {
    padding: 20px;
    border-radius: 5px;
    border: none;
    text-align: center;
    font-size: 14px;
  }
  .modal-confirm .modal-header {
    border-bottom: none;
    position: relative;
  }
  .modal-confirm h4 {
    text-align: center;
    font-size: 26px;
    margin: 30px 0 -10px;
  }
  .modal-confirm .modal-body {
    color: #999;
  }

  .modal-confirm .btn,
  .modal-confirm .btn:active {
    color: #fff;
    border-radius: 4px;
    background: #60c7c1;
    text-decoration: none;
    transition: all 0.4s;
    line-height: normal;
    min-width: 120px;
    border: none;
    min-height: 40px;
    border-radius: 3px;
    margin: 0 5px;
  }

  button {
    margin-top: 48px;
    align-self: flex-end;
  }
`;

export const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 80px;
  height: 80px;
  margin: 0 auto;
  border-radius: 50%;
  z-index: 9;
  text-align: center;
  border: 3px solid #f15e5e;

  svg {
    color: #f15e5e;
    width: 35px;
    height: 35px;
  }
`;

export const ModalFooter = styled.div`
  width: 100%;
  border: none;
  text-align: center;
  border-radius: 5px;
  font-size: 13px;
  padding: 15px 15px 15px;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const ButtonDelete = styled.button`
  border: 0;

  width: 45%;
  height: 2.8rem;
  background: ${colors.colorButtonTextSecudary};
  color: ${colors.colorButtonText};
  border-radius: 0.2rem;

  font: 700 0.8rem Poppins;

  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.2s;
  margin-top: 0.2rem;
  font-weight: bold;

  span {
    display: block;
    background: rgba(0, 0, 0, 0.08);
    width: 52px;
    height: 2.8rem;
    border-radius: 0.6rem 0 0 0.6rem;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
    svg {
      color: #fff;
      width: 20px;
      height: 20px;
    }
  }

  strong {
    flex: 1;
    text-align: center;
    color: #fff;
  }

  &:hover {
    background: ${shade(0.2, `${colors.colorButtonTextSecudary}`)};
  }
`;

export const ButtonCancel = styled.button`
  border: 0;

  width: 45%;
  height: 2.8rem;
  background: ${colors.colorTextInWhite};
  color: ${colors.colorButtonText};
  border-radius: 0.2rem;
  font-weight: bold;
  font: 700 0.8rem Poppins;

  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.2s;
  margin-top: 0.2rem;

  span {
    display: block;
    background: rgba(0, 0, 0, 0.08);
    width: 52px;
    height: 2.8rem;
    border-radius: 0.4rem 0 0 0.4rem;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
    svg {
      color: #fff;
      width: 20px;
      height: 20px;
    }
  }

  strong {
    flex: 1;
    text-align: center;
    color: #fff;
  }

  &:hover {
    background: ${shade(0.2, `${colors.colorTextInWhite}`)};
  }
`;

export const ButtonClose = styled.button`
  position: absolute;
  top: -125px;
  margin-left: 480px;

  border: 0;
  width: 46px;
  height: 46px;
  border-radius: 23px;
  background: none;
  color: ${colors.colorButtonText};

  font-weight: bold;
  font: 700 0.8rem Poppins;

  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.2s;

  span {
    display: block;
    background: rgba(0, 0, 0, 0.08);
    width: 46px;
    height: 46px;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
    border-radius: 23px;
    svg {
      color: #fff;
      width: 20px;
      height: 20px;
    }
  }

  strong {
    flex: 1;
    text-align: center;
    color: #fff;
  }

  &:hover {
    background: ${shade(0.2, `${colors.colorTextInWhite}`)};
  }
`;
