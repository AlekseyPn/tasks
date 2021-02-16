import {mount} from "@vue/test-utils";
import Task from "@/components/tasks/Task";
import Btn from "@/components/ui/buttons/Btn";

const task = {
  id: 1,
  name: "Test name",
  description: "Task description",
  complete: false,
  finishDate: "",
};

function addDaysToNow(days = 1) {
  const hours = 24 * days;
  return (new Date(Date.now() +(3600 * hours * 1000))).toISOString().split("T")[0];
}

describe("Task", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Task, {
      propsData: {
        task,
      },
    });
  });

  it("should emit toggle-task-complete event with task", () => {
    const toggleBtn = wrapper.findAllComponents(Btn).at(0);

    toggleBtn.trigger("click");

    expect(wrapper.emitted()["toggle-task-complete"]).toBeTruthy();
    expect(wrapper.emitted()["toggle-task-complete"][0][0]).toEqual(task);
  });

  it("should emit remove-task event with task id", () => {
    const removeBtn = wrapper.findAllComponents(Btn).at(1);

    removeBtn.trigger("click");

    expect(wrapper.emitted()["remove-task"]).toBeTruthy();
    expect(wrapper.emitted()["remove-task"][0][0]).toBe(task.id);
  });

  it("should show finish date if task not complete", async () => {
    const taskWithFinishDate = {
        ...task,
        finishDate: addDaysToNow(2),
      };
    await wrapper.setProps({
      task: taskWithFinishDate,
    });
    let finishDateEl = wrapper.find("[data-testid=finishDate]");

    expect(finishDateEl.text()).toBe("До завершения: 2 дня");

    await wrapper.setProps({
      task: {
        ...taskWithFinishDate,
        complete: true,
      },
    });

    finishDateEl = wrapper.find("[data-testid=finishDate]");

    expect(finishDateEl.exists()).toBeFalsy();
  });

  it("should count days to finish correct", async () => {
    await wrapper.setProps({
      task: {
        ...task,
        finishDate: addDaysToNow(4),
      },
    });

    expect(wrapper.vm.daysToFinish).toBe(4);
  });

  it("should status display correct", async () => {
    let statusEl = wrapper.find("[data-testid=status]");

    expect(statusEl.text()).toBe("Статус: В процессе");

    await wrapper.setProps({
      task: {
        ...task,
        complete: true,
      },
    });

    expect(statusEl.text()).toBe("Статус: Выполнена");
  });
});