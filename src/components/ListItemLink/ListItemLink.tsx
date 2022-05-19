import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { Link } from "react-router-dom";

interface IListItemLinkProps {
    icon: React.ReactNode;
    primary: string;
    to: string;
}

const ListItemLink = ({ icon, primary, to }: IListItemLinkProps) => {
    const renderLink = React.useMemo(
        () =>
            React.forwardRef((itemProps: any, ref: any) => {
                return <Link to={to} ref={ref} {...itemProps} role={undefined} />;
            }),
        [to],
    );

    return (
        <li>
            <ListItem button component={renderLink}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
};

export default ListItemLink;