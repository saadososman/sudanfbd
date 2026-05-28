type CmsFetchErrorProps = {
  title: string;
  message: string;
  url: string;
  status?: number | null;
};

export function CmsFetchError({ title, message, url, status }: CmsFetchErrorProps) {
  return (
    <section className="cms-fetch-error" role="alert">
      <h1>{title}</h1>
      <p>{message}</p>
      {typeof status === "number" ? <p>HTTP status: {status}</p> : null}
      <p>
        API URL: <code>{url}</code>
      </p>
    </section>
  );
}
