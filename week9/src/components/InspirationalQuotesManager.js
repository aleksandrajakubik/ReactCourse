import React, { useState, useEffect } from 'react';
import { InspirationalQuote } from './InspirationalQuote';

function InspirationalQuoteManager() {
    const [quote, setQuote] = useState();
    useEffect(() => {
        import("inspirational-quotes").then(
            (Quotes) => {
                setQuote(Quotes.getQuote())
            }
        ).catch(() => console.log("Couldn't load quotes"));     
    }, [])
    return (
        <> 
            { quote ? 
                <InspirationalQuote 
                    text={quote.text} 
                    author={quote.author}
                /> :
            "..."
            }
        </>
    );

}

export default InspirationalQuoteManager;