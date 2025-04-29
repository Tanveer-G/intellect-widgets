import { render, screen, fireEvent } from '@testing-library/react';
import FunnelScale from '../components/Widgets/FunnelScale/FunnelScale';
import { LEVELS, LEVEL_LABELS } from '../constants/funnelScale';
import { getLevelFromEvent, getNextLevel } from '../utils/funnelScaleUtils';

describe('funnelScaleUtils', () => {
  describe('getNextLevel', () => {
    const max = LEVELS;
    it('increments level on ArrowUp/ArrowRight', () => {
      expect(getNextLevel('ArrowUp', 1, max)).toBe(2);
      expect(getNextLevel('ArrowRight', 2, max)).toBe(3);
    });

    it('does not go above max', () => {
      expect(getNextLevel('ArrowUp', max, max)).toBe(max);
    });

    it('decrements level on ArrowDown/ArrowLeft', () => {
      expect(getNextLevel('ArrowDown', 3, max)).toBe(2);
      expect(getNextLevel('ArrowLeft', 2, max)).toBe(1);
    });

    it('does not go below 1', () => {
      expect(getNextLevel('ArrowDown', 1, max)).toBe(1);
    });

    it('Home resets to min', () => {
      expect(getNextLevel('Home', 3, max)).toBe(1);
    });

    it('End resets to max', () => {
      expect(getNextLevel('End', 2, max)).toBe(max);
    });

    it('ignores unrelated keys', () => {
      expect(getNextLevel('Enter', 2, max)).toBe(2);
    });
  });

  describe('getLevelFromEvent', () => {
    it('returns a level when clicked on a bar element', () => {
      const fakeLabel = document.createElement('label');
      fakeLabel.setAttribute('data-level', '4');
      // Correctly typed event
      const fakeEvent = { target: fakeLabel } as MouseEvent<HTMLElement>;
      expect(getLevelFromEvent(fakeEvent)).toBe(4);
    });

    it('returns undefined if no data-level', () => {
      const div = document.createElement('div');
      // Correctly typed event
      const fakeEvent = { target: div } as MouseEvent<HTMLElement>;
      expect(getLevelFromEvent(fakeEvent)).toBeUndefined();
    });
  });
});

describe('<FunnelScale />', () => {
  beforeEach(() => {
    render(<FunnelScale />);
  });

  it('renders correct number of radio inputs', () => {
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(LEVELS);
  });

  it('has initial selection label matching LEVEL_LABELS[0]', () => {
    const initialLabel = LEVEL_LABELS[0];
    expect(screen.getByText(initialLabel)).toBeInTheDocument();
  });

  it('clicking a bar updates the selection', () => {
    const secondLabel = LEVEL_LABELS[1];
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent(LEVEL_LABELS[0]); // "Very Low", which should be the default
   
    const secondInput = screen.getByTestId(secondLabel);
    fireEvent.click(secondInput);
    expect(output).toHaveTextContent(secondLabel); // "Low"
  });

  it('ArrowUp key increases selection', () => {
    const group = screen.getByRole('radiogroup');
    fireEvent.keyDown(group, { key: 'ArrowUp' });
    const expectedLabel = LEVEL_LABELS[1];
    expect(screen.getByText(expectedLabel)).toBeInTheDocument();
  });

  it('Home key resets to level 1', () => {
    const group = screen.getByRole('radiogroup');
    // Move to level 3 first
    fireEvent.keyDown(group, { key: 'End' });
    expect(screen.getByText(LEVEL_LABELS[LEVELS - 1])).toBeInTheDocument();
    // Home resets
    fireEvent.keyDown(group, { key: 'Home' });
    expect(screen.getByText(LEVEL_LABELS[0])).toBeInTheDocument();
  });

  it('End key sets to max level', () => {
    const group = screen.getByRole('radiogroup');
    fireEvent.keyDown(group, { key: 'End' });
    expect(screen.getByText(LEVEL_LABELS[LEVELS - 1])).toBeInTheDocument();
  });

  it('does not change on unrelated key', () => {
    const group = screen.getByRole('radiogroup');
    const beforeLabel = LEVEL_LABELS[0];
    fireEvent.keyDown(group, { key: 'Enter' });
    expect(screen.getByText(beforeLabel)).toBeInTheDocument();
  });
});
