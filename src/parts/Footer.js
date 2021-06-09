import React from 'react';
import { ReactComponent as HomeIcon } from 'assets/HomeIcon.svg';
import { ReactComponent as FollowIcon } from 'assets/FollowIcon.svg';
import { ReactComponent as ProfileIcon } from 'assets/ProfileIcon.svg';
import { ReactComponent as Cart } from 'assets/Cart.svg';
import { Link, withRouter } from 'react-router-dom';

const Footer = ({ match, history }) => {
    const getNavLinkClass = (path) => {
        return match.path === path
            ? 'fill-poppins-orange'
            : 'fill-poppins-gray';
    };
    return (
        <div className="h-16">
            <ul className="flex justify-between items-center py-5">
                <li>
                    <Link to="/">
                        <HomeIcon
                            className={`${getNavLinkClass('/')}`}
                        ></HomeIcon>
                    </Link>
                </li>
                <li>
                    <Link to="/cart">
                        <Cart className={`${getNavLinkClass('/cart')}`}></Cart>
                    </Link>
                </li>
                <li>
                    <Link to="/following">
                        <FollowIcon
                            className={`${getNavLinkClass('/following')}`}
                        ></FollowIcon>
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <ProfileIcon
                            className={`${getNavLinkClass('/profile')}`}
                        ></ProfileIcon>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default withRouter(Footer);
