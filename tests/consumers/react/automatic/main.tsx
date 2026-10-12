import type {} from '../../../automaticStyleProbe';
import {LoongArkProvider as Provider,LoongArkButton as Button,LoongArkBox as Box,LoongArkNativeSelect as NativeSelect,LoongArkToolbar as Toolbar} from '@loongark/react';
import {bootstrapKitAutomatic} from '@loongark/kit/automatic-bootstrap';
const explicit=new URLSearchParams(location.search).has('explicit');
const styleBootstrap=explicit?bootstrapKitAutomatic:undefined;
const nonce=new URLSearchParams(location.search).get('nonce')??undefined;
const target=document.getElementById('app');if(!target)throw Error('缺少自动样式挂载节点');
import {useState,useEffect} from 'react';import {createRoot} from 'react-dom/client';
type DialogModule=typeof import('@loongark/react/dialog');
const root=createRoot(target);
function App(){const [mode,setMode]=useState<'light'|'dark'|'high-contrast'>('light');const [first,setFirst]=useState(true);const [second,setSecond]=useState(true);const [dialog,setDialog]=useState<DialogModule>();
useEffect(()=>{window.loongarkAutomaticStyles={ready:true,loadDialog:async()=>setDialog(await import('@loongark/react/dialog')),changeTheme:()=>setMode(m=>m==='light'?'dark':m==='dark'?'high-contrast':'light'),removeFirst:()=>setFirst(false),removeAll:()=>{setFirst(false);setSecond(false);},loadAfterUnmount:async()=>{await import('@loongark/react/input');}};},[]);
const body=(owner:string)=><Provider mode={mode} targetId={'automatic-'+owner} nonce={nonce} styleBootstrap={styleBootstrap}><section data-owner={owner}><Box padding="md"><Button>Automatic button</Button><NativeSelect aria-label="Automatic selection"><option>One</option><option>Two</option></NativeSelect><Toolbar aria-label="Automatic toolbar"><Button>Toolbar action</Button></Toolbar></Box>{dialog&&<dialog.LoongArkDialogRoot><dialog.LoongArkDialogTrigger>Late dialog</dialog.LoongArkDialogTrigger><dialog.LoongArkDialogPortal><dialog.LoongArkDialogOverlay/><dialog.LoongArkDialogPositioner><dialog.LoongArkDialogContent><dialog.LoongArkDialogTitle>Late dialog title</dialog.LoongArkDialogTitle><dialog.LoongArkDialogDescription>Automatically loaded styles.</dialog.LoongArkDialogDescription><dialog.LoongArkDialogCloseTrigger>Close</dialog.LoongArkDialogCloseTrigger></dialog.LoongArkDialogContent></dialog.LoongArkDialogPositioner></dialog.LoongArkDialogPortal></dialog.LoongArkDialogRoot>}</section></Provider>;
return <main>{first&&body('a')}{second&&body('b')}</main>;}
root.render(<App/>);