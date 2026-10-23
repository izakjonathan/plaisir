import { Children, isValidElement, type ReactNode } from "react";

export function Note({
  children,
  title = "Source notes",
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <details className="pl-note">
      <summary>
        {title}
        <span aria-hidden="true">+</span>
      </summary>
      <div>{children}</div>
    </details>
  );
}
export function Display({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) {
  const lines: ReactNode[][] = [[]];
  Children.toArray(children).forEach((child) => {
    if (isValidElement(child) && child.type === "br") lines.push([]);
    else lines[lines.length - 1].push(child);
  });
  return (
    <h2 id={id} className="pl-display" data-reveal>
      {lines.map((line, index) => (
        <span className="pl-display-line" key={index}>
          <span style={{ transitionDelay: `${index * 65}ms` }}>{line} </span>
        </span>
      ))}
    </h2>
  );
}
