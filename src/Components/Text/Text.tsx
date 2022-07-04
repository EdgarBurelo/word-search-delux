import React from "react";

type TextProps = {
    text: string;
};

const Text: React.FC<TextProps> = ({text}) => (
    <div>
        <p>{text}</p>
    </div>
);

export default Text;
