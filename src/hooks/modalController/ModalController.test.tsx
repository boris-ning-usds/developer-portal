import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest';
import * as React from 'react';
import { useModalController } from './ModalController';

const TestComponent = (): JSX.Element => {
  const { modalVisible, setModalVisible } = useModalController();

  // False values are rendered as blank. This helper shows the actual value
  const displayModalVisibility = (): string => (modalVisible ? 'true' : 'false');

  return (
    <div>
      <p>Modal Visible: {displayModalVisibility()}</p>
      <div>
        <input
          type="button"
          id="toggle-visible"
          onClick={(): void => setModalVisible(!modalVisible)}
        />
      </div>
    </div>
  );
};

describe('useModalController', () => {
  let container: HTMLElement;
  let toggleVisibleButton: HTMLElement;

  beforeEach(() => {
    /**
     * Note: I did not use the renderHook functionality because it doesn't give access to
     * elements, which means I was unable to test the [Escape] key functionality
     * This test should give full coverage to the ModalController hook though
     */
    ({ container } = render(<TestComponent />));

    toggleVisibleButton = screen.getByRole('button');
  });

  afterEach(async () => {
    await waitFor(() => cleanup());
  });

  it('initializes to be invisible', async () => {
    await waitFor(() => expect(screen.findByText('Modal Visible: false')).toBeDefined());
  });

  it('turns visible when modal visible is set to true', async () => {
    userEvent.click(toggleVisibleButton);
    await waitFor(() => expect(screen.findByText('Modal Visible: true')).toBeDefined());
  });

  describe('when visible', () => {
    beforeEach(() => {
      // The component initialized as invisible, so we toggle it before these tests
      userEvent.click(toggleVisibleButton);
    });

    it('goes invisible when the [Escape] key is pressed', async () => {
      await waitFor(() => userEvent.type(container, '{esc}'));
      await waitFor(() => expect(screen.findByText('Modal Visible: false')).toBeDefined());
    });

    it('does not go invisible when a key other than [Escape] is pressed', async () => {
      await waitFor(() => userEvent.type(container, 'A'));
      await waitFor(() => expect(screen.findByText('Modal Visible: true')).toBeDefined());
    });

    it('goes invisible when modal visible is set to false', async () => {
      userEvent.click(toggleVisibleButton);
      await waitFor(() => expect(screen.findByText('Modal Visible: false')).toBeDefined());
    });
  });
});
