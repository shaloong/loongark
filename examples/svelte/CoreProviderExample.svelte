<script lang="ts">
import {LoongArkProviderCore} from '@loongark/svelte/provider-core';
import {LoongArkButton} from '@loongark/svelte/button';
import {createPrimitiveStyleBootstrap} from '@loongark/primitives/styles';
import {buttonPrimitive} from '@loongark/primitives/button';
const styleBootstrap=createPrimitiveStyleBootstrap([buttonPrimitive]);
let mode:'light'|'dark'=$state('light');
</script>
<LoongArkProviderCore {mode} {styleBootstrap}><div style="padding:16px;background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground)"><LoongArkButton onclick={()=>mode=mode==='light'?'dark':'light'}>切换轻量主题</LoongArkButton></div></LoongArkProviderCore>
