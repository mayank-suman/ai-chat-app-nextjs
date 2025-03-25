'use client';
import styled from 'styled-components';

const StyledLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  padding: 1rem;

  header {
    h1 {
      font-size: 2rem;
      text-align: center;
    }
  }

  .chats {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 2rem;

    .chat {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .user-prompt {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        h2 {
          font-size: 1rem;
        }
      }

      .ai-response {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
        align-items: center;

        p {
          font-size: 1rem;
          max-width: 80%;
        }

        svg.lucide-zap {
          min-width: 24px;
        }
      }
    }
  }

  footer {
    display: flex;
    justify-content: center;
    position: sticky;
    bottom: 0;
    padding: 1rem;
  }
`;

export default StyledLayout;
