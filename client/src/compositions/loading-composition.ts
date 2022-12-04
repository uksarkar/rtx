import { ElLoading } from "element-plus";
import { computed } from "vue";

let loadingHandler: ReturnType<typeof ElLoading.service>;

const fullscreenLoading = computed({
  get: () => loadingHandler.visible.value,
  set: (v: boolean) => {
    if (!v) return loadingHandler?.close();

    if (loadingHandler?.visible?.value) return;

    loadingHandler = ElLoading.service({
      lock: true,
      text: "Loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
  },
});

export { fullscreenLoading };
