import React from "react";
import "./SideDrawer.css";

export default function SideDrawer(props) {
  return <aside className="side-drawer">{props.children}</aside>;
}
