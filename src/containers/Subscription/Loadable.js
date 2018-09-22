/**
 *
 * Asynchronously loads the component for Subscription
 *
 */

import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./index"),
  loading: () => null,
});
