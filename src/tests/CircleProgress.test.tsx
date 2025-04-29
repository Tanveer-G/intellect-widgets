import { render, screen, waitFor } from '@testing-library/react';
import { CircleProgress } from '../components/Widgets/SliderCircle/CircleProgress';
import userEvent from '@testing-library/user-event';

jest.mock('../hooks/useDebounce.ts', () => ({
  __esModule: true,
  default: jest.fn((value) => value),
}));

// Test case: Rendering the CircleProgress component
describe('CircleProgress Component', () => {
  it('should render the component with the given value and size', () => {
    render(<CircleProgress value={5} onChange={jest.fn()} min={0} max={10} size={200} />);

    // Check if the input field contains the correct value (5 in this case)
    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(input).toHaveValue(5);

    // Check if the SVG circle has the correct role and attributes
    const svg = screen.getByRole('progress');
    expect(svg).toHaveAttribute('aria-valuemin', '0');
    expect(svg).toHaveAttribute('aria-valuemax', '10');
    expect(svg).toHaveAttribute('aria-valuenow', '5');
  });

  // Test case: Handling input value change and calling onChange
  it('should update the value when the input is changed', async () => {
    const onChange = jest.fn();
    render(<CircleProgress value={5} onChange={onChange} min={0} max={10} size={200} />);

    // Select input field
    const input = screen.getByRole('spinbutton');
    
    // Simulate input change
    userEvent.clear(input);  // Clear existing value
    userEvent.type(input, '7');  // Type a new value

    // Wait for the debounce to take effect
    await waitFor(() => expect(onChange).toHaveBeenCalledWith(7));
  });

  // Test case: Clamping values outside the valid range
  it('should clamp the value to min and max range', async () => {
    const onChange = jest.fn();
    render(<CircleProgress value={5} onChange={onChange} min={0} max={10} size={200} />);

    const input = screen.getByRole('spinbutton');
    userEvent.clear(input);
    
    // Test clamping behavior when the value is out of range
    userEvent.type(input, '12'); // A value greater than the max

    await waitFor(() => expect(onChange).toHaveBeenCalledWith(10)); // Clamped to max value
    
    userEvent.clear(input);
    userEvent.type(input, '-3'); // A value less than the min

    await waitFor(() => expect(onChange).toHaveBeenCalledWith(0)); // Clamped to min value
  });

  // Test case: Debounced input handling
  it('should debounce the input change', async () => {
    const onChange = jest.fn();
    render(<CircleProgress value={5} onChange={onChange} min={0} max={10} size={200} />);

    const input = screen.getByRole('spinbutton');
    
    // Simulate user typing with a delay
    userEvent.clear(input);
    userEvent.type(input, '7');
    
    // Simulate the user typing without triggering an immediate callback (due to debounce)
    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
    expect(onChange).toHaveBeenCalledWith(7); // After debounce, should be called with 7
  });

  
});
