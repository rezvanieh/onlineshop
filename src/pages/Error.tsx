import React from "react";
import Header from "../components/Header/MainHeader";

const Error: React.FC = () => {
    return (
        <>
            <Header />
            <main>
                <h1>An Error occurred</h1>
                <p>Could not find this page.</p>
            </main>
        </>
    );
};

export default Error;
