import {LoongArkProviderCore as Provider} from '@loongark/react/provider-core';
import {LoongArkButton as Button} from '@loongark/react/button';
import {LoongArkDialogRoot as DialogRoot,LoongArkDialogTrigger as DialogTrigger,LoongArkDialogPortal as DialogPortal,LoongArkDialogOverlay as DialogOverlay,LoongArkDialogPositioner as DialogPositioner,LoongArkDialogContent as DialogContent,LoongArkDialogTitle as DialogTitle,LoongArkDialogDescription as DialogDescription,LoongArkDialogCloseTrigger as DialogCloseTrigger} from '@loongark/react/dialog';
import {LoongArkInputRoot as InputRoot,LoongArkInputControl as InputControl,LoongArkInputLabel as InputLabel} from '@loongark/react/input';import {createPrimitiveStyleBootstrap} from '@loongark/primitives/styles';
import {buttonPrimitive} from '@loongark/primitives/button';
import {dialogPrimitive} from '@loongark/primitives/dialog';
import {inputPrimitive} from '@loongark/primitives/input';
const buttonStyles=createPrimitiveStyleBootstrap([buttonPrimitive]);
const initialStyles=createPrimitiveStyleBootstrap([buttonPrimitive,dialogPrimitive]);
const extraStyles=createPrimitiveStyleBootstrap([inputPrimitive,dialogPrimitive,buttonPrimitive]);
const nonce=new URLSearchParams(location.search).get('nonce')??undefined;
const target=document.getElementById('app');if(!target)throw Error('缺少 Core 挂载节点');import {useState} from 'react';import {createRoot} from 'react-dom/client';function App(){const [mode,setMode]=useState<'light'|'dark'|'high-contrast'>('light');const [extra,setExtra]=useState(false);const [shown,setShown]=useState(true);const [second,setSecond]=useState(false);return <><button onClick={()=>setShown(!shown)}>Toggle provider</button><button onClick={()=>setSecond(!second)}>Toggle survivor</button>{second&&<Provider nonce={nonce} mode="dark" styleBootstrap={buttonStyles}><Button>Survivor</Button></Provider>}{shown&&<Provider mode={mode} nonce={nonce} styleBootstrap={extra?extraStyles:initialStyles}><section style={{padding:24,background:'var(--lk-color-semantic-background)',color:'var(--lk-color-semantic-foreground)'}}><Button onClick={()=>setMode(mode==='light'?'dark':mode==='dark'?'high-contrast':'light')}>Theme</Button>
<Button onClick={()=>setExtra(!extra)}>Change styles</Button><Button>Core button</Button>
<InputRoot><InputLabel>Email</InputLabel><InputControl data-testid="core-input" /></InputRoot>
<DialogRoot><DialogTrigger>Open dialog</DialogTrigger><DialogPortal><DialogOverlay/><DialogPositioner><DialogContent><DialogTitle>Core dialog</DialogTitle><DialogDescription>Shared theme and selected styles.</DialogDescription><DialogCloseTrigger>Close</DialogCloseTrigger></DialogContent></DialogPositioner></DialogPortal></DialogRoot></section></Provider>}</>;}createRoot(target).render(<App/>);