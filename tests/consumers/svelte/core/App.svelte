<script lang="ts">import {LoongArkProviderCore as Provider} from '@loongark/svelte/provider-core';
import {LoongArkButton as Button} from '@loongark/svelte/button';
import {LoongArkDialogRoot as DialogRoot,LoongArkDialogTrigger as DialogTrigger,LoongArkDialogPortal as DialogPortal,LoongArkDialogOverlay as DialogOverlay,LoongArkDialogPositioner as DialogPositioner,LoongArkDialogContent as DialogContent,LoongArkDialogTitle as DialogTitle,LoongArkDialogDescription as DialogDescription,LoongArkDialogCloseTrigger as DialogCloseTrigger} from '@loongark/svelte/dialog';
import {LoongArkInputRoot as InputRoot,LoongArkInputControl as InputControl,LoongArkInputLabel as InputLabel} from '@loongark/svelte/input';import {createPrimitiveStyleBootstrap} from '@loongark/primitives/styles';
import {buttonPrimitive} from '@loongark/primitives/button';
import {dialogPrimitive} from '@loongark/primitives/dialog';
import {inputPrimitive} from '@loongark/primitives/input';
const buttonStyles=createPrimitiveStyleBootstrap([buttonPrimitive]);
const initialStyles=createPrimitiveStyleBootstrap([buttonPrimitive,dialogPrimitive]);
const extraStyles=createPrimitiveStyleBootstrap([inputPrimitive,dialogPrimitive,buttonPrimitive]);
const nonce=new URLSearchParams(location.search).get('nonce')??undefined;
const target=document.getElementById('app');if(!target)throw Error('缺少 Core 挂载节点');let mode:'light'|'dark'|'high-contrast'=$state('light');let extra=$state(false);let shown=$state(true);let second=$state(false);</script><button onclick={()=>shown=!shown}>Toggle provider</button><button onclick={()=>second=!second}>Toggle survivor</button>{#if second}<Provider {nonce} mode="dark" styleBootstrap={buttonStyles}><Button>Survivor</Button></Provider>{/if}{#if shown}<Provider {mode} {nonce} styleBootstrap={extra?extraStyles:initialStyles}><section style="padding:24px;background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground)"><Button onclick={()=>mode=mode==='light'?'dark':mode==='dark'?'high-contrast':'light'}>Theme</Button>
<Button onclick={()=>extra=!extra}>Change styles</Button><Button>Core button</Button>
<InputRoot><InputLabel>Email</InputLabel><InputControl data-testid="core-input" /></InputRoot>
<DialogRoot><DialogTrigger>Open dialog</DialogTrigger><DialogPortal><DialogOverlay/><DialogPositioner><DialogContent><DialogTitle>Core dialog</DialogTitle><DialogDescription>Shared theme and selected styles.</DialogDescription><DialogCloseTrigger>Close</DialogCloseTrigger></DialogContent></DialogPositioner></DialogPortal></DialogRoot></section></Provider>{/if}