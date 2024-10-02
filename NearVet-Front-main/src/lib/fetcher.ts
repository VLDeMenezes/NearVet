//variables para el fetch despues tenemos que pasarlo a un .env

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface fetcherProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  token?: string;
  data?: any;
}
export const fetcher = async ({ url, method, token, data }: fetcherProps) => {
  try {
    const response = await fetch(`${apiUrl}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    const dataResponse = await response.json();
    return dataResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const fetcherImg = async ({
  url,
  method,
  token,
  data,
}: fetcherProps) => {
  try {
    const response = await fetch(`${apiUrl}${url}`, {
      method,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: data,
    });
    const dataResponse = await response.json();
    return dataResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
