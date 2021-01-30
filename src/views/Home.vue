<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
      v-permission="value"
      v-click-outside="onClickOutside"
    />
    <input v-model="value" />
    <button v-clipboard:success="onCopyOk" v-clipboard:copy="value" v-if="show">
      copy
    </button>
    <button v-long-click="onLongClick">{{ count }}</button>
  </div>
  <div class="container" v-resize-text>
    <h1>
      <b><span style="color:#3eaf7c">vue-resize-text</span></b>
    </h1>
    <h6>
      A vue directive which automatically resize font size based on element
      width.
    </h6>
    <h6><u>Resize the browser viewport to see the effect in action.</u></h6>
  </div>
  <hr />
  <div v-resize-text="{ ratio: 0.6 }">Hello Vue</div>
  <pre><code>&lt;div v-resize-text="{ratio: 0.6}"&gt;Hello Vue&lt;/div&gt;</code></pre>
  <br />
  <hr />
  <div v-resize-text="{ minFontSize: '50px', maxFontSize: '100px' }">
    Hello Vue
  </div>
  <pre><code>&lt;div v-resize-text="{minFontSize: '50px', maxFontSize: '100px'}"&gt;Hello Vue&lt;/div&gt;</code></pre>
  <br />
  <hr />
  <div v-resize-text="{ ratio: 1.5, delay: 500 }">Hello Vue</div>
  <pre><code>&lt;div v-resize-text="{ratio: 1.5, delay: 500}"&gt;Hello Vue&lt;/div&gt;</code></pre>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {}
})
export default class Home extends Vue {
  onClickOutside() {
    console.log("success");
  }

  onCopy() {
    console.log("onCopy");
  }

  onCopyOk() {
    console.log("onCopyOk");
  }

  show = true;
  private value = "has";
  private count = 1;

  onLongClick() {
    this.count++;
  }

  created() {
    setTimeout(() => {
      this.show = false;
      this.value = "has1";
    }, 1000 * 20);
  }
}
</script>
<style>
h1 {
  font-size: 1em;
  margin: 20px 0;
}
h6 {
  font-size: 0.26em;
  margin: 10px;
}
p {
  font-size: 0.5em;
}
pre {
  font-size: 12px;
}
</style>
