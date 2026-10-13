<script lang="ts">import type {} from '../../../automaticStyleProbe';
import {LoongArkProvider as Provider,LoongArkButton as Button,LoongArkBox as Box,LoongArkNativeSelect as NativeSelect,LoongArkToolbar as Toolbar} from '@loongark/svelte';
import {bootstrapKitAutomatic} from '@loongark/kit/automatic-bootstrap';
const explicit=new URLSearchParams(location.search).has('explicit');
const styleBootstrap=explicit?bootstrapKitAutomatic:undefined;
const nonce=new URLSearchParams(location.search).get('nonce')??undefined;
const target=document.getElementById('app');if(!target)throw Error('缺少自动样式挂载节点');
import {onMount} from 'svelte';
import type {StyleBootstrap} from '@loongark/primitives/styles';
let mode=$state<'light'|'dark'|'high-contrast'>('light');let first=$state(true),second=$state(true);let dialog=$state<typeof import('@loongark/svelte/dialog')>();
onMount(()=>{window.loongarkAutomaticStyles={ready:true,loadDialog:async()=>{dialog=await import('@loongark/svelte/dialog');},changeTheme:()=>{mode=mode==='light'?'dark':mode==='dark'?'high-contrast':'light';},removeFirst:()=>{first=false;},removeAll:()=>{first=false;second=false;},loadAfterUnmount:async()=>{await import('@loongark/svelte/input');}};});
</script>
{#snippet body(owner:string,mode:'light'|'dark'|'high-contrast',dialog:typeof import('@loongark/svelte/dialog')|undefined,nonce:string|undefined,styleBootstrap:StyleBootstrap|undefined)}<Provider {mode} targetId={'automatic-'+owner} {nonce} {styleBootstrap}><section data-owner={owner}><Box data-testid="automatic-box" padding="md"><Button>Automatic button</Button><NativeSelect aria-label="Automatic selection"><option>One</option><option>Two</option></NativeSelect><Toolbar aria-label="Automatic toolbar"><Button>Toolbar action</Button></Toolbar></Box>{#if dialog}<dialog.LoongArkDialogRoot><dialog.LoongArkDialogTrigger>Late dialog</dialog.LoongArkDialogTrigger><dialog.LoongArkDialogPortal><dialog.LoongArkDialogOverlay/><dialog.LoongArkDialogPositioner><dialog.LoongArkDialogContent><dialog.LoongArkDialogTitle>Late dialog title</dialog.LoongArkDialogTitle><dialog.LoongArkDialogDescription>Automatically loaded styles.</dialog.LoongArkDialogDescription><dialog.LoongArkDialogCloseTrigger>Close</dialog.LoongArkDialogCloseTrigger></dialog.LoongArkDialogContent></dialog.LoongArkDialogPositioner></dialog.LoongArkDialogPortal></dialog.LoongArkDialogRoot>{/if}</section></Provider>{/snippet}
<main>{#if first}{@render body('a',mode,dialog,nonce,styleBootstrap)}{/if}{#if second}{@render body('b',mode,dialog,nonce,styleBootstrap)}{/if}</main>