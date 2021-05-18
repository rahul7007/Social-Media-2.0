// import React from 'react'

// import { useSelector } from "react-redux";


// const PrivateRoute = ({ component: Component, isAuthenticated }) => {

//     const isAuthenticated = useSelector(
//         (state) => state.AuthReducer.isAuthenticated
//     );

//     const isLoading = useSelector(
//         (state) => state.AuthReducer.loading
//     );

//     console.log("isAuthenticated :", isAuthenticated)
//     console.log("isLoading:", isLoading)


//     const PrivateRoute = ({ component: Component, ...rest }) => (
//         <Route
//             {...rest}
//             render={props =>
//                 isAuthenticated ? (
//                     <Component {...props} />
//                 ) : (
//                     <Redirect
//                         to={{
//                             pathname: "/login"
//                         }}
//                     />
//                 )
//             }
//         />
//     );

//         // return ( 

// //         // )
// //         < Route
// //     {...rest }
// //     render = { props =>
// // isAuthenticated ? (
// //     <Component {...props} />
// // ) : (
// //     <Redirect to="/login" />
// // )
// //     }
// // />
// // }

// // export default PrivateRoute


// // import React from 'react';
// // import { Route, Redirect } from 'react-router-dom';
// // import { useSelector } from "react-redux";

// // const PrivateRoute = ({
// //     component: Component,
// //     auth: { isAuthenticated, loading },
// //     ...rest
// // }) => (
// //     <Route
// //         {...rest}
// //         render={props =>
// //             isAuthenticated ? (
// //                 <Component {...props} />
// //             ) : (
// //                 <Redirect to="/login" />
// //             )
// //         }
// //     />
// // );

// // export default PrivateRoute;



// export default PrivateRoute

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from "react-redux";

function PrivateRoute(props) {
    const isAuthenticatedVar = useSelector(
        (state) => state.AuthReducer.isAuthenticated
    );
    return (
        <Route path={props.path} render={data => isAuthenticatedVar ?
            <props.component {...data}></props.component> : <Redirect to={{ pathname: '/' }}></Redirect>
        }
        />
    )
}

export default PrivateRoute