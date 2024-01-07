<template>
  <section>
    <div class="py-5 marble-bg">
      <h3 class="pb-3 text-center">我們的故事 | Our Story</h3>
      <!-- 區塊1 -->
      <div class="container">
        <div class="row py-5 flex-column flex-md-row">
          <div class="col d-flex flex-column justify-content-center">
            <h4 class="pb-3 text-start">味蕾享受的早晨</h4>
            <div>
              <p>
                我們是一個追求味覺藝術的早午餐店，每一道料理都是我們對於美好的表白。烹調的過程如同詩意早晨的序曲，悠然而至，讓您在每一口中感受到生活的美好節奏。
              </p>
            </div>
          </div>
          <div class="col d-flex justify-content-center align-items-center">
            <div
              class="room position-relative rounded-circle w-100 overflow-hidden"
            >
              <img
                src="/src/assets/img/room.jpg"
                alt="室內環境"
                class="position-absolute top-0 start-0 w-100 h-100"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 區塊2 -->
      <div class="container">
        <div class="row py-5 flex-column flex-md-row">
          <div class="col d-flex flex-column justify-content-center">
            <h4 class="pb-3 text-start">細緻呵護，用心服務</h4>
            <div>
              <p>
                我們以用心待客，為您打造一場完美的用餐體驗。從熱情的問候到細緻的服務，我們致力於讓每一位賓客感受到賓至如歸的溫暖，成就一段美好的早午餐時光。
              </p>
            </div>
          </div>
          <div class="col d-flex justify-content-center align-items-center">
            <div
              class="room position-relative rounded-circle w-100 overflow-hidden"
            >
              <img
                src="/src/assets/img/room.jpg"
                alt="室內環境"
                class="position-absolute top-0 start-0 w-100 h-100"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 區塊3 -->
      <div class="container">
        <div class="row py-5 flex-column flex-md-row">
          <div class="col d-flex flex-column justify-content-center">
            <h4 class="pb-3 text-start">自然與品味的融合</h4>
            <div>
              <p>
                步入我們的空間，彷彿踏入一片自然綠洲。精心設計的環境，將大自然的美好融入用餐體驗，讓您在這裡感受到寧靜與舒適的美好氛圍。讓我們一同在這個品味綠洲中共譜美好時光。
              </p>
            </div>
          </div>
          <div class="col d-flex justify-content-center align-items-center">
            <div
              class="room position-relative rounded-circle w-100 overflow-hidden"
            >
              <img
                src="/src/assets/img/room.jpg"
                alt="室內環境"
                class="position-absolute top-0 start-0 w-100 h-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* .marble-bg {
  background: url("/src/assets/img/marble.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
} */

/* 正圓遮罩 */
.circle-mask {
  width: 100%;
  padding-top: 100%;
  background: black;
  border-radius: 100%;
}

.room {
  padding-top: 100%;

  img {
    object-fit: cover;
  }
}
</style>
