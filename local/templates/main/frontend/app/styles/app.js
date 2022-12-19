/*Vendors*/
import './_normalize.sass';
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';

require("./variables.scss");
require("./fonts.scss");
require("./typography.scss");
require("./grid.scss");
require("./icons.scss");
require("./sections.scss");
require("./editor.scss");
require("./forms.scss");
require("./styles.scss");
// require("./media.scss");

/*All components*/

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}
const modules = requireAll(require.context("./components", false, /.scss$/));
