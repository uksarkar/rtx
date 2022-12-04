import { AxiosError } from "axios";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";

export function handleResponseError(e: unknown) {
  const router = useRouter();
  let message = "Something went wrong, please try again later.";

  if (e instanceof AxiosError) {
    if (e.response?.status === 404) {
      router.push("/404");
      return;
    }

    if (e.response?.data.message) message = e.response.data.message;
  }

  ElNotification({
    title: "Error",
    type: "error",
    message,
  });
}
