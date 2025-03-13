'use client';
import styled from 'styled-components';

export const StyledAnchor = styled.a`
  &:hover {
    button {
      opacity: 1;
    }

    span {
      width: calc(100% - 2.5rem);
    }
  }

  span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0;
    transition: opacity 0.2s;
    width: 2.5rem;
  }
`;
