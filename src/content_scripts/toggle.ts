import { onLoad } from "#/utils/load";
import Toggle from "./comps/toggle";

onLoad(() => {
    document.body.appendChild(Toggle());
});
