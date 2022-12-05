import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ConfirmModal from "../ConfirmModal.vue";

describe("ConfirmModal.vue", async () => {
  it("render the modal", async () => {
    const wrapper = mount(ConfirmModal, {
      attachTo: document.body,
      props: {
        show: true,
        content: "some crazy text goes here",
      },
    });

    await wrapper.setValue(true, "show");
    expect(document.body.outerHTML).toContain("some crazy text goes here");
  });
});
