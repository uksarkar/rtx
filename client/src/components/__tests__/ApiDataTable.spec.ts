import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { h } from "vue";
import ApiDataTable from "../ApiDataTable.vue";

describe("ApiDataTable.vue", () => {
  it("renders props.data when passed", async () => {
    const data = [
      {
        name: "AAAAAAAAAAaa",
        age: 50,
      },
    ];

    const wrapper = mount(ApiDataTable, {
      attachTo: document.body,
      propsData: {
        data,
        columns: [
          { prop: "name", label: "Name" },
          { prop: "age", label: "Age" },
        ],
        total: 100,
      },
      slots: {
        actions: h("h1", {}, "some actions"),
      },
    });

    await wrapper.setValue("", "a");
    await wrapper.setValue("", "a");

    expect(wrapper.findComponent({ name: "el-table-column" }).exists()).toBe(
      true
    );
    expect(document.body.outerHTML).toContain(data.at(0)?.name!);
    expect(document.body.outerHTML).toContain(String(data.at(0)?.age));
  });
});
