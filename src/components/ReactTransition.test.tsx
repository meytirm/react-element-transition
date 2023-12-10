import {render, screen} from '@testing-library/react';
import {describe, expect, it, vi, beforeEach, afterEach} from "vitest";

import {ReactTransition} from "./ReactTransition";

// import {userEvent} from "@testing-library/user-event";

function afterEndTransition(func) {
    setTimeout(func, 400) // 2 hours
}

const mock = vi.fn(() => console.log('executed'))

describe('ReactTransition', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    it('applies transition', () => {
        const {rerender} = render(<ReactTransition>
            <div data-testid='transitionElement'>Test Content</div>
        </ReactTransition>);

        const transitionElement = screen.getByTestId('transitionElement');

        expect(transitionElement).toHaveClass('fade-enter-from fade-enter-active');

        afterEndTransition(mock)
        vi.advanceTimersToNextTimer()
        expect(transitionElement).toHaveClass('fade-enter-active');

        rerender(<ReactTransition value={false}><div>Test Content</div></ReactTransition>);

        afterEndTransition(mock)
        vi.advanceTimersToNextTimer()
        expect(transitionElement).toHaveClass('fade-enter-to fade-enter-from')
    });
})