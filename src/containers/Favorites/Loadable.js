/**
 *
 * Asynchronously loads the component for Favorites
 *
 */

import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./index"),
  loading: () => null,
});
