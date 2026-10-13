import type {} from '../../../automaticStyleProbe';
import {LoongArkProvider as Provider,LoongArkButton as Button,LoongArkBox as Box,LoongArkNativeSelect as NativeSelect,LoongArkToolbar as Toolbar} from '@loongark/solid';
import {bootstrapKitAutomatic} from '@loongark/kit/automatic-bootstrap';
const explicit=new URLSearchParams(location.search).has('explicit');
const styleBootstrap=explicit?bootstrapKitAutomatic:undefined;
const nonce=new URLSearchParams(location.search).get('nonce')??undefined;
const target=document.getElementById('app');if(!target)throw Error('缺少自动样式挂载节点');
import {createSignal,onMount,Show} from 'solid-js';import {render} from 'solid-js/web';
type DialogModule=typeof import('@loongark/solid/dialog');
function App(){const [mode,setMode]=createSignal<'light'|'dark'|'high-contrast'>('light');const [first,setFirst]=createSignal(true),[second,setSecond]=createSignal(true),[dialog,setDialog]=createSignal<DialogModule>();
onMount(()=>{window.loongarkAutomaticStyles={ready:true,loadDialog:async()=>{setDialog(await import('@loongark/solid/dialog'));},changeTheme:()=>setMode(m=>m==='light'?'dark':m==='dark'?'high-contrast':'light'),removeFirst:()=>setFirst(false),removeAll:()=>{setFirst(false);setSecond(false);},loadAfterUnmount:async()=>{await import('@loongark/solid/input');}};});
const body=(owner:string)=><Provider mode={mode()} targetId={'automatic-'+owner} nonce={nonce} styleBootstrap={styleBootstrap}><section data-owner={owner}><Box padding="md"><Button>Automatic button</Button><NativeSelect aria-label="Automatic selection"><option>One</option><option>Two</option></NativeSelect><Toolbar aria-label="Automatic toolbar"><Button>Toolbar action</Button></Toolbar></Box><Show when={dialog()}>{d=>{const {LoongArkDialogRoot:DialogRoot,LoongArkDialogTrigger:DialogTrigger,LoongArkDialogPortal:DialogPortal,LoongArkDialogOverlay:DialogOverlay,LoongArkDialogPositioner:DialogPositioner,LoongArkDialogContent:DialogContent,LoongArkDialogTitle:DialogTitle,LoongArkDialogDescription:DialogDescription,LoongArkDialogCloseTrigger:DialogCloseTrigger}=d();return <DialogRoot><DialogTrigger>Late dialog</DialogTrigger><DialogPortal><DialogOverlay/><DialogPositioner><DialogContent><DialogTitle>Late dialog title</DialogTitle><DialogDescription>Automatically loaded styles.</DialogDescription><DialogCloseTrigger>Close</DialogCloseTrigger></DialogContent></DialogPositioner></DialogPortal></DialogRoot>;}}</Show></section></Provider>;
return <main><Show when={first()}>{body('a')}</Show><Show when={second()}>{body('b')}</Show></main>;}
render(App,target);