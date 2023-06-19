import { createAppContainer } from "react-navigation";
import Stack from "./StackNavigation";
import navigationService from "./navigationService";
export default createAppContainer(Stack);
export { navigationService };
