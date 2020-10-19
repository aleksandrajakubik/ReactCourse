import React from 'react';
import Quotes from 'inspirational-quotes';

function InspirationalQuote({}) {
    const { text, author } = Quotes.getQuote()
    return (
        <figure>
            <blockquote>{text}</blockquote>
            <figcaption><cite>{author}</cite></figcaption>
        </figure>
    )
}

export default InspirationalQuote