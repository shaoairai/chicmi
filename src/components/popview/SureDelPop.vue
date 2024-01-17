<script>
import { Modal } from "bootstrap";

export default {
  props: ["delProduct"],
  data() {
    return {
      // 元件實體化
      SurePopModal: "",
      // 文字訊息
      text: "",
      // 是否按下確認刪除按鈕
      delCheckBool: true,
      // 正要刪除的該筆資料
      readyDelProduct: "",
    };
  },
  methods: {
    popshow(product) {
      // 暫存
      this.readyDelProduct = product;

      this.text = `確定要刪除 ${product.title} 產品嗎？`;

      this.SurePopModal = new Modal("#SurePopModal");
      this.SurePopModal.show();
    },
    pophide() {
      this.SurePopModal.hide();
    },
  },
};
</script>

<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="SurePopModal"
    tabindex="-1"
    aria-labelledby="SurePopModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-3">
        <div class="modal-body text-center">
          <h1 class="modal-title fs-5" id="SurePopModalLabel">{{ text }}</h1>
        </div>
        <div class="d-flex">
          <div class="w-50 pe-1">
            <button
              type="button"
              class="btn btn-light w-100"
              data-bs-dismiss="modal"
            >
              取消
            </button>
          </div>
          <div class="w-50 ps-1">
            <button
              type="submit"
              class="btn btn-danger w-100"
              v-show="delCheckBool"
              @click="(delCheckBool = false), delProduct(readyDelProduct)"
            >
              刪除
            </button>
            <button
              type="button"
              class="btn btn-danger w-100"
              disabled
              v-show="!delCheckBool"
            >
              <div class="spinner-border text-white" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
