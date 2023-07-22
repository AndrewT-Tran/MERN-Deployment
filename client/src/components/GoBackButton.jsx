import React from "react";
import { Link, useLocation } from "react-router-dom";

const GoBackHomeButton = () => {
	const location = useLocation();

	if (location.pathname === "/dashboard") {
		return null;
	}

	return (
		<Link to="/" className=" btn glass btn-sm bg-red-600 text-center py-1">
			Go Back
		</Link>
	);
};

export default GoBackHomeButton;
