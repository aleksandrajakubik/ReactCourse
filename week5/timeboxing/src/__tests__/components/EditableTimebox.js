import React from "react";
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import EditableTimebox from '../../components/EditableTimebox';

describe('<EditableTimebox />', () => {
    afterEach(cleanup);
    it('shows edit button', () => {
        const { getByText } = render(<EditableTimebox />);
        expect( () => {
            getByText("Edit")
        }).not.toThrow();

    });

    it('allows editing the timebox', () => {
        const { getByText } = render(<EditableTimebox />);
        
        userEvent.click(screen.getByText("Edit"));
        userEvent.type(screen.getByLabelText(/doing/), "Is my test working?")
        userEvent.click(screen.getByText(/changes/));

        expect( () => {
            getByText("Is my test working?")
        }).not.toThrow();

    });
});