<template>
  <footer class="footer">
    <div class="footer-top">
      <Logo class="logo" />
      <div class="footer-columns">
        <div class="footer-column">
          <h3 class="column-title">Built for catlovers</h3>
          <div class="column-content">
            <a href="#" class="column-link">About</a>
            <a href="#" class="column-link">Blog</a>
          </div>
        </div>

        <div class="footer-column">
          <h3 class="column-title">Social</h3>
          <div class="column-content column-content-social">
            <a href="#" class="social-link">
              <Instagram />
            </a>
            <a href="#" class="social-link">
              <Facebook />
            </a>
            <a href="#" class="social-link">
              <YouTube />
            </a>
            <a href="#" class="social-link">
              <Twitter />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-divider"></div>
    <div class="footer-bottom">
      <p class="footer-copyright">@cats.com inc. All rights reserved.</p>

      <label class="footer-language-wrapper">
        <select class="footer-language-selector" disabled>
          <option value="en">English</option>
        </select>

        <Arrow class="footer-language-arrow" />
      </label>
    </div>
  </footer>
</template>

<script>
import Logo from '@/shared/assets/icons/logo.vue'
import Instagram from '@/shared/assets/icons/instagram.vue'
import Facebook from '@/shared/assets/icons/facebook.vue'
import YouTube from '@/shared/assets/icons/youtube.vue'
import Twitter from '@/shared/assets/icons/twitter.vue'
import Arrow from '@/shared/assets/icons/arrow.vue'

export default {
  name: 'Footer',
  components: {
    Logo,
    Instagram,
    Facebook,
    YouTube,
    Twitter,
    Arrow,
  },
}
</script>

<style lang="scss" scoped>
@use '@/shared/styles/variables.scss' as *;
@use '@/shared/styles/mixins.scss' as *;

.footer {
  background-color: $footer-bg;
  display: flex;
  flex-direction: column;
  padding: $footer-padding-vertical $footer-padding-horizontal;

  @media (max-width: $breakpoint-mobile) {
    padding: $footer-padding-vertical $mobile-padding-horizontal;
  }

  .footer-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: $spacing-xl;
  }

  .logo {
    color: $white;
    @media (max-width: 575px) {
      order: 1;
    }
  }

  .footer-columns {
    display: flex;
    gap: $spacing-xxl;

    @media (max-width: 575px) {
      order: 0;
    }
  }

  .footer-column {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  .column-title {
    @include footer-title;
  }

  .column-content {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  .column-content-social {
    flex-direction: row;
    gap: $footer-social-gap;
  }

  .column-link {
    @include footer-link;
  }

  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $white;
    cursor: pointer;
  }

  .footer-divider {
    margin-top: $footer-divider-margin-top;
    width: 100%;
    height: $footer-divider-height;
    background-color: $footer-divider-color;

    @media (max-width: $breakpoint-mobile) {
      margin-top: $spacing-lg;
    }
  }

  .footer-bottom {
    margin-top: $footer-bottom-margin-top;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-copyright {
    @include footer-text;
  }

  .footer-language-wrapper {
    display: flex;
    align-items: center;
    gap: $footer-language-gap;
    cursor: not-allowed;
  }

  .footer-language-selector {
    @include footer-typography-base;
    @include reset-appearance;
    background-color: transparent;
    border: none;
    color: $white;
    font-weight: $font-weight-regular;
    font-size: $font-size-sm;
    cursor: not-allowed;
    outline: none;
    padding: 0;

    option {
      background-color: $footer-bg;
      color: $white;
    }
  }

  .footer-language-arrow {
    color: $white;
    flex-shrink: 0;
    pointer-events: none;
  }
}
</style>
