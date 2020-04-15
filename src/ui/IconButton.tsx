import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import React, { ComponentPropsWithoutRef } from "react";

type Props = FontAwesomeIconProps & ComponentPropsWithoutRef<"button">;

function IconButton({ icon, ...props }: Props) {
  return (
    <button className="p-3" {...props}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}

export default IconButton;
