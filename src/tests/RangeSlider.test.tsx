import { render, screen, fireEvent } from '@testing-library/react';
import { RangeSlider } from '../components/Widgets/SliderCircle/RangeSlider'; // Adjust the import based on your file structure

describe('RangeSlider Component', () => {

  // Test: it renders the slider with the given value and its min/max properties
  it('renders the slider with initial value, min, and max', () => {
    const mockOnChange = jest.fn();

    render(<RangeSlider value={5} onChange={mockOnChange} min={0} max={10} step={1} />);

    // Ensure the slider has the correct value, min, and max
    const slider = screen.getByRole('slider') as HTMLInputElement;

    expect(slider).toHaveValue('5');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '10');
    expect(slider).toHaveAttribute('step', '1');
  });

  // Test: it shows the tooltip when the slider is focused or hovered
  it('displays the tooltip when focused or hovered', () => {
    const mockOnChange = jest.fn();
    render(<RangeSlider value={5} onChange={mockOnChange} min={0} max={10} step={1} />);

    const slider = screen.getByRole('slider');
    const tooltip = screen.getByTestId('tooltip');

    // Initially, the tooltip should be hidden
    expect(tooltip).toHaveStyle('visibility: hidden');

    // Simulate focus or hover
    fireEvent.mouseEnter(slider);
    expect(tooltip).toHaveStyle('visibility: visible');

    // Simulate mouse leave
    fireEvent.mouseLeave(slider);
    expect(tooltip).toHaveStyle('visibility: hidden');
  });

  // Test: it calls onChange when slider value is changed
  it('calls onChange when the slider value changes', () => {
    const mockOnChange = jest.fn();
    render(<RangeSlider value={5} onChange={mockOnChange} min={0} max={10} step={1} />);

    const slider = screen.getByRole('slider');
    
    // Simulate changing the value of the slider
    fireEvent.change(slider, { target: { value: 8 } });
    
    // Check if the onChange callback was called with the new value
    expect(mockOnChange).toHaveBeenCalledWith(8);
  });

  // Test: it correctly clamps the value to the allowed range
  it('clamps the value when it goes beyond the min or max', () => {
    const mockOnChange = jest.fn();
    render(<RangeSlider value={5} onChange={mockOnChange} min={0} max={10} step={1} />);

    const slider = screen.getByRole('slider');

    // Simulate changing the slider value to 15, which should be clamped to max value (10)
    fireEvent.change(slider, { target: { value: 15 } });
    expect(mockOnChange).toHaveBeenCalledWith(10);

    // Simulate changing the slider value to -5, which should be clamped to min value (0)
    fireEvent.change(slider, { target: { value: -5 } });
    expect(mockOnChange).toHaveBeenCalledWith(0);
  });

});
