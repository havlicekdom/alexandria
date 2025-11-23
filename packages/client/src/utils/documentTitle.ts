export default function documentTitle(title: string) {
  const titleSuffix = process.env.NEXT_PUBLIC_APP_NAME;
  return `${title} | ${titleSuffix}`;
}
