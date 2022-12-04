<script setup lang="ts">
import LinkCard from "@/components/LinkCard.vue";
import { ElRow, ElCol } from "element-plus";
import PostIcon from "@/components/icons/PostIcon.vue";
import HomeIcon from "@/components/icons/HomeIcon.vue";
import UserIcon from "@/components/icons/UserIcon.vue";
import SvgIcon from "@/components/icons/SvgIcon.vue";
</script>

<template>
  <main>
    <section class="mx-10">
      <ElRow :gutter="10">
        <ElCol :span="8">
          <LinkCard to="/" title="HOME">
            <template #icon>
              <SvgIcon icon-name="Home Icon">
                <HomeIcon />
              </SvgIcon>
            </template>
          </LinkCard>
        </ElCol>
        <ElCol :span="8">
          <LinkCard to="/posts" title="Posts">
            <template #icon>
              <SvgIcon icon-name="Post Icon">
                <PostIcon />
              </SvgIcon>
            </template>
          </LinkCard>
        </ElCol>
        <ElCol :span="8">
          <LinkCard to="/users" title="Users">
            <template #icon>
              <SvgIcon icon-name="User Icon">
                <UserIcon />
              </SvgIcon>
            </template>
          </LinkCard>
        </ElCol>
      </ElRow>
    </section>
  </main>
</template>
