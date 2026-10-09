<script lang="ts">
  import {
    LoongArkBottomNavigation,
    LoongArkBottomNavigationItem,
    LoongArkBottomNavigationLabel,
  } from "@loongark/svelte";
</script>

<LoongArkBottomNavigation aria-label="主导航">
  <LoongArkBottomNavigationItem href="#home" active>
    <LoongArkBottomNavigationLabel>首页</LoongArkBottomNavigationLabel>
  </LoongArkBottomNavigationItem>
  <LoongArkBottomNavigationItem href="#settings">
    <LoongArkBottomNavigationLabel>设置</LoongArkBottomNavigationLabel>
  </LoongArkBottomNavigationItem>
</LoongArkBottomNavigation>
