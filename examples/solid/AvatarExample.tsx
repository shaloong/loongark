import type { Component } from "solid-js";
import {
  LoongArkAvatarRoot,
  LoongArkAvatarImage,
  LoongArkAvatarFallback,
} from "@loongark/solid";
import type { AvatarSize } from "@loongark/primitives";

const DEFAULT_AVATAR_SRC =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><rect width='80' height='80' fill='%23D6E4FF'/><circle cx='40' cy='30' r='18' fill='%233A5BCC'/><rect x='16' y='52' width='48' height='18' rx='9' fill='%233A5BCC'/></svg>";

const getInitials = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return "LA";
  }

  return trimmed
    .split(/\s+/)
    .slice(0, 2)
    .map((segment) => segment.charAt(0))
    .join("")
    .toUpperCase();
};

export interface AvatarExampleProps {
  size?: AvatarSize;
  name?: string;
  src?: string;
}

export const AvatarExample: Component<AvatarExampleProps> = (props) => {
  const size = props.size ?? "md";
  const name = props.name ?? "Loong Ark";
  const src = props.src ?? DEFAULT_AVATAR_SRC;
  const initials = getInitials(name);

  return (
    <LoongArkAvatarRoot size={size} data-testid="avatar-root">
      {src ? (
        <LoongArkAvatarImage src={src} alt={name} data-testid="avatar-image" />
      ) : null}
      <LoongArkAvatarFallback data-testid="avatar-fallback">
        {initials}
      </LoongArkAvatarFallback>
    </LoongArkAvatarRoot>
  );
};
