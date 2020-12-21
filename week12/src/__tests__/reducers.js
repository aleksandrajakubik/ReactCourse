import { areTimeboxesLoading, timeboxesReducer, getTimeboxById } from "../reducers"

test('areTimeboxesLoading return true when state.timeboxesAreLoading is set to true ', () => {
    const state = {
        timeboxesAreLoading: true
    };
    expect(areTimeboxesLoading(state)).toBe(true)
});

test('getTimeboxbyId return proper timebox when giving id', () => {
    const state = {
        timeboxes: [ { id: 1, title: 'I am first timebox'}, { id: 2, title: 'I am second timebox'}]
    }
    expect(getTimeboxById(state, 1)).toEqual(
        { id: 1, title: 'I am first timebox'}
    )
})

describe('timeboxesReducer', () => {
    test('adds a timebox when given a TIMEBOX_ADD action', () => {
        const state = {
            timeboxes: []
        }
        const newTimebox = { id: "I am a new timebox"};
        expect(timeboxesReducer(state, { type: "TIMEBOX_ADD", timebox: newTimebox})).toEqual(
            {
                timeboxes: [ newTimebox ]
            }
        )
    });
    test('replaces timebox when given a TIMEBOX_REPLACE action', () => {
        const state = {
            timeboxes: [{ id: 1, title: 'I need a new title'}]
        }
        const updatedTimebox = { id: 1, title: 'New title'}
        expect(timeboxesReducer(state, {type: 'TIMEBOX_REPLACE', replacedTimebox: updatedTimebox})).toEqual(
            {
                timeboxes: [ updatedTimebox ]
            }
        )
        
    });
});