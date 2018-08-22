/**
 *
 * Asynchronously loads the component for Trash
 *
 */

import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./index"),
  loading: () => null,
});
