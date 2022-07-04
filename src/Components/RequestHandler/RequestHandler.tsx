import React from "react";

type RequestHandlerProps = {
    loading: boolean;
    error: boolean;
    children?: React.ReactNode;
}

export const RequestHandler: React.FC<RequestHandlerProps> = ({error, loading, children}: RequestHandlerProps) => {
    return (
        <div>
            {error && <div>We're sorry there was an error with the connection.</div>}
            {loading && <div>Loading........ (almost there)</div>}
            {!error && !loading && children}
        </div>
    );
};
