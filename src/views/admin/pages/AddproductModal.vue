<script>
export default {
  props: ["addProduct", "addCheckBool"],
};
</script>

<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="addProductModal"
    tabindex="-1"
    aria-labelledby="addProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="addProductModalLabel">新增產品</h1>
          <button
            type="button"
            class="btn-close bg-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <VForm @submit="addProduct">
            <div class="d-flex align-items-center">
              <label
                for="title"
                class="form-label mb-0 px-2 gray-600"
                style="white-space: nowrap"
              >
                產品名稱
              </label>
              <VField
                class="form-control"
                id="title"
                name="title"
                type="text"
                rules="required"
                placeholder="請輸入產品名稱"
              />
            </div>
            <div class="text-end mb-3">
              <ErrorMessage name="title" class="text-danger" />
            </div>

            <div class="d-flex align-items-center">
              <label
                for="unit"
                class="form-label mb-0 px-2 gray-600"
                style="white-space: nowrap"
              >
                單位
              </label>
              <VField
                class="form-control"
                id="unit"
                name="unit"
                type="text"
                rules="required"
                placeholder="請輸入單位"
              />
            </div>
            <div class="text-end mb-3">
              <ErrorMessage name="unit" class="text-danger" />
            </div>

            <div class="d-flex align-items-center">
              <label
                for="category"
                class="form-label mb-0 px-2 gray-600"
                style="white-space: nowrap"
              >
                分類
              </label>
              <VField
                class="form-control"
                id="category"
                name="category"
                type="text"
                rules="required"
                placeholder="請輸入分類"
              />
            </div>
            <div class="text-end mb-3">
              <ErrorMessage name="category" class="text-danger" />
            </div>

            <div class="d-flex align-items-center">
              <label
                for="content"
                class="form-label mb-0 px-2 gray-600"
                style="white-space: nowrap"
              >
                內含物
              </label>
              <VField
                class="form-control"
                id="content"
                name="content"
                type="text"
                rules="required"
                placeholder="請輸入內含物"
              />
            </div>
            <div class="text-end mb-3">
              <ErrorMessage name="content" class="text-danger" />
            </div>

            <div class="d-flex align-items-center">
              <label
                for="description"
                class="form-label mb-0 px-2 gray-600"
                style="white-space: nowrap"
              >
                說明
              </label>
              <VField
                class="form-control"
                id="description"
                name="description"
                type="text"
                rules="required"
                placeholder="請輸入說明"
              />
            </div>
            <div class="text-end mb-3">
              <ErrorMessage name="description" class="text-danger" />
            </div>

            <div class="d-flex align-items-center">
              <label
                for="price"
                class="form-label mb-0 px-2 gray-600"
                style="white-space: nowrap"
                >價格
              </label>
              <VField
                class="form-control"
                id="price"
                name="price"
                type="number"
                rules="required"
                placeholder="請輸入價格"
              />
            </div>
            <div class="text-end mb-3">
              <ErrorMessage name="price" class="text-danger" />
            </div>

            <div class="d-flex align-items-center">
              <label
                for="imageUrl"
                class="form-label mb-0 px-2 gray-600"
                style="white-space: nowrap"
                >圖片網址
              </label>
              <VField
                class="form-control"
                id="imageUrl"
                name="imageUrl"
                type="text"
                rules="required"
                placeholder="請輸入圖片網址"
              />
            </div>
            <div class="text-end mb-3">
              <ErrorMessage name="imageUrl" class="text-danger" />
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
                  class="btn btn-primary w-100"
                  v-show="addCheckBool"
                >
                  建立
                </button>
                <button
                  type="button"
                  class="btn btn-primary w-100"
                  disabled
                  v-show="!addCheckBool"
                >
                  <div class="spinner-border text-white" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </button>
              </div>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-label {
  width: 120px;
}
</style>
