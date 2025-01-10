import React from 'react';
import { render, screen } from '@testing-library/react';
import DataModal from './DataModal';

test('renders DataModal component', () => {
    render(<DataModal />);
    const linkElement = screen.getByText(/data modal/i);
    expect(linkElement).toBeInTheDocument();
});