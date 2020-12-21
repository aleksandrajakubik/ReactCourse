import React from 'react';

export function InspirationalQuote({ text, author }) {
    return (
        <>
            <figure>
                <blockquote>{text}</blockquote>
                <figcaption><cite>{author}</cite></figcaption>
            </figure>
        </>
    );
}
