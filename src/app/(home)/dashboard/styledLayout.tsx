'use client';
import styled from 'styled-components';

export const StyledSection = styled.section`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'main footer';
`;
