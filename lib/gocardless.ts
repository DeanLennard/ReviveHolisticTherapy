import "server-only";

const GOCARDLESS_API_VERSION = "2015-07-06";

export function getGoCardlessBaseUrl() {
  return process.env.GOCARDLESS_ENV === "live" ? "https://api.gocardless.com" : "https://api-sandbox.gocardless.com";
}

export function getGoCardlessAccessToken() {
  return process.env.GOCARDLESS_ACCESS_TOKEN || "";
}

async function goCardlessRequest<T>(path: string, init: RequestInit) {
  const accessToken = getGoCardlessAccessToken();

  if (!accessToken) {
    return null;
  }

  const response = await fetch(`${getGoCardlessBaseUrl()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "GoCardless-Version": GOCARDLESS_API_VERSION,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GoCardless request failed: ${errorText}`);
  }

  return (await response.json()) as T;
}

export async function createGoCardlessBillingRequest(input: {
  bookingId: string;
  amount: number;
  description: string;
  successRedirectUrl: string;
  customer: {
    givenName: string;
    familyName: string;
    email: string;
  };
}) {
  const billingRequestResponse = await goCardlessRequest<{
    billing_requests: { id: string };
  }>("/billing_requests", {
    method: "POST",
    body: JSON.stringify({
      billing_requests: {
        payment_request: {
          description: input.description,
          amount: Math.round(input.amount * 100),
          currency: "GBP",
        },
      },
    }),
  });

  if (!billingRequestResponse) {
    return null;
  }

  const flowResponse = await goCardlessRequest<{
    billing_request_flows: { id: string; authorisation_url: string };
  }>("/billing_request_flows", {
    method: "POST",
    body: JSON.stringify({
      billing_request_flows: {
        redirect_uri: input.successRedirectUrl,
        exit_uri: input.successRedirectUrl,
        links: {
          billing_request: billingRequestResponse.billing_requests.id,
        },
        prefilled_customer: {
          given_name: input.customer.givenName,
          family_name: input.customer.familyName,
          email: input.customer.email,
        },
      },
    }),
  });

  if (!flowResponse) {
    return null;
  }

  return {
    billingRequestId: billingRequestResponse.billing_requests.id,
    billingRequestFlowId: flowResponse.billing_request_flows.id,
    url: flowResponse.billing_request_flows.authorisation_url,
  };
}

export async function getGoCardlessBillingRequest(billingRequestId: string) {
  return goCardlessRequest<{
    billing_requests: {
      id: string;
      status: string;
    };
  }>(`/billing_requests/${billingRequestId}`, {
    method: "GET",
  });
}
