export function PolishText({
  children,
}: {
  children: string;
}) {
  return (
    <>
      {children.replace(
        /(^|\s)([iIwWaAzZoO])\s+/g,
        "$1$2\u00a0"
      )}
    </>
  );
}