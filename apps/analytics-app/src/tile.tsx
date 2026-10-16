import { unstable_defineView } from "sanity/dashboard";
import { Providers } from "./Providers";
export default unstable_defineView("tile", {
  tile: ({ view }) => (
    <Providers>
      <div>
        <h1>Analytics tile</h1>
      </div>
    </Providers>
  ),
});
