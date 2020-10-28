import React from "react";

export function TimeboxesList({ timeboxes, renderTimebox }) {
    return timeboxes.map(renderTimebox);
}
