import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import RomanConverter from "./RomanConverter";


describe('<RomanConverter />', () => {
    afterEach(cleanup);

    it('has an input field', () => {
        const { getByLabelText } = render(<RomanConverter />);
        expect(() => {
            getByLabelText(/arabic/i)
        }).not.toThrow();
    });
    it('shows no roman number by default', () => {
        const { getByText } = render(<RomanConverter />);
        expect(() => {
            getByText("Roman: none")
        }).not.toThrow();
    });
    
});