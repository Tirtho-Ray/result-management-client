import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error: any = useRouteError();
    return (
        <div>
            <h1>Error</h1>
            <p>{error?.message || "Something went wrong!"}</p>
        </div>
    );
};

export default ErrorPage;
