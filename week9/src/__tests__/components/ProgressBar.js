import React from "react";
import ProgressBar from "../../components/ProgressBar";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";


let root = null;
describe("<ProgressBar />", () => {
    describe("when given className and percent (DOM)", () => {
        beforeEach(() => {
            root = document.createElement("div");
            ReactDOM.render(
                <ProgressBar className="" percent={20} />, root
            )
        });

        it("renders div", () => {
            expect(root.childNodes[0].nodeName).toEqual("DIV");
        });
        it('set className to progress  progress--color-green if empty string given', () => {
            expect(root.childNodes[0].className).toMatch(/progress  progress--color-green/);
        });

    }); 

    });