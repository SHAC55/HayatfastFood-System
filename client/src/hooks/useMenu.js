import { useContext } from "react";
import { MenuContext } from "../context/MenuContext";

const useMenu = () => useContext(MenuContext);

export default useMenu;