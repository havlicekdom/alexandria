import routes from "constants/routes";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="w-4/5 min-w-[500px] mx-auto my-0 flex flex-col justify-center">
      <div className="text-9xl">404</div>
      <h1 className="mt-0">Page not found</h1>
      <div className="text-xl">
        It looks like the content you&apos;re looking for is somewhere else...
      </div>
      <div className="text-xl">
        <Link
          href={routes.overview}
          className="inline-block mt-8 p-4 w-auto rounded-md transition-all duration-100 ease-in-out bg-primary! color-text hover:brightness-90 active:brightness-90"
        >
          Take me home
        </Link>
      </div>
    </div>
  );
}
