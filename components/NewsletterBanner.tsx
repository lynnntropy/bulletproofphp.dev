import { FormEventHandler, ReactNode } from "react";
import MailchimpSubscribe, { EmailFormFields } from "react-mailchimp-subscribe";

const mailchimpUrl =
  "https://dev.us5.list-manage.com/subscribe/post?u=e5a34bbb1df8b420ebcf79ad1&amp;id=79c40032b6";

interface Props {
  title?: ReactNode;
  subtitle?: ReactNode;
}

const NewsletterBanner: React.FC<Props> = ({
  title = "Sign up for our newsletter",
  subtitle = "Get fresh PHP content delivered straight to your inbox.",
}) => {
  return (
    <div className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
        <div className="lg:w-0 lg:flex-1">
          <h2
            className="text-3xl font-title font-extrabold tracking-tight text-white sm:text-4xl"
            id="newsletter-headline"
          >
            {title}
          </h2>
          <p className="mt-2 max-w-3xl text-lg leading-6 text-gray-300">
            {subtitle}
          </p>
        </div>
        <MailchimpSubscribe
          url={mailchimpUrl}
          render={({ subscribe, status, message }) => {
            const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);

              subscribe({
                EMAIL: form.get("EMAIL") as string,
              });
            };

            return (
              <div className="mt-8 lg:mt-0 lg:ml-8 lg:w-full lg:max-w-md">
                <form className="sm:flex" onSubmit={onSubmit}>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="EMAIL"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
                    placeholder="Enter your email"
                  />
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                    >
                      Notify me
                    </button>
                  </div>
                </form>
                <p className="mt-3 text-sm text-gray-300">
                  {status === null &&
                    "We'll never send you spam or share your email."}
                  {status === "sending" && (
                    <span className="text-yellow-300">Signing you up...</span>
                  )}
                  {status === "success" && (
                    <span className="text-green-500">
                      You're all set. Thanks for subscribing!
                    </span>
                  )}
                  {status === "error" && (
                    <span className="text-red-500">{message}</span>
                  )}
                </p>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default NewsletterBanner;
