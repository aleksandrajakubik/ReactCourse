import { setTimeboxes, replaceTimebox } from "../actions"

test('setTimeboxes emits TIMEBOXES_SET action', () => {
    expect(setTimeboxes([])).toEqual(
        {type: "TIMEBOXES_SET", timeboxes: []}
    )
});

test('replaceTimebox emits TIMEBOX_REPLACE action', () => {
    expect(replaceTimebox({id: 1, title: 'New title'})).toEqual(
        {type: "TIMEBOX_REPLACE", replacedTimebox: {id:1, title: 'New title'}}
    )
});