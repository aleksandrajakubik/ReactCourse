import React from "react";
import { connect } from "react-redux";
import { getAllTimeboxes } from "../reducers";

function TimeboxesList({ timeboxes, renderTimebox }) {
    return <div className="TimeboxesList">{timeboxes.map(renderTimebox)}</div>
}

const mapStateToProps = (state) => ({ timeboxes: getAllTimeboxes(state.timeboxesReducer)});
export const AllTimeboxesList = connect(mapStateToProps)(TimeboxesList);
