import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-[80vh] max-w-[1600px] flex-col justify-end px-4 pb-20 pt-36 sm:px-6 lg:px-10">
      <p className="text-[11px] uppercase tracking-[0.28em] text-muted">404</p>
      <h1 className="mega mt-4 font-display font-bold uppercase">
        Page
        <br />
        not found
      </h1>
      <Link
        to="/"
        data-cursor="link"
        className="mt-8 inline-flex min-h-11 items-center text-[11px] uppercase tracking-[0.2em] underline-offset-4 hover:underline"
      >
        Back to portfolio
      </Link>
    </main>
  );
}
