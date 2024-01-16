<script>
import { Modal } from "bootstrap";
import { vModelCheckbox } from "vue";

export default {
  data() {
    return {
      // 元件實體化
      FinishPopModal: "",
      // 文字訊息
      text: "",
    };
  },
  methods: {
    popshow(param) {
      this.FinishPopModal = new Modal("#FinishPopModal");
      if (param === "add") {
        this.text = "新增成功";
      } else if (param === "edit") {
        this.text = "修改成功";
      } else if (param === "del") {
        this.text = "刪除成功";
      }
      this.FinishPopModal.show();
    },
    pophide() {
      this.FinishPopModal.hide();
    },
  },
};
</script>

<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="FinishPopModal"
    tabindex="-1"
    aria-labelledby="FinishPopModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content pt-3">
        <div class="modal-body text-center">
          <h1 class="modal-title fs-5" id="FinishPopModalLabel">{{ text }}</h1>
        </div>
        <div
          class="modal-footer text-center"
          style="border-top: unset !important"
        >
          <button
            type="button"
            class="btn btn-primary w-100"
            data-bs-dismiss="modal"
          >
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
