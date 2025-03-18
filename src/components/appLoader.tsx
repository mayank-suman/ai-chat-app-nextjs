'use client';
import { useAppLoader } from '@/hooks/use-app-loader';
import styled, { keyframes } from 'styled-components';

const IndeterminateAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const ProgressContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  overflow: hidden;
  z-index: 9999;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 100%;
  background-color: #5f2ffe;
  transform-origin: 0 50%;
  animation: ${IndeterminateAnimation} 2s
    cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
`;

const AppLoader = () => {
  const { isLoading } = useAppLoader();

  return isLoading ? (
    <ProgressContainer
      aria-label='Loading...'
      role='progressbar'
    >
      <ProgressBar />
    </ProgressContainer>
  ) : null;
};

export default AppLoader;
