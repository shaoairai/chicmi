<script>
import InfoView from "@/components/homeview/InfoView.vue";
import LoadingAni from "@/components/loading/LoadingAni.vue";

export default {
  data() {
    return {
      text: "Contact頁",
      titleBg:
        "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    };
  },
  components: {
    InfoView,
    LoadingAni,
  },
  mounted() {
    const vm = this;

    // Loading show
    vm.$refs.refLoadingAni.show();

    // Loading hide
    vm.$refs.refLoadingAni.hide();
  },
};
</script>

<template>
  <section>
    <section>
      <div class="position-relative" style="height: 200px">
        <div
          class="titleArea"
          :style="{ 'background-image': 'url(' + titleBg + ')' }"
        ></div>
        <div
          class="fs-2 text-white position-absolute translate-middle start-50 top-50"
        >
          聯絡我們
        </div>
      </div>
    </section>

    <!-- 表單 -->
    <section>
      <div class="formArea container p-3 my-5">
        <div class="text-center pt-5">
          <h2>聯絡表單</h2>
          <p>請填寫以下表單，我們會在 3 天內以郵件方式回覆你！</p>
        </div>
        <div class="brLine mb-5"></div>

        <form action="#" method="post" class="pe-md-4">
          <div class="form-group row mb-3">
            <label
              for="name"
              class="col-md-2 col-form-label text-md-end text-start"
              >姓名：</label
            >
            <div class="col-md-10">
              <input
                type="text"
                id="name"
                name="name"
                class="form-control"
                required
              />
            </div>
          </div>

          <div class="form-group row mb-3">
            <label class="col-md-2 col-form-label text-md-end text-start"
              >性別：</label
            >
            <div class="col-md-10 d-flex align-items-center">
              <div class="form-check form-check-inline">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  class="form-check-input"
                  checked
                />
                <label for="male" class="form-check-label">先生</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  class="form-check-input"
                />
                <label for="female" class="form-check-label">小姐</label>
              </div>
            </div>
          </div>

          <div class="form-group row mb-3">
            <label
              for="phone"
              class="col-md-2 col-form-label text-md-end text-start"
              >聯絡電話：</label
            >
            <div class="col-md-10">
              <input
                type="tel"
                id="phone"
                name="phone"
                class="form-control"
                required
              />
            </div>
          </div>

          <div class="form-group row mb-3">
            <label
              for="email"
              class="col-md-2 col-form-label text-md-end text-start"
              >Email：</label
            >
            <div class="col-md-10">
              <input
                type="email"
                id="email"
                name="email"
                class="form-control"
                required
              />
            </div>
          </div>

          <div class="form-group row mb-3">
            <label
              for="message"
              class="col-md-2 col-form-label text-md-end text-start"
              >留言內容：</label
            >
            <div class="col-md-10">
              <textarea
                type="text"
                id="message"
                name="message"
                class="form-control"
                required
              ></textarea>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-md-2"></div>
            <div class="col-md-10 text-end">
              <input type="reset" value="重設" class="btn btn-secondary me-2" />
              <input type="submit" value="送出" class="btn btn-primary" />
            </div>
          </div>
        </form>
      </div>
    </section>

    <!-- 地點 -->
    <InfoView></InfoView>

    <!-- Loading -->
    <LoadingAni ref="refLoadingAni"></LoadingAni>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/all.scss";

.text {
  color: purple;
}

.titleArea {
  height: 100%;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  filter: brightness(0.2);
}

.formArea {
  border: 1px solid $gray-400;
  border-radius: 8px;
}
</style>
